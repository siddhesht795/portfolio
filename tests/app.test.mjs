import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'

await mkdir('tmp/tests', { recursive: true })
await build({
  stdin: {
    contents:
      "export { default } from './src/App.jsx'; export { setLenis } from './src/lib/scroll.js'",
    resolveDir: process.cwd(),
    loader: 'jsx',
  },
  outfile: 'tmp/tests/app.mjs',
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  jsx: 'automatic',
  define: { 'import.meta.env.BASE_URL': JSON.stringify('/') },
})

const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost/' })
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'Element',
  'SVGElement',
  'Node',
  'MouseEvent',
  'AbortController',
  'AbortSignal',
]) {
  globalThis[name] = name === 'window' ? dom.window : dom.window[name]
}
globalThis.getComputedStyle = window.getComputedStyle.bind(window)
document.documentElement.style.position = 'relative'
globalThis.localStorage = window.localStorage
globalThis.IS_REACT_ACT_ENVIRONMENT = true
window.matchMedia = (query) => ({
  matches: query.includes('reduce') || query.includes('coarse'),
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
})
const observers = []
globalThis.IntersectionObserver = class {
  constructor() {
    this.elements = new Set()
    observers.push(this)
  }
  observe(element) {
    this.elements.add(element)
  }
  unobserve(element) {
    this.elements.delete(element)
  }
  disconnect() {
    this.elements.clear()
  }
}
let frameId = 0
const frames = new Map()
globalThis.requestAnimationFrame = window.requestAnimationFrame = (
  callback
) => {
  frames.set(++frameId, callback)
  return frameId
}
globalThis.cancelAnimationFrame = window.cancelAnimationFrame = (id) =>
  frames.delete(id)
window.scrollTo = ({ top }) => {
  window.scrollY = top
  window.dispatchEvent(new window.Event('scroll'))
}
HTMLElement.prototype.getBoundingClientRect = function () {
  const top =
    (this.id === 'blog' ? 2400 : this.id === 'projects' ? 3400 : 0) -
    window.scrollY
  return {
    x: 0,
    y: top,
    top,
    left: 0,
    bottom: top + 400,
    right: 1000,
    width: 1000,
    height: 400,
  }
}
const { act } = await import('react')
const { createElement } = await import('react')
const { createRoot } = await import('react-dom/client')
const { default: App, setLenis } = await import('../tmp/tests/app.mjs')

async function flushFrames() {
  await act(async () => {
    const pending = [...frames.values()]
    frames.clear()
    for (const callback of pending) callback(performance.now())
  })
}
async function click(label, selector = 'a') {
  const element = [...document.querySelectorAll(selector)].find(
    (item) => item.textContent.trim() === label
  )
  assert.ok(element, `Missing control: ${label}`)
  await act(async () =>
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }))
  )
  await flushFrames()
}

test('homepage, index, article and navbar preserve navigation and scroll', async () => {
  const root = createRoot(document.getElementById('root'))
  try {
    await act(async () => root.render(createElement(App)))
    await flushFrames()
    const originalAbout = document.getElementById('about')
    // Terminal buttons, form submission, history, and theme changes remain usable.
    await click('whoami', 'button')
    assert.match(
      document.querySelector('[role=log]').textContent,
      /Siddhesh Todi/
    )
    const commandInput = document.getElementById('terminal-input')
    await act(async () =>
      commandInput.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      )
    )
    assert.equal(commandInput.value, 'whoami')
    const setInputValue = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set
    await act(async () => {
      setInputValue.call(commandInput, 'theme')
      commandInput.dispatchEvent(new window.Event('input', { bubbles: true }))
    })
    const previousTheme = document.documentElement.getAttribute('data-theme')
    await act(async () =>
      document
        .querySelector('.terminal-form')
        .dispatchEvent(
          new window.Event('submit', { bubbles: true, cancelable: true })
        )
    )
    assert.notEqual(
      document.documentElement.getAttribute('data-theme'),
      previousTheme
    )
    await act(async () =>
      commandInput.dispatchEvent(
        new window.KeyboardEvent('keydown', {
          key: 'l',
          ctrlKey: true,
          bubbles: true,
        })
      )
    )
    assert.equal(document.querySelector('[role=log]').textContent, '')
    await click('projects', 'button')
    assert.equal(window.scrollY, 3304)
    const menuToggle = document.querySelector(
      '[aria-controls=workspace-navigation]'
    )
    await act(async () =>
      menuToggle.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    )
    assert.equal(menuToggle.getAttribute('aria-expanded'), 'true')
    await act(async () =>
      window.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'Escape' })
      )
    )
    assert.equal(menuToggle.getAttribute('aria-expanded'), 'false')
    await act(async () => window.scrollTo({ top: 2450 }))
    await click('Read →')
    assert.match(window.location.pathname, /^\/blog\//)
    assert.equal(window.scrollY, 0)
    await act(async () => window.scrollTo({ top: 600 }))
    await act(async () => {
      const changed = new Promise((resolve) =>
        window.addEventListener('popstate', resolve, { once: true })
      )
      window.history.back()
      await changed
    })
    await flushFrames()
    assert.equal(window.location.pathname, '/')
    assert.equal(window.scrollY, 2450)
    await act(async () => {
      const changed = new Promise((resolve) =>
        window.addEventListener('popstate', resolve, { once: true })
      )
      window.history.forward()
      await changed
    })
    await flushFrames()
    assert.equal(window.scrollY, 600)
    // Check that restoration synchronizes an active smooth-scroll engine too.
    const lenisCalls = []
    setLenis({
      resize() {},
      scrollTo(top, options) {
        lenisCalls.push(options)
        window.scrollTo({ top })
      },
    })
    await click('← Back to Portfolio')
    assert.ok(lenisCalls.some((options) => options.immediate && options.force))
    assert.equal(window.location.pathname, '/')
    assert.equal(window.scrollY, 2450)
    const newAbout = document.getElementById('about')
    assert.notEqual(newAbout, originalAbout)
    assert.ok(
      observers.some((observer) => observer.elements.has(newAbout)),
      'navbar observes remounted sections'
    )
    await click('View all posts →')
    assert.equal(window.location.pathname, '/blog')
    assert.equal(window.scrollY, 0)
    assert.ok(!document.body.textContent.includes('View all posts'))
    await act(async () => window.scrollTo({ top: 170 }))
    await click('Read →')
    assert.equal(window.scrollY, 0)
    await click('← Back to Blog')
    assert.equal(window.location.pathname, '/blog')
    assert.equal(window.scrollY, 170)
    await click('← Back to Portfolio')
    assert.equal(window.scrollY, 2450)
    await click('Read →')
    await click('Projects', 'button')
    assert.equal(window.location.pathname, '/')
    assert.equal(window.location.hash, '#projects')
    assert.equal(window.scrollY, 3304)
    // Direct entries carry no origin state and should use predictable fallbacks.
    await act(async () => {
      window.history.pushState(
        { key: 'direct-post' },
        '',
        '/blog/building-an-in-house-code-review-slm-at-deloitte'
      )
      window.dispatchEvent(new window.PopStateEvent('popstate'))
    })
    await flushFrames()
    assert.equal(window.scrollY, 0)
    await click('← Back to Blog')
    assert.equal(window.location.pathname, '/blog')
    await act(async () => {
      window.history.pushState({ key: 'missing-post' }, '', '/blog/missing')
      window.dispatchEvent(new window.PopStateEvent('popstate'))
    })
    await flushFrames()
    assert.ok(document.body.textContent.includes('Post Not Found'))
    await act(async () => {
      window.history.pushState({ key: 'missing-page' }, '', '/missing')
      window.dispatchEvent(new window.PopStateEvent('popstate'))
    })
    await flushFrames()
    assert.ok(document.body.textContent.includes('Page not found'))
  } finally {
    setLenis(null)
    await act(async () => root.unmount())
    dom.window.close()
  }
})
