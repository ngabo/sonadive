const sharp = require('sharp');
const toIco = require('to-ico');
const fs    = require('fs');
const path  = require('path');

// Simple bold white "S" on solid black — matches the reference favicon exactly.
const svgSrc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0a0a0a"/>
  <text
    x="256" y="378"
    font-family="Arial Black, 'Helvetica Neue', Arial, sans-serif"
    font-weight="900"
    font-size="360"
    text-anchor="middle"
    fill="#ffffff"
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

  const ico = await toIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]]);
  fs.writeFileSync(path.join(__dirname, 'favicon.ico'), ico);
  console.log('✓ favicon.ico (16+32+48)');

  fs.writeFileSync(path.join(__dirname, 'favicon.svg'), svgSrc + '\n');
  console.log('✓ favicon.svg');

  const manifest = {
    name: 'Sonadive Analytics',
    short_name: 'Sonadive',
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#0a0a0a',
    background_color: '#0a0a0a',
    display: 'standalone',
  };
  fs.writeFileSync(path.join(__dirname, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ site.webmanifest');

  console.log('\nAll favicon assets generated successfully.');
}

generate().catch(err => { console.error(err); process.exit(1); });
