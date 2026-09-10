import * as THREE from "three";

// A fully volumetric adaptation of Google's Android robot.
export function createAndroidModel() {
  const robot = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: 0x3ddc84,
    roughness: 0.3,
    metalness: 0.18,
  });
  const eyes = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8,
    roughness: 0.35,
  });
  function mesh(geometry, material, parent, x = 0, y = 0, z = 0) {
    const part = new THREE.Mesh(geometry, material);
    part.position.set(x, y, z);
    part.castShadow = true;
    part.receiveShadow = true;
    parent.add(part);
    return part;
  }
  mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.1, 48), shell, robot);
  const head = new THREE.Group();
  head.position.y = 0.67;
  robot.add(head);
  mesh(
    new THREE.SphereGeometry(0.75, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    shell,
    head,
  );
  const cap = mesh(new THREE.CircleGeometry(0.75, 48), shell, head);
  cap.rotation.x = Math.PI / 2;
  for (const sign of [-1, 1]) {
    const antenna = mesh(
      new THREE.CapsuleGeometry(0.035, 0.38, 6, 12),
      shell,
      head,
      sign * 0.44,
      0.72,
      0,
    );
    antenna.rotation.z = -sign * 0.42;
    mesh(
      new THREE.SphereGeometry(0.073, 20, 16),
      eyes,
      head,
      sign * 0.29,
      0.32,
      0.61,
    );
    mesh(
      new THREE.CapsuleGeometry(0.19, 0.35, 10, 24),
      shell,
      robot,
      sign * 0.34,
      -0.91,
      0,
    );
  }
  const arms = [-1, 1].map((sign) => {
    const pivot = new THREE.Group();
    pivot.position.set(sign * 0.97, 0.36, 0);
    robot.add(pivot);
    mesh(
      new THREE.CapsuleGeometry(0.18, 0.63, 10, 24),
      shell,
      pivot,
      0,
      -0.31,
      0,
    );
    return pivot;
  });
  function dispose() {
    const geometries = new Set();
    robot.traverse((part) => {
      if (part.isMesh) geometries.add(part.geometry);
    });
    geometries.forEach((g) => g.dispose());
    shell.dispose();
    eyes.dispose();
  }
  return { robot, head, arms, dispose };
}

export function applyAndroidPose(
  model,
  progress,
  seconds = 0,
  reducedMotion = false,
) {
  const p = Math.max(0, Math.min(1, progress));
  const smooth = (value) => {
    const x = Math.max(0, Math.min(1, value));
    return x * x * (3 - 2 * x);
  };
  const face = smooth(p / 0.15);
  const lift = reducedMotion
    ? 0
    : smooth((p - 0.12) / 0.16) * (1 - smooth((p - 0.8) / 0.15));
  const wave = Math.sin(
    Math.max(0, Math.min(1, (p - 0.28) / 0.52)) * Math.PI * 6,
  );
  const bob = reducedMotion ? 0 : Math.sin(seconds * 1.8) * 0.09;
  model.robot.rotation.set(0, reducedMotion ? 0 : -0.22 * (1 - face), 0);
  model.robot.position.set(0, bob, 0);
  model.robot.scale.setScalar(1);
  model.head.rotation.set(0, 0, -lift * 0.04);
  model.arms[0].rotation.z = 0.08;
  // The arm's local down axis swings outward, above the shoulder, then waves three times.
  model.arms[1].rotation.z = -0.08 + lift * (2.3 + wave * 0.3);
}
