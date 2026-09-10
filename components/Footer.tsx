/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer className="container">
      <a href="#home" aria-label="Safwat home">
        <img
          className="logo"
          src="/logo.png"
          alt="Safwat logo"
          width="48"
          height="48"
        />
      </a>
      <span className="section-label">
        © <span>{new Date().getFullYear()}</span> Mohamed Safwat.
      </span>
      <a className="section-label" href="#home">
        Back to top ↑
      </a>
    </footer>
  );
}
