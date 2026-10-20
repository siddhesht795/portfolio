import { experience } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="content-section">
      <SectionHeading
        title="Experience"
        description="Where I’ve learned by building."
      />
      <div className="experience-list">
        {experience.map((job) => (
          <article className="experience-item" key={job.id}>
            <div className="experience-meta">
              <span>{job.period}</span>
              <span>{job.type}</span>
            </div>
            <div>
              <h3>{job.role}</h3>
              <p className="experience-company">{job.company}</p>
              <ul>
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="tech-tags">
                {job.tags.map((tag) => (
                  <span className="tech-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
