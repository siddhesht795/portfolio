import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '../../data/index.js'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'
import TextReveal from '../anim/TextReveal'
import Counter from '../anim/Counter'
import Parallax from '../anim/Parallax'

const stats = [
  { value: '8.61', label: 'CGPA', suffix: '' },
  { value: '2', label: 'Internships', suffix: '+' },
]

function StatCard({ value, label, suffix, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1 p-6 rounded-2xl border border-border/60 bg-surface hover:border-accent/30 hover:bg-surface/80 transition-all duration-300 group"
    >
      <span className="font-display font-bold text-4xl text-text-primary leading-none group-hover:text-accent transition-colors duration-300">
        <Counter value={value} />
        <span className="text-accent">{suffix}</span>
      </span>
      <span className="font-mono text-xs text-muted uppercase tracking-widest">{label}</span>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 md:py-32 bg-bg overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref}>
          <SectionLabel label="About" className="mb-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Text */}
          <div className="space-y-8">
            <AnimatedHeading
              lines={[
                'Building at the',
                <span key="l2">
                  edge of <span className="text-gradient">AI &amp;</span>
                </span>,
                <span key="l3" className="text-gradient">
                  Engineering
                </span>,
              ]}
              className="font-display font-bold leading-tight text-text-primary"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            />

            {/* Bio — scroll-scrubbed word-by-word reveal (Apple style) */}
            <TextReveal
              text={personal.bio}
              className="font-body text-text-secondary text-lg leading-relaxed"
            />

            <TextReveal
              text={personal.bioExtended}
              className="font-body text-muted text-base leading-relaxed"
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-2"
            >
              {['Full Stack', 'AI / ML', 'Automation', 'Graph Neural Networks', 'Systems Design'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-accent/20 text-accent/80 bg-accent/5 hover:border-accent/50 hover:text-accent transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex items-center gap-6 pt-2"
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <span className="w-4 h-px bg-border group-hover:w-8 group-hover:bg-accent transition-all duration-300" />
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <span className="w-4 h-px bg-border group-hover:w-8 group-hover:bg-accent transition-all duration-300" />
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="group flex items-center gap-2 text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <span className="w-4 h-px bg-border group-hover:w-8 group-hover:bg-accent transition-all duration-300" />
                Email
              </a>
            </motion.div>
          </div>

          {/* Right — Stats + Info, drifting slightly slower for depth */}
          <Parallax speed={0.25} className="space-y-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </div>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="p-6 rounded-2xl border border-border/60 bg-surface space-y-3 hover:border-cyan/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Education</p>
                  <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">
                    Thadomal Shahani Engineering College
                  </h3>
                  <p className="font-body text-text-secondary text-sm mt-1">
                    B.E. Computer Engineering
                  </p>
                </div>
                <span className="flex-shrink-0 font-mono text-xs text-cyan px-2 py-1 rounded-lg border border-cyan/20 bg-cyan/5">
                  2023 – 2027
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-sm text-text-primary font-medium">CGPA: 8.61</span>
                <span className="font-body text-muted text-sm">— Mumbai, MH</span>
              </div>
            </motion.div>

            {/* Currently section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="p-6 rounded-2xl border border-border/60 bg-surface space-y-3"
            >
              <p className="font-mono text-xs text-muted uppercase tracking-widest">Currently</p>
              <div className="space-y-2">
                {[
                  '📍 Mumbai, India',
                  '🎓 4th Year Computer Engineering Student',
                  '🚀 Ex - Summer Intern @ Deloitte',
                  '💼 Open to Full-Time & Internship Opportunities',
                  '🔭 Exploring LLMs, Agents & Graph ML',
                ].map((item) => (
                  <p key={item} className="font-body text-text-secondary text-sm">
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </section>
  )
}
