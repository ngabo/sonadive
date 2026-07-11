const sharp = require('sharp');
const toIco = require('to-ico');
const fs    = require('fs');
const path  = require('path');

const SRC_HIRES = 'C:\\Users\\chadr\\Downloads\\Gemini_Generated_Image_jjbl4gjjbl4gjjbl.png';
// Crop bounds for the icon mark, computed from the full-res source (2816x1536)
const CROP = { left: 1119, top: 227, width: 641, height: 783 };

async function removeBackground(inputPath, crop) {
  const image = sharp(inputPath).extract(crop).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const bg = [245, 249, 252]; // sampled previously from the source background
  const dist = (r, g, b) => Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);
  const FULL_T = 14, FEATHER_T = 45;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const d = dist(r, g, b);
    if (d <= FULL_T) data[i + 3] = 0;
    else if (d < FEATHER_T) data[i + 3] = Math.round(((d - FULL_T) / (FEATHER_T - FULL_T)) * 255);
  }
  return sharp(Buffer.from(data), { raw: { width, height, channels } });
}

async function generate() {
  const iconSharp = await removeBackground(SRC_HIRES, CROP);
  const iconBuf = await iconSharp.png().toBuffer();

  // Square master (transparent bg), icon centered with padding
  const CANVAS = 512;
  const pad = 40;
  const fit = CANVAS - pad * 2;

  const squareTransparent = () => sharp({
    create: { width: CANVAS, height: CANVAS, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  }).composite([{ input: iconBuf, gravity: 'center' }]).png();

  // Build a properly centered/scaled composite manually (resize icon to fit box first)
  async function buildSquare(bgColor) {
    const resizedIcon = await sharp(iconBuf).resize({ width: fit, height: fit, fit: 'inside' }).toBuffer();
    return sharp({
      create: { width: CANVAS, height: CANVAS, channels: 4, background: bgColor }
    }).composite([{ input: resizedIcon, gravity: 'center' }]).png();
  }

  const transparentMaster = await buildSquare({ r: 0, g: 0, b: 0, alpha: 0 });
  const transparentMasterBuf = await transparentMaster.toBuffer();

  const darkMaster = await buildSquare('#070d1a');
  const darkMasterBuf = await darkMaster.toBuffer();

  fs.writeFileSync(path.join(__dirname, 'logo-icon-master.png'), transparentMasterBuf);

  const sizes = [
    { name: 'favicon-16x16.png',    size: 16,  src: transparentMasterBuf },
    { name: 'favicon-32x32.png',    size: 32,  src: transparentMasterBuf },
    { name: 'favicon-48x48.png',    size: 48,  src: transparentMasterBuf },
    { name: 'favicon-192x192.png',  size: 192, src: transparentMasterBuf },
    { name: 'favicon-512x512.png',  size: 512, src: transparentMasterBuf },
    { name: 'apple-touch-icon.png', size: 180, src: darkMasterBuf }, // iOS needs opaque bg
  ];

  const pngBuffers = {};
  for (const { name, size, src } of sizes) {
    const png = await sharp(src).resize(size, size).png({ compressionLevel: 9, quality: 100 }).toBuffer();
    fs.writeFileSync(path.join(__dirname, name), png);
    if (src === transparentMasterBuf) pngBuffers[size] = png;
    console.log(`✓ ${name} (${size}x${size})`);
  }

  const ico = await toIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]]);
  fs.writeFileSync(path.join(__dirname, 'favicon.ico'), ico);
  console.log('✓ favicon.ico (16+32+48)');

  // favicon.svg: embed the 192px PNG as a data URI (keeps file size reasonable)
  const b64 = pngBuffers[192].toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">\n  <image href="data:image/png;base64,${b64}" width="512" height="512"/>\n</svg>\n`;
  fs.writeFileSync(path.join(__dirname, 'favicon.svg'), svg);
  console.log('✓ favicon.svg');

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
