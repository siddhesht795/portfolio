import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { personal } from '../../data'
import { scrollToSection } from '../../lib/scroll'
import PortfolioTerminal from '../ui/PortfolioTerminal'

export default function Hero() {
  return (
    <section className="intro-section" aria-labelledby="intro-title">
      <div className="intro-path">
        <span>portfolio</span>
        <span aria-hidden="true">/</span>README.md
      </div>
      <div className="intro-layout">
        <div className="intro-copy">
          <div className="intro-identity">
            <img
              src={`${import.meta.env.BASE_URL}me.jpg`}
              alt="Siddhesh Todi"
              fetchpriority="high"
              width="160"
              height="160"
            />
            <span>Hi, I’m Siddhesh.</span>
          </div>
          <h1 id="intro-title">
            I build software.
            <br />
            And make it useful.
          </h1>
          <p className="intro-description">
            Full stack developer working with applied AI and automation. From
            language models to small tools that make everyday work easier.
          </p>
          <div className="intro-buttons">
            <button
              type="button"
              className="button-primary"
              onClick={() => scrollToSection('projects')}
            >
              Explore projects <ArrowDown size={15} />
            </button>
            <a
              className="button-secondary"
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              View resume <ArrowUpRight size={15} />
            </a>
          </div>
          <p className="intro-note">
            Computer Engineering, TSEC <span aria-hidden="true">/</span> Class
            of 2027
          </p>
        </div>
        <PortfolioTerminal />
      </div>
      <div className="intro-footer">
        <span>
          <span className="availability-dot" /> Available for full-time roles &
          internships
        </span>
        <a href={`mailto:${personal.email}`}>
          {personal.email}
          <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  )
}
