// ===== HERO DATA CONSTELLATION =====
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  // Palette: blue / gold / white / dim — mirrors the brand accents
  const PALETTE = [
    { c: '59,158,255',  w: 30 },  // blue
    { c: '232,160,32',  w: 28 },  // gold
    { c: '255,255,255', w: 22 },  // white
    { c: '120,140,170', w: 20 },  // dim slate
  ];

  function pickColor() {
    let r = Math.random() * 100;
    for (const p of PALETTE) { if ((r -= p.w) <= 0) return p.c; }
    return PALETTE[0].c;
  }

  const MAX_DIST = 138;

  // Node count tracks the hero area so density stays even at any size.
  function nodeCount() {
    return Math.min(150, Math.max(45, Math.round((W * H) / 9500)));
  }

  let nodes = [];
  function buildNodes() {
    nodes = Array.from({ length: nodeCount() }, () => {
      const hub = Math.random() < 0.12;
      return {
        // Full-bleed: the web spans the entire hero, edge to edge.
        bx: Math.random(),
        by: Math.random(),
        r: hub ? 2.8 + Math.random() * 1.1 : 1.1 + Math.random() * 1.4,
        hub,
        color: pickColor(),
        alpha: 0.45 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.22,
        amp: 0.004 + Math.random() * 0.009,
      };
    });
  }
  buildNodes();

  function positions(t) {
    return nodes.map(n => {
      const drift = reduceMotion ? 0 : 1;
      return {
        n,
        x: (n.bx + Math.sin(t * n.speed + n.phase) * n.amp * drift) * W,
        y: (n.by + Math.cos(t * n.speed * 0.8 + n.phase) * n.amp * drift) * H,
      };
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const pts = positions(t);

    // Connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.16;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(150,175,210,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Nodes + halos
    pts.forEach(({ n, x, y }) => {
      const twinkle = reduceMotion ? 1 : 0.82 + Math.sin(t * n.speed * 2 + n.phase) * 0.18;

      ctx.beginPath();
      ctx.arc(x, y, n.r * (n.hub ? 5 : 3.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},${(n.hub ? 0.1 : 0.05) * twinkle})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},${n.alpha * twinkle})`;
      ctx.fill();
    });
  }

  // Paint once up front so the canvas is never blank, even if rAF is
  // throttled (hidden tab) or motion is reduced.
  draw(0);

  let start = null;
  function frame(ts) {
    if (start === null) start = ts;
    draw((ts - start) / 1000);
    requestAnimationFrame(frame);
  }

  if (!reduceMotion) requestAnimationFrame(frame);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      buildNodes();
      draw(0);
    }, 150);
  }, { passive: true });
})();

// ===== CONTACT FORM =====
(function () {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('formSubmitBtn');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    success.style.display = 'none';
    error.style.display = 'none';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        success.style.display = 'flex';
        btn.textContent = 'Send Message →';
        btn.disabled = false;
      } else {
        throw new Error();
      }
    } catch {
      error.style.display = 'block';
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }
  });
})();
