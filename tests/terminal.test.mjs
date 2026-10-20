import test from 'node:test'
import assert from 'node:assert/strict'
import { runPortfolioCommand } from '../src/lib/terminal.js'

test('terminal displays portfolio content and supports command aliases', () => {
  assert.match(runPortfolioCommand('whoami').output, /Siddhesh Todi/)
  assert.match(runPortfolioCommand('skills').output, /FastAPI/)
  assert.match(runPortfolioCommand('help').output, /clear/)
  assert.equal(runPortfolioCommand(' CD Projects/ ').section, 'projects')
  assert.match(runPortfolioCommand('blog').output, /SLM/)
})

test('terminal handles theme, clearing, and unsupported commands', () => {
  assert.deepEqual(runPortfolioCommand('clear'), { clear: true })
  assert.equal(runPortfolioCommand('theme').toggleTheme, true)
  const unknown = runPortfolioCommand('rm -rf /')
  assert.match(unknown.output, /Unknown command/)
  assert.equal(unknown.section, undefined)
})
