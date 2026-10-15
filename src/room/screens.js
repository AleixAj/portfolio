/**
 * Pictures painted onto the room's screens with a 2D canvas: the TV (my stack,
 * or the technology you're looking at) and the two monitors (the project
 * you're looking at: its picture on the right, its details on the left). Each function returns a THREE.CanvasTexture ready to go
 * on their materials.
 *
 * The scene only draws frames when something changes, so the ones that finish
 * painting later (after an image loads) call `onPainted` to ask for a frame.
 *
 * (The phone's screen only uses a tiny corner of its texture, so it keeps the
 * original picture from the model.)
 */
import * as THREE from 'three'

const CYAN = '#22d3ee'
const FONT = '"Space Grotesk", "DM Sans", sans-serif'

function makeCanvas(w, h) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return [canvas, canvas.getContext('2d')]
}

// The TV and monitor UVs run bottom-up, so unlike most glTF textures these
// keep flipY on (checked with a test pattern)
function toTexture(canvas) {
  const tex = new THREE.CanvasTexture(canvas)
  tex.flipY = true
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

// Dark background with a soft cyan glow, shared by every screen
function paintBackground(ctx, w, h, glowX = 0.5, glowY = 0.4) {
  ctx.fillStyle = '#04070b'
  ctx.fillRect(0, 0, w, h)
  const g = ctx.createRadialGradient(w * glowX, h * glowY, 0, w * glowX, h * glowY, Math.max(w, h) * 0.7)
  g.addColorStop(0, 'rgba(34,211,238,0.22)')
  g.addColorStop(1, 'rgba(34,211,238,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

/**
 * TV: a streaming-style title card for my career, "the series".
 * texts: { kicker, title, meta, play }
 */
export function tvTexture({ kicker, title, meta, play }) {
  const w = 1024, h = 576
  const [canvas, ctx] = makeCanvas(w, h)
  paintBackground(ctx, w, h, 0.75, 0.3)

  // Faint scanlines, like an old screen
  ctx.fillStyle = 'rgba(255,255,255,0.025)'
  for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1)

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = CYAN
  ctx.font = `600 26px ${FONT}`
  ctx.fillText(kicker.toUpperCase().split('').join(' '), 72, 190)

  ctx.fillStyle = '#ffffff'
  ctx.font = `700 92px ${FONT}`
  ctx.fillText(title, 68, 290)

  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = `500 30px ${FONT}`
  ctx.fillText(meta, 72, 345)

  // Play button
  ctx.fillStyle = '#ffffff'
  roundRect(ctx, 72, 395, 210, 64, 12)
  ctx.fill()
  ctx.fillStyle = '#04070b'
  ctx.beginPath()
  ctx.moveTo(100, 410); ctx.lineTo(100, 444); ctx.lineTo(128, 427); ctx.closePath()
  ctx.fill()
  ctx.font = `700 28px ${FONT}`
  ctx.fillText(play, 142, 437)

  // Progress bar along the bottom
  ctx.fillStyle = 'rgba(255,255,255,0.15)'
  ctx.fillRect(72, 520, w - 144, 6)
  ctx.fillStyle = CYAN
  ctx.fillRect(72, 520, (w - 144) * 0.82, 6)

  return toTexture(canvas)
}

/**
 * Right monitor: the project you're looking at in the panel.
 * Starts with just the title and draws the image in once it has loaded.
 */
export function monitorTexture(project, label, onPainted) {
  const w = 1024, h = 628
  const [canvas, ctx] = makeCanvas(w, h)
  const tex = toTexture(canvas)

  const paint = (img) => {
    paintBackground(ctx, w, h, 0.5, 0.35)
    // Window bar, like an app
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    ctx.fillRect(0, 0, w, 44)
    ;['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c
      ctx.beginPath(); ctx.arc(30 + i * 26, 22, 8, 0, Math.PI * 2); ctx.fill()
    })
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = `500 20px ${FONT}`
    ctx.fillText(label, 120, 29)

    if (img) {
      const box = 360
      const s = Math.min(box / img.width, box / img.height)
      const iw = img.width * s, ih = img.height * s
      ctx.drawImage(img, (w - iw) / 2, 80 + (box - ih) / 2, iw, ih)
    }
    ctx.fillStyle = '#ffffff'
    ctx.font = `700 54px ${FONT}`
    ctx.textAlign = 'center'
    ctx.fillText(project.title, w / 2, 510)
    ctx.fillStyle = CYAN
    ctx.font = `500 24px ${FONT}`
    ctx.fillText(project.tags.slice(0, 4).map(t => t.label).join('  ·  '), w / 2, 556)
    ctx.textAlign = 'left'
    tex.needsUpdate = true
  }

  paint(null)
  const img = new Image()
  img.onload = () => { paint(img); onPainted?.() }
  img.src = project.img
  return tex
}

/**
 * Left monitor: the details of the project you're looking at, like a README.
 * It's a two-panel screen with a bezel down the middle, so the text goes in two
 * columns that leave the centre free: what it is and its status on the left,
 * the highlights and the stack on the right.
 * text: { summary, highlights[], stack, status: { ok, label, text } }
 * labels: { highlights }
 */
export function projectInfoTexture(title, text, labels) {
  const w = 1024, h = 628
  const [canvas, ctx] = makeCanvas(w, h)
  paintBackground(ctx, w, h, 0.25, 0.3)
  const pad = 44
  const colW = w / 2 - pad - 36
  const rightX = w / 2 + 36

  // Left column: title, summary and status
  ctx.fillStyle = CYAN
  ctx.font = `600 18px ${FONT}`
  ctx.fillText('README.md', pad, 62)
  ctx.fillStyle = '#ffffff'
  let size = 48
  ctx.font = `700 ${size}px ${FONT}`
  while (ctx.measureText(title).width > colW && size > 30) {
    size -= 2
    ctx.font = `700 ${size}px ${FONT}`
  }
  ctx.fillText(title, pad, 118)

  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = `500 23px ${FONT}`
  wrapLines(ctx, text.summary, colW, 8).forEach((line, i) => ctx.fillText(line, pad, 170 + i * 32))

  // Status card at the bottom: green when finished, amber for the next step
  const tone = text.status.ok ? '#34d399' : '#fbbf24'
  ctx.font = `500 19px ${FONT}`
  const statusLines = wrapLines(ctx, text.status.text, colW - 36, 3)
  const cardH = 60 + statusLines.length * 26
  const cardY = h - pad - cardH
  ctx.fillStyle = hexToRgba(tone, 0.08)
  roundRect(ctx, pad, cardY, colW, cardH, 14)
  ctx.fill()
  ctx.strokeStyle = hexToRgba(tone, 0.4)
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = tone
  ctx.font = `700 17px ${FONT}`
  ctx.fillText(text.status.label.toUpperCase(), pad + 18, cardY + 32)
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.font = `500 19px ${FONT}`
  statusLines.forEach((line, i) => ctx.fillText(line, pad + 18, cardY + 60 + i * 26))

  // Right column: highlights, then the stack
  ctx.fillStyle = CYAN
  ctx.font = `600 18px ${FONT}`
  ctx.fillText(labels.highlights.toUpperCase().split('').join(' '), rightX, 62)
  let y = 104
  ctx.font = `500 21px ${FONT}`
  for (const item of text.highlights.slice(0, 5)) {
    const lines = wrapLines(ctx, item, colW - 26, 2)
    if (y + lines.length * 28 > h - 150) break
    ctx.fillStyle = CYAN
    ctx.beginPath(); ctx.arc(rightX + 6, y - 7, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    lines.forEach((line, i) => ctx.fillText(line, rightX + 26, y + i * 28))
    y += lines.length * 28 + 14
  }

  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.fillRect(rightX, h - 132, colW, 2)
  ctx.fillStyle = CYAN
  ctx.font = `500 19px ${FONT}`
  wrapLines(ctx, text.stack, colW, 3).forEach((line, i) => ctx.fillText(line, rightX, h - 98 + i * 27))

  return toTexture(canvas)
}

/**
 * TV: one technology from the Skills panel. Its logo in its brand colour, the
 * category, the name and one line about what I use it for.
 * skill: { name, category, desc, color, icon: { svg } | { src } }
 */
export function skillTvTexture(skill, onPainted) {
  const w = 1024, h = 576
  const [canvas, ctx] = makeCanvas(w, h)
  const tex = toTexture(canvas)
  const box = { x: 72, y: 150, size: 230 }
  const textX = box.x + box.size + 56
  const textW = w - textX - 64

  const paint = (logo) => {
    paintBackground(ctx, w, h, 0.25, 0.45)

    // Logo tile, tinted with the brand colour
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, box.x, box.y, box.size, box.size, 36)
    ctx.fill()
    ctx.strokeStyle = hexToRgba(skill.color, 0.55)
    ctx.lineWidth = 3
    ctx.stroke()
    if (logo) {
      const s = (box.size * 0.6) / Math.max(logo.width, logo.height)
      const lw = logo.width * s, lh = logo.height * s
      // Picture logos are pixel art (PixelLab): keep the pixels sharp
      ctx.imageSmoothingEnabled = !skill.icon.src
      ctx.drawImage(logo, box.x + (box.size - lw) / 2, box.y + (box.size - lh) / 2, lw, lh)
      ctx.imageSmoothingEnabled = true
    }

    ctx.fillStyle = CYAN
    ctx.font = `600 24px ${FONT}`
    ctx.fillText(skill.category.toUpperCase().split('').join(' '), textX, 196)

    ctx.fillStyle = '#ffffff'
    let size = 76
    ctx.font = `700 ${size}px ${FONT}`
    while (ctx.measureText(skill.name).width > textW && size > 40) {
      size -= 2
      ctx.font = `700 ${size}px ${FONT}`
    }
    ctx.fillText(skill.name, textX - 4, 276)

    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.font = `500 30px ${FONT}`
    wrapLines(ctx, skill.desc, textW, 4).forEach((line, i) => ctx.fillText(line, textX, 334 + i * 42))

    // Thin bar along the bottom, like the title card
    ctx.fillStyle = hexToRgba(skill.color, 0.9)
    ctx.fillRect(72, 520, w - 144, 6)
    tex.needsUpdate = true
  }

  paint(null)
  const logo = new Image()
  logo.onload = () => { paint(logo); onPainted?.() }
  logo.src = skill.icon.src ?? svgDataUrl(skill.icon.svg, skill.color)
  return tex
}

// An icon's SVG markup as an image URL, coloured and at a size the canvas can scale
function svgDataUrl(svg, color) {
  // Only the opening <svg> tag is touched: its own size and colour attributes
  // are replaced (a repeated attribute would make the SVG invalid)
  const markup = svg.replace(/<svg[^>]*>/, (tag) => {
    const attrs = tag
      .replace(/^<svg|>$/g, '')
      .replace(/\s(width|height|color|style|xmlns)="[^"]*"/g, '')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" color="${color}"${attrs}>`
  })
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`
}

// Splits text into lines that fit `maxWidth`, with "…" if it runs past `maxLines`
function wrapLines(ctx, text, maxWidth, maxLines) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width <= maxWidth) { line = next; continue }
    lines.push(line)
    line = word
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '…')
  }
  return lines
}

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
