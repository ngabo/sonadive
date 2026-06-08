// ===== SPARKLINES =====
function sparkline(id, data, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{ data, borderColor: color, borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.4 }]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } }, animation: false }
  });
}
sparkline('sparkline1', [4, 6, 5, 8, 7, 10, 9, 12], '#34d399');
sparkline('sparkline2', [18, 20, 19, 22, 21, 23, 22, 24], '#34d399');
sparkline('sparkline3', [96, 97, 96.5, 97.5, 98, 97.8, 98.4, 98.6], '#34d399');

// ===== REVENUE TREND =====
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
  new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        data: [2, 3, 4, 5, 4.5, 6, 7, 8, 9, 10, 11, 12.45],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.12)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.45
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8a9ab5', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
        y: { ticks: { color: '#8a9ab5', font: { size: 9 }, callback: v => v + 'M' }, grid: { color: 'rgba(255,255,255,0.04)' } }
      }
    }
  });
}

// ===== DONUT CHART =====
const donutCtx = document.getElementById('donutChart');
if (donutCtx) {
  new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Retail', 'Finance', 'Healthcare', 'Technology'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ['#3b82f6', '#e8a020', '#14b8a6', '#64748b'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      cutout: '68%'
    }
  });
}

// ===== CASE STUDY CHARTS =====
const csChart1 = document.getElementById('csChart1');
if (csChart1) {
  new Chart(csChart1, {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { data: [30, 45, 55, 65], backgroundColor: '#3b82f6', borderRadius: 4, barThickness: 14 },
        { data: [25, 38, 48, 58], backgroundColor: '#e8a020', borderRadius: 4, barThickness: 14 }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8a9ab5', font: { size: 9 } }, grid: { display: false } },
        y: { display: false, grid: { display: false } }
      }
    }
  });
}

const csDonut = document.getElementById('csDonut');
if (csDonut) {
  new Chart(csDonut, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [27, 73],
        backgroundColor: ['#e8a020', '#1e3050'],
        borderWidth: 0
      }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '70%' }
  });
}

const csChart2 = document.getElementById('csChart2');
if (csChart2) {
  new Chart(csChart2, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        data: [60, 65, 70, 75, 80, 88],
        borderColor: '#e8a020',
        backgroundColor: 'rgba(232,160,32,0.1)',
        borderWidth: 2, pointRadius: 0, fill: true, tension: 0.4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8a9ab5', font: { size: 9 } }, grid: { display: false } },
        y: { display: false }
      }
    }
  });
}
