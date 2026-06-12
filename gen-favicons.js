const sharp = require('sharp');
const toIco = require('to-ico');
const fs    = require('fs');
const path  = require('path');

// SVG source: gold "S" on dark navy, rounded corners — matches logo-icon in CSS
const svgSrc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#e8a020"/>
      <stop offset="100%" stop-color="#f5c842"/>
    </linearGradient>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#0d1830"/>
      <stop offset="100%" stop-color="#070d1a"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="512" height="512" rx="110" ry="110" fill="url(#bg)"/>
  <!-- Inner glow -->
  <rect width="512" height="512" rx="110" ry="110"
        fill="none" stroke="rgba(232,160,32,0.18)" stroke-width="8"/>
  <!-- S letterform — bold, centered -->
  <text
    x="256" y="360"
    font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
    font-weight="900"
    font-size="340"
    text-anchor="middle"
    fill="url(#g)"
    letter-spacing="-8"
  >S</text>
</svg>`;

async function generate() {
  const buf = Buffer.from(svgSrc);

  const sizes = [
    { name: 'favicon-16x16.png',    size: 16  },
    { name: 'favicon-32x32.png',    size: 32  },
    { name: 'favicon-48x48.png',    size: 48  },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png',  size: 192 },
    { name: 'favicon-512x512.png',  size: 512 },
  ];

  const pngBuffers = {};

  for (const { name, size } of sizes) {
    const png = await sharp(buf)
      .resize(size, size)
      .png({ compressionLevel: 9, quality: 100 })
      .toBuffer();

    fs.writeFileSync(path.join(__dirname, name), png);
    pngBuffers[size] = png;
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // favicon.ico — bundles 16, 32, 48
  const ico = await toIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]]);
  fs.writeFileSync(path.join(__dirname, 'favicon.ico'), ico);
  console.log('✓ favicon.ico (16+32+48)');

  // site.webmanifest for PWA / Android
  const manifest = {
    name: 'Sonadive Analytics',
    short_name: 'Sonadive',
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#070d1a',
    background_color: '#070d1a',
    display: 'standalone',
  };
  fs.writeFileSync(path.join(__dirname, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ site.webmanifest');

  console.log('\nAll favicon assets generated successfully.');
}

generate().catch(err => { console.error(err); process.exit(1); });
