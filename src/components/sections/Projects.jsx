import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/index.js'
import { useTheme } from '../../context/ThemeContext'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'

function TechTag({ name, color }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-200"
      style={{
        borderColor: `${color}30`,
        color: `${color}cc`,
        backgroundColor: `${color}08`,
      }}
    >
      {name}
    </span>
  )
}

// Card pinned with position:sticky; as the next card scrolls over it, this one
// recedes (scales down) — classic stacking-deck effect.
function StackCard({ project, index, total, containerProgress }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const targetScale = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(containerProgress, [index / total, 1], [1, targetScale])

  return (
    <div
      ref={ref}
      className="lg:sticky"
      style={{ top: `calc(12vh + ${index * 28}px)` }}
    >
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ scale, transformOrigin: 'center top' }}
        className="group relative rounded-3xl border border-border/50 bg-surface overflow-hidden hover:border-opacity-60 transition-colors duration-500 will-change-transform"
      >
        {/* Top color accent bar */}
        <div
          className="h-[2px] w-full transition-all duration-500 group-hover:h-[3px]"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Left side */}
            <div className="flex-1 space-y-5">
              {/* Number + year */}
              <div className="flex items-center justify-between">
                <span
                  className="font-display font-bold text-6xl leading-none select-none"
                  style={{ color: `${project.color}15` }}
                >
                  {project.number}
                </span>
                <span className="font-mono text-xs text-muted border border-border/40 px-2 py-1 rounded-lg">
                  {project.year}
                </span>
              </div>

              {/* Title + subtitle */}
              <div>
                <h3
                  className="font-display font-bold text-3xl text-text-primary leading-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #fafafa, ${project.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'inherit',
                  }}
                >
                  {project.title}
                </h3>
                <p className="font-mono text-sm mt-1" style={{ color: `${project.color}99` }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="font-body text-text-secondary text-base leading-relaxed">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <TechTag key={t} name={t} color={project.color} />
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl border font-body text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: `${project.color}40`,
                    color: project.color,
                    backgroundColor: `${project.color}08`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                  <span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">→</span>
                </a>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/40 text-muted text-sm font-body hover:text-text-primary hover:border-border transition-all duration-200"
                >
                  {expanded ? 'Less' : 'Details'}
                  <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    ↓
                  </motion.span>
                </button>
              </div>
            </div>

            {/* Right side — highlights */}
            <div className="md:w-72 lg:w-80 flex-shrink-0">
              <div className="space-y-3">
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Key Features</p>
                {project.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.07 + 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                    <p className="font-body text-text-secondary text-sm leading-relaxed">{h}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Expandable PSI (Problem → Solution → Impact) */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-3 gap-6"
                  style={{ borderColor: `${project.color}20` }}
                >
                  {[
                    { label: 'Problem', text: project.problem, icon: '🔴' },
                    { label: 'Solution', text: project.solution, icon: '🟡' },
                    { label: 'Impact', text: project.impact, icon: '🟢' },
                  ].map(({ label, text, icon }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span>{icon}</span>
                        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.color }}>
                          {label}
                        </span>
                      </div>
                      <p className="font-body text-text-secondary text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{ boxShadow: `inset 0 0 60px ${project.color}08` }}
        />
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const { isDark } = useTheme()
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  // Resolve theme-correct color for each project before rendering
  const themedProjects = projects.map((p) => ({
    ...p,
    color: isDark ? p.color : p.lightColor,
  }))

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-bg overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[600px] bg-accent/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionLabel label="Projects" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <AnimatedHeading
            lines={[
              "Things I've",
              <span key="l2" className="text-gradient">
                built &amp; shipped
              </span>,
            ]}
            className="font-display font-bold leading-tight text-text-primary"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-muted text-sm md:text-right max-w-xs"
          >
            Each project represents a problem worth solving.
          </motion.p>
        </div>

        {/* Stacking deck — each card pins, the next slides over it */}
        <div ref={stackRef} className="space-y-10 lg:space-y-24 lg:pb-[10vh]">
          {themedProjects.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={themedProjects.length}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
