import {
  siAgora, siCodeigniter, siDocker, siExpress, siFastify, siFirebase, siGit, siGooglemaps,
  siJavascript, siLaravel, siMongodb, siMysql, siNextdotjs, siNginx, siNodedotjs, siPhp,
  siPostgresql, siPostman, siPrisma, siReact, siRedis, siRedux, siSocketdotio, siTailwindcss,
  siVitest, siWebrtc, type SimpleIcon,
} from 'simple-icons'
import {
  Activity, Cloud, CreditCard, Database, FlaskConical, Gauge, GitBranch, HardDrive, KeyRound,
  Layout, Network, Radio, Server, ServerCog, ShieldCheck, Workflow, Zap, type LucideIcon,
} from 'lucide-react'
import type { EngineeringPractice, TechCategory, TechLogoKey } from '@/types'

export type TechLogo =
  | { kind: 'brand'; path: string; color: string }
  | { kind: 'glyph'; icon: LucideIcon; color: string }

// Near-black brand colours vanish on the navy background — lift them to ink.
function readable(hex: string) {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance < 0.28 ? '#E2E8F0' : `#${hex}`
}

const brand = (icon: SimpleIcon): TechLogo => ({ kind: 'brand', path: icon.path, color: readable(icon.hex) })
const glyph = (icon: LucideIcon, color: string): TechLogo => ({ kind: 'glyph', icon, color })

// Brands not in simple-icons (AWS, Playwright) or generic concepts use lucide glyphs.
export const techLogos: Record<TechLogoKey, TechLogo> = {
  react: brand(siReact),
  javascript: brand(siJavascript),
  redux: brand(siRedux),
  tailwind: brand(siTailwindcss),
  nextjs: brand(siNextdotjs),
  nodejs: brand(siNodedotjs),
  express: brand(siExpress),
  fastify: brand(siFastify),
  php: brand(siPhp),
  laravel: brand(siLaravel),
  codeigniter: brand(siCodeigniter),
  postgresql: brand(siPostgresql),
  mysql: brand(siMysql),
  mongodb: brand(siMongodb),
  prisma: brand(siPrisma),
  redis: brand(siRedis),
  socketio: brand(siSocketdotio),
  webrtc: brand(siWebrtc),
  agora: brand(siAgora),
  firebase: brand(siFirebase),
  googlemaps: brand(siGooglemaps),
  payments: glyph(CreditCard, '#00F7A5'),
  git: brand(siGit),
  docker: brand(siDocker),
  ec2: glyph(ServerCog, '#FF9900'),
  s3: glyph(HardDrive, '#FF9900'),
  nginx: brand(siNginx),
  cicd: glyph(GitBranch, '#00C2FF'),
  vitest: brand(siVitest),
  playwright: glyph(FlaskConical, '#45BA4B'),
  postman: brand(siPostman),
}

export const categoryIcons: Record<TechCategory['icon'], LucideIcon> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  realtime: Radio,
  devops: Cloud,
  testing: Activity,
}

export const practiceIcons: Record<EngineeringPractice['icon'], LucideIcon> = {
  api: Network,
  jwt: KeyRound,
  rbac: ShieldCheck,
  workflow: Workflow,
  cache: Zap,
  performance: Gauge,
}
