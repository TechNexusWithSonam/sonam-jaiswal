'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Github, Star } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { ctaClassName } from '@/components/ui/CTAButton'
import ProjectVisual from '@/components/project/ProjectVisual'
import { statusMeta } from '@/components/project/icons'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const

function StatusPill({ project }: { project: Project }) {
  if (!project.details) return null
  const s = statusMeta[project.details.status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-display text-[10px] uppercase tracking-[0.18em] ${s.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

function ExternalLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const cls = compact ? '!px-4 !py-2.5' : ''
  return (
    <>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className={ctaClassName('secondary', cls)}
        >
          <ExternalLink size={15} /> Live
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code on GitHub`}
          className={ctaClassName('secondary', cls)}
        >
          <Github size={15} /> GitHub
        </a>
      )}
    </>
  )
}

/** Large editorial row for featured projects — visual on one side, story on the other. */
function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1
  const href = `/projects/${project.slug}`
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease }}
      className="group grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
    >
      {/* Visual */}
      <Link
        href={project.details ? href : '#projects'}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block rounded-2xl bg-gradient-to-br from-neon-blue/35 via-white/[0.06] to-neon-emerald/25 p-px transition-shadow duration-500 group-hover:shadow-glow-blue ${
          reverse ? 'lg:order-2' : ''
        }`}
      >
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#060B1D]">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.035]">
            <ProjectVisual
              visual={project.visual}
              src={project.image}
              alt={`${project.title} interface`}
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full border border-neon-emerald/30 bg-bg/70 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-neon-emerald backdrop-blur">
            <Star size={10} className="fill-neon-emerald" /> Featured
          </span>
        </div>
      </Link>

      {/* Story */}
      <div className={reverse ? 'lg:order-1' : ''}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm font-semibold text-neon-blue/70">{number}</span>
          <span className="h-px w-8 bg-white/15" />
          {project.details && (
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">{project.details.category}</span>
          )}
          <StatusPill project={project} />
        </div>

        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-neon-blue sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2" aria-label="Key features">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink/85">
                <Check size={15} className="mt-[3px] shrink-0 text-neon-emerald" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 font-display text-[11px] uppercase tracking-wider text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.details && (
            <Link href={href} aria-label={`Read the ${project.title} case study`} className={ctaClassName('primary', 'group/cta')}>
              Read case study
              <ArrowRight size={15} className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Link>
          )}
          <ExternalLinks project={project} />
        </div>
      </div>
    </motion.article>
  )
}

/** Compact card for the remaining projects. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/projects/${project.slug}`
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-neon-blue/30 hover:shadow-glow-blue sm:flex-row"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/[0.06] bg-[#060B1D] sm:aspect-auto sm:w-[44%] sm:border-b-0 sm:border-r">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          <ProjectVisual visual={project.visual} src={project.image} alt={`${project.title} interface`} sizes="(min-width: 640px) 300px, 100vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.details && (
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">{project.details.category}</span>
          )}
          <StatusPill project={project} />
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-ink transition-colors group-hover:text-neon-blue">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/[0.1] px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.details && (
            <Link href={href} aria-label={`${project.title} case study`} className={ctaClassName('secondary', '!px-4 !py-2.5')}>
              Case study <ArrowUpRight size={15} />
            </Link>
          )}
          <ExternalLinks project={project} compact />
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-36">
      <SectionTitle
        index="04"
        label="What I've Built"
        title="Projects"
        subtitle="Production applications I've built — each with a case study on the problem, architecture, and my role."
      />

      <div className="space-y-24 md:space-y-32">
        {featured.map((project, i) => (
          <FeaturedProject key={project.id} project={project} index={i} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-24 md:mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-4 font-display text-xs uppercase tracking-[0.3em] text-muted"
          >
            More work
            <span className="h-px flex-1 bg-white/[0.08]" />
          </motion.h3>
          <div className={`grid gap-6 ${others.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {others.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
