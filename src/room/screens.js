/**
 * Pictures painted onto the room's screens with a 2D canvas: the TV and the
 * right monitor. Each function returns a THREE.CanvasTexture ready to go on
 * their materials.
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
export function monitorTexture(project, label) {
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
  img.onload = () => paint(img)
  img.src = project.img
  return tex
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
