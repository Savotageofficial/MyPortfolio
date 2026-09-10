export function setupPortfolioMotion() {
  const $ = (s) => document.querySelector(s);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const work = $("#work"),
    stage = $(".work-stage"),
    track = $(".work-track"),
    cards = [...document.querySelectorAll(".project-card")];
  let workStart = 0,
    travel = 0,
    scrollDistance = 0,
    active = 0,
    scheduled = false,
    enabled = false,
    observer,
    frame = 0,
    disposed = false;
  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  function layout() {
    if (disposed) return;
    enabled = !reduced.matches && innerHeight >= 620 && innerWidth >= 360;
    document.body.classList.toggle("motion", !reduced.matches);
    document.body.classList.toggle("work-motion", enabled);
    track.style.transform = "";
    cards.forEach((c) => {
      c.style.transform = "";
      c.style.opacity = "";
    });
    if (enabled && stage.scrollHeight > stage.clientHeight + 3) {
      enabled = false;
      document.body.classList.remove("work-motion");
    }
    if (enabled) {
      travel = Math.max(0, track.scrollWidth - track.clientWidth);
      scrollDistance = Math.max(travel, innerHeight * 2.8);
      work.style.setProperty(
        "--work-height",
        scrollDistance + stage.offsetHeight + "px",
      );
      workStart = work.getBoundingClientRect().top + scrollY - 75;
    } else {
      work.style.removeProperty("--work-height");
      track.style.transform = "";
      cards.forEach((c) => {
        c.style.transform = "";
        c.style.opacity = "";
      });
    }
    render();
  }
  function render() {
    scheduled = false;
    document.body.classList.toggle("scrolled", scrollY > 20);
    const total = document.documentElement.scrollHeight - innerHeight;
    $(".page-progress").style.transform =
      `scaleX(${total > 0 ? clamp(scrollY / total) : 0})`;
    if (!reduced.matches) {
      const hero = $(".hero"),
        p = clamp(
          -hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1),
        );
      const names = document.querySelectorAll(".name-line");
      names[0].style.transform = `translate3d(${p * -55}px,${p * 65}px,0)`;
      names[1].style.transform = `translate3d(${p * 100}px,${p * 25}px,0)`;
      $(".hero-details").style.transform = `translateY(${p * 22}px)`;
      $(".hero-rule").style.transform = `scaleY(${1 - p * 0.65})`;
    }
    if (enabled) {
      const progress = clamp((scrollY - workStart) / scrollDistance),
        x = progress * travel;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      let closest = Infinity;
      cards.forEach((card, i) => {
        const delta = card.offsetLeft - cards[0].offsetLeft - x;
        const distance = Math.abs(delta);
        if (distance < closest) {
          closest = distance;
          active = i;
        }
        const depth = clamp(distance / (card.offsetWidth + 28));
        card.style.transform = `perspective(1200px) rotateY(${clamp(delta / 110, -7, 7)}deg) scale(${1 - depth * 0.035})`;
        card.style.opacity = String(1 - depth * 0.3);
      });
      $(".work-timeline span").style.transform =
        `translateX(${progress * 400}%)`;
      $("#current-project").textContent = String(active + 1).padStart(2, "0");
    } else {
      active = cards.reduce(
        (best, c, i) =>
          Math.abs(c.getBoundingClientRect().top - 120) <
          Math.abs(cards[best].getBoundingClientRect().top - 120)
            ? i
            : best,
        0,
      );
      $("#current-project").textContent = String(active + 1).padStart(2, "0");
    }
    $("#prev-project").disabled = active === 0;
    $("#next-project").disabled = active === cards.length - 1;
  }
  function requestRender() {
    if (!scheduled) {
      scheduled = true;
      frame = requestAnimationFrame(render);
    }
  }
  function goTo(index) {
    const target = clamp(index, 0, cards.length - 1);
    if (enabled) {
      const distance = cards[target].offsetLeft - cards[0].offsetLeft;
      scrollTo({
        top: workStart + clamp(distance / Math.max(travel, 1)) * scrollDistance,
        behavior: "smooth",
      });
    } else
      cards[target].scrollIntoView({
        behavior: reduced.matches ? "instant" : "smooth",
        block: "center",
      });
  }
  const prev = () => goTo(active - 1),
    next = () => goTo(active + 1);
  $("#prev-project").addEventListener("click", prev);
  $("#next-project").addEventListener("click", next);
  // Keyboard focus advances the pinned sequence as well as scrolling.
  const focusHandlers = cards.map((card, index) => {
    const handler = () => {
      if (enabled && index !== active) goTo(index);
    };
    card.addEventListener("focusin", handler);
    return handler;
  });
  function setupMotion() {
    observer?.disconnect();
    if (reduced.matches) {
      document
        .querySelectorAll(".reveal")
        .forEach((e) => e.classList.add("visible"));
      document
        .querySelectorAll(".name-line,.hero-details,.hero-rule")
        .forEach((e) => (e.style.transform = ""));
    } else {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -25px 0px" },
      );
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
      document
        .querySelectorAll(".stat,.skill")
        .forEach((el, i) =>
          el.style.setProperty("--reveal-delay", `${(i % 3) * 75}ms`),
        );
    }
    layout();
  }
  addEventListener("scroll", requestRender, { passive: true });
  addEventListener("resize", layout, { passive: true });
  reduced.addEventListener("change", setupMotion);
  setupMotion();
  document.fonts.ready.then(layout);
  addEventListener("load", layout, { once: true });
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const link = document.querySelector(
          `nav a[href="#${entry.target.id}"]`,
        );
        if (link) {
          if (entry.isIntersecting)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      }),
    { rootMargin: "-20% 0px -50% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((s) => sectionObserver.observe(s));

  return () => {
    disposed = true;
    observer?.disconnect();
    sectionObserver.disconnect();
    cancelAnimationFrame(frame);
    removeEventListener("scroll", requestRender);
    removeEventListener("resize", layout);
    removeEventListener("load", layout);
    reduced.removeEventListener("change", setupMotion);
    $("#prev-project")?.removeEventListener("click", prev);
    $("#next-project")?.removeEventListener("click", next);
    cards.forEach((card, i) =>
      card.removeEventListener("focusin", focusHandlers[i]),
    );
    document.body.classList.remove("motion", "work-motion", "scrolled");
  };
}
