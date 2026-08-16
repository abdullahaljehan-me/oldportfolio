# Abdullah Al Jehan — Portfolio

Source for [abdullahaljehan-me.github.io](https://abdullahaljehan-me.github.io/abdullahaljehan-me/), a personal portfolio site. Plain HTML, CSS, and JavaScript — no frameworks, no build step, no npm packages.

## Overview

Multi-page site (Home, About, Projects, Blog, Contact) with a terminal/HUD visual theme. Pulls repository data from the GitHub REST API, renders an animated particle canvas background, and handles contact form submissions through Web3Forms.

## Features

- Terminal-style boot animation on first visit, skipped on return via `sessionStorage`
- Particle canvas background with mouse interaction
- GitHub repository feed via the GitHub REST API, cached client-side
- Custom cursor with hover states on interactive elements
- Contact form via Web3Forms — client-side validation, honeypot spam check, `mailto:` fallback
- Optional Tawk.to live chat widget (inactive unless configured)
- Semantic HTML, `schema.org` structured data, Open Graph tags, `prefers-reduced-motion` support

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, `clip-path` |
| Scripting | Vanilla JavaScript (ES2022) |
| Fonts | Google Fonts — Orbitron, Space Mono, Rajdhani |
| Contact form | Web3Forms |
| Hosting | GitHub Pages |
| Live chat (optional) | Tawk.to |

## Project Structure

```
.
├── index.html
├── about.html
├── projects.html
├── blog.html
├── contact.html
├── 404.html
├── main.js
├── style.css
├── assets/
└── .gitignore
```

## Setup

Requires a modern browser and Git. No Node.js, no build tools.

**1. Clone**
```bash
git clone https://github.com/abdullahaljehan-me/portfolio.git
cd portfolio
```

**2. Configure** — edit the `CONFIG` object at the top of `main.js`:
```js
const CONFIG = {
  GITHUB_API: 'https://api.github.com/users/YOUR_GITHUB_USERNAME/repos',
  GITHUB_USER: 'YOUR_GITHUB_USERNAME',
  CACHE_DURATION: 5 * 60 * 1000,
  PARTICLE_COUNT: 150,
  WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY',
  TAWKTO_URL: 'YOUR_TAWKTO_EMBED_URL' // leave as-is to disable
};
```

Add the matching key to the hidden input in `contact.html`:
```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

**3. Personalize** — replace placeholder email, GitHub username, and domain across the HTML files. Add a profile photo at `assets/profile.jpg` (square, 400×400px minimum).

**4. Deploy**
```bash
git add .
git commit -m "chore: initial setup"
git push origin main
```
Then **Settings → Pages → Deploy from branch → `main` / root**.

## Customization

**Timeline entry** (`about.html`):
```html
<div class="timeline-item">
  <div class="timeline-date">May 2026</div>
  <div class="timeline-content">
    <h4>Milestone title</h4>
    <p>Brief description.</p>
  </div>
</div>
```

**Blog post card** (`blog.html`):
```html
<div class="blog-card" data-topic="linux">
  <span class="blog-tag">Linux</span>
  <div class="blog-date">May 2026</div>
  <h3>Article title</h3>
  <p class="blog-excerpt">2–3 sentence summary.</p>
  <div class="blog-status">COMING SOON</div>
</div>
```
Valid `data-topic` values: `linux`, `programming`, `embedded`, `engineering`.

**Particle count** (`main.js`, lower for weaker hardware):
```js
PARTICLE_COUNT: 80
```

## License

MIT — the code structure is free to reference or reuse. Personal content (bio, photos, academic details, branding) is not covered.

## Contact

Abdullah Al Jehan — Dhaka, Bangladesh
Founding Advisor, Kynatium Labs

- Email: abdullahaljehan659@gmail.com
- GitHub: [@abdullahaljehan-me](https://github.com/abdullahaljehan-me)
- LinkedIn: [abdullahaljehan-me](https://www.linkedin.com/in/abdullahaljehan-me)
- Site: [abdullahaljehan-me.github.io](https://abdullahaljehan-me.github.io/abdullahaljehan-me/)
