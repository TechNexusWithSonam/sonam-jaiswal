/** Logo keys resolved in `src/components/skills/techLogos.ts`. */
export type TechLogoKey =
  | 'react' | 'javascript' | 'redux' | 'tailwind' | 'nextjs'
  | 'nodejs' | 'express' | 'fastify' | 'php' | 'laravel' | 'codeigniter'
  | 'postgresql' | 'mysql' | 'mongodb' | 'prisma' | 'redis'
  | 'socketio' | 'webrtc' | 'agora' | 'firebase' | 'googlemaps' | 'payments'
  | 'git' | 'docker' | 'ec2' | 's3' | 'nginx' | 'cicd'
  | 'vitest' | 'playwright' | 'postman'

export interface Tech {
  name: string
  logo: TechLogoKey
  /** One-line, factual note on how it's used — shown on hover/focus. */
  note: string
  /** Core expertise — the only label shown; no ratings or percentages. */
  core?: boolean
}

export interface TechCategory {
  id: string
  title: string
  summary: string
  icon: 'frontend' | 'backend' | 'database' | 'realtime' | 'devops' | 'testing'
  techs: Tech[]
}

export interface EngineeringPractice {
  name: string
  icon: 'api' | 'jwt' | 'rbac' | 'workflow' | 'cache' | 'performance'
  note: string
}

/** Minimal shape consumed by the About section's toolkit. */
export interface SkillCategory {
  category: string
  skills: { name: string }[]
}

export interface ExperienceProject {
  name: string
  /** Links to /projects/[slug] when a detail page exists. */
  slug?: string
}

export interface ExperienceTechGroup {
  category: string
  items: string[]
}

export interface Experience {
  id: string
  role: string
  company: string
  /** "Mon YYYY – Mon YYYY" or "Mon YYYY – Present" — parsed for durations. */
  period: string
  location: string
  /** Achievement-focused bullets; the first few show by default, the rest expand. */
  description: string[]
  /** Heading for the project row, e.g. "Products" or "Projects". */
  projectsLabel?: string
  projects?: ExperienceProject[]
  techGroups: ExperienceTechGroup[]
  current?: boolean
}

/** Icon keys resolved to lucide icons in `src/components/project/icons.ts`. */
export type ProjectIcon =
  | 'video' | 'qr' | 'bell' | 'map' | 'message' | 'cart' | 'card' | 'dashboard'
  | 'shield' | 'test' | 'rocket' | 'users' | 'stethoscope' | 'flask' | 'pill'
  | 'bed' | 'scan' | 'database' | 'server' | 'monitor' | 'zap' | 'lock' | 'clock'
  | 'workflow' | 'layers' | 'smartphone' | 'package' | 'gauge' | 'sparkles'
  | 'cloud' | 'file' | 'heart' | 'trending' | 'calendar' | 'plug' | 'container'

/**
 * Coded, illustrative UI visuals rendered by `ProjectVisual`.
 * Used wherever a real screenshot isn't available yet.
 */
export type VisualKey =
  | 'qrbell-scan' | 'qrbell-call' | 'qrbell-activate' | 'qrbell-notify'
  | 'store-catalog' | 'store-checkout' | 'store-admin'
  | 'hms-dashboard' | 'hms-diagnostics' | 'hms-access'
  | 'glamee-stack'

export type ProjectStatus = 'production' | 'delivered' | 'in-development'

export interface ProjectFeature {
  icon: ProjectIcon
  title: string
  /** Plain-language explanation for non-technical readers. */
  simple: string
  /** How it's actually built, for technical readers. */
  technical: string
}

export interface ProjectStep {
  title: string
  description: string
}

export interface TechGroup {
  layer: string // e.g. "Frontend", "Backend", "Database"
  icon: ProjectIcon
  items: { name: string; purpose: string }[]
}

export interface GlossaryTerm {
  term: string
  meaning: string
}

export interface ArchitectureNode {
  name: string
  detail?: string
}

export interface ArchitectureTier {
  label: string
  icon: ProjectIcon
  nodes: ArchitectureNode[]
}

export interface ProjectArchitecture {
  summary: string
  /** Rendered top-to-bottom: clients → … → data. */
  tiers: ArchitectureTier[]
  /** Label for each link between tier i and tier i+1 (length = tiers.length - 1). */
  links: string[]
  /** Third-party services, drawn as a side rail connected to the system. */
  external?: { label: string; link: string; nodes: ArchitectureNode[] }
  /** Plain-language notes per layer (Frontend, Backend, Database, APIs, Integrations, Infrastructure). */
  notes: { layer: string; icon: ProjectIcon; body: string }[]
  /** End-to-end flow through the system. */
  flow?: { title: string; steps: ProjectStep[] }
}

/** A gallery entry: a real screenshot (`src`) or an illustrative coded visual (`visual`). */
export interface GalleryItem {
  title: string
  caption: string
  src?: string
  visual?: VisualKey
}

export interface ProjectDetails {
  tagline: string
  category: string
  status: ProjectStatus
  company?: string
  period?: string
  role?: string
  /** Who uses the product. */
  audience?: string[]
  /** The "explain it like I'm new here" summary. */
  inSimpleWords?: string
  overview: string[]
  problem?: string
  solution?: string
  features?: ProjectFeature[]
  /** My Role & Contributions — only work actually done. */
  contributions: string[]
  architecture?: ProjectArchitecture
  techGroups: TechGroup[]
  challenges?: { challenge: string; approach: string }[]
  /** Results & Impact — verified, delivered outcomes only. Never invented metrics. */
  outcomes: string[]
  gallery?: GalleryItem[]
  glossary?: GlossaryTerm[]
  /** Shown when details are intentionally limited. */
  disclosureNote?: string
}

export interface Project {
  id: string
  /** URL segment for the detail page: /projects/[slug] */
  slug: string
  title: string
  description: string
  highlights?: string[]
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  /** Real cover screenshot (e.g. `/images/projects/qrbell/cover.png`). Overrides `visual`. */
  image?: string
  /** Illustrative visual for cards and the case-study hero when no `image` is set. */
  visual?: VisualKey
  details?: ProjectDetails
}

export interface NavItem {
  label: string
  href: string
}
