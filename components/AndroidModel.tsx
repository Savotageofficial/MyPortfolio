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
    Promise.all([import("three"), import("@/lib/android-model")])
      .then(([THREE, { createAndroidModel, applyAndroidPose }]) => {
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
        scene.add(model.robot);
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
        const hero = element.closest("section")!;
        let frame = 0,
          current = 0,
          target = 0,
          visible = true,
          last = 0;
        function draw(time: number) {
          frame = 0;
          if (disposed || !visible || document.hidden) return;
          const dt = Math.min((time - last) / 1000, 0.05);
          last = time;
          current = preference.matches
            ? 0
            : current + (target - current) * (1 - Math.exp(-10 * dt));
          applyAndroidPose(model, current);
          renderer.render(scene, camera);
          if (Math.abs(target - current) > 0.0001 && !preference.matches)
            frame = requestAnimationFrame(draw);
        }
        function requestDraw() {
          if (!frame && visible && !document.hidden) {
            last = performance.now();
            frame = requestAnimationFrame(draw);
          }
        }
        function update() {
          const rect = hero.getBoundingClientRect();
          target = preference.matches
            ? 0
            : Math.max(0, Math.min(1, -rect.top / (rect.height * 0.85)));
          requestDraw();
        }
        function resize() {
          const { width, height } = element.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          update();
        }
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(element);
        const intersection = new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            if (visible) update();
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
          renderer.domElement.style.display = 'none';
          cancelAnimationFrame(frame);
          frame = 0;
          visible = false;
          setUnavailable(true);
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        window.addEventListener("scroll", update, { passive: true });
        document.addEventListener("visibilitychange", update);
        preference.addEventListener("change", update);
        resize();
        teardown = () => {
          cancelAnimationFrame(frame);
          sizeObserver.disconnect();
          intersection.disconnect();
          window.removeEventListener("scroll", update);
          document.removeEventListener("visibilitychange", update);
          preference.removeEventListener("change", update);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          model.dispose();
          floorGeometry.dispose();
          floorMaterial.dispose();
          key.shadow.map?.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
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
        role="img"
        aria-label="Three-dimensional Android robot in rust red, rotating as you scroll"
      >
        {unavailable && (
          <img
            src="/assets/android-original.svg"
            alt="Android robot"
            className="android-fallback"
            width="180"
            height="180"
          />
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
      </figcaption>
    </figure>
  );
}
