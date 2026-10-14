// Language bookkeeping for the pages outside the main site (quick version,
// room): remember the language, set <html lang> and the title, and keep
// ?lang= in the address bar so the link can be shared as is.
import { useEffect } from 'react'
import { DEFAULT_LANG, savedLang } from './lang'

export function useLangInUrl(lang, title) {
  useEffect(() => {
    savedLang.set(lang)
    document.documentElement.lang = lang
    document.title = title
    const url = new URL(window.location.href)
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', `${url.pathname}${url.search}`)
  }, [lang, title])
}
