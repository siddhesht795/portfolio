import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Masked line-rise reveal for headings. Pass children as an array of
// "lines" (strings or JSX) — each line slides up from behind a mask.
export default function AnimatedHeading({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  style,
  once = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px' })

  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: '110%', rotate: 2.5 }}
            animate={inView ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
