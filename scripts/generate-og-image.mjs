/**
 * Generates the social preview image used by Open Graph and Twitter cards.
 *
 * Output: public/og-image.png (1200x630)
 */
import sharp from 'sharp'

const width = 1200
const height = 630

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="72%" cy="38%" r="58%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.55"/>
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
  <circle cx="940" cy="180" r="190" fill="#22d3ee" opacity="0.08"/>
  <circle cx="1010" cy="260" r="280" fill="#a855f7" opacity="0.08"/>
  <path d="M90 505 H1110" stroke="url(#line)" stroke-width="3"/>
  <text x="88" y="175" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="700" letter-spacing="-2">Aleix Auqué</text>
  <text x="92" y="245" fill="#22d3ee" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">Software Developer</text>
  <text x="92" y="327" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="30">React · Three.js · Laravel · Cloudflare</text>
  <text x="92" y="382" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="24">Interactive web experiences, full-stack projects and production-ready UI.</text>
  <text x="92" y="545" fill="#e2e8f0" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600">aleixaj.com</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')

