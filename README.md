# Balaji H — Personal Portfolio

A premium, fully responsive personal portfolio website built with **semantic HTML5**, **vanilla CSS3**, and **JavaScript** — no frameworks, pure craft.

---

## 👤 About

**Balaji H** — Full Stack Developer | MERN Stack Engineer | AI Enthusiast  
B.Tech Biotechnology student at Bannari Amman Institute of Technology (Graduating 2026)

📧 h.balaji1964@gmail.com  
🔗 [linkedin.com/in/balaji-h](https://www.linkedin.com/in/balaji-h-a15845267?utm_source=share_via&utm_content=profile&utm_medium=member_ios)  
🐙 [github.com/BalajiHariharan30](https://github.com/BalajiHariharan30)  
📍 Trichy, Tamil Nadu, India

---

## 📁 Project Structure

```
balaji-portfolio/
├── index.html          # Main HTML file (semantic, accessible)
├── README.md           # This file
├── css/
│   └── styles.css      # All styles (variables, layout, animations, responsive)
├── js/
│   └── script.js       # All interactivity (modular IIFEs, no inline code)
└── assets/
    ├── images/         # Project screenshots (add your own)
    └── resume.pdf      # ⚠️ Place your resume here (REQUIRED for Resume button)
```

---

## 🚀 How to Run

### Option A — Open directly (zero setup)
1. Double-click `index.html` to open in your browser.
2. All features work locally except the contact form (requires a backend endpoint).

### Option B — Local dev server (recommended for best experience)
If you have [VS Code](https://code.visualstudio.com/), install the **Live Server** extension:
1. Right-click `index.html` → **Open with Live Server**
2. The portfolio opens at `http://127.0.0.1:5500`

Or use Python's built-in server:
```bash
# Python 3
python -m http.server 5500
```
Then visit `http://localhost:5500`.

---

## ⚙️ Resume Button Setup

The **Resume** button in the navigation links to `assets/resume.pdf`.

To activate it:
1. Rename your resume file to exactly `resume.pdf` (case-sensitive)
2. Place it inside the `assets/` folder
3. That's it — the button will open your resume in a new tab

---

## ✨ Features

| Feature | Details |
|---|---|
| **Particle canvas** | 80 animated particles with connection lines |
| **Typewriter effect** | Cycles through 5 developer roles |
| **3D card tilt** | Hero card and project cards respond to mouse |
| **Scroll reveal** | Fade-in animations triggered by IntersectionObserver |
| **Skills filter** | Filter by Languages / Frontend / Backend / Tools |
| **Project filter** | Filter by Web Apps / AI Powered / Backend |
| **Smooth scroll** | All nav links animate to their target section |
| **Active nav** | Current section highlighted in the navbar |
| **Custom cursor** | Dot + ring cursor with magnetic hover effects |
| **Theme toggle** | Dark / Light mode with CSS variable swap |
| **Mobile menu** | Full-screen overlay navigation on small screens |
| **Progress bar** | Scroll progress indicator at top of page |
| **Responsive** | Fully mobile-friendly from 320px to 4K |

---

## 🛠 Tech Stack

- **HTML5** — Semantic elements, ARIA roles, proper `<label>` usage
- **CSS3** — Custom properties, Grid, Flexbox, keyframe animations, CSS `clamp()`
- **JavaScript** — Vanilla ES6+, IIFEs, IntersectionObserver, Canvas API

---

## 🌐 Deployment

This is a **static site** — deploy anywhere:

| Platform | Command / Steps |
|---|---|
| **GitHub Pages** | Push repo → Settings → Pages → Branch: `main` |
| **Netlify** | Drag & drop the `balaji-portfolio/` folder |
| **Vercel** | `vercel` CLI or connect GitHub repo |

---

## 📝 Customisation Checklist

- [ ] Add `resume.pdf` to `assets/`
- [ ] Update GitHub links in `index.html` (search: `BalajiHariharan30`)
- [ ] Update LinkedIn URL (search: `balaji-h`)
- [ ] Update contact email and phone number
- [ ] Add project screenshots to `assets/images/`
- [ ] Connect the contact form to an email service (e.g. EmailJS, Formspree)

---

## 📄 License

© 2026 Balaji H. All rights reserved.
