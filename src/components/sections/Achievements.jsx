import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '../../data/index.js'
import { useTheme } from '../../context/ThemeContext'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { isDark } = useTheme()

  const textBase = isDark ? '#fafafa' : '#1a0d05'

  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-bg overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref}>
          <SectionLabel label="Achievements" />
        </div>

        <AnimatedHeading
          lines={[
            'Recognition &',
            <span key="l2" className="text-gradient">
              milestones
            </span>,
          ]}
          className="font-display font-bold leading-tight text-text-primary mb-16"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((item, i) => {
            const color = isDark ? item.color : item.lightColor
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-7 rounded-2xl border border-border/50 bg-surface hover:scale-[1.02] transition-all duration-400 overflow-hidden cursor-default"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${color}10, transparent 60%)` }}
                />

                <span className="text-4xl block mb-4">{item.icon}</span>

                <h3
                  className="font-display font-bold text-lg text-text-primary leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${textBase}, ${color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'inherit',
                  }}
                >
                  {item.title}
                </h3>

                <p className="font-body text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
