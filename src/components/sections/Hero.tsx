'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef } from 'react'
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { CTAButton, CTALink } from '@/components/ui/CTAButton'
import OrbitalRings from './OrbitalRings'
import { HeroAmbient, RoleTypewriter, fx } from './HeroFx'

// 3D canvas — SSR disabled
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

export type HeroPortrait = {
  src: string
  /** true when the image is a transparent cutout (PNG/WebP with alpha). */
  cutout: boolean
}

const socials = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
]

const techs = ['React.js', 'Node.js', 'WebRTC', 'Socket.IO', 'PostgreSQL', 'AWS']

const EASE = [0.16, 1, 0.3, 1] as const

// Staggered entrance for the right-hand column
const column = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Description: word-by-word fade-up (same text, same wrapping)
const descStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022, delayChildren: 0.05 } },
}
const wordRise = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
type DescWord = { w: string; b?: boolean; after?: string }
const DESC: DescWord[] = [
  ...'I build scalable, production-grade web applications with'.split(' ').map((w) => ({ w })),
  { w: 'React.js', b: true, after: ',' },
  { w: 'Node.js', b: true },
  { w: 'and' },
  { w: 'real-time', b: true },
  { w: 'systems', b: true, after: ',' },
  { w: 'backed' },
  { w: 'by' },
  { w: '4+', b: true },
  { w: 'years', b: true },
  ...'of shipping software people rely on.'.split(' ').map((w) => ({ w })),
]

// ─── Word-by-word slide-up reveal ─────────────────────────────────────────────
function LineReveal({
  text,
  delay = 0,
  className = '',
  style,
  shimmer = false,
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
  /** overlay a slow light highlight that glides through the word */
  shimmer?: boolean
}) {
  return (
    // The outer span clips the motion — the inner span travels up through it
    <span className="inline-block overflow-hidden pb-[0.04em] align-bottom">
      <motion.span
        className={`inline-block ${shimmer ? 'relative' : ''} ${className}`}
        style={style}
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {text}
        {shimmer && (
          <span aria-hidden="true" className={fx.shimmer}>
            {text}
          </span>
        )}
      </motion.span>
    </span>
  )
}

// ─── Portrait ─────────────────────────────────────────────────────────────────
// Feathered mask for a non-transparent photo: an ellipse around the subject,
// intersected with a fade toward the bottom so the figure sinks into the page.
const PHOTO_MASK =
  'radial-gradient(ellipse 58% 68% at 50% 42%, #000 42%, transparent 76%), linear-gradient(to bottom, #000 60%, transparent 96%)'
// A cutout only needs its lower edge dissolved.
const CUTOUT_MASK = 'linear-gradient(to bottom, #000 72%, transparent 98%)'

function Portrait({ portrait }: { portrait: HeroPortrait }) {
  const { src, cutout } = portrait
  const mask = cutout ? CUTOUT_MASK : PHOTO_MASK

  return (
    <div className="relative mx-auto flex h-full w-full items-end justify-center">
      {/* Teal/cyan radial glow — breathes very slowly */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[115%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full animate-[heroGlow_9s_ease-in-out_infinite] rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(0,194,255,0.30), rgba(0,214,200,0.16) 45%, rgba(0,247,165,0.06) 68%, transparent)',
          }}
        />
      </motion.div>

      {/* Fine concentric arcs — a technical "halo", not a frame */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        initial={{ opacity: 0, rotate: -12 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-[44%] w-[92%] -translate-x-1/2 -translate-y-1/2"
        fill="none"
      >
        <defs>
          <linearGradient id="heroArc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#00F7A5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00F7A5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="188" stroke="url(#heroArc)" strokeWidth="0.75" strokeDasharray="2 7" />
        <path d="M 40 150 A 165 165 0 0 1 300 58" stroke="url(#heroArc)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="300" cy="58" r="2.4" fill="#00F7A5" opacity="0.8" />
      </motion.svg>

      {/* Floor light the figure stands in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: 'radial-gradient(closest-side, rgba(0,194,255,0.22), transparent)' }}
      />

      {/* Orbital rings — far halves, tiny rings & particles (behind the figure) */}
      <OrbitalRings layer="back" />

      {/* The figure */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
        className={`relative w-full ${
          cutout ? 'h-full' : 'aspect-square max-w-[560px] self-center lg:-translate-y-[4%]'
        }`}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect',
        }}
      >
        <Image
          src={src}
          alt={`${profile.name}, ${profile.title}`}
          fill
          priority
          // The cutout is a wide canvas with the figure centred: cover + bottom anchor crops the
          // empty sides, so the rendered image is ~1.8× the column height wide.
          sizes={cutout ? '(min-width: 1024px) 1500px, 800px' : '(min-width: 1024px) 42vw, 90vw'}
          className={cutout ? 'object-cover object-bottom' : 'object-cover object-top'}
          style={
            cutout
              ? {
                  filter:
                    'drop-shadow(0 30px 50px rgba(0,0,0,0.55)) drop-shadow(0 0 28px rgba(0,194,255,0.14))',
                }
              : { filter: 'contrast(1.06) saturate(0.92) brightness(0.92)' }
          }
        />
        {/* Photo only: pull the light backdrop toward navy + a cool rim from the glow side */}
        {!cutout && (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  'radial-gradient(ellipse 40% 55% at 50% 45%, transparent 55%, rgba(8,16,40,0.75) 100%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 mix-blend-soft-light"
              style={{ background: 'linear-gradient(120deg, rgba(0,194,255,0.35), transparent 50%)' }}
            />
          </>
        )}
      </motion.div>

      {/* Orbital rings — near halves (in front of the figure, softened over it) */}
      <OrbitalRings layer="front" />

      {/* Floating credential chips — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        className="absolute left-0 top-[24%] hidden xl:block"
      >
        <div className="animate-float rounded-2xl border border-white/[0.08] bg-bg/50 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <p className="font-display text-2xl font-bold leading-none">
            <span className="gradient-text">4+</span>
          </p>
          <p className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-muted">Years shipping</p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero({ portrait }: { portrait: HeroPortrait }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  // Gentle depth on scroll: portrait drifts slower than the text
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-6%'])

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="hero" className="relative isolate overflow-hidden">
        {/* ── 3D layer ──────────────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Vignette — biased toward the text column so copy stays crisp */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 55% 50%, transparent 35%, rgba(5,8,22,0.45) 72%, rgba(5,8,22,0.85) 100%)',
          }}
        />

        {/* Bottom fade to next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-bg to-transparent" />

        {/* ── Composition ─────────────────────────────────────── */}
        <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 px-6 pt-16 md:px-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-10 xl:gap-16">
          {/* Portrait — LEFT (top on mobile) */}
          <motion.div
            style={{ y: portraitY }}
            className={`relative mx-auto w-full max-w-[420px] lg:max-w-none ${
              portrait.cutout
                ? 'mt-6 h-[46svh] min-h-[300px] lg:mt-0 lg:h-[calc(100svh-6rem)] lg:max-h-[800px] lg:self-end'
                : 'h-[42svh] min-h-[280px] lg:h-full lg:min-h-0 lg:self-center'
            }`}
          >
            <Portrait portrait={portrait} />
            {/* Hairline divider between the two columns */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
              className="absolute -right-5 top-[18%] hidden h-[56%] w-px origin-top bg-gradient-to-b from-transparent via-neon-blue/25 to-transparent lg:block xl:-right-8"
            />
          </motion.div>

          {/* Content — RIGHT (below on mobile) */}
          <motion.div
            style={{ y: contentY }}
            variants={column}
            initial="hidden"
            animate="show"
            className="relative -mt-10 flex flex-col items-center pb-20 text-center sm:-mt-14 lg:mt-0 lg:items-start lg:justify-center lg:pb-16 lg:text-left"
          >
            {/* Ambient glow, slow light beams and particles behind the copy */}
            <HeroAmbient />

            {/* Availability */}
            <motion.span
              variants={rise}
              className="relative mb-6 inline-flex items-center gap-2.5 rounded-full border border-neon-emerald/25 bg-neon-emerald/[0.06] px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.25em] text-neon-emerald backdrop-blur-sm"
            >
              <span aria-hidden="true" className={fx.badgeGlow} />
              <span className="relative flex h-1.5 w-1.5">
                <span aria-hidden="true" className={fx.dotHalo} />
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-emerald opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-emerald shadow-glow-emerald-sm" />
              </span>
              Open to opportunities
            </motion.span>

            {/* Introduction */}
            <motion.p
              variants={rise}
              className="mb-3 flex items-center gap-3 font-display text-sm tracking-wide text-muted"
            >
              <span aria-hidden="true" className="hidden h-px w-8 bg-gradient-to-r from-neon-blue to-neon-emerald lg:block" />
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <h1
              aria-label={profile.name}
              // Single line: sized so "SONAM JAISWAL" always fits its column without wrapping
              className="relative mb-5 whitespace-nowrap font-display font-bold uppercase leading-none tracking-[-0.02em] text-[clamp(1.9rem,9.2vw,3.75rem)] lg:text-[clamp(2.75rem,min(5vw,9.5svh),4.4rem)]"
            >
              <span aria-hidden="true" className={fx.nameSweep} />
              <LineReveal text={profile.firstName} delay={0.35} className="text-ink" />{' '}
              <LineReveal
                text={profile.lastName}
                delay={0.47}
                shimmer
                className="text-neon-emerald"
                style={{
                  textShadow:
                    '0 0 20px rgba(0,247,165,.4), 0 0 44px rgba(0,247,165,.2), 0 0 90px rgba(0,247,165,.1)',
                }}
              />
            </h1>

            {/* Developer title */}
            <motion.p
              variants={rise}
              className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-xs uppercase tracking-[0.28em] text-neon-blue lg:justify-start"
            >
              <RoleTypewriter />
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-muted">
                <MapPin size={13} className="text-neon-blue" />
                {profile.location}
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              variants={descStagger}
              className="mb-8 max-w-[34rem] text-balance font-body text-base leading-relaxed text-muted sm:text-[17px]"
            >
              {DESC.map(({ w, b, after }, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  <motion.span variants={wordRise} className="inline-block">
                    {b ? <span className="font-medium text-ink">{w}</span> : w}
                    {after}
                  </motion.span>
                </span>
              ))}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={rise}
              className="mb-9 flex flex-col items-center gap-x-5 gap-y-3 sm:flex-row lg:items-center"
            >
              <span className={fx.ctaWrap}>
                <span aria-hidden="true" className={fx.ctaGlow} />
                <CTAButton
                  onClick={() => scrollTo('#projects')}
                  icon={<ArrowUpRight size={16} />}
                  className={`${fx.sweep} ${fx.sweepLight}`}
                >
                  View Projects
                </CTAButton>
              </span>
              <span className={fx.ctaWrap}>
                <CTAButton variant="secondary" onClick={() => scrollTo('#contact')} className={fx.sweep}>
                  Let&apos;s Work Together
                </CTAButton>
              </span>
              <span className={fx.ctaWrap}>
                <CTALink
                  href="/resume.pdf"
                  download="Sonam_Jaiswal_Resume.pdf"
                  variant="ghost"
                  icon={<Download size={14} />}
                >
                  Resume
                </CTALink>
              </span>
            </motion.div>

            {/* Stack + socials */}
            <motion.div
              variants={rise}
              className="flex w-full max-w-[36rem] flex-col items-center gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-between"
            >
              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 font-display text-[11px] uppercase tracking-[0.16em] text-muted/80 lg:justify-start">
                {techs.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-neon-blue/40" />}
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 items-center gap-2.5">
                {socials.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={`${label}: ${value}`}
                    title={value}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-muted transition-colors duration-300 hover:border-neon-blue/40 hover:text-neon-blue hover:shadow-glow-blue-sm"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          onClick={() => scrollTo('#about')}
          aria-label="Scroll to About"
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted/50 transition-colors duration-300 hover:text-neon-blue lg:flex"
        >
          <span className="font-display text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            className="relative"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span aria-hidden="true" className={fx.trail} />
            <ArrowDown size={14} strokeWidth={1.8} />
          </motion.span>
        </motion.button>
      </section>
    </MotionConfig>
  )
}
