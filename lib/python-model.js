import * as THREE from "three";

const smooth = (v) => {
  const t = THREE.MathUtils.clamp(v, 0, 1);
  return t * t * (3 - 2 * t);
};
const radiusAt = (t) =>
  (0.09 + 0.055 * smooth(t / 0.13)) * (1 - 0.96 * smooth((t - 0.72) / 0.28));

// Opposite, continuous helices: the heads occupy opposite ends, as in the Python emblem.
function snakeCurve(reverse) {
  const sign = reverse ? 1 : -1;
  const points = [
    new THREE.Vector3(sign * 0.53, -sign * 0.9, 0.5),
    new THREE.Vector3(sign * 0.56, -sign * 0.86, 0.24),
  ];
  for (let i = 0; i <= 32; i++) {
    const g = reverse ? 1 - i / 32 : i / 32;
    const angle = Math.PI + g * Math.PI * 2 + (reverse ? Math.PI : 0);
    points.push(
      new THREE.Vector3(
        0.58 * Math.cos(angle),
        0.78 - g * 1.56,
        0.36 * Math.sin(angle),
      ),
    );
  }
  const tail = points[points.length - 1];
  points.push(
    new THREE.Vector3(tail.x * 0.8, tail.y + (reverse ? 0.22 : -0.22), -0.08),
  );
  return new THREE.CatmullRomCurve3(points, false, "centripetal");
}

function taperedBody(curve) {
  const lengthSegments = 160,
    radialSegments = 32;
  const frames = curve.computeFrenetFrames(lengthSegments, false);
  const positions = [],
    uvs = [],
    indices = [];
  const n = new THREE.Vector3();
  for (let i = 0; i <= lengthSegments; i++) {
    const t = i / lengthSegments,
      center = curve.getPointAt(t),
      radius = radiusAt(t);
    for (let j = 0; j <= radialSegments; j++) {
      const a = (j / radialSegments) * Math.PI * 2;
      n.copy(frames.normals[i])
        .multiplyScalar(Math.cos(a))
        .addScaledVector(frames.binormals[i], Math.sin(a));
      positions.push(
        center.x + n.x * radius,
        center.y + n.y * radius,
        center.z + n.z * radius,
      );
      uvs.push(t, j / radialSegments);
      if (i > 0 && j > 0) {
        const a = (i - 1) * (radialSegments + 1) + j - 1,
          b = i * (radialSegments + 1) + j - 1,
          c = b + 1,
          d = a + 1;
        indices.push(a, d, b, b, d, c);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createPythonModel() {
  const logo = new THREE.Group();
  logo.name = "Intertwined Python snakes";
  const geometries = new Set(),
    materials = new Set();
  function material(properties) {
    const value = new THREE.MeshPhysicalMaterial(properties);
    materials.add(value);
    return value;
  }
  function geometry(value) {
    geometries.add(value);
    return value;
  }
  const sphere = geometry(new THREE.SphereGeometry(1, 28, 18));
  const scaleGeometry = geometry(new THREE.SphereGeometry(1, 8, 6));
  const pupil = material({ color: 0x11120e, roughness: 0.16, clearcoat: 1 });
  const iris = material({ color: 0xe8cc77, roughness: 0.25, clearcoat: 0.7 });
  function ellipsoid(parent, skin, position, size) {
    const mesh = new THREE.Mesh(sphere, skin);
    mesh.position.set(...position);
    mesh.scale.set(...size);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  const snakes = [0x306998, 0xffd43b].map((color, index) => {
    const group = new THREE.Group();
    group.name = index ? "Golden python" : "Blue python";
    logo.add(group);
    const skin = material({
      color,
      roughness: 0.43,
      metalness: 0.02,
      clearcoat: 0.24,
      clearcoatRoughness: 0.4,
    });
    const belly = material({
      color: index ? 0xf1dca0 : 0x9dbbc6,
      roughness: 0.55,
    });
    const curve = snakeCurve(index === 1);
    const body = new THREE.Mesh(geometry(taperedBody(curve)), skin);
    body.name = "Continuous tapered body";
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    // Staggered, overlapping scale domes follow the body surface, each with real relief.
    const rows = 68,
      columns = 10,
      scales = new THREE.InstancedMesh(scaleGeometry, skin, rows * columns);
    scales.name = "Overlapping scales";
    scales.castShadow = true;
    scales.receiveShadow = true;
    const frames = curve.computeFrenetFrames(rows + 4, false),
      dummy = new THREE.Object3D(),
      normal = new THREE.Vector3(),
      side = new THREE.Vector3(),
      basis = new THREE.Matrix4();
    for (let row = 0; row < rows; row++) {
      const t = (row + 2) / (rows + 4),
        center = curve.getPointAt(t),
        f = row + 2,
        r = radiusAt(t);
      for (let col = 0; col < columns; col++) {
        const a = ((col + (row % 2) * 0.5) / columns) * Math.PI * 2;
        normal
          .copy(frames.normals[f])
          .multiplyScalar(Math.cos(a))
          .addScaledVector(frames.binormals[f], Math.sin(a));
        side.crossVectors(frames.tangents[f], normal).normalize();
        basis.makeBasis(side, frames.tangents[f], normal);
        dummy.position.copy(center).addScaledVector(normal, r - 0.002);
        dummy.quaternion.setFromRotationMatrix(basis);
        dummy.scale.set(r * 0.32, 0.039, Math.min(0.006, r * 0.07));
        dummy.updateMatrix();
        const id = row * columns + col;
        scales.setMatrixAt(id, dummy.matrix);
        scales.setColorAt(
          id,
          new THREE.Color().setScalar(
            0.93 + (0.07 * ((row * 7 + col * 3) % 11)) / 10,
          ),
        );
      }
    }
    scales.instanceMatrix.needsUpdate = true;
    if (scales.instanceColor) scales.instanceColor.needsUpdate = true;
    scales.computeBoundingSphere();
    group.add(scales);
    // Broader skull, tapered muzzle and a separate lower jaw keep this anatomical, not a flat logo.
    const head = new THREE.Group();
    head.name = "Sculpted snake head";
    head.position.copy(curve.getPointAt(0));
    head.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      curve.getTangentAt(0).negate(),
    );
    group.add(head);
    ellipsoid(head, skin, [0, 0, 0.035], [0.163, 0.105, 0.225]);
    ellipsoid(head, skin, [0, -0.006, 0.18], [0.12, 0.074, 0.16]);
    ellipsoid(head, belly, [0, -0.068, 0.095], [0.14, 0.033, 0.215]);
    for (const sign of [-1, 1]) {
      ellipsoid(head, skin, [sign * 0.125, 0.065, 0.07], [0.058, 0.043, 0.068]);
      ellipsoid(head, iris, [sign * 0.14, 0.075, 0.107], [0.03, 0.035, 0.035]);
      ellipsoid(
        head,
        pupil,
        [sign * 0.153, 0.078, 0.132],
        [0.008, 0.026, 0.009],
      );
      ellipsoid(
        head,
        pupil,
        [sign * 0.065, 0.031, 0.302],
        [0.012, 0.008, 0.006],
      );
    }
    const tip = curve.getPointAt(1);
    ellipsoid(group, skin, [tip.x, tip.y, tip.z], [0.006, 0.006, 0.006]);
    return { group, body, scales, head, curve };
  });
  logo.rotation.set(0.05, -0.16, 0);
  return {
    logo,
    snakes,
    dispose() {
      snakes.forEach((s) => s.scales.dispose());
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}

export function animatePythonModel(model, seconds, reducedMotion = false) {
  model.logo.position.y = reducedMotion
    ? 0.12
    : 0.12 + Math.sin(seconds * 1.5 + 0.8) * 0.075;
  model.logo.rotation.y = reducedMotion
    ? -0.16
    : -0.16 + Math.sin(seconds * 0.6) * 0.035;
}
