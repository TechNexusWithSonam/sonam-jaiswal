import {
  Video, QrCode, Bell, MapPin, MessageSquare, ShoppingCart, CreditCard, LayoutDashboard,
  ShieldCheck, TestTube2, Rocket, Users, Stethoscope, FlaskConical, Pill, BedDouble, ScanLine,
  Database, Server, Monitor, Zap, Lock, Clock, Workflow, Layers, Smartphone, Package, Gauge,
  Sparkles, Cloud, FileText, HeartPulse, TrendingUp, CalendarDays, Plug, Container, type LucideIcon,
} from 'lucide-react'
import type { ProjectIcon, ProjectStatus } from '@/types'

export const projectIcons: Record<ProjectIcon, LucideIcon> = {
  video: Video,
  qr: QrCode,
  bell: Bell,
  map: MapPin,
  message: MessageSquare,
  cart: ShoppingCart,
  card: CreditCard,
  dashboard: LayoutDashboard,
  shield: ShieldCheck,
  test: TestTube2,
  rocket: Rocket,
  users: Users,
  stethoscope: Stethoscope,
  flask: FlaskConical,
  pill: Pill,
  bed: BedDouble,
  scan: ScanLine,
  database: Database,
  server: Server,
  monitor: Monitor,
  zap: Zap,
  lock: Lock,
  clock: Clock,
  workflow: Workflow,
  layers: Layers,
  smartphone: Smartphone,
  package: Package,
  gauge: Gauge,
  sparkles: Sparkles,
  cloud: Cloud,
  file: FileText,
  heart: HeartPulse,
  trending: TrendingUp,
  calendar: CalendarDays,
  plug: Plug,
  container: Container,
}

export const statusMeta: Record<ProjectStatus, { label: string; className: string; dot: string }> = {
  production: {
    label: 'In production',
    className: 'border-neon-emerald/30 bg-neon-emerald/[0.07] text-neon-emerald',
    dot: 'bg-neon-emerald',
  },
  'in-development': {
    label: 'In development',
    className: 'border-neon-blue/30 bg-neon-blue/[0.07] text-neon-blue',
    dot: 'bg-neon-blue',
  },
  delivered: {
    label: 'Delivered',
    className: 'border-neon-purple/40 bg-neon-purple/[0.08] text-[#A99BFF]',
    dot: 'bg-[#A99BFF]',
  },
}
