import BackLink from '../components/ui/BackLink'
import { useParams } from 'react-router-dom'
import { posts } from '../data/index.js'

function renderBlogContent(content = []) {
  return content.map((block, index) => {
    if (block.type === 'heading') {
      return (
        <h2 key={`${block.type}-${index}`} className="text-text-primary">
          {block.text}
        </h2>
      )
    }

    if (block.type === 'paragraph') {
      return (
        <p key={`${block.type}-${index}`} className="text-text-secondary">
          {block.text}
        </p>
      )
    }

    if (block.type === 'list') {
      return (
        <ul
          key={`${block.type}-${index}`}
          className="list-disc space-y-2 pl-6 text-text-secondary"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      )
    }

    if (block.type === 'callout') {
      return (
        <div
          key={`${block.type}-${index}`}
          className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5"
        >
          <p className="font-medium text-accent">{block.title}</p>
          <p className="mt-2 text-base leading-8 text-text-secondary md:text-lg">
            {block.text}
          </p>
          {block.items && (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-text-secondary md:text-lg">
              {block.items.map((item, itemIndex) => (
                <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    return null
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((entry) => entry.slug === slug)

  if (!post) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="blog-post-page min-h-[70vh] flex items-center"
      >
        <div className="w-full py-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            404
          </p>
          <h1 className="font-display text-4xl text-text-primary">
            Post Not Found
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            The blog post you are looking for does not exist or may have moved.
          </p>
          <div className="mt-8 flex gap-4">
            <BackLink />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" tabIndex={-1} className="blog-post-page">
      <div className="mb-8">
        <BackLink />
      </div>

      <article className="blog-article">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover md:h-80"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        )}

        <div className="article-content">
          <header>
            <time dateTime={post.date} className="text-muted">
              {post.date}
            </time>
            <h1>{post.title}</h1>
          </header>

          <div className="article-body text-text-secondary">
            {renderBlogContent(post.content || [])}
          </div>
        </div>
      </article>
    </main>
  )
}
