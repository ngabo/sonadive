// ===== HERO DATA NETWORK (static) =====
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); draw(); }, { passive: true });

  const COLORS = ['rgba(232,160,32,', 'rgba(59,130,246,', 'rgba(20,184,166,'];
  const NODE_COUNT = 55;
  const MAX_DIST = 140;

  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 2 + 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.5 + Math.random() * 0.2,
  }));

  // ── Decorative ascending bar chart (right side, blue → gold) ──
  const BAR_COUNT = 9;
  function drawBarChart() {
    const x0 = canvas.width * 0.60;
    const w = canvas.width * 0.30;
    const bottom = canvas.height * 0.66;
    const h = canvas.height * 0.30;
    const gap = w / BAR_COUNT;
    const barW = gap * 0.5;

    for (let i = 0; i < BAR_COUNT; i++) {
      const p = i / (BAR_COUNT - 1);
      const barH = Math.max(6, (0.18 + p * 0.82) * h);
      const x = x0 + i * gap;
      const y = bottom - barH;
      const r = Math.round(59 + (232 - 59) * p);
      const g = Math.round(130 + (160 - 130) * p);
      const b = Math.round(246 + (32 - 246) * p);
      const grad = ctx.createLinearGradient(0, y, 0, bottom);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0.08)`);
      ctx.fillStyle = grad;
      const rad = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + rad);
      ctx.arcTo(x, y, x + rad, y, rad);
      ctx.arcTo(x + barW, y, x + barW, y + rad, rad);
      ctx.lineTo(x + barW, bottom);
      ctx.lineTo(x, bottom);
      ctx.closePath();
      ctx.fill();
    }
  }

  // ── Gold particle wave (bottom, rising left → right) ──
  const WAVE_PARTICLES = Array.from({ length: 36 }, () => ({
    p: Math.random(),
    size: Math.random() * 1.6 + 0.8,
    offset: Math.random() * 16 - 8,
  }));

  function wavePoint(px) {
    const x = px * canvas.width;
    const baseY = canvas.height * (0.86 - px * 0.32);
    const y = baseY + Math.sin(px * 6) * 14;
    return [x, y];
  }

  function drawWave() {
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const px = i / 60;
      const [x, y] = wavePoint(px);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, 'rgba(232,160,32,0)');
    grad.addColorStop(0.55, 'rgba(232,160,32,0.45)');
    grad.addColorStop(1, 'rgba(245,200,66,0.8)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(232,160,32,0.5)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();

    WAVE_PARTICLES.forEach(pt => {
      const [x, y] = wavePoint(pt.p);
      const alpha = Math.sin(pt.p * Math.PI);
      ctx.beginPath();
      ctx.arc(x, y + pt.offset * 0.3, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,200,66,${0.15 + alpha * 0.65})`;
      ctx.fill();
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBarChart();
    drawWave();

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x - nodes[j].x) * canvas.width;
        const dy = (nodes[i].y - nodes[j].y) * canvas.height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * canvas.width, nodes[i].y * canvas.height);
          ctx.lineTo(nodes[j].x * canvas.width, nodes[j].y * canvas.height);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const x = n.x * canvas.width, y = n.y * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + n.alpha + ')';
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(x, y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.06)';
      ctx.fill();
    });
  }

  draw();
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
