/**
 * What each object in the room opens: the content of the side panel.
 * Same data as the classic site (experience, projects, skills, drawings),
 * laid out for a narrow panel.
 */
import { createElement, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaFileAlt, FaInfo, FaCopy, FaCheck, FaGooglePlay, FaWindows, FaApple, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { EXPERIENCE, EDUCATION } from '../consts/experience'
import { PROJECTS } from '../consts/projects'
import { SKILL_CATEGORIES, AI_TOOLS } from '../consts/skills'
import { HOBBIES_PHOTOS } from '../consts/hobbies'
import ProjectModal from '../components/ProjectModal'
import { localize } from '../consts/lang'
import { SKILL_INFO } from '../consts/skillInfo'

const SUBTITLE = 'text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 mb-3'

function TimelineEntry({ title, subtitle, period, desc, clients }) {
  return (
    <li className="relative pl-6 pb-5 last:pb-0">
      <span aria-hidden="true" className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cyan-400 bg-black shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      <p className="text-xs font-medium tracking-wider text-cyan-300">{period}</p>
      <h3 className="mt-0.5 font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{subtitle}</p>
      {desc && <p className="mt-1 text-sm leading-relaxed text-white/55">{desc}</p>}
      {clients && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {clients.map(c => (
            <span key={c.name} className="rounded-full border px-2 py-0.5 text-xs font-semibold" style={{ color: c.color, borderColor: `${c.color}55`, background: `${c.color}1A` }}>{c.name}</span>
          ))}
        </div>
      )}
    </li>
  )
}

function Journey({ lang, t }) {
  return (
    <>
      <p className={SUBTITLE}>{t.journey.experience}</p>
      <ol className="relative border-l border-white/10 ml-[5px] -translate-x-[5px]">
        {EXPERIENCE.map(e => (
          <TimelineEntry key={localize(e.company, 'es')} title={localize(e.company, lang)} subtitle={localize(e.role, lang)} period={localize(e.period, lang)} desc={localize(e.desc, lang)} clients={e.clients} />
        ))}
      </ol>
      <p className={`${SUBTITLE} mt-8`}>{t.journey.education}</p>
      <ol className="relative border-l border-white/10 ml-[5px] -translate-x-[5px]">
        {EDUCATION.map(e => (
          <TimelineEntry key={`${e.center}-${localize(e.title, 'es')}`} title={localize(e.title, lang)} subtitle={e.center} period={localize(e.period, lang)} desc={localize(e.desc, lang)} />
        ))}
      </ol>
    </>
  )
}

const LINK = 'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors'
const GREY = 'border-white/20 text-white/75 hover:border-cyan-400/60 hover:text-cyan-300'
const CYAN = 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
const GREEN = 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20'

function Projects({ lang, t, projectIdx, setProjectIdx }) {
  const [open, setOpen] = useState(null)
  const tp = t.projects
  return (
    <>
      <p className="mb-4 text-sm text-white/55">{t.room.projectsHint}</p>
      <ul className="flex flex-col gap-2">
        {PROJECTS.map((p, i) => (
          <li
            key={p.title}
            onPointerEnter={() => setProjectIdx(i)}
            onFocus={() => setProjectIdx(i)}
            className={`rounded-xl border p-3 transition-colors ${projectIdx === i ? 'border-cyan-400/60 bg-cyan-400/[0.06]' : 'border-white/10 bg-white/[0.03]'}`}
          >
            <div className="flex items-start gap-3">
              <img src={p.img} alt="" aria-hidden="true" loading="lazy" className="h-12 w-12 flex-shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-white">{p.title}{p.featured && <span className="ml-2 align-middle rounded-full bg-cyan-400/15 px-1.5 py-px text-[0.6rem] font-semibold uppercase tracking-wider text-cyan-300">★</span>}</h3>
                  {p.details && (
                    <button type="button" onClick={() => setOpen(p.title)} aria-label={`${tp.more}: ${p.title}`} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/60 text-cyan-300 hover:bg-cyan-400/20">
                      <FaInfo className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>
                <p className="mt-0.5 text-sm leading-snug text-white/60">{localize(p.desc, lang)}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className={`${LINK} ${GREY}`}><FaGithub className="h-3 w-3" /> GitHub</a>
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className={`${LINK} ${CYAN}`}>↗ Demo</a>}
                  {p.download && <a href={p.download} rel="noopener noreferrer" className={`${LINK} ${CYAN}`}><FaWindows className="h-3 w-3" /> Windows</a>}
                  {p.downloadMac && <a href={p.downloadMac} rel="noopener noreferrer" className={`${LINK} ${CYAN}`}><FaApple className="h-3 w-3" /> Mac</a>}
                  {p.store && <a href={p.store} target="_blank" rel="noopener noreferrer" className={`${LINK} ${GREEN}`}><FaGooglePlay className="h-3 w-3" /> Play</a>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {open && <ProjectModal project={PROJECTS.find(p => p.title === open)} lang={lang} t={tp} onClose={() => setOpen(null)} />}
    </>
  )
}

// An icon component as something a canvas can draw: the SVG markup it renders
// to, or the image it shows (PixelLab's logo is a picture). Cached per icon.
const iconCache = new Map()
function iconImage(Icon) {
  if (!iconCache.has(Icon)) {
    const el = document.createElement('div')
    const root = createRoot(el)
    flushSync(() => root.render(createElement(Icon)))
    const img = el.querySelector('img')
    iconCache.set(Icon, img ? { src: img.getAttribute('src') } : { svg: el.innerHTML })
    root.unmount()
  }
  return iconCache.get(Icon)
}

function SkillTile({ skill, lang, category, picked, onPick }) {
  const { label, Icon, color, url } = skill
  const name = localize(label, lang)
  // Show it on the TV in the room. The info is keyed by the Spanish label.
  const pick = () => onPick({
    name,
    category,
    desc: localize(SKILL_INFO[localize(label, 'es')], lang) ?? '',
    color,
    icon: iconImage(Icon),
  })
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={name}
      onPointerEnter={pick} onFocus={pick}
      className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/[0.05] ${picked ? 'border-cyan-400/60 bg-cyan-400/[0.08]' : 'border-white/10 bg-black/30'}`}>
      <Icon className="h-6 w-6" style={{ color }} />
      <span className="text-[0.62rem] font-semibold leading-tight text-white/85">{name}</span>
    </a>
  )
}

function Skills({ lang, t, tvSkill, setTvSkill }) {
  const group = (category, skills) => (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
      {skills.map(s => (
        <SkillTile key={s.url} skill={s} lang={lang} category={category}
          picked={tvSkill?.name === localize(s.label, lang)} onPick={setTvSkill} />
      ))}
    </div>
  )
  return (
    <>
      <p className="mb-4 text-sm text-white/55">{t.room.skillsHint}</p>
      {SKILL_CATEGORIES.map(({ title, skills }) => (
        <section key={title.es} className="mb-6">
          <p className={SUBTITLE}>{localize(title, lang)}</p>
          {group(localize(title, lang), skills)}
        </section>
      ))}
      <section>
        <p className={SUBTITLE}>{t.skills.aiTitle}</p>
        {group(t.skills.aiTitle, AI_TOOLS)}
      </section>
    </>
  )
}

const toThumb = (src) => src.replace(/\.webp$/i, '-thumb.webp')

function Art({ t }) {
  const [current, setCurrent] = useState(null)
  const total = HOBBIES_PHOTOS.length

  useEffect(() => {
    if (current === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); setCurrent(null) }
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % total)
    }
    // Capture phase, so Escape closes the drawing before it closes the panel
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [current, total])

  return (
    <>
      <p className="mb-4 text-sm text-white/55">{t.hobbies.subtitle}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {HOBBIES_PHOTOS.map((p, i) => (
          <button key={p.src} type="button" onClick={() => setCurrent(i)} aria-label={`${t.hobbies.viewDrawing} ${i + 1}`}
            className="group aspect-[3/4] overflow-hidden rounded-lg border border-white/10 hover:border-cyan-400/60">
            <img src={toThumb(p.src)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {current !== null && createPortal(
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4" onClick={() => setCurrent(null)} role="dialog" aria-modal="true" aria-label={t.hobbies.title}>
          <img src={HOBBIES_PHOTOS[current].src} alt={`${t.hobbies.drawing} ${current + 1}`} className="max-h-full max-w-full rounded-lg object-contain" onClick={e => e.stopPropagation()} />
          <button type="button" aria-label={t.hobbies.previousDrawing} onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + total) % total) }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:text-cyan-300"><FaChevronLeft /></button>
          <button type="button" aria-label={t.hobbies.nextDrawing} onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % total) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:text-cyan-300"><FaChevronRight /></button>
          <button type="button" aria-label={t.hobbies.closeGallery} onClick={() => setCurrent(null)}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:text-cyan-300">✕</button>
        </div>,
        document.body,
      )}
    </>
  )
}

const EMAIL = 'aleixauque@gmail.com'

function Contact({ t, cv }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked: the mailto link is still there */ }
  }
  const BTN = 'flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400/60 hover:bg-cyan-400/[0.06]'
  return (
    <>
      <p className="mb-5 text-base text-white/70">{t.contact.subtitle}</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <a href={`mailto:${EMAIL}`} className={`${BTN} flex-1 min-w-0`}><FaEnvelope className="h-4 w-4 flex-shrink-0 text-cyan-300" /> <span className="truncate">{EMAIL}</span></a>
          <button type="button" onClick={copy} aria-label={t.room.copyEmail} title={t.room.copyEmail} className={`${BTN} justify-center px-3`}>
            {copied ? <FaCheck className="h-4 w-4 text-emerald-300" /> : <FaCopy className="h-4 w-4 text-white/70" />}
          </button>
        </div>
        <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer" className={BTN}><FaLinkedin className="h-4 w-4 text-cyan-300" /> LinkedIn</a>
        <a href="https://github.com/AleixAj" target="_blank" rel="noopener noreferrer" className={BTN}><FaGithub className="h-4 w-4 text-cyan-300" /> GitHub</a>
        <div className="flex gap-2">
          <a href={cv.href} target="_blank" rel="noopener noreferrer" className={`${BTN} flex-1`}><FaFileAlt className="h-4 w-4 text-cyan-300" /> {t.hero.viewCV}</a>
          <a href={cv.href} download={cv.name} className={`${BTN} flex-1`}><FaDownload className="h-4 w-4 text-cyan-300" /> {t.hero.downloadCV}</a>
        </div>
      </div>
      <p aria-live="polite" className="mt-3 h-5 text-sm text-emerald-300">{copied ? t.room.copied : ''}</p>
    </>
  )
}

export const PANEL_TITLES = (t) => ({
  journey: t.journey.title,
  projects: t.projects.title,
  skills: t.skills.title,
  art: t.hobbies.title,
  contact: t.contact.title,
})

export default function RoomPanel({ id, lang, t, cv, projectIdx, setProjectIdx, tvSkill, setTvSkill }) {
  switch (id) {
    case 'journey': return <Journey lang={lang} t={t} />
    case 'projects': return <Projects lang={lang} t={t} projectIdx={projectIdx} setProjectIdx={setProjectIdx} />
    case 'skills': return <Skills lang={lang} t={t} tvSkill={tvSkill} setTvSkill={setTvSkill} />
    case 'art': return <Art t={t} />
    case 'contact': return <Contact t={t} cv={cv} />
    default: return null
  }
}
