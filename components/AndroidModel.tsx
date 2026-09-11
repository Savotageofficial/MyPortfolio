"use client";

import { useEffect, useRef, useState } from "react";

export default function AndroidModel() {
  const host = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const mountedElement = host.current;
    if (!mountedElement) return;
    const element: HTMLDivElement = mountedElement;
    let disposed = false;
    let teardown = () => {};
    // Keep the 3D renderer out of the initial page bundle.
    Promise.all([
      import("three"),
      import("@/lib/android-model"),
      import("@/lib/python-model"),
    ])
      .then(
        ([
          THREE,
          { createAndroidModel, applyAndroidPose },
          { createPythonModel, animatePythonModel },
        ]) => {
          if (disposed) return;
          let renderer: InstanceType<typeof THREE.WebGLRenderer>;
          try {
            renderer = new THREE.WebGLRenderer({
              alpha: true,
              antialias: true,
              powerPreference: "low-power",
            });
          } catch {
            setUnavailable(true);
            return;
          }
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
          renderer.setClearColor(0x000000, 0);
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.35;
          element.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 30);
          camera.position.set(0, 0.3, 7);
          camera.lookAt(0, 0.12, 0);
          const model = createAndroidModel();
          const androidAnchor = new THREE.Group();
          androidAnchor.position.x = -1.05;
          androidAnchor.scale.setScalar(0.8);
          androidAnchor.add(model.robot);
          scene.add(androidAnchor);
          const python = createPythonModel();
          python.logo.position.x = 1.15;
          python.logo.scale.setScalar(0.8);
          scene.add(python.logo);
          const canvas = renderer.domElement;
          canvas.style.pointerEvents = "auto";
          canvas.tabIndex = 0;
          canvas.setAttribute("role", "group");
          canvas.setAttribute(
            "aria-label",
            "Python model: drag with your mouse or use arrow keys to rotate",
          );
          const raycaster = new THREE.Raycaster();
          const pointer = new THREE.Vector2();
          const dragRotation = new THREE.Quaternion();
          const rotationStep = new THREE.Quaternion();
          const rotationAxis = new THREE.Vector3();
          let rotated = false;
          let drag: { id: number; x: number; y: number } | null = null;
          function hitPython(event: PointerEvent) {
            const rect = canvas.getBoundingClientRect();
            if (!contextAlive || !rect.width || !rect.height) return false;
            pointer.set(
              ((event.clientX - rect.left) / rect.width) * 2 - 1,
              -((event.clientY - rect.top) / rect.height) * 2 + 1,
            );
            scene.updateMatrixWorld(true);
            camera.updateMatrixWorld(true);
            raycaster.setFromCamera(pointer, camera);
            return raycaster.intersectObject(python.logo, true).length > 0;
          }
          function rotatePython(dx: number, dy: number) {
            if (!rotated) dragRotation.copy(python.logo.quaternion);
            rotated = true;
            const distance = Math.hypot(dx, dy);
            if (distance) {
              // Rotate around screen axes, even after turning the logo upside down.
              rotationAxis
                .set(dy, dx, 0)
                .normalize()
                .applyQuaternion(camera.quaternion);
              rotationStep.setFromAxisAngle(rotationAxis, distance * 0.008);
              dragRotation.premultiply(rotationStep).normalize();
              python.logo.quaternion.copy(dragRotation);
            }
            requestDraw();
          }
          function startDrag(event: PointerEvent) {
            if (
              event.pointerType === "touch" ||
              event.button !== 0 ||
              drag ||
              !hitPython(event)
            )
              return;
            drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
            canvas.setPointerCapture(event.pointerId);
            canvas.style.cursor = "grabbing";
          }
          function dragPointer(event: PointerEvent) {
            if (drag && drag.id === event.pointerId) {
              if (!(event.buttons & 1)) {
                endDrag();
                return;
              }
              rotatePython(event.clientX - drag.x, event.clientY - drag.y);
              drag.x = event.clientX;
              drag.y = event.clientY;
            } else if (!drag && event.pointerType !== "touch") {
              canvas.style.cursor = hitPython(event) ? "grab" : "";
            }
          }
          function endDrag() {
            const previous = drag;
            drag = null;
            if (previous && canvas.hasPointerCapture(previous.id))
              canvas.releasePointerCapture(previous.id);
            canvas.style.cursor = "";
          }
          function endPointer(event: PointerEvent) {
            if (drag?.id === event.pointerId) endDrag();
          }
          function rotateKey(event: KeyboardEvent) {
            const directions: Record<string, [number, number]> = {
              ArrowLeft: [-15, 0],
              ArrowRight: [15, 0],
              ArrowUp: [0, -15],
              ArrowDown: [0, 15],
            };
            const delta = directions[event.key];
            if (!delta) return;
            event.preventDefault();
            rotatePython(...delta);
          }
          canvas.addEventListener("pointerdown", startDrag);
          canvas.addEventListener("pointermove", dragPointer);
          canvas.addEventListener("pointerup", endPointer);
          canvas.addEventListener("pointercancel", endPointer);
          canvas.addEventListener("lostpointercapture", endPointer);
          canvas.addEventListener("keydown", rotateKey);
          window.addEventListener("blur", endDrag);
          document.addEventListener("visibilitychange", endDrag);
          scene.add(new THREE.HemisphereLight(0xfff7ea, 0x766151, 2.4));
          const key = new THREE.DirectionalLight(0xfff1dd, 4);
          key.position.set(-3, 5, 5);
          key.castShadow = true;
          key.shadow.mapSize.set(1024, 1024);
          key.shadow.camera.left = -3;
          key.shadow.camera.right = 3;
          key.shadow.camera.top = 3;
          key.shadow.camera.bottom = -3;
          key.shadow.normalBias = 0.025;
          scene.add(key);
          const rim = new THREE.DirectionalLight(0xffffff, 2.5);
          rim.position.set(3, 2, -3);
          scene.add(rim);
          const floorGeometry = new THREE.PlaneGeometry(20, 20),
            floorMaterial = new THREE.ShadowMaterial({ opacity: 0.12 });
          const floor = new THREE.Mesh(floorGeometry, floorMaterial);
          floor.rotation.x = -Math.PI / 2;
          floor.position.y = -1.45;
          floor.receiveShadow = true;
          scene.add(floor);
          const preference = matchMedia("(prefers-reduced-motion: reduce)");
          const pointerAvailable = matchMedia(
            "(hover: hover) and (pointer: fine)",
          );
          let frame = 0,
            visible = true,
            contextAlive = true,
            lastTime = 0;
          let targetX = 0,
            targetY = 0,
            currentX = 0,
            currentY = 0;
          function draw(time: number) {
            frame = 0;
            if (disposed || !contextAlive || !visible || document.hidden)
              return;
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;
            const follow = 1 - Math.exp(-8 * dt);
            currentX = preference.matches
              ? 0
              : currentX + (targetX - currentX) * follow;
            currentY = preference.matches
              ? 0
              : currentY + (targetY - currentY) * follow;
            applyAndroidPose(
              model,
              currentX,
              currentY,
              time / 1000,
              preference.matches,
            );
            animatePythonModel(python, time / 1000, preference.matches);
            if (rotated) python.logo.quaternion.copy(dragRotation);
            renderer.render(scene, camera);
            if (!preference.matches) frame = requestAnimationFrame(draw);
          }
          function requestDraw() {
            if (!frame && contextAlive && visible && !document.hidden) {
              lastTime = performance.now();
              frame = requestAnimationFrame(draw);
            }
          }
          function resetLook() {
            targetX = 0;
            targetY = 0;
            requestDraw();
          }
          function movePointer(event: PointerEvent) {
            if (
              event.pointerType === "touch" ||
              !pointerAvailable.matches ||
              preference.matches
            )
              return;
            const rect = element.getBoundingClientRect();
            targetX = Math.max(
              -1,
              Math.min(
                1,
                (event.clientX - (rect.left + rect.width * 0.3)) /
                  (innerWidth * 0.5),
              ),
            );
            targetY = Math.max(
              -1,
              Math.min(
                1,
                (event.clientY - (rect.top + rect.height * 0.4)) /
                  (innerHeight * 0.5),
              ),
            );
            requestDraw();
          }
          function leaveWindow(event: PointerEvent) {
            if (!event.relatedTarget) resetLook();
          }
          function resize() {
            const { width, height } = element.getBoundingClientRect();
            if (!width || !height) return;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.position.z = Math.max(
              7,
              5.1 /
                (2 *
                  Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
                  camera.aspect),
            );
            camera.lookAt(0, 0.12, 0);
            camera.updateProjectionMatrix();
            requestDraw();
          }
          const sizeObserver = new ResizeObserver(resize);
          sizeObserver.observe(element);

          const intersection = new IntersectionObserver(
            (entries) => {
              visible = entries[0].isIntersecting && contextAlive;
              if (visible) requestDraw();
              else {
                cancelAnimationFrame(frame);
                frame = 0;
              }
            },
            { rootMargin: "50px" },
          );
          intersection.observe(element);
          const contextLost = (event: Event) => {
            event.preventDefault();
            endDrag();
            canvas.tabIndex = -1;
            renderer.domElement.style.display = "none";
            cancelAnimationFrame(frame);
            frame = 0;
            visible = false;
            contextAlive = false;

            setUnavailable(true);
          };
          renderer.domElement.addEventListener("webglcontextlost", contextLost);
          window.addEventListener("pointermove", movePointer, {
            passive: true,
          });
          window.addEventListener("pointerout", leaveWindow);
          window.addEventListener("blur", resetLook);
          window.addEventListener("resize", resize, { passive: true });
          document.addEventListener("visibilitychange", resetLook);
          preference.addEventListener("change", resetLook);
          pointerAvailable.addEventListener("change", resetLook);
          resize();
          teardown = () => {
            endDrag();
            canvas.removeEventListener("pointerdown", startDrag);
            canvas.removeEventListener("pointermove", dragPointer);
            canvas.removeEventListener("pointerup", endPointer);
            canvas.removeEventListener("pointercancel", endPointer);
            canvas.removeEventListener("lostpointercapture", endPointer);
            canvas.removeEventListener("keydown", rotateKey);
            window.removeEventListener("blur", endDrag);
            document.removeEventListener("visibilitychange", endDrag);
            cancelAnimationFrame(frame);
            sizeObserver.disconnect();
            intersection.disconnect();
            window.removeEventListener("pointermove", movePointer);
            window.removeEventListener("pointerout", leaveWindow);
            window.removeEventListener("blur", resetLook);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", resetLook);
            preference.removeEventListener("change", resetLook);
            pointerAvailable.removeEventListener("change", resetLook);
            renderer.domElement.removeEventListener(
              "webglcontextlost",
              contextLost,
            );
            model.dispose();
            python.dispose();
            floorGeometry.dispose();
            floorMaterial.dispose();
            key.shadow.map?.dispose();
            renderer.dispose();
            renderer.domElement.remove();
          };
        },
      )
      .catch(() => {
        if (!disposed) setUnavailable(true);
      });
    return () => {
      disposed = true;
      teardown();
    };
  }, []);
  return (
    <figure className="android-figure">
      <div
        ref={host}
        className="android-canvas"
        role="group"
        aria-label="Floating green Android robot looking toward your mouse, beside a blue and yellow three-dimensional Python logo"
      >
        {unavailable && (
          <div className="model-fallbacks">
            <img
              src="/assets/android-original.svg"
              alt="Android robot"
              className="android-fallback"
              width="180"
              height="180"
            />
            <img
              src="/assets/python-original.svg"
              alt="Python logo"
              className="android-fallback"
              width="150"
              height="150"
            />
          </div>
        )}
      </div>
      <figcaption className="android-credit">
        Android robot adapted from{" "}
        <a
          href="https://developer.android.com/distribute/marketing-tools/brand-guidelines"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google
        </a>{" "}
        ·{" "}
        <a
          href="https://creativecommons.org/licenses/by/3.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 3.0
        </a>
        <br />
        Python logo ·{" "}
        <a
          href="https://www.python.org/community/logos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Python Software Foundation
        </a>
      </figcaption>
    </figure>
  );
}
