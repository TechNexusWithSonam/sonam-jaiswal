'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import type { NavItem } from '@/types'
import { profile } from '@/data/profile'

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // On sub-pages (e.g. /projects/[slug]) the sections don't exist — fall back to the home page anchor
  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = `/${href}`
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[70] rounded-full bg-neon-blue px-4 py-2 text-sm font-medium text-bg focus:not-sr-only"
      >
        Skip to content
      </a>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? 'border-white/[0.06] bg-bg/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname !== '/') return
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-neon-emerald shadow-glow-emerald-sm" />
            {profile.name}
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`font-display text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-neon-blue ${
                    active === item.href ? 'text-neon-blue' : 'text-muted'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                download="Sonam_Jaiswal_Resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] px-4 py-1.5 font-display text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-neon-blue/40 hover:bg-white/[0.04] hover:text-neon-blue"
              >
                Resume
                <Download size={12} />
              </a>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            className="p-2 text-muted transition-colors hover:text-neon-blue md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-white/[0.06] bg-bg/90 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full rounded-xl px-4 py-3 text-left font-display text-xs uppercase tracking-[0.2em] transition-colors duration-150 hover:bg-white/[0.04] hover:text-neon-blue ${
                      active === item.href ? 'text-neon-blue' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/resume.pdf"
                  download="Sonam_Jaiswal_Resume.pdf"
                  className="block rounded-full bg-gradient-to-r from-neon-blue to-neon-emerald px-4 py-3 text-center font-display text-sm font-medium text-bg shadow-glow-blue-sm"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
