'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Mail, MapPin, Twitter, Github, Linkedin } from 'lucide-react'

// ─── Replace these three values with your EmailJS credentials ───
const EMAILJS_SERVICE_ID  = 'service_1tri3ko'
const EMAILJS_TEMPLATE_ID = 'template_ya4rnes'
const EMAILJS_PUBLIC_KEY  = 'GcPBSs3DgtvYXQOt4'
// ────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formState.name,
          from_email: formState.email,
          message:    formState.message,
          reply_to:   formState.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">

        {/* Left */}
        <div className="md:w-1/2">
          <div className="reveal opacity-0-init mb-6 flex items-center gap-4">
            <span className="section-label">05 / Contact</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <h2 className="reveal opacity-0-init display-heading text-[clamp(40px,6vw,80px)] font-light mb-8 leading-none">
            Let&apos;s work
            <br />
            <em className="text-accent not-italic">together</em>
          </h2>

          <p className="reveal opacity-0-init text-muted font-light leading-relaxed mb-12 max-w-sm">
            Have a project in mind? I&apos;m always open to discussing new
            opportunities and interesting collaborations.
          </p>

          <div className="space-y-5 reveal opacity-0-init">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-ink/20 flex items-center justify-center">
                <Mail size={16} className="text-muted" />
              </div>
              <div>
                <span className="section-label block text-muted mb-0.5">Email</span>
                <a href="mailto:mohamedsafwat7706@gmail.com" className="text-ink hover:text-accent transition-colors duration-300 font-light">
                  mohamedsafwat7706@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-ink/20 flex items-center justify-center">
                <MapPin size={16} className="text-muted" />
              </div>
              <div>
                <span className="section-label block text-muted mb-0.5">Location</span>
                <span className="text-ink font-light">Cairo, Egypt (Remote-friendly)</span>
              </div>
            </div>
          </div>

          <div className="reveal opacity-0-init flex items-center gap-4 mt-10">
            {[
              { icon: Github,   href: 'https://github.com/Savotageofficial',      label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mohamed-safwat-169968314/', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-10 h-10 border border-ink/20 flex items-center justify-center text-muted hover:border-ink hover:text-ink transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="md:w-1/2">
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <div className="w-16 h-16 bg-ink flex items-center justify-center mb-4">
                <Send size={24} className="text-paper" />
              </div>
              <h3 className="display-heading text-3xl font-light">Message sent!</h3>
              <p className="text-muted font-light">I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name',  label: 'Your name',     type: 'text',  placeholder: 'Jane Smith' },
                { name: 'email', label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
              ].map((field) => (
                <div key={field.name} className="reveal opacity-0-init">
                  <label className="section-label block mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-transparent border border-ink/20 px-4 py-3 font-light text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors duration-300"
                  />
                </div>
              ))}

              <div className="reveal opacity-0-init">
                <label className="section-label block mb-2">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full bg-transparent border border-ink/20 px-4 py-3 font-light text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors duration-300 resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="section-label text-accent">
                  Something went wrong — please email me directly.
                </p>
              )}

              <div className="reveal opacity-0-init">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group w-full flex items-center justify-center gap-3 bg-ink text-paper py-4 hover:bg-accent transition-all duration-300 disabled:opacity-60"
                >
                  <span className="section-label text-paper">
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </span>
                  <Send size={14} className={`text-paper transition-transform duration-300 ${status === 'sending' ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
