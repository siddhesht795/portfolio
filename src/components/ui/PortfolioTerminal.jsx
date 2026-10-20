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
  return (
    <div
      id="terminal"
      className="portfolio-terminal"
      aria-label="Interactive portfolio terminal"
    >
      <div className="terminal-title">
        <span>
          <TerminalSquare size={14} aria-hidden="true" />
          siddhesh@portfolio:~
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          aria-label="Focus terminal input"
        >
          Interactive
        </button>
      </div>
      <div className="terminal-content">
        <p className="terminal-welcome">A different way to look around.</p>
        <p className="terminal-hint">
          Type <kbd>help</kbd> to get started. ↑ ↓ for history.
        </p>
        <div
          className="terminal-log"
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          data-lenis-prevent
          tabIndex={0}
          aria-label="Terminal output"
        >
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={index}>
              <p>
                <span className="terminal-prompt" aria-hidden="true">
                  ${' '}
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
          <span className="terminal-prompt" aria-hidden="true">
            $
          </span>
          <label htmlFor="terminal-input" className="sr-only">
            Portfolio command
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={input}
            maxLength={120}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Try whoami"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <button type="submit" aria-label="Run command">
            ↵
          </button>
        </form>
      </div>
      <div className="terminal-suggestions">
        <span>Try</span>
        {['whoami', 'skills', 'projects'].map((command) => (
          <button key={command} type="button" onClick={() => execute(command)}>
            {command}
          </button>
        ))}
      </div>
    </div>
  )
}
