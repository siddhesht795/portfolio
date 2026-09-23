import { personal } from '../../data/index.js'
import VelocityMarquee from '../anim/VelocityMarquee'
import { scrollToSection } from '../../lib/scroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/30 bg-bg overflow-hidden">
      {/* Oversized name marquee — reacts to scroll velocity */}
      <div className="py-8 border-b border-border/20 select-none pointer-events-none">
        <VelocityMarquee baseVelocity={2}>
          <span className="font-display font-bold text-[clamp(3rem,8vw,7rem)] leading-none uppercase text-text-primary/[0.05] pr-10">
            Siddhesh Todi — Full Stack &amp; AI Engineer —&nbsp;
          </span>
        </VelocityMarquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('top')}
            className="group flex items-center gap-3"
          >
            <span className="font-display font-bold text-2xl text-text-primary tracking-tight">
              ST<span className="text-accent">.</span>
            </span>
            <span className="font-mono text-xs text-muted group-hover:text-text-secondary transition-colors duration-300">
              Back to top ↑
            </span>
          </button>

          {/* Center — tagline */}
          <p className="font-mono text-xs text-muted text-center">
            Designed & built by{' '}
            <span className="text-accent">Siddhesh Todi</span>
            {' '}· {year}
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-text-primary transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-text-primary transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-xs text-muted hover:text-text-primary transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
