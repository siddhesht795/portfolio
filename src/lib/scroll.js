// Shared Lenis instance so any component can trigger smooth scrolls
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToSection(id, options = {}) {
  const target = id === 'top' ? 0 : `#${id}`
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.4, ...options })
  } else {
    const el = id === 'top' ? document.body : document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
