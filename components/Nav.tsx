/* eslint-disable @next/next/no-img-element */
export default function Nav() {
  return (
    <header>
      <div className="header-inner">
        <a href="#home" aria-label="Safwat home">
          <img
            className="logo"
            src="/logo.png"
            alt="Safwat logo"
            width="48"
            height="48"
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="outline-button hire" href="#contact">
          Hire me
        </a>
      </div>
    </header>
  );
}
