import { Download, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

export default function Resume() {
  const url = `${import.meta.env.BASE_URL}resume.pdf`
  return (
    <section id="resume" className="content-section">
      <SectionHeading
        title="Resume"
        description="My experience, projects, and education in one place."
      />
      <div className="resume-actions">
        <a
          className="button-primary"
          href={url}
          download="Siddhesh_Todi_Resume.pdf"
        >
          <Download size={15} />
          Download PDF
        </a>
        <a
          className="button-secondary"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Open in new tab
          <ArrowUpRight size={15} />
        </a>
      </div>
      <details className="resume-preview">
        <summary>Preview resume</summary>
        <iframe src={url} title="Siddhesh Todi Resume" loading="lazy" />
      </details>
    </section>
  )
}
