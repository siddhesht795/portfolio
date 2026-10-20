import { ArrowUpRight } from 'lucide-react'
import { personal } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function Contact() {
  return (
    <section id="contact" className="content-section contact-section">
      <SectionHeading
        title="Let’s work together."
        description="Open to roles, collaborations, and interesting technical conversations."
      />
      <a className="contact-email" href={`mailto:${personal.email}`}>
        {personal.email}
        <ArrowUpRight size={23} />
      </a>
      <div className="contact-links">
        <a href={personal.github} target="_blank" rel="noreferrer">
          GitHub
          <ArrowUpRight size={14} />
        </a>
        <a href={personal.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
          <ArrowUpRight size={14} />
        </a>
        <span>Mumbai, India</span>
      </div>
    </section>
  )
}
