'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="display-heading text-2xl font-light text-ink">
          MS<span className="text-accent">.</span>
        </a>
        <p className="section-label text-muted">
          © {year} Mohamed Safwat. Built with Next.js & care.
        </p>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="section-label text-ink hover:text-accent transition-colors duration-300 border-b border-ink/20 hover:border-accent pb-px"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
