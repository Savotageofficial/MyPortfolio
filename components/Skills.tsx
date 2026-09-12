/* eslint-disable @next/next/no-img-element */
// Technology names and local icons.
const skills = [
  {
    name: "Next.js",
    icon: "/assets/nextjs-original.svg",
  },
  {
    name: "JavaScript",
    icon: "/assets/javascript-original.svg",
  },
  {
    name: "HTML",
    icon: "/assets/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "/assets/css3-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "/assets/bootstrap-original.svg",
  },
  {
    name: "MySQL",
    icon: "/assets/mysql-original.svg",
  },
  {
    name: "MongoDB",
    icon: "/assets/mongodb-original.svg",
  },
  {
    name: "Git",
    icon: "/assets/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "/assets/github-original.svg",
  },
  {
    name: "FastAPI",
    icon: "/assets/fastapi-plain.svg",
  },
  {
    name: "Python",
    icon: "/assets/python-original.svg",
  },
  {
    name: "Django",
    icon: "/assets/django-plain.svg",
  },
  {
    name: "Kotlin",
    icon: "/assets/kotlin-original.svg",
  },
  {
    name: "Java",
    icon: "/assets/java-original.svg",
  },
  {
    name: "Firebase",
    icon: "/assets/firebase-plain.svg",
  },
  {
    name: "Android",
    icon: "/assets/android-original.svg",
  },
  {
    name: "Jetpack Compose",
    icon: "/assets/jetpackcompose-original.svg",
  },
];

// Skills grid and API integration label.
export default function Skills() {
  return (
    <section className="skills container section" id="skills">
      <div className="section-label rule-label reveal">04 / Skills</div>
      <h2 className="reveal">
        Tools of
        <br />
        <em>the trade</em>
      </h2>
      <div className="skill-grid">
        {skills.map((skill) => (
          <div className="skill reveal" key={skill.name}>
            <img
              src={skill.icon}
              alt=""
              width="32"
              height="32"
              loading="lazy"
            />
            <span>{skill.name}</span>
          </div>
        ))}

        <div className="skill reveal">
          <span className="api-symbol" aria-hidden="true">
            ↔
          </span>
          <span>Retrofit / REST API integration</span>
        </div>
      </div>
    </section>
  );
}
