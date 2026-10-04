/**
 * Generates the social preview image used by Open Graph and Twitter cards:
 * name and role on the left, the featured projects' logos on the right, in the
 * same order as the projects section.
 *
 * Output: public/og-image.png (1200x630)
 */
import sharp from 'sharp'

const width = 1200
const height = 630

// featured projects, as in src/consts/projects.js
const LOGOS = [
  'obsidian-pixelart.webp',
  'orbex-icon.webp',
  'nexus-logo.webp',
  'waymark-logo.webp',
  'nadir-logo.webp',
  'kylen-chat.webp',
]
const TILE = 150
const GAP = 18
const GRID_X = 654
const GRID_Y = 138
const LOGO = 118
const tileAt = i => ({ x: GRID_X + (i % 3) * (TILE + GAP), y: GRID_Y + Math.floor(i / 3) * (TILE + GAP) })

const tiles = LOGOS.map((_, i) => {
  const { x, y } = tileAt(i)
  return `<rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="22" fill="#0b1220" stroke="#22d3ee" stroke-opacity="0.35" stroke-width="2"/>`
}).join('\n  ')

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="76%" cy="44%" r="60%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.38"/>
      <stop offset="45%" stop-color="#0f172a" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="line" x1="0" x2="1">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0"/>
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#020617"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1010" cy="300" r="300" fill="#a855f7" opacity="0.07"/>
  <path d="M90 530 H1110" stroke="url(#line)" stroke-width="3"/>
  ${tiles}
  <text x="88" y="200" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" letter-spacing="-2">Aleix Auqué</text>
  <text x="92" y="266" fill="#22d3ee" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700">Software Developer</text>
  <text x="92" y="340" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="27">JavaScript · TypeScript · PHP</text>
  <text x="92" y="378" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="27">React · Laravel · Three.js · AI agents</text>
  <text x="92" y="436" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="23">Full-stack web, desktop apps and games,</text>
  <text x="92" y="466" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="23">shipped and open source.</text>
  <text x="92" y="578" fill="#e2e8f0" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600">aleixaj.com</text>
</svg>`

// each logo fitted inside its tile, with rounded corners so square artwork matches the tile
const mask = Buffer.from(`<svg width="${LOGO}" height="${LOGO}"><rect width="${LOGO}" height="${LOGO}" rx="16" fill="#fff"/></svg>`)
const logos = await Promise.all(LOGOS.map(async (file, i) => {
  const input = await sharp(`public/${file}`)
    .resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
  const { x, y } = tileAt(i)
  const pad = (TILE - LOGO) / 2
  return { input, left: x + pad, top: y + pad }
}))

await sharp(Buffer.from(svg)).composite(logos).png().toFile('public/og-image.png')
