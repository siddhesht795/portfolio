import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

// Number that counts up from 0 when scrolled into view. Handles decimals ("8.50").
export default function Counter({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const numeric = parseFloat(value)
  const decimals = (String(value).split('.')[1] || '').length

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (inView) motionVal.set(numeric)
  }, [inView, numeric, motionVal])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest.toFixed(decimals)
    })
  }, [spring, decimals])

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  )
}
