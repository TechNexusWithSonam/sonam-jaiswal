import type { Config } from 'tailwindcss'

// Palette mirrors the design system in the sibling Vite portfolio (sonam-portfolio/tailwind.config.js).
// Keep in sync with src/lib/theme.ts for three.js materials.
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        neon: {
          blue: '#00C2FF',
          emerald: '#00F7A5',
          purple: '#6F5BFF',
        },
        ink: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-display)', '"Space Grotesk"', 'sans-serif'],
        body: ['var(--font-body)', '"Inter"', 'sans-serif'],
        sans: ['var(--font-body)', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(0,194,255,.35)',
        'glow-emerald': '0 0 40px rgba(0,247,165,.35)',
        'glow-blue-sm': '0 0 16px rgba(0,194,255,.45)',
        'glow-emerald-sm': '0 0 16px rgba(0,247,165,.45)',
      },
      keyframes: {
        auroraDrift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(5%,-4%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 5%) scale(0.95)' },
        },
        auroraDriftAlt: {
          '0%, 100%': { transform: 'translate(0,0) scale(1.05)' },
          '33%': { transform: 'translate(-6%,4%) scale(0.96)' },
          '66%': { transform: 'translate(4%,-5%) scale(1.1)' },
        },
        auroraDriftC: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(6%, -6%) scale(1.12)' },
        },
        raysSpin: {
          to: { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        scanlineB: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        gridShift: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '64px 64px' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroGlow: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        aurora: 'auroraDrift 18s ease-in-out infinite',
        'aurora-alt': 'auroraDriftAlt 22s ease-in-out infinite',
        'aurora-c': 'auroraDriftC 26s ease-in-out infinite',
        'rays-spin': 'raysSpin 60s linear infinite',
        scanline: 'scanline 6s ease-in-out infinite',
        'scanline-b': 'scanlineB 9s ease-in-out infinite',
        'grid-shift': 'gridShift 8s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
