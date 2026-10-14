/**
 * Downloads the room model while measuring the bytes, so the loading bar can
 * move smoothly. (Three.js only reports "files done", and the model is a
 * single 3 MB file, so its own counter would sit at 0% and then jump to 100%.)
 *
 * The scene loads the same URL afterwards and gets it straight from the
 * browser cache. If this download fails, the scene's own load fails too and
 * the error screen takes over, so here a failure just ends the bar.
 */
import { useEffect, useState } from 'react'

// Size of public/gaming_bedroom.glb, for when the server doesn't send
// Content-Length (e.g. compressed on the fly)
const FALLBACK_BYTES = 3126784

export function useModelDownload(url) {
  const [state, setState] = useState({ progress: 0, done: false })

  useEffect(() => {
    const controller = new AbortController()
    let frame = 0
    let loaded = 0
    let total = FALLBACK_BYTES

    // At most one React update per frame, however fast the chunks arrive
    const report = () => {
      frame = 0
      setState({ progress: Math.min(1, loaded / total), done: false })
    }

    ;(async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })
        total = Number(res.headers.get('content-length')) || FALLBACK_BYTES
        if (!res.body) {
          await res.arrayBuffer()
        } else {
          const reader = res.body.getReader()
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            loaded += value.length
            if (!frame) frame = requestAnimationFrame(report)
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') return
      }
      cancelAnimationFrame(frame)
      setState({ progress: 1, done: true })
    })()

    return () => {
      controller.abort()
      cancelAnimationFrame(frame)
    }
  }, [url])

  return state
}
