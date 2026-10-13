/**
 * js/slider-marquee.js
 * Enhancements:
 *  - PART A: Skills Marquee (IntersectionObserver viewport pause)
 *  - PART B: Projects Slider (Scroll-snap sync, 01/05 counter, pagination dots,
 *            prev/next arrows, active-card emphasis, pointer drag-to-scroll,
 *            keyboard arrow navigation, 3D tilt, and optional auto-play)
 */
(function initSliderAndMarqueeEnhancements() {
  'use strict';

  /* =====================================================================
     PART A: SKILLS MARQUEE (Off-Screen Pause via IntersectionObserver)
     ===================================================================== */
  const skillsSection = document.getElementById('skills');
  const marqueeTracks = document.querySelectorAll('.skills-marquee-container .marquee-track');

  if (skillsSection && marqueeTracks.length && 'IntersectionObserver' in window) {
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        marqueeTracks.forEach((track) => {
          if (entry.isIntersecting) {
            track.classList.remove('is-paused');
          } else {
            track.classList.add('is-paused');
          }
        });
      });
    }, { threshold: 0.05 });

    marqueeObserver.observe(skillsSection);
  }

  /* =====================================================================
     PART B: PROJECTS SLIDER UPGRADE
     ===================================================================== */
  const slider = document.getElementById('projectsSlider');
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll('.project-card'));
  if (!cards.length) return;

  const counterCurrentEl = document.querySelector('.projects-counter-current');
  const counterTotalEl = document.querySelector('.projects-counter-total');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('projectsSliderDots');

  let activeIndex = 0;
  let autoplayTimer = null;
  let hasUserInteracted = false;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper: Get list of currently displayed cards (handles filter tabs)
  function getVisibleCards() {
    return cards.filter((card) => card.style.display !== 'none');
  }

  // 1. Build pagination dots dynamically based on visible cards
  function rebuildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const visibleCards = getVisibleCards();

    // Update total counter
    if (counterTotalEl) {
      counterTotalEl.textContent = String(visibleCards.length).padStart(2, '0');
    }

    visibleCards.forEach((card, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot' + (idx === activeIndex ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
      dot.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false');

      dot.addEventListener('click', () => {
        stopAutoplay();
        scrollToCardIndex(idx);
      });

      dotsContainer.appendChild(dot);
    });
  }

  // 2. Scroll smoothly to card by index
  function scrollToCardIndex(index) {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;
    const clampedIndex = Math.max(0, Math.min(index, visibleCards.length - 1));
    const targetCard = visibleCards[clampedIndex];
    if (!targetCard) return;

    targetCard.scrollIntoView({
      behavior: isReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  // 3. Update UI states (active card, counter, dots, prev/next buttons)
  function setActiveCardIndex(newIndex) {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;

    activeIndex = Math.max(0, Math.min(newIndex, visibleCards.length - 1));

    // Update counter (padStart 2)
    if (counterCurrentEl) {
      counterCurrentEl.textContent = String(activeIndex + 1).padStart(2, '0');
    }

    // Active-card emphasis: scale(1.03) vs scale(0.96)
    cards.forEach((card) => card.classList.remove('is-active-card'));
    const currentCard = visibleCards[activeIndex];
    if (currentCard) {
      currentCard.classList.add('is-active-card');
    }

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        const isActive = idx === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    // Update prev/next button states
    if (prevBtn) {
      prevBtn.disabled = activeIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = activeIndex >= visibleCards.length - 1;
    }
  }

  // 4. IntersectionObserver: Detect centered card with root = slider & threshold = 0.6
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleCards = getVisibleCards();
          const index = visibleCards.indexOf(entry.target);
          if (index !== -1) {
            setActiveCardIndex(index);
          }
        }
      });
    }, {
      root: slider,
      threshold: 0.6
    });

    cards.forEach((card) => cardObserver.observe(card));
  } else {
    // Fallback scroll listener if IntersectionObserver is not available
    slider.addEventListener('scroll', () => {
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
      const visibleCards = getVisibleCards();
      let closestIdx = 0;
      let minDiff = Infinity;

      visibleCards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(sliderCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      setActiveCardIndex(closestIdx);
    }, { passive: true });
  }

  // 5. Desktop Prev / Next arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoplay();
      scrollToCardIndex(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoplay();
      scrollToCardIndex(activeIndex + 1);
    });
  }

  // 6. Keyboard navigation: left/right arrow keys when slider is focused
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoplay();
      scrollToCardIndex(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoplay();
      scrollToCardIndex(activeIndex + 1);
    }
  });

  // 7. Desktop Drag-to-scroll via pointer events (mouse only)
  let isPointerDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasDragged = false;

  slider.addEventListener('pointerdown', (e) => {
    // Only drag with primary mouse button
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    isPointerDown = true;
    hasDragged = false;
    startX = e.pageX;
    scrollLeftStart = slider.scrollLeft;

    slider.classList.add('is-dragging');
    slider.classList.add('no-snap');
    slider.setPointerCapture(e.pointerId);
  });

  slider.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const distance = e.pageX - startX;
    if (Math.abs(distance) > 5) {
      hasDragged = true;
      stopAutoplay();
    }
    slider.scrollLeft = scrollLeftStart - distance;
  });

  function endPointerDrag(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
    slider.classList.remove('is-dragging');
    slider.classList.remove('no-snap');

    try {
      if (slider.hasPointerCapture(e.pointerId)) {
        slider.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    // Snap to the closest card after releasing
    setTimeout(() => {
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
      const visibleCards = getVisibleCards();
      let closestIdx = activeIndex;
      let minDiff = Infinity;

      visibleCards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(sliderCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      scrollToCardIndex(closestIdx);
    }, 20);
  }

  slider.addEventListener('pointerup', endPointerDrag);
  slider.addEventListener('pointercancel', endPointerDrag);

  // Prevent link/modal clicks if user was actively dragging
  slider.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // 8. Desktop 3D Tilt on card hover (max 6deg, perspective 900px)
  const isFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFineHover && !isReducedMotion) {
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (isPointerDown) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 6).toFixed(2);
        const rotateY = (x * 6).toFixed(2);
        const scaleVal = card.classList.contains('is-active-card') ? '1.03' : '0.96';

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleVal})`;
      });

      card.addEventListener('mouseleave', () => {
        const scaleVal = card.classList.contains('is-active-card') ? '1.03' : '0.96';
        card.style.transform = `scale(${scaleVal})`;
      });
    });
  }

  // 9. Slow autoplay every 4s that stops permanently on the first user interaction
  function stopAutoplay() {
    if (hasUserInteracted) return;
    hasUserInteracted = true;
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    if (isReducedMotion || hasUserInteracted) return;
    autoplayTimer = setInterval(() => {
      if (hasUserInteracted) {
        clearInterval(autoplayTimer);
        return;
      }
      const visibleCards = getVisibleCards();
      if (!visibleCards.length) return;
      const nextIdx = (activeIndex + 1) % visibleCards.length;
      scrollToCardIndex(nextIdx);
    }, 4000);
  }

  // User interactions stop autoplay permanently
  ['touchstart', 'pointerdown', 'wheel', 'keydown'].forEach((evt) => {
    slider.addEventListener(evt, stopAutoplay, { passive: true, once: true });
  });

  // Re-sync slider when filter buttons change visible cards
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      stopAutoplay();
      setTimeout(() => {
        rebuildDots();
        scrollToCardIndex(0);
        setActiveCardIndex(0);
      }, 50);
    });
  });

  // Initial setup
  rebuildDots();
  setActiveCardIndex(0);
  startAutoplay();
})();
