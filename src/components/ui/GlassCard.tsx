import type { ElementType, ReactNode } from 'react'

type Glow = 'blue' | 'emerald' | 'none'

/** Shared class string so motion elements can reuse the same glass treatment. */
export function glassClass(glow: Glow = 'blue', extra = '') {
  return [
    'group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500',
    glow === 'blue' && 'hover:border-neon-blue/30 hover:shadow-glow-blue',
    glow === 'emerald' && 'hover:border-neon-emerald/30 hover:shadow-glow-emerald',
    extra,
  ]
    .filter(Boolean)
    .join(' ')
}

export default function GlassCard({
  children,
  className = '',
  glow = 'blue',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  glow?: Glow
  as?: ElementType
}) {
  return <Tag className={glassClass(glow, className)}>{children}</Tag>
}
