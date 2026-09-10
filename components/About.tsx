/* eslint-disable @next/next/no-img-element */
export default function About() {
  return (
    <section className="about container section" id="about">
      <div className="about-copy">
        <div className="section-label rule-label reveal">02 / About</div>
        <h2 className="reveal">
          Craft over
          <br />
          <em>everything</em>
        </h2>
        <div className="body-copy reveal">
          <p>
            I&apos;m a full stack developer and Android engineer currently
            studying Software Engineering at Helwan University / Capital
            University in Cairo, Egypt.
          </p>
          <p>
            I build production-ready web apps using Django, FastAPI, and modern
            JavaScript, as well as native Android apps in Kotlin and Java backed
            by Firebase.
          </p>
          <p>
            Recognized at LinkCu&apos;s Link Conference &apos;25, certified by
            Digital Egypt Pioneers Initiative, and always looking for the next
            hard problem to solve.
          </p>
        </div>
        <a
          className="outline-button reveal"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV <span className="accent">↓</span>
        </a>
      </div>
      <div className="stats">
        <div className="stat reveal">
          <strong>2+</strong>
          <span className="section-label">Years building</span>
        </div>
        <div className="stat reveal">
          <strong>4+</strong>
          <span className="section-label">Projects shipped</span>
        </div>
        <div className="stat reveal">
          <strong>3</strong>
          <span className="section-label">Certificates earned</span>
        </div>
        <div className="stat reveal">
          <strong>2</strong>
          <span className="section-label">Platforms mastered</span>
        </div>
      </div>
    </section>
  );
}
