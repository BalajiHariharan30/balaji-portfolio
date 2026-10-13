export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  icon: string;
  proficiency: number; // 0 to 100
  builds: string; // What I build with it
  experience: string;
  projectsUsed: string[]; // Project IDs to jump to
  note: string;
}

export const skills: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    icon: '⚛️',
    proficiency: 95,
    builds: 'Interactive SPAs, state orchestration & component architectures',
    experience: '2+ Years',
    projectsUsed: ['caresync', 'insightops', 'reservex'],
    note: 'Specialized in hooks, Context API, Redux Toolkit, and performance optimizations.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    icon: '🟨',
    proficiency: 92,
    builds: 'Event loops, async pipelines, DOM engines & ESNext algorithms',
    experience: '3+ Years',
    projectsUsed: ['caresync', 'insightops', 'portfolio'],
    note: 'Deep understanding of closures, prototypical inheritance, and asynchronous execution.'
  },
  {
    id: 'redux',
    name: 'Redux Toolkit',
    category: 'frontend',
    icon: '🔄',
    proficiency: 88,
    builds: 'Predictable global state stores, slice reducers & RTK Query',
    experience: '2 Years',
    projectsUsed: ['reservex', 'stockflow'],
    note: 'Simplifies state mutation with Immer, normalization, and middleware integration.'
  },
  {
    id: 'vite',
    name: 'Vite / Tooling',
    category: 'frontend',
    icon: '⚡',
    proficiency: 90,
    builds: 'Lightning-fast HMR bundles & production-ready ES module setups',
    experience: '2 Years',
    projectsUsed: ['caresync', 'stockflow'],
    note: 'Configured roll-up chunking and code splitting for sub-second page loads.'
  },
  {
    id: 'tailwind',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    icon: '🌐',
    proficiency: 94,
    builds: 'Fluid mobile-first layouts, modern CSS variables & animations',
    experience: '3+ Years',
    projectsUsed: ['portfolio', 'caresync'],
    note: 'Crafting responsive glassmorphic interfaces and accessible semantic markup.'
  },

  // Backend
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    icon: '🟢',
    proficiency: 90,
    builds: 'Scalable backend runtimes, microservices & async workers',
    experience: '2+ Years',
    projectsUsed: ['caresync', 'insightops', 'reservex'],
    note: 'Built robust event-driven servers handling high-throughput JSON pipelines.'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    icon: '🚂',
    proficiency: 92,
    builds: 'RESTful API architecture, routing middleware & JWT guards',
    experience: '2+ Years',
    projectsUsed: ['caresync', 'insightops', 'stockflow'],
    note: 'Designed hardened authentication layers, rate-limiting, and error handlers.'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    icon: '🍃',
    proficiency: 88,
    builds: 'NoSQL schemas, aggregation pipelines & indexed query models',
    experience: '2+ Years',
    projectsUsed: ['caresync', 'insightops', 'reservex'],
    note: 'Optimized multi-tenant schemas and document relationships with Mongoose.'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'backend',
    icon: '🔴',
    proficiency: 82,
    builds: 'High-speed caching, TTL session tracking & pub/sub events',
    experience: '1+ Year',
    projectsUsed: ['insightops'],
    note: 'Used for sub-millisecond anomaly detection caching and real-time queues.'
  },
  {
    id: 'socketio',
    name: 'Socket.io',
    category: 'backend',
    icon: '🔌',
    proficiency: 85,
    builds: 'Bi-directional WebSockets, live seat locking & notifications',
    experience: '1.5 Years',
    projectsUsed: ['reservex', 'insightops'],
    note: 'Eliminated concurrency double-booking with atomic real-time locks.'
  },

  // AI & Cloud
  {
    id: 'gemini',
    name: 'Google Gemini API',
    category: 'ai',
    icon: '🤖',
    proficiency: 88,
    builds: 'Multimodal AI triage, natural language DB search & summaries',
    experience: '1+ Year',
    projectsUsed: ['caresync', 'insightops'],
    note: 'Converted plain English questions into safe, structured JSON and SQL queries.'
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI Systems',
    category: 'ai',
    icon: '🧠',
    proficiency: 85,
    builds: 'Autonomous multi-step workflows, prompt pipelines & tooling',
    experience: '1+ Year',
    projectsUsed: ['caresync'],
    note: 'Certified in Oracle Agentic AI Foundations Associate (July 2026).'
  },

  // Tools
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'tools',
    icon: '🐙',
    proficiency: 92,
    builds: 'Branch workflows, pull request reviews & release versioning',
    experience: '3+ Years',
    projectsUsed: ['caresync', 'insightops', 'portfolio'],
    note: 'Follows trunk-based and GitFlow standards with clean atomic commit histories.'
  },
  {
    id: 'actions',
    name: 'GitHub Actions',
    category: 'tools',
    icon: '🔁',
    proficiency: 84,
    builds: 'CI/CD automated test suites & continuous deployment pipelines',
    experience: '1.5 Years',
    projectsUsed: ['caresync'],
    note: 'Configured automated linting, unit testing, and production deployments.'
  },
  {
    id: 'vercel',
    name: 'Vercel Serverless',
    category: 'tools',
    icon: '▲',
    proficiency: 94,
    builds: 'Edge network hosting, instant previews & zero-downtime rollouts',
    experience: '2+ Years',
    projectsUsed: ['caresync', 'insightops', 'portfolio'],
    note: 'Optimized serverless cold-start performance and custom domain routing.'
  },
  {
    id: 'jest',
    name: 'Jest & Vitest',
    category: 'tools',
    icon: '🃏',
    proficiency: 85,
    builds: 'Unit tests, mock services & integration regression suites',
    experience: '1.5 Years',
    projectsUsed: ['caresync'],
    note: 'Ensured full test coverage across REST API routes and React components.'
  }
];
