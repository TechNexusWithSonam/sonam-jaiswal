'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// CSS-only port of the reference portfolio's layered background:
// aurora blobs → conic light rays → holographic grid + scanlines, each drifting at a different
// parallax rate on scroll. Fixed behind all content, zero WebGL cost.

function AuroraGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] animate-aurora rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.6) 0%, rgba(0,194,255,0) 70%)' }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[65vh] w-[65vh] animate-aurora-alt rounded-full opacity-35 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,247,165,0.6) 0%, rgba(0,247,165,0) 70%)' }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[50vh] w-[50vh] animate-aurora-c rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(111,91,255,0.6) 0%, rgba(111,91,255,0) 70%)' }}
      />
      <div
        className="absolute right-1/4 top-1/4 h-[40vh] w-[40vh] animate-aurora rounded-full opacity-20 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,194,255,0.5) 0%, rgba(0,194,255,0) 70%)',
          animationDelay: '-8s',
        }}
      />
    </div>
  )
}

function LightRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 animate-rays-spin opacity-[0.09] mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(0,194,255,0.9) 4deg, transparent 12deg, transparent 96deg, rgba(0,247,165,0.8) 100deg, transparent 108deg, transparent 200deg, rgba(0,194,255,0.6) 204deg, transparent 212deg, transparent 360deg)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] mix-blend-screen"
        style={{
          background:
            'conic-gradient(from 180deg, transparent 0deg, rgba(111,91,255,0.8) 3deg, transparent 10deg, transparent 180deg, rgba(0,247,165,0.6) 183deg, transparent 190deg, transparent 360deg)',
          animation: 'raysSpin 90s linear infinite reverse',
        }}
      />
    </div>
  )
}

function HolographicGridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 animate-grid-shift opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,194,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-x-0 h-32 animate-scanline opacity-60"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,247,165,0.15), transparent)' }}
      />
      <div
        className="absolute inset-x-0 h-20 animate-scanline-b opacity-40"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,194,255,0.12), transparent)',
          animationDelay: '-4s',
        }}
      />
    </div>
  )
}

export default function LivingBackground() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const auroraY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 70])
  const raysY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -110])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 150])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="fixed inset-0 bg-bg" />
      <motion.div style={{ y: auroraY }} className="fixed inset-0">
        <AuroraGradient />
      </motion.div>
      <motion.div style={{ y: raysY }} className="fixed inset-0">
        <LightRays />
      </motion.div>
      <motion.div style={{ y: gridY }} className="fixed inset-0">
        <HolographicGridLines />
      </motion.div>
    </div>
  )
}
