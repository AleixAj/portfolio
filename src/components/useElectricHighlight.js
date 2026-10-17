/**
 * Works out which card in a section should have the electric border and
 * where it is. The border itself is drawn by ElectricHighlight.
 *
 * Why one border per section and not one per card: every border is a WebGL
 * context of its own, and browsers start dropping the oldest at around
 * sixteen. The projects section alone has ten cards. This way a section never
 * costs more than one context, and setting up WebGL (which means compiling
 * the shaders) happens once instead of on every hover.
 *
 * Usage: put `containerRef` on the element everything is measured against
 * (it has to be positioned, and it must not clip its overflow, because the
 * lightning is drawn outside the card), spread `itemProps(key)` on each card,
 * and render <ElectricHighlight box={box} active={active} /> inside that
 * container.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LIGHT_MODE } from '../consts/device'

// Only on a desktop with a real pointer, and never on a saved-data
// connection: there's no hover on a phone, and the cards there are small
// enough that you'd barely see it anyway.
//
// Reduced motion turns the whole thing off rather than slowing it down. The
// rule in index.css that stops the site's animations can't reach inside a
// WebGL canvas, and the component only slows its lightning down instead of
// holding still, so the one way to honour the setting is not to draw it.
const ELECTRIC_QUERY = '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)'

const SIDES = ['left', 'top', 'width', 'height', 'radius']

const radiusOf = (el) => parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0

// Kept live instead of worked out once at import time: the page is a single
// scroll container that never reloads, so someone who opens it in a narrow
// window and then maximises it should get the border too.
function useElectricAvailable() {
  const [on, setOn] = useState(
    () => !LIGHT_MODE && typeof window !== 'undefined' && window.matchMedia?.(ELECTRIC_QUERY).matches === true
  )
  useEffect(() => {
    if (LIGHT_MODE) return
    const mq = window.matchMedia?.(ELECTRIC_QUERY)
    if (!mq) return
    const update = () => setOn(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return on
}

/**
 * `lockedKey` keeps the border on one card whatever the pointer does, for
 * while a dialog about that card is open.
 *
 * `lift` is how many pixels the card itself rises on hover (the project cards
 * do, through .project-card:hover). The border has to rise with it or it ends
 * up floating a few pixels below the card it's supposed to be drawing.
 */
export default function useElectricHighlight(lockedKey = null, { lift = 0 } = {}) {
  const available = useElectricAvailable()
  const containerRef = useRef(null)
  const items = useRef({})
  const [hovered, setHovered] = useState(null)
  const [box, setBox] = useState(null)

  const lit = lockedKey ?? hovered

  // Where the lit card is, in the container's coordinates. Left where it is
  // when nothing is lit, so the border fades out in place instead of
  // collapsing to nothing.
  //
  // offsetLeft/offsetTop rather than getBoundingClientRect: they're the
  // card's place in the layout and ignore transforms, so a card caught
  // mid-lift doesn't hand us a position five pixels out (the rise is put back
  // on the border afterwards, as a transform of its own). They're relative to
  // the nearest positioned ancestor, which should be the container; if some
  // day something positioned sits in between, the rectangles are measured
  // instead so the border lands in the right place regardless.
  const measure = useCallback(() => {
    const container = containerRef.current
    // `!= null` and not a plain truthiness check: a section can perfectly
    // well key its cards by index, and the first one is 0.
    const el = lit == null ? null : items.current[lit]
    if (!container || !el) return
    let left = el.offsetLeft
    let top = el.offsetTop
    if (el.offsetParent !== container) {
      const card = el.getBoundingClientRect()
      const base = container.getBoundingClientRect()
      left = card.left - base.left
      top = card.top - base.top
    }
    // The corners come from the card itself, so a small card with small
    // corners gets a border that follows them and nobody has to keep a
    // second copy of the radius in sync. A card wrapped in a bare
    // positioning div has its corners one level down.
    const radius = radiusOf(el) || (el.firstElementChild ? radiusOf(el.firstElementChild) : 0)
    const next = { left, top, width: el.offsetWidth, height: el.offsetHeight, radius }
    // Same numbers, same object: a ResizeObserver fires as soon as it starts
    // watching, and there's no point re-rendering for that.
    setBox(prev => (prev && SIDES.every(k => prev[k] === next[k]) ? prev : next))
  }, [lit])

  useLayoutEffect(measure, [measure])

  // The card can move or change size under the border while it's lit: the
  // window gets resized, or the language changes and the text reflows.
  useEffect(() => {
    const container = containerRef.current
    if (lit == null || !container || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    const el = items.current[lit]
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [lit, measure])

  // The leave only clears the card it was on: moving straight from one card
  // to the next can fire the new card's enter before the old one's leave.
  const itemProps = useCallback((key) => ({
    ref: (el) => { items.current[key] = el },
    onPointerEnter: available ? () => setHovered(key) : undefined,
    onPointerLeave: available ? () => setHovered(c => (c === key ? null : c)) : undefined,
  }), [available])

  // Only the card under the pointer is lifted: one kept lit because its
  // dialog is open is sitting still, so the border has to sit still too.
  return { containerRef, itemProps, box, active: lit != null, liftY: hovered == null ? 0 : lift }
}
