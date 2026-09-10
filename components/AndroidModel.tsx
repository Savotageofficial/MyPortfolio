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
        const sequence = hero.parentElement!;
        let pinStart = 0,
          pinDistance = 0;
        let frame = 0,
          current = 0,
          target = 0,
          visible = true,
          contextAlive = true;
        function draw(time: number) {
          frame = 0;
          if (disposed || !contextAlive || !visible || document.hidden) return;
          current = preference.matches ? 0 : target;
          applyAndroidPose(model, current, time / 1000, preference.matches);
          renderer.render(scene, camera);
          if (!preference.matches) frame = requestAnimationFrame(draw);
        }
        function requestDraw() {
          if (!frame && contextAlive && visible && !document.hidden) {
            frame = requestAnimationFrame(draw);
          }
        }
        function update() {
          target = preference.matches
            ? 0
            : Math.max(
                0,
                Math.min(
                  1,
                  (window.scrollY - pinStart) / Math.max(1, pinDistance),
                ),
              );
          // Scroll position determines the gesture exactly, so release cannot precede its completion.
          current = target;
          requestDraw();
        }
        function configurePin() {
          const canPin = !preference.matches && !disposed && contextAlive;
          const pinTop = Math.min(0, window.innerHeight - hero.offsetHeight);
          // Keep the original gesture, but require four times the scroll travel.
          pinDistance = canPin ? Math.max(650, window.innerHeight * 0.95) * 4 : 0;
          sequence.classList.toggle("android-pinned", canPin);
          sequence.style.setProperty("--hero-pin-top", `${pinTop}px`);
          sequence.style.setProperty(
            "--hero-sequence-height",
            `${hero.offsetHeight + pinDistance}px`,
          );
          pinStart =
            sequence.getBoundingClientRect().top + window.scrollY - pinTop;
          window.dispatchEvent(new Event("portfolio-layout-change"));
          update();
        }
        function resize() {
          const { width, height } = element.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          configurePin();
        }
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(element);
        sizeObserver.observe(hero);
        const intersection = new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting && contextAlive;
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
          renderer.domElement.style.display = "none";
          cancelAnimationFrame(frame);
          frame = 0;
          visible = false;
          contextAlive = false;
          sequence.classList.remove("android-pinned");
          window.dispatchEvent(new Event("portfolio-layout-change"));
          setUnavailable(true);
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", resize, { passive: true });
        document.addEventListener("visibilitychange", update);
        preference.addEventListener("change", configurePin);
        resize();
        teardown = () => {
          cancelAnimationFrame(frame);
          sizeObserver.disconnect();
          intersection.disconnect();
          window.removeEventListener("scroll", update);
          window.removeEventListener("resize", resize);
          document.removeEventListener("visibilitychange", update);
          preference.removeEventListener("change", configurePin);
          sequence.classList.remove("android-pinned");
          sequence.style.removeProperty("--hero-sequence-height");
          sequence.style.removeProperty("--hero-pin-top");
          window.dispatchEvent(new Event("portfolio-layout-change"));
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
        aria-label="Green Android robot gently floating, facing you and waving as you scroll"
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
