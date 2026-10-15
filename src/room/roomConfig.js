/**
 * Where everything is in the 3D room.
 *
 * Positions are written in the model's own units (what Blender exported:
 * roughly centimetres, Y up, the back wall at z ≈ 116, the open side towards
 * +z). `toWorld` turns them into scene units, so the numbers here can be read
 * straight off the model.
 */
export const MODEL_URL = '/gaming_bedroom.glb'

// Centre of the room in model units, and model units -> scene units
const CENTER = [529.6, 780.4, 495]
const SCALE = 0.01

export const toWorld = ([x, y, z]) => [
  (x - CENTER[0]) * SCALE,
  (y - CENTER[1]) * SCALE,
  (z - CENTER[2]) * SCALE,
]
export const MODEL_OFFSET = toWorld([0, 0, 0])
export const MODEL_SCALE = SCALE

// The camera when nothing is selected: a three-quarter view of the whole room.
// Portrait screens get their own framing so the room sits in the middle.
export const OVERVIEW = { cam: [1450, 1050, 1650], look: [520, 640, 420] }
export const OVERVIEW_PORTRAIT = { cam: [1350, 1150, 1750], look: [480, 640, 470] }

/**
 * Each clickable thing in the room.
 * - owners: model mesh names (prefixes) that belong to it, for the hover glow.
 *   Three.js strips dots from glTF names, so "pantalla1.001" is "pantalla1001".
 * - marker: where its floating label sits
 * - cam / look: where the camera goes when you open it
 * - action: true when it does something instead of opening a panel (no camera move)
 */
export const HOTSPOTS = [
  {
    // The bookshelf (built in Bookshelf.jsx): one book per job or course
    id: 'journey',
    owners: ['shelf'],
    marker: [700, 1085, 150],
    cam: [800, 960, 640],
    look: [795, 940, 116],
  },
  {
    id: 'projects',
    owners: ['pantalla1_', 'pantalla1001', 'teclado'],
    marker: [755, 700, 200],
    // From the right of the chair and close, so both screens are in clear view
    cam: [975, 730, 515],
    look: [764, 632, 175],
  },
  {
    // The TV and its stand full of consoles and games: my "stack"
    id: 'skills',
    owners: ['tv_netflix', 'switch', 'doc', 'Cube009', 'odissey', 'gow'],
    marker: [300, 800, 140],
    cam: [330, 700, 640],
    look: [300, 650, 116],
  },
  {
    id: 'art',
    // Only the two frames with my drawings; the New York panorama is just decoration
    owners: ['cuadro2', 'cuadro3'],
    marker: [470, 1035, 130],
    cam: [500, 920, 700],
    look: [490, 905, 116],
  },
  {
    id: 'contact',
    owners: ['pantalla001'],
    marker: [582, 580, 905],
    cam: [660, 700, 1060],
    look: [580, 535, 905],
  },
  {
    // The PC tower doesn't open a panel: it hands you my CV
    id: 'cv',
    owners: ['torre'],
    marker: [950, 700, 200],
    action: true,
  },
]

/**
 * Invisible click areas, a bit bigger than each object so it's easy to hit
 * (the phone alone is 2 cm thick). [centre, size] in model units. They're the
 * only things in the scene that react to the pointer (see Hitboxes in
 * RoomScene.jsx), which keeps hover cheap.
 */
export const HITBOXES = {
  projects: [[[755, 615, 195], [300, 140, 120]]],                 // both monitors and the keyboard
  skills: [[[312, 645, 150], [320, 300, 80]]],                    // TV and its stand
  journey: [[[792, 965, 135], [325, 215, 50]]],                   // bookshelf
  art: [[[472, 962, 125], [300, 250, 30]]],                       // the two drawings
  cv: [[[948, 625, 178], [70, 120, 110]]],                        // PC tower
  contact: [[[592, 545, 902], [80, 45, 95]]],                     // phone on the bedside table
  lamp: [[[526, 585, 920], [50, 80, 50]]],                        // lava lamp
}

// Book spines on the shelf: jobs on the bottom shelf, studies on the top one.
// Short names so they fit on a spine; "Orbex" stands for my own projects.
// Proper names stay the same in every language; the rest is { es, en, ca }.
export const SHELF = {
  jobs: ['Orbex', 'Grup Romeu', 'Nemon', 'VIEWNEXT', 'Riudecanyes'],
  courses: ['Lemoncoders', 'PHP · Esplai', 'Java · Esplai', 'DAW', { es: 'Bachillerato', en: 'Baccalaureate', ca: 'Batxillerat' }],
}

// The lava lamp on the bedside table switches the room lights on and off
export const LAMP = { owners: ['Circle'], marker: [528, 640, 920] }

// Meshes whose picture gets replaced: the TV, both monitors (the left one only
// while the Projects panel is open) and two of the posters (my drawings)
export const MESH = {
  tv: 'tv_netflix',
  monitor: 'pantalla1001',
  infoMonitor: 'pantalla1_',
  posterA: 'cuadro2',
  posterB: 'cuadro3',
}

// Which hotspot (or the lamp) a model mesh belongs to, for the hover glow
export const ownerOf = (meshName) => {
  if (!meshName) return null
  if (LAMP.owners.some(o => meshName.startsWith(o))) return 'lamp'
  return HOTSPOTS.find(h => h.owners.some(o => meshName.startsWith(o)))?.id ?? null
}
