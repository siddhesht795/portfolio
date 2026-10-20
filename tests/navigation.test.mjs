import test from 'node:test'
import assert from 'node:assert/strict'
import { getReturnDestination, getScrollTarget } from '../src/lib/navigation.js'

const home = { pathname: '/', search: '', hash: '#blog', scrollY: 2450 }

test('article return preserves the homepage section and exact position', () => {
  assert.deepEqual(getReturnDestination(home), {
    to: '/#blog', state: { from: undefined, restoreScroll: 2450 },
  })
})

test('returning via the blog index preserves its own return to the portfolio', () => {
  const index = { pathname: '/blog', scrollY: 180, state: { from: home } }
  const returned = getReturnDestination(index)
  assert.equal(returned.to, '/blog')
  assert.equal(returned.state.restoreScroll, 180)
  assert.deepEqual(getReturnDestination(returned.state.from), getReturnDestination(home))
})

test('direct posts have a safe fallback; invalid origins cannot become external links', () => {
  assert.deepEqual(getReturnDestination(undefined), { to: '/blog' })
  assert.deepEqual(getReturnDestination({ pathname: 'https://example.com' }), { to: '/blog' })
  assert.deepEqual(getReturnDestination(undefined, '/#blog'), { to: '/#blog' })
})

test('browser Back and Forward use each history entry position', () => {
  const positions = new Map([['home', 2450], ['post', 820]])
  assert.equal(getScrollTarget({ key: 'home' }, 'POP', positions), 2450)
  assert.equal(getScrollTarget({ key: 'post' }, 'POP', positions), 820)
})

test('new routes start at top; explicit returns and section links take precedence', () => {
  const positions = new Map()
  assert.equal(getScrollTarget({ key: 'new' }, 'PUSH', positions), 0)
  assert.equal(getScrollTarget({ state: { restoreScroll: 2450 }, hash: '#blog' }, 'PUSH', positions), 2450)
  assert.equal(getScrollTarget({ hash: '#projects' }, 'PUSH', positions), 'projects')
  assert.equal(getScrollTarget({ hash: '#%E0%A4%A' }, 'PUSH', positions), '')
})

test('directory-style blog URLs preserve their origin on static hosting', () => {
  const returned = getReturnDestination({ pathname: '/blog/', scrollY: 170 })
  assert.equal(returned.to, '/blog/')
  assert.equal(returned.state.restoreScroll, 170)
})
