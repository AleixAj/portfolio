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
//
// `fit` is how much has to be on screen around `look`, [width, height] in
// model units. The camera rig works out the distance from it, so every screen
// shape (a wide monitor, a phone standing up) sees the same thing instead of
// the same distance. `cam` only gives the direction it looks from.
export const OVERVIEW = { cam: [1450, 1050, 1650], look: [520, 640, 420], fit: [1950, 1230] }
export const OVERVIEW_PORTRAIT = { cam: [1350, 1150, 1750], look: [490, 660, 455], fit: [1340, 950] }
// A phone held sideways: between the top bar and the dock there's barely any
// height left, so the room keeps its size and the floor and ceiling crop
// instead of the whole room shrinking into the strip in the middle.
export const OVERVIEW_SHORT = { cam: [1450, 1050, 1650], look: [520, 775, 420], fit: [1800, 745] }

/**
 * Each clickable thing in the room.
 * - owners: model mesh names (prefixes) that belong to it, for the hover glow.
 *   Three.js strips dots from glTF names, so "pantalla1.001" is "pantalla1001".
 * - marker: where its floating label sits
 * - cam / look: the direction the camera looks from, and the point it aims at
 * - fit: how much has to be on screen around `look` (see OVERVIEW above)
 * - portrait: the same three for tall screens (phones), where much less fits
 *   side by side. Without it, the landscape framing is used on every screen.
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
    fit: [430, 290],
    // Phones: only the two shelves, filling the width
    portrait: { cam: [810, 980, 700], look: [795, 955, 116], fit: [370, 230] },
  },
  {
    id: 'projects',
    owners: ['pantalla1_', 'pantalla1001', 'teclado'],
    marker: [755, 700, 200],
    // From the right of the chair and close, so both screens are in clear view
    cam: [975, 730, 515],
    look: [764, 632, 175],
    fit: [330, 200],
    // Phones can't fit two monitors and still read them, so the camera goes to
    // the right one (the project's picture) on its own. The chair blocks a
    // straight-on view, so it looks in from above and to the right.
    portrait: { cam: [1010, 745, 575], look: [823, 636, 164], fit: [180, 125] },
  },
  {
    // The TV and its stand full of consoles and games: my "stack"
    id: 'skills',
    owners: ['tv_netflix', 'switch', 'doc', 'Cube009', 'odissey', 'gow'],
    marker: [300, 800, 140],
    cam: [330, 700, 640],
    look: [300, 650, 116],
    fit: [430, 290],
    // Phones: the TV on its own, without the stand full of consoles
    portrait: { cam: [330, 700, 700], look: [311, 694, 116], fit: [355, 225] },
  },
  {
    id: 'art',
    // Only the two frames with my drawings; the New York panorama is just decoration
    owners: ['cuadro2', 'cuadro3'],
    marker: [470, 1035, 130],
    cam: [500, 975, 700],
    look: [472, 961, 116],
    fit: [420, 320],
    portrait: { cam: [478, 968, 700], look: [472, 961, 116], fit: [300, 270] },
  },
  {
    id: 'contact',
    owners: ['pantalla001'],
    marker: [582, 580, 905],
    cam: [660, 700, 1060],
    look: [580, 535, 905],
    fit: [220, 150],
    portrait: { cam: [640, 650, 1050], look: [585, 545, 900], fit: [170, 120] },
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
