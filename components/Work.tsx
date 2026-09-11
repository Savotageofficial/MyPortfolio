/* eslint-disable @next/next/no-img-element */
export default function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work-stage container">
        <div className="work-heading">
          <div>
            <div className="section-label rule-label">03 / Work</div>
            <h2 id="work-title">
              Selected
              <br />
              <em>projects</em>
            </h2>
          </div>
          <div className="work-position">
            <span className="section-label">
              <span id="current-project">01</span> / 05 PROJECTS
            </span>
            <div className="work-controls">
              <button
                type="button"
                id="prev-project"
                aria-label="Previous project"
              >
                ←
              </button>
              <button type="button" id="next-project" aria-label="Next project">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="work-window">
          <div className="work-track">
            <article
              className="project-card"
              id="project-1"
              aria-labelledby="project-title-1"
            >
              <div className="project-meta section-label">
                <span>01</span>
                <span>2026</span>
                <img
                  className="project-logo"
                  src="/1787908197917.png"
                  alt="Chess-Pulse logo"
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-body">
                <div className="project-top">
                  <div>
                    <span className="section-label">Android / Mobile</span>
                    <h3 id="project-title-1">Chess-Pulse</h3>
                  </div>
                  <a
                    className="github-link"
                    href="https://github.com/Savotageofficial/chess-pulse"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chess-Pulse on GitHub"
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p>
                  A freelance, production-grade chess app built with Kotlin and
                  Jetpack Compose, powered by Firebase and a Retrofit-based REST
                  API layer.
                </p>
                <ul className="tags">
                  <li>Kotlin</li>
                  <li>Jetpack Compose</li>
                  <li>Firebase</li>
                  <li>Retrofit</li>
                </ul>
              </div>
            </article>
            <article
              className="project-card"
              id="project-2"
              aria-labelledby="project-title-2"
            >
              <div className="project-meta section-label">
                <span>02</span>
                <span>2024</span>
                <img
                  className="project-logo"
                  src="/Logo%20(2).png"
                  alt="S-Downloader logo"
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-body">
                <div className="project-top">
                  <div>
                    <span className="section-label">Web / Full stack</span>
                    <h3 id="project-title-2">SDownloader</h3>
                  </div>
                  <a
                    className="github-link"
                    href="https://github.com/Savotageofficial/S-Downloader-test"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="SDownloader on GitHub"
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p>
                  A full-stack YouTube downloader with audio and video downloads
                  and a choice of available resolutions. Built with Django,
                  FastAPI, SQLite, and Pytube.
                </p>
                <ul className="tags">
                  <li>Django</li>
                  <li>FastAPI</li>
                  <li>SQLite</li>
                  <li>Pytube</li>
                  <li>HTML/CSS</li>
                </ul>
              </div>
            </article>
            <article
              className="project-card"
              id="project-3"
              aria-labelledby="project-title-3"
            >
              <div className="project-meta section-label">
                <span>03</span>
                <span>2024</span>
                <img
                  className="project-logo"
                  src="/capsule_Logo_transparent.png"
                  alt="Capsule logo"
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-body">
                <div className="project-top">
                  <div>
                    <span className="section-label">Android / Mobile</span>
                    <h3 id="project-title-3">Capsule</h3>
                  </div>
                  <a
                    className="github-link"
                    href="https://github.com/Savotageofficial/capsule"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Capsule on GitHub"
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p>
                  A medical assistant and appointment booking Android app with
                  Firebase authentication and real-time chat powered by Firebase
                  Realtime Database.
                </p>
                <ul className="tags">
                  <li>Kotlin</li>
                  <li>Java</li>
                  <li>Firebase</li>
                  <li>Realtime Database</li>
                </ul>
              </div>
            </article>
            <article
              className="project-card"
              id="project-4"
              aria-labelledby="project-title-4"
            >
              <div className="project-meta section-label">
                <span>04</span>
                <span>2025</span>
                <img
                  className="project-logo"
                  src="/picsart250930193036866.png"
                  alt="NoxNews logo"
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-body">
                <div className="project-top">
                  <div>
                    <span className="section-label">Android / Mobile</span>
                    <h3 id="project-title-4">NoxNews</h3>
                  </div>
                  <a
                    className="github-link"
                    href="https://github.com/Savotageofficial/noxnews"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="NoxNews on GitHub"
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p>
                  A Kotlin news app that keeps readers up to date with the
                  latest headlines through a clean, modern Android experience.
                </p>
                <ul className="tags">
                  <li>Kotlin</li>
                  <li>Android</li>
                </ul>
              </div>
            </article>
            <article
              className="project-card"
              id="project-5"
              aria-labelledby="project-title-5"
            >
              <div className="project-meta section-label">
                <span>05</span>
                <span>2025</span>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <div>
                    <span className="section-label">Android / Mobile</span>
                    <h3 id="project-title-5">Appetite</h3>
                  </div>
                  <a
                    className="github-link"
                    href="https://github.com/Savotageofficial/appetite"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Appetite on GitHub"
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p>
                  A Kotlin-built Android application demonstrating solid mobile
                  engineering fundamentals and a clean user interface.
                </p>
                <ul className="tags">
                  <li>Kotlin</li>
                  <li>Android</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
        <div className="work-timeline" aria-hidden="true">
          <span></span>
        </div>
        <a className="section-label skip-work" href="#skills">
          Continue to skills ↓
        </a>
      </div>
    </section>
  );
}
