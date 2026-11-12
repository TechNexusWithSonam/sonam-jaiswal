'use client'

import { Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const socials = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
]

export default function Footer() {
  return (
    <footer className="relative z-30 mt-12">
      <div className="flex justify-center px-6 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl rounded-3xl border border-white/[0.06] bg-bg px-8 py-6 text-center font-display text-lg font-medium leading-snug text-ink shadow-[0_0_80px_rgba(5,8,22,1)] sm:text-2xl"
        >
          Engineering scalable digital experiences that create{' '}
          <motion.span
            className="inline-block text-neon-emerald"
            animate={{
              textShadow: [
                '0 0 20px rgba(0,247,165,.6), 0 0 40px rgba(0,247,165,.4), 0 0 80px rgba(0,247,165,.2)',
                '0 0 28px rgba(0,247,165,.75), 0 0 56px rgba(0,247,165,.5), 0 0 100px rgba(0,247,165,.28)',
                '0 0 20px rgba(0,247,165,.6), 0 0 40px rgba(0,247,165,.4), 0 0 80px rgba(0,247,165,.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            real business value
          </motion.span>
          .
        </motion.p>
      </div>

      {/* Digital horizon line */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 bg-bg/60 px-6 py-8 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left md:px-12">
        <p className="font-body text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={`${label}: ${value}`}
              title={value}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-muted transition-colors duration-300 hover:border-neon-blue/40 hover:text-neon-blue hover:shadow-glow-blue-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">
          {profile.title} · {profile.location}
        </p>
      </div>
    </footer>
  )
}
