/**
 * Connection hints, resolved once before the heavy 3D chunks are imported.
 *
 * The hero scene is by far the most expensive part of the page: Three.js plus the
 * 3 MB gaming-room model. On a data-saver or 2G connection that cost is not worth
 * paying, so the app keeps the static gradient hero and never downloads either the
 * library or the model.
 *
 * Read at module load (not inside a hook) so the lazy imports can be skipped
 * before React ever renders.
 */
const connection =
  typeof navigator !== 'undefined'
    ? navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection
    : null

const SLOW_TYPES = ['slow-2g', '2g']

const prefersReducedData =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-data: reduce)').matches === true

export const LIGHT_MODE =
  prefersReducedData ||
  Boolean(connection && (connection.saveData === true || SLOW_TYPES.includes(connection.effectiveType)))
