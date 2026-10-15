/**
 * Chooses which version of the portfolio to show, from ?view=:
 * the full site (default), the quick version (?view=quick) or the 3D room
 * (?view=room).
 *
 * They're separate trees on purpose: the full site sets up its scroll
 * container and listeners once on mount, so switching remounts it cleanly.
 * The language survives the switch through localStorage and ?lang=.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import App from './App'
import LoaderScreen from './components/LoaderScreen'
import { TRANSLATIONS } from './consts/i18n'
import { getInitialLang } from './consts/lang'

/**
 * lazy() that survives a new deploy. If a tab was opened before the site was
 * updated, the old chunk it asks for no longer exists; instead of a blank page,
 * reload once to pick up the new version. The flag stops a reload loop if the
 * chunk is really unreachable (offline...), in which case the error stands.
 */
const RELOAD_FLAG = 'chunk-reload'
function lazyWithReload(load) {
  return lazy(() => load()
    .then((module) => {
      try { sessionStorage.removeItem(RELOAD_FLAG) } catch { /* storage blocked */ }
      return module
    })
    .catch((error) => {
      try {
        if (sessionStorage.getItem(RELOAD_FLAG)) throw error
        sessionStorage.setItem(RELOAD_FLAG, '1')
      } catch {
        throw error
      }
      window.location.reload()
      return new Promise(() => {}) // keep the loader up until the page reloads
    }))
}

// Most visitors never open these, so each lives in its own chunk
const QuickView = lazyWithReload(() => import('./sections/QuickView'))
const RoomView = lazyWithReload(() => import('./room/RoomView'))

const VIEWS = ['quick', 'room']
const viewFromUrl = () => {
  const view = new URLSearchParams(window.location.search).get('view')
  return VIEWS.includes(view) ? view : null
}

function RoomCodeLoader() {
  const r = TRANSLATIONS[getInitialLang()].room
  return <LoaderScreen title={r.loading} steps={r.loadingSteps} />
}

export default function Root() {
  const [view, setView] = useState(viewFromUrl)

  // Back / Forward between the versions
  useEffect(() => {
    const onPop = () => setView(viewFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const switchTo = (next) => {
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('view', next)
    else url.searchParams.delete('view')
    url.hash = ''
    // pushState so the Back button returns to where they came from
    window.history.pushState(null, '', `${url.pathname}${url.search}`)
    setView(next)
  }

  if (view === 'quick') {
    return (
      <Suspense fallback={null}>
        <QuickView onExit={() => switchTo(null)} />
      </Suspense>
    )
  }
  if (view === 'room') {
    return (
      // While the room's code downloads, the same loading screen it starts with
      <Suspense fallback={<RoomCodeLoader />}>
        <RoomView onExit={() => switchTo(null)} />
      </Suspense>
    )
  }
  return <App onQuickView={() => switchTo('quick')} onRoomView={() => switchTo('room')} />
}
