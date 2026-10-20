import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  FileCode2,
  FileText,
  FolderOpen,
  Github,
  Menu,
  Moon,
  Sun,
  TerminalSquare,
  X,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { personal } from '../../data'
import { scrollToSection } from '../../lib/scroll'

const files = [
  { label: 'About', extension: '.md' },
  { label: 'Skills', extension: '.json' },
  { label: 'Projects', extension: '.tsx' },
  { label: 'Experience', extension: '.md' },
  { label: 'Blog', extension: '/' },
  { label: 'Resume', extension: '.pdf' },
  { label: 'Contact', extension: '.md' },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    setActive(location.pathname.startsWith('/blog') ? 'blog' : '')
    setMenuOpen(false)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    )
    files.forEach(({ label }) => {
      const section = document.getElementById(label.toLowerCase())
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  const go = (section) => {
    if (location.pathname !== '/')
      navigate(section === 'top' ? '/' : `/#${section}`)
    else {
      scrollToSection(section)
      if (section === 'terminal')
        document
          .getElementById('terminal-input')
          ?.focus({ preventScroll: true })
    }
    setMenuOpen(false)
  }
  const isBlog = location.pathname.startsWith('/blog')
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="workspace-header">
        <button
          type="button"
          className="workspace-brand"
          onClick={() => go('top')}
          aria-label="Siddhesh Todi home"
        >
          <FileCode2 size={19} aria-hidden="true" />
          <span>
            siddhesh<span className="text-muted"> / portfolio</span>
          </span>
        </button>
        <div className="workspace-actions">
          <button
            type="button"
            className="terminal-shortcut"
            onClick={() => go('terminal')}
          >
            <TerminalSquare size={15} aria-hidden="true" /> Terminal
          </button>
          <a
            className="icon-button"
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={17} />
          </a>
          <button
            type="button"
            className="icon-button"
            onClick={toggle}
            aria-label={
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            type="button"
            className="icon-button mobile-menu-toggle"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="workspace-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Dismiss navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <nav
        id="workspace-navigation"
        aria-label="Portfolio sections"
        className={`workspace-sidebar ${menuOpen ? 'is-open' : ''}`}
      >
        <p className="sidebar-caption">Explorer</p>
        <div className="sidebar-folder">
          <ChevronDown size={14} />
          <FolderOpen size={15} />
          <span>portfolio</span>
        </div>
        <button
          type="button"
          className={`file-link ${!active && !isBlog ? 'is-active' : ''}`}
          onClick={() => go('top')}
        >
          <FileText size={15} aria-hidden="true" />
          README.md
        </button>
        {files.map(({ label, extension }) => (
          <button
            type="button"
            key={label}
            onClick={() => go(label.toLowerCase())}
            aria-current={
              active === label.toLowerCase() ? 'location' : undefined
            }
            className={`file-link ${active === label.toLowerCase() ? 'is-active' : ''}`}
          >
            {extension === '.tsx' || extension === '.json' ? (
              <FileCode2 size={15} aria-hidden="true" />
            ) : (
              <FileText size={15} aria-hidden="true" />
            )}
            <span className="file-name" data-extension={extension}>
              {label}
            </span>
          </button>
        ))}
        <div className="sidebar-note">
          <span className="availability-dot" />
          Open to opportunities
          <p>
            Full stack & applied AI
            <br />
            Mumbai, India
          </p>
        </div>
      </nav>
      <div className="workspace-tabs" aria-label="Current page">
        <span className="workspace-tab">
          <FileText size={14} aria-hidden="true" />
          {isBlog
            ? location.pathname === '/blog' || location.pathname === '/blog/'
              ? 'blog / index.md'
              : 'blog / slm-notes.md'
            : location.pathname === '/'
              ? 'README.md'
              : '404.md'}
        </span>
        <span className="workspace-tab-context">Siddhesh Todi</span>
      </div>
    </>
  )
}
