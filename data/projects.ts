export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  screenshots: string[];
  icon: string;
  stack: string[];
  role: string;
  year: string;
  type: string;
  status: 'live' | 'wip' | 'case-study';
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;
    solution: string;
    features: string[];
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'caresync',
    title: 'CareSync — AI Doctor Appointment',
    tagline: 'AI-assisted clinical triaging and telemedicine appointment scheduling.',
    description: 'An AI-powered healthcare platform orchestrating clinical appointments, Google Gemini symptom triaging, and real-time telemedicine consultations.',
    cover: 'assets/images/caresync-logo.jpg',
    screenshots: [
      'assets/images/caresync-logo.jpg',
      'assets/images/og-preview.png'
    ],
    icon: '🩺',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Gemini AI', 'JWT', 'RBAC'],
    role: 'Full Stack Engineer',
    year: '2026',
    type: 'Healthcare SaaS',
    status: 'live',
    liveUrl: 'https://care-sync-pro-lbel.vercel.app/',
    githubUrl: 'https://github.com/BalajiHariharan30',
    caseStudy: {
      problem: 'Patients faced prolonged triage wait times and friction accessing available physicians for urgent consultations.',
      solution: 'Engineered an automated triage pipeline with Google Gemini AI and WebRTC video consultations backed by high-throughput REST APIs.',
      features: [
        'AI symptom analyzer mapping patient complaints to clinical urgency scores.',
        'Dynamic queue manager prioritizing emergency consultations in real time.',
        'Granular Role-Based Access Control (RBAC) across Patients, Doctors, and Hospital Admins.'
      ],
      results: [
        'Achieved ~400ms average API response time under load testing.',
        'Scored 89/100 on Google Lighthouse with 0.82s Largest Contentful Paint (LCP).',
        'Zero-downtime serverless deployments orchestrated via GitHub Actions CI/CD.'
      ]
    }
  },
  {
    id: 'insightops',
    title: 'InsightOps — AI Inventory & Expense',
    tagline: 'Multi-tenant SaaS tracking organizational stock and anomalies.',
    description: 'A multi-tenant cloud dashboard delivering real-time expense anomaly detection, Gemini natural language database queries, and live inventory sync.',
    cover: 'assets/images/insightops-logo.jpg',
    screenshots: [
      'assets/images/insightops-logo.jpg',
      'assets/images/og-preview.png'
    ],
    icon: '📊',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Redis', 'Socket.io', 'Gemini AI'],
    role: 'Full Stack Engineer',
    year: '2026',
    type: 'B2B Analytics',
    status: 'live',
    liveUrl: 'https://insightops-saas.vercel.app/',
    githubUrl: 'https://github.com/BalajiHariharan30/insightops-saas',
    caseStudy: {
      problem: 'Enterprises struggle to detect fraudulent or anomalous expense reports and maintain synchronized inventory across multiple teams.',
      solution: 'Constructed scoped multi-tenant data pipelines with Z-score anomaly detection algorithms and conversational Gemini database queries.',
      features: [
        'Statistical Z-score calculation to immediately flag anomalous out-of-band expenses.',
        'Gemini natural-language SQL/Mongo query engine generating live dynamic charts.',
        'WebSocket live feeds broadcasting instant inventory updates to connected clients.'
      ],
      results: [
        'Sub-second notification delivery using Redis pub/sub and Socket.io.',
        'Strict organization-level data isolation via scoped Express middleware.',
        'Reduced manual expense audit overhead by approximately 65% in test runs.'
      ]
    }
  },
  {
    id: 'reservex',
    title: 'ReserveX — Ticket Booking Platform',
    tagline: 'Atomic seat locking and high-concurrency event reservations.',
    description: 'A high-concurrency event reservation portal featuring real-time seat locking, atomic double-booking prevention, and analytics dashboards.',
    cover: 'assets/images/reservex-logo.jpg',
    screenshots: [
      'assets/images/reservex-logo.jpg',
      'assets/images/og-preview.png'
    ],
    icon: '🎟️',
    stack: ['React.js', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    role: 'Full Stack Engineer',
    year: '2025',
    type: 'Ticketing Platform',
    status: 'case-study',
    githubUrl: 'https://github.com/BalajiHariharan30',
    caseStudy: {
      problem: 'High-demand concert and event booking systems fail when multiple users attempt to reserve identical seats concurrently.',
      solution: 'Implemented atomic database transactions combined with Socket.io temporary seat locks with TTL expirations.',
      features: [
        'Real-time seat locking with countdown timers to eliminate race conditions.',
        'Three-tier RBAC system protecting User, Manager, and Administrator endpoints.',
        'Interactive seat map with GPS-based event discovery and UPI QR checkout.'
      ],
      results: [
        '100% prevention of double-booking under simulated concurrent checkout spikes.',
        'Optimized Redux Toolkit state stores for snappy interactive seat selection.',
        'Real-time admin metrics powered by Recharts analytical visualizers.'
      ]
    }
  },
  {
    id: 'stockflow',
    title: 'Stockflow — Supply Chain System',
    tagline: 'Warehouse tracking, vendor shipments, and re-order thresholds.',
    description: 'A scalable supply chain engine managing warehouse inventories, vendor dispatch workflows, and automated restock alerts.',
    cover: 'assets/images/inventory-logo.jpg',
    screenshots: [
      'assets/images/inventory-logo.jpg',
      'assets/images/og-preview.png'
    ],
    icon: '📦',
    stack: ['React', 'Vite', 'Redux', 'Node.js', 'MongoDB', 'JWT'],
    role: 'Full Stack Developer',
    year: '2025',
    type: 'Supply Chain SaaS',
    status: 'live',
    liveUrl: 'https://inventory-management-pcw8.vercel.app/',
    githubUrl: 'https://github.com/BalajiHariharan30',
    caseStudy: {
      problem: 'Warehouses experience stockouts or overstock due to disconnected manual tracking sheets and delayed re-order notifications.',
      solution: 'Developed an automated inventory tracking portal with threshold alerts, audit logging, and batch product operations.',
      features: [
        'Automated re-order threshold triggers with email alerts to procurement managers.',
        'Strict server-side validation and JWT authentication for all product transactions.',
        'Clean Ant Design dashboard interface built for rapid barcode/SKU scanning.'
      ],
      results: [
        'Over 99% data consistency maintained across order cycle states.',
        'Fast response times under 200ms across all core inventory CRUD endpoints.',
        'Seamless deployment on Vercel with automated continuous delivery.'
      ]
    }
  },
  {
    id: 'portfolio',
    title: 'Portfolio v2 — Touch-Native Experience',
    tagline: 'Mobile-first, 60fps cinematic portfolio engineered with craft.',
    description: 'A touch-native personal portfolio featuring a stacked card deck, infinite bi-directional marquee, and haptic spring interactions.',
    cover: 'assets/images/og-preview.png',
    screenshots: [
      'assets/images/og-preview.png'
    ],
    icon: '⚡',
    stack: ['HTML5', 'CSS3', 'TypeScript', 'Framer Motion', 'Canvas API'],
    role: 'Creative Engineer',
    year: '2026',
    type: 'Personal Website',
    status: 'live',
    liveUrl: 'https://balaji-portfolio-alpha.vercel.app/',
    githubUrl: 'https://github.com/BalajiHariharan30/balaji-portfolio',
    caseStudy: {
      problem: 'Standard developer portfolios look like static resume templates and feel clunky on mobile devices.',
      solution: 'Engineered a cinematic, mobile-first design system with stacked card decks, momentum drag, and GPU-accelerated motion.',
      features: [
        'Vertical sticky card stacking mimicking a physical card deck.',
        'Dual-row opposing marquee with tap-to-pause and 3D card flipping.',
        'Bottom sheet case studies with velocity-based pull-to-dismiss gesture.'
      ],
      results: [
        'Guaranteed 60fps animations utilizing only GPU transform and opacity.',
        'Strict 100% adherence to mobile-first responsive touch guidelines.',
        'Lighthouse performance score 95+ with zero layout shifts.'
      ]
    }
  }
];
