import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { getLenis } from '../../lib/scroll'
import { getScrollTarget } from '../../lib/navigation'

const positions = new Map()

export default function RouteScroll() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    let frame
    const restore = () => {
      const target = getScrollTarget(location, navigationType, positions)
      const element = typeof target === 'string' ? document.getElementById(target) : null
      const y = typeof target === 'number'
        ? target
        : element ? Math.max(0, element.getBoundingClientRect().top + window.scrollY - 96) : 0
      const lenis = getLenis()
      if (lenis) {
        lenis.resize()
        lenis.scrollTo(y, { immediate: true, force: true })
      } else {
        window.scrollTo({ top: y, behavior: 'instant' })
      }
      positions.set(location.key, window.scrollY)
    }
    restore()
    // Reapply after the smooth-scroll engine and page effects have mounted.
    frame = requestAnimationFrame(restore)
    const save = () => positions.set(location.key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', save)
    }
  }, [location, navigationType])

  return null
}
