import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../../lib/scroll'

// Inertia smooth-scrolling (same engine used on landonorris.com & most Awwwards sites).
// Lenis drives the real scrollbar, so Framer Motion's useScroll stays in sync for free.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      anchors: false,
    })
    setLenis(lenis)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
