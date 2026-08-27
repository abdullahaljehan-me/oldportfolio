# Portfolio — Abdullah Al Jehan

A personal portfolio site with a calm-editorial / terminal-hybrid aesthetic. Single page,
built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no npm
dependencies.

**Live:** [abdullahaljehan.vercel.app](https://abdullahaljehan.vercel.app)

## Overview

One page (`index.html`), anchor-linked into sections: Home, About, Skills, Education,
Experience, Projects, Research, Blogs, Certifications, Honors, Contact. Theming runs on
an OKLCH custom-property system with a light/dark toggle. No separate about/projects/blog
pages, no live API calls for content — everything ships static in the HTML.

## Features

- Skeleton preloader with animated gear spinner
- Canvas particle background with connecting-line (constellation) effect
- Typewriter animation cycling through hero subtitle lines
- Scroll-reveal on section entry via `IntersectionObserver`
- OKLCH-based light/dark theme toggle, persisted in `localStorage`
- Interactive terminal CLI drawer (`Ctrl+~` or floating button) — `help`, `neofetch`,
  `whoami`, `skills`, `education`, `experience`, `projects`, `blogs`, `contact`, `github`,
  `theme`, `clear`, `date`
- Toast notification system (theme switches, form status, copy-to-clipboard)
- Static project cards with GitHub Open Graph banner images
  (`opengraph.githubassets.com`) — not a live API feed
- Contact form via [formsubmit.co](https://formsubmit.co) — free, no backend required
- `prefers-reduced-motion` support, ARIA labels on icon-only links, `schema.org` Person
  structured data, Open Graph / Twitter Card tags

## Tech Stack

- HTML5, CSS3 (OKLCH custom properties)
- Vanilla JavaScript (no frameworks, no bundler)
- Google Fonts: Inter, JetBrains Mono, Space Grotesk
- [formsubmit.co](https://formsubmit.co) for the contact form
- Hosted on [Vercel](https://vercel.com)

## Structure

```
.
├── index.html
├── script.js
├── style.css
├── README.md
└── assets/
    ├── profile.jpg
    ├── resume.pdf
    ├── blogs/
    ├── certificates/
    ├── honors/
    └── research/
```

## Setup

```bash
git clone https://github.com/abdullahaljehan-me/portfolio.git
cd portfolio
```

Open `index.html` in a browser, or serve it locally. Personal details (GitHub username,
resume, email, photo, project cards) live in `script.js` and `index.html` — no config
file, no API keys, no environment variables.

## Contact

**Abdullah Al Jehan**
<br>Founding Advisor, Kynatium Labs · <br>Dhaka, Bangladesh
<br>Email: abdullahaljehan.me@gmail.com
<br>GitHub: [@abdullahaljehan-me](https://github.com/abdullahaljehan-me)
<br>LinkedIn: [abdullah-al-jehan](https://www.linkedin.com/in/abdullah-al-jehan)
