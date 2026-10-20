import { skills } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="content-section">
      <SectionHeading
        title="Toolkit"
        description="Languages, frameworks, and tools I work with."
      />
      <dl className="skills-list">
        {skills.map((group) => (
          <div key={group.category}>
            <dt>{group.category}</dt>
            <dd>
              {group.items.map((item) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
