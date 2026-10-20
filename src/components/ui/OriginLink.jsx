import { Link, useLocation, useNavigate } from 'react-router-dom'

// Capture scroll position when the link is activated, rather than at render time.
export default function OriginLink({ to, children, ...props }) {
  const location = useLocation()
  const navigate = useNavigate()
  const onClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to, { state: { from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      scrollY: window.scrollY,
    } } })
  }
  return <Link {...props} to={to} onClick={onClick}>{children}</Link>
}
