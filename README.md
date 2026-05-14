# Aleix Auqué - Software Developer Portfolio

Portfolio profesional orientado a empresas y equipos técnicos. Presenta mi
perfil como desarrollador de software mediante una experiencia web cuidada,
proyectos reales desplegados, trayectoria profesional, stack técnico y contacto
directo.

El objetivo no es solo mostrar una landing visual, sino demostrar criterio de
producto, atención al detalle, capacidad full-stack y experiencia llevando
proyectos desde una idea hasta producción.

## Qué Demuestra

- Desarrollo frontend moderno con **React 19**, componentes reutilizables y una
  experiencia responsive pensada para desktop, tablet y móvil.
- Integración de una escena 3D ligera con **Three.js**, **React Three Fiber** y
  carga diferida para mantener buen rendimiento inicial.
- Presentación clara de experiencia laboral, formación y proyectos con demos
  públicas, repositorios reales y enlaces verificables.
- Cuidado por UX: navegación por secciones, animaciones sutiles, tarjetas de
  proyecto consistentes, formularios y adaptación a dispositivos táctiles.
- Preparación para producción con **Vite**, **Tailwind CSS**, **EmailJS** y
  despliegue en **Cloudflare Workers + Assets**.

## Proyectos Destacados

- **Obsidian**: e-commerce full-stack de urban streetwear con React,
  TypeScript, CSS, Laravel 11 API, autenticación, carrito, wishlist, checkout y
  despliegue real.
- **FamilyTrivia**: juego de trivia para grupos, con tablero por categorías,
  puntuación por equipos y demo pública.
- **CashDrop**: juego inspirado en concursos de preguntas, con gestión de
  apuestas, avance por rondas y experiencia interactiva en navegador.

## Stack Principal

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei**
- **Tailwind CSS 3**
- **React Icons**
- **EmailJS**
- **Cloudflare Workers + Assets**

## Secciones Del Portfolio

- **Inicio**: presentación personal, escena 3D interactiva y mensajes dinámicos.
- **Trayectoria**: experiencia laboral y formación académica sin scroll interno.
- **Proyectos**: tarjetas con logos, descripciones, tecnologías, GitHub y demo.
- **Skills**: tecnologías agrupadas visualmente con iconos de marca.
- **Arte**: galería personal con modal y navegación por teclado.
- **Contacto**: formulario conectado con EmailJS y enlaces profesionales.

## Estructura

```txt
src/
├── consts/          # Datos estáticos: nav, skills, projects, experience, hobbies
├── components/      # Navbar, ProjectCard, TimelineItem, Scene3D, StarBackground
├── sections/        # Hero, Trayectoria, Projects, Skills, Hobbies, Contact
├── App.jsx          # Navegación entre secciones, scroll y reveal animations
├── main.jsx
└── index.css        # Tailwind, animaciones y ajustes responsive
```

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
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Build + preview con Wrangler
npm run deploy   # Build + deploy con Wrangler
npm run lint     # Linting con ESLint
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
- Las secciones evitan scroll interno innecesario para mejorar la navegación en
  dispositivos táctiles.
- Los proyectos enlazan a demos públicas y repositorios reales.
