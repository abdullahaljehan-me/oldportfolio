'use strict';

const CONFIG = {
  GITHUB_API: 'https://api.github.com/users/abdullahaljehan-me/repos',
  GITHUB_USER: 'abdullahaljehan-me',
  CACHE_DURATION: 5 * 60 * 1000,
  PARTICLE_COUNT: 80,
  WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY',
  TAWKTO_URL: 'YOUR_TAWKTO_URL'
};

const ROLES = [
  'Engineering Aspirant \u00B7 Systems & Embedded',
  'C \u00B7 Linux \u00B7 ESP32 \u00B7 IoT',
  'Founding Advisor @ Kynatium Labs',
  'Learning by building, breaking, iterating'
];

const LANGUAGE_COLORS = {
  'C': '#A8660D',
  'Python': '#3572A5',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Shell': '#89E051',
  'HTML': '#E34C26',
  'CSS': '#563D7C',
  'Java': '#B07219',
  'Go': '#00ADD8',
  'Rust': '#CE422B',
  'Makefile': '#427819'
};

/* ── Cursor System ────────────────────────────── */

class CursorSystem {
  constructor() {
    // Disable on touch devices — cursor doesn't apply
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    if (!this.dot || !this.ring) return;
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;
    this.isMagnetic = false;
    this.targetBox = null;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.left = this.mouseX + 'px';
      this.dot.style.top = this.mouseY + 'px';
    });

    // Magnetic interaction
    const interactives = document.querySelectorAll('a, button, .interactive');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.isMagnetic = true;
        this.targetBox = el.getBoundingClientRect();
        this.ring.classList.add('magnetic');
        this.ring.style.width = this.targetBox.width + 12 + 'px';
        this.ring.style.height = this.targetBox.height + 12 + 'px';
      });
      el.addEventListener('mouseleave', () => {
        this.isMagnetic = false;
        this.targetBox = null;
        this.ring.classList.remove('magnetic');
        this.ring.style.width = '30px';
        this.ring.style.height = '30px';
      });
    });

    this.animate();
  }

  animate() {
    if (!this.isMagnetic) {
      this.ringX += (this.mouseX - this.ringX) * 0.2;
      this.ringY += (this.mouseY - this.ringY) * 0.2;
    } else if (this.targetBox) {
      const centerX = this.targetBox.left + this.targetBox.width / 2;
      const centerY = this.targetBox.top + this.targetBox.height / 2;
      this.ringX += (centerX - this.ringX) * 0.2;
      this.ringY += (centerY - this.ringY) * 0.2;
    }
    if (this.ring) {
      this.ring.style.left = this.ringX + 'px';
      this.ring.style.top = this.ringY + 'px';
    }
    requestAnimationFrame(() => this.animate());
  }
}

/* ── Particle System ──────────────────────────── */

class ParticleSystem {
  constructor(canvas) {
    // Skip on touch/mobile — saves battery and CPU
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isVisible = true;
    this.resizeCanvas();
    this.initParticles();
    this.setupEvents();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
    });
  }

  update() {
    if (!this.isVisible) return;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        p.vx = Math.cos(angle) * 2;
        p.vy = Math.sin(angle) * 2;
      }
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      p.x = Math.max(0, Math.min(this.canvas.width, p.x));
      p.y = Math.max(0, Math.min(this.canvas.height, p.y));
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(6, 6, 15, 0.15)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      this.ctx.fillStyle = 'rgba(0, 212, 255, ' + p.opacity + ')';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    const len = this.particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.08 * (1 - dist / 100)) + ')';
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

/* ── Typewriter ───────────────────────────────── */

class Typewriter {
  constructor(element, roles) {
    this.element = element;
    this.roles = roles;
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.speed = 80;
    this.deleteSpeed = 40;
    this.pauseTime = 2000;
  }

  type() {
    const currentRole = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }
    this.element.textContent = currentRole.substring(0, this.charIndex);
    let speed = this.isDeleting ? this.deleteSpeed : this.speed;
    if (!this.isDeleting && this.charIndex === currentRole.length) {
      speed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }
    setTimeout(() => this.type(), speed);
  }

  start() { this.type(); }
}

/* ── Scroll Reveal ────────────────────────────── */

class ScrollReveal {
  constructor() {
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const selectors = '.mission-card, .repo-card, .skill-group, .blog-card, .education-card, .award-card, .contact-card, .coming-soon-item, .stat-card, .timeline-item';
      const elements = document.querySelectorAll(selectors);
      if (prefersReduced) {
        elements.forEach(el => el.classList.add('revealed'));
        return;
      }
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      elements.forEach(el => this.observer.observe(el));
    } catch (_) { /* graceful fallback */ }
  }
}

/* ── Progress Bar Animator ────────────────────── */

class ProgressAnimator {
  constructor() {
    try {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const pct = bar.getAttribute('data-percentage');
            if (pct) {
              setTimeout(() => { bar.style.width = pct + '%'; }, 200);
            }
            this.observer.unobserve(bar);
          }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.mission-progress-fill').forEach(bar => {
        bar.style.width = '0%';
        this.observer.observe(bar);
      });
    } catch (_) { /* graceful fallback */ }
  }
}

/* ── Stat Counters ────────────────────────────── */

class StatCounters {
  constructor() {
    this.counters = document.querySelectorAll('.stat-value[data-target]');
    if (this.counters.length === 0) return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    this.counters.forEach(c => this.observer.observe(c));
  }

  animate(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isInt = Number.isInteger(target);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = progress * (target - start) + start;
      el.textContent = isInt ? Math.floor(value) : value.toFixed(2);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

/* ── Mission Cards ────────────────────────────── */

class MissionCards {
  constructor() {
    document.querySelectorAll('.mission-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        card.classList.toggle('expanded');
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('expanded');
        }
      });
    });
  }
}

/* ── Navigation ───────────────────────────────── */

class Navigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.drawer = document.querySelector('.drawer');
    this.drawerLinks = document.querySelectorAll('.drawer-menu a');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.setupEvents();
    this.setActiveLink();
  }

  setupEvents() {
    if (this.hamburger) {
      this.hamburger.setAttribute('aria-label', 'Open navigation menu');
      this.hamburger.setAttribute('aria-expanded', 'false');
      this.hamburger.addEventListener('click', () => this.toggleDrawer());
    }
    this.drawerLinks.forEach(link => {
      link.addEventListener('click', () => this.closeDrawer());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeDrawer();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) this.closeDrawer();
    });
  }

  toggleDrawer() {
    const isOpen = this.drawer && this.drawer.classList.contains('open');
    if (isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.add('open');
    document.body.classList.add('drawer-open');
    if (this.hamburger) {
      this.hamburger.setAttribute('aria-expanded', 'true');
      this.hamburger.textContent = '✕';
    }
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
    if (this.hamburger) {
      this.hamburger.setAttribute('aria-expanded', 'false');
      this.hamburger.textContent = '☰';
    }
  }

  setActiveLink() {
    const path = window.location.pathname;
    const allLinks = [...this.navLinks, ...this.drawerLinks];
    
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Normalize href and path for matching (handles subdirectories)
      const isHome = path === '/' || path.endsWith('/') || path.endsWith('index.html');
      const isMatch = path.endsWith(href) || (isHome && href === 'index.html');
      
      if (isMatch) {
         link.classList.add('active');
      } else {
         link.classList.remove('active');
      }
    });
  }
}

/* ── GitHub Integration ───────────────────────── */

class GitHubIntegration {
  constructor() {
    this.cacheKey = 'github-repos-cache';
  }

  async fetchRepos(limit) {
    try {
      const cached = this.getCache();
      if (cached) {
        return limit ? cached.slice(0, limit) : cached;
      }
      const url = CONFIG.GITHUB_API + '?sort=updated&per_page=100';
      const response = await fetch(url);
      if (!response.ok) throw new Error('API error');
      const repos = await response.json();
      this.setCache(repos);
      return limit ? repos.slice(0, limit) : repos;
    } catch (_) {
      return [];
    }
  }

  getCache() {
    try {
      const raw = sessionStorage.getItem(this.cacheKey);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.timestamp > CONFIG.CACHE_DURATION) {
        sessionStorage.removeItem(this.cacheKey);
        return null;
      }
      return data.repos;
    } catch (_) { return null; }
  }

  setCache(repos) {
    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify({ repos: repos, timestamp: Date.now() }));
    } catch (_) { /* private browsing or quota exceeded */ }
  }

  getLanguageColor(lang) {
    return LANGUAGE_COLORS[lang] || '#888888';
  }
}

/* ── Contact Form ─────────────────────────────── */

class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validate() {
    const fd = new FormData(this.form);
    const errors = {};
    const name = (fd.get('name') || '').trim();
    if (!name) errors.name = 'Name is required';
    const email = (fd.get('email') || '').trim();
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    const message = (fd.get('message') || '').trim();
    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }
    return { isValid: Object.keys(errors).length === 0, errors: errors };
  }

  clearErrors() {
    this.form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
  }

  showErrors(errors) {
    this.clearErrors();
    Object.entries(errors).forEach(([field, msg]) => {
      const input = this.form.querySelector('[name="' + field + '"]');
      if (!input) return;
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.add('error');
      const errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = msg;
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const v = this.validate();
    if (!v.isValid) { this.showErrors(v.errors); return; }
    this.clearErrors();
    const btn = this.form.querySelector('.form-submit');
    if (!btn) return;

    const fd = new FormData(this.form);
    
    // Honeypot Anti-Spam Check
    if (fd.get('_honey')) {
      this.form.reset();
      return; // Silent reject for bots
    }

    // XSS Sanitization
    const sanitize = (str) => (str || '').replace(/<[^>]*>?/gm, '');
    const safeName = sanitize(fd.get('name'));
    const safeSubject = sanitize(fd.get('subject') || 'New Inquiry from Portfolio');
    const safeMsg = sanitize(fd.get('message'));
    
    // Fallback handler if API is unconfigured/fails
    const triggerMailtoFallback = () => {
      const bodyParams = `Name: ${safeName}%0D%0AEmail: ${fd.get('email')}%0D%0A%0D%0A${safeMsg}`;
      window.location.href = `mailto:abdullahaljehan659@gmail.com?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(bodyParams)}`;
      const msgEl = document.getElementById('form-message');
      if (msgEl) {
        msgEl.className = 'form-message success';
        msgEl.textContent = 'Opening native email client to ensure delivery...';
        msgEl.style.display = 'block';
      }
      this.form.reset();
    };

    if (CONFIG.WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      triggerMailtoFallback();
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const data = {
        access_key: CONFIG.WEB3FORMS_KEY,
        name: safeName,
        email: fd.get('email'),
        subject: safeSubject,
        message: safeMsg
      };
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!resp.ok) throw new Error('API Reject');
      
      const msgEl = document.getElementById('form-message');
      if (msgEl) {
        msgEl.className = 'form-message success';
        msgEl.textContent = 'Message sent. I\'ll get back to you shortly.';
        msgEl.style.display = 'block';
      }
      this.form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        if (msgEl) msgEl.style.display = 'none';
      }, 5000);
    } catch (_) {
      triggerMailtoFallback();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  }
}

/* ── Scroll to Top ────────────────────────────── */

class ScrollToTop {
  constructor() {
    this.button = document.querySelector('.scroll-to-top');
    if (!this.button) return;
    window.addEventListener('scroll', () => this.updateVisibility(), { passive: true });
    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  updateVisibility() {
    if (window.scrollY > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }
}

/* ── Glitch Effect ────────────────────────────── */

class GlitchEffect {
  constructor() {
    this.elements = document.querySelectorAll('.glitch');
    if (this.elements.length === 0) return;
    setInterval(() => {
      this.elements.forEach(el => {
        el.classList.add('active');
        setTimeout(() => el.classList.remove('active'), 300);
      });
    }, 4000);
  }
}

/* ── Home Page ────────────────────────────────── */

class HomePage {
  constructor() { this.loadLatestRepos(); }

  async loadLatestRepos() {
    const container = document.querySelector('.github-section .repo-grid');
    if (!container) return;
    try {
      const gh = new GitHubIntegration();
      const repos = await gh.fetchRepos(3);
      if (repos.length === 0) { this.showPlaceholder(container); return; }
      container.innerHTML = '';
      repos.forEach(repo => container.appendChild(this.createCard(repo)));
    } catch (_) { this.showPlaceholder(container); }
  }

  createCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card revealed';
    const color = LANGUAGE_COLORS[repo.language] || '#888';
    const date = new Date(repo.updated_at).toLocaleDateString();
    card.innerHTML =
      '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="repo-name">' + this.esc(repo.name) + '</a>' +
      '<p class="repo-description">' + this.esc(repo.description || 'No description yet') + '</p>' +
      '<div class="repo-meta">' +
        (repo.language ? '<div class="repo-language"><span class="language-dot" style="background-color:' + color + '"></span><span>' + this.esc(repo.language) + '</span></div>' : '') +
      '</div>' +
      '<div class="repo-stats"><span>\u2605 ' + repo.stargazers_count + '</span><span>\u2387 ' + repo.forks_count + '</span><span>' + date + '</span></div>' +
      '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="repo-link">View Repo \u2192</a>';
    return card;
  }

  esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  showPlaceholder(container) {
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('div');
      card.className = 'repo-card revealed';
      card.innerHTML = '<div class="repo-name">Repository Coming Soon</div><p class="repo-description">Building projects and pushing to GitHub...</p>';
      container.appendChild(card);
    }
  }
}

/* ── Projects Page ────────────────────────────── */

class ProjectsPage {
  constructor() {
    this.filterBtns = document.querySelectorAll('.projects-filters .filter-btn');
    this.repoGrid = document.querySelector('.projects-section .repo-grid');
    if (this.filterBtns.length === 0 || !this.repoGrid) return;
    this.allRepos = [];
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => this.filterBy(btn));
    });
    this.loadRepos();
  }

  async loadRepos() {
    try {
      const gh = new GitHubIntegration();
      const repos = await gh.fetchRepos();
      if (repos.length === 0) { this.showEmpty(); return; }
      this.allRepos = repos;
      this.renderAll(repos);
    } catch (_) { this.showEmpty(); }
  }

  renderAll(repos) {
    this.repoGrid.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card revealed';
      card.setAttribute('data-language', (repo.language || '').toLowerCase());
      const color = LANGUAGE_COLORS[repo.language] || '#888';
      const date = new Date(repo.updated_at).toLocaleDateString();
      card.innerHTML =
        '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="repo-name">' + this.esc(repo.name) + '</a>' +
        '<p class="repo-description">' + this.esc(repo.description || 'No description yet') + '</p>' +
        '<div class="repo-meta">' +
          (repo.language ? '<div class="repo-language"><span class="language-dot" style="background-color:' + color + '"></span><span>' + this.esc(repo.language) + '</span></div>' : '') +
        '</div>' +
        '<div class="repo-stats"><span>\u2605 ' + repo.stargazers_count + '</span><span>\u2387 ' + repo.forks_count + '</span><span>' + date + '</span></div>' +
        '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="repo-link">View Repo \u2192</a>';
      this.repoGrid.appendChild(card);
    });
  }

  filterBy(btn) {
    this.filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter').toLowerCase();
    const cards = this.repoGrid.querySelectorAll('.repo-card');
    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else {
        const lang = (card.getAttribute('data-language') || '').toLowerCase();
        /* Map filter keys to actual GitHub language names */
        const match = {
          'shell': ['shell', 'bash'],
          'c': ['c'],
          'html': ['html', 'css'],
          'javascript': ['javascript', 'typescript'],
          'python': ['python'],
          'embedded': ['c', 'makefile', 'assembly']
        };
        const allowed = match[filter] || [filter];
        card.style.display = allowed.some(f => lang.includes(f)) ? '' : 'none';
      }
    });
  }

  esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  showEmpty() {
    this.repoGrid.innerHTML =
      '<div class="repo-card revealed" style="grid-column: 1 / -1; text-align: center;">' +
        '<p style="color: var(--muted); font-family: Space Mono, monospace;">Projects coming soon. Currently building fundamentals.</p>' +
      '</div>';
  }
}

/* ── Blog Filter ──────────────────────────────── */

class BlogFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.blog-filters .filter-btn');
    this.cards = document.querySelectorAll('.blog-card');
    if (this.filterBtns.length === 0) return;
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn));
    });
  }

  filter(btn) {
    this.filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter').toLowerCase();
    this.cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else {
        const topic = card.getAttribute('data-topic');
        card.style.display = topic === filter ? '' : 'none';
      }
    });
  }
}

/* ── Newsletter Form ──────────────────────────── */

class NewsletterForm {
  constructor() {
    this.form = document.getElementById('newsletter-form');
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(this.form);
    
    // Honeypot Check
    if (fd.get('_honey')) {
      this.form.reset();
      return; 
    }

    const input = this.form.querySelector('.newsletter-input');
    const btn = this.form.querySelector('.newsletter-btn');
    if (!input || !btn) return;
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = 'var(--pink)';
      return;
    }
    input.style.borderColor = '';

    if (CONFIG.WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      btn.textContent = 'API Key Required';
      setTimeout(() => { btn.textContent = 'Subscribe'; }, 2000);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    try {
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: CONFIG.WEB3FORMS_KEY,
          email: email,
          subject: 'Newsletter Subscription'
        })
      });
      if (resp.ok) {
        input.value = '';
        btn.textContent = 'Subscribed!';
        setTimeout(() => { btn.disabled = false; btn.textContent = 'Subscribe'; }, 3000);
      } else {
        throw new Error('fail');
      }
    } catch (_) {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }
  }
}

/* ── Chat Widget Integration ──────────────────── */

class ChatWidget {
  constructor() {
    if (CONFIG.TAWKTO_URL && CONFIG.TAWKTO_URL !== 'YOUR_TAWKTO_URL') {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = CONFIG.TAWKTO_URL;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      if (s0 && s0.parentNode) s0.parentNode.insertBefore(s1, s0);
    }
  }
}

/* ── Terminal Preloader ──────────────────────── */

class BootSequence {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.textEl = document.getElementById('terminalText');
    if (!this.preloader || !this.textEl) return;
    
    if (sessionStorage.getItem('booted')) {
      this.preloader.style.display = 'none';
      return;
    }
    
    this.logs = [
      "Initializing AAJ System Kernel...",
      "Mounting visual modules... [OK]",
      "Loading user profile: abdullahaljehan... [OK]",
      "Establishing secure uplink... [OK]",
      "Access Granted."
    ];
    this.currentLog = 0;
    this.charIndex = 0;
    setTimeout(() => this.typeLog(), 200);
  }

  typeLog() {
    if (this.currentLog >= this.logs.length) {
      setTimeout(() => this.finish(), 600);
      return;
    }
    const logStr = this.logs[this.currentLog];
    this.textEl.textContent += logStr.charAt(this.charIndex);
    this.charIndex++;
    
    if (this.charIndex >= logStr.length) {
      this.textEl.textContent += '\n';
      this.currentLog++;
      this.charIndex = 0;
      setTimeout(() => this.typeLog(), Math.random() * 150 + 50);
    } else {
      setTimeout(() => this.typeLog(), Math.random() * 20 + 10);
    }
  }

  finish() {
    this.preloader.classList.add('hidden');
    sessionStorage.setItem('booted', 'true');
    setTimeout(() => { this.preloader.style.display = 'none'; }, 500);
  }
}

/* ── 3D Tilt Cards ────────────────────────────── */

class TiltEffect {
  constructor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    this.cards = document.querySelectorAll('.mission-card, .repo-card, .skill-group');
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMove(e, card));
      card.addEventListener('mouseleave', () => this.handleLeave(card));
    });
  }

  handleMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  handleLeave(card) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }
}

/* ── Text Scrambler Effect ────────────────────── */

class Scrambler {
  constructor() {
    this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
    this.elements = document.querySelectorAll('.nav-menu a, .btn');
    this.elements.forEach(el => {
      el.addEventListener('mouseenter', () => this.scramble(el));
    });
  }

  scramble(el) {
    if (el.dataset.scrambling === 'true') return;
    const originalText = el.dataset.original || el.innerText;
    if (!el.dataset.original) el.dataset.original = originalText;
    
    el.dataset.scrambling = 'true';
    let iteration = 0;
    const maxIterations = originalText.length;
    
    const interval = setInterval(() => {
      el.innerText = originalText.split('').map((char, index) => {
        if (index < iteration) return originalText[index];
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }).join('');
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.innerText = originalText;
        el.dataset.scrambling = 'false';
      }
      iteration += 1/3;
    }, 30);
  }
}

/* ── Initialization ───────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  try {
    /* Particle system — skipped on touch by ParticleSystem constructor */
    var canvas = document.getElementById('particleCanvas');
    if (canvas) {
      var ps = new ParticleSystem(canvas);
      if (ps.ctx) ps.animate();
    }

    /* Typewriter */
    var twEl = document.querySelector('.typewriter-text');
    if (twEl) {
      var tw = new Typewriter(twEl, ROLES);
      tw.start();
    }

    /* Core modules */
    new BootSequence();
    new CursorSystem();
    new Navigation();
    new ScrollReveal();
    new ProgressAnimator();
    new MissionCards();
    new ContactForm();
    new ScrollToTop();
    new GlitchEffect();
    new NewsletterForm();
    new BlogFilter();
    new StatCounters();
    new TiltEffect();
    new Scrambler();
    new ChatWidget();

    /* Page-specific */
    var parts = window.location.pathname.split('/').filter(Boolean);
    var pageName = parts[parts.length - 1] || 'index.html';
    if (pageName === 'index.html' || pageName === '' || pageName === 'abdullahaljehan-me') {
      new HomePage();
    } else if (pageName === 'projects.html') {
      new ProjectsPage();
    }
  } catch (_) {
    /* Ensure page remains functional even if JS partially fails */
  }
});
