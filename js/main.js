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
   NOTEBOOK — aparece + tampa abre
══════════════════════════════════════════════════════════ */
const notebookLid  = document.getElementById('notebook-lid');
const notebookWrap = document.querySelector('.galeria-notebook-wrap');

if (notebookLid && notebookWrap) {
  const nb = document.querySelector('.notebook');
  if (nb) {
    nb.style.perspective = '1200px';
    nb.style.perspectiveOrigin = '50% 100%';
  }

  gsap.set(notebookLid, { rotateX: 90, transformOrigin: 'bottom center' });

  /* Notebook inteiro: fade-in + slide-up */
  gsap.fromTo(notebookWrap,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: notebookWrap,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1.2,
      },
    }
  );

  /* Tampa abre */
  gsap.to(notebookLid, {
    rotateX: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: notebookWrap,
      start: 'top 60%',
      end: 'top 10%',
      scrub: 2,
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

/* ══════════════════════════════════════════════════════════
   SWIPER
══════════════════════════════════════════════════════════ */
const swiper = new Swiper('.swiper-galeria', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  grabCursor: true,
  breakpoints: {
    600:  { slidesPerView: 1.6 },
    900:  { slidesPerView: 2.2 },
    1200: { slidesPerView: 2.8 },
  },
  navigation: { prevEl: '#prev-btn', nextEl: '#next-btn' },
});
