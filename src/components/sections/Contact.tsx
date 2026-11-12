'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, CheckCircle, Circle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { profile } from '@/data/profile'

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: 'Location', value: profile.location },
]

// Same field treatment as the reference ConsoleInput
const inputClass =
  'w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 font-body text-sm text-ink placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/[0.05] focus:shadow-glow-blue-sm'

const labelClass = 'mb-2 block font-display text-xs uppercase tracking-[0.2em] text-muted'

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Opens the visitor's email client with the message pre-filled
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const subject = String(data.get('subject') ?? '')
    const message = String(data.get('message') ?? '')

    const body = `${message}\n\n— ${name} (${email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    setSubmitted(true)
    formRef.current?.reset()
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-36">
      <GlassCard className="overflow-hidden px-6 py-12 sm:px-12 sm:py-16" glow="emerald">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left — info */}
          <div className="flex flex-col items-start gap-6 text-left">
            <motion.p
              {...reveal}
              transition={{ duration: 0.6 }}
              className="font-display text-xs uppercase tracking-[0.3em] text-neon-blue"
            >
              // 05 Say Hello
            </motion.p>
            <motion.h2
              {...reveal}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl"
            >
              Let&apos;s build something{' '}
              <span className="text-neon-emerald" style={{ textShadow: '0 0 24px rgba(0,247,165,.45)' }}>
                great
              </span>
            </motion.h2>
            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md text-balance font-body text-base leading-relaxed text-muted"
            >
              Whether it&apos;s a full-time opportunity, a freelance project, or a real-time /
              full-stack product you want built — feel free to reach out.
            </motion.p>

            <motion.span
              {...reveal}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-1.5 font-body text-sm text-muted"
            >
              <Circle size={8} className="fill-neon-emerald text-neon-emerald" />
              Available for new opportunities
            </motion.span>

            <div className="flex w-full flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, value, href }, i) => {
                const content = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-blue/20 bg-neon-blue/[0.08] text-neon-blue">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
                      <p className="break-all font-body text-sm text-ink transition-colors group-hover/item:text-neon-blue">
                        {value}
                      </p>
                    </div>
                  </>
                )
                const className =
                  'group/item flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-neon-blue/30 hover:bg-white/[0.04]'

                return (
                  <motion.div key={label} {...reveal} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                    {href ? (
                      <motion.a href={href} className={className} whileHover={{ x: 4 }}>
                        {content}
                      </motion.a>
                    ) : (
                      <motion.div className={className} whileHover={{ x: 4 }}>
                        {content}
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right — form */}
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.15 }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-neon-emerald/30 bg-white/[0.03] p-10 text-center"
              >
                <CheckCircle size={48} className="text-neon-emerald drop-shadow-[0_0_16px_rgba(0,247,165,.5)]" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink">Almost there!</h3>
                <p className="font-body text-sm text-muted">
                  Your email app should open with the message ready — just hit send. You can also
                  write to me directly at{' '}
                  <a href={`mailto:${profile.email}`} className="text-neon-blue hover:underline">
                    {profile.email}
                  </a>
                  .
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-display text-xs uppercase tracking-[0.2em] text-neon-blue underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input id="subject" name="subject" type="text" required placeholder="What's this about?" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="mt-2">
                  <CTAButton type="submit" icon={<Send size={16} />}>
                    Send Message
                  </CTAButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </GlassCard>
    </section>
  )
}
