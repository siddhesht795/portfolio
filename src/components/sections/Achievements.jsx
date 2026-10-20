import { Award } from 'lucide-react'
import { achievements } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function Achievements() {
  return (
    <section id="achievements" className="content-section">
      <SectionHeading title="A few milestones" />
      <div className="achievement-list">
        {achievements.map((item) => (
          <article key={item.title}>
            <Award size={18} className="text-muted" aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
