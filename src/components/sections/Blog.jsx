import React from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../../data/index.js'

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">Writing</p>
          <h2 className="font-display text-3xl md:text-4xl">Blog</h2>
        </div>
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-text-secondary transition-colors hover:text-accent">
          View all posts →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl border border-border bg-surface/60 p-6 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl">
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="mb-4 h-40 w-full rounded-xl object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />
            )}
            <time className="mb-2 block text-sm text-muted">{p.date}</time>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">{p.title}</h3>
            <p className="mb-4 text-text-secondary">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-text-primary">
              Read <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
