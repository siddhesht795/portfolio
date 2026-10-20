import { copyFile, mkdir } from 'node:fs/promises'
import { posts } from '../src/data/index.js'

// GitHub Pages can serve known routes directly without server-side rewrites.
const routes = ['blog', ...posts.map((post) => `blog/${post.slug}`)]
for (const route of routes) {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}
await copyFile('dist/index.html', 'dist/404.html')
