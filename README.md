# Balaji H — Mobile-First, Touch-Native Portfolio

A cinematic, mobile-first personal portfolio engineered for **60fps touch interactions**, **gesture-native physics**, and **premium product aesthetics**.

Live Site: [balaji-portfolio-alpha.vercel.app](https://balaji-portfolio-alpha.vercel.app/)  
GitHub: [BalajiHariharan30/balaji-portfolio](https://github.com/BalajiHariharan30/balaji-portfolio)

---

## 📱 Mobile-First Architecture & Design System

The portfolio is architected primarily for handheld touchscreens (390–430px viewport width) while gracefully scaling to tablets and ultra-wide desktops.

### Design Tokens
- `--bg: #050507` (Cinematic deep onyx background)
- `--surface: rgba(255, 255, 255, 0.04)` (Frosted dark glass panels)
- `--border: rgba(255, 255, 255, 0.08)` (Subtle crisp luminance border)
- `--text: #F5F5F7` (High-contrast clean typography)
- `--muted: rgba(245, 245, 247, 0.6)` (Secondary descriptive metadata)
- `--accent: #5B5BFF` (Electric indigo primary accent)
- `--accent-glow: #8B7CFF` (Secondary soft ambient aura)
- Radius: `28px` for cards, `999px` for pills/chips/bottom nav.

---

## ⚡ Core Interactive Features

### 1. Vertical Stacked Card Deck (`#projectDeck`)
- **Sticky Scroll Dynamics**: Cards stack as you scroll down. Overlapping cards smoothly scale down from `1.0` to `0.94`, translate up by `-14px`, dim to `0.55` brightness, and gain a subtle `2px` blur.
- **Aspect Ratio**: `3 / 4.4` portrait orientation optimized for thumb reach.
- **Horizontal Screenshot Swiper**: Multi-slide preview inside each card supporting spring drag with `touch-action: pan-y` (prevents vertical page lock).
- **Draggable Case Study Bottom Sheet**: Tapping a card opens a modal bottom sheet with problem breakdown, engineering solution, architectural features, and measured metrics. Supports velocity-based pull-down-to-dismiss gesture (`sheetPullHandle`).

### 2. Dual-Row Opposing Skills Marquee (`#skillsMarqueeStage`)
- **Delta-Time Motion Engine**: Powered by `requestAnimationFrame` with delta-time calculation running at a constant ~45px/s.
- **Opposing Motion**: Row 1 scrolls right-to-left; Row 2 scrolls left-to-right.
- **Touch-Native Inertia**: Supports horizontal swipe fling with exponential friction (`0.95`).
- **3D Card Flip**: Tap any skill card to flip it 180° in 3D space, revealing years of experience, project tags, and engineering notes. Automatically pauses marquee while flipped.
- **Category Filter Tabs**: Swipeable pill tabs (`All Stack`, `Frontend`, `Backend`, `AI & Cloud`, `Tools & CI/CD`) filter both marquee tracks dynamically.
- **Project Jump**: Tapping a project tag (e.g. `#caresync`) inside a flipped card smoothly scrolls directly to the card in the deck and opens the case study.

### 3. Mobile Glass Bottom Navigation (`#mobileBottomNav`)
- **Floating Island**: Glassmorphic pill docked at the bottom with Home, Work, Skills, About, Contact.
- **Animated Indicator**: Active pill indicator smoothly slides to active section based on scroll position (`IntersectionObserver`).
- **Auto-Hide on Scroll Down**: Disappears when scrolling down past 160px and reappears immediately upon scrolling up.

### 4. Global Hardware Acceleration & Accessibility
- Animations strictly target `transform` and `opacity` to preserve 60fps on mobile GPUs.
- All interactive elements adhere to minimum `44×44px` touch targets.
- Full `prefers-reduced-motion` fallbacks to disable parallax transforms and continuous marquee autoscroll.

---

## 📁 Repository Structure

```
balaji-portfolio/
├── index.html                  # Semantic, accessible HTML5 structure
├── css/
│   └── styles.css              # Design tokens, stacked deck, 3D flip, glass nav
├── js/
│   ├── script.js               # Global utilities, preloader, particle canvas
│   └── portfolio-master.js     # Touch-native deck, marquee, bottom sheet engine
├── data/
│   ├── projects.ts             # Typed project records & case studies
│   └── skills.ts               # Typed skills records, proficiencies & notes
├── components/
│   ├── ProjectDeck.tsx         # Framer Motion stacked card deck component
│   ├── ProjectCard.tsx         # Single card anatomy with swiper & actions
│   ├── ScreenshotSwiper.tsx    # Drag-to-swipe image carousel with spring physics
│   ├── CaseStudySheet.tsx      # Draggable bottom sheet with pull-to-dismiss
│   ├── SkillsMarquee.tsx       # Dual-row opposing marquee with swipe inertia
│   ├── SkillCard.tsx           # 3D flippable card with SVG proficiency ring
│   ├── CategoryTabs.tsx        # Swipeable category filter pills
│   └── BottomNav.tsx           # Mobile sticky glass navigation with sliding pill
└── assets/
    ├── images/                 # Project covers and logos
    └── resume.pdf              # Verified downloadable resume
```

---

## 🛠 Configuration Guide

### 1. How to Add a Project
1. Open `data/projects.ts` (for React/TypeScript builds) and add a new `Project` object:
```ts
{
  id: 'my-project',
  title: 'Project Title',
  tagline: 'Short punchy tagline',
  description: 'Detailed description...',
  cover: 'assets/images/my-project.jpg',
  screenshots: ['assets/images/my-project.jpg'],
  icon: '🚀',
  stack: ['React', 'Node.js'],
  role: 'Full Stack Engineer',
  year: '2026',
  type: 'Web Application',
  status: 'live',
  liveUrl: 'https://...',
  githubUrl: 'https://...',
  caseStudy: {
    problem: '...',
    solution: '...',
    features: ['...'],
    results: ['...']
  }
}
```
2. Mirror the object in `projectsData` in `js/portfolio-master.js` and add the `<article class="deck-card" data-project-id="my-project">` card inside `#projectDeck` in `index.html`.

### 2. How to Change the Accent Color
In `css/styles.css`, update the root design tokens:
```css
:root {
  --accent: #5B5BFF;        /* Change to your desired brand color */
  --accent-glow: #8B7CFF;   /* Change glow companion */
}
```

### 3. How to Tune Marquee Speed
In `js/portfolio-master.js`, adjust the `speed` variable (in pixels/second):
```js
const speed = 45; // Default is 45 px/sec. Increase for faster movement.
```

### 4. How to Adjust Card Deck Stacking Offset
In `index.html` (or `ProjectCard.tsx`), update the inline `style="top: ...px"` value:
```html
<!-- Default offset uses 72px base + (index * 14px) -->
<article class="deck-card" style="top: 86px;" ...> <!-- Card 1 -->
<article class="deck-card" style="top: 100px;" ...> <!-- Card 2 -->
<article class="deck-card" style="top: 114px;" ...> <!-- Card 3 -->
```

---

## 🧪 Device Test Checklist

Use this checklist to verify mobile and responsive fidelity:

- [ ] **iPhone 14 / 15 Pro Max (Safari / iOS)**
  - [ ] Bottom glass navigation floats above home indicator without overlapping.
  - [ ] Swiping screenshot swipers does not hitch vertical page scrolling (`touch-action: pan-y`).
  - [ ] Pull-down drag on Case Study sheet dismisses cleanly at velocity > 0.5 or drag > 120px.
  - [ ] Tapping a skill card flips 180° with smooth perspective and pause.
- [ ] **Google Pixel 7 / Samsung Galaxy S23 (Chrome / Android)**
  - [ ] 60fps card stacking when scrolling down `#projects`.
  - [ ] Marquee swipe inertia maintains smooth deceleration with friction 0.95.
  - [ ] Progress bar at the top updates continuously without layout thrashing.
- [ ] **iPad / Tablet (768px – 1024px)**
  - [ ] Mobile bottom nav hides gracefully, navbar takes over.
  - [ ] Card deck centers with balanced margins (`max-width: 480px`).
- [ ] **Desktop (1440px+)**
  - [ ] Hovering over the skills marquee pauses the scrolling animation.
  - [ ] Keyboard navigation (`Tab`, `Enter`, `Space`) flips cards and opens case studies.
  - [ ] Pressing `Escape` closes the Case Study bottom sheet.

---

## 📄 License

© 2026 Balaji H. All rights reserved.
