/**
 * Featured portfolio projects.
 * Each entry defines image, bilingual description, tags, repo, and live demo.
 */
export const PROJECTS = [
  {
    title: 'FamilyTrivia',
    img: '/FamilyTrivia.webp',
    desc: {
      es: 'Trivia web interactiva para jugar en grupo, con tablero por categorías, puntuación dinámica y una experiencia rápida para compartir en pantalla.',
      en: 'Interactive web trivia for group play, with a category board, dynamic scoring, and a fast experience designed for shared screens.',
    },
    tags: [
      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    ],
    github: 'https://github.com/AleixAj/familytrivia',
    demo: 'https://familytrivia.aleixaj.com',
  },
  {
    title: 'CashDrop',
    img: '/CashDrop.webp',
    desc: {
      es: 'Juego web inspirado en concursos de televisión, con mecánica de apuestas, preguntas por rondas y una interfaz pensada para partidas ágiles.',
      en: 'Web game inspired by TV quiz shows, with betting mechanics, round-based questions, and an interface designed for quick sessions.',
    },
    tags: [
      { label: 'HTML',       cls: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
      { label: 'CSS',        cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'JavaScript', cls: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
    ],
    github: 'https://github.com/AleixAj/cashdrop',
    demo: 'https://cashdrop.aleixaj.com/',
  },
  {
    title: 'Obsidian',
    img: '/obsidian-pixelart.webp',
    mobileImg: '/obsidian-pixelart.webp',
    imgCls: 'scale-[1.10] md:scale-[1.35] md:group-hover:scale-[1.42] p-0',
    desc: {
      es: 'E-commerce full-stack de streetwear con catálogo Laravel, autenticación Sanctum, carrito y wishlist sincronizados y checkout real.',
      en: 'Full-stack streetwear e-commerce with a Laravel catalog, Sanctum authentication, synced cart and wishlist, and real checkout.',
    },
    tags: [
      { label: 'React',          cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'TypeScript',     cls: 'bg-blue-400/10   text-blue-400   border-blue-400/20'   },
      { label: 'Laravel',        cls: 'bg-red-400/10    text-red-400    border-red-400/20'     },
      { label: 'MySQL',          cls: 'bg-sky-400/10    text-sky-400    border-sky-400/20'     },
      { label: 'TanStack Query', cls: 'bg-rose-400/10   text-rose-400   border-rose-400/20'   },
    ],
    github: 'https://github.com/AleixAj/obsidian',
    demo: 'https://obsidian.aleixaj.com',
  },
  {
    title: 'Solar Explorer',
    img: '/solar-explorerlogo.webp',
    imgCls: 'scale-[1.10] md:scale-125 p-0',
    desc: {
      es: 'Explorador 3D del Sistema Solar con escena WebGL, planetas seleccionables, cámara interactiva, datos astronómicos e interfaz responsive.',
      en: '3D Solar System explorer with a WebGL scene, selectable planets, interactive camera, astronomical data, and a responsive interface.',
    },
    tags: [
      { label: 'React',       cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'TypeScript',  cls: 'bg-blue-400/10   text-blue-400   border-blue-400/20'   },
      { label: 'Three.js',    cls: 'bg-violet-400/10 text-violet-400 border-violet-400/20' },
      { label: 'TailwindCSS', cls: 'bg-sky-400/10    text-sky-400    border-sky-400/20'    },
    ],
    github: 'https://github.com/AleixAj/solar-system',
    demo: 'https://solarsystem.aleixaj.com',
  },
  {
    title: 'Lord of the Clicks',
    img: '/onering-gif.gif',
    imgCls: 'scale-[1.25] md:scale-[1.35] md:group-hover:scale-[1.42] p-0',
    desc: {
      es: 'Clicker incremental inspirado en la Tierra Media, con progresión por zonas, combate, compañeros, equipo, misiones y guardado persistente.',
      en: 'Middle-earth-inspired incremental clicker with zone progression, combat, companions, equipment, quests, and persistent saves.',
    },
    tags: [
      { label: 'React',      cls: 'bg-cyan-400/10   text-cyan-400   border-cyan-400/20'   },
      { label: 'TypeScript', cls: 'bg-blue-400/10   text-blue-400   border-blue-400/20'   },
      { label: 'Zustand',    cls: 'bg-purple-400/10 text-purple-400 border-purple-400/20' },
      { label: 'TailwindCSS', cls: 'bg-sky-400/10   text-sky-400    border-sky-400/20'    },
    ],
    github: 'https://github.com/AleixAj/lordoftheclicks',
    demo: 'https://lotrclicker.aleixaj.com/',
  },
]
