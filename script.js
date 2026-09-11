// ============================================
// ISABEL.MELO — PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initMenuToggle();
  initSmoothScrollClose();
  initNavbarScroll();
  initProgressBar();
  initScrollReveal();
  initTypedCode();
  initParticles();
  initFormacaoBar();
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------
   Cursor glow (desktop only)
------------------------------------------- */
function initCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if (!glow || prefersReducedMotion) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* -------------------------------------------
   Mobile menu toggle
------------------------------------------- */
function initMenuToggle(){
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
}

function initSmoothScrollClose(){
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('menuToggle');
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------
   Navbar background on scroll
------------------------------------------- */
function initNavbarScroll(){
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(5,5,5,.85)';
    } else {
      navbar.style.background = 'rgba(5,5,5,.55)';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -------------------------------------------
   Scroll progress bar
------------------------------------------- */
function initProgressBar(){
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -------------------------------------------
   Scroll reveal (IntersectionObserver)
------------------------------------------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* -------------------------------------------
   Typed code animation in hero panel
------------------------------------------- */
function initTypedCode(){
  const el = document.getElementById('typedCode');
  if (!el) return;

  const lines = [
    { text: 'const Isabel = {', class: 'k' },
    { text: '  role: "Full Stack Developer",', class: 's' },
    { text: '', class: '' },
    { text: '  frontend: [', class: '' },
    { text: '    "React",', class: 's' },
    { text: '    "TypeScript",', class: 's' },
    { text: '    "React Native"', class: 's' },
    { text: '  ],', class: '' },
    { text: '', class: '' },
    { text: '  backend: [', class: '' },
    { text: '    "Java",', class: 's' },
    { text: '    "Spring Boot",', class: 's' },
    { text: '    "Python"', class: 's' },
    { text: '  ],', class: '' },
    { text: '', class: '' },
    { text: '  cloud: "AWS"', class: 's' },
    { text: '};', class: 'k' }
  ];

  const fullText = lines.map(l => l.text).join('\n');

  if (prefersReducedMotion) {
    el.textContent = fullText;
    return;
  }

  let i = 0;
  const speed = 18;

  function type(){
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }
  // Delay start slightly so hero fade-in feels orchestrated
  setTimeout(type, 700);
}

/* -------------------------------------------
   Lightweight canvas particles for hero
------------------------------------------- */
function initParticles(){
  const canvas = document.getElementById('particles');
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles;
  const PARTICLE_COUNT = window.innerWidth < 768 ? 28 : 55;

  function resize(){
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles(){
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
      ctx.fill();
    });

    // subtle connecting lines
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  requestAnimationFrame(draw);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      createParticles();
    }, 200);
  });
}

/* -------------------------------------------
   Formação progress bar animation
------------------------------------------- */
function initFormacaoBar(){
  const fill = document.querySelector('.formacao__fill');
  if (!fill) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    fill.classList.add('animate');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fill.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(fill);
}
