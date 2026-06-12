/* ═══════════════════════════════════════════════════════════
   MAIN.JS — IDE FILMS · GSAP ScrollTrigger
═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   CANVAS — fundo diagonal do hero
══════════════════════════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
  }

  /* Linhas diagonais — tonalidades de cinza escuro / preto */
  const stripes = [
    { x: .08,  w: .18, angle: 18, alpha: .07 },
    { x: .20,  w: .10, angle: 18, alpha: .04 },
    { x: .55,  w: .22, angle: 18, alpha: .06 },
    { x: .72,  w: .08, angle: 18, alpha: .03 },
    { x: .82,  w: .20, angle: 18, alpha: .08 },
    { x: .92,  w: .06, angle: 18, alpha: .04 },
  ];

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* Fundo base — gradiente preto levemente mais claro no centro */
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   '#0c0c0c');
    bg.addColorStop(.45, '#111111');
    bg.addColorStop(1,   '#0c0c0c');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* Faixas diagonais */
    const rad = (a) => a * Math.PI / 180;

    stripes.forEach(s => {
      ctx.save();
      const cx = s.x * W;
      const halfW = (s.w * W) / 2;
      const diag = Math.sqrt(W * W + H * H);

      ctx.translate(cx, H / 2);
      ctx.rotate(rad(-s.angle));

      const grad = ctx.createLinearGradient(-halfW, 0, halfW, 0);
      grad.addColorStop(0,   `rgba(30,30,30,0)`);
      grad.addColorStop(.35, `rgba(35,35,35,${s.alpha})`);
      grad.addColorStop(.5,  `rgba(40,40,40,${s.alpha * 1.4})`);
      grad.addColorStop(.65, `rgba(35,35,35,${s.alpha})`);
      grad.addColorStop(1,   `rgba(30,30,30,0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(-halfW, -diag / 2, halfW * 2, diag);
      ctx.restore();
    });

    /* Linha fina dourada diagonal — destaque sutil */
    ctx.save();
    ctx.translate(W * .52, H / 2);
    ctx.rotate(rad(-18));
    const lineGrad = ctx.createLinearGradient(0, -H * .6, 0, H * .6);
    lineGrad.addColorStop(0,   'transparent');
    lineGrad.addColorStop(.3,  'rgba(221,185,94,.07)');
    lineGrad.addColorStop(.5,  'rgba(221,185,94,.12)');
    lineGrad.addColorStop(.7,  'rgba(221,185,94,.07)');
    lineGrad.addColorStop(1,   'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -H);
    ctx.lineTo(0,  H);
    ctx.stroke();
    ctx.restore();

    /* Vinheta nas bordas */
    const vig = ctx.createRadialGradient(W/2, H/2, H*.2, W/2, H/2, H*.9);
    vig.addColorStop(0,  'rgba(0,0,0,0)');
    vig.addColorStop(1,  'rgba(0,0,0,.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
  }

  window.addEventListener('resize', resize);
  resize();
})();

/* ══════════════════════════════════════════════════════════
   INTRO CURTAIN — logo aparece → tela parte ao meio
══════════════════════════════════════════════════════════ */
(function initIntro() {
  const curtain = document.getElementById('intro-curtain');
  const logo    = document.getElementById('curtain-logo');
  const line    = document.getElementById('curtain-line');
  if (!curtain || !logo) return;

  /* Bloqueia scroll durante a intro */
  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onComplete: () => {
      curtain.remove();
      logo.remove();
      document.body.style.overflow = '';
      startHero();
    }
  });

  /* 1. Logo aparece */
  tl.to(logo, {
    opacity: 1, duration: .7, ease: 'power2.out'
  }, .3);

  /* 2. Linha se expande */
  tl.to(line, {
    width: '100%', duration: .6, ease: 'power2.out'
  }, .8);

  /* 3. Pausa dramática */
  tl.to({}, { duration: .8 });

  /* 4. Logo some */
  tl.to(logo, {
    opacity: 0, y: -20, duration: .45, ease: 'power2.in'
  });

  /* 5. Cortinas partem ao meio — esquerda vai para esquerda, direita para direita */
  tl.to('.curtain-left', {
    xPercent: -100, duration: .85, ease: 'power4.inOut'
  }, '-=.1');
  tl.to('.curtain-right', {
    xPercent: 100, duration: .85, ease: 'power4.inOut'
  }, '<');

})();

/* ── NAV ────────────────────────────────────────────────── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ══════════════════════════════════════════════════════════
   HERO — entrada escalonada (chamada após intro terminar)
══════════════════════════════════════════════════════════ */
function startHero() {
  const ease = 'cubic-bezier(.16,1,.3,1)';
  const heroEls = [
    { id: 'hero-eyebrow', delay: 0 },
    { id: 'hero-title',   delay: 150 },
    { id: 'hero-sub',     delay: 300 },
    { id: 'hero-tagline', delay: 450 },
    { id: 'hero-cta',     delay: 600 },
    { id: 'scroll-hint',  delay: 900 },
  ];

  heroEls.forEach(({ id, delay }) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.style.transition = `opacity .9s ${ease}, transform .9s ${ease}`;
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delay);
  });

  /* iPhone mockup entra da direita */
  const mockupWrap = document.querySelector('.hero-mockup-wrap');
  if (mockupWrap) {
    setTimeout(() => mockupWrap.classList.add('is-visible'), 200);
  }
}

/* ══════════════════════════════════════════════════════════
   SOBRE
══════════════════════════════════════════════════════════ */
gsap.to('.sobre-card', {
  opacity: 1, y: 0,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '#sobre',
    start: 'top 80%', end: 'top 30%',
    scrub: 1.2,
  },
});

gsap.to('.stat-item', {
  opacity: 1, y: 0,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.sobre-stats',
    start: 'top 85%', end: 'top 50%',
    scrub: 1,
  },
});

/* ══════════════════════════════════════════════════════════
   SERVIÇOS
══════════════════════════════════════════════════════════ */
gsap.to('.servicos-header', {
  opacity: 1, y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#servicos',
    start: 'top 80%', end: 'top 50%',
    scrub: 1,
  },
});

gsap.to('.servico-card', {
  opacity: 1, y: 0,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.servicos-grid',
    start: 'top 80%', end: 'top 20%',
    scrub: 1.5,
  },
});

/* ══════════════════════════════════════════════════════════
   GALERIA
══════════════════════════════════════════════════════════ */
gsap.to('.galeria-header', {
  opacity: 1, y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#galeria',
    start: 'top 80%', end: 'top 55%',
    scrub: 1,
  },
});

const notebookWrap = document.querySelector('.galeria-notebook-wrap');
if (notebookWrap) {
  gsap.to(notebookWrap, {
    opacity: 1, y: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: notebookWrap,
      start: 'top 90%', end: 'top 45%',
      scrub: 1.4,
    },
  });

  gsap.to('.galeria-video-caption', {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '.galeria-video-caption',
      start: 'top 90%', end: 'top 60%',
      scrub: 1,
    },
  });

  gsap.to('.galeria-divider', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.galeria-divider',
      start: 'top 90%', end: 'top 65%',
      scrub: 1,
    },
  });
}

gsap.from('.galeria-item', {
  opacity: 0, y: 30, scale: 0.95,
  stagger: 0.08,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.galeria-grid',
    start: 'top 85%', end: 'top 40%',
    scrub: 1,
  },
});

gsap.to('.galeria-cta', {
  opacity: 1, y: 0,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.galeria-cta',
    start: 'top 90%', end: 'top 65%',
    scrub: 1,
  },
});

/* ══════════════════════════════════════════════════════════
   CONTATO
══════════════════════════════════════════════════════════ */
gsap.from('.gs-reveal', {
  opacity: 0, y: 40,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '#contato',
    start: 'top 75%', end: 'top 30%',
    scrub: 1,
  },
});

gsap.from('.gs-reveal-form', {
  opacity: 0, x: 50,
  scrollTrigger: {
    trigger: '#contato',
    start: 'top 70%', end: 'top 20%',
    scrub: 1.2,
  },
});
