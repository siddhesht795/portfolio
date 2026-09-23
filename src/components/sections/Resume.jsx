import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'
import Magnetic from '../anim/Magnetic'

export default function Resume() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="resume" className="relative py-24 md:py-32 bg-surface overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <div ref={ref}>
          <SectionLabel label="Resume" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <AnimatedHeading
            lines={[
              <span key="l1">
                My <span className="text-gradient">Resume</span>
              </span>,
            ]}
            className="font-display font-bold leading-tight text-text-primary"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          />

          <Magnetic strength={0.3}>
            <motion.a
              href="/resume.pdf"
              download="Siddhesh_Todi_Resume.pdf"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-accent/40 text-accent bg-accent/5 hover:bg-accent/10 hover:border-accent font-body font-medium text-sm transition-colors duration-300 flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </motion.a>
          </Magnetic>
        </div>

        {/* PDF viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border/50 overflow-hidden bg-bg shadow-2xl shadow-black/20"
        >
          <iframe
            src="/resume.pdf"
            title="Siddhesh Todi Resume"
            className="w-full"
            style={{ height: 'min(85vh, 1000px)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
