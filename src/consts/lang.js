// Language helpers shared by the full site (App), the quick version and the 3D room
import { TRANSLATIONS } from './i18n'

// There's no Catalan CV, so Catalan gets the Spanish one.
// `name` is what the file is called when someone downloads it.
export const CV_BY_LANG = {
  es: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
  en: { href: '/cv-aleix-en.pdf', name: 'CV Aleix Auqué EN.pdf' },
  ca: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
}

export const DEFAULT_LANG = 'es'

// Translated data fields are { es, en, ca }; plain strings are the same in
// every language. Falls back to Spanish if a language is missing.
export const localize = (value, lang) =>
  value && typeof value === 'object' ? (value[lang] ?? value.es) : value

// localStorage can throw (private mode in some browsers, storage disabled).
// Remembering the language is a nice-to-have, so failures are ignored.
export const savedLang = {
  get() {
    try { return localStorage.getItem('lang') } catch { return null }
  },
  set(lang) {
    try { localStorage.setItem('lang', lang) } catch { /* not available */ }
  },
}

// A ?lang= in the link beats whatever the visitor picked last time,
// so a shared link always opens in the language it was shared in.
export function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (TRANSLATIONS[fromUrl]) return fromUrl
  const stored = savedLang.get()
  return TRANSLATIONS[stored] ? stored : DEFAULT_LANG
}
