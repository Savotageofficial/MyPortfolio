const technologies = [
  "Django",
  "FastAPI",
  "Python",
  "Kotlin",
  "Java",
  "Android",
  "Firebase",
  "JavaScript",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-label={technologies.join(", ")}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {technologies.map((name) => (
              <span className="marquee-item" key={name}>
                <span>{name}</span>
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
