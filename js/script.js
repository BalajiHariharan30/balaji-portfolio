/**
 * script.js — Balaji H Portfolio
 * Author: Balaji H
 * Description: All interactive behaviour for the portfolio site
 */

'use strict';

/* ===================== SCROLL PROGRESS BAR ===================== */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });
})();


/* ===================== PRELOADER ===================== */
(function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.classList.add('hidden');
    }, 2000);
  });
})();


/* ===================== CUSTOM CURSOR ===================== */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();


/* ===================== PARTICLES CANVAS ===================== */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate 80 random particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      (Math.random() - 0.5) * 0.3,
      r:       Math.random() * 1.5 + 0.5,
      color:   Math.random() > 0.5 ? '#63B3ED' : '#B794F4',
      opacity: Math.random() * 0.4 + 0.1
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      // Wrap edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle  = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Connect nearby particles
      particles.slice(i + 1).forEach(p2 => {
        const dx   = p.x - p2.x;
        const dy   = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle  = '#63B3ED';
          ctx.globalAlpha  = (1 - dist / 120) * 0.08;
          ctx.lineWidth    = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();


/* ===================== NAVIGATION SCROLL EFFECT ===================== */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();


/* ===================== HAMBURGER MENU ===================== */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close menu on any mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
})();


/* ===================== TYPEWRITER EFFECT ===================== */
(function initTypewriter() {
  const typeEl = document.getElementById('typewriter');
  if (!typeEl) return;

  const roles = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'API Architect',
    'AI Enthusiast',
    'Technical Mentor'
  ];

  let roleIdx    = 0;
  let charIdx    = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    typeEl.textContent = isDeleting
      ? current.slice(0, charIdx--)
      : current.slice(0, charIdx++);

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx > current.length) {
      isDeleting = true;
      delay      = 1800;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      roleIdx    = (roleIdx + 1) % roles.length;
      charIdx    = 0;
      delay      = 400;
    }
    setTimeout(type, delay);
  }
  type();
})();


/* ===================== HERO CARD 3D TILT ===================== */
(function initHeroTilt() {
  const heroCard = document.getElementById('heroCard');
  if (!heroCard) return;

  heroCard.addEventListener('mousemove', e => {
    const rect = heroCard.getBoundingClientRect();
    const x    = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)   / rect.height - 0.5;
    heroCard.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
  });
})();


/* ===================== SCROLL REVEAL ===================== */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
})();


/* ===================== SKILLS FILTER ===================== */
(function initSkillsFilter() {
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      document.querySelectorAll('.skill-card').forEach(card => {
        const match = filter === 'all' || card.classList.contains(filter);
        if (match) {
          card.style.display = '';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
})();


/* ===================== PROJECTS FILTER ===================== */
(function initProjectsFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const tags = card.dataset.tags || '';
        const match = filter === 'all' || tags.includes(filter);
        if (match) {
          card.style.display = '';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
})();


/* ===================== PROJECT CARD 3D TILT ===================== */
(function initProjectTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ===================== MAGNETIC BUTTONS ===================== */
(function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x    = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const y    = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ===================== CONTACT FORM ===================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Browser validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn        = form.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.textContent  = 'Sending…';
    btn.disabled     = true;

    const accessKeyInput = form.querySelector('input[name="access_key"]');
    const accessKey = accessKeyInput ? accessKeyInput.value : '';

    // Fallback simulation mode if the placeholder key is not replaced yet
    if (!accessKey || accessKey.includes('YOUR_WEB3FORMS_ACCESS_KEY')) {
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled  = false;

        const successEl = document.getElementById('formSuccess');
        if (successEl) {
          successEl.innerHTML = '✅ Message simulation success! <br><span style="font-size: 11px; opacity: 0.8;">Setup a Web3Forms access key in index.html to receive actual emails.</span>';
          successEl.classList.add('show');
          form.reset();
          setTimeout(() => successEl.classList.remove('show'), 6000);
        }
      }, 1500);
      return;
    }

    // Real send via Web3Forms AJAX
    const formData = new FormData(form);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      const json = await response.json();
      if (response.status === 200) {
        const successEl = document.getElementById('formSuccess');
        if (successEl) {
          successEl.textContent = "✅ Message sent! I'll get back to you soon.";
          successEl.classList.add('show');
          form.reset();
          setTimeout(() => successEl.classList.remove('show'), 5000);
        }
      } else {
        alert(json.message || "Failed to send message. Please try again.");
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert("Submission error. Please check your network connection.");
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled  = false;
    });
  });
})();


/* ===================== THEME TOGGLE ===================== */
(function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  let isDark = true;
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    themeBtn.textContent = isDark ? '🌙' : '☀️';
  });
})();


/* ===================== SMOOTH SCROLL (all internal anchors) ===================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 0;
      window.scrollTo({
        top:      el.getBoundingClientRect().top + window.scrollY - navH - 20,
        behavior: 'smooth'
      });
    });
  });
})();


/* ===================== ACTIVE NAV HIGHLIGHT ===================== */
(function initActiveNav() {
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = (a.getAttribute('href') === '#' + current) ? 'var(--cyan)' : '';
    });
  }, { passive: true });
})();



/* ===================== PROJECT DETAILS DATA & MODAL LOGIC ===================== */
const projectDetails = {
  caresync: {
    title: "CareSync — AI Doctor Appointment System",
    date: "Feb – Apr 2026",
    tags: "MERN Stack · Gemini AI · Telemedicine · GitHub Actions",
    desc: "CareSync is a state-of-the-art healthcare orchestration system designed to streamline patient triaging, doctor availability, appointment scheduling, and remote healthcare consultations. Designed optimized REST APIs reducing response time by 30%, integrated Google Gemini API cutting frontend load time by 40% using code splitting and lazy loading, and configured GitHub Actions CI/CD pipeline.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Client Dashboard</strong><br>(React + Vite)</div>
        <div class="diag-arrow">API Requests</div>
        <div class="diag-node"><strong>Express Router</strong><br>(Node Backend)</div>
        <div class="diag-arrow">Auth Verification</div>
        <div class="diag-node"><strong>Data Storage</strong><br>(MongoDB Cluster)</div>
      </div>
      <div class="diag-flow" style="justify-content: center; margin-top: 20px;">
        <div class="diag-node" style="border-color: var(--violet);"><strong>AI Triage System</strong><br>(Google Gemini API)</div>
      </div>
    `,
    features: [
      "<strong>AI-Powered Triage:</strong> Seamlessly analyzes patient symptom inputs to assign clinical urgency categories.",
      "<strong>Secure Authentication:</strong> Role-based access control (RBAC) separated for Patients, Doctors, and Administrators using JSON Web Tokens (JWT).",
      "<strong>Real-time Telemedicine:</strong> Integrated video and text chat interfaces for remote clinical appointments.",
      "<strong>Performance Optimization:</strong> Code splitting and lazy loading reduced frontend load time by 40%, API design cut response times by 30%.",
      "<strong>Automated CI/CD:</strong> GitHub Actions pipeline for build verification and continuous deployment to Vercel."
    ],
    tech: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "RBAC", "GitHub Actions", "Vercel"],
    github: "https://github.com/BalajiHariharan30",
    live: "https://care-sync-pro-lbel.vercel.app/"
  },
  inventory: {
    title: "Inventory Management System (Stockflow)",
    date: "Dec 2025 – Feb 2026",
    tags: "MERN Stack · Redux Toolkit · Ant Design · Performance",
    desc: "A production-grade supply chain tracking system built to manage product tracking and order management workflows. Reduced frontend load time by 20% using code splitting and lazy loading, with RESTful backend services using Express and MongoDB secured by JWT and RBAC.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Admin Dashboard</strong><br>(React + Ant Design)</div>
        <div class="diag-arrow">Redux Actions</div>
        <div class="diag-node"><strong>Inventory API</strong><br>(Node + Express)</div>
        <div class="diag-arrow">Transaction Validation</div>
        <div class="diag-node"><strong>DB Stores</strong><br>(MongoDB)</div>
      </div>
    `,
    features: [
      "<strong>Dynamic Product Tracking:</strong> Live status and count monitoring of products across order management cycles.",
      "<strong>Role-Based Audits:</strong> Granular RBAC allowing staff to log items while restricting approval controls to supervisors.",
      "<strong>Redux State Sync:</strong> Real-time caching and front-end synchronization using Redux Toolkit to prevent race conditions during updates.",
      "<strong>Performance Tuning:</strong> Strategic lazy loading cut frontend load times by 20%."
    ],
    tech: ["React.js", "Vite", "Redux Toolkit", "Ant Design", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/BalajiHariharan30",
    live: "https://inventory-management-pcw8.vercel.app/"
  },
  od_approval: {
    title: "OD Approval System",
    date: "Oct – Dec 2025",
    tags: "MERN Stack · Multi-Party Workflows · JWT/RBAC",
    desc: "A full-stack clearance portal designed to streamline On-Duty approval workflows for students, mentors, and parents. Features role-based approval routing, reducing manual processing time and administrative overhead.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Portal Interfaces</strong><br>(Student / Mentor / Parent)</div>
        <div class="diag-arrow">Clearance Request</div>
        <div class="diag-node"><strong>Approval Workflow API</strong><br>(Express + Node)</div>
        <div class="diag-arrow">State Updates</div>
        <div class="diag-node"><strong>Data Store</strong><br>(MongoDB)</div>
      </div>
    `,
    features: [
      "<strong>Multi-Party Approval:</strong> Multi-tiered approval workflow linking student requests directly to mentor review and parent notifications.",
      "<strong>Role-Based Access Control:</strong> Secure role demarcation (Student, Mentor, Parent) backed by JWT auth.",
      "<strong>Real-time Status Tracking:</strong> Live status indicators and transparent progress tracking across clearance stages.",
      "<strong>Efficiency Gain:</strong> Significantly reduced paperwork and administrative processing time."
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/BalajiHariharan30"
  },
  portfolio: {
    title: "Personal Portfolio v2",
    date: "2026",
    tags: "Vanilla JS · CSS Animations · Performance",
    desc: "A highly optimized personal developer portfolio site built with semantic HTML5, custom CSS animations, interactive particle canvas, light/dark themes, and modal components.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Static Site</strong><br>(HTML5 + CSS3 + JS)</div>
        <div class="diag-arrow">AJAX Fetch</div>
        <div class="diag-node"><strong>Web3Forms Handler</strong><br>(Email forwarding)</div>
        <div class="diag-arrow">Inbox Notification</div>
        <div class="diag-node"><strong>Balaji's Inbox</strong><br>(h.balaji1964@gmail.com)</div>
      </div>
    `,
    features: [
      "<strong>Fluid Animations:</strong> Custom canvas particle system, magnetic hover effects, and smooth scroll reveal using Intersection Observer.",
      "<strong>Interactive Modals:</strong> Dynamic project walkthrough modals with architecture diagrams and technical feature breakdowns.",
      "<strong>Light/Dark Theme:</strong> Instant theme toggle without color flashes.",
      "<strong>Fully Accessible & SEO Ready:</strong> Semantic HTML5 structure, custom Open Graph cards, and full keyboard navigation support."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Canvas API", "Intersection Observer", "Web3Forms API"],
    github: "https://github.com/BalajiHariharan30"
  }
};

(function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const backdrop = document.getElementById('projectModalBackdrop');
  const closeBtn = document.getElementById('projectModalClose');
  const modalBody = document.getElementById('projectModalBody');

  if (!modal || !backdrop || !closeBtn || !modalBody) return;

  // Add click listeners to all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      // Prevent opening modal if user clicked GitHub/Live demo links inside the card
      if (e.target.closest('a')) return;

      const titleEl = card.querySelector('.project-name');
      if (!titleEl) return;

      const titleText = titleEl.textContent.toLowerCase();
      let key = '';

      if (titleText.includes('caresync')) key = 'caresync';
      else if (titleText.includes('inventory') || titleText.includes('stockflow')) key = 'inventory';
      else if (titleText.includes('od approval') || titleText.includes('on-duty')) key = 'od_approval';
      else if (titleText.includes('portfolio') || titleText.includes('website')) key = 'portfolio';

      const proj = projectDetails[key];
      if (!proj) return;

      // Inject dynamic content into modal body
      modalBody.innerHTML = `
        <h2 class="modal-project-title">${proj.title}</h2>
        <div class="modal-project-meta">
          <span>📅 ${proj.date}</span>
          <span>•</span>
          <span>🏷️ ${proj.tags}</span>
        </div>
        <p class="modal-project-desc">${proj.desc}</p>
        
        <h3 class="modal-section-title">Key Features</h3>
        <ul style="margin-left: 20px; margin-bottom: 32px; display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary);">
          ${proj.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title">System Architecture Flow</h3>
        <div class="architecture-diagram">
          ${proj.architecture}
        </div>

        <h3 class="modal-section-title">Technologies Used</h3>
        <div class="modal-tech-list">
          ${proj.tech.map(t => `<span class="tech-tag" style="margin-bottom: 8px;">${t}</span>`).join('')}
        </div>

        <div class="modal-links">
          ${proj.github ? `
            <a href="${proj.github}" class="btn-primary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          ` : ''}
          ${proj.live ? `
            <a href="${proj.live}" class="btn-secondary" target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </a>
          ` : ''}
        </div>
      `;

      // Open modal
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    });
  });

  // Close modal events
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
})();
