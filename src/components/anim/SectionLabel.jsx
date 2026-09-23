import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Shared "— Label" eyebrow with an expanding rule line.
export default function SectionLabel({ label, className = 'mb-6' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className}`}>
      <motion.span
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-xs text-accent uppercase tracking-widest"
      >
        — {label}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent origin-left"
      />
    </div>
  )
}
