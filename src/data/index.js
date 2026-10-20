const cgpa = '8.61'

export const personal = {
  name: 'Siddhesh Todi',
  cgpa,
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
  bioExtended: `Currently pursuing BE in Computer Engineering at TSEC Mumbai (CGPA ${cgpa}), I've worked on everything from mutual fund rating systems and GNN-powered stock recommendation engines to cross-platform CLI tools and AI trip planners.`,
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
    period: 'Jun 2026 – Aug 2026',
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
    title: 'Top 28 — Deloitte Hacksplosion 2026',
    description: 'Ranked among the Top 28 teams nationwide out of 21,000+ registrations, securing a Summer Internship opportunity at Deloitte.',
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
    "id": "post-3",
    "title": "Building a Code Review SLM at Deloitte: Data, Fine-Tuning, and RAG",
    "date": "2026-08-30",
    "excerpt": "Lessons from a Python code-review SLM project and my internship study reports on RAG, fine-tuning data, and the configuration choices behind specialized language models.",
    "slug": "building-an-in-house-code-review-slm-at-deloitte",
    "content": [
      {
        "type": "paragraph",
        "text": "During my internship at Deloitte, I worked on an in-house Small Language Model (SLM) for Python code review. The work involved preparing data, adapting a pretrained model, running inference, and evaluating its responses. Alongside the project, I studied the decisions that shape an enterprise language-model system: what to put in training data, when to retrieve information, and which configuration choices affect model behavior."
      },
      {
        "type": "paragraph",
        "text": "At the end of the internship, I documented those studies in three reports covering RAG versus fine-tuning for finance applications, SLM hyperparameters, and the data requirements of training from scratch versus fine-tuning. Those reports helped me connect the implementation work to the broader design of specialized AI systems."
      },
      {
        "type": "heading",
        "text": "Why start with a pretrained model?"
      },
      {
        "type": "paragraph",
        "text": "The starting question was how to adapt language-model capabilities to a focused enterprise task while considering compute cost and control over data. A pretrained model offers a starting point for specialization, while an in-house setup gives the organization control over where its data is processed."
      },
      {
        "type": "paragraph",
        "text": "In my data-requirements report, I compared foundation-model training with supervised fine-tuning. Training from scratch starts from randomly initialized weights and learns from large text corpora through a language-modeling objective such as next-token prediction. Supervised fine-tuning starts with pretrained weights and uses examples of the behavior expected for a particular task."
      },
      {
        "type": "paragraph",
        "text": "For Python code review, that distinction matters: the adaptation data needs to demonstrate useful reviews of code. Dataset size and compute needs depend on the model, task, and quality of the examples. For a focused task, I learned to think about what the examples demonstrate and how well they cover the intended inputs."
      },
      {
        "type": "heading",
        "text": "Preparing examples that teach the task"
      },
      {
        "type": "paragraph",
        "text": "In the code-review project, I worked on data preparation and synthetic data generation for training and evaluation. The aim was to provide examples of the issues a review should identify and the kind of explanation a developer could use."
      },
      {
        "type": "paragraph",
        "text": "My study report compared several ways to represent fine-tuning examples:"
      },
      {
        "type": "list",
        "items": [
          "Chat messages: user and assistant turns that demonstrate a conversation.",
          "Instruction, input, and output records: a task description paired with its expected response.",
          "Prompt and completion pairs: an input followed by the response to learn.",
          "Question and answer pairs: a direct question with a target answer.",
          "Context, question, and answer records: supporting material paired with a question and an answer grounded in that material.",
          "Worked examples with explanations: examples that include an explanation alongside the final answer."
        ]
      },
      {
        "type": "paragraph",
        "text": "These formats describe different ways to organize examples. The chosen structure still needs to match the base model’s tokenizer, chat template, and training pipeline. For code review, the important content is the code being reviewed and the expected review response."
      },
      {
        "type": "heading",
        "text": "Fine-tuning and evaluating the code-review model"
      },
      {
        "type": "paragraph",
        "text": "The implementation work involved fine-tuning a Qwen model on the prepared dataset, applying QLoRA, and running inference on code-review inputs. I then compared the adapted model’s responses with the base model using evaluation examples."
      },
      {
        "type": "paragraph",
        "text": "That workflow gave me experience with the full sequence of data creation, fine-tuning, inference, and evaluation. Comparing responses was also a reminder that producing a plausible review and correctly identifying a defect are different things. Useful evaluation needs to examine the substance of the review, including incorrect findings and missed issues."
      },
      {
        "type": "heading",
        "text": "When the answer depends on documents"
      },
      {
        "type": "paragraph",
        "text": "My RAG report explored a different enterprise setting: finance questions that depend on documents such as reports, policies, and operating procedures. This was a study of possible system designs, extending the questions I had encountered in the code-review work."
      },
      {
        "type": "paragraph",
        "text": "Retrieval-Augmented Generation (RAG) supplies relevant external information to a model at answer time. In the reference architecture I studied, documents are split into chunks, represented with embeddings, and indexed for search. A query retrieves relevant passages, which are passed to a Qwen model as context for its response."
      },
      {
        "type": "paragraph",
        "text": "The report considered vector search and a hybrid approach combining vector and keyword search. The proposed flow was:"
      },
      {
        "type": "list",
        "items": [
          "Prepare documents and split them into searchable chunks.",
          "Index the chunks for retrieval.",
          "Search for passages relevant to the user’s question.",
          "Provide those passages to the model with the question.",
          "Return an answer with references to the supporting sources."
        ]
      },
      {
        "type": "paragraph",
        "text": "This approach is useful to consider when answers depend on changing reports or policies, or when readers need to inspect supporting sources. Updating the indexed documents can make new information available without a model-weight update. Retrieval quality and the model’s use of the retrieved context still need evaluation; adding a retrieval step does not guarantee a correct or fully supported answer."
      },
      {
        "type": "heading",
        "text": "Choosing RAG, fine-tuning, or a combination"
      },
      {
        "type": "paragraph",
        "text": "The distinction I took from the report was between adapting behavior and supplying information. Fine-tuning can help a model follow a task, use a desired response format, or handle recurring classification patterns. Retrieval can supply document-specific information that needs to stay current and traceable."
      },
      {
        "type": "paragraph",
        "text": "In my finance study, I proposed a combined design: retrieve relevant passages using hybrid search, then provide them to a fine-tuned Qwen model to generate a structured answer with source references. Evaluating that design would involve checking both retrieval relevance and whether the generated answer is supported by the supplied passages."
      },
      {
        "type": "paragraph",
        "text": "The same design questions are relevant to code review. Examples can teach a review style, while retrieval could provide changing coding guidelines or project documentation. I see that as a useful direction for further exploration."
      },
      {
        "type": "heading",
        "text": "Understanding the configuration choices"
      },
      {
        "type": "paragraph",
        "text": "My hyperparameter report organized the model’s configuration into architecture, training, regularization, input processing, and generation. Separating these categories helped me understand which decisions belong to model selection and which belong to an adaptation or inference pipeline."
      },
      {
        "type": "list",
        "items": [
          "Architecture: layer count, hidden size, attention heads, feed-forward dimensions, vocabulary, and context capacity describe the base model. In a typical fine-tuning workflow, these are largely inherited from the selected checkpoint.",
          "Training: learning rate, batch size, epochs or steps, optimizer, weight decay, gradient clipping, and the learning-rate schedule affect how updates are made and how much training costs.",
          "Generalization: dropout, label smoothing, and early stopping are techniques to study when considering overfitting and validation behavior; their suitability depends on the training setup.",
          "Input processing: tokenization, maximum input length, padding, and truncation determine how examples reach the model. Truncation deserves particular attention when a long code sample may lose important context.",
          "Generation: temperature, top-k, top-p, output limits, and repetition penalties influence response sampling and length. These controls affect output behavior but do not establish factual correctness."
        ]
      },
      {
        "type": "paragraph",
        "text": "Studying these controls reinforced the need to evaluate configuration changes against the intended task. A larger model, longer context, or more training changes the tradeoffs; the effect on useful code-review behavior still needs to be measured."
      },
      {
        "type": "heading",
        "text": "What I took away"
      },
      {
        "type": "paragraph",
        "text": "The internship connected practical model adaptation with system-design questions. The code-review work gave me experience preparing data, fine-tuning, running inference, and comparing responses. The study reports helped me reason about the role of retrieval, the structure of training examples, and the controls available at each stage."
      },
      {
        "type": "paragraph",
        "text": "My main takeaway was to start with the task: define the behavior expected from the model, identify the information it needs, and decide how to evaluate the result. That makes the choice of data format, fine-tuning approach, retrieval design, and inference settings much more concrete."
      }
    ]
  }
]
