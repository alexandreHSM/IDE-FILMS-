/* ═══════════════════════════════════════════════════════════
   MAIN.JS — IDE FILMS · GSAP ScrollTrigger
═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── NAV ────────────────────────────────────────────────── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HERO — entrada escalonada ──────────────────────────── */
const heroEls = [
  { id: 'hero-eyebrow', delay: 300 },
  { id: 'hero-title',   delay: 500 },
  { id: 'hero-sub',     delay: 700 },
  { id: 'hero-tagline', delay: 900 },
  { id: 'hero-cta',     delay: 1100 },
];
heroEls.forEach(({ id, delay }) => {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => {
    el.style.transition = 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay);
});

const mockupWrap = document.querySelector('.hero-mockup-wrap');
if (mockupWrap) setTimeout(() => mockupWrap.classList.add('is-visible'), 600);

/* ══════════════════════════════════════════════════════════
   SOBRE — card aparece ao rolar (fade + slide-up)
══════════════════════════════════════════════════════════ */
gsap.to('.sobre-card', {
  opacity: 1,
  y: 0,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '#sobre',
    start: 'top 80%',
    end: 'top 30%',
    scrub: 1.2,
  },
});

gsap.to('.stat-item', {
  opacity: 1,
  y: 0,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.sobre-stats',
    start: 'top 85%',
    end: 'top 50%',
    scrub: 1,
  },
});

/* ══════════════════════════════════════════════════════════
   SERVIÇOS
══════════════════════════════════════════════════════════ */
gsap.to('.servicos-header', {
  opacity: 1,
  y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#servicos',
    start: 'top 80%',
    end: 'top 50%',
    scrub: 1,
  },
});

gsap.to('.servico-card', {
  opacity: 1,
  y: 0,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.servicos-grid',
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1.5,
  },
});

/* ══════════════════════════════════════════════════════════
   GALERIA — header
══════════════════════════════════════════════════════════ */
gsap.to('.galeria-header', {
  opacity: 1,
  y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#galeria',
    start: 'top 80%',
    end: 'top 55%',
    scrub: 1,
  },
});

/* ══════════════════════════════════════════════════════════
   NOTEBOOK MOCKUP — slide-up vindo de baixo + fade
══════════════════════════════════════════════════════════ */
const notebookWrap = document.querySelector('.galeria-notebook-wrap');
const notebookScreen = document.querySelector('.notebook-mockup-screen');

if (notebookWrap) {
  /* Notebook: fade-in + slide-up elegante */
  gsap.to(notebookWrap, {
    opacity: 1,
    y: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: notebookWrap,
      start: 'top 90%',
      end: 'top 45%',
      scrub: 1.4,
    },
  });

  /* Caption */
  gsap.to('.galeria-video-caption', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '.galeria-video-caption',
      start: 'top 90%',
      end: 'top 60%',
      scrub: 1,
    },
  });

  /* Divisor */
  gsap.to('.galeria-divider', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.galeria-divider',
      start: 'top 90%',
      end: 'top 65%',
      scrub: 1,
    },
  });
}

/* Grid de fotos — itens entram em stagger */
gsap.from('.galeria-item', {
  opacity: 0,
  y: 30,
  scale: 0.95,
  stagger: 0.08,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.galeria-grid',
    start: 'top 85%',
    end: 'top 40%',
    scrub: 1,
  },
});

/* Botão ver mais */
gsap.to('.galeria-cta', {
  opacity: 1,
  y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.galeria-cta',
    start: 'top 90%',
    end: 'top 65%',
    scrub: 1,
  },
});

/* ══════════════════════════════════════════════════════════
   CONTATO
══════════════════════════════════════════════════════════ */
gsap.from('.gs-reveal', {
  opacity: 0,
  y: 40,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '#contato',
    start: 'top 75%',
    end: 'top 30%',
    scrub: 1,
  },
});

gsap.from('.gs-reveal-form', {
  opacity: 0,
  x: 50,
  scrollTrigger: {
    trigger: '#contato',
    start: 'top 70%',
    end: 'top 20%',
    scrub: 1.2,
  },
});