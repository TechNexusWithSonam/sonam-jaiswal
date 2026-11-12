'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'
import { COLORS } from '@/lib/theme'

// ─── Shape config ─────────────────────────────────────────────────────────────
interface ShapeProps {
  position: [number, number, number]
  geo: THREE.BufferGeometry
  variant: 'solid' | 'wire'
  color: string
  speed: number
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}

function Shape({ position, geo, variant, color, speed, mouseRef }: ShapeProps) {
  const ref    = useRef<THREE.Mesh>(null!)
  const origin = useRef(new THREE.Vector3(...position))

  useFrame((_, dt) => {
    const m = ref.current
    if (!m) return
    const { x, y } = mouseRef.current

    // Slow self-rotation
    m.rotation.x += dt * 0.10 * speed
    m.rotation.y += dt * 0.16 * speed

    // Subtle mouse parallax — small coefficient keeps it elegant
    m.position.x = THREE.MathUtils.lerp(m.position.x, origin.current.x + x * 0.22, 0.025)
    m.position.y = THREE.MathUtils.lerp(m.position.y, origin.current.y + y * 0.18, 0.025)
  })

  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.55}>
      <mesh ref={ref} position={position} geometry={geo}>
        {variant === 'solid' ? (
          <meshStandardMaterial
            color={color}
            metalness={0.65}
            roughness={0.12}
            transparent
            opacity={0.5}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.18}
          />
        )}
      </mesh>
    </Float>
  )
}

// ─── Particle field — spherically distributed ─────────────────────────────────
function Particles({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref  = useRef<THREE.Points>(null!)
  const COUNT = 55

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      // Uniform spherical distribution for even spread
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 3.5 + Math.random() * 4.5
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75  // squish Y a bit
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.elapsedTime
    const { x, y } = mouseRef.current
    pts.rotation.y = t * 0.012 + x * 0.035
    pts.rotation.x = Math.sin(t * 0.008) * 0.07 + y * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={COLORS.neonBlue} size={0.022} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function Scene() {
  const mouseRef = useMousePosition()

  // Pre-build geometries once — no GC per frame
  const geos = useMemo(() => ({
    ico:   new THREE.IcosahedronGeometry(0.68, 0),
    oct:   new THREE.OctahedronGeometry(0.52),
    dodec: new THREE.DodecahedronGeometry(0.38, 0),
    tet:   new THREE.TetrahedronGeometry(0.48),
    torus: new THREE.TorusGeometry(0.42, 0.13, 6, 28),
    icoSm: new THREE.IcosahedronGeometry(0.28, 0),
  }), [])

  return (
    <>
      {/* Fog matches page bg — adds depth without opacity tricks */}
      <fog attach="fog" args={[COLORS.bg, 9, 22]} />

      <ambientLight intensity={0.45} />
      <pointLight position={[ 5,  4,  3]} intensity={2.2} color={COLORS.neonBlue} />
      <pointLight position={[-4, -3, -4]} intensity={0.9} color={COLORS.neonEmerald} />
      <pointLight position={[ 0,  2,  2]} intensity={0.4} color={COLORS.accentPurple} />

      <Particles mouseRef={mouseRef} />

      {/* Solid metallic */}
      <Shape position={[ 3.1,  1.1, -2.5]} geo={geos.ico}   variant="solid" color={COLORS.neonBlue} speed={0.70} mouseRef={mouseRef} />
      <Shape position={[-3.3, -0.7, -2.0]} geo={geos.oct}   variant="solid" color={COLORS.accentPurple} speed={1.00} mouseRef={mouseRef} />
      <Shape position={[ 1.6, -2.1, -1.5]} geo={geos.dodec} variant="solid" color={COLORS.neonEmerald} speed={0.60} mouseRef={mouseRef} />

      {/* Wireframe accents */}
      <Shape position={[-1.6,  2.1, -3.0]} geo={geos.tet}   variant="wire"  color={COLORS.neonEmerald} speed={1.15} mouseRef={mouseRef} />
      <Shape position={[ 0.9,  2.7, -4.0]} geo={geos.torus} variant="wire"  color={COLORS.neonBlue} speed={0.80} mouseRef={mouseRef} />
      <Shape position={[-3.9,  1.6, -3.5]} geo={geos.icoSm} variant="wire"  color={COLORS.accentPurple} speed={1.10} mouseRef={mouseRef} />
    </>
  )
}

// ─── Canvas export ────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}      // cap pixel ratio — critical for perf
      frameloop="always"
    >
      <Scene />
    </Canvas>
  )
}
