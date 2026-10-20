import { personal } from '../../data'
import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="content-section">
      <SectionHeading title="About" description="The person behind the code." />
      <div className="about-layout">
        <div className="prose-copy">
          <p>
            I’m a Computer Engineering student at Thadomal Shahani Engineering
            College, Mumbai. I enjoy working across the stack, especially where
            software engineering meets machine learning.
          </p>
          <p>
            My work has taken me from Python code-review models at Deloitte to
            finance data pipelines, graph-based recommendations, and developer
            tooling. I like understanding the problem, building something
            practical, and making it easier to use.
          </p>
          <p>
            Currently exploring language models, AI agents, and graph machine
            learning.
          </p>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>Based in</dt>
            <dd>Mumbai, India</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>B.E. Computer Engineering</dd>
          </div>
          <div>
            <dt>Graduating</dt>
            <dd>2027</dd>
          </div>
          <div>
            <dt>CGPA</dt>
            <dd>{personal.cgpa} / 10</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
