/**
 * Image optimisation (npm run optimize:images):
 * 1. Converts big PNGs/JPEGs (cards, logos) to WebP
 * 2. Shrinks the project card images to the size they're actually shown at
 * 3. Makes 320px thumbnails for the Art grid (hobbies/*-thumb.webp)
 *
 * Safe to run again after adding new images.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC_DIR = path.resolve('public')
const HOBBIES_DIR = path.join(PUBLIC_DIR, 'hobbies')

// PNGs/JPEGs to convert to WebP (the originals stay, for logos with transparency)
const PNG_TO_WEBP = [
  { src: 'FamilyTrivia.png',          out: 'FamilyTrivia.webp',          quality: 85 },
  { src: 'CashDrop.png',              out: 'CashDrop.webp',              quality: 85 },
  { src: 'obsidian-pixelart.png',     out: 'obsidian-pixelart.webp',     quality: 90 },
  { src: 'solar-explorerlogo.png',    out: 'solar-explorerlogo.webp',    quality: 90 },
  { src: 'orbex-icon.jpg',            out: 'orbex-icon.webp',            quality: 88 },
]

// Card images are never shown bigger than ~180px, so 400px is plenty even on
// 2x screens. The originals were 500-1000px wide, about half a MB for nothing.
const CARD_MAX_SIZE = 400
const CARD_QUALITY = 88
const CARD_IMAGES = [
  'obsidian-pixelart.webp',
  'orbex-icon.webp',
  'solar-explorerlogo.webp',
  'CashDrop.webp',
  'FamilyTrivia.webp',
  'kylen-chat.webp',
  'kylen-chat-demo.webp',
  'nadir-logo.webp',
  'waymark-logo.webp',
  'nexus-logo.webp',
]

const THUMB_WIDTH = 320
const THUMB_QUALITY = 70
async function ensureFile(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function convertPng() {
  console.log('\n[1/3] Converting PNGs/JPEGs to WebP...')
  for (const { src, out, quality } of PNG_TO_WEBP) {
    const srcPath = path.join(PUBLIC_DIR, src)
    const outPath = path.join(PUBLIC_DIR, out)
    if (!(await ensureFile(srcPath))) {
      console.log(`  skip ${src} (not found)`)
      continue
    }
    const srcStat = await fs.stat(srcPath)
    await sharp(srcPath).webp({ quality, effort: 6 }).toFile(outPath)
    const outStat = await fs.stat(outPath)
    const before = (srcStat.size / 1024).toFixed(1)
    const after  = (outStat.size / 1024).toFixed(1)
    const saved  = (100 - (outStat.size / srcStat.size) * 100).toFixed(0)
    console.log(`  ${src} (${before} KB) → ${out} (${after} KB, -${saved}%)`)
  }
}

// Resizes the card images in place, skipping the ones already small enough
async function shrinkCardArtwork() {
  console.log('\n[2/3] Shrinking project card artwork...')
  for (const file of CARD_IMAGES) {
    const filePath = path.join(PUBLIC_DIR, file)
    if (!(await ensureFile(filePath))) {
      console.log(`  skip ${file} (not found)`)
      continue
    }
    const input = await fs.readFile(filePath)
    const { width, height } = await sharp(input).metadata()
    if (Math.max(width, height) <= CARD_MAX_SIZE) {
      console.log(`  skip ${file} (already ${width}x${height})`)
      continue
    }
    const before = input.length
    const output = await sharp(input)
      .resize({ width: CARD_MAX_SIZE, height: CARD_MAX_SIZE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: CARD_QUALITY, effort: 6 })
      .toBuffer()
    await fs.writeFile(filePath, output)
    const saved = (100 - (output.length / before) * 100).toFixed(0)
    console.log(`  ${file} ${width}x${height} (${(before / 1024).toFixed(1)} KB) -> max ${CARD_MAX_SIZE}px (${(output.length / 1024).toFixed(1)} KB, -${saved}%)`)
  }
}

async function generateHobbiesThumbs() {
  console.log('\n[3/3] Generating hobbies thumbnails...')
  const entries = await fs.readdir(HOBBIES_DIR)
  const originals = entries
    .filter(f => /^\d+\.webp$/i.test(f))
    .sort()

  for (const file of originals) {
    const srcPath = path.join(HOBBIES_DIR, file)
    const base = path.basename(file, path.extname(file))
    const outPath = path.join(HOBBIES_DIR, `${base}-thumb.webp`)

    await sharp(srcPath)
      .resize({ width: THUMB_WIDTH, height: THUMB_WIDTH, fit: 'cover', position: 'centre' })
      .webp({ quality: THUMB_QUALITY, effort: 6 })
      .toFile(outPath)

    const outStat = await fs.stat(outPath)
    console.log(`  ${file} → ${base}-thumb.webp (${(outStat.size / 1024).toFixed(1)} KB)`)
  }
}

(async () => {
  try {
    await convertPng()
    await shrinkCardArtwork()
    await generateHobbiesThumbs()
    console.log('\nDone.')
  } catch (err) {
    console.error('Failed:', err)
    process.exit(1)
  }
})()
