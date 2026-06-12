// ===== SONADIVE – Premium Animations Engine (GSAP) =====
(function () {
  'use strict';

  // Guard: bail if GSAP not loaded
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Custom Cursor ──────────────────────────────────────────────
  const cursor    = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursor && cursorDot && window.innerWidth > 1024) {
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cursorDot, { x: mx - 3, y: my - 3, duration: 0.08, overwrite: true });
    });

    (function tick() {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      gsap.set(cursor, { x: cx - 16, y: cy - 16 });
      requestAnimationFrame(tick);
    })();

    const hoverEls = document.querySelectorAll('a, button, .service-card, .cs-card, .why-item, .value-card, .industry-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2, opacity: 0.5, duration: 0.3 }));
      el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 }));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
  }

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
    gsap.set(mobileMenu, { x: '100%' });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    tl.to(mobileMenu, { x: 0, duration: 0.45 })
      .to(backdrop, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }, 0)
      .from('.mobile-menu-links a', { x: 30, opacity: 0, stagger: 0.06, duration: 0.35 }, '-=0.15')
      .from('.mobile-cta', { y: 16, opacity: 0, duration: 0.3 }, '-=0.1');

    function openMenu() {
      tl.play();
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
  if (document.querySelector('.hero-badge')) {
    gsap.timeline({ delay: 0.15 })
      .from('.hero-badge',  { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.hero h1',     { y: 48, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .from('.hero-sub',    { y: 32, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-cta > *', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .from('.hero-scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.1')
      .from('.hero-float', { y: 20, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }, '-=0.5');
  }

  // ── Hero Mouse Parallax ────────────────────────────────────────
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  const hero  = document.querySelector('.hero');

  if (hero && orb1 && orb2) {
    hero.addEventListener('mousemove', e => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      gsap.to(orb1, { x: x * 70,  y: y * 50,  duration: 1.8, ease: 'power2.out', overwrite: true });
      gsap.to(orb2, { x: x * -50, y: y * -40, duration: 1.8, ease: 'power2.out', overwrite: true });
    }, { passive: true });
  }

  // ── Floating Geo Shapes ────────────────────────────────────────
  document.querySelectorAll('.geo-shape').forEach((shape, i) => {
    gsap.to(shape, {
      y: (i % 2 === 0 ? -18 : 18),
      rotation: (i % 2 === 0 ? 20 : -15),
      duration: 3.5 + i * 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: i * 0.4
    });
  });

  // ── Scroll-Triggered Stats Counters ───────────────────────────
  document.querySelectorAll('.stat-item[data-count]').forEach(item => {
    const numEl  = item.querySelector('.stat-num');
    const target = parseFloat(item.dataset.count);
    const suffix = item.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: item,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() { numEl.textContent = Math.round(obj.val) + suffix; }
        });
      }
    });
  });

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

  // ── Button Ripple ────────────────────────────────────────────
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      r.style.cssText = `left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px`;
      this.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  });

})();
