'use client'

import { useEffect, useRef } from 'react'

interface MousePosition {
  x: number // -1 to 1 (normalized)
  y: number // -1 to 1 (normalized)
}

/** Returns a ref that tracks normalized mouse position (-1..1 on each axis). */
export function useMousePosition(): React.MutableRefObject<MousePosition> {
  const position = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      position.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
