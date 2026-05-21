/**
 * Asset optimization pipeline.
 *
 * - Converts oversized PNGs (project cards, logos) to WebP
 * - Generates 320px-wide thumbnails for the hobbies grid (hobbies/*-thumb.webp)
 *
 * Idempotent: re-run safely after adding new assets.
 *
 * Usage: npm run optimize:images
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC_DIR = path.resolve('public')
const HOBBIES_DIR = path.join(PUBLIC_DIR, 'hobbies')

// PNGs converted to WebP (kept original PNG for transparency-sensitive logos)
const PNG_TO_WEBP = [
  { src: 'FamilyTrivia.png',          out: 'FamilyTrivia.webp',          quality: 85 },
  { src: 'CashDrop.png',              out: 'CashDrop.webp',              quality: 85 },
  { src: 'obsidian-pixelart.png',     out: 'obsidian-pixelart.webp',     quality: 90 },
  { src: 'solar-explorerlogo.png',    out: 'solar-explorerlogo.webp',    quality: 90 },
]

const THUMB_WIDTH = 320
const THUMB_QUALITY = 70
async function ensureFile(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function convertPng() {
  console.log('\n[1/2] Converting PNGs to WebP...')
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

async function generateHobbiesThumbs() {
  console.log('\n[2/2] Generating hobbies thumbnails...')
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
    await generateHobbiesThumbs()
    console.log('\nDone.')
  } catch (err) {
    console.error('Failed:', err)
    process.exit(1)
  }
})()
