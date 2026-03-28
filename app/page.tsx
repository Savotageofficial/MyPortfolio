import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Work from '@/components/Work'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
