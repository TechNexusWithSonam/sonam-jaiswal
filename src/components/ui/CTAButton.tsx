'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export type CTAVariant = 'primary' | 'secondary' | 'ghost'

/** Pill button styles from the reference design system. */
export function ctaClassName(variant: CTAVariant = 'primary', extra = '') {
  return [
    'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-display text-sm font-medium tracking-wide transition-[color,background-color,border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue',
    variant === 'primary' &&
      'bg-gradient-to-r from-neon-blue to-neon-emerald text-bg shadow-glow-blue-sm hover:shadow-glow-emerald-sm',
    variant === 'secondary' &&
      'border border-white/[0.14] bg-transparent text-ink hover:border-neon-blue/40 hover:bg-white/[0.04]',
    variant === 'ghost' && 'px-1 py-1.5 text-muted hover:text-neon-blue',
    extra,
  ]
    .filter(Boolean)
    .join(' ')
}

const MOTION_PROPS = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 20 },
} as const

type BaseProps = {
  children: ReactNode
  variant?: CTAVariant
  icon?: ReactNode
  className?: string
}

export function CTALink({
  href,
  children,
  variant = 'primary',
  icon,
  className,
  external,
  download,
}: BaseProps & { href: string; external?: boolean; download?: string | boolean }) {
  return (
    <motion.a
      href={href}
      download={download === true ? '' : download || undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...MOTION_PROPS}
      className={ctaClassName(variant, className)}
    >
      {children}
      {icon}
    </motion.a>
  )
}

export function CTAButton({
  children,
  variant = 'primary',
  icon,
  className,
  onClick,
  type = 'button',
}: BaseProps & { onClick?: () => void; type?: 'button' | 'submit' }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...MOTION_PROPS}
      className={ctaClassName(variant, className)}
    >
      {children}
      {icon}
    </motion.button>
  )
}
