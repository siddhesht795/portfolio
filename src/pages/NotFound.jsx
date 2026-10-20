import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-screen max-w-3xl px-6 pb-20 pt-32 text-center">
      <p className="text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl">Page not found</h1>
      <p className="my-6 text-text-secondary">The page you are looking for does not exist.</p>
      <Link to="/" className="text-accent">← Back to Portfolio</Link>
    </main>
  )
}
