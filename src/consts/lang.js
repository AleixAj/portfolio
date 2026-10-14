// Language helpers shared by the full site (App) and the quick version (QuickView)
import { TRANSLATIONS } from './i18n'

// There's no Catalan CV, so Catalan gets the Spanish one.
// `name` is what the file is called when someone downloads it.
export const CV_BY_LANG = {
  es: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
  en: { href: '/cv-aleix-en.pdf', name: 'CV Aleix Auqué EN.pdf' },
  ca: { href: '/cv-aleix-es.pdf', name: 'CV Aleix Auqué.pdf' },
}

export const DEFAULT_LANG = 'es'

// A ?lang= in the link beats whatever the visitor picked last time,
// so a shared link always opens in the language it was shared in.
export function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (TRANSLATIONS[fromUrl]) return fromUrl
  const stored = localStorage.getItem('lang')
  return TRANSLATIONS[stored] ? stored : DEFAULT_LANG
}
