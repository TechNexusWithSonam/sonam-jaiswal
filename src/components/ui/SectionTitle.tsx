'use client'

import { useId, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionTitleProps {
  index: string
  label: string
  title: string
  subtitle?: string
  /** Overrides the default `// {index} {label}` eyebrow text. */
  eyebrow?: string
  /** Extra content under the subtitle (e.g. stat chips). */
  children?: ReactNode
}

/** `// 01 LABEL` eyebrow + uppercase display heading + animated gradient rule (reference SectionHeading). */
export default function SectionTitle({ index, label, title, subtitle, eyebrow, children }: SectionTitleProps) {
  const gradId = `line-grad-${useId().replace(/:/g, '')}`

  return (
    <div className="mb-16 flex flex-col gap-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-xs uppercase tracking-[0.3em] text-neon-blue"
      >
        {eyebrow ?? `// ${index} ${label}`}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </motion.h2>
      <svg width="72" height="2" viewBox="0 0 72 2" className="overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="1" x2="72" y2="1">
            <stop offset="0%" stopColor="#00C2FF" />
            <stop offset="100%" stopColor="#00F7A5" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="1"
          x2="72"
          y2="1"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-balance font-body text-base leading-relaxed text-muted md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  )
}
