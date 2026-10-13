/**
 * js/portfolio-master.js
 * Mobile-First, Touch-Native Portfolio Engine
 * - Top Scroll Progress Bar
 * - Mobile Sticky Glass Bottom Nav with Sliding Active Pill
 * - Projects Stacked Card Deck with Scroll Transformations
 * - Screenshot Swipers (touch-action: pan-y, spring snap, dots)
 * - Draggable Case Study Bottom Sheet (pull-to-dismiss, velocity-based)
 * - Skills Dual-Row Opposing Marquee (rAF delta-time, tap-to-pause, 3D flip, swipe inertia)
 * - Category Tab Filtering
 */
(function initPortfolioMaster() {
  'use strict';

  /* =====================================================================
     1. TOP SCROLL PROGRESS BAR (2px Electric Indigo)
     ===================================================================== */
  const progressBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress() {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* =====================================================================
     2. MOBILE STICKY GLASS BOTTOM NAVIGATION
     ===================================================================== */
  const bottomNav = document.getElementById('mobileBottomNav');
  const navIndicator = document.getElementById('mobNavIndicator');
  const mobNavItems = Array.from(document.querySelectorAll('.mob-nav-item'));
  let lastScrollY = window.scrollY;

  function updateBottomNavVisibility() {
    if (!bottomNav) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 160) {
      bottomNav.classList.add('nav-hidden');
    } else {
      bottomNav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
  }
  window.addEventListener('scroll', updateBottomNavVisibility, { passive: true });

  // Update active nav pill position
  function setActiveNavPill(activeItem) {
    if (!activeItem || !navIndicator) return;
    mobNavItems.forEach((item) => item.classList.remove('active'));
    activeItem.classList.add('active');

    const itemRect = activeItem.getBoundingClientRect();
    const parentRect = activeItem.parentElement.getBoundingClientRect();
    const leftOffset = itemRect.left - parentRect.left;
    navIndicator.style.transform = `translateX(${leftOffset}px)`;
    navIndicator.style.width = `${itemRect.width}px`;
  }

  // Observe sections to update active bottom nav item
  const sectionIds = ['hero', 'projects', 'skills', 'about', 'contact'];
  const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && sectionElements.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const matchingItem = mobNavItems.find(
              (item) => item.getAttribute('data-section') === targetId
            );
            if (matchingItem) {
              setActiveNavPill(matchingItem);
            }
          }
        });
      },
      { threshold: 0.25 }
    );
    sectionElements.forEach((sec) => navObserver.observe(sec));
  }

  // Set initial indicator
  if (mobNavItems.length) {
    setTimeout(() => setActiveNavPill(mobNavItems[0]), 100);
  }

  /* =====================================================================
     3. PROJECTS DATA & STACKED CARD DECK (Scroll Transformations)
     ===================================================================== */
  const projectsData = [
    {
      id: 'caresync',
      title: 'CareSync — AI Doctor Appointment',
      tagline: 'AI-assisted clinical triaging and telemedicine appointment scheduling.',
      description: 'An AI-powered healthcare platform orchestrating clinical appointments, Google Gemini symptom triaging, and real-time telemedicine consultations.',
      cover: 'assets/images/caresync-logo.jpg',
      screenshots: ['assets/images/caresync-logo.jpg', 'assets/images/og-preview.png'],
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
      screenshots: ['assets/images/insightops-logo.jpg', 'assets/images/og-preview.png'],
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
      screenshots: ['assets/images/reservex-logo.jpg', 'assets/images/og-preview.png'],
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
      screenshots: ['assets/images/inventory-logo.jpg', 'assets/images/og-preview.png'],
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
      screenshots: ['assets/images/og-preview.png'],
      icon: '⚡',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'Framer Principles'],
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

  // Dynamic Scroll Stacking Animation for Project Cards
  const deckCards = Array.from(document.querySelectorAll('.deck-card'));
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateDeckCardStacking() {
    if (isReducedMotion || !deckCards.length) return;

    for (let i = 0; i < deckCards.length - 1; i++) {
      const currentCard = deckCards[i];
      const nextCard = deckCards[i + 1];

      const currentRect = currentCard.getBoundingClientRect();
      const nextRect = nextCard.getBoundingClientRect();

      // Check how much the next card overlaps the current card
      const overlap = currentRect.bottom - nextRect.top;
      const cardHeight = currentRect.height;

      if (overlap > 0 && overlap < cardHeight) {
        const progress = Math.min(1, Math.max(0, overlap / cardHeight));
        const scale = 1 - progress * 0.06; // 1 -> 0.94
        const translateY = -progress * 14;  // 0 -> -14px
        const brightness = 1 - progress * 0.45; // 1 -> 0.55
        const blur = progress * 2; // 0 -> 2px

        currentCard.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        currentCard.style.filter = `brightness(${brightness}) blur(${blur}px)`;
      } else if (overlap >= cardHeight) {
        currentCard.style.transform = `translate3d(0, -14px, 0) scale(0.94)`;
        currentCard.style.filter = `brightness(0.55) blur(2px)`;
      } else {
        currentCard.style.transform = `translate3d(0, 0, 0) scale(1)`;
        currentCard.style.filter = `brightness(1) blur(0px)`;
      }
    }
  }

  window.addEventListener('scroll', updateDeckCardStacking, { passive: true });
  updateDeckCardStacking();

  /* =====================================================================
     4. SCREENSHOT SWIPERS (Horizontal Touch Drag + Dots)
     ===================================================================== */
  document.querySelectorAll('.deck-screenshot-swiper').forEach((swiper) => {
    const track = swiper.querySelector('.swiper-track');
    const slides = Array.from(swiper.querySelectorAll('.swiper-slide'));
    const dots = Array.from(swiper.querySelectorAll('.swiper-dot'));
    if (!track || slides.length <= 1) return;

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    swiper.addEventListener('pointerdown', (e) => {
      // Primary button / touch only
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      currentX = e.clientX;
      track.style.transition = 'none';
      swiper.setPointerCapture(e.pointerId);
    });

    swiper.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const diffX = e.clientX - startX;
      if (Math.abs(diffX) > 6) {
        hasMoved = true;
      }
      // Apply slight elastic drag
      const basePercent = -currentIndex * 100;
      const dragPercent = (diffX / swiper.clientWidth) * 100 * 0.7;
      track.style.transform = `translate3d(${basePercent + dragPercent}%, 0, 0)`;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
      try {
        if (swiper.hasPointerCapture(e.pointerId)) {
          swiper.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      const diffX = e.clientX - startX;
      if (diffX < -40 && currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (diffX > 40 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex);
      }
    }

    swiper.addEventListener('pointerup', endDrag);
    swiper.addEventListener('pointercancel', endDrag);

    // Dots click
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Long press peek interaction
    let peekTimer = null;
    swiper.addEventListener('pointerdown', () => {
      peekTimer = setTimeout(() => {
        if (!hasMoved) {
          swiper.classList.add('is-peeking');
        }
      }, 400);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) => {
      swiper.addEventListener(evt, () => {
        clearTimeout(peekTimer);
        swiper.classList.remove('is-peeking');
      });
    });
  });

  /* =====================================================================
     5. DRAGGABLE CASE STUDY BOTTOM SHEET
     ===================================================================== */
  const sheetBackdrop = document.getElementById('caseStudyBackdrop');
  const sheet = document.getElementById('caseStudySheet');
  const sheetContent = document.getElementById('caseStudySheetContent');
  const pullHandle = document.getElementById('sheetPullHandle');

  function openCaseStudy(projectId) {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project || !sheet || !sheetContent) return;

    sheetContent.innerHTML = `
      <div class="sheet-header">
        <div class="sheet-title-row">
          <span class="sheet-icon">${project.icon}</span>
          <div>
            <h3 class="sheet-title">${project.title}</h3>
            <span class="sheet-role-badge">${project.role} · ${project.year} · ${project.type}</span>
          </div>
        </div>
        <button class="sheet-close-btn" id="sheetCloseBtn" aria-label="Close case study">&times;</button>
      </div>

      <p class="sheet-desc">${project.description}</p>

      <div class="sheet-card problem">
        <h4 class="sheet-card-label problem">The Problem</h4>
        <p class="sheet-card-text">${project.caseStudy.problem}</p>
      </div>

      <div class="sheet-card solution">
        <h4 class="sheet-card-label solution">The Engineering Solution</h4>
        <p class="sheet-card-text">${project.caseStudy.solution}</p>
      </div>

      <div class="sheet-section">
        <h4 class="sheet-section-title">Key Architectural Features</h4>
        <ul class="sheet-feature-list">
          ${project.caseStudy.features.map((f) => `<li><span class="bullet">✦</span><span>${f}</span></li>`).join('')}
        </ul>
      </div>

      <div class="sheet-section">
        <h4 class="sheet-section-title results">Measured Results &amp; Reliability</h4>
        <ul class="sheet-feature-list">
          ${project.caseStudy.results.map((r) => `<li><span class="bullet-check">✓</span><span>${r}</span></li>`).join('')}
        </ul>
      </div>

      <div class="sheet-actions">
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck-primary">Live Demo ↗</a>` : ''}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-deck-secondary">GitHub Repository ⌥</a>` : ''}
      </div>
    `;

    // Wire close button
    const closeBtn = document.getElementById('sheetCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);

    // Open sheet
    document.body.style.overflow = 'hidden';
    sheetBackdrop.classList.add('is-open');
    sheet.classList.add('is-open');
    sheet.style.transform = 'translate3d(0, 0, 0)';
  }

  function closeCaseStudy() {
    if (!sheet) return;
    document.body.style.overflow = '';
    sheet.classList.remove('is-open');
    if (sheetBackdrop) sheetBackdrop.classList.remove('is-open');
    sheet.style.transform = 'translate3d(0, 100%, 0)';
  }

  if (sheetBackdrop) {
    sheetBackdrop.addEventListener('click', closeCaseStudy);
  }

  // Keyboard Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet && sheet.classList.contains('is-open')) {
      closeCaseStudy();
    }
  });

  // Pull-down-to-dismiss gesture on bottom sheet
  if (sheet && pullHandle) {
    let sheetStartY = 0;
    let sheetCurrentY = 0;
    let isDraggingSheet = false;
    let startTimestamp = 0;

    pullHandle.addEventListener('pointerdown', (e) => {
      isDraggingSheet = true;
      sheetStartY = e.clientY;
      sheetCurrentY = e.clientY;
      startTimestamp = performance.now();
      sheet.style.transition = 'none';
      pullHandle.setPointerCapture(e.pointerId);
    });

    pullHandle.addEventListener('pointermove', (e) => {
      if (!isDraggingSheet) return;
      sheetCurrentY = e.clientY;
      const deltaY = Math.max(0, sheetCurrentY - sheetStartY);
      sheet.style.transform = `translate3d(0, ${deltaY}px, 0)`;
    });

    function endSheetDrag(e) {
      if (!isDraggingSheet) return;
      isDraggingSheet = false;
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
      try {
        if (pullHandle.hasPointerCapture(e.pointerId)) {
          pullHandle.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      const deltaY = sheetCurrentY - sheetStartY;
      const deltaTime = performance.now() - startTimestamp;
      const velocityY = (deltaY / deltaTime) * 1000;

      if (deltaY > 120 || velocityY > 450) {
        closeCaseStudy();
      } else {
        sheet.style.transform = 'translate3d(0, 0, 0)';
      }
    }

    pullHandle.addEventListener('pointerup', endSheetDrag);
    pullHandle.addEventListener('pointercancel', endSheetDrag);
  }

  // Wire project cards to open case study
  deckCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.deck-screenshot-swiper')) return;
      const projectId = card.getAttribute('data-project-id');
      if (projectId) openCaseStudy(projectId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.getAttribute('data-project-id');
        if (projectId) openCaseStudy(projectId);
      }
    });
  });

  /* =====================================================================
     6. SKILLS DATA & DUAL-ROW OPPOSING MARQUEE (rAF + Tap-to-Pause + 3D Flip)
     ===================================================================== */
  const skillsData = [
    { id: 'react', name: 'React.js', category: 'frontend', icon: '⚛️', prof: 95, builds: 'Interactive SPAs & component architectures', exp: '2+ Years', projs: ['caresync', 'insightops', 'reservex'], note: 'Hooks, Context API, Redux Toolkit, and performance optimizations.' },
    { id: 'javascript', name: 'JavaScript', category: 'frontend', icon: '🟨', prof: 92, builds: 'Event loops, async pipelines & DOM engines', exp: '3+ Years', projs: ['caresync', 'insightops', 'portfolio'], note: 'Deep knowledge of closures, prototypical inheritance & async execution.' },
    { id: 'redux', name: 'Redux Toolkit', category: 'frontend', icon: '🔄', prof: 88, builds: 'Predictable state stores & slice reducers', exp: '2 Years', projs: ['reservex', 'stockflow'], note: 'State mutation with Immer, normalization & middleware.' },
    { id: 'vite', name: 'Vite / Tooling', category: 'frontend', icon: '⚡', prof: 90, builds: 'Lightning HMR bundles & production setups', exp: '2 Years', projs: ['caresync', 'stockflow'], note: 'Configured roll-up chunking for sub-second page loads.' },
    { id: 'htmlcss', name: 'HTML5 & CSS3', category: 'frontend', icon: '🌐', prof: 94, builds: 'Fluid mobile-first layouts & modern CSS variables', exp: '3+ Years', projs: ['portfolio', 'caresync'], note: 'Crafting responsive glassmorphic interfaces & semantic markup.' },
    { id: 'node', name: 'Node.js', category: 'backend', icon: '🟢', prof: 90, builds: 'Scalable backend runtimes & async workers', exp: '2+ Years', projs: ['caresync', 'insightops', 'reservex'], note: 'Event-driven servers handling high-throughput JSON pipelines.' },
    { id: 'express', name: 'Express.js', category: 'backend', icon: '🚂', prof: 92, builds: 'RESTful API architecture & JWT guards', exp: '2+ Years', projs: ['caresync', 'insightops', 'stockflow'], note: 'Hardened authentication layers, rate-limiting & error handlers.' },
    { id: 'mongodb', name: 'MongoDB', category: 'backend', icon: '🍃', prof: 88, builds: 'NoSQL schemas & aggregation pipelines', exp: '2+ Years', projs: ['caresync', 'insightops', 'reservex'], note: 'Multi-tenant schemas and document relationships with Mongoose.' },
    { id: 'redis', name: 'Redis', category: 'backend', icon: '🔴', prof: 82, builds: 'High-speed caching & pub/sub events', exp: '1+ Year', projs: ['insightops'], note: 'Sub-millisecond anomaly detection caching & queues.' },
    { id: 'socketio', name: 'Socket.io', category: 'backend', icon: '🔌', prof: 85, builds: 'Real-time WebSockets & seat locking', exp: '1.5 Years', projs: ['reservex', 'insightops'], note: 'Eliminated concurrency double-booking with atomic real-time locks.' },
    { id: 'gemini', name: 'Google Gemini', category: 'ai', icon: '🤖', prof: 88, builds: 'Multimodal AI triage & natural language DB query', exp: '1+ Year', projs: ['caresync', 'insightops'], note: 'Converted plain English questions into safe, structured JSON/SQL.' },
    { id: 'agentic', name: 'Agentic AI', category: 'ai', icon: '🧠', prof: 85, builds: 'Autonomous workflows & prompt pipelines', exp: '1+ Year', projs: ['caresync'], note: 'Certified in Oracle Agentic AI Foundations Associate (2026).' },
    { id: 'git', name: 'Git / GitHub', category: 'tools', icon: '🐙', prof: 92, builds: 'Branch workflows & release versioning', exp: '3+ Years', projs: ['caresync', 'insightops', 'portfolio'], note: 'Follows trunk-based and GitFlow standards with clean atomic commits.' },
    { id: 'actions', name: 'GitHub Actions', category: 'tools', icon: '🔁', prof: 84, builds: 'CI/CD automated tests & deployments', exp: '1.5 Years', projs: ['caresync'], note: 'Configured automated linting, unit testing, and deployments.' },
    { id: 'vercel', name: 'Vercel Serverless', category: 'tools', icon: '▲', prof: 94, builds: 'Edge hosting & zero-downtime rollouts', exp: '2+ Years', projs: ['caresync', 'insightops', 'portfolio'], note: 'Optimized serverless cold-start performance and routing.' },
    { id: 'jest', name: 'Jest / Vitest', category: 'tools', icon: '🃏', prof: 85, builds: 'Unit tests & integration regression suites', exp: '1.5 Years', projs: ['caresync'], note: 'Full test coverage across REST API routes and React components.' }
  ];

  const track1 = document.getElementById('marqueeTrack1');
  const track2 = document.getElementById('marqueeTrack2');

  function renderSkillCardHtml(skill) {
    return `
      <div class="skill-flip-card" data-category="${skill.category}" data-skill-id="${skill.id}" tabindex="0" role="button" aria-label="${skill.name}. Tap to flip for details.">
        <div class="skill-flip-inner">
          <div class="skill-flip-front">
            <div class="skill-front-top">
              <span class="skill-card-icon">${skill.icon}</span>
              <div class="skill-ring-wrap" title="${skill.prof}% proficiency">
                <svg class="skill-ring-svg" viewBox="0 0 36 36">
                  <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="ring-fill" stroke-dasharray="${skill.prof}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <span class="ring-val">${skill.prof}%</span>
              </div>
            </div>
            <div class="skill-front-mid">
              <h4 class="skill-card-name">${skill.name}</h4>
              <p class="skill-card-builds">${skill.builds}</p>
            </div>
            <div class="skill-front-foot">
              <span>TAP TO FLIP</span>
              <span>↺</span>
            </div>
          </div>

          <div class="skill-flip-back">
            <div class="skill-back-top">
              <span class="skill-back-badge">EXPERIENCE</span>
              <span class="skill-back-yrs">${skill.exp}</span>
            </div>
            <p class="skill-back-note">${skill.note}</p>
            <div class="skill-back-foot">
              <span class="skill-back-label">USED IN:</span>
              <div class="skill-back-tags">
                ${skill.projs.map((pid) => `<span class="skill-proj-tag" data-proj="${pid}">#${pid}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  let activeCategory = 'all';

  function populateSkillsTracks() {
    if (!track1 || !track2) return;

    const filtered = activeCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

    const mid = Math.ceil(filtered.length / 2);
    const row1 = filtered.slice(0, mid);
    const row2 = filtered.slice(mid);

    // Duplicate 2x for seamless wrap
    track1.innerHTML = [...row1, ...row1].map(renderSkillCardHtml).join('');
    track2.innerHTML = [...row2, ...row2].map(renderSkillCardHtml).join('');

    bindSkillCardInteractions();
  }

  // Marquee Engine: requestAnimationFrame with delta-time + Swipe Inertia
  let pos1 = 0;
  let pos2 = 0;
  const speed = 45; // ~45 px/sec
  let lastTime = performance.now();
  let isMarqueePaused = false;
  let marqueeFriction = 0.95;
  let velocity1 = 0;
  let velocity2 = 0;
  let idleTimer = null;

  function resetMarqueeIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      resumeMarquee();
    }, 2500);
  }

  function pauseMarquee() {
    isMarqueePaused = true;
    resetMarqueeIdleTimer();
  }

  function resumeMarquee() {
    isMarqueePaused = false;
    document.querySelectorAll('.skill-flip-card.is-flipped').forEach((c) => {
      c.classList.remove('is-flipped');
    });
  }

  function loopMarquee(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    if (!isReducedMotion && track1 && track2) {
      const halfWidth1 = track1.scrollWidth / 2;
      const halfWidth2 = track2.scrollWidth / 2;

      if (!isMarqueePaused) {
        // Continuous auto-scroll
        pos1 += speed * delta;
        pos2 -= speed * delta;
      } else {
        // Apply inertia decay if dragging released
        pos1 -= velocity1;
        pos2 -= velocity2;
        velocity1 *= marqueeFriction;
        velocity2 *= marqueeFriction;
      }

      // Infinite wrapping
      if (halfWidth1 > 0) {
        if (pos1 >= halfWidth1) pos1 -= halfWidth1;
        if (pos1 < 0) pos1 += halfWidth1;
        track1.style.transform = `translate3d(-${pos1}px, 0, 0)`;
      }

      if (halfWidth2 > 0) {
        if (pos2 <= -halfWidth2) pos2 += halfWidth2;
        if (pos2 > 0) pos2 -= halfWidth2;
        track2.style.transform = `translate3d(${pos2}px, 0, 0)`;
      }
    }

    requestAnimationFrame(loopMarquee);
  }

  requestAnimationFrame(loopMarquee);

  // Bind Pointer Swipe / Drag on Marquee Tracks
  function bindTrackDrag(track, isRow2) {
    if (!track) return;
    let startX = 0;
    let isDragging = false;
    let lastDragX = 0;
    let lastDragTime = 0;

    track.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging = true;
      startX = e.clientX;
      lastDragX = e.clientX;
      lastDragTime = performance.now();
      pauseMarquee();
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastDragX;
      lastDragX = e.clientX;
      lastDragTime = performance.now();

      if (isRow2) {
        pos2 += deltaX;
      } else {
        pos1 -= deltaX;
      }
      resetMarqueeIdleTimer();
    });

    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const deltaMove = e.clientX - startX;
      const deltaTime = performance.now() - lastDragTime;

      if (deltaTime < 100) {
        const vel = (deltaMove / (deltaTime || 1)) * 16;
        if (isRow2) {
          velocity2 = vel;
        } else {
          velocity1 = vel;
        }
      }
      resetMarqueeIdleTimer();
    });
  }

  bindTrackDrag(track1, false);
  bindTrackDrag(track2, true);

  // Card Tap Flip Interaction
  function bindSkillCardInteractions() {
    document.querySelectorAll('.skill-flip-card').forEach((card) => {
      let pointerDownX = 0;
      let pointerDownY = 0;

      card.addEventListener('pointerdown', (e) => {
        pointerDownX = e.clientX;
        pointerDownY = e.clientY;
      });

      card.addEventListener('pointerup', (e) => {
        // Threshold: only trigger flip if pointer moved less than 6px (tap, not drag)
        const moveDist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
        if (moveDist < 6) {
          pauseMarquee();
          const wasFlipped = card.classList.contains('is-flipped');
          document.querySelectorAll('.skill-flip-card.is-flipped').forEach((c) => {
            c.classList.remove('is-flipped');
          });
          if (!wasFlipped) {
            card.classList.add('is-flipped');
          }
          resetMarqueeIdleTimer();
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pauseMarquee();
          card.classList.toggle('is-flipped');
          resetMarqueeIdleTimer();
        }
      });
    });

    // Tap on project tag inside flipped card jumps to that project!
    document.querySelectorAll('.skill-proj-tag').forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        const projId = tag.getAttribute('data-proj');
        if (projId) {
          const targetCard = document.querySelector(`.deck-card[data-project-id="${projId}"]`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => openCaseStudy(projId), 600);
          }
        }
      });
    });
  }

  // Category Tabs Filter
  document.querySelectorAll('.skill-cat-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-cat-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeCategory = tab.getAttribute('data-category') || 'all';
      populateSkillsTracks();
      pauseMarquee();
      resetMarqueeIdleTimer();
    });
  });

  // Desktop Hover Pause
  const stage = document.getElementById('skillsMarqueeStage');
  if (stage) {
    stage.addEventListener('mouseenter', pauseMarquee);
    stage.addEventListener('mouseleave', () => {
      if (!document.querySelector('.skill-flip-card.is-flipped')) {
        resumeMarquee();
      }
    });
  }

  // Tap Outside Resumes Marquee
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skillsMarqueeStage') && !e.target.closest('.skill-cat-tab')) {
      resumeMarquee();
    }
  });

  // Pause when off-screen or tab hidden
  const skillsSec = document.getElementById('skills');
  if ('IntersectionObserver' in window && skillsSec) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            isMarqueePaused = true;
          } else {
            isMarqueePaused = false;
          }
        });
      },
      { threshold: 0.05 }
    );
    skillsObserver.observe(skillsSec);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isMarqueePaused = true;
    } else {
      isMarqueePaused = false;
    }
  });

  // Initial population of skill cards
  populateSkillsTracks();
})();
