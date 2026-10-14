/**
 * A floating bookshelf on the back wall, above the desk. It isn't in the
 * original model; it's built here from simple boxes.
 *
 * Every book is a job (bottom shelf) or a course (top shelf), with the name
 * painted on its spine. A cyan LED strip under each shelf keeps the gamer look.
 *
 * Coordinates are model units (see roomConfig.js), because it lives inside the
 * same scaled group as the model. All meshes are named "shelf_..." so hover and
 * click work like the rest of the room.
 */
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

// Wall is at z ≈ 116; the shelves stick out 26 units from it
const WALL_Z = 117
const DEPTH = 26
const LEFT = 640
const RIGHT = 945
const SHELVES_Y = [872, 985] // top surface of each board
const BOOK_COLORS = ['#0e7490', '#4c1d95', '#155e75', '#1e3a8a', '#7c2d12', '#134e4a', '#3b0764', '#0f172a']

function spineTexture(text, color) {
  const w = 64, h = 320
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)
  // Two thin bands, like a printed spine
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fillRect(0, 18, w, 3)
  ctx.fillRect(0, h - 21, w, 3)
  ctx.save()
  ctx.translate(w / 2, h / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let size = 30
  ctx.font = `700 ${size}px "Space Grotesk", sans-serif`
  while (ctx.measureText(text).width > h - 60 && size > 14) {
    size -= 1
    ctx.font = `700 ${size}px "Space Grotesk", sans-serif`
  }
  ctx.fillText(text, 0, 0)
  ctx.restore()
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

// Lays out books from left to right with slightly different sizes,
// so the row doesn't look machine-made
function layoutBooks(names, y, startX, seed) {
  let x = startX
  return names.map((name, i) => {
    const r = Math.abs(Math.sin((i + 1) * 12.9898 + seed) * 43758.5453) % 1
    const thick = 13 + r * 6
    const height = 58 + r * 16
    const book = { name, x: x + thick / 2, y: y + height / 2, thick, height, color: BOOK_COLORS[(i + seed) % BOOK_COLORS.length] }
    x += thick + 1.2
    return book
  })
}

function Book({ book, glow }) {
  const spineTex = useMemo(() => spineTexture(book.name, book.color), [book.name, book.color])
  useEffect(() => () => spineTex.dispose(), [spineTex])

  // BoxGeometry faces: +x, -x, +y, -y, +z (the spine, facing the room), -z
  const side = { color: book.color, roughness: 0.7, emissive: book.color, emissiveIntensity: glow ? 0.5 : 0.25 }
  const pages = { color: '#d6d3c4', roughness: 0.9, emissive: '#d6d3c4', emissiveIntensity: 0.08 }
  return (
    <mesh name={`shelf_book_${book.name}`} position={[book.x, book.y, WALL_Z + DEPTH / 2]}>
      <boxGeometry args={[book.thick, book.height, DEPTH - 4]} />
      <meshStandardMaterial attach="material-0" {...side} />
      <meshStandardMaterial attach="material-1" {...side} />
      <meshStandardMaterial attach="material-2" {...pages} />
      <meshStandardMaterial attach="material-3" {...pages} />
      <meshStandardMaterial attach="material-4" map={spineTex} emissiveMap={spineTex} emissive="#ffffff" emissiveIntensity={glow ? 0.9 : 0.45} roughness={0.6} />
      <meshStandardMaterial attach="material-5" {...side} />
    </mesh>
  )
}

function Trophy({ x, y }) {
  return (
    <group name="shelf_trophy" position={[x, y, WALL_Z + DEPTH / 2]}>
      <mesh name="shelf_trophy_base" position={[0, 4, 0]}>
        <boxGeometry args={[18, 8, 14]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <mesh name="shelf_trophy_stem" position={[0, 14, 0]}>
        <cylinderGeometry args={[2.2, 3, 12, 12]} />
        <meshStandardMaterial color="#f5c542" metalness={0.8} roughness={0.25} emissive="#a16207" emissiveIntensity={0.4} />
      </mesh>
      <mesh name="shelf_trophy_cup" position={[0, 28, 0]}>
        <cylinderGeometry args={[9, 4, 18, 20]} />
        <meshStandardMaterial color="#f5c542" metalness={0.8} roughness={0.25} emissive="#a16207" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

export default function Bookshelf({ jobs, courses, glow }) {
  const bottom = useMemo(() => layoutBooks(jobs, SHELVES_Y[0], LEFT + 12, 1), [jobs])
  const top = useMemo(() => layoutBooks(courses, SHELVES_Y[1], LEFT + 40, 4), [courses])

  return (
    <group>
      {SHELVES_Y.map((y) => (
        <group key={y}>
          {/* Board */}
          <mesh name="shelf_board" position={[(LEFT + RIGHT) / 2, y - 3, WALL_Z + DEPTH / 2]}>
            <boxGeometry args={[RIGHT - LEFT, 6, DEPTH]} />
            <meshStandardMaterial color="#1f1a17" roughness={0.6} emissive="#1f1a17" emissiveIntensity={0.3} />
          </mesh>
          {/* LED strip under the front edge */}
          <mesh name="shelf_led" position={[(LEFT + RIGHT) / 2, y - 6.5, WALL_Z + DEPTH - 1]}>
            <boxGeometry args={[RIGHT - LEFT - 8, 1.2, 1.2]} />
            <meshBasicMaterial color={glow ? '#a5f3fc' : '#22d3ee'} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {bottom.map(b => <Book key={b.name} book={b} glow={glow} />)}
      {top.map(b => <Book key={b.name} book={b} glow={glow} />)}

      {/* A trophy at the end of the bottom shelf */}
      <Trophy x={RIGHT - 40} y={SHELVES_Y[0]} />

      {/* Soft light from the LED strips onto the wall (distance is in scene units, not model units) */}
      <pointLight position={[(LEFT + RIGHT) / 2, SHELVES_Y[0] - 20, WALL_Z + 40]} intensity={glow ? 4 : 2.5} distance={4} decay={1.5} color="#22d3ee" />
    </group>
  )
}
