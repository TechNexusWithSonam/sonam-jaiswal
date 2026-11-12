import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import fs from 'node:fs'
import path from 'node:path'

// Drop a transparent cutout at public/images/sonam-jaiswal.png and the hero switches to it automatically.
function resolvePortrait() {
  const cutout = path.join(process.cwd(), 'public', 'images', 'sonam-jaiswal.png')
  return fs.existsSync(cutout)
    ? { src: '/images/sonam-jaiswal.png', cutout: true }
    : { src: '/images/sonam-jaiswal.jpg', cutout: false }
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-30 min-h-screen overflow-hidden">
        <Hero portrait={resolvePortrait()} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
