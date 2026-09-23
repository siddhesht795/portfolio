import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { skills } from '../../data/index.js'
import { useTheme } from '../../context/ThemeContext'
import SectionLabel from '../anim/SectionLabel'
import AnimatedHeading from '../anim/AnimatedHeading'

function SkillPill({ name, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, delay }}
      className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium border border-border/60 bg-surface text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 cursor-default"
    >
      {name}
    </motion.span>
  )
}

function CategoryCard({ category, icon, color, items, isActive, onClick, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
        isActive
          ? 'border-opacity-60 bg-surface scale-[1.02]'
          : 'border-border/40 bg-surface/40 hover:border-border hover:bg-surface/70 hover:scale-[1.01]'
      }`}
      style={{
        borderColor: isActive ? `${color}50` : undefined,
        boxShadow: isActive ? `0 0 30px ${color}15, 0 0 60px ${color}08` : undefined,
      }}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}

      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl leading-none mt-0.5">{icon}</span>
        <div>
          <h3
            className="font-display font-semibold text-sm uppercase tracking-wider transition-colors duration-300"
            style={{ color: isActive ? color : undefined }}
            // inactive uses text-text-secondary via CSS class fallback
          >
            <span className={isActive ? '' : 'text-text-secondary'}>{category}</span>
          </h3>
          <p className="font-mono text-xs text-muted mt-0.5">{items.length} skills</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {items.slice(0, 3).map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 rounded-md text-xs font-mono border border-border/40 text-muted"
            style={{ borderColor: isActive ? `${color}25` : undefined, color: isActive ? `${color}cc` : undefined }}
          >
            {item}
          </span>
        ))}
        {items.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-xs font-mono text-muted">
            +{items.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const { isDark } = useTheme()

  // Resolve theme-correct color for each skill
  const col = (skill) => isDark ? skill.color : skill.lightColor
  const activeSkill = skills[active]
  const activeColor = col(activeSkill)

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-surface overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={ref}>
          <SectionLabel label="Skills" className="mb-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8">
            <AnimatedHeading
              lines={[
                'Tools I wield to',
                <span key="l2" className="text-gradient">
                  build &amp; ship
                </span>,
              ]}
              className="font-display font-bold leading-tight text-text-primary"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-text-secondary leading-relaxed"
            >
              From neural networks to CLI tools — the full stack of technologies I use to turn ideas into products.
            </motion.p>

            {/* Expanded skill panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border bg-bg/60 space-y-4"
                style={{ borderColor: `${activeColor}30` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeSkill.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-xl" style={{ color: activeColor }}>
                      {activeSkill.category}
                    </h3>
                    <p className="font-mono text-xs text-muted">{activeSkill.items.length} technologies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {activeSkill.items.map((item, i) => (
                      <SkillPill key={item} name={item} delay={i * 0.04} />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Marquee strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="overflow-hidden"
            >
              <div className="flex gap-6 animate-marquee whitespace-nowrap">
                {[...skills.flatMap((s) => s.items), ...skills.flatMap((s) => s.items)].map((item, i) => (
                  <span key={i} className="font-mono text-xs text-muted/40 uppercase tracking-widest flex-shrink-0">
                    {item} <span className="text-accent/30 mx-2">·</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Category cards grid */}
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <CategoryCard
                key={skill.category}
                {...skill}
                color={col(skill)}
                isActive={active === i}
                onClick={() => setActive(i)}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
