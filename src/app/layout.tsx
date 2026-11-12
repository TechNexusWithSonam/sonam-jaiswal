import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import LivingBackground from '@/components/background/LivingBackground'
import CursorGlow from '@/components/ui/CursorGlow'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sonam Jaiswal | Full Stack Developer',
  description:
    'Full Stack Developer with 4+ years of experience specializing in React.js, Node.js, real-time systems, and production-grade applications.',
  keywords: [
    'Sonam Jaiswal',
    'Full Stack Developer',
    'React.js',
    'Node.js',
    'WebRTC',
    'Socket.IO',
    'PostgreSQL',
    'Portfolio',
  ],
  authors: [{ name: 'Sonam Jaiswal' }],
  openGraph: {
    title: 'Sonam Jaiswal | Full Stack Developer',
    description:
      'Building scalable web applications with React, Node.js & real-time systems.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050816',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${body.variable}`}>
      <body className="bg-bg font-body text-ink antialiased">
        <LivingBackground />
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
