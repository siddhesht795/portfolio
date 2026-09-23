import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '../../data/index.js'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'
import Magnetic from '../anim/Magnetic'

const links = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#a855f7',
    cta: 'Send Email',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/siddheshtodi',
    href: personal.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: '#06b6d4',
    cta: 'Connect',
  },
  {
    label: 'GitHub',
    value: 'github.com/siddhesht795',
    href: personal.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#10b981',
    cta: 'View Code',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-surface overflow-hidden">
      {/* Glow bg */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] bg-accent/6 blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <div ref={ref}>
          <SectionLabel label="Contact" className="mb-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — heading */}
          <div className="space-y-6">
            <AnimatedHeading
              lines={[
                "LET'S",
                <span key="l2" className="text-gradient">
                  TALK.
                </span>,
              ]}
              className="font-display font-bold text-text-primary leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-body text-text-secondary text-lg leading-relaxed max-w-sm"
            >
              Open to internships, full-time roles, freelance projects, and interesting conversations about AI, systems, and building great products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-sm text-text-secondary">
                Available for opportunities — Mumbai, India
              </span>
            </motion.div>

            <Magnetic>
              <motion.a
                href={`mailto:${personal.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-display font-semibold text-lg rounded-2xl hover:bg-accent-dim transition-colors duration-300 group mt-4"
              >
                Say Hello
                <span className="group-hover:translate-x-1 transition-transform duration-300 text-xl">→</span>
              </motion.a>
            </Magnetic>
          </div>

          {/* Right — contact cards */}
          <div className="space-y-4">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center justify-between p-5 rounded-2xl border border-border/50 bg-bg hover:scale-[1.02] transition-all duration-300 overflow-hidden relative"
                style={{ '--c': link.color }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${link.color}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                {/* Hover bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${link.color}08, transparent)` }}
                />

                <div className="flex items-center gap-4 relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${link.color}15`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted uppercase tracking-widest mb-0.5">{link.label}</p>
                    <p className="font-body text-text-primary text-sm font-medium">{link.value}</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all duration-300 opacity-0 group-hover:opacity-100 relative flex-shrink-0"
                  style={{ borderColor: `${link.color}30`, color: link.color }}
                >
                  {link.cta}
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
