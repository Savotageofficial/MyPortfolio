/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <section className="hero container" id="home">
      <span className="section-label hero-index">01 / Hero</span>
      <div className="hero-rule" aria-hidden="true"></div>
      <p className="availability section-label">
        <span></span>Available for work
      </p>
      <h1>
        <span className="name-line">
          <span>Mohamed</span>
        </span>
        <span className="name-line accent">
          <span>Safwat</span>
        </span>
      </h1>
      <div className="hero-details">
        <p>
          Full stack developer & Android engineer building production-ready web
          and mobile applications — from Django backends to Kotlin apps.
        </p>
        <div className="location">
          <span className="section-label">Based in</span>
          <span>Cairo, Egypt</span>
        </div>
      </div>
      <div className="hero-actions">
        <a className="solid-button" href="#work">
          View work <span>↓</span>
        </a>
        <a className="underlined section-label" href="#contact">
          Get in contact →
        </a>
      </div>
    </section>
  );
}
