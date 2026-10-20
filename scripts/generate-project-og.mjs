/**
 * Renders scripts/og/project.html once per project into public/og/<slug>.png
 * (1200x630), the preview shown when a project's link is shared.
 *
 * Needs the dev server running (npm run dev), like generate:og. Copy each
 * image into the project's own repo so its site serves it, or upload it as
 * the GitHub social preview for projects that only link to the repo.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

// same slugs as PROJECTS in scripts/og/project.html
const SLUGS = ['nexus', 'obsidian', 'orbex', 'nadir', 'waymark', 'kylenchat']

mkdirSync('public/og', { recursive: true })
for (const slug of SLUGS) {
  execFileSync('npx', ['playwright', 'screenshot', '--channel=chrome', '--viewport-size=1200,630', '--wait-for-timeout=800',
    `http://localhost:5173/scripts/og/project.html?p=${slug}`, `public/og/${slug}.png`], { stdio: 'inherit', shell: true })
}
