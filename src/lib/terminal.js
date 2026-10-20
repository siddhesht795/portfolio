import { personal, projects, skills, posts } from '../data/index.js'

export const terminalCommands = [
  'help',
  'whoami',
  'ls',
  'skills',
  'projects',
  'blog',
  'resume',
  'contact',
  'theme',
  'clear',
]

export function runPortfolioCommand(input) {
  const command = input
    .trim()
    .toLowerCase()
    .replace(/^cd\s+/, '')
    .replace(/\/$/, '')
  const sections = ['projects', 'blog', 'resume', 'contact']
  if (command === 'clear') return { clear: true }
  if (command === 'help')
    return {
      output:
        'whoami     A little about me\nls         Explore this portfolio\nskills     My toolkit\nprojects   Browse projects\nblog       Read my writing\nresume     View or download my resume\ncontact    Get in touch\ntheme      Switch light / dark\nclear      Clear this terminal',
    }
  if (command === 'whoami')
    return {
      output: `${personal.name}\nFull stack developer · Applied AI & automation\nMumbai, India\nB.E. Computer Engineering, TSEC · 2027`,
    }
  if (command === 'ls')
    return {
      output:
        'about/  skills/  projects/  experience/  blog/  resume.pdf  contact/',
    }
  if (command === 'skills')
    return {
      output: skills
        .map((group) => `${group.category}: ${group.items.join(', ')}`)
        .join('\n'),
    }
  if (command === 'theme')
    return { output: 'Theme switched.', toggleTheme: true }
  if (sections.includes(command)) {
    const output =
      command === 'projects'
        ? projects
            .map((project) => `${project.title} — ${project.subtitle}`)
            .join('\n')
        : command === 'blog'
          ? posts.map((post) => post.title).join('\n')
          : command === 'contact'
            ? `${personal.email}\n${personal.github}`
            : 'Resume ready. Open the preview or download the PDF below.'
    return { output, section: command }
  }
  if (command === 'about' || command === 'experience')
    return { output: `Opening ${command}.`, section: command }
  return {
    output: `Unknown command: ${input.trim()}. Type help to see available commands.`,
  }
}
