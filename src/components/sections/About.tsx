'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowUpRight, Cloud, Code2, Database, Layout, Radio, Server, Sparkles, type LucideIcon,
} from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { glassClass } from '@/components/ui/GlassCard'
import { profile } from '@/data/profile'
import { experiences } from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: '-80px' } as const

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

// ─── Derived from data — nothing here is hard-coded marketing copy ────────────
const current = experiences.find((e) => e.current) ?? experiences[0]
const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? ''
// Oldest → newest for the career rail
const career = [...experiences].reverse().map((e) => ({
  year: startYear(e.period),
  company: e.company,
  current: !!e.current,
}))

const FEATURED_SLUGS = ['qrbell', 'qrbell-store', 'kgmu-hospital-management-system']
const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is (typeof projects)[number] => Boolean(p),
)

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  'Real-time & Integrations': Radio,
  'DevOps & Tools': Cloud,
}

const expertise: { icon: LucideIcon; title: string; desc: string; stack: string[] }[] = [
  {
    icon: Layout,
    title: 'Frontend Engineering',
    desc: 'Responsive, component-driven interfaces, storefronts and admin dashboards.',
    stack: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind'],
  },
  {
    icon: Server,
    title: 'Backend & API Development',
    desc: 'REST APIs with JWT auth, RBAC, payment gateways and workflow automation.',
    stack: ['Node.js', 'Express', 'Fastify', 'Laravel'],
  },
  {
    icon: Radio,
    title: 'Real-time Systems',
    desc: 'Video & audio calls, live messaging, location and push notifications.',
    stack: ['WebRTC', 'Socket.IO', 'Agora', 'Firebase'],
  },
  {
    icon: Database,
    title: 'Database & Infrastructure',
    desc: 'Relational and document data, caching, containers and CI/CD deploys.',
    stack: ['PostgreSQL', 'Redis', 'Docker', 'AWS'],
  },
]

// ─── Developer Snapshot panel ─────────────────────────────────────────────────
function SnapshotRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-t border-white/[0.06] py-3 first:border-t-0">
      <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-muted/70">{label}</dt>
      <dd className="font-body text-sm text-ink">{children}</dd>
    </div>
  )
}

function DeveloperSnapshot() {
  return (
    <motion.aside
      variants={reveal}
      aria-label="Developer snapshot"
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] backdrop-blur-xl"
    >
      {/* Soft cyan light from the top-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(0,194,255,0.28), transparent)' }}
      />
      <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      {/* Window chrome */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-6 py-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-neon-emerald/70" />
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.25em] text-muted">developer.snapshot</span>
      </div>

      <div className="relative px-6 pb-6 pt-5">
        {/* Headline metric */}
        <div className="mb-4 flex items-end gap-4">
          <p className="font-display text-6xl font-bold leading-none tracking-tight">
            <span className="gradient-text">4+</span>
          </p>
          <p className="pb-1 font-display text-xs uppercase leading-snug tracking-[0.18em] text-muted">
            Years of professional
            <br />
            experience
          </p>
        </div>

        <dl>
          <SnapshotRow label="Role">{profile.title}</SnapshotRow>
          <SnapshotRow label="Core">
            <span className="text-neon-blue">React.js</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-neon-emerald">Node.js</span>
          </SnapshotRow>
          <SnapshotRow label="Focus">Real-time systems · Backend engineering</SnapshotRow>
          <SnapshotRow label="Now">
            {current.company} <span className="text-muted">· {current.location}</span>
          </SnapshotRow>
        </dl>

        {/* Career rail */}
        <div className="mt-4 border-t border-white/[0.06] pt-5">
          <p className="mb-4 font-display text-[10px] uppercase tracking-[0.22em] text-muted/70">Career path</p>
          <ol className="relative grid grid-cols-3 gap-3">
            <span
              aria-hidden="true"
              className="absolute left-1 right-1 top-[5px] h-px bg-gradient-to-r from-white/10 via-neon-blue/40 to-neon-emerald/60"
            />
            {career.map(({ year, company, current: isNow }) => (
              <li key={company} className="relative">
                <span
                  className={`relative mb-3 block h-[11px] w-[11px] rounded-full border-2 ${
                    isNow
                      ? 'border-neon-emerald bg-neon-emerald/30 shadow-glow-emerald-sm'
                      : 'border-neon-blue/60 bg-bg'
                  }`}
                />
                <p className="font-display text-xs font-semibold text-ink">{year}</p>
                <p className="mt-0.5 font-body text-[11px] leading-snug text-muted">{company}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.aside>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
      <SectionTitle index="01" label="Who I Am" title="About Me" />

      {/* ── Row 1: story + snapshot ─────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14"
      >
        <div>
          <motion.h3
            variants={reveal}
            className="mb-6 text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl"
          >
            I engineer the <span className="gradient-text">real-time</span>, production-grade systems
            behind modern web products.
          </motion.h3>

          <motion.p variants={reveal} className="mb-5 font-body text-base leading-relaxed text-muted md:text-[17px]">
            I&apos;m <span className="font-medium text-ink">{profile.name}</span>, a full stack developer
            who has spent the last 4+ years shipping software across healthcare, e-commerce, enterprise
            and communication products, from the database schema to the last pixel of the interface.
          </motion.p>

          <motion.p variants={reveal} className="mb-7 font-body text-base leading-relaxed text-muted md:text-[17px]">
            Today at <span className="font-medium text-ink">{current.company}</span> I build QRBell,
            QRBell Store and Glamee: live video and messaging, secure payments, and tested checkout flows
            on React, Node.js and PostgreSQL.
          </motion.p>

          {/* Philosophy */}
          <motion.figure
            variants={reveal}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] py-5 pl-6 pr-5"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-neon-blue to-neon-emerald" />
            <p className="mb-2 flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.25em] text-neon-blue">
              <Sparkles size={12} /> How I work
            </p>
            <blockquote className="font-display text-lg leading-snug text-ink/90">
              Clear architecture, predictable APIs and tested user flows, so software stays reliable
              long after launch day.
            </blockquote>
          </motion.figure>
        </div>

        <DeveloperSnapshot />
      </motion.div>

      {/* ── Row 2: expertise ────────────────────────────────── */}
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {expertise.map(({ icon: Icon, title, desc, stack }, i) => (
          <motion.li
            key={title}
            variants={reveal}
            className={glassClass(i % 2 === 0 ? 'blue' : 'emerald', 'flex flex-col p-5')}
          >
            <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-neon-blue/20 bg-neon-blue/[0.08] text-neon-blue transition-colors duration-300 group-hover:border-neon-emerald/30 group-hover:text-neon-emerald">
              <Icon size={16} />
            </span>
            <h4 className="mb-1.5 font-display text-[15px] font-semibold text-ink">{title}</h4>
            <p className="mb-4 font-body text-sm leading-relaxed text-muted">{desc}</p>
            <p className="mt-auto font-display text-[10px] uppercase tracking-[0.16em] text-muted/70">
              {stack.join(' · ')}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Row 3: toolkit + featured work ───────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
      >
        {/* Categorised toolkit */}
        <motion.div variants={reveal} className={glassClass('none', 'p-6')}>
          <p className="mb-5 flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.25em] text-neon-blue">
            <Code2 size={12} /> Toolkit
          </p>
          <dl className="space-y-4">
            {skillCategories.map(({ category, skills }) => {
              const Icon = categoryIcons[category] ?? Code2
              return (
                <div key={category} className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="flex items-center gap-2 pt-1 font-display text-xs font-medium text-ink">
                    <Icon size={13} className="shrink-0 text-neon-blue/80" />
                    {category}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {skills.map(({ name }) => (
                      <span
                        key={name}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-display text-[11px] text-muted transition-colors duration-300 hover:border-neon-blue/35 hover:text-neon-blue"
                      >
                        {name}
                      </span>
                    ))}
                  </dd>
                </div>
              )
            })}
          </dl>
        </motion.div>

        {/* Featured work */}
        <motion.div variants={reveal} className={glassClass('none', 'flex flex-col p-6')}>
          <p className="mb-4 font-display text-[10px] uppercase tracking-[0.25em] text-neon-blue">Featured work</p>
          <ul className="-mx-3 flex flex-1 flex-col">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group/item flex items-start justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue"
                >
                  <span className="min-w-0">
                    {p.details?.category && (
                      <span className="mb-1 block font-display text-[10px] uppercase tracking-[0.2em] text-neon-emerald/80">
                        {p.details.category}
                      </span>
                    )}
                    <span className="block font-display text-[15px] font-semibold text-ink transition-colors duration-300 group-hover/item:text-neon-blue">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block font-body text-[13px] leading-snug text-muted">
                      {p.details?.tagline ?? p.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="mt-5 shrink-0 text-muted transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-neon-blue"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
