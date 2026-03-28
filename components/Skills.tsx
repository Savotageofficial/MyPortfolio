'use client'

import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Kotlin', level: 85 },
      { name: 'Java', level: 82 },
      { name: 'JavaScript', level: 78 },
    ],
  },
  {
    category: 'Backend & Web',
    skills: [
      { name: 'Django', level: 90 },
      { name: 'FastAPI', level: 85 },
      { name: 'HTML / CSS', level: 80 },
      { name: 'SQLite / MongoDB', level: 78 },
    ],
  },
  {
    category: 'Mobile & Tools',
    skills: [
      { name: 'Android (Kotlin/Java)', level: 85 },
      { name: 'Firebase', level: 83 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'Gunicorn', level: 72 },
    ],
  },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && barRef.current) {
          setTimeout(() => {
            if (barRef.current) {
              barRef.current.style.width = level + '%'
            }
          }, delay)
        }
      },
      { threshold: 0.5 }
    )
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-light text-ink">{name}</span>
        <span className="section-label text-muted">{level}%</span>
      </div>
      <div className="h-px bg-ink/10 relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 bg-ink transition-all duration-1000 ease-out group-hover:bg-accent"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="py-28 bg-ink text-paper">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="reveal opacity-0-init mb-4 flex items-center gap-4">
              <span className="section-label text-paper/50">04 / Skills</span>
              <div className="h-px w-24 bg-paper/10" />
            </div>
            <h2 className="reveal opacity-0-init display-heading text-[clamp(40px,6vw,72px)] font-light text-paper">
              Tools of
              <br />
              <em className="text-accent not-italic">the trade</em>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillGroups.map((group, gi) => (
            <div key={group.category} className="reveal opacity-0-init">
              <div className="flex items-center gap-4 mb-8">
                <span className="section-label text-accent">{String(gi + 1).padStart(2, '0')}</span>
                <span className="display-heading text-2xl font-light text-paper">{group.category}</span>
              </div>
              <div className="space-y-6">
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={si * 150 + gi * 50} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hr-ink border-paper/10 mt-24 mb-16" />

        {/* Tool logos row */}
        <div className="reveal opacity-0-init flex flex-wrap gap-6 items-center justify-center">
          {['Python', 'Kotlin', 'Java', 'JavaScript', 'Django', 'FastAPI', 'Firebase', 'SQLite', 'MongoDB', 'Git'].map(
            (tool) => (
              <span
                key={tool}
                className="section-label text-paper/40 hover:text-paper transition-colors duration-300 cursor-default"
              >
                {tool}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
