/**
 * LIGHT_MODE is true when the visitor has data saver on or a very slow (2G)
 * connection. In that case the hero skips the 3D room completely, so neither
 * Three.js nor the 3 MB model gets downloaded.
 *
 * Worked out once when the file loads, before React renders anything.
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
