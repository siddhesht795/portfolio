import { useEffect, useRef, useState } from 'react'
import { TerminalSquare } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { getLenis, scrollToSection } from '../../lib/scroll'
import { runPortfolioCommand, terminalCommands } from '../../lib/terminal'

export default function PortfolioTerminal() {
  const { toggle } = useTheme()
  const [input, setInput] = useState('')
  const [pendingSection, setPendingSection] = useState(null)
  const [entries, setEntries] = useState([])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(0)
  const inputRef = useRef(null)
  const logRef = useRef(null)
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [entries])

  useEffect(() => {
    if (!pendingSection) return
    getLenis()?.resize()
    scrollToSection(pendingSection)
    setPendingSection(null)
  }, [pendingSection, entries])

  useEffect(() => {
    if (window.location.hash === '#terminal')
      inputRef.current?.focus({ preventScroll: true })
  }, [])

  const execute = (value) => {
    const command = value.trim()
    if (!command) return
    const result = runPortfolioCommand(command)
    const nextHistory = [...history, command].slice(-40)
    setHistory(nextHistory)
    setHistoryIndex(nextHistory.length)
    setInput('')
    if (result.clear) setEntries([])
    else
      setEntries((previous) =>
        [...previous, { command, output: result.output }].slice(-30)
      )
    if (result.toggleTheme) toggle()
    if (result.section) setPendingSection(result.section)
  }
  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      const index = Math.max(
        0,
        Math.min(
          history.length,
          historyIndex + (event.key === 'ArrowUp' ? -1 : 1)
        )
      )
      setHistoryIndex(index)
      setInput(history[index] || '')
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      setEntries([])
    } else if (event.key === 'Tab' && input.trim()) {
      const matches = terminalCommands.filter((command) =>
        command.startsWith(input.trim().toLowerCase())
      )
      if (matches.length === 1) {
        event.preventDefault()
        setInput(matches[0])
      }
    }
  }
  const moveHint = (event) => {
    const terminal = event.currentTarget
    if (event.pointerType !== 'mouse' || event.buttons !== 0) {
      delete terminal.dataset.pointerInside
      return
    }
    const bounds = terminal.getBoundingClientRect()
    // Keep the hint inside the shell, including near the viewport edges.
    const x = Math.max(8, Math.min(event.clientX - bounds.left + 16, bounds.width - 90))
    const y = Math.max(8, Math.min(event.clientY - bounds.top + 18, bounds.height - 40))
    terminal.style.setProperty('--hint-x', `${x}px`)
    terminal.style.setProperty('--hint-y', `${y}px`)
    terminal.dataset.pointerInside = 'true'
  }
  return (
    <div
      id="terminal"
      className="portfolio-terminal"
      role="region"
      aria-label="Interactive portfolio terminal"
      onPointerMove={moveHint}
      onPointerLeave={(event) => {
        delete event.currentTarget.dataset.pointerInside
      }}
      onPointerDown={(event) => {
        delete event.currentTarget.dataset.pointerInside
      }}
      onClick={(event) => {
        if (event.target.closest('input, button, a')) return
        if (window.getSelection()?.toString()) return
        inputRef.current?.focus({ preventScroll: true })
      }}
    >
      <div className="terminal-title">
        <span>
          <TerminalSquare size={14} aria-hidden="true" />
          siddhesh@portfolio: ~
        </span>
        <span className="terminal-interaction-hint" aria-hidden="true">
          <span className="terminal-mouse-hint">click to type</span>
          <span className="terminal-touch-hint">tap to type</span>
        </span>
      </div>
      <div className="terminal-content">
        <p className="terminal-welcome">Welcome to my portfolio.</p>
        <p id="terminal-instructions" className="terminal-hint">
          Type <code>help</code> to explore. Press Enter to run.
        </p>
        <div
          className="terminal-log"
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          data-lenis-prevent
          tabIndex={entries.length ? 0 : -1}
          aria-label="Terminal output"
        >
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={index}>
              <p>
                <span className="terminal-prompt" aria-hidden="true">
                  ~ ${' '}
                </span>
                {entry.command}
              </p>
              <pre>{entry.output}</pre>
            </div>
          ))}
        </div>
        <form
          className="terminal-form"
          onSubmit={(event) => {
            event.preventDefault()
            execute(input)
          }}
        >
          <span className="terminal-prompt" aria-hidden="true">~ $</span>
          <label htmlFor="terminal-input" className="sr-only">
            Type a portfolio command
          </label>
          <div className="terminal-input-line">
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              maxLength={120}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder=" "
              aria-describedby="terminal-instructions terminal-keyboard-hint"
              autoComplete="off"
              autoCapitalize="none"
              enterKeyHint="go"
              spellCheck={false}
            />
            <span className="terminal-idle-caret" aria-hidden="true" />
          </div>
        </form>
      </div>
      <p id="terminal-keyboard-hint" className="terminal-keyboard-hint">
        <span>↑ ↓ history</span>
        <span>Tab complete</span>
        <span>Ctrl+L clear</span>
      </p>
      <span className="terminal-cursor-hint" aria-hidden="true">Try me!</span>
    </div>
  )
}
