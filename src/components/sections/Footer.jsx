import { Code2, ArrowUp } from 'lucide-react'
import { scrollToSection } from '../../lib/scroll'

export default function Footer() {
  return (
    <footer className="workspace-footer">
      <span>
        <Code2 size={14} aria-hidden="true" />
        Siddhesh Todi © {new Date().getFullYear()}
      </span>
      <button type="button" onClick={() => scrollToSection('top')}>
        Back to top
        <ArrowUp size={13} />
      </button>
    </footer>
  )
}
