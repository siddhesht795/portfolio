// Shared Lenis instance so any component can trigger smooth scrolls
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToSection(id, options = {}) {
  const element = id === 'top' ? null : document.getElementById(id)
  if (id !== 'top' && !element) return
  const target = id === 'top' ? 0 : element
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -96, duration: 1.4, immediate: reducedMotion, ...options })
  } else {
    const top = element ? Math.max(0, element.getBoundingClientRect().top + window.scrollY - 96) : 0
    window.scrollTo({ top, behavior: reducedMotion || options.immediate ? 'instant' : 'smooth' })
  }
}
