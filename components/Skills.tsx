'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const skills = [
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'Bootstrap',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Django',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  },
  {
    name: 'Kotlin',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'Firebase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  },
  {
    name: 'Android',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  },
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('animate-fade-up'), i * 60)
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

        {/* Skills grid */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="reveal opacity-0-init skill-pill"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.icon}
                alt={skill.name}
                width={20}
                height={20}
                className="skill-pill-icon"
              />
              <span className="skill-pill-label">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
