import { Link, useLocation } from 'react-router-dom'
import { getReturnDestination } from '../../lib/navigation'

export default function BackLink({ fallback = '/blog' }) {
  const { state } = useLocation()
  const destination = getReturnDestination(state?.from, fallback)
  const home = destination.to.split('#')[0].split('?')[0] === '/'
  return (
    <Link {...destination} className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-text-primary">
      ← Back to {home ? 'Portfolio' : 'Blog'}
    </Link>
  )
}
