/* ═══════════════════════════════════════════════════════════
   MAIN.JS — Scripts IDE FILMS
═══════════════════════════════════════════════════════════ */

/* ── NAV — encolhe ao rolar ─────────────────────────────── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HERO — animações de entrada escalonadas ────────────── */
const heroEls = [
  { id: 'hero-eyebrow', delay: 300 },
  { id: 'hero-title',   delay: 500 },
  { id: 'hero-sub',     delay: 700 },
  { id: 'hero-tagline', delay: 900 },
  { id: 'hero-cta',     delay: 1100 },
  { id: 'scroll-hint',  delay: 1400 },
];

heroEls.forEach(({ id, delay }) => {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => {
    el.style.transition = 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)';
    el.style.opacity    = '1';
    el.style.transform  = 'translateY(0)';
  }, delay);
});

/* Mockup hero — entrada com classe CSS */
const mockupWrap = document.querySelector('.hero-mockup-wrap');
if (mockupWrap) {
  setTimeout(() => mockupWrap.classList.add('is-visible'), 600);
}

/* ── SCROLL REVEAL (IntersectionObserver) ───────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── EFEITO ENVELOPE — seção Sobre ─────────────────────────
   Quando o wrapper entra na viewport, adiciona .envelope-open
   que:
     1. Sobe e some a flábula (tampa triangular)
     2. Faz o conteúdo (#sobre) aparecer com fade + slide-up
────────────────────────────────────────────────────────── */
const envelopeWrap = document.querySelector('.sobre-envelope-wrap');

if (envelopeWrap) {
  const envelopeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Pequeno delay para o usuário perceber a flábula antes de abrir
        setTimeout(() => {
          envelopeWrap.classList.add('envelope-open');
        }, 200);
        envelopeObserver.unobserve(envelopeWrap);
      }
    });
  }, { threshold: 0.15 });

  envelopeObserver.observe(envelopeWrap);
}

/* ── SWIPER — carrossel da galeria ──────────────────────── */
const swiper = new Swiper('.swiper-galeria', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  grabCursor: true,
  breakpoints: {
    600:  { slidesPerView: 1.6 },
    900:  { slidesPerView: 2.2 },
    1200: { slidesPerView: 2.8 },
  },
  navigation: {
    prevEl: '#prev-btn',
    nextEl: '#next-btn',
  },
});

/* ── FILTRO DA GALERIA ──────────────────────────────────── */
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.galeria-slide').forEach(slide => {
      const cat = slide.dataset.cat || '';
      slide.style.display = (filter === 'all' || cat.includes(filter)) ? '' : 'none';
    });

    swiper.update();
  });
});
