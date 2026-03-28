'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: '2+', label: 'Years building' },
  { value: '4+', label: 'Projects shipped' },
  { value: '3', label: 'Certificates earned' },
  { value: '2', label: 'Platforms mastered' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('animate-fade-up'), i * 100)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left */}
        <div className="md:w-1/2">
          <div className="reveal opacity-0-init mb-6 flex items-center gap-4">
            <span className="section-label">02 / About</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <h2 className="reveal opacity-0-init display-heading text-[clamp(40px,6vw,72px)] font-light text-ink mb-8">
            Craft over
            <br />
            <em className="text-accent not-italic">everything</em>
          </h2>

          <div className="space-y-5 text-muted font-light leading-relaxed reveal opacity-0-init">
            <p>
              I&apos;m a full stack developer and Android engineer currently studying Software Engineering
              at Helwan University / Capital University in Cairo, Egypt.
            </p>
            <p>
              I build production-ready web apps using Django, FastAPI, and modern JavaScript,
              as well as native Android apps in Kotlin and Java backed by Firebase.
            </p>
            <p>
              Recognized at LinkCu&apos;s Link Conference &apos;25, certified by Digital Egypt Pioneers Initiative,
              and always looking for the next hard problem to solve.
            </p>
          </div>

          <div className="reveal opacity-0-init mt-10">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-3 border border-ink px-6 py-3 section-label hover:bg-ink hover:text-paper transition-all duration-300"
            >
              Download CV
              <span className="text-accent">↓</span>
            </a>
          </div>
        </div>

        {/* Right — stats */}
        <div className="md:w-1/2 grid grid-cols-2 gap-px bg-ink/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="reveal opacity-0-init bg-paper p-8 flex flex-col justify-between gap-4 hover:bg-paper-dark transition-colors duration-300"
            >
              <span className="display-heading text-6xl font-light text-ink">{stat.value}</span>
              <span className="section-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
