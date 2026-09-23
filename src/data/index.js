export const personal = {
  name: 'Siddhesh Todi',
  role: 'Full Stack Developer',
  taglines: [
    'AI + Automation Engineer',
    'Full Stack Developer',
    'Systems Thinker',
    'Graph Neural Network Enthusiast',
    'Builder of Things That Matter',
  ],
  email: 'siddheshtodi@gmail.com',
  phone: '+91 8879985555',
  github: 'https://github.com/siddhesht795',
  linkedin: 'https://linkedin.com/in/siddheshtodi',
  bio: `I'm a Full Stack Developer and AI Engineer who builds at the intersection of intelligent systems and great user experiences. From Graph Neural Networks to CLI tools that actually matter — I care deeply about craft, performance, and impact.`,
  bioExtended: `Currently pursuing BE in Computer Engineering at TSEC Mumbai (CGPA 8.50), I've worked on everything from mutual fund rating systems and GNN-powered stock recommendation engines to cross-platform CLI tools and AI trip planners.`,
}

export const skills = [
  {
    category: 'Frontend',
    icon: '◈',
    color: '#a855f7',
    lightColor: '#c0622f',   // terracotta
    items: ['ReactJS', 'Tailwind CSS', 'SASS', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Backend',
    icon: '◎',
    color: '#06b6d4',
    lightColor: '#0f766e',   // deep teal
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Python'],
  },
  {
    category: 'AI & ML',
    icon: '◆',
    color: '#f59e0b',
    lightColor: '#b45309',   // dark amber
    items: ['PyTorch', 'GNN', 'LangChain', 'Generative AI', 'LLM Applications', 'Gemini API'],
  },
  {
    category: 'Automation',
    icon: '◉',
    color: '#10b981',
    lightColor: '#166534',   // forest green
    items: ['n8n', 'SERP API', 'Data Scraping', 'Pipeline Design'],
  },
  {
    category: 'Databases',
    icon: '▣',
    color: '#ef4444',
    lightColor: '#991b1b',   // dark red
    items: ['MongoDB', 'MySQL', 'SQL', 'NoSQL'],
  },
  {
    category: 'Languages & Tools',
    icon: '◐',
    color: '#8b5cf6',
    lightColor: '#6d28d9',   // deep violet
    items: ['Java', 'Python', 'JavaScript', 'GoLang', 'Git', 'GitHub', 'VS Code'],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Trip Genie',
    subtitle: 'AI-Powered Travel Planner',
    year: '2025',
    tech: ['Python', 'Vanilla JS', 'Gemini API', 'SERP API', 'ReportLab'],
    description:
      'A personalized trip planner that generates day-wise itineraries using AI. Integrates real-time destination insights, weather data, and travel recommendations.',
    highlights: [
      'AI-generated day-wise itineraries via Gemini API',
      'Real-time destination + weather data via SERP API',
      'Offline-ready PDF export with ReportLab',
      'Interactive customization for personalized planning',
    ],
    problem: 'Planning trips is overwhelming — too many tabs, too much noise.',
    solution: 'One prompt. One plan. Fully personalized, exportable as PDF.',
    impact: 'End-to-end trip planning in under 60 seconds.',
    github: 'https://github.com/siddhesht795/TripGenie',
    color: '#a855f7',
    lightColor: '#c0622f',   // terracotta
    number: '01',
  },
  {
    id: 2,
    title: 'Sweepr',
    subtitle: 'Smart CLI Cleanup Tool',
    year: '2025',
    tech: ['Node.js', 'Commander.js', 'Inquirer.js', 'Ora'],
    description:
      'A cross-platform CLI tool that reclaims disk space by detecting and safely removing inactive development environments.',
    highlights: [
      'Smart Inactivity Detection via timestamp analysis',
      'Soft-delete via system trash (recoverable)',
      'Auto-generates requirements.txt for Python recovery',
      'Parallel scanning + lifetime storage tracking',
    ],
    problem: 'node_modules and venv folders silently eat gigabytes of disk space.',
    solution: 'Intelligent CLI that detects inactivity, not just file presence.',
    impact: 'Recovered hundreds of GB across dev machines with zero data loss.',
    github: 'https://github.com/siddhesht795/sweepr',
    color: '#06b6d4',
    lightColor: '#0f766e',   // deep teal
    number: '02',
  },
]

export const experience = [
  {
    id: 1,
    role: 'Summer Intern',
    company: 'Deloitte India',
    period: 'Jun 2025 – Aug 2026',
    type: 'Internship',
    highlights: [
      'Contributed to the Technology & Transformation department by developing an in-house Small Language Model (SLM) for automated Python code review.',
      'Built data preparation pipelines to ingest source files and transform them into structured datasets for fine-tuning, including LLM-based synthetic data generation.',
      'Explored base SLM, Retrieval-Augmented Generation (RAG), and fine-tuning approaches to determine the optimal solution for the code review task.',
      'Applied QLoRA fine-tuning and evaluated the model using synthetically generated test cases to assess code review performance and defect detection.',
    ],
    tags: ['SLM', 'Fine-Tuning', 'LoRA', 'Data Pipelines'],
    color: '#06b6d4',
    lightColor: '#0f766e',   // deep teal
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Choice TechLabs',
    period: 'Dec 2025 – Feb 2026',
    type: 'Internship',
    highlights: [
      'Built Python-based data scraping and rating computation pipelines for a mutual fund rating system (Morningstar + Value Research methodologies)',
      'Prototyped a GNN-powered personalized stock recommendation engine modeling investor behavior, portfolio similarity, and sector preferences',
      'Conducted competitive product analysis for Felix-like platforms, presenting technical insights to guide product decisions',
      'Designed n8n automation workflows integrating spreadsheets and internal tools, reducing manual operational effort significantly',
    ],
    tags: ['GNN', 'Python', 'n8n', 'Data Pipelines', 'PyTorch Geometric'],
    color: '#a855f7',
    lightColor: '#c0622f',   // terracotta
  },
  {
    id: 3,
    role: 'Frontend Developer Intern',
    company: 'Symbo Insurance',
    location: 'Mumbai, India',
    period: 'Jun 2024 – Jul 2024',
    type: 'Internship',
    highlights: [
      'Transitioned from vanilla JavaScript to ReactJS, deepening component-based architecture and state management skills',
      'Built and optimized reusable React components for improved UI efficiency and maintainability',
      'Collaborated across the frontend team on project contribution, task allocation, and cross-functional communication',
    ],
    tags: ['ReactJS', 'JavaScript', 'Component Architecture', 'UI Development'],
    color: '#06b6d4',
    lightColor: '#0f766e',   // deep teal
  },
]

export const achievements = [
  {
    title: 'Top 25 — Deloitte Hacksplosion 2026',
    description: 'Ranked among the Top 25 teams nationwide out of 21,000+ registrations, securing a Summer Internship opportunity at Deloitte.',
    icon: '🚀',
    color: '#10b981',
    lightColor: '#166534',   // forest green
  },
  {
    title: '2nd Runner Up — TSEC Hacks 2026',
    description: 'Competed among teams from multiple colleges, building a functional prototype within 24 hours.',
    icon: '🏆',
    color: '#a855f7',
    lightColor: '#c0622f',   // terracotta
  },
]

export const posts = [
  {
    id: 'post-3',
    title: 'Building an In-House Code Review SLM at Deloitte',
    date: '2026-08-30',
    excerpt: 'Exploring Small Language Models as an affordable and secure alternative to frontier LLMs for enterprise AI, and building a specialized Python code review SLM.',
    slug: 'building-an-in-house-code-review-slm-at-deloitte',
    image: '/blog/deloitte-slm.jpg',
    content: [
      { type: 'heading', text: 'The Problem' },
      { type: 'paragraph', text: 'During my internship at Deloitte, one of the problems we explored was the growing cost of relying on frontier LLMs for enterprise use cases.' },
      { type: 'paragraph', text: 'Models from providers such as OpenAI and Anthropic can provide excellent general-purpose capabilities, but using them at scale can become expensive. There was also an important security consideration: sending sensitive enterprise information such as internal code, business logic, credentials, or API keys to external AI APIs creates additional security concerns.' },
      { type: 'paragraph', text: 'The goal was therefore to explore an affordable in-house AI solution where sensitive data could remain within the organization\'s infrastructure.' },
      { type: 'heading', text: 'The Idea: Specialized Small Language Models' },
      { type: 'paragraph', text: 'We explored Small Language Models (SLMs) as an alternative.' },
      { type: 'paragraph', text: 'Instead of relying on one large general-purpose model for every task, the idea was to build smaller models specialized for individual enterprise workflows.' },
      { type: 'list', items: ['A code review SLM for developers', 'A test-case generation SLM', 'A deployment/code-assistance SLM', 'Models specialized for business or spreadsheet-related workflows'] },
      { type: 'paragraph', text: 'A smaller specialized model can potentially provide better task-specific performance while requiring substantially fewer compute resources than a large general-purpose model.' },
      { type: 'heading', text: 'Our Focus: Python Code Review' },
      { type: 'paragraph', text: 'During the internship, our focus was on building a Python code review SLM.' },
      { type: 'paragraph', text: 'The overall workflow consisted of four major stages:' },
      { type: 'list', items: ['Data Creation', 'Fine-tuning', 'Inference', 'Evaluation'] },
      { type: 'heading', text: '1. Data Creation' },
      { type: 'paragraph', text: 'We created synthetic training and evaluation data covering multiple Python code-review scenarios.' },
      { type: 'paragraph', text: 'The goal was to provide the model with examples of the types of issues and reasoning expected from a code review system.' },
      { type: 'heading', text: '2. Fine-tuning' },
      { type: 'paragraph', text: 'We fine-tuned a Qwen model on the generated dataset so that it could specialize in the code-review task rather than behaving purely as a general-purpose language model.' },
      { type: 'paragraph', text: 'Do not invent exact hyperparameters, dataset sizes, hardware specifications, or performance numbers that are not provided.' },
      { type: 'heading', text: '3. Inference' },
      { type: 'paragraph', text: 'After fine-tuning, we ran inference using the resulting model to evaluate how it performed on Python code-review tasks.' },
      { type: 'heading', text: '4. Evaluation' },
      { type: 'paragraph', text: 'We evaluated the fine-tuned model using an evaluation dataset and compared its behavior with the base model.' },
      { type: 'paragraph', text: 'The result was a fine-tuned SLM that performed better than the base SLM on the specific code-review tasks we targeted.' },
      { type: 'heading', text: 'Why SLMs?' },
      { type: 'paragraph', text: 'The broader idea was not that an SLM is universally better than a frontier LLM.' },
      { type: 'paragraph', text: 'Instead, the important observation was that enterprise applications often involve specific, well-defined tasks.' },
      { type: 'paragraph', text: 'If a task can be narrowly defined, a smaller specialized model may provide a more practical balance between:' },
      { type: 'list', items: ['Cost', 'Performance', 'Data privacy', 'Infrastructure requirements', 'Task specialization'] },
      { type: 'heading', text: 'What I Learned' },
      { type: 'paragraph', text: 'This project gave me practical exposure to the complete lifecycle of adapting a language model to a specialized task:' },
      { type: 'list', items: ['Data', 'Fine-tuning', 'Inference', 'Evaluation'] },
      { type: 'paragraph', text: 'It also taught me that model size is not the only factor that determines usefulness. For a constrained enterprise task, the quality and relevance of the training data and specialization of the model can be just as important.' },
      { type: 'callout', title: 'Important confidentiality constraint', text: 'This is a public portfolio.', items: ['Deloitte confidential information', 'Internal source code', 'Internal architecture', 'Credentials or API keys', 'Proprietary datasets', 'Internal infrastructure details', 'Confidential performance numbers', 'Any information that could expose Deloitte\'s internal systems'] },
      { type: 'heading', text: 'Design requirements' },
      { type: 'paragraph', text: 'The blog-post page should be clean and professional, use the existing Tailwind classes and design system where possible, and maintain readable line length with strong typography.' },
      { type: 'paragraph', text: 'I kept the layout responsive, mobile-friendly, and consistent with the existing portfolio aesthetic while avoiding unnecessary dependencies.' },
    ],
  },
]
