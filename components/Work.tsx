/* eslint-disable @next/next/no-img-element */
// Project content — IDs also select each card's hover palette.
const projects = [
  {
    id: 1,
    year: "2026",
    category: "Android / Mobile",
    name: "Chess-Pulse",
    href: "https://github.com/Savotageofficial/chess-pulse",
    description:
      "A freelance, production-grade chess app built with Kotlin and Jetpack Compose, powered by Firebase and a Retrofit-based REST API layer.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Retrofit"],
    logo: {
      src: "/1787908197917.png",
      alt: "Chess-Pulse logo",
      round: true,
    },
  },
  {
    id: 2,
    year: "2024",
    category: "All Platforms / Full stack", 
    name: "SDownloader",
    href: "https://github.com/Savotageofficial/S-Downloader-test",
    description:
      "A full-stack YouTube downloader with audio and video downloads and a choice of available resolutions. Built with Django, FastAPI, yt-dlp, Jetpack Compose and youtubedl-android",
    tags: ["Django", "FastAPI", "yt-dlp", "youtubedl-android" , "Jetpack Compose" , "Next.js"],
    logo: {
      src: "/Logo%20(2).png",
      alt: "S-Downloader logo",
      round: false,
    },
  },
  {
    id: 3,
    year: "2024",
    category: "Android / Mobile",
    name: "Capsule",
    href: "https://github.com/Savotageofficial/capsule",
    description:
      "A medical assistant and appointment booking Android app with Firebase authentication and real-time chat powered by Firebase Realtime Database.",
    tags: ["Kotlin", "Java", "Firebase", "Realtime Database"],
    logo: {
      src: "/capsule_Logo_transparent.png",
      alt: "Capsule logo",
      round: false,
    },
  },
  {
    id: 4,
    year: "2025",
    category: "Android / Mobile",
    name: "NoxNews",
    href: "https://github.com/Savotageofficial/noxnews",
    description:
      "A Kotlin news app that keeps readers up to date with the latest headlines through a clean, modern Android experience.",
    tags: ["Kotlin", "Android"],
    logo: {
      src: "/picsart250930193036866.png",
      alt: "NoxNews logo",
      round: false,
    },
  },
  {
    id: 5,
    year: "2025",
    category: "Android / Mobile",
    name: "Appetite",
    href: "https://github.com/Savotageofficial/appetite",
    description:
      "A Kotlin-built Android application demonstrating solid mobile engineering fundamentals and a clean user interface.",
    tags: ["Kotlin", "Android"],
    logo: null,
  },
];

// Project navigation and shared card layout.
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
            {projects.map((project) => (
              <article
                className="project-card"
                id={`project-${project.id}`}
                aria-labelledby={`project-title-${project.id}`}
                key={project.id}
              >
                <div className="project-meta section-label">
                  <span>{String(project.id).padStart(2, "0")}</span>
                  <span>{project.year}</span>
                  {project.logo && (
                    <img
                      className={
                        project.logo.round
                          ? "project-logo project-logo-round"
                          : "project-logo"
                      }
                      src={project.logo.src}
                      alt={project.logo.alt}
                      width="112"
                      height="112"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <div className="project-body">
                  <div className="project-top">
                    <div>
                      <span className="section-label">{project.category}</span>
                      <h3 id={`project-title-${project.id}`}>{project.name}</h3>
                    </div>
                    <a
                      className="github-link"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                    >
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <ul className="tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
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
