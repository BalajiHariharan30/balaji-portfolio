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
        card.style.display = (filter === 'all' || card.classList.contains(filter)) ? '' : 'none';
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
        card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
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
    const btn        = form.querySelector('.form-submit');
    btn.textContent  = 'Sending…';
    btn.disabled     = true;

    // Simulate send (replace with real endpoint integration)
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled    = false;

      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.classList.add('show');
        form.reset();
        setTimeout(() => successEl.classList.remove('show'), 4000);
      }
    }, 1500);
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
