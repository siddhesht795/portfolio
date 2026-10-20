import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { projects } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="content-section">
      <SectionHeading
        title="Selected projects"
        description="Things I’ve built to solve practical problems."
      />
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-item" key={project.id}>
            <div className="project-item-header">
              <FolderGit2
                size={20}
                className="text-accent"
                aria-hidden="true"
              />
              <span>{project.year}</span>
            </div>
            <div className="project-title">
              <h3>{project.title}</h3>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                Source <ArrowUpRight size={14} />
              </a>
            </div>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-description">{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <details className="project-details">
              <summary>Implementation notes</summary>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>{project.solution}</dd>
                </div>
              </dl>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}
