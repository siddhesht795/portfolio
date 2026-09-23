import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Translates children vertically against scroll for depth. speed > 0 lags,
// speed < 0 leads. Keep |speed| <= 1 for subtlety.
export default function Parallax({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
