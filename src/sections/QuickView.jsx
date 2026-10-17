/**
 * Quick version for recruiters in a hurry (?view=quick).
 *
 * Everything on one plain page: no 3D, no animations, no scroll tricks. It
 * reads the same data as the full site, so there's nothing extra to keep up
 * to date. It also prints cleanly (white background), so "Save as PDF" works.
 */
import { useState } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaPrint, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa'
import { TRANSLATIONS } from '../consts/i18n'
import { EXPERIENCE, EDUCATION, withYears } from '../consts/experience'
import { PROJECTS } from '../consts/projects'
import { SKILL_CATEGORIES, AI_TOOLS } from '../consts/skills'
import { CV_BY_LANG, getInitialLang, localize } from '../consts/lang'
import { useLangInUrl } from '../consts/useLangInUrl'
import { LanguageSwitcher } from '../components/Navbar'

const LINK = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-white/80 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors text-sm print:border-0 print:px-0 print:text-black'

function Block({ title, children }) {
  return (
    <section className="mt-10 print:mt-6 print:break-inside-avoid-page">
      <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 print:text-black border-b border-white/10 print:border-black/20 pb-2 mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default function QuickView({ onExit }) {
  const [lang, setLang] = useState(getInitialLang)
  const t = TRANSLATIONS[lang]
  const q = t.quick
  const cv = CV_BY_LANG[lang] ?? CV_BY_LANG.es

  useLangInUrl(lang, `${t.meta.title} · ${t.quickView}`)

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#05080c] text-white print:static print:overflow-visible print:bg-white print:text-black">
      {/* Top bar: back to the full site, print, language. Not printed. */}
      <div className="sticky top-0 z-10 bg-[#05080c]/95 border-b border-white/10 print:hidden">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <button onClick={onExit} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            <FaArrowLeft className="w-3 h-3" aria-hidden="true" /> {q.fullSite}
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white px-2 py-1">
              <FaPrint className="w-3.5 h-3.5" aria-hidden="true" /> {q.print}
            </button>
            <LanguageSwitcher lang={lang} setLang={setLang} setMenuOpen={() => {}} compact />
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-5 py-10 print:py-0 print:max-w-none">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Aleix Auqué</h1>
          <p className="mt-1 text-lg text-cyan-300 print:text-black">Software Developer · {t.hero.roles}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/60 print:text-black/70">
            <span className="inline-flex items-center gap-1.5"><FaMapMarkerAlt className="w-3 h-3" aria-hidden="true" /> {t.hero.location}</span>
            <span>{withYears(t.hero.experience)}</span>
            <span>{t.hero.modality}</span>
            <span>{t.hero.languages}</span>
            <span className="text-emerald-300 print:text-black font-medium">{t.hero.openToWork}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2 print:gap-x-5">
            <a href="mailto:aleixauque@gmail.com" className={LINK}><FaEnvelope className="w-3.5 h-3.5" aria-hidden="true" /> aleixauque@gmail.com</a>
            <a href="https://linkedin.com/in/aleixauque/" target="_blank" rel="noopener noreferrer" className={LINK}><FaLinkedin className="w-3.5 h-3.5" aria-hidden="true" /> linkedin.com/in/aleixauque</a>
            <a href="https://github.com/AleixAj" target="_blank" rel="noopener noreferrer" className={LINK}><FaGithub className="w-3.5 h-3.5" aria-hidden="true" /> github.com/AleixAj</a>
            <a href={cv.href} download={cv.name} className={`${LINK} print:hidden`}><FaDownload className="w-3.5 h-3.5" aria-hidden="true" /> {t.hero.downloadCV}</a>
          </div>
          <p className="mt-6 text-base leading-relaxed text-white/80 print:text-black">{t.hero.intro}</p>
        </header>

        <Block title={t.journey.experience}>
          <ol className="flex flex-col gap-5">
            {EXPERIENCE.map((job) => (
              <li key={localize(job.company, 'es')} className="print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{localize(job.company, lang)} <span className="font-normal text-white/60 print:text-black/70">· {localize(job.role, lang)}</span></h3>
                  <span className="text-sm text-cyan-300/80 print:text-black/60 whitespace-nowrap">{localize(job.period, lang)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/65 print:text-black/80">{localize(job.desc, lang)}</p>
                {job.clients && (
                  <p className="mt-1 text-xs text-white/45 print:text-black/60">{q.clients}: {job.clients.map(c => c.name).join(' · ')}</p>
                )}
              </li>
            ))}
          </ol>
        </Block>

        <Block title={t.projects.title}>
          <ul className="flex flex-col gap-5">
            {PROJECTS.map((p) => {
              const links = [
                p.demo && [t.projects.viewDemo, p.demo],
                p.store && [t.projects.viewStore, p.store],
                p.download && [t.projects.viewDownload, p.download],
                [t.projects.viewCode, p.github],
              ].filter(Boolean)
              return (
                <li key={p.title} className="print:break-inside-avoid">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65 print:text-black/80">{localize(p.desc, lang)}</p>
                  <p className="mt-1 text-xs text-white/45 print:text-black/60">{p.tags.map(tag => tag.label).join(' · ')}</p>
                  <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm print:hidden">
                    {links.map(([label, href]) => (
                      <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">{label} ↗</a>
                    ))}
                  </p>
                  {/* On paper a link can't be clicked, so print the address */}
                  <p className="hidden print:block mt-1 text-xs text-black/60">{(p.store || p.demo || p.github).split('?')[0]}</p>
                </li>
              )
            })}
          </ul>
        </Block>

        <Block title={t.skills.title}>
          <dl className="flex flex-col gap-3 text-sm">
            {SKILL_CATEGORIES.map(({ title, skills }) => (
              <div key={title.es} className="sm:flex sm:gap-4">
                <dt className="sm:w-44 flex-shrink-0 font-semibold text-white/85 print:text-black">{localize(title, lang)}</dt>
                <dd className="text-white/65 print:text-black/80">
                  {skills.map(s => localize(s.label, lang)).join(' · ')}
                </dd>
              </div>
            ))}
            <div className="sm:flex sm:gap-4">
              <dt className="sm:w-44 flex-shrink-0 font-semibold text-white/85 print:text-black">{t.skills.aiTitle}</dt>
              <dd className="text-white/65 print:text-black/80">{AI_TOOLS.map(s => s.label).join(' · ')}</dd>
            </div>
          </dl>
        </Block>

        <Block title={t.journey.education}>
          <ul className="flex flex-col gap-3">
            {EDUCATION.map((item) => (
              <li key={`${item.center}-${localize(item.title, 'es')}`} className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                <span><span className="font-semibold">{localize(item.title, lang)}</span> <span className="text-white/60 print:text-black/70">· {item.center}</span></span>
                <span className="text-cyan-300/80 print:text-black/60 whitespace-nowrap">{localize(item.period, lang)}</span>
              </li>
            ))}
          </ul>
        </Block>

        <footer className="mt-12 pt-6 border-t border-white/10 text-center print:hidden">
          <button onClick={onExit} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors">
            {q.fullSite}
          </button>
        </footer>
      </main>
    </div>
  )
}
