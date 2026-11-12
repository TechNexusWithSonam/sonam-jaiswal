'use client'

import { useId, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Briefcase, Building2, CalendarDays, ChevronDown, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { glassClass } from '@/components/ui/GlassCard'
import { experiences } from '@/data/experience'
import type { Experience as ExperienceEntry } from '@/types'

const EASE = [0.16, 1, 0.3, 1] as const
/** Bullets shown before "View more details". */
const VISIBLE_BULLETS = 3

// ─── Period helpers — everything shown is derived from the data file ─────────
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** "Mar 2023" → absolute month index; "Present" → current month. */
function toMonthIndex(value: string, now: Date): number | null {
  if (/present/i.test(value)) return now.getFullYear() * 12 + now.getMonth()
  const match = value.trim().match(/^([A-Za-z]{3})[A-Za-z]*\.?\s+(\d{4})$/)
  if (!match) return null
  const month = MONTHS.indexOf(match[1].toLowerCase())
  return month < 0 ? null : Number(match[2]) * 12 + month
}

function periodRange(period: string, now: Date) {
  const [start, end] = period.split(/\s*[–—-]\s*/)
  return { start: toMonthIndex(start ?? '', now), end: toMonthIndex(end ?? '', now) }
}

/** Inclusive month count, formatted like "2 yrs 10 mos". */
function formatDuration(period: string, now: Date) {
  const { start, end } = periodRange(period, now)
  if (start === null || end === null || end < start) return null
  const total = end - start + 1
  const years = Math.floor(total / 12)
  const months = total % 12
  return [
    years > 0 && `${years} yr${years > 1 ? 's' : ''}`,
    months > 0 && `${months} mo${months > 1 ? 's' : ''}`,
  ]
    .filter(Boolean)
    .join(' ')
}

function yearsOfExperience(now: Date) {
  const starts = experiences
    .map((e) => periodRange(e.period, now).start)
    .filter((s): s is number => s !== null)
  if (!starts.length) return null
  const nowIndex = now.getFullYear() * 12 + now.getMonth()
  return Math.floor((nowIndex - Math.min(...starts)) / 12)
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

// ─── Header stats ─────────────────────────────────────────────────────────────
function Stat({ icon: Icon, value, label, delay }: { icon: LucideIcon; value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-3 pr-5 backdrop-blur-xl transition-colors duration-300 hover:border-neon-blue/30"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-blue/20 bg-neon-blue/[0.08] text-neon-blue">
        <Icon size={16} />
      </span>
      <span className="flex items-baseline gap-2">
        <span suppressHydrationWarning className="gradient-text font-display text-2xl font-bold leading-none">
          {value}
        </span>
        <span className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">{label}</span>
      </span>
    </motion.div>
  )
}

// ─── Timeline node ────────────────────────────────────────────────────────────
function TimelineNode({ current }: { current?: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
      aria-hidden="true"
      className="relative flex h-6 w-6 items-center justify-center"
    >
      {current && (
        <span className="absolute inset-0 animate-ping rounded-full bg-neon-emerald/25 [animation-duration:2.4s]" />
      )}
      <span
        className={`relative h-3.5 w-3.5 rounded-full border-2 bg-bg transition-transform duration-500 group-hover/item:scale-125 ${
          current ? 'border-neon-emerald shadow-glow-emerald-sm' : 'border-neon-blue shadow-glow-blue-sm'
        }`}
      >
        {current && <span className="absolute inset-[2px] rounded-full bg-neon-emerald" />}
      </span>
    </motion.span>
  )
}

// ─── Experience card ──────────────────────────────────────────────────────────
function ExperienceItem({ exp, now }: { exp: ExperienceEntry; now: Date }) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const duration = formatDuration(exp.period, now)
  const visible = exp.description.slice(0, VISIBLE_BULLETS)
  const hidden = exp.description.slice(VISIBLE_BULLETS)

  const bullet = (text: string, first: boolean) => (
    <div className={`flex gap-3 ${first ? '' : 'pt-2.5'}`}>
      <span
        aria-hidden="true"
        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-neon-blue to-neon-emerald"
      />
      <span className="font-body text-sm leading-relaxed text-muted">{text}</span>
    </div>
  )

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group/item relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 sm:gap-x-6 lg:grid-cols-[180px_24px_minmax(0,1fr)] lg:gap-x-8"
    >
      {/* Desktop meta column */}
      <div className="hidden pt-6 text-right lg:block">
        <p className="font-display text-sm font-semibold text-ink">{exp.period}</p>
        {duration && (
          <p
            suppressHydrationWarning
            className="mt-1 font-display text-[11px] uppercase tracking-[0.2em] text-neon-blue/80"
          >
            {duration}
          </p>
        )}
        <p className="mt-3 flex items-center justify-end gap-1.5 font-body text-sm text-muted">
          <MapPin size={13} className="text-neon-blue" />
          {exp.location}
        </p>
      </div>

      {/* Node */}
      <div className="flex justify-center pt-6">
        <TimelineNode current={exp.current} />
      </div>

      {/* Card */}
      <article className={glassClass(exp.current ? 'emerald' : 'blue', 'card-shine p-5 sm:p-7')}>
        {exp.current && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-emerald/[0.07] via-transparent to-transparent ring-1 ring-inset ring-neon-emerald/20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon-emerald/70 to-transparent"
            />
          </>
        )}

        <div className="relative">
          {/* Header */}
          <header className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-display text-sm font-bold tracking-wider ${
                exp.current
                  ? 'border-neon-emerald/30 bg-neon-emerald/[0.08] text-neon-emerald'
                  : 'border-neon-blue/25 bg-neon-blue/[0.06] text-neon-blue'
              }`}
            >
              {initials(exp.company)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h3 className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{exp.company}</h3>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-emerald/30 bg-neon-emerald/[0.08] px-2.5 py-0.5 font-display text-[10px] uppercase tracking-[0.2em] text-neon-emerald">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-emerald" />
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 font-body text-sm font-medium text-neon-emerald">{exp.role}</p>

              {/* Mobile / tablet meta (desktop shows it in the left column) */}
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-body text-xs text-muted lg:hidden">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={12} className="text-neon-blue" />
                  {exp.period}
                  {duration && (
                    <span suppressHydrationWarning className="text-muted/70">
                      · {duration}
                    </span>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-neon-blue" />
                  {exp.location}
                </span>
              </div>
            </div>
          </header>

          {/* Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {exp.projectsLabel && (
                <span className="mr-1 font-display text-[10px] uppercase tracking-[0.25em] text-muted/80">
                  {exp.projectsLabel}
                </span>
              )}
              {exp.projects.map((p) =>
                p.slug ? (
                  <Link
                    key={p.name}
                    href={`/projects/${p.slug}`}
                    className="group/link inline-flex items-center gap-1 rounded-lg border border-neon-blue/25 bg-neon-blue/[0.06] px-2.5 py-1 font-body text-xs font-medium text-ink/90 transition-all duration-300 hover:border-neon-blue/60 hover:bg-neon-blue/[0.12] hover:text-ink hover:shadow-glow-blue-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60"
                  >
                    {p.name}
                    <ArrowUpRight
                      size={12}
                      className="text-neon-blue transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </Link>
                ) : (
                  <span
                    key={p.name}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-body text-xs font-medium text-muted"
                  >
                    {p.name}
                  </span>
                ),
              )}
            </div>
          )}

          {/* Responsibilities */}
          <ul id={listId} className="mt-5 border-t border-white/[0.06] pt-5">
            {visible.map((text, i) => (
              <li key={text}>{bullet(text, i === 0)}</li>
            ))}
            <AnimatePresence initial={false}>
              {expanded &&
                hidden.map((text) => (
                  <motion.li
                    key={text}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    {bullet(text, false)}
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>

          {hidden.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={listId}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-blue transition-colors hover:text-neon-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60"
            >
              {expanded ? 'Show less' : 'View more details'}
              {!expanded && <span className="text-muted">+{hidden.length}</span>}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          {/* Categorized tech */}
          <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-5">
            {exp.techGroups.map((group) => (
              <div key={group.category} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-neon-blue/80 sm:w-24 sm:shrink-0 sm:pt-1.5">
                  {group.category}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 font-display text-[11px] tracking-wide text-muted transition-colors duration-300 hover:border-neon-blue/40 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </article>
    </motion.li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Experience() {
  const now = new Date()
  const years = yearsOfExperience(now)
  const organizations = new Set(experiences.map((e) => e.company)).size

  const listRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-36">
      <SectionTitle
        index="03"
        label="Career Journey"
        eyebrow="03 / Career Journey"
        title="Where I've Worked"
        subtitle="Building products. Solving problems. Growing through engineering."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          {years !== null && years > 0 && (
            <Stat icon={Briefcase} value={`${years}+`} label="Years Experience" delay={0.3} />
          )}
          <Stat icon={Building2} value={String(organizations)} label="Organizations" delay={0.4} />
        </div>
      </SectionTitle>

      <ol ref={listRef} className="relative mx-auto flex max-w-5xl flex-col gap-10 md:gap-12">
        {/* Rail + scroll-linked progress fill; centred on the 24px node column */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[11px] top-6 w-0.5 rounded-full bg-white/[0.07] [mask-image:linear-gradient(to_bottom,black_85%,transparent)] lg:left-[223px]"
        >
          <motion.div
            style={{ scaleY: reduceMotion ? 1 : progress }}
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-neon-emerald via-neon-blue to-neon-blue/40 shadow-glow-blue-sm"
          />
        </div>

        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} now={now} />
        ))}
      </ol>
    </section>
  )
}
