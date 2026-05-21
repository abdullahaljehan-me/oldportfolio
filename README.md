# ⚡ Abdullah Al Jehan — Personal Portfolio

> A hacker-aesthetic, terminal-inspired personal portfolio built entirely with vanilla web technologies. No frameworks. No dependencies. Just raw HTML, CSS, and JavaScript — optimized to load fast, look sharp, and work everywhere.

---

## 📝 Overview

This is the source code for [abdullahaljehan-me.github.io](https://abdullahaljehan-me.github.io/abdullahaljehan-me/) — a multi-page personal portfolio designed around a cyber/terminal aesthetic. It features a live GitHub repository feed via the GitHub API, an animated particle canvas system, a terminal boot sequence preloader, a contact form powered by Web3Forms, and a fully responsive layout — all without a single npm package or build step.

---

## 🌟 Key Features

- **Terminal Boot Sequence** — Animated preloader that types out system logs on first visit, stored in `sessionStorage` to skip on return
- **Particle Canvas System** — 150-particle interactive background with mouse-repulsion physics and connecting line mesh
- **Live GitHub Feed** — Pulls and renders your latest repositories directly from the GitHub REST API with 5-minute `sessionStorage` caching
- **Magnetic Custom Cursor** — Dual-element cursor (dot + ring) with magnetic snapping to interactive elements
- **Cyber-Chamfer UI** — All cards and buttons use a `clip-path` polygon for a consistent angled-corner aesthetic
- **Accessible & SEO-Ready** — Structured data (`schema.org`), Open Graph tags, canonical URLs, skip-to-content link, ARIA labels, and `prefers-reduced-motion` support throughout
- **Zero-Dependency Contact Form** — Web3Forms integration with client-side validation, XSS sanitization, honeypot anti-spam, and a `mailto:` fallback
- **3D Tilt Cards + Text Scrambler** — `perspective` CSS transforms on hover and character-scramble effect on nav links

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222?style=flat-square&logo=github&logoColor=white)
![Web3Forms](https://img.shields.io/badge/Web3Forms-Contact%20API-6366F1?style=flat-square)
![GitHub API](https://img.shields.io/badge/GitHub%20REST%20API-v3-181717?style=flat-square&logo=github)

| Layer | Choice | Notes |
|---|---|---|
| Markup | HTML5 | Semantic, schema.org structured data |
| Styling | CSS3 | Custom properties, `clip-path`, `backdrop-filter` |
| Scripting | Vanilla JS (ES2022) | Class-based architecture, `IntersectionObserver`, Canvas API |
| Fonts | Google Fonts | Orbitron · Space Mono · Rajdhani |
| Form Backend | Web3Forms | Free tier, no server required |
| Hosting | GitHub Pages | Auto-deploys from `main` branch |
| Live Chat (optional) | Tawk.to | Loaded only if `TAWKTO_URL` is configured |

---

## ⚙️ Getting Started

### Prerequisites

- A modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- A [Web3Forms](https://web3forms.com/) account — free, takes 2 minutes
- *(Optional)* A [Tawk.to](https://www.tawk.to/) account for live chat
- Git

No Node.js. No Python. No build tools. This project has **zero runtime dependencies**.

---

### Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/abdullahaljehan-me/abdullahaljehan-me.git
cd abdullahaljehan-me
```

**2. Configure your API keys**

Open `main.js` and update the `CONFIG` object at the top of the file:

```javascript
const CONFIG = {
  GITHUB_API: 'https://api.github.com/users/YOUR_GITHUB_USERNAME/repos',
  GITHUB_USER: 'YOUR_GITHUB_USERNAME',
  CACHE_DURATION: 5 * 60 * 1000,       // 5 minutes — adjust as needed
  PARTICLE_COUNT: 150,
  WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY',   // Get from web3forms.com
  TAWKTO_URL: 'YOUR_TAWKTO_EMBED_URL'           // Optional — leave as-is to disable
};
```

Also update the hidden input in `contact.html`:

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

**3. Add your profile image**

Drop your photo at:

```
assets/profile.jpg
```

Recommended: square crop, minimum 400×400px.

**4. Update personal details**

Replace all instances of placeholder URLs, email addresses, and names across the HTML files. Key spots:

```
abdullahaljehan659@gmail.com   → your email
abdullahaljehan-me             → your GitHub username
abdullahaljehan-me.github.io   → your Pages domain
```

A quick find-and-replace in your editor handles this in under a minute.

**5. Deploy to GitHub Pages**

```bash
git add .
git commit -m "chore: initial portfolio setup"
git push origin main
```

Then in your repository → **Settings → Pages → Source: Deploy from branch → `main` / `root`**.

Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/` within 60–90 seconds.

---

## 💡 Usage & Code Examples

### Adding a new Timeline entry (`about.html`)

```html
<div class="timeline-item">
  <div class="timeline-date">May 2026</div>
  <div class="timeline-content">
    <h4>Your Milestone Title</h4>
    <p>Brief description of what you achieved or started.</p>
  </div>
</div>
```

---

### Adding a new Blog post card (`blog.html`)

```html
<div class="blog-card" data-topic="linux">
  <span class="blog-tag">Linux</span>
  <div class="blog-date">May 2026</div>
  <h3>Your Article Title Here</h3>
  <p class="blog-excerpt">
    A 2–3 sentence summary of what the article covers.
  </p>
  <div class="blog-status">COMING SOON</div>
  <!-- Replace the div above with an anchor tag once published -->
</div>
```

Valid `data-topic` values: `linux` · `programming` · `embedded` · `engineering`

---

### Tweaking the particle system (`main.js`)

```javascript
const CONFIG = {
  PARTICLE_COUNT: 80,   // Lower for better performance on weak hardware
  // ...
};
```

The `ParticleSystem` class also supports adjusting connection distance (default `100px`) directly inside the `draw()` method:

```javascript
// In ParticleSystem.draw()
if (dist < 80) {  // Tighten the mesh by reducing this value
  this.ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.08 * (1 - dist / 80)) + ')';
}
```

---

### Updating mission progress bars (`about.html`, `index.html`)

```html
<div class="mission-progress-fill" data-percentage="60"></div>
<!-- data-percentage accepts 0–100; the bar animates in via IntersectionObserver -->
```

---

## 🤝 Contributing

This is a personal portfolio, not a collaborative product — but if you spot a bug, accessibility issue, or performance regression, you're welcome to open an issue or a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b fix/cursor-mobile-bug`
3. Commit your change: `git commit -m "fix: hide cursor elements on touch devices"`
4. Push and open a Pull Request against `main`

Please keep PRs focused and scoped to one issue at a time.

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use the code structure and patterns as a reference or starting point for your own portfolio. Do not copy personal content (bio, academic details, photos, or branding).

See [`LICENSE`](./LICENSE) for the full text.

---

## 👤 Contact & Support

**Abdullah Al Jehan**
Engineering Aspirant · Founding Advisor @ Kynatium Labs · Dhaka, Bangladesh

| Channel | Link |
|---|---|
| Email | [abdullahaljehan659@gmail.com](mailto:abdullahaljehan659@gmail.com) |
| GitHub | [@abdullahaljehan-me](https://github.com/abdullahaljehan-me) |
| LinkedIn | [Abdullah Al Jehan](https://www.linkedin.com/in/abdullahaljehan-me) |
| Portfolio | [abdullahaljehan-me.github.io](https://abdullahaljehan-me.github.io/abdullahaljehan-me/) |

---

<p align="center">
  Built from code and curiosity &nbsp;·&nbsp; Abdullah Al Jehan © 2026
</p>
