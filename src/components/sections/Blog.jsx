import OriginLink from '../ui/OriginLink'
import { posts } from '../../data'

export default function Blog({ showViewAll = true }) {
  const Title = showViewAll ? 'h2' : 'h1'
  return (
    <section id="blog" className="content-section">
      <div className="section-heading">
        <div>
          <Title>Notes & writing</Title>
          <p>What I’m building, studying, and figuring out.</p>
        </div>
        {showViewAll && <OriginLink to="/blog">View all posts →</OriginLink>}
      </div>
      <div className="blog-list">
        {posts.map((post) => {
          const words = post.content.reduce(
            (count, block) =>
              count +
              (block.text || block.items?.join(' ') || '').split(/\s+/).length,
            0
          )
          return (
            <article key={post.id} className="blog-entry">
              <div className="blog-entry-meta">
                <time dateTime={post.date}>{post.date}</time>
                <span>{Math.max(1, Math.ceil(words / 220))} min read</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <OriginLink to={`/blog/${post.slug}`}>
                Read <span aria-hidden="true">→</span>
              </OriginLink>
            </article>
          )
        })}
      </div>
    </section>
  )
}
