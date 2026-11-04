// ===== SONADIVE: site behaviour =====
// Scrub hero, depth rail, reveals, the vault, nav and forms.
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  // ── Hidden tabs pause every loop ──────────────────────────────
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

  // ── Nav + mobile menu ─────────────────────────────────────────
  const nav = $('.nav');
  let navOn = null;
  const syncNav = () => {
    const on = scrollY > 24;
    if (on !== navOn) { navOn = on; nav.classList.toggle('is-scrolled', on); }
  };
  const menuBtn = $('.menu-btn');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // ── Depth rail: the hexagon sinks with the page ───────────────
  const rail = $('.rail');
  const railMark = rail && $('.rail-mark', rail);
  let railLast = -1, railEnd = null;
  function syncRail() {
    if (!rail) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    if (Math.abs(p - railLast) > 0.0008) {
      railLast = p;
      railMark.style.transform = 'translateY(' + (p * rail.clientHeight).toFixed(1) + 'px)';
      rail.style.setProperty('--rp', p.toFixed(4));
    }
    const end = p > 0.985;
    if (end !== railEnd) { railEnd = end; rail.classList.toggle('at-end', end); }
  }

  // ── Self-drawing lines ────────────────────────────────────────
  const draws = $$('.draw');
  const drawLast = new Map();
  function syncDraws() {
    if (root.classList.contains('pinned')) return;
    draws.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const d = clamp((innerHeight * 0.72 - r.top) / r.height, 0, 1);
      if (Math.abs(d - (drawLast.get(el) ?? -1)) > 0.004) {
        drawLast.set(el, d);
        el.style.setProperty('--d', d.toFixed(3));
      }
    });
  }

  function onPageScroll() { syncNav(); syncRail(); syncDraws(); }
  addEventListener('scroll', onPageScroll, { passive: true });
  addEventListener('resize', () => { railLast = -1; onPageScroll(); }, { passive: true });
  onPageScroll();

  // ── Reveals: IO adds .in, then the stagger delays are retired ─
  const reveals = $$('[data-r]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      setTimeout(() => e.target.classList.add('settled'), 1500);
    }), { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
    // Living elements only run while their section is on screen
    const liveIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('live', e.isIntersecting)), { rootMargin: '10%' });
    $$('.section, .tech, .cta').forEach(el => liveIO.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in', 'settled'));
    $$('.section, .tech, .cta').forEach(el => el.classList.add('live'));
  }

  // ── The vault: press and hold to open it ──────────────────────
  const vault = $('.vault');
  if (vault) {
    const why = vault.closest('.why');
    let h = 0, holding = false, raf = null, last = 0, opened = false;
    const paint = () => vault.style.setProperty('--h', h.toFixed(3));
    const finish = () => { opened = true; h = 1; paint(); why.classList.add('opened'); vault.setAttribute('aria-pressed', 'true'); };
    const step = now => {
      const dt = Math.min(64, now - (last || now));
      last = now;
      h = clamp(h + (holding ? dt / 1300 : -dt / 1000), 0, 1);
      paint();
      if (h >= 1) { finish(); raf = null; last = 0; return; }
      if (h <= 0 && !holding) { raf = null; last = 0; return; }
      raf = requestAnimationFrame(step);
    };
    const press = () => { if (opened) return; holding = true; if (raf === null) { last = 0; raf = requestAnimationFrame(step); } };
    const release = () => { holding = false; };
    vault.addEventListener('pointerdown', e => { e.preventDefault(); press(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => vault.addEventListener(t, release));
    vault.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } });
    vault.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') release(); });
    vault.addEventListener('blur', release);
    vault.addEventListener('contextmenu', e => e.preventDefault());
    if (reduced.matches) finish();
    vault._finish = finish;
  }

  // ── Scrub hero ────────────────────────────────────────────────
  const hero = $('.hero');
  const stage = hero && $('.stage', hero);
  let applyHeroMode = () => {};

  if (stage) {
    const video = $('video', stage);
    const ring = $('.ring', stage);
    const posterLayer = $('.poster', stage);
    const VIDEO_URL = video.dataset.src;
    const VIDEO_BYTES = Number(video.dataset.bytes);
    const POSTER_URL = video.dataset.poster;

    // Split words once, again whenever the language changes
    function rng(seed) {
      let s = seed >>> 0;
      return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    }
    function splitBand(el, i) {
      const rand = rng(97 + i);
      const nodes = $$('.split', el);
      let words = [];
      nodes.forEach(n => {
        const text = n.textContent.trim();
        n.textContent = '';
        n.setAttribute('aria-hidden', 'true');
        text.split(/\s+/).forEach((word, j, all) => {
          const w = document.createElement('span');
          w.className = 'w';
          w.textContent = word;
          n.appendChild(w);
          if (j < all.length - 1) n.appendChild(document.createTextNode(' '));
          words.push(w);
        });
      });
      const seq = el.dataset.seq === 'order';
      words.forEach((w, j) => w.style.setProperty('--th', (seq ? (j / Math.max(1, words.length)) * 0.62 : Math.min(0.6, j * 0.09 + rand() * 0.05)).toFixed(3)));
    }

    const bands = $$('.band', stage).map((el, i) => ({
      el, i,
      a: Number(el.dataset.a), b: Number(el.dataset.b),
      ramp: Number(el.dataset.ramp) || 0,
      op: -1, k: -1, on: null
    }));
    const n = bands.length;
    bands.forEach(b => splitBand(b.el, b.i));
    document.addEventListener('sd:lang', () => {
      bands.forEach(b => { splitBand(b.el, b.i); b.op = -1; b.k = -1; });
      updateCaptions(shown);
    });

    const heroProgress = () => {
      const r = hero.getBoundingClientRect();
      const range = r.height - innerHeight;
      return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
    };

    let loadK = 0;
    function updateCaptions(p) {
      bands.forEach(b => {
        const f = Math.min(0.02, (b.b - b.a) / 3);
        const inO = b.i === 0 ? 1 : smoothstep(p, b.a, b.a + f);
        const outO = b.i === n - 1 ? 1 : 1 - smoothstep(p, b.b - f, b.b);
        const op = inO * outO;
        let k = clamp((p - b.a) / (b.ramp || Math.min(0.025, (b.b - b.a) * 0.35)), 0, 1);
        if (b.i === 0) k = Math.max(k, loadK);
        if (Math.abs(op - b.op) > 0.004) { b.op = op; b.el.style.opacity = op.toFixed(3); }
        if (Math.abs(k - b.k) > 0.008 || (k === 1 && b.k !== 1)) { b.k = k; b.el.style.setProperty('--k', k.toFixed(3)); }
        const on = op > 0.5;
        if (on !== b.on) { b.on = on; b.el.classList.toggle('on', on); }
      });
    }

    // Gated seeks
    let seekBusy = false, pendingTime = null;
    function requestSeek(t) {
      if (!video.duration) return;
      if (seekBusy) { pendingTime = t; return; }
      seekBusy = true;
      video.currentTime = t;
    }
    video.addEventListener('seeked', () => {
      seekBusy = false;
      if (pendingTime !== null) { const t = pendingTime; pendingTime = null; requestSeek(t); }
    });
    video.addEventListener('error', () => { seekBusy = false; pendingTime = null; failVideo(); });

    // Lerped time, loop rests when converged or off screen
    let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
    function tick(now) {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) { shown = target; rafId = null; lastTick = 0; }
      else rafId = requestAnimationFrame(tick);
      requestSeek(shown * video.duration);
      updateCaptions(shown);
    }
    function onScroll() {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    }
    new IntersectionObserver(es => {
      heroOnScreen = es[0].isIntersecting;
      if (heroOnScreen) onScroll();
    }).observe(hero);

    // Poster first, then the video as a streamed Blob behind an honest ring
    function failVideo() {
      if (stage.classList.contains('video-failed')) return;
      stage.classList.add('video-failed');
      video.style.display = 'none';
      if (ring) ring.outerHTML = '<svg class="chev" viewBox="0 0 22 12" fill="none" aria-hidden="true"><path d="M1 1l10 10L21 1" stroke="currentColor" stroke-width="1.5"/></svg>';
    }
    async function loadHeroBlob() {
      const ctrl = new AbortController();
      let watchdog = setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(VIDEO_URL, { priority: 'low', signal: ctrl.signal });
      if (!res.ok) throw new Error('video ' + res.status);
      const total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES;
      const reader = res.body.getReader();
      const chunks = [];
      let got = 0, lastRing = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        clearTimeout(watchdog);
        watchdog = setTimeout(() => ctrl.abort(), 20000);
        chunks.push(value);
        got += value.length;
        const frac = Math.min(1, got / total);
        const now = performance.now();
        if (now - lastRing > 100 || frac === 1) {
          lastRing = now;
          ring.style.setProperty('--ld', Math.round(126 * (1 - frac)));
        }
      }
      clearTimeout(watchdog);
      ring.style.setProperty('--ld', 0);
      video.src = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }));
      video.load();
      video.addEventListener('canplay', () => {
        requestSeek(heroProgress() * video.duration);
        stage.classList.add('video-ready');
      }, { once: true });
    }
    let inited = false, started = false;
    function startBlobFetch() {
      if (started) return;
      started = true;
      loadHeroBlob().catch(failVideo);
    }
    function initHeroOnce() {
      if (inited) return;
      inited = true;
      posterLayer.style.backgroundImage = "url('" + POSTER_URL + "')";
      const img = new Image();
      img.onload = startBlobFetch;
      img.onerror = startBlobFetch;
      img.src = POSTER_URL;
      setTimeout(startBlobFetch, 4000);
      // Band one assembles on load, then holds
      const t0 = performance.now();
      (function ramp(now) {
        loadK = clamp((now - t0 - 250) / 1300, 0, 1);
        loadK = loadK * loadK * (3 - 2 * loadK);
        if (scrubOn) updateCaptions(shown);
        if (loadK < 1) requestAnimationFrame(ramp);
      })(t0);
    }

    // The five gates, decided live
    const GATES = [
      '(max-width: 720px)',
      '(orientation: portrait) and (max-width: 1024px)',
      '(orientation: portrait) and (pointer: coarse)',
      '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
      '(prefers-reduced-motion: reduce)'
    ];
    let scrubOn = false;
    function enableScrub() {
      if (scrubOn) return;
      scrubOn = true;
      initHeroOnce();
      addEventListener('scroll', onScroll, { passive: true });
      bands.forEach(b => { b.op = -1; b.k = -1; b.on = null; });
      shown = target = heroProgress();
      updateCaptions(shown);
      onScroll();
    }
    function disableScrub() {
      if (!scrubOn) return;
      scrubOn = false;
      removeEventListener('scroll', onScroll);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }
    applyHeroMode = () => {
      if (GATES.some(q => matchMedia(q).matches)) disableScrub();
      else enableScrub();
    };
    const MQLS = GATES.map(q => matchMedia(q));
    MQLS.forEach(m => m.addEventListener('change', applyHeroMode));
    applyHeroMode();
  }

  // ── Reduced motion, live in both directions ───────────────────
  function pinToFinalStates() {
    root.classList.add('pinned');
    draws.forEach(el => { el.style.setProperty('--d', '1'); drawLast.set(el, 1); });
    if (vault && vault._finish) vault._finish();
  }
  function unpinFinalStates() {
    root.classList.remove('pinned');
    drawLast.clear();
    syncDraws();
  }
  reduced.addEventListener('change', e => {
    if (e.matches) pinToFinalStates();
    else { unpinFinalStates(); applyHeroMode(); }
  });
  if (reduced.matches) pinToFinalStates();

  // ── Forms ─────────────────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = $('button[type="submit"]', form);
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = root.lang === 'fr' ? 'Envoi…' : 'Sending…';
      success.classList.remove('is-shown');
      error.classList.remove('is-shown');
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        success.classList.add('is-shown');
      } catch {
        error.classList.add('is-shown');
      } finally {
        btn.innerHTML = label;
        btn.disabled = false;
      }
    });
  }
})();
