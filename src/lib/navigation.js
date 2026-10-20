export function getReturnDestination(from, fallback = '/blog') {
  const pathname = typeof from?.pathname === 'string' ? from.pathname.replace(/\/+$/, '') || '/' : null
  if (!['/', '/blog'].includes(pathname)) return { to: fallback }
  return {
    to: `${from.pathname}${from.search || ''}${from.hash || ''}`,
    state: { from: from.state?.from, restoreScroll: Number.isFinite(from.scrollY) ? Math.max(0, from.scrollY) : 0 },
  }
}

export function getScrollTarget(location, navigationType, positions) {
  if (navigationType === 'POP' && positions.has(location.key)) return positions.get(location.key)
  if (Number.isFinite(location.state?.restoreScroll)) return Math.max(0, location.state.restoreScroll)
  if (location.hash) {
    try { return decodeURIComponent(location.hash.slice(1)) } catch { return '' }
  }
  return 0
}
