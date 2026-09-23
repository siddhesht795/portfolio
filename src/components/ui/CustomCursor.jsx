import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reqRef = useRef()
  const trailRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }
    const enter = () => setHidden(false)
    const leave = () => setHidden(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseleave', leave)

    const handleHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    handleHover()

    const animate = () => {
      trailRef.current = {
        x: trailRef.current.x + (posRef.current.x - trailRef.current.x) * 0.12,
        y: trailRef.current.y + (posRef.current.y - trailRef.current.y) * 0.12,
      }
      setTrail({ ...trailRef.current })
      reqRef.current = requestAnimationFrame(animate)
    }
    reqRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(reqRef.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: hidden ? 0 : 1,
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0 }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: trail.x - 20,
          y: trail.y - 20,
          opacity: hidden ? 0 : 1,
          scale: hovered ? 2.5 : 1,
        }}
        transition={{ duration: 0 }}
      >
        <div
          className="w-10 h-10 rounded-full border border-white"
          style={{ transition: 'transform 0.15s ease, opacity 0.15s ease' }}
        />
      </motion.div>
    </>
  )
}
