'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'SDownloader',
    category: 'Web / Full Stack',
    year: '2024',
    description:
      'A full-stack YouTube downloader website that lets users download any video as audio or video and choose from all available resolutions. Built with Django, FastAPI, SQLite, and Pytube.',
    tags: ['Django', 'FastAPI', 'SQLite', 'Pytube', 'HTML/CSS'],
    color: '#1a1a2e',
    textColor: '#e8e0d0',
    link: '#',
    github: '#',
  },
  {
    number: '02',
    title: 'Capsule',
    category: 'Android / Mobile',
    year: '2024',
    description:
      'A medical assistant and appointment booking Android app with Firebase authentication and real-time chat via Firebase Realtime Database.',
    tags: ['Kotlin', 'Java', 'Firebase', 'Real-Time DB'],
    color: '#c84b31',
    textColor: '#f5f0e8',
    link: '#',
    github: '#',
  },
]

export default function Work() {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('animate-fade-up'), i * 120)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={ref} className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="reveal opacity-0-init mb-4 flex items-center gap-4">
            <span className="section-label">03 / Work</span>
            <div className="h-px w-24 bg-ink/10" />
          </div>
          <h2 className="reveal opacity-0-init display-heading text-[clamp(40px,6vw,72px)] font-light">
            Selected
            <br />
            <em className="text-accent not-italic">projects</em>
          </h2>
        </div>
        <span className="reveal opacity-0-init section-label hidden md:block">{projects.length} projects</span>
      </div>

      {/* Project list */}
      <div className="space-y-px">
        {projects.map((project, i) => (
          <div
            key={project.number}
            className="reveal opacity-0-init group border border-ink/10 hover:border-ink transition-colors duration-500 cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            data-hover
          >
            <div
              className="p-8 md:p-10 transition-colors duration-500"
              style={hovered === i ? { backgroundColor: project.color } : {}}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Number + meta */}
                <div className="flex md:flex-col gap-4 md:gap-1 md:w-32 shrink-0">
                  <span
                    className="section-label transition-colors duration-500"
                    style={hovered === i ? { color: project.textColor + '80' } : {}}
                  >
                    {project.number}
                  </span>
                  <span
                    className="section-label transition-colors duration-500"
                    style={hovered === i ? { color: project.textColor + '80' } : {}}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <span
                        className="section-label block mb-2 transition-colors duration-500"
                        style={hovered === i ? { color: project.textColor + '80' } : {}}
                      >
                        {project.category}
                      </span>
                      <h3
                        className="display-heading text-3xl md:text-4xl font-light transition-colors duration-500"
                        style={hovered === i ? { color: project.textColor } : {}}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        className="p-2 border border-current transition-all duration-300 hover:scale-110"
                        style={hovered === i ? { color: project.textColor, borderColor: project.textColor + '40' } : {}}
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={project.link}
                        className="p-2 border border-current transition-all duration-300 hover:scale-110"
                        style={hovered === i ? { color: project.textColor, borderColor: project.textColor + '40' } : {}}
                        aria-label="Live link"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  <p
                    className="font-light leading-relaxed max-w-xl mb-6 transition-colors duration-500"
                    style={hovered === i ? { color: project.textColor + 'cc' } : { color: '#8a8070' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="section-label px-3 py-1 border transition-colors duration-500"
                        style={
                          hovered === i
                            ? { color: project.textColor + 'cc', borderColor: project.textColor + '30' }
                            : { borderColor: '#0a0a0a20' }
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
