// ===== SONADIVE – Premium Animations Engine (GSAP) =====
(function () {
  'use strict';

  // Guard: bail if GSAP not loaded
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Scroll Progress Bar ────────────────────────────────────────
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      progressBar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  // ── Navbar: blur + shadow on scroll ───────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: self => navbar.classList.toggle('navbar-scrolled', self.progress > 0)
    });
  }

  // ── Mobile Menu ────────────────────────────────────────────────
  const menuBtn  = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backdrop   = document.querySelector('.mobile-menu-backdrop');
  const closeBtn   = document.querySelector('.mobile-menu-close');

  if (menuBtn && mobileMenu) {
    // Make menu visible to GSAP (display:flex) but keep it off-screen
    mobileMenu.classList.add('is-ready');
    gsap.set(mobileMenu, { x: '100%' });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
      onReverseComplete: () => {
        mobileMenu.classList.remove('is-ready');
        if (backdrop) backdrop.classList.remove('is-active');
      }
    });
    tl.to(mobileMenu, { x: 0, duration: 0.45 })
      .from('.mobile-menu-links a', { x: 30, opacity: 0, stagger: 0.06, duration: 0.35 }, '-=0.15')
      .from('.mobile-cta', { y: 16, opacity: 0, duration: 0.3 }, '-=0.1');

    function openMenu() {
      mobileMenu.classList.add('is-ready');
      if (backdrop) backdrop.classList.add('is-active');
      gsap.set(mobileMenu, { x: '100%' });
      tl.play(0);
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      tl.reverse();
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  // ── Hero Entrance ──────────────────────────────────────────────
  if (document.querySelector('.hero h1')) {
    const heroTl = gsap.timeline({ delay: 0.15 })
      .from('.hero h1',     { y: 48, opacity: 0, duration: 0.9, ease: 'power3.out' })
      .from('.hero-sub',    { y: 32, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-cta > *', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .from('.hero-canvas', { opacity: 0, duration: 1.1, ease: 'power2.out' }, '-=0.9');
    if (document.querySelector('.hero-visual')) {
      heroTl.from('.hero-visual', { x: 48, opacity: 0, duration: 1, ease: 'power3.out' }, '-=1.1');
    }
  }

  // ── Hero Visual: cursor-follow 3D tilt ─────────────────────────
  (function () {
    const hero = document.querySelector('.hero');
    const frame = document.querySelector('.hero-visual-frame');
    if (!hero || !frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 1025px)').matches) return;

    const BASE_Y = -8, BASE_X = 3; // resting tilt (matches the CSS)
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  * 2 - 1;  // -1 … 1
      const ny = (e.clientY - r.top)  / r.height * 2 - 1;
      gsap.to(frame, {
        rotationY: BASE_Y + nx * 7,
        rotationX: BASE_X - ny * 5,
        duration: 0.7, ease: 'power2.out', overwrite: 'auto'
      });
    });
    hero.addEventListener('mouseleave', () => {
      gsap.to(frame, { rotationY: BASE_Y, rotationX: BASE_X, duration: 1, ease: 'power3.out', overwrite: 'auto' });
    });
  })();

  // ── Services Grid ─────────────────────────────────────────────
  const svcCards = gsap.utils.toArray('.service-card');
  if (svcCards.length) {
    gsap.set(svcCards, { y: 50, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.services-grid',
      start: 'top 86%',
      once: true,
      onEnter: () => gsap.to(svcCards, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' })
    });
  }

  // ── Tech Stack Logos ───────────────────────────────────────────
  const techLogos = gsap.utils.toArray('.tech-logo');
  if (techLogos.length) {
    gsap.set(techLogos, { y: 22, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.tech-strip',
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(techLogos, { y: 0, opacity: 0.88, stagger: 0.08, duration: 0.55, ease: 'power3.out' })
    });
  }

  // ── Case Study Cards (+ trigger CSS chart animations) ─────────
  const csCards = gsap.utils.toArray('.cs-card');
  if (csCards.length) {
    gsap.set(csCards, { y: 70, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.cs-grid',
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.to(csCards, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' });
        // Unlock CSS chart animations
        setTimeout(() => {
          const grid = document.querySelector('.cs-grid');
          if (grid) grid.classList.add('cs-animated');
        }, 300);
      }
    });
  }

  // ── Why Items ─────────────────────────────────────────────────
  const whyItems = gsap.utils.toArray('.why-item');
  if (whyItems.length) {
    gsap.set(whyItems, { x: -24, opacity: 0 });
    ScrollTrigger.create({
      trigger: '.why-grid',
      start: 'top 86%',
      once: true,
      onEnter: () => gsap.to(whyItems, { x: 0, opacity: 1, stagger: 0.09, duration: 0.65, ease: 'power3.out' })
    });
  }

  // ── Contact Form ──────────────────────────────────────────────
  const formWrap = document.querySelector('.contact-form-wrap');
  if (formWrap) {
    gsap.set(formWrap, { x: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: formWrap,
      start: 'top 86%',
      once: true,
      onEnter: () => gsap.to(formWrap, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    });
  }

  // ── Section Headers / Eyebrows ────────────────────────────────
  gsap.utils.toArray('.section-eyebrow, .section-header').forEach(el => {
    gsap.from(el, {
      y: 20, opacity: 0, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // ── Page-inner generic reveals ────────────────────────────────
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Generic reveal for inner page cards
  gsap.utils.toArray('.value-card, .industry-card, .service-detail-card, .cs-full-card, .insight-card, .process-step').forEach((el, i) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.65, delay: (i % 4) * 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ── Page Hero (inner pages) ────────────────────────────────────
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    gsap.timeline({ delay: 0.1 })
      .from('.page-hero-eyebrow', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('.page-hero h1',      { y: 36, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.3')
      .from('.page-hero p',       { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  }

  // ── Footer reveal ────────────────────────────────────────────
  gsap.utils.toArray('.footer-brand, .footer-col').forEach((el, i) => {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.6, delay: i * 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', once: true }
    });
  });

})();
