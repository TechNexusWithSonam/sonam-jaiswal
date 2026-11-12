import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  Bell, Check, CreditCard, FlaskConical, Lock, MapPin, MessageSquare, Mic, Package, Phone,
  PhoneOff, Pill, QrCode, Search, ShieldCheck, ShoppingCart, Stethoscope, UserRound, Users, Video,
  CalendarDays, BedDouble, ScanLine, LayoutDashboard,
} from 'lucide-react'
import type { VisualKey } from '@/types'

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

/** Skeleton bar — stands in for real content so mockups never show invented data. */
function Bar({ w = 'w-full', h = 'h-1.5', tone = 'bg-white/10', className = '' }: { w?: string; h?: string; tone?: string; className?: string }) {
  return <span className={`block rounded-full ${w} ${h} ${tone} ${className}`} />
}

function BrowserFrame({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/[0.1] bg-[#0A1124] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-0.5 font-display text-[9px] tracking-wide text-muted">
          <Lock size={8} className="shrink-0 text-neon-emerald" />
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/18.5] w-[42%] min-w-[150px] max-w-[210px] rounded-[26px] border border-white/[0.14] bg-[#070C1B] p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0B1430] to-[#060A18]">
        <span className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-black/80" />
        {children}
      </div>
    </div>
  )
}

/** Deterministic QR-like pattern (decorative — not a scannable code). */
function QrPattern({ size = 21, className = '' }: { size?: number; className?: string }) {
  let seed = 7
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7)
  const cells: ReactNode[] = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (finder(x, y)) continue
      if (rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />)
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={7} height={7} rx={1.2} fill="none" stroke="currentColor" strokeWidth={1} transform="translate(0.5 0.5) scale(0.93)" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} />
    </g>
  )
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} fill="currentColor" aria-hidden="true" shapeRendering="crispEdges">
      {cells}
      <Finder x={0} y={0} />
      <Finder x={size - 7} y={0} />
      <Finder x={0} y={size - 7} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* QRBell                                                              */
/* ------------------------------------------------------------------ */

function QrbellCall() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-[6%]">
      <PhoneFrame>
        {/* remote video */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,194,255,0.25),transparent_60%)]" />
        <div className="relative flex h-full flex-col items-center px-3 pb-4 pt-9">
          <span className="font-display text-[8px] uppercase tracking-[0.2em] text-neon-emerald">● Live · 00:42</span>
          <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-neon-blue/40 bg-neon-blue/10">
            <UserRound size={30} className="text-neon-blue" />
          </div>
          <p className="mt-3 font-display text-[11px] font-semibold text-ink">Visitor · Front door</p>
          <p className="text-[8px] text-muted">Video call via QRBell</p>
          {/* self view */}
          <div className="absolute right-2.5 top-9 h-14 w-10 rounded-lg border border-white/15 bg-white/[0.06]" />
          <div className="mt-auto flex items-center gap-2.5">
            {[Mic, Video, MessageSquare].map((I, i) => (
              <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-ink">
                <I size={12} />
              </span>
            ))}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF4D6A] text-white">
              <PhoneOff size={12} />
            </span>
          </div>
        </div>
      </PhoneFrame>
      <div className="hidden w-[38%] max-w-[190px] flex-col gap-2 sm:flex">
        {[
          { icon: QrCode, label: 'QR scanned', tone: 'text-neon-blue' },
          { icon: Bell, label: 'Owner notified', tone: 'text-neon-emerald' },
          { icon: Video, label: 'Call connected', tone: 'text-neon-blue' },
        ].map(({ icon: I, label, tone }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0A1124]/90 px-2.5 py-2 backdrop-blur">
            <I size={13} className={tone} />
            <span className="font-display text-[10px] text-ink">{label}</span>
            <Check size={11} className="ml-auto text-neon-emerald" />
          </div>
        ))}
      </div>
    </div>
  )
}

function QrbellScan() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PhoneFrame>
        <div className="flex h-full flex-col items-center px-3 pb-4 pt-9">
          <p className="font-display text-[9px] uppercase tracking-[0.2em] text-muted">QRBell</p>
          <div className="relative mt-4 rounded-xl bg-ink p-2.5">
            <QrPattern className="h-20 w-20 text-bg" />
            <span className="absolute inset-x-1 top-1/2 h-px bg-neon-blue shadow-[0_0_8px_#00C2FF]" />
          </div>
          <p className="mt-3 font-display text-[11px] font-semibold text-ink">Front door</p>
          <span className="mt-1 inline-flex items-center gap-1 text-[8px] text-muted">
            <MapPin size={9} className="text-neon-emerald" /> Location shared
          </span>
          <div className="mt-auto grid w-full grid-cols-3 gap-1.5">
            {[
              { I: Video, l: 'Video' },
              { I: Phone, l: 'Audio' },
              { I: MessageSquare, l: 'Chat' },
            ].map(({ I, l }) => (
              <span key={l} className="flex flex-col items-center gap-1 rounded-lg border border-neon-blue/25 bg-neon-blue/10 py-1.5 text-neon-blue">
                <I size={12} />
                <span className="text-[7px] text-ink">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

function QrbellActivate() {
  const steps = ['Scan new code', 'Link to account', 'Choose workflow', 'Code active']
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PhoneFrame>
        <div className="flex h-full flex-col px-3 pb-4 pt-9">
          <p className="font-display text-[11px] font-semibold text-ink">Activate QR</p>
          <p className="text-[8px] text-muted">Link this code to your account</p>
          <div className="mx-auto mt-3 rounded-lg bg-ink p-1.5">
            <QrPattern className="h-12 w-12 text-bg" />
          </div>
          <ol className="mt-3 space-y-1.5">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-semibold ${
                    i < 3 ? 'bg-neon-emerald text-bg' : 'border border-neon-blue text-neon-blue'
                  }`}
                >
                  {i < 3 ? <Check size={9} /> : i + 1}
                </span>
                <span className="text-[9px] text-ink">{s}</span>
              </li>
            ))}
          </ol>
          <span className="mt-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-emerald py-1.5 text-center font-display text-[9px] font-semibold text-bg">
            Activate
          </span>
        </div>
      </PhoneFrame>
    </div>
  )
}

function QrbellNotify() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PhoneFrame>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(111,91,255,0.3),transparent_60%)]" />
        <div className="relative flex h-full flex-col items-center px-2.5 pt-10">
          <p className="font-display text-3xl font-light text-ink">09:41</p>
          <p className="text-[8px] text-muted">Lock screen</p>
          <div className="mt-5 w-full space-y-1.5">
            <div className="rounded-xl border border-white/10 bg-white/[0.09] p-2 backdrop-blur">
              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-neon-blue to-neon-emerald">
                  <Bell size={8} className="text-bg" />
                </span>
                <span className="font-display text-[8px] uppercase tracking-wider text-muted">QRBell · now</span>
              </div>
              <p className="mt-1 text-[9px] font-semibold text-ink">Someone is at your front door</p>
              <p className="text-[8px] text-muted">Tap to answer with video or audio</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.04] p-2 opacity-60">
              <Bar w="w-1/2" />
              <Bar w="w-3/4" className="mt-1.5" />
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* QRBell Store                                                        */
/* ------------------------------------------------------------------ */

function StoreCatalog() {
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="store · products" className="w-full max-w-[520px]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
          <span className="font-display text-[10px] font-bold text-ink">QRBell Store</span>
          <span className="ml-2 flex flex-1 items-center gap-1 rounded-md bg-white/[0.05] px-2 py-1">
            <Search size={9} className="text-muted" />
            <Bar w="w-16" h="h-1" />
          </span>
          <span className="relative">
            <ShoppingCart size={13} className="text-ink" />
            <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-neon-emerald text-[6px] font-bold text-bg">2</span>
          </span>
        </div>
        <div className="grid grid-cols-[70px_1fr] gap-3 p-3">
          <div className="space-y-2">
            <p className="font-display text-[8px] uppercase tracking-wider text-muted">Categories</p>
            {['w-full', 'w-4/5', 'w-3/5', 'w-4/5'].map((w, i) => (
              <Bar key={i} w={w} tone={i === 0 ? 'bg-neon-blue/60' : 'bg-white/10'} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-1.5">
                <div className="flex aspect-square items-center justify-center rounded-md bg-gradient-to-br from-neon-blue/15 to-neon-purple/10">
                  <Package size={14} className="text-neon-blue/70" />
                </div>
                <Bar w="w-4/5" className="mt-1.5" />
                <div className="mt-1.5 flex items-center justify-between">
                  <Bar w="w-1/3" tone="bg-neon-emerald/50" />
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-neon-blue/20 text-[8px] text-neon-blue">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

function StoreCheckout() {
  const steps = ['Cart', 'Details', 'Payment', 'Confirm']
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="store · checkout" className="w-full max-w-[520px]">
        <div className="flex items-center justify-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          {steps.map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[7px] font-semibold ${
                  i < 2 ? 'bg-neon-emerald text-bg' : i === 2 ? 'border border-neon-blue text-neon-blue' : 'border border-white/20 text-muted'
                }`}
              >
                {i < 2 ? <Check size={8} /> : i + 1}
              </span>
              <span className={`font-display text-[8px] ${i === 2 ? 'text-ink' : 'text-muted'}`}>{s}</span>
              {i < steps.length - 1 && <span className="h-px w-4 bg-white/15" />}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_120px] gap-3 p-3">
          <div className="space-y-2">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neon-blue/10">
                  <Package size={12} className="text-neon-blue/70" />
                </span>
                <div className="flex-1 space-y-1">
                  <Bar w="w-2/3" />
                  <Bar w="w-1/3" h="h-1" tone="bg-white/[0.06]" />
                </div>
                <span className="rounded border border-white/10 px-1.5 text-[8px] text-muted">− 1 +</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-lg border border-neon-blue/30 bg-neon-blue/[0.06] p-2">
              <CreditCard size={12} className="text-neon-blue" />
              <span className="font-display text-[8px] text-ink">Payment via gateway</span>
              <ShieldCheck size={10} className="ml-auto text-neon-emerald" />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
            <p className="font-display text-[8px] uppercase tracking-wider text-muted">Summary</p>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-between">
                <Bar w="w-1/2" h="h-1" />
                <Bar w="w-1/5" h="h-1" />
              </div>
            ))}
            <div className="flex justify-between border-t border-white/10 pt-1.5">
              <span className="font-display text-[8px] text-ink">Total</span>
              <Bar w="w-1/4" tone="bg-neon-emerald/60" />
            </div>
            <span className="block rounded-md bg-gradient-to-r from-neon-blue to-neon-emerald py-1 text-center font-display text-[8px] font-semibold text-bg">
              Pay now
            </span>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

function StoreAdmin() {
  const statuses = [
    { l: 'Placed', c: 'text-neon-blue border-neon-blue/30' },
    { l: 'Packed', c: 'text-[#A99BFF] border-neon-purple/40' },
    { l: 'Shipped', c: 'text-[#FEBC2E] border-[#FEBC2E]/30' },
    { l: 'Delivered', c: 'text-neon-emerald border-neon-emerald/30' },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="store · admin / orders" className="w-full max-w-[520px]">
        <div className="grid grid-cols-[84px_1fr]">
          <div className="space-y-1.5 border-r border-white/[0.06] p-2.5">
            <p className="mb-2 font-display text-[9px] font-bold text-ink">Admin</p>
            {[
              { I: LayoutDashboard, l: 'Overview' },
              { I: Package, l: 'Products' },
              { I: ShoppingCart, l: 'Orders', active: true },
              { I: Users, l: 'Customers' },
            ].map(({ I, l, active }) => (
              <span
                key={l}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[8px] ${active ? 'bg-neon-blue/15 text-neon-blue' : 'text-muted'}`}
              >
                <I size={9} /> {l}
              </span>
            ))}
          </div>
          <div className="p-2.5">
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
                  <Bar w="w-1/2" h="h-1" tone="bg-white/[0.08]" />
                  <Bar w="w-2/3" h="h-2" className="mt-1.5" tone={i === 1 ? 'bg-neon-emerald/40' : 'bg-white/15'} />
                </div>
              ))}
            </div>
            <div className="mt-2 divide-y divide-white/[0.05] rounded-md border border-white/[0.06]">
              {statuses.map((s, i) => (
                <div key={s.l} className="flex items-center gap-2 px-2 py-1.5">
                  <Bar w="w-6" h="h-1" tone="bg-white/20" />
                  <Bar w="w-1/3" h="h-1" />
                  <span className={`ml-auto rounded-full border px-1.5 py-px font-display text-[7px] ${s.c}`}>{s.l}</span>
                  <span className="text-[8px] text-muted">{i % 2 ? '›' : '⋯'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hospital Management System                                          */
/* ------------------------------------------------------------------ */

const hmsModules = [
  { I: Users, l: 'Patient' },
  { I: CalendarDays, l: 'Appointment' },
  { I: Stethoscope, l: 'OPD' },
  { I: BedDouble, l: 'IPD' },
  { I: FlaskConical, l: 'Laboratory' },
  { I: ScanLine, l: 'Radiology' },
  { I: Pill, l: 'Pharmacy' },
  { I: ShieldCheck, l: 'Admin' },
]

function HmsDashboard() {
  const timeline = [
    { l: 'Registered', I: Users },
    { l: 'Appointment', I: CalendarDays },
    { l: 'OPD consultation', I: Stethoscope },
    { l: 'Lab request', I: FlaskConical },
    { l: 'Pharmacy', I: Pill },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="hms · patient record" className="w-full max-w-[520px]">
        <div className="grid grid-cols-[92px_1fr]">
          <div className="space-y-1 border-r border-white/[0.06] p-2.5">
            <p className="mb-2 font-display text-[9px] font-bold text-ink">HMS</p>
            {hmsModules.map(({ I, l }, i) => (
              <span
                key={l}
                className={`flex items-center gap-1.5 rounded-md px-1.5 py-[3px] text-[8px] ${i === 0 ? 'bg-neon-blue/15 text-neon-blue' : 'text-muted'}`}
              >
                <I size={9} /> {l}
              </span>
            ))}
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-blue/15">
                <UserRound size={14} className="text-neon-blue" />
              </span>
              <div className="flex-1 space-y-1">
                <Bar w="w-1/2" tone="bg-white/20" />
                <Bar w="w-1/3" h="h-1" />
              </div>
              <span className="rounded-full border border-neon-emerald/30 px-1.5 py-px font-display text-[7px] text-neon-emerald">One record</span>
            </div>
            <p className="mb-1.5 mt-2.5 font-display text-[8px] uppercase tracking-wider text-muted">Visit timeline</p>
            <ol className="relative space-y-1.5 pl-3">
              <span className="absolute bottom-1 left-[3px] top-1 w-px bg-gradient-to-b from-neon-blue to-neon-emerald/30" />
              {timeline.map(({ l, I }, i) => (
                <li key={l} className="relative flex items-center gap-1.5">
                  <span className={`absolute -left-3 h-[7px] w-[7px] rounded-full ${i < 4 ? 'bg-neon-blue' : 'border border-neon-blue bg-bg'}`} />
                  <I size={9} className="text-neon-blue/80" />
                  <span className="text-[8px] text-ink">{l}</span>
                  <Bar w="w-12" h="h-1" className="ml-auto" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

function HmsDiagnostics() {
  const lanes = [
    { I: Stethoscope, l: 'Doctor', s: 'Request raised', c: 'border-neon-blue/40 text-neon-blue' },
    { I: FlaskConical, l: 'Lab / Radiology', s: 'Processing', c: 'border-[#FEBC2E]/40 text-[#FEBC2E]' },
    { I: Check, l: 'Doctor', s: 'Result received', c: 'border-neon-emerald/40 text-neon-emerald' },
  ]
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="hms · diagnostics" className="w-full max-w-[520px]">
        <div className="grid grid-cols-3 gap-2 p-3">
          {lanes.map(({ I, l, s, c }, i) => (
            <div key={i} className="relative rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
              <span className="flex items-center gap-1 font-display text-[8px] uppercase tracking-wider text-muted">
                <I size={9} /> {l}
              </span>
              <div className={`mt-2 rounded-md border bg-bg/60 p-1.5 ${c}`}>
                <span className="font-display text-[8px]">{s}</span>
                <Bar w="w-3/4" h="h-1" className="mt-1.5" />
                <Bar w="w-1/2" h="h-1" className="mt-1" tone="bg-white/[0.06]" />
              </div>
              <Bar w="w-full" h="h-5" className="mt-1.5 !rounded-md" tone="bg-white/[0.03]" />
              {i < 2 && (
                <span className="absolute -right-2 top-1/2 z-10 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bg text-[8px] text-neon-blue">
                  ›
                </span>
              )}
            </div>
          ))}
        </div>
      </BrowserFrame>
    </div>
  )
}

function HmsAccess() {
  const roles = ['Doctor', 'Lab', 'Pharmacy', 'Admin']
  const cols = ['Patient', 'OPD', 'Lab', 'Pharmacy', 'Admin']
  // Conceptual example only — not the real permission matrix.
  const grid = [
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
  ]
  return (
    <div className="flex h-full w-full items-center justify-center px-[6%]">
      <BrowserFrame url="hms · admin / roles" className="w-full max-w-[480px]">
        <div className="p-3">
          <p className="mb-2 font-display text-[8px] uppercase tracking-wider text-muted">Role → module access (example)</p>
          <div className="grid grid-cols-[64px_repeat(5,1fr)] gap-y-1 text-center">
            <span />
            {cols.map((c) => (
              <span key={c} className="font-display text-[7px] text-muted">{c}</span>
            ))}
            {roles.map((r, ri) => (
              <div key={r} className="contents">
                <span className="py-1 text-left font-display text-[8px] text-ink">{r}</span>
                {grid[ri].map((v, ci) => (
                  <span key={ci} className="flex items-center justify-center">
                    {v ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-neon-emerald/15">
                        <Check size={9} className="text-neon-emerald" />
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-white/[0.04]">
                        <Lock size={8} className="text-muted/60" />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Glamee — no verified UI details, so show the stack rather than a fake screen. */
/* ------------------------------------------------------------------ */

function GlameeStack() {
  const lines: [string, string, string?][] = [
    ['project', '"Glamee"'],
    ['type', '"production web application"'],
    ['frontend', '"React.js"', 'text-neon-blue'],
    ['backend', '"Node.js"', 'text-neon-emerald'],
    ['company', '"Aspirantive Technologies"'],
  ]
  return (
    <div className="flex h-full w-full items-center justify-center px-[8%]">
      <div className="w-full max-w-[400px] overflow-hidden rounded-xl border border-white/[0.1] bg-[#0A1124] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 font-display text-[9px] text-muted">glamee.config</span>
        </div>
        <pre className="overflow-hidden p-4 font-mono text-[10px] leading-[1.9] sm:text-[11px]">
          <span className="text-muted">{'{'}</span>
          {'\n'}
          {lines.map(([k, v, c]) => (
            <span key={k}>
              {'  '}
              <span className="text-[#A99BFF]">{k}</span>
              <span className="text-muted">: </span>
              <span className={c ?? 'text-ink'}>{v}</span>
              <span className="text-muted">,</span>
              {'\n'}
            </span>
          ))}
          <span className="text-muted">{'}'}</span>
        </pre>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const visuals: Record<VisualKey, () => ReactNode> = {
  'qrbell-call': QrbellCall,
  'qrbell-scan': QrbellScan,
  'qrbell-activate': QrbellActivate,
  'qrbell-notify': QrbellNotify,
  'store-catalog': StoreCatalog,
  'store-checkout': StoreCheckout,
  'store-admin': StoreAdmin,
  'hms-dashboard': HmsDashboard,
  'hms-diagnostics': HmsDiagnostics,
  'hms-access': HmsAccess,
  'glamee-stack': GlameeStack,
}

/**
 * Renders a real screenshot when `src` is given, otherwise the coded illustrative visual.
 * Fills its parent — the parent decides the aspect ratio.
 */
export default function ProjectVisual({
  visual,
  src,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  label = true,
}: {
  visual?: VisualKey
  src?: string
  alt: string
  sizes?: string
  /** Show the small "Illustrative" tag on coded visuals. */
  label?: boolean
}) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
  }
  const Visual = visual ? visuals[visual] : null
  return (
    <div role="img" aria-label={`${alt} (illustrative mockup)`} className="absolute inset-0 overflow-hidden">
      {/* stage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,194,255,0.16),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(0,247,165,0.10),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 py-[6%]">{Visual ? <Visual /> : null}</div>
      {label && Visual && (
        <span className="absolute bottom-2.5 right-2.5 rounded-full border border-white/10 bg-bg/70 px-2 py-0.5 font-display text-[9px] uppercase tracking-[0.15em] text-muted/80 backdrop-blur">
          Illustrative
        </span>
      )}
    </div>
  )
}
