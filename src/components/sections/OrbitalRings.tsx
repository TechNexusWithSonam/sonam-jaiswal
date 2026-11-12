import type { CSSProperties } from 'react'
import styles from './OrbitalRings.module.css'

// Theme-matched channels (space-separated RGB for `rgb(var(--rgb) / a)`)
const CYAN = '0 194 255' // neon-blue
const TEAL = '0 214 200' // glow teal used by the portrait halo
const BLUE = '96 140 255' // subtle cool blue

/**
 * Shared orbit centre, as % of the portrait column height — the torso/waist of the figure.
 * All rings are concentric around it, like Saturn's.
 */
const ORBIT_CY = '64%'

type Ring = {
  /**
   * Width as % of the orbital layer. The layer is 170% of the portrait column, so
   * 51% / 56% / 61% ≈ 0.87× / 0.95× / 1.04× the column ≈ 1.05–1.25× the visible figure —
   * the outer ring's pills stay inside the column and never reach the hero text.
   */
  size: string
  /** on-screen tilt of the ring's major axis */
  tilt: string
  /** how far the ring plane is laid back: height ≈ cos(rx) × width → 61–67° gives 39–48% */
  rx: string
  dur: string
  dir: 'normal' | 'reverse'
  rgb: string
  /** negative start offset so the rings don't all begin aligned */
  delay: string
  /** angular offset of the first pill */
  offset: number
  techs: string[]
}

// Pills start at 45° offsets so none sits on the clip line (ring ends) at t = 0
const RINGS: Ring[] = [
  {
    size: '51%', tilt: '-9deg', rx: '64deg', dur: '26s', dir: 'normal', rgb: CYAN, delay: '0s', offset: 45,
    techs: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS'],
  },
  {
    size: '56%', tilt: '-3deg', rx: '67deg', dur: '38s', dir: 'reverse', rgb: TEAL, delay: '0s', offset: 0,
    techs: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    size: '61%', tilt: '4deg', rx: '61deg', dur: '50s', dir: 'normal', rgb: BLUE, delay: '0s', offset: 22,
    techs: ['Real-time Systems', 'Socket.IO', 'WebRTC', 'AWS', 'Docker'],
  },
]

type Tiny = { pos: CSSProperties; s: string; rgb: string; dur: string; dir: string; ry: string; float: string; delay: string }

// Positions are % of the portrait column — kept close to the orbit band, clear of the face
const TINY: Tiny[] = [
  { pos: { top: '47%', left: '3%' }, s: '24px', rgb: CYAN, dur: '9s', dir: 'normal', ry: '-18deg', float: '7s', delay: '0s' },
  { pos: { top: '83%', right: '1%' }, s: '20px', rgb: TEAL, dur: '7s', dir: 'reverse', ry: '22deg', float: '6s', delay: '-2s' },
]

type Particle = { top: string; left: string; s: string; rgb: string; dur: string; delay: string; dx: string; dy: string }

const PARTICLES: Particle[] = [
  { top: '52%', left: '92%', s: '2px', rgb: TEAL, dur: '9s', delay: '-3s', dx: '-8px', dy: '-10px' },
  { top: '78%', left: '4%', s: '3px', rgb: CYAN, dur: '7s', delay: '0s', dx: '6px', dy: '-14px' },
  { top: '88%', left: '30%', s: '2px', rgb: BLUE, dur: '8s', delay: '-1s', dx: '5px', dy: '-12px' },
]

const vars = (v: Record<string, string>) => v as CSSProperties

/** Slot position on the ring's circle, as % of the ring box. 0° = top (far side), clockwise. */
function slot(angleDeg: number): CSSProperties {
  const a = (angleDeg * Math.PI) / 180
  return {
    left: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
    top: `${(50 - 50 * Math.cos(a)).toFixed(3)}%`,
  }
}

type Parts = 'all' | 'lines' | 'pills'

/**
 * The three rings. Every copy uses the same geometry and timing, so the back copy,
 * the front-lines copy and the front-pills copy stay perfectly in step.
 */
function Rings({ parts }: { parts: Parts }) {
  const lines = parts !== 'pills'
  const pills = parts !== 'lines'

  return (
    <>
      {RINGS.map((r, i) => (
        <div
          key={i}
          className={styles.ringTilt}
          style={vars({
            '--size': r.size, '--cy': ORBIT_CY, '--tilt': r.tilt, '--rx': r.rx,
            '--dur': r.dur, '--dir': r.dir, '--delay': r.delay, '--rgb': r.rgb,
          })}
        >
          <div className={styles.ringClip}>
            <div className={styles.ringPlane}>
              <div className={styles.ringSpin}>
                {lines && (
                  <>
                    <span className={styles.ringLine} />
                    <span className={styles.ringComet} />
                  </>
                )}
                {pills &&
                  r.techs.map((tech, j) => (
                    <span key={tech} className={styles.slot} style={slot(r.offset + (360 / r.techs.length) * j)}>
                      <span className={styles.counter}>
                        <span className={styles.pill}>{tech}</span>
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/**
 * Technology orbit around the hero portrait. Render `layer="back"` before the figure and
 * `layer="front"` after it, both inside the same positioned portrait container.
 */
export default function OrbitalRings({ layer }: { layer: 'back' | 'front' }) {
  if (layer === 'front') {
    return (
      <>
        {/* Near-half lines, softened over the figure */}
        <div aria-hidden="true" className={`${styles.layer} ${styles.front} ${styles.frontLines}`}>
          <Rings parts="lines" />
        </div>
        {/* Near-half pills, unmasked so labels stay readable */}
        <div aria-hidden="true" className={`${styles.layer} ${styles.front}`}>
          <Rings parts="pills" />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Tiny rings + particles, in the portrait column's own coordinates */}
      <div aria-hidden="true" className={styles.layer} style={{ left: 0, width: '100%' }}>
        {TINY.map((t, i) => (
          <div
            key={i}
            className={styles.tiny}
            style={{ ...t.pos, ...vars({ '--s': t.s, '--rgb': t.rgb, '--float': t.float, '--delay': t.delay }) }}
          >
            <span className={styles.tinyCore} />
            <span className={styles.tinyRing} style={vars({ '--dur': t.dur, '--dir': t.dir, '--ry': t.ry })} />
          </div>
        ))}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              ...vars({ '--s': p.s, '--rgb': p.rgb, '--dur': p.dur, '--delay': p.delay, '--dx': p.dx, '--dy': p.dy }),
            }}
          />
        ))}
      </div>
      {/* Far halves of rings and pills, behind the figure */}
      <div aria-hidden="true" className={`${styles.layer} ${styles.back}`}>
        <Rings parts="all" />
      </div>
    </>
  )
}
