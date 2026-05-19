# Aleix Auqué - Software Developer Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184-111827?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-9-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

Portfolio profesional orientado a empresas y equipos técnicos. Presenta mi
perfil como desarrollador de software mediante una experiencia web cuidada,
multiidioma, proyectos reales desplegados, trayectoria profesional, stack
técnico y contacto directo.

El objetivo no es solo mostrar una landing visual, sino demostrar criterio de
producto, atención al detalle, capacidad full-stack y experiencia llevando
proyectos desde una idea hasta producción.

## Qué Demuestra

- Desarrollo frontend moderno con **React 19**, componentes reutilizables y una
  experiencia responsive pensada para desktop, tablet y móvil.
- Integración de una escena 3D ligera con **Three.js**, **React Three Fiber** y
  carga diferida para mantener buen rendimiento inicial.
- Interfaz **ES/EN** sin dependencias extra, con selector de idioma persistente
  en `localStorage` y contenido principal traducido.
- Presentación clara de experiencia laboral, formación y proyectos con demos
  públicas, repositorios reales y enlaces verificables.
- Cuidado por UX: navegación por secciones, animaciones sutiles, tarjetas de
  proyecto consistentes, formularios, estados responsive y adaptación a
  dispositivos táctiles.
- Preparación para producción con **Vite**, **Tailwind CSS**, **EmailJS** y
  despliegue en **Cloudflare Workers + Assets**.

## Proyectos Destacados

- **Obsidian**: e-commerce full-stack de streetwear con React, TypeScript,
  Laravel, Sanctum, carrito, wishlist sincronizados, checkout real y despliegue
  público.
- **Solar Explorer**: explorador 3D del Sistema Solar con React, TypeScript,
  Three.js, React Three Fiber, datos astronómicos, cámara interactiva e interfaz
  responsive.
- **FamilyTrivia**: trivia web interactiva para grupos, con tablero por
  categorías, puntuación dinámica y experiencia pensada para compartir en
  pantalla.
- **CashDrop**: juego web inspirado en concursos de televisión, con mecánica de
  apuestas, preguntas por rondas y demo independiente desplegada en
  `cashdrop.aleixaj.com`.

## Stack Principal

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei**
- **Tailwind CSS 3**
- **React Icons**
- **EmailJS**
- **Cloudflare Workers + Assets**
- **Laravel**, **PHP**, **MySQL**, **.NET**, **Docker** y herramientas de
  automatización/despliegue presentes en la sección de skills.

## Secciones Del Portfolio

- **Inicio**: presentación personal, escena 3D interactiva, mensajes dinámicos y
  CTA hacia proyectos.
- **Trayectoria**: experiencia laboral y formación académica sin scroll interno.
- **Proyectos**: tarjetas con logos adaptados a móvil, descripciones bilingües,
  tecnologías, GitHub y demo.
- **Skills**: tecnologías agrupadas por frontend, backend, DevOps y herramientas
  con iconos de marca.
- **Arte**: galería personal con modal y navegación por teclado.
- **Contacto**: formulario conectado con EmailJS y enlaces profesionales.

## Estructura

```txt
public/              # Assets estáticos (imágenes WebP, GLB, CV, galería hobbies/)
scripts/             # Pipeline de optimización de imágenes (sharp)
src/
├── consts/          # Datos estáticos: i18n, nav, skills, projects, experience, hobbies
├── components/      # Navbar, ProjectCard, TimelineItem, Scene3D, StarBackground
├── sections/        # Hero, Trayectoria, Projects, Skills, Hobbies, Contact
├── App.jsx          # Navegación, idioma, scroll y reveal animations
├── main.jsx
└── index.css        # Tailwind, animaciones y ajustes responsive
.env.example         # Plantilla de variables EmailJS (copiar a .env.local)
```

### Assets requeridos en `public/`

| Archivo | Uso |
|---------|-----|
| `gaming_bedroom.glb` | Modelo 3D del hero |
| `AJ.png` | Logo y favicon |
| `cv-aleix-en.pdf` | Descarga del CV (Hero y Contact) |
| `FamilyTrivia.webp`, `CashDrop.webp`, `obsidian-*.webp`, `solar-system.webp` | Tarjetas de proyectos |
| `hobbies/NN.webp` + `hobbies/NN-thumb.webp` | Galería de arte (completa + thumbnail) |

## Ejecución Local

Requisitos:

- Node.js 18+
- npm

Instalación y desarrollo:

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

## Variables De Entorno

Para activar el formulario de contacto, crea `.env.local` con credenciales de
[EmailJS](https://www.emailjs.com/):

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

## Scripts

```bash
npm run dev               # Servidor de desarrollo
npm run build             # Build de producción
npm run preview           # Build + preview con Wrangler
npm run deploy            # Build + deploy con Wrangler
npm run lint              # Linting con ESLint
npm run optimize:model    # Comprime gaming_bedroom.glb con meshopt + WebP
npm run optimize:images   # Convierte PNGs a WebP y genera thumbnails
```

## Despliegue

El proyecto está preparado para Cloudflare Workers + Assets:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`
- output directory: `dist`
- SPA fallback: `not_found_handling="single-page-application"`

También puede desplegarse en Vercel o Netlify como SPA estática usando
`npm run build` y publicando `dist`, añadiendo las variables de EmailJS si se
quiere activar el formulario.

## Calidad

- `npm run build` verificado antes de publicar.
- La escena 3D se carga de forma diferida para reducir el JavaScript inicial.
- Las secciones y tarjetas se compactan en móvil para evitar cortes visuales y
  mejorar la navegación táctil.
- Los proyectos enlazan a demos públicas y repositorios reales.
- El selector de idioma usa banderas SVG para evitar diferencias de renderizado
  entre sistemas operativos.

## Rendimiento

Pipeline de optimización de assets reproducible:

```bash
npm run optimize:model    # comprime el .glb con meshopt + texturas WebP (~85% menos)
npm run optimize:images   # convierte PNGs a WebP y genera thumbnails para la galería
```

Otras optimizaciones aplicadas:

- **Chunks separados** (Vite `manualChunks`): React, Three.js y EmailJS viajan en
  bundles independientes para mejor caché entre despliegues.
- **Lazy loading** de la escena 3D y del fondo de estrellas (`React.lazy`).
- **Preload** del modelo `.glb` con `fetchpriority="high"`; preconnect a fuentes
  y EmailJS.
- **Galería**: thumbnails de ~5 KB para la grilla y archivo completo solo en el
  modal activo, con `fetchpriority` adaptativo.
- **Móvil**: sin antialias en WebGL, DPR fijo a 1, sin animación flotante del
  modelo, `frameloop="demand"` cuando el hero no está visible.
