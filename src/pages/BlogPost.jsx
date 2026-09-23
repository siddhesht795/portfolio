import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/index.js'

function renderBlogContent(content = []) {
    return content.map((block, index) => {
        if (block.type === 'heading') {
            return (
                <h2 key={`${block.type}-${index}`} className="mt-8 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                    {block.text}
                </h2>
            )
        }

        if (block.type === 'paragraph') {
            return (
                <p key={`${block.type}-${index}`} className="text-base leading-8 text-text-secondary md:text-lg">
                    {block.text}
                </p>
            )
        }

        if (block.type === 'list') {
            return (
                <ul key={`${block.type}-${index}`} className="list-disc space-y-2 pl-6 text-base leading-8 text-text-secondary md:text-lg">
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
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{block.title}</p>
                    <p className="mt-2 text-base leading-8 text-text-secondary md:text-lg">{block.text}</p>
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
            <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-20">
                <div className="w-full rounded-3xl border border-border bg-surface/60 p-10 text-center shadow-lg shadow-black/5">
                    <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">404</p>
                    <h1 className="font-display text-4xl text-text-primary">Post Not Found</h1>
                    <p className="mt-4 text-lg text-text-secondary">
                        The blog post you are looking for does not exist or may have moved.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 font-medium text-accent transition-colors hover:border-accent hover:text-text-primary">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-4xl px-6 pb-20 pt-28">
            <div className="mb-8">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-text-primary"
                >
                    ← Back to Blog
                </Link>
            </div>

            <article className="overflow-hidden rounded-[28px] border border-border bg-surface/60 shadow-xl shadow-black/5">
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

                <div className="p-6 md:p-10">
                    <time className="block text-sm font-medium uppercase tracking-[0.2em] text-muted">{post.date}</time>
                    <h1 className="mt-4 font-display text-4xl leading-tight text-text-primary md:text-5xl">{post.title}</h1>

                    <div className="mt-8 space-y-6 text-base leading-8 text-text-secondary md:text-lg">
                        {renderBlogContent(post.content || [])}
                    </div>
                </div>
            </article>
        </main>
    )
}
