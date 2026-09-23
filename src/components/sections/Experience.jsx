import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { experience } from '../../data/index.js'
import { useTheme } from '../../context/ThemeContext'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'

function ExperienceCard({ job }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Dot — pops when the card enters */}
      <div className="flex flex-col items-center flex-shrink-0 w-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
          className="w-3 h-3 rounded-full border-2 z-10 flex-shrink-0"
          style={{ borderColor: job.color, backgroundColor: `${job.color}30`, boxShadow: `0 0 12px ${job.color}50` }}
        />
      </div>

      {/* Card content */}
      <div className="flex-1 pb-12 md:pb-16 group" style={{ '--job-color': job.color }}>
        <div
          className="p-6 md:p-8 rounded-2xl border border-border/50 bg-surface hover:border-opacity-60 transition-all duration-400 hover:bg-surface/80"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${job.color}40`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="font-display font-bold text-xl text-text-primary leading-tight">
                {job.role}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-body font-medium text-sm" style={{ color: job.color }}>
                  {job.company}
                </span>
                {job.location && (
                  <>
                    <span className="text-muted">·</span>
                    <span className="font-body text-sm text-muted">{job.location}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-lg border"
                style={{ borderColor: `${job.color}30`, color: job.color, backgroundColor: `${job.color}08` }}
              >
                {job.period}
              </span>
              <span className="font-mono text-xs text-muted border border-border/30 px-2.5 py-1 rounded-lg">
                {job.type}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2.5 mb-5">
            {job.highlights.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 + 0.25 }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: job.color }}
                />
                <p className="font-body text-text-secondary text-sm leading-relaxed">{point}</p>
              </motion.li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono border"
                style={{
                  borderColor: `${job.color}25`,
                  color: `${job.color}99`,
                  backgroundColor: `${job.color}06`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { isDark } = useTheme()
  const timelineRef = useRef(null)

  // Line draws itself in lockstep with scroll position (scrub, not one-shot)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.55'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const themedExperience = experience.map((job) => ({
    ...job,
    color: isDark ? job.color : job.lightColor,
  }))

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-surface overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-cyan/4 blur-[120px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionLabel label="Experience" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <AnimatedHeading
            lines={[
              "Where I've",
              <span key="l2" className="text-gradient">
                grown &amp; contributed
              </span>,
            ]}
            className="font-display font-bold leading-tight text-text-primary"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl">
          {/* Track */}
          <div className="absolute left-[5.5px] top-1.5 bottom-16 w-px bg-border/40" />
          {/* Scroll-drawn progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[5.5px] top-1.5 bottom-16 w-px origin-top bg-gradient-to-b from-accent via-cyan to-accent"
          />

          {themedExperience.map((job) => (
            <ExperienceCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
