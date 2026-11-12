'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectArchitecture } from '@/types'
import { projectIcons } from './icons'

/** Vertical connector between two tiers, with a travelling pulse and a protocol label. */
function Connector({ label, reduce }: { label: string; reduce: boolean | null }) {
  return (
    <div className="relative flex h-12 items-center pl-[22px] sm:pl-[150px]">
      <span className="absolute bottom-0 top-0 left-[22px] w-px bg-gradient-to-b from-neon-blue/50 to-neon-emerald/40 sm:left-[150px]" />
      {!reduce && (
        <motion.span
          className="absolute left-[19px] h-[7px] w-[7px] rounded-full bg-neon-blue shadow-[0_0_10px_#00C2FF] sm:left-[147px]"
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <span className="relative ml-4 rounded-full border border-white/[0.1] bg-bg px-2.5 py-0.5 font-mono text-[10px] text-muted">
        {label}
      </span>
    </div>
  )
}

export default function ArchitectureDiagram({ arch }: { arch: ProjectArchitecture }) {
  const reduce = useReducedMotion()

  return (
    <figure
      aria-label="System architecture diagram"
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060B1D]/80 p-4 sm:p-6"
    >
      {/* blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,194,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.9) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className={`relative grid gap-6 ${arch.external ? 'lg:grid-cols-[1fr_210px]' : ''}`}>
        {/* Tiers */}
        <ol className="min-w-0">
          {arch.tiers.map((tier, i) => {
            const Icon = projectIcons[tier.icon]
            return (
              <li key={tier.label}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <div className="flex shrink-0 items-center gap-2.5 sm:w-[126px]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-blue/30 bg-neon-blue/10 text-neon-blue">
                      <Icon size={18} />
                    </span>
                    <span className="font-display text-[11px] uppercase leading-tight tracking-[0.14em] text-muted">
                      {tier.label}
                    </span>
                  </div>
                  <ul className="flex flex-1 flex-wrap gap-2 sm:ml-6">
                    {tier.nodes.map((n) => (
                      <li
                        key={n.name}
                        className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 transition-colors hover:border-neon-blue/40"
                      >
                        <p className="font-display text-[13px] font-medium text-ink">{n.name}</p>
                        {n.detail && <p className="text-[11px] text-muted">{n.detail}</p>}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                {i < arch.tiers.length - 1 && <Connector label={arch.links[i] ?? ''} reduce={reduce} />}
              </li>
            )
          })}
        </ol>

        {/* External services rail */}
        {arch.external && (
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative self-center rounded-xl border border-dashed border-neon-emerald/30 bg-neon-emerald/[0.03] p-4"
          >
            {/* dashed link into the system (desktop) */}
            <span
              aria-hidden="true"
              className="absolute right-full top-1/2 hidden w-6 border-t border-dashed border-neon-emerald/40 lg:block"
            />
            <p className="font-display text-[11px] uppercase tracking-[0.14em] text-neon-emerald">{arch.external.label}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">{arch.external.link}</p>
            <ul className="mt-3 space-y-2">
              {arch.external.nodes.map((n) => (
                <li key={n.name} className="rounded-lg border border-white/[0.08] bg-bg/60 px-3 py-2">
                  <p className="font-display text-[13px] font-medium text-ink">{n.name}</p>
                  {n.detail && <p className="text-[11px] text-muted">{n.detail}</p>}
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </div>
    </figure>
  )
}
