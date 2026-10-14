/**
 * Chooses between the full site and the quick version (?view=quick).
 *
 * They're separate trees on purpose: the full site sets up its scroll
 * container and listeners once on mount, so switching remounts it cleanly.
 * The language survives the switch through localStorage and ?lang=.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import App from './App'

// Most visitors never open it, so it lives in its own small chunk
const QuickView = lazy(() => import('./sections/QuickView'))

const isQuickUrl = () => new URLSearchParams(window.location.search).get('view') === 'quick'

export default function Root() {
  const [quick, setQuick] = useState(isQuickUrl)

  // Back / Forward between the two versions
  useEffect(() => {
    const onPop = () => setQuick(isQuickUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const switchTo = (toQuick) => {
    const url = new URL(window.location.href)
    if (toQuick) url.searchParams.set('view', 'quick')
    else url.searchParams.delete('view')
    url.hash = ''
    // pushState so the Back button returns to where they came from
    window.history.pushState(null, '', `${url.pathname}${url.search}`)
    setQuick(toQuick)
  }

  if (quick) {
    return (
      <Suspense fallback={null}>
        <QuickView onExit={() => switchTo(false)} />
      </Suspense>
    )
  }
  return <App onQuickView={() => switchTo(true)} />
}
