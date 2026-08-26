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


/* ===================== PRELOADER (Instant load without artificial delay) ===================== */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  function hidePreloader() {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 150);
    });
    setTimeout(hidePreloader, 1000);
  }
})();


/* ===================== CUSTOM CURSOR ===================== */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();


/* ===================== PARTICLES CANVAS (With IntersectionObserver Pausing) ===================== */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let isHeroVisible = true;
  let animationFrameId = null;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate 60 lightweight particles (optimized for battery & frame rates)
  const particleCount = window.innerWidth < 768 ? 30 : 60;
  for (let i = 0; i < particleCount; i++) {
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
    if (!isHeroVisible) return;
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle  = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Connect nearby particles within 100px
      for (let j = i + 1; j < particles.length; j++) {
        const p2   = particles[j];
        const dx   = p.x - p2.x;
        const dy   = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle  = '#63B3ED';
          ctx.globalAlpha  = (1 - dist / 100) * 0.08;
          ctx.lineWidth    = 0.5;
          ctx.stroke();
        }
      }
    });

    animationFrameId = requestAnimationFrame(drawParticles);
  }

  // Observe Hero visibility to freeze loop when scrolled down
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    const observer = new IntersectionObserver(entries => {
      isHeroVisible = entries[0].isIntersecting;
      if (isHeroVisible) {
        if (!animationFrameId) drawParticles();
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(heroEl);
  } else {
    drawParticles();
  }
})();


/* ===================== SMART NAVIGATION HIDE/SHOW ON SCROLL ===================== */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  const threshold = 8;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    nav.classList.toggle('scrolled', currentScrollY > 50);

    // Hide on scroll down, show on scroll up
    if (currentScrollY > 160) {
      if (currentScrollY > lastScrollY + threshold) {
        nav.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - threshold) {
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
})();


/* ===================== HAMBURGER MENU ===================== */
(function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on any mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
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


/* ===================== SKILLS & PROJECTS FILTER ===================== */
(function initFilters() {
  // Skills filter
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      document.querySelectorAll('.skill-card').forEach((card, index) => {
        const match = filter === 'all' || card.classList.contains(filter);
        if (match) {
          card.style.display = '';
          card.style.animationDelay = `${index * 0.03}s`;
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });

  // Projects filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach((card, index) => {
        const tags = card.dataset.tags || '';
        const match = filter === 'all' || tags.includes(filter);
        if (match) {
          card.style.display = '';
          card.style.animationDelay = `${index * 0.04}s`;
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
})();


/* ===================== SCROLL-LINKED TIMELINE PROGRESS ===================== */
(function initTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  let progress = timeline.querySelector('.timeline-progress');
  if (!progress) {
    progress = document.createElement('div');
    progress.className = 'timeline-progress';
    timeline.prepend(progress);
  }

  function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH && rect.bottom > 0) {
      const visible = windowH - rect.top;
      const total = rect.height;
      const pct = Math.min(Math.max((visible / total) * 100, 0), 100);
      progress.style.height = pct + '%';
    }
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  updateTimeline();
})();


/* ===================== ONE-CLICK EMAIL COPY WITH TOAST ===================== */
(function initEmailCopy() {
  const copyBtn = document.getElementById('emailCopyBtn');
  const badge   = document.getElementById('copyBadge');
  if (!copyBtn || !badge) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'balaji.hdev@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      copyBtn.classList.add('copied');
      badge.textContent = 'Copied! ✓';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        badge.textContent = 'Copy';
      }, 2500);
    } catch (err) {
      console.warn('Clipboard write failed, opening mailto:', err);
      window.location.href = 'mailto:' + email;
    }
  });

  copyBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyBtn.click();
    }
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
    btn.innerHTML    = '<svg class="submit-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path></svg> Sending…';
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
    tags: "MERN Stack · Gemini AI · Telemedicine",
    desc: "CareSync is a state-of-the-art healthcare orchestration system designed to streamline patient triaging, doctor availability, appointment scheduling, and remote healthcare consultations. It automates queue management and diagnoses priority routing using Google Gemini AI.",
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
      "<strong>Queue Scheduling:</strong> Dynamic queue calculation which optimizes waiting times based on emergency levels."
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini AI", "JWT", "RBAC", "Vercel"],
    github: "https://github.com/BalajiHariharan30",
    live: "https://care-sync-pro-lbel.vercel.app/"
  },
  inventory: {
    title: "Inventory Management System (Stockflow)",
    date: "Dec 2025 – Feb 2026",
    tags: "MERN Stack · Redux Toolkit · Security",
    desc: "A production-grade supply chain tracking system built to manage warehouse stocks, vendor shipments, customer invoice cycles, and automatic re-ordering thresholds. It features strict audit logging and multi-warehouse visualization tools.",
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
      "<strong>Warehouse Stock Tracking:</strong> Live status and count monitoring of products across multiple geographical locations.",
      "<strong>Role-Based Audits:</strong> Granular RBAC allowing staff to log items while restricting approval controls to supervisors.",
      "<strong>Redux State Sync:</strong> Real-time caching and front-end synchronization using Redux Toolkit to prevent race conditions during updates.",
      "<strong>Dynamic Reporting:</strong> Detailed dashboard charts indicating transaction frequencies, depletion warnings, and supply-chain efficiency."
    ],
    tech: ["React.js", "Vite", "Redux Toolkit", "Ant Design", "Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
    github: "https://github.com/BalajiHariharan30",
    live: "https://inventory-management-pcw8.vercel.app/"
  },
  reservex: {
    title: "ReserveX — Premium Ticket Booking Platform",
    date: "Oct – Dec 2025",
    tags: "MERN Stack · Socket.io · Concurrency",
    desc: "ReserveX is a high-performance ticket booking platform built with the MERN stack. It handles high-concurrency event ticket purchases, preventing double-booking anomalies using custom MongoDB transactions and Socket.io real-time seat status synchronization.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Client View</strong><br>(React + Redux)</div>
        <div class="diag-arrow">WebSocket Sync</div>
        <div class="diag-node"><strong>Booking Gateway</strong><br>(Node + Express)</div>
        <div class="diag-arrow">Atomic Lock</div>
        <div class="diag-node"><strong>Seat Database</strong><br>(MongoDB)</div>
      </div>
    `,
    features: [
      "<strong>Real-Time Seat Locking:</strong> Immediate synchronization of seat reservation status using Socket.io to prevent ticket race conditions.",
      "<strong>Granular Access Controls:</strong> Secure three-tier RBAC for Users, Managers, and Administrators to manage events and user levels.",
      "<strong>GPS & UPI Integrations:</strong> Location-based event suggestions and a simulated UPI dynamic QR code check-out sequence.",
      "<strong>Analytics Dashboards:</strong> Beautiful data rendering showing ticket sale metrics, peak hours, and coupon conversion using Recharts."
    ],
    tech: ["React.js", "Redux", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "RBAC"],
    github: "https://github.com/BalajiHariharan30",
    live: ""
  },
  portfolio: {
    title: "Personal Portfolio v2",
    date: "2026",
    tags: "Vanilla JS · CSS Animations · Performance",
    desc: "A highly optimized and aesthetic personal developer website. It features custom interactive particles, magnetic buttons, smooth scroll-reveal and responsive design. The contact form is fully integrated using AJAX directly to a secure email forwarder.",
    architecture: `
      <div class="diag-flow">
        <div class="diag-node"><strong>Static Site</strong><br>(HTML5 + CSS3 + JS)</div>
        <div class="diag-arrow">AJAX Fetch</div>
        <div class="diag-node"><strong>Secure Handlers</strong><br>(Vite / Vercel Edge)</div>
        <div class="diag-arrow">Web3Forms / API</div>
        <div class="diag-node"><strong>User's Inbox</strong><br>(Email forwarding)</div>
      </div>
    `,
    features: [
      "<strong>Fluid Animations:</strong> Customized canvas particle rendering, magnetic hover effects, and section scroll reveal using Intersection Observer.",
      "<strong>Interactive Chatbot:</strong> Custom AI Assistant integrated securely via Vercel serverless API routing using Gemini 1.5 Flash.",
      "<strong>Light/Dark Mode:</strong> Highly optimized custom theme variable toggles without page flashes.",
      "<strong>Fully Accessible & SEO Ready:</strong> Out-of-the-box support for high-quality Open Graph card previews, keyboard navigation, and semantic markers."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Canvas API", "Intersection Observer", "Web3Forms API", "Vercel API"],
    github: "https://github.com/BalajiHariharan30",
    live: "https://balaji-portfolio-alpha.vercel.app/"
  }
};

(function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const backdrop = document.getElementById('projectModalBackdrop');
  const closeBtn = document.getElementById('projectModalClose');
  const modalBody = document.getElementById('projectModalBody');

  if (!modal || !backdrop || !closeBtn || !modalBody) return;

  // Add click and keyboard listeners to all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    function openCardModal(e) {
      if (e && e.target && e.target.closest('a')) return;

      const titleEl = card.querySelector('.project-name');
      if (!titleEl) return;

      const titleText = titleEl.textContent.toLowerCase();
      let key = '';

      if (titleText.includes('caresync')) key = 'caresync';
      else if (titleText.includes('inventory') || titleText.includes('stockflow')) key = 'inventory';
      else if (titleText.includes('reservex')) key = 'reservex';
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
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
      closeBtn.focus();
    }

    card.addEventListener('click', openCardModal);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(e);
      }
    });
  });

  // Close modal events
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Global Escape key listener for modal closing
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();


/* ===================== #2 — MAGNETIC BUTTONS ===================== */
(function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.28;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      btn.style.transform  = '';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
})();


/* ===================== #4 — SCROLL BLOB HUE SHIFT ===================== */
(function initBlobHueShift() {
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (!blob1 || !blob2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const hue = Math.round(pct * 80);
    blob1.style.filter = `blur(100px) hue-rotate(${hue}deg)`;
    blob2.style.filter = `blur(100px) hue-rotate(${-hue * 0.6}deg)`;
  }, { passive: true });
})();



/* ===================== #6 — PROJECT CARD 3D TILT ===================== */
(function initProjectTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left)  / rect.width  - 0.5;
      const y = (e.clientY - rect.top)   / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, box-shadow 0.3s';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();


/* ===================== #7 — COUNTING STATS ANIMATION ===================== */
(function initCountingStats() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const statEls = document.querySelectorAll('.stat-num');
  if (!statEls.length) return;

  function animateCount(el) {
    const raw      = el.textContent.trim();
    const suffix   = raw.replace(/[\d.]/g, '');
    const target   = parseFloat(raw);
    const isFloat  = raw.includes('.');
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const value    = target * ease;
      el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  statEls.forEach(el => statObserver.observe(el));
})();


/* ===================== #9 — PAGE TRANSITION SWEEP ===================== */
(function initPageSweep() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wipe = document.createElement('div');
  wipe.className = 'page-wipe';
  document.body.appendChild(wipe);

  function doSweep(targetEl, navHeight) {
    wipe.classList.add('sweep-in');
    wipe.addEventListener('animationend', function onIn() {
      wipe.removeEventListener('animationend', onIn);
      window.scrollTo({
        top: targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20,
        behavior: 'instant'
      });
      wipe.classList.remove('sweep-in');
      wipe.classList.add('sweep-out');
      wipe.addEventListener('animationend', function onOut() {
        wipe.classList.remove('sweep-out');
      }, { once: true });
    }, { once: true });
  }

  // Attach to nav and mobile menu anchor links only
  document.querySelectorAll('nav a[href^="#"], .mobile-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const navH = document.getElementById('nav')?.offsetHeight || 0;
      doSweep(target, navH);
    });
  });
})();


/* ===================== #10 — CURSOR SPOTLIGHT GLOW ===================== */
(function initCursorSpotlight() {
  if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;

  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let curX = targetX;
  let curY = targetY;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  (function animateSpotlight() {
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    spotlight.style.left = curX + 'px';
    spotlight.style.top  = curY + 'px';
    requestAnimationFrame(animateSpotlight);
  })();
})();


/* ===================== RESUME INTERACTIVE VIEWER (PDF.JS + PAN & ZOOM) ===================== */
(function initResumeViewer() {
  const canvas = document.getElementById('resumeCanvas');
  const stage = document.getElementById('resumeStage');
  const canvasWrap = document.getElementById('resumeCanvasWrap');
  const loadingEl = document.getElementById('resumeLoading');
  const zoomLevelEl = document.getElementById('resumeZoomLevel');
  const btnZoomIn = document.getElementById('resumeZoomIn');
  const btnZoomOut = document.getElementById('resumeZoomOut');
  const btnFitWidth = document.getElementById('resumeFitWidth');
  const btnReset = document.getElementById('resumeReset');
  const btnFullscreen = document.getElementById('resumeFullscreen');
  const viewerWrapper = document.getElementById('resumeViewerWrapper');

  if (!canvas || !stage) return;

  const pdfUrl = 'assets/resume.pdf';
  let pdfDoc = null;
  let pageNumber = 1;
  let currentScale = 1.0;
  let baseFitScale = 1.0;
  let isRendering = false;
  let renderPending = false;

  // Touch & Mouse Drag state
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let scrollLeftStart = 0;
  let scrollTopStart = 0;

  // Pinch zoom state for touch devices
  let initialPinchDistance = 0;
  let initialPinchScale = 1.0;
  let lastTapTime = 0;

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  function updateZoomLabel() {
    if (zoomLevelEl) {
      const pct = Math.round(currentScale * 100);
      zoomLevelEl.textContent = `${pct}%`;
    }
  }

  function getOptimalScale(page) {
    const stageWidth = stage.clientWidth - (window.innerWidth < 600 ? 16 : 48);
    const viewport = page.getViewport({ scale: 1.0 });
    const fitScale = stageWidth / viewport.width;
    // On desktop, keep default readable around 1.1x to 1.3x; on mobile, fit width perfectly
    return window.innerWidth < 768 ? Math.max(fitScale, 0.4) : Math.min(Math.max(fitScale, 0.8), 1.25);
  }

  async function renderPage() {
    if (!pdfDoc) return;
    if (isRendering) {
      renderPending = true;
      return;
    }
    isRendering = true;

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const dpr = Math.min(window.devicePixelRatio || 2, 3); // High-res retina scale
      
      // Calculate viewport at current scale
      const viewport = page.getViewport({ scale: currentScale * dpr });
      const cssViewport = page.getViewport({ scale: currentScale });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(cssViewport.width)}px`;
      canvas.style.height = `${Math.floor(cssViewport.height)}px`;

      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      if (loadingEl) {
        loadingEl.classList.add('hidden');
      }

      updateZoomLabel();
      stage.classList.toggle('can-drag', currentScale > baseFitScale * 0.95);
    } catch (err) {
      console.warn('PDF.js render error:', err);
    } finally {
      isRendering = false;
      if (renderPending) {
        renderPending = false;
        renderPage();
      }
    }
  }

  function setScale(newScale, centerFocus = true) {
    const clampedScale = Math.min(Math.max(newScale, 0.45), 3.5);
    if (Math.abs(clampedScale - currentScale) < 0.01) return;

    // Keep center position when zooming
    if (centerFocus && stage) {
      const prevWidth = canvas.clientWidth || 1;
      const prevHeight = canvas.clientHeight || 1;
      const ratioX = (stage.scrollLeft + stage.clientWidth / 2) / prevWidth;
      const ratioY = (stage.scrollTop + stage.clientHeight / 2) / prevHeight;

      currentScale = clampedScale;
      renderPage().then(() => {
        const newWidth = canvas.clientWidth;
        const newHeight = canvas.clientHeight;
        stage.scrollLeft = ratioX * newWidth - stage.clientWidth / 2;
        stage.scrollTop = ratioY * newHeight - stage.clientHeight / 2;
      });
    } else {
      currentScale = clampedScale;
      renderPage();
    }
  }

  // Load PDF Document
  async function loadPDF() {
    if (!window.pdfjsLib) {
      // Fallback if CDN blocked
      if (loadingEl) {
        loadingEl.innerHTML = `
          <p style="margin-bottom:12px;color:var(--text-primary)">Interactive viewer preview</p>
          <a href="${pdfUrl}" class="btn-primary" download="Balaji_H_Resume.pdf">Download Resume PDF</a>
        `;
      }
      return;
    }

    try {
      const loadingTask = window.pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });

      pdfDoc = await loadingTask.promise;
      const firstPage = await pdfDoc.getPage(1);
      baseFitScale = getOptimalScale(firstPage);
      currentScale = baseFitScale;
      await renderPage();
    } catch (error) {
      console.error('Failed to load resume PDF:', error);
      if (loadingEl) {
        loadingEl.innerHTML = `
          <p style="margin-bottom:12px;color:var(--text-secondary)">PDF preview ready</p>
          <a href="${pdfUrl}" class="btn-primary" target="_blank" download="Balaji_H_Resume.pdf">Open &amp; Download PDF</a>
        `;
      }
    }
  }

  // Zoom Button Handlers
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => setScale(currentScale * 1.2));
  }
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => setScale(currentScale / 1.2));
  }
  if (btnFitWidth) {
    btnFitWidth.addEventListener('click', async () => {
      if (!pdfDoc) return;
      const page = await pdfDoc.getPage(1);
      const stageWidth = stage.clientWidth - (window.innerWidth < 600 ? 16 : 48);
      const viewport = page.getViewport({ scale: 1.0 });
      setScale(stageWidth / viewport.width, false);
      stage.scrollLeft = (canvas.clientWidth - stage.clientWidth) / 2;
    });
  }
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      setScale(1.0, false);
      stage.scrollLeft = (canvas.clientWidth - stage.clientWidth) / 2;
    });
  }

  // Fullscreen Handler
  if (btnFullscreen && viewerWrapper) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (viewerWrapper.requestFullscreen) {
          viewerWrapper.requestFullscreen().catch(() => {
            viewerWrapper.classList.toggle('is-fullscreen');
          });
        } else {
          viewerWrapper.classList.toggle('is-fullscreen');
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isFull = !!document.fullscreenElement;
      viewerWrapper.classList.toggle('is-fullscreen', isFull);
      if (btnFitWidth) btnFitWidth.click();
    });
  }

  // Desktop Mouse Drag / Pan
  stage.addEventListener('mousedown', e => {
    if (e.button !== 0) return; // Only left click
    isDragging = true;
    stage.classList.add('is-dragging');
    startX = e.pageX - stage.offsetLeft;
    startY = e.pageY - stage.offsetTop;
    scrollLeftStart = stage.scrollLeft;
    scrollTopStart = stage.scrollTop;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - stage.offsetLeft;
    const y = e.pageY - stage.offsetTop;
    const walkX = (x - startX) * 1.2;
    const walkY = (y - startY) * 1.2;
    stage.scrollLeft = scrollLeftStart - walkX;
    stage.scrollTop = scrollTopStart - walkY;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      stage.classList.remove('is-dragging');
    }
  });

  // Desktop Mouse Wheel Zoom (Ctrl + Wheel or Cmd + Wheel)
  stage.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      setScale(currentScale * zoomFactor);
    }
  }, { passive: false });

  // Mobile Touch Gestures: Pan, Pinch-to-Zoom & Double-Tap
  stage.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      // Single finger pan
      const touch = e.touches[0];
      startX = touch.pageX;
      startY = touch.pageY;
      scrollLeftStart = stage.scrollLeft;
      scrollTopStart = stage.scrollTop;

      // Double tap detector
      const now = Date.now();
      if (now - lastTapTime < 300) {
        e.preventDefault();
        if (currentScale > baseFitScale * 1.2) {
          setScale(baseFitScale);
        } else {
          setScale(baseFitScale * 1.6);
        }
      }
      lastTapTime = now;

    } else if (e.touches.length === 2) {
      // Two finger pinch
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialPinchDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
      initialPinchScale = currentScale;
    }
  }, { passive: false });

  stage.addEventListener('touchmove', e => {
    if (e.touches.length === 1) {
      // Pan when zoomed in
      if (currentScale > baseFitScale * 1.05) {
        const touch = e.touches[0];
        const walkX = (touch.pageX - startX);
        const walkY = (touch.pageY - startY);
        stage.scrollLeft = scrollLeftStart - walkX;
        stage.scrollTop = scrollTopStart - walkY;
      }
    } else if (e.touches.length === 2) {
      // Pinch zoom in action
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
      if (initialPinchDistance > 0) {
        const scaleMultiplier = currentDistance / initialPinchDistance;
        const newScale = initialPinchScale * scaleMultiplier;
        setScale(newScale, false);
      }
    }
  }, { passive: false });

  stage.addEventListener('touchend', e => {
    if (e.touches.length < 2) {
      initialPinchDistance = 0;
    }
  });

  // Responsive resize refit
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(async () => {
      if (!pdfDoc) return;
      const page = await pdfDoc.getPage(1);
      const newBase = getOptimalScale(page);
      if (Math.abs(baseFitScale - currentScale) < 0.1) {
        baseFitScale = newBase;
        setScale(newBase, false);
      } else {
        baseFitScale = newBase;
      }
    }, 200);
  });

  // Start PDF load when document is ready
  if (document.readyState === 'complete') {
    loadPDF();
  } else {
    window.addEventListener('load', loadPDF);
  }
})();


