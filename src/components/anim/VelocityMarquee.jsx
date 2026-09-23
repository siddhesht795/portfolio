import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Infinite marquee whose speed & direction react to scroll velocity —
// the signature effect on landonorris.com section dividers.
export default function VelocityMarquee({ children, baseVelocity = 2, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const directionRef = useRef(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) directionRef.current = -1
    else if (vf > 0) directionRef.current = 1
    moveBy += moveBy * Math.abs(vf)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block flex-shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
