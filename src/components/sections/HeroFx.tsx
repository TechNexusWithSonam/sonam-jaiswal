'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
import fx from './HeroFx.module.css'

export { fx }

// ─── Role typewriter ──────────────────────────────────────────────────────────
const ROLES = ['Full Stack Developer', 'Software Engineer', 'Backend Developer']
const LONGEST = ROLES.reduce((a, b) => (b.length > a.length ? b : a))

const TYPE_MS = 70
const DELETE_MS = 35
const HOLD_MS = 2200
const GAP_MS = 350

/**
 * Types, holds, deletes and cycles through the roles. An invisible copy of the longest role
 * reserves the width, so the row never reflows. SSR and reduced motion render the first role.
 */
export function RoleTypewriter() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(ROLES[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const target = ROLES[index]
    let delay: number
    let next: () => void

    if (!deleting && text === target) {
      delay = HOLD_MS
      next = () => setDeleting(true)
    } else if (deleting && text === '') {
      delay = GAP_MS
      next = () => {
        setDeleting(false)
        setIndex((i) => (i + 1) % ROLES.length)
      }
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS
      next = () => setText(deleting ? target.slice(0, text.length - 1) : target.slice(0, text.length + 1))
    }

    const t = window.setTimeout(next, delay)
    return () => window.clearTimeout(t)
  }, [text, deleting, index, reduce])

  return (
    <>
      <span className="sr-only">{ROLES.join(', ')}</span>
      <span aria-hidden="true" className={fx.typeStack}>
        <span className={fx.typeGhost}>{LONGEST}</span>
        <span>
          {reduce ? ROLES[0] : text}
          <span className={fx.caret} />
        </span>
      </span>
    </>
  )
}

// ─── Ambient layer behind the right column ────────────────────────────────────
type P = { top: string; left: string; s: string; rgb: string; dur: string; delay: string; dx: string; dy: string }

const PARTICLES: P[] = [
  { top: '14%', left: '18%', s: '2px', rgb: '0 194 255', dur: '9s', delay: '0s', dx: '6px', dy: '-14px' },
  { top: '30%', left: '86%', s: '3px', rgb: '0 214 200', dur: '11s', delay: '-3s', dx: '-6px', dy: '-12px' },
  { top: '52%', left: '62%', s: '2px', rgb: '0 194 255', dur: '10s', delay: '-6s', dx: '5px', dy: '-16px' },
  { top: '70%', left: '30%', s: '2px', rgb: '0 247 165', dur: '12s', delay: '-2s', dx: '-5px', dy: '-12px' },
  { top: '84%', left: '76%', s: '3px', rgb: '0 214 200', dur: '9.5s', delay: '-5s', dx: '6px', dy: '-10px' },
  { top: '40%', left: '8%', s: '2px', rgb: '96 140 255', dur: '13s', delay: '-8s', dx: '4px', dy: '-14px' },
]

export function HeroAmbient() {
  return (
    <div aria-hidden="true" className={fx.ambient}>
      <div className={fx.ambientGlow} />
      <div className={`${fx.beam} ${fx.beamA}`} />
      <div className={`${fx.beam} ${fx.beamB}`} />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={fx.particle}
          style={
            {
              top: p.top,
              left: p.left,
              '--s': p.s,
              '--rgb': p.rgb,
              '--dur': p.dur,
              '--delay': p.delay,
              '--dx': p.dx,
              '--dy': p.dy,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
