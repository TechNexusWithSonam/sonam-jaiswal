'use client'

import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import { glassClass } from '@/components/ui/GlassCard'
import { coreStack, engineeringPractices, techCategories } from '@/data/skills'
import { categoryIcons, practiceIcons, techLogos } from '@/components/skills/techLogos'
import type { Tech, TechCategory, TechLogoKey } from '@/types'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: '-60px' } as const

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

// ─── Logo mark ────────────────────────────────────────────────────────────────
// Brand colour shows at rest; the parent `group/tile` hover/focus adds a soft glow in that colour.
function LogoMark({ logo, size = 20 }: { logo: TechLogoKey; size?: number }) {
  const mark = techLogos[logo]
  const style = { '--logo-glow': `${mark.color}99`, color: mark.color } as CSSProperties
  const cls =
    'shrink-0 opacity-[0.85] transition-[filter,opacity,transform] duration-300 group-hover/tile:scale-110 group-hover/tile:opacity-100 group-hover/tile:[filter:drop-shadow(0_0_8px_var(--logo-glow))] group-focus-visible/tile:opacity-100 group-focus-visible/tile:[filter:drop-shadow(0_0_8px_var(--logo-glow))]'

  if (mark.kind === 'glyph') {
    const Icon = mark.icon
    return <Icon aria-hidden="true" size={size} strokeWidth={1.8} className={cls} style={style} />
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={cls} style={style}>
      <path d={mark.path} />
    </svg>
  )
}

// ─── Core stack band ──────────────────────────────────────────────────────────
function CoreStack() {
  return (
    <motion.div
      variants={reveal}
      className="relative mb-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-neon-blue/[0.06] via-white/[0.02] to-neon-emerald/[0.05] p-5 backdrop-blur-xl sm:p-6"
    >
      <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <div className="shrink-0 lg:w-48">
          <p className="mb-1 font-display text-[10px] uppercase tracking-[0.25em] text-neon-emerald">Core expertise</p>
          <p className="font-body text-sm leading-snug text-muted">The stack I reach for first and use every day.</p>
        </div>
        <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {coreStack.map((t) => (
            <li
              key={t.name}
              title={t.note}
              className="group/tile flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-bg/40 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-blue/30 hover:bg-white/[0.04]"
            >
              <LogoMark logo={t.logo} size={24} />
              <span className="font-display text-sm font-semibold text-ink">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({ category, index }: { category: TechCategory; index: number }) {
  const [active, setActive] = useState<Tech | null>(null)
  const Icon = categoryIcons[category.icon]

  return (
    <motion.article
      variants={reveal}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onMouseLeave={() => setActive(null)}
      className={glassClass(index % 2 === 0 ? 'blue' : 'emerald', 'card-shine flex flex-col p-5 sm:p-6')}
    >
      {/* Header */}
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-blue/20 bg-neon-blue/[0.08] text-neon-blue transition-colors duration-300 group-hover:border-neon-emerald/30 group-hover:text-neon-emerald">
            <Icon size={16} />
          </span>
          <h3 className="font-display text-[15px] font-semibold text-ink">{category.title}</h3>
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </header>

      {/* Tech tiles — hover, focus or tap to read the note */}
      <ul className="grid grid-cols-2 gap-2">
        {category.techs.map((t) => {
          const isActive = active?.name === t.name
          return (
            <li key={t.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(t)}
                onFocus={() => setActive(t)}
                onClick={() => setActive(t)}
                aria-describedby={`${category.id}-note`}
                className={`group/tile flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue ${
                  isActive
                    ? 'border-neon-blue/30 bg-white/[0.06]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                }`}
              >
                <LogoMark logo={t.logo} size={18} />
                <span className="min-w-0 truncate font-body text-[13px] text-ink/90">{t.name}</span>
                {t.core && (
                  <span
                    title="Core expertise"
                    className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-neon-emerald shadow-glow-emerald-sm"
                  >
                    <span className="sr-only">Core expertise</span>
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Caption — category summary by default, the hovered tech's note otherwise */}
      <div
        id={`${category.id}-note`}
        aria-live="polite"
        className="mt-5 min-h-[3.75rem] border-t border-white/[0.06] pt-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.name ?? 'summary'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {active ? (
              <>
                <p className="mb-0.5 flex items-center gap-2 font-display text-[11px] font-medium uppercase tracking-[0.18em] text-neon-blue">
                  {active.name}
                  {active.core && <span className="text-neon-emerald">· Core</span>}
                </p>
                <p className="font-body text-[13px] leading-snug text-muted">{active.note}</p>
              </>
            ) : (
              <p className="font-body text-[13px] leading-snug text-muted">{category.summary}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

// ─── Engineering practices ────────────────────────────────────────────────────
function Practices() {
  return (
    <motion.div variants={reveal} className={glassClass('none', 'mt-6 p-5 sm:p-6')}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-[15px] font-semibold text-ink">Engineering Practices</h3>
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-neon-blue">How it all fits together</p>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        {engineeringPractices.map(({ name, icon, note }) => {
          const Icon = practiceIcons[icon]
          return (
            <li
              key={name}
              className="group flex gap-3.5 bg-bg/80 p-4 transition-colors duration-300 hover:bg-[#081126]"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neon-emerald/20 bg-neon-emerald/[0.06] text-neon-emerald transition-shadow duration-300 group-hover:shadow-glow-emerald-sm">
                <Icon size={15} />
              </span>
              <div>
                <p className="mb-0.5 font-display text-sm font-semibold text-ink">{name}</p>
                <p className="font-body text-[13px] leading-snug text-muted">{note}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
      <SectionTitle
        index="02"
        label="What I Know"
        title="Technical Expertise"
        subtitle="The tools and practices I use to design, build and ship production-grade applications."
      />

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <CoreStack />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {techCategories.map((c, i) => (
          <CategoryCard key={c.id} category={c} index={i} />
        ))}
      </motion.div>

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <Practices />
      </motion.div>
    </section>
  )
}
