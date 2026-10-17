/**
 * The electric border that moves around a section, placed over whichever card
 * useElectricHighlight says is lit. `box` is null until you've pointed at
 * something, so a visitor who never hovers anything never loads the shaders
 * or opens a WebGL context.
 */
import { lazy, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Its own chunk: 700 lines of shaders that nothing above the fold needs.
const ElectricBorder = lazy(() => import('./ElectricBorder'))

export default function ElectricHighlight({ box, active, liftY = 0 }) {
  if (!box) return null
  return (
    // Nothing here is worth taking the page down for. A chunk that fails to
    // download (a dropped connection, or a deploy while someone has the site
    // open) makes a lazy import throw, and an uncaught throw unmounts the
    // whole app: without this you'd lose the page over a decoration.
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ElectricBorder
          active={active}
          color="#22d3ee"
          borderRadius={box.radius}
          speed={0.8}
          // It answers a hover, so it has to turn up at once. Left to itself
          // it takes 0.9s to draw the border, which feels like waiting for it.
          revealTime={0.22}
          // One strand, close to the edge. The component's own defaults draw
          // three, wandering far enough out to look like a shape of their own
          // on a small card instead of like the card's own outline.
          strands={1}
          spread={0.22}
          chaos={0.18}
          thickness={1}
          glow={0.5}
          intensity={0.7}
          className="pointer-events-none"
          // Through `style` because Tailwind writes .relative after .absolute,
          // so the component's own `relative` would win. z-30 puts it over the
          // cards, which lift themselves on hover. The box is the card's place
          // in the layout; the transform is the rise the card does on hover,
          // with the card's own timing so the two move as one.
          style={{
            position: 'absolute',
            zIndex: 30,
            left: box.left,
            top: box.top,
            width: box.width,
            height: box.height,
            transform: `translateY(${-liftY}px)`,
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
