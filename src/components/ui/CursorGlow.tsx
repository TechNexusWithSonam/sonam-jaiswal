'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 300, damping: 40 })
  const springY = useSpring(y, { stiffness: 300, damping: 40 })

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!isCoarsePointer && !reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement | null
      setHovering(!!target?.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full mix-blend-screen"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 160 : 100,
        height: hovering ? 160 : 100,
        background: hovering
          ? 'radial-gradient(circle, rgba(0,247,165,0.32) 0%, rgba(0,247,165,0) 70%)'
          : 'radial-gradient(circle, rgba(0,194,255,0.22) 0%, rgba(0,194,255,0) 70%)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  )
}
