import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { personal } from '../../data/index.js'
import Magnetic from '../anim/Magnetic'
import VelocityMarquee from '../anim/VelocityMarquee'
import { scrollToSection } from '../../lib/scroll'

const taglines = personal.taglines
const EASE = [0.22, 1, 0.36, 1]

function TypewriterText({ texts }) {
  const [current, setCurrent] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1800)
      return () => clearTimeout(t)
    }
    const target = texts[current]
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        setPaused(true)
        setDeleting(true)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setCurrent((c) => (c + 1) % texts.length)
      }
    }
  }, [displayed, deleting, current, paused, texts])

  return (
    <span>
      <span className="text-accent">{displayed}</span>
      <span className="inline-block w-0.5 h-[0.85em] bg-accent ml-1 animate-pulse align-middle" />
    </span>
  )
}

// Letter-by-letter masked rise — each char springs up from behind a clip mask
function StaggeredName({ text, delay = 0 }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: '115%', rotate: 4 }}
          animate={{ y: '0%', rotate: 0 }}
          transition={{ duration: 0.85, delay: delay + i * 0.035, ease: EASE }}
          className="inline-block will-change-transform"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Apple-style scroll exit: content recedes (scale down + drift up + fade)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  // Mouse-follow spotlight (springs for weight)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotX = useSpring(mx, { stiffness: 50, damping: 20 })
  const spotY = useSpring(my, { stiffness: 50, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
      style={{ cursor: 'none' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Mouse-follow spotlight */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: spotX,
          top: spotY,
          background:
            'radial-gradient(circle, rgb(var(--color-accent) / 0.07) 0%, transparent 60%)',
        }}
      />

      {/* Gradient glows — drift down slower than content for depth */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px]" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y, scale, opacity, transformOrigin: 'center top' }}
        className="relative z-10 flex flex-col justify-center flex-1 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-32 will-change-transform items-center text-center md:items-start md:text-left"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </span>
          <span className="text-muted text-xs font-mono">Mumbai, India</span>
        </motion.div>

        {/* Parent flex layout grouping name items and responsive avatar */}
        <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-12 md:gap-16 lg:gap-24 w-full justify-center md:justify-start">
          <div className="flex flex-col items-center md:items-start">
            {/* Name — letter-by-letter masked rise */}
            <h1
              className="font-display font-bold leading-none tracking-tight text-text-primary"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
            >
              <StaggeredName text="Siddhesh" delay={0.4} />
            </h1>

            {/* Sub-wrapper updated to flex-col on mobile to stack lines directly below Todi */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-2 md:gap-6">
              <h1
                className="font-display font-bold leading-none tracking-tight text-text-primary"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
              >
                <StaggeredName text="Todi" delay={0.65} />
              </h1>
              
              {/* Decorative element updated with centered mobile styling and drops under Todi on phones */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
                className="mt-2 md:mt-0 mb-4 flex flex-col gap-1 origin-center items-center md:mb-6 lg:mb-8 md:origin-left md:items-start"
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent md:bg-gradient-to-r md:from-accent md:to-transparent" />
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-cyan to-transparent md:bg-gradient-to-r md:from-cyan md:to-transparent" />
              </motion.div>
            </div>
          </div>

          {/* Profile Image - Replaced hardcoded dimensions with fluid clamp sizing */}
          <img
            src="/me.jpg"
            alt={personal.name || 'Profile'}
            className="rounded-full object-cover shadow-2xl border border-border bg-bg"
            style={{
              width: 'clamp(8rem, 25vw, 13rem)',
              height: 'clamp(8rem, 25vw, 13rem)'
            }}
          />
        </div>

        {/* Role + typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
        >
          <span className="font-body text-text-secondary text-lg">
            Full Stack &amp; AI Engineer —
          </span>
          <span className="font-display font-semibold text-xl">
            <TypewriterText texts={taglines} />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-6 max-w-xl font-body text-text-secondary text-base leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4"
        >
          <Magnetic>
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-3 px-6 py-3 bg-accent text-white font-body font-medium text-sm rounded-xl hover:bg-accent-dim transition-colors duration-300"
            >
              View My Work
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="mailto:siddheshtodi@gmail.com"
              className="flex items-center gap-3 px-6 py-3 border border-border text-text-secondary font-body font-medium text-sm rounded-xl hover:border-accent/50 hover:text-text-primary transition-colors duration-300"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6"
        >
          <a
            href="https://github.com/siddhesht795"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-border" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/siddheshtodi"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-border" />
            LinkedIn
          </a>
          <span className="font-mono text-xs text-muted">
            CGPA 8.50 · TSEC Mumbai
          </span>
        </motion.div>
      </motion.div>

      {/* Oversized marquee — speed & direction react to scroll velocity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none z-0"
      >
        <VelocityMarquee baseVelocity={1.5}>
          <span
            className="font-display font-bold text-text-primary/[0.03] leading-none uppercase pr-12"
            style={{ fontSize: 'clamp(8rem, 16vw, 16rem)' }}
          >
            Developer · Engineer · Builder ·&nbsp;
          </span>
        </VelocityMarquee>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-muted hover:text-text-primary transition-colors duration-300 group"
      >
        <span className="font-mono text-xs tracking-widest rotate-90 group-hover:tracking-[0.2em] transition-all duration-300">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.button>
    </section>
  )
}