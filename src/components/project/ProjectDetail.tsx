'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CalendarDays, CircleCheck, ExternalLink, Github,
  Info, Lightbulb, Mail, Maximize2, Target, AlertTriangle, UserRound, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import type { GalleryItem, Project, ProjectDetails } from '@/types'
import { projectIcons, statusMeta } from './icons'
import ProjectVisual from './ProjectVisual'
import ArchitectureDiagram from './ArchitectureDiagram'
import { ctaClassName } from '@/components/ui/CTAButton'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string
  index: string
  label: string
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-white/[0.07] py-14 first:border-t-0 first:pt-0 sm:py-16">
      <motion.header {...fadeUp} className="mb-8 max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-neon-blue">
          // {index} · {label}
        </p>
        <h2 id={`${id}-title`} className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-[32px] sm:leading-tight">
          {title}
        </h2>
        {intro && <p className="mt-3 leading-relaxed text-muted">{intro}</p>}
      </motion.header>
      {children}
    </section>
  )
}

function StatusBadge({ status }: { status: ProjectDetails['status'] }) {
  const s = statusMeta[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-display text-[11px] uppercase tracking-[0.18em] ${s.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Table of contents + progress                                        */
/* ------------------------------------------------------------------ */

type TocItem = { id: string; label: string }

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function TableOfContents({ items }: { items: TocItem[] }) {
  const active = useActiveSection(items.map((i) => i.id))
  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="mb-4 font-display text-[11px] uppercase tracking-[0.25em] text-muted/70">On this page</p>
      <ul className="space-y-0.5 border-l border-white/[0.08]">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
                active === item.id ? 'border-neon-blue text-ink' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <span className="font-display text-[10px] leading-5 text-muted/50">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-neon-blue to-neon-emerald"
    />
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ project, d }: { project: Project; d: ProjectDetails }) {
  const meta = [
    d.role && { icon: UserRound, label: 'Role', value: d.role },
    d.company && { icon: Briefcase, label: 'Company', value: d.company },
    d.period && { icon: CalendarDays, label: 'Timeline', value: d.period },
  ].filter(Boolean) as { icon: typeof Briefcase; label: string; value: string }[]

  return (
    <header className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-neon-blue/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-neon-blue">
            <ArrowLeft size={16} /> All projects
          </Link>
        </motion.nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-neon-blue/30 bg-neon-blue/5 px-3 py-1 font-display text-[11px] uppercase tracking-[0.18em] text-neon-blue">
                {d.category}
              </span>
              <StatusBadge status={d.status} />
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">{d.tagline}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology highlights">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 font-display text-[11px] uppercase tracking-wider text-ink/80">
                  {t}
                </li>
              ))}
            </ul>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={ctaClassName('primary')}>
                    <ExternalLink size={16} /> Visit live site
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={ctaClassName('secondary')}>
                    <Github size={16} /> View source
                  </a>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative rounded-2xl bg-gradient-to-br from-neon-blue/40 via-white/[0.06] to-neon-emerald/30 p-px"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#060B1D]">
              <ProjectVisual visual={project.visual} src={project.image} alt={`${project.title} interface`} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
          </motion.div>
        </div>

        {/* Meta strip */}
        {meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 grid grid-cols-1 divide-y divide-white/[0.07] border-y border-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-4 sm:px-6 sm:first:pl-0">
                <Icon size={17} className="shrink-0 text-neon-blue" />
                <div>
                  <dt className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">{label}</dt>
                  <dd className="text-sm text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Overview({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="overview" index={n} label="Overview" title="What the product does">
      <div className={`grid gap-8 ${d.inSimpleWords ? 'xl:grid-cols-[1.4fr_1fr]' : ''}`}>
        <motion.div {...fadeUp} className="space-y-4 text-[17px] leading-relaxed text-muted">
          {d.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {d.audience && d.audience.length > 0 && (
            <div className="pt-3">
              <p className="mb-3 font-display text-[11px] uppercase tracking-[0.2em] text-muted/70">Who it’s for</p>
              <ul className="flex flex-wrap gap-2">
                {d.audience.map((a) => (
                  <li key={a} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {d.inSimpleWords && (
          <motion.aside {...fadeUp} className="h-fit border-l-2 border-neon-emerald/60 bg-neon-emerald/[0.03] py-5 pl-5 pr-4">
            <p className="inline-flex items-center gap-2 font-display text-sm font-semibold text-neon-emerald">
              <Lightbulb size={16} /> In simple words
            </p>
            <p className="mt-2 leading-relaxed text-ink/90">{d.inSimpleWords}</p>
          </motion.aside>
        )}
      </div>

      {d.disclosureNote && (
        <motion.p {...fadeUp} className="mt-8 flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm leading-relaxed text-muted">
          <Info size={17} className="mt-0.5 shrink-0 text-neon-blue" />
          {d.disclosureNote}
        </motion.p>
      )}
    </Section>
  )
}

function ProblemSolution({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="problem" index={n} label="Problem & Solution" title="Why it was built">
      <div className="grid overflow-hidden rounded-2xl border border-white/[0.08] md:grid-cols-2">
        <motion.div {...fadeUp} className="bg-white/[0.02] p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-[#FF8A9B]">
            <AlertTriangle size={15} /> The problem
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/90">{d.problem}</p>
        </motion.div>
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="border-t border-white/[0.08] bg-neon-emerald/[0.035] p-6 sm:p-8 md:border-l md:border-t-0"
        >
          <p className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-neon-emerald">
            <Target size={15} /> The solution
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/90">{d.solution}</p>
        </motion.div>
      </div>
    </Section>
  )
}

function Features({ d, n }: { d: ProjectDetails; n: string }) {
  const features = d.features ?? []
  return (
    <Section
      id="features"
      index={n}
      label="Key Features"
      title="What it can do"
      intro="Each feature in plain language, with a short note on how it’s built underneath."
    >
      <div className="grid gap-x-10 sm:grid-cols-2">
        {features.map((f, i) => {
          const Icon = projectIcons[f.icon]
          return (
            <motion.article
              key={f.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
              className="group flex gap-4 border-t border-white/[0.07] py-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-blue/20 bg-neon-blue/10 text-neon-blue transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-neon-blue group-hover:to-neon-emerald group-hover:text-bg">
                <Icon size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[17px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{f.simple}</p>
                <p className="mt-3 border-l border-neon-blue/30 pl-3 font-mono text-[12.5px] leading-relaxed text-neon-blue/85">
                  <span className="text-muted/60">under the hood → </span>
                  {f.technical}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}

function Role({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="role" index={n} label="My Role" title="Role & contributions">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <motion.div {...fadeUp} className="space-y-4">
          {d.role && (
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">Position</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{d.role}</p>
            </div>
          )}
          {d.company && (
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">Company</p>
              <p className="mt-1 text-ink">{d.company}</p>
            </div>
          )}
          {d.period && (
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">Timeline</p>
              <p className="mt-1 text-ink">{d.period}</p>
            </div>
          )}
        </motion.div>
        <ol className="grid gap-x-8 sm:grid-cols-2">
          {d.contributions.map((c, i) => (
            <motion.li
              key={c}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 2) * 0.06 }}
              className="flex gap-4 border-t border-white/[0.07] py-4"
            >
              <span className="font-display text-sm font-semibold text-neon-blue/70">{String(i + 1).padStart(2, '0')}</span>
              <span className="leading-relaxed text-ink/90">{c}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

function Architecture({ d, n }: { d: ProjectDetails; n: string }) {
  const arch = d.architecture!
  return (
    <Section id="architecture" index={n} label="Technical Architecture" title="How it’s put together" intro={arch.summary}>
      <motion.div {...fadeUp}>
        <ArchitectureDiagram arch={arch} />
      </motion.div>

      <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {arch.notes.map((note, i) => {
          const Icon = projectIcons[note.icon]
          return (
            <motion.div key={note.layer} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}>
              <dt className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                <Icon size={15} className="text-neon-blue" /> {note.layer}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{note.body}</dd>
            </motion.div>
          )
        })}
      </dl>

      {arch.flow && (
        <div className="mt-12">
          <motion.h3 {...fadeUp} className="mb-6 font-display text-[11px] uppercase tracking-[0.25em] text-muted/80">
            {arch.flow.title}
          </motion.h3>
          <ol
            className="relative grid gap-5 md:gap-3 md:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
            style={{ ['--steps' as string]: arch.flow.steps.length } as React.CSSProperties}
          >
            {arch.flow.steps.map((s, i) => (
              <motion.li
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                className="relative flex gap-4 md:flex-col md:gap-0"
              >
                {i < arch.flow!.steps.length - 1 && (
                  <>
                    <span className="absolute bottom-[-1.25rem] left-[17px] top-10 w-px bg-gradient-to-b from-neon-blue/60 to-neon-blue/10 md:hidden" />
                    <span className="absolute left-11 right-[-0.75rem] top-[18px] hidden h-px bg-gradient-to-r from-neon-blue/60 to-neon-blue/10 md:block" />
                  </>
                )}
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neon-blue bg-bg font-display text-sm font-semibold text-neon-blue">
                  {i + 1}
                </span>
                <div className="md:mt-3 md:pr-3">
                  <p className="font-display font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  )
}

function TechStack({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="tech" index={n} label="Tech Stack" title="Technologies by category">
      <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {d.techGroups.map((g, i) => {
          const Icon = projectIcons[g.icon]
          return (
            <motion.div
              key={g.layer}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:gap-6"
            >
              <p className="flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                <Icon size={16} className="text-neon-blue" /> {g.layer}
              </p>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {g.items.map((t) => (
                  <li key={t.name}>
                    <p className="font-display text-[15px] font-medium text-neon-blue">{t.name}</p>
                    <p className="text-sm text-muted">{t.purpose}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function Challenges({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="challenges" index={n} label="Engineering" title="Development challenges">
      <ol className="space-y-4">
        {d.challenges!.map((c, i) => (
          <motion.li
            key={c.challenge}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            className="grid overflow-hidden rounded-2xl border border-white/[0.08] md:grid-cols-[1fr_1fr]"
          >
            <div className="flex gap-4 bg-white/[0.02] p-5 sm:p-6">
              <span className="font-display text-2xl font-bold leading-none text-white/15">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">Challenge</p>
                <p className="mt-1.5 leading-relaxed text-ink">{c.challenge}</p>
              </div>
            </div>
            <div className="flex gap-3 border-t border-white/[0.08] bg-neon-blue/[0.03] p-5 sm:p-6 md:border-l md:border-t-0">
              <CircleCheck size={18} className="mt-0.5 shrink-0 text-neon-emerald" />
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted/70">How it was handled</p>
                <p className="mt-1.5 leading-relaxed text-muted">{c.approach}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}

function Outcomes({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="results" index={n} label="Results & Impact" title="What was delivered">
      <ul className="grid gap-3 sm:grid-cols-2">
        {d.outcomes.map((o, i) => (
          <motion.li
            key={o}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            className="flex gap-3 rounded-xl border border-neon-emerald/15 bg-gradient-to-br from-neon-emerald/[0.06] to-transparent p-5"
          >
            <CircleCheck size={19} className="mt-0.5 shrink-0 text-neon-emerald" />
            <span className="leading-relaxed text-ink/90">{o}</span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-muted/70">
        Outcomes describe delivered scope. Usage or performance figures aren’t published for this project.
      </p>
    </Section>
  )
}

function Gallery({ project, items, n }: { project: Project; items: GalleryItem[]; n: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((dir: number) => setOpen((o) => (o === null ? o : (o + dir + items.length) % items.length)), [items.length])
  const illustrative = items.some((g) => !g.src)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const current = open !== null ? items[open] : null

  return (
    <Section
      id="gallery"
      index={n}
      label="Gallery"
      title="Key screens & workflows"
      intro={illustrative ? 'Illustrative mockups of the main screens and flows — representative of the workflows, not production screenshots.' : undefined}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
          <motion.figure key={g.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.07 }}>
            <button
              onClick={() => setOpen(i)}
              aria-label={`Enlarge: ${g.title}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#060B1D] transition-colors hover:border-neon-blue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue"
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                <ProjectVisual visual={g.visual} src={g.src} alt={`${project.title} — ${g.title}`} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-bg/70 text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Maximize2 size={13} />
              </span>
            </button>
            <figcaption className="mt-3">
              <p className="font-display text-sm font-semibold text-ink">{g.title}</p>
              <p className="text-sm text-muted">{g.caption}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-10"
            onClick={close}
          >
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#060B1D] sm:aspect-[16/10]">
                <ProjectVisual visual={current.visual} src={current.src} alt={`${project.title} — ${current.title}`} sizes="90vw" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-ink">{current.title}</p>
                  <p className="text-sm text-muted">{current.caption}</p>
                </div>
                {items.length > 1 && (
                  <>
                    <button onClick={() => step(-1)} aria-label="Previous image" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-ink hover:border-neon-blue/50">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => step(1)} aria-label="Next image" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-ink hover:border-neon-blue/50">
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                <button onClick={close} aria-label="Close" autoFocus className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-ink hover:bg-white/20">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

function Glossary({ d, n }: { d: ProjectDetails; n: string }) {
  return (
    <Section id="glossary" index={n} label="Glossary" title="Jargon, explained">
      <dl className="grid gap-x-10 sm:grid-cols-2">
        {d.glossary!.map((g) => (
          <motion.div key={g.term} {...fadeUp} className="border-t border-white/[0.07] py-4">
            <dt className="font-display font-semibold text-neon-blue">{g.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">{g.meaning}</dd>
          </motion.div>
        ))}
      </dl>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Prev / next                                                         */
/* ------------------------------------------------------------------ */

function NavCard({ project, dir }: { project: Project; dir: 'prev' | 'next' }) {
  const next = dir === 'next'
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-neon-blue/40 ${next ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-[#060B1D] sm:w-36">
        <div className="absolute inset-0 origin-center scale-[1.35] transition-transform duration-500 group-hover:scale-[1.45]">
          <ProjectVisual visual={project.visual} src={project.image} alt={project.title} sizes="144px" label={false} />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.2em] text-muted">
          {!next && <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />}
          {next ? 'Next project' : 'Previous project'}
          {next && <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />}
        </span>
        <p className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-neon-blue">{project.title}</p>
        {project.details && <p className="mt-0.5 text-sm text-muted">{project.details.category}</p>}
      </div>
    </Link>
  )
}

function ProjectNav({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
      {(prev || next) && (
        <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
          {prev ? <NavCard project={prev} dir="prev" /> : <span className="hidden sm:block" />}
          {next && <NavCard project={next} dir="next" />}
        </nav>
      )}

      <motion.div
        {...fadeUp}
        className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-neon-blue/25 bg-gradient-to-br from-neon-blue/[0.08] via-transparent to-neon-emerald/[0.05] p-8 sm:flex-row sm:items-center sm:p-10"
      >
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Have a similar project in mind?</h2>
          <p className="mt-2 max-w-xl text-muted">I build reliable, production-ready web applications. Let’s talk about what you need.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/#contact" className={ctaClassName('primary')}>
            <Mail size={16} /> Get in touch
          </Link>
          <Link href="/#projects" className={ctaClassName('secondary')}>
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProjectDetail({ project, prev, next }: { project: Project; prev?: Project; next?: Project }) {
  const d = project.details!

  // Build the section list from what this project actually has — no empty sections.
  const sections: { id: string; label: string; render: (n: string) => React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', render: (n) => <Overview d={d} n={n} /> },
    ...(d.problem && d.solution ? [{ id: 'problem', label: 'Problem & solution', render: (n: string) => <ProblemSolution d={d} n={n} /> }] : []),
    ...(d.features?.length ? [{ id: 'features', label: 'Key features', render: (n: string) => <Features d={d} n={n} /> }] : []),
    { id: 'role', label: 'My role', render: (n) => <Role d={d} n={n} /> },
    ...(d.architecture ? [{ id: 'architecture', label: 'Architecture', render: (n: string) => <Architecture d={d} n={n} /> }] : []),
    { id: 'tech', label: 'Tech stack', render: (n) => <TechStack d={d} n={n} /> },
    ...(d.challenges?.length ? [{ id: 'challenges', label: 'Challenges', render: (n: string) => <Challenges d={d} n={n} /> }] : []),
    { id: 'results', label: 'Results & impact', render: (n) => <Outcomes d={d} n={n} /> },
    ...(d.gallery?.length
      ? [{ id: 'gallery', label: 'Gallery', render: (n: string) => <Gallery project={project} items={d.gallery!} n={n} /> }]
      : []),
    ...(d.glossary?.length ? [{ id: 'glossary', label: 'Glossary', render: (n: string) => <Glossary d={d} n={n} /> }] : []),
  ]

  return (
    <>
      <ReadingProgress />
      <Hero project={project} d={d} />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-8 md:px-12 lg:grid-cols-[180px_1fr]">
        <aside className="hidden lg:block">
          <TableOfContents items={sections.map(({ id, label }) => ({ id, label }))} />
        </aside>
        <article className="min-w-0">
          {sections.map((s, i) => (
            <Fragment key={s.id}>{s.render(String(i + 1).padStart(2, '0'))}</Fragment>
          ))}
        </article>
      </div>

      <ProjectNav prev={prev} next={next} />
    </>
  )
}
