'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.opacity-0-init')
    if (!els) return
    els.forEach((el) => el.classList.add('animate-fade-up'))
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-end pb-16 pt-32 px-6 md:px-12 max-w-7xl mx-auto relative"
    >
      {/* Index number */}
      <div className="opacity-0-init stagger-1 absolute top-32 right-6 md:right-12">
        <span className="section-label">01 / Hero</span>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-12 top-32 bottom-16 w-px bg-ink/10" />

      {/* Status badge */}
      <div className="opacity-0-init stagger-1 flex items-center gap-2 mb-12 pl-8 md:pl-0">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="section-label">Available for work</span>
      </div>

      {/* Main heading */}
      <div className="pl-8 md:pl-0">
        <h1 className="display-heading text-[clamp(56px,12vw,160px)] font-light text-ink opacity-0-init stagger-2 leading-none">
          Mohamed
          <br />
          <em className="font-light text-accent not-italic">Safwat</em>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-8 gap-8">
          <div className="opacity-0-init stagger-3 max-w-md">
            <p className="text-muted font-light leading-relaxed text-lg">
              Full stack developer & Android engineer building production-ready web
              and mobile applications — from Django backends to Kotlin apps.
            </p>
          </div>

          <div className="opacity-0-init stagger-4 flex flex-col items-start md:items-end gap-2">
            <span className="section-label">Based in</span>
            <span className="display-heading text-2xl font-light">Cairo, Egypt</span>
          </div>
        </div>

        {/* CTA row */}
        <div className="opacity-0-init stagger-5 flex items-center gap-6 mt-14">
          <a
            href="#work"
            className="group flex items-center gap-3 bg-ink text-paper px-8 py-4 hover:bg-accent transition-colors duration-300"
          >
            <span className="section-label text-paper tracking-widest">View Work</span>
            <ArrowDown size={14} className="text-paper group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="section-label text-ink border-b border-ink hover:text-accent hover:border-accent transition-colors duration-300 pb-px"
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="opacity-0-init stagger-5 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="section-label">Scroll</span>
        <div className="w-px h-12 bg-ink/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-ink animate-[lineGrow_2s_ease_infinite]" />
        </div>
      </div>
    </section>
  )
}
