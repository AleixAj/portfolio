# Aleix Auqué - Software Developer Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184-111827?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-9-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

<p>
  <img src="docs/readme/lang-es-active.svg" alt="Español" width="170">
  <a href="README.en.md"><img src="docs/readme/lang-en.svg" alt="English" width="170"></a>
</p>

**Live portfolio:** [aleixaj.com](https://aleixaj.com)  
**LinkedIn:** [linkedin.com/in/aleixauque](https://linkedin.com/in/aleixauque/)  
**GitHub:** [github.com/AleixAj](https://github.com/AleixAj)

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
- Interfaz **trilingüe ES / EN / CAT** sin dependencias extra. Cada idioma tiene
  su propia URL (`/`, `/?lang=en`, `/?lang=ca`), de modo que un enlace compartido
  abre en el idioma en que se compartió; `hreflang`, `canonical`, `meta` y `og:*`
  se mantienen sincronizados con el idioma activo.
- **La URL refleja lo que se ve**: además del idioma, la sección visible se
  escribe como fragmento (`#projects`), así que cualquier sección se puede
  enlazar, guardar en marcadores o compartir.
- **Navegable entero con teclado**: enlace de salto al contenido, contenedor de
  scroll enfocable y soporte de AvPág/RePág, Inicio/Fin, flechas y espacio, que
  en una página cuyo scroll vive en un `div` no funcionan por defecto.
- **Fichas de proyecto**: cada tarjeta abre un diálogo con el resumen del README
  de su repositorio (qué es, qué tiene, stack y estado real), para que una
  empresa se haga una idea sin salir de la página ni abrir GitHub.
- **Arquitectura de scroll estable en móvil**: el documento queda bloqueado
  (`overflow: hidden`) y el contenido vive en un contenedor `fixed` con su
  propio scroll, evitando saltos al ocultarse/mostrarse la barra del navegador
  (`100dvh` cambiante) y los rebotes de overscroll.
- **Alineación lateral unificada**: todas las secciones comparten el mismo
  contenedor (`max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem]`) para que el contenido
  caiga sobre la misma línea vertical en todas las páginas.
- Hero con **mini-ficha profesional** lista para reclutadores: badge de búsqueda
  activa, perfiles a los que opto (frontend, full-stack, backend), ubicación,
  años de experiencia, modalidad e idiomas, doble CTA (proyectos + contacto) y
  el CV tanto para verlo en el navegador como para descargarlo.
- Presentación clara de experiencia laboral con **chips de cliente** para
  destacar marcas reconocibles, formación y proyectos con demos públicas,
  repositorios reales y enlaces verificables.
- Cuidado por UX: navegación por secciones con **indicador de sección activa**,
  animaciones sutiles, tarjetas de proyecto consistentes, formularios, estados
  responsive, adaptación a dispositivos táctiles y escalado progresivo en
  pantallas ultra anchas (`2xl` desde 2200px, `3xl` desde 2560px; `1920x1080`
  mantiene layout estándar).
- **Capa de animación con Framer Motion**: entradas escalonadas al hacer scroll,
  micro-interacciones de hover (tarjetas que se expanden con muelle), palabra
  rotativa del hero animada letra a letra (componente *RotatingText* de React
  Bits) y galería de arte con **swipe/arrastre** + transición de slide. Todo
  respeta `prefers-reduced-motion`.
- **Identidad tipográfica**: titulares en **Space Grotesk** y cuerpo en **DM
  Sans**, ambas **autoalojadas** (sin peticiones a terceros), con acento cian
  neón coherente con el logo en titulares y tarjetas.
- Accesibilidad revisada: enlace de salto al contenido, landmark `<main>`,
  `focus-visible` global, menú móvil y diálogos con `Escape` y focus trap,
  `aria-current` en navbar, formularios con labels y estados `aria-live`,
  áreas táctiles de 44 px en los diálogos, estilos `:hover` restringidos a
  dispositivos con puntero real y respeto de `prefers-reduced-motion`.
- Preparación para producción con **Vite**, **Tailwind CSS**, **EmailJS** y
  despliegue en **Cloudflare Workers + Assets**.

## Decisiones Técnicas Clave

- **Arquitectura data-driven**: textos, navegación, experiencia (con clientes
  destacados por puesto), skills, hobbies y proyectos viven en `src/consts/`,
  separando contenido de UI.
- **Carga progresiva**: `React.lazy` separa la escena 3D y el fondo de estrellas
  del bundle inicial.
- **Rendimiento 3D**: el modelo GLB (2,98 MB: 1,22 MB de texturas WebP y el resto
  geometría comprimida con meshopt) usa DPR adaptativo y sólo se precarga en
  pantallas de escritorio; en conexiones con ahorro de datos o 2G no se descarga
  ni el modelo ni Three.js, y el hero se queda en su degradado. La animación
  flotante corre también en móvil (sin control táctil, solo visual).
- **Animación y tipografía**: Framer Motion para entradas, hovers y la palabra
  rotativa del hero (*RotatingText* de React Bits); tipografía Space Grotesk +
  DM Sans; tarjetas de proyecto con glow cian (clase `.project-card`). Todo bajo
  control de `prefers-reduced-motion`.
- **Galería optimizada**: miniaturas WebP para la grilla y archivos completos
  solo cuando se abre el visor, con **swipe/arrastre** (móvil y escritorio) y
  precarga de las imágenes vecinas para un cambio instantáneo.
- **CV por idioma**: `CV_BY_LANG` en `App.jsx` es la única fuente de verdad
  (ruta + nombre de descarga) y alimenta los tres enlaces de CV del sitio (dos
  en el hero, uno en el footer), de modo que cambiar de CV es tocar un solo sitio.
- **SEO multiidioma real**: cada idioma tiene URL propia (`/`, `/?lang=en`,
  `/?lang=ca`), declarada en `hreflang` y en el sitemap, y `App.jsx` mantiene
  `canonical`, `title`, `description`, `og:*` y `twitter:*` apuntando a la URL
  del idioma activo. Antes los tres `hreflang` apuntaban a la misma dirección,
  que es justo lo que hace que un buscador los ignore. Las banderas del switcher (España, Reino Unido y la **senyera**)
  son SVG inline para que se rendericen idénticas en cualquier sistema operativo.
- **Rastreo e indexación**: `public/robots.txt` (con referencia al sitemap) y
  `public/sitemap.xml`; la imagen social declara `og:image:width/height/alt`
  para que LinkedIn/WhatsApp la rendericen sin recortes ni segunda petición.
- **Scroll lock controlado**: `html`/`body`/`#root` no scrollean; sólo lo hace
  `#app-scroll` con `overscroll-behavior: none` y `touch-action: pan-y`. Las
  secciones usan `min-h-full` en móvil y `100dvh` sólo en desktop para evitar
  reajustes al colapsar la barra del navegador.
- **Responsive real**: móvil, desktop estándar, táctil landscape y pantallas
  ultra anchas tienen ajustes dedicados; el hero compacta chips y CTAs en
  móvil para mantener el contenido por encima del fold.
- **Tipografía autoalojada**: los `.woff2` de Space Grotesk y DM Sans se sirven
  desde el propio dominio con su corte por rangos Unicode intacto. Se ahorra una
  hoja de estilos bloqueante y dos handshakes TLS en el camino crítico, la página
  deja de hacer peticiones a terceros (relevante para RGPD) y la CSP puede
  cerrarse a `style-src 'self'` y `font-src 'self'`.
- **Alineación centrada segura**: las secciones usan `align-items: safe center`,
  que centra mientras el contenido cabe y alinea arriba cuando no, en vez de
  desbordar por ambos lados y esconder el título tras la barra fija.
- **Despliegue simple**: build estático con Vite y publicación en Cloudflare
  Workers + Assets con fallback SPA, con cabeceras de caché por tipo de recurso
  (un año para el build con hash y las fuentes, 30 días para el modelo y las
  imágenes).

## Proyectos Destacados

### Obsidian

**[GitHub](https://github.com/AleixAj/obsidian) · [Demo](https://obsidian.aleixaj.com)**

E-commerce full-stack de streetwear construido para mostrar un flujo de tienda
real, desde catálogo hasta checkout.

- **Rol**: desarrollo frontend y backend.
- **Stack**: React 19, TypeScript, Vite, TanStack Query, Laravel 11, Sanctum, MySQL.
- **Qué demuestra**: arquitectura full-stack, autenticación por cookie, persistencia
  de carrito/wishlist contra el backend, consumo de API, estado de servidor y un
  checkout que genera pedidos reales en base de datos.
- **Estado**: la pasarela de pago está pendiente de conectar; el checkout crea
  pedidos pero todavía no cobra.

### Orbex

**[GitHub (web del juego)](https://github.com/AleixAj/orbex-web) · [Jugar en el navegador](https://kylen02.itch.io/orbex) · [Google Play](https://play.google.com/store/apps/details?id=com.aleix.orbex)**

Juego de puntería tipo *Zuma* para Android, hecho en solitario y publicado en
Google Play, con backend propio.

- **Rol**: diseño, programación, arte y backend.
- **Stack**: Godot 4.6, GDScript con tipado estático, Supabase (PostgreSQL),
  Android.
- **Qué demuestra**: motor de cadena propio, plugin de editor a medida para
  trazar los recorridos, curva de dificultad calculada por script y calibrada
  con telemetría, backend con ranking global y por nivel, amigos, guardado en la
  nube, borrado de cuenta (RGPD) y límites en servidor contra trampas.

### Kylen Chat for Twitch

**[GitHub](https://github.com/AleixAj/kylenchat) · [Instalador para Windows](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Setup.exe) · [Instalador para Mac](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Mac.dmg)**

App de escritorio para streamers con una sola pantalla: el chat de Twitch en una
ventana transparente que queda siempre encima del juego y deja pasar los clics.

- **Rol**: idea, desarrollo, diseño e identidad visual, publicación y mantenimiento.
- **Stack**: Electron, JavaScript, Node.js, WebSocket (Twitch IRC), electron-builder, GitHub Actions.
- **Qué demuestra**: app de escritorio real con instalador y actualizaciones
  automáticas desde GitHub Releases, versión para Mac (Intel y Apple Silicon)
  compilada automáticamente con GitHub Actions, chat en tiempo real con reconexión robusta,
  emotes de 7TV/BTTV/FFZ, rendimiento medido (menos del 2 % de un núcleo en chats
  muy rápidos, sin usar la tarjeta gráfica), perfiles por juego con atajo global,
  interfaz en español e inglés y validación de todos los datos que llegan.
- **Estado**: publicada para Windows y para Mac (en pruebas), código abierto con licencia MIT.
- **En el portfolio**: la ficha incluye una captura de la app en uso encima de una partida.

### Solar Explorer

**[GitHub](https://github.com/AleixAj/solar-system) · [Demo](https://solarsystem.aleixaj.com)**

Explorador 3D del Sistema Solar con escena WebGL, planetas seleccionables y
cámara interactiva.

- **Rol**: desarrollo frontend, interacción 3D y diseño responsive.
- **Stack**: React, TypeScript, Three.js, React Three Fiber, Tailwind CSS.
- **Qué demuestra**: trabajo con WebGL, composición de escena, interacción de
  cámara, datos visuales y experiencia responsive.

### Lord of the Clicks

**[GitHub](https://github.com/AleixAj/lordoftheclicks) · [Demo](https://lotrclicker.aleixaj.com/)**

Clicker incremental inspirado en la Tierra Media (30 zonas, 20 compañeros,
24 misiones), construido como una app frontend completa con progresión, guardado
persistente y lógica de juego separada de la interfaz.

- **Rol**: desarrollo frontend, arquitectura de juego y diseño responsive.
- **Stack**: React, TypeScript, Zustand, Tailwind CSS, Vitest.
- **Qué demuestra**: dominio modelado con TypeScript, estado global persistente,
  contenido data-driven, tests de lógica, accesibilidad y deploy en Cloudflare.

### FamilyTrivia

**[GitHub](https://github.com/AleixAj/familytrivia) · [Demo](https://familytrivia.aleixaj.com)**

Trivia web interactiva diseñada para jugar en grupo y compartir en pantalla.

- **Rol**: desarrollo completo de la experiencia.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, Chart.js.
- **Qué demuestra**: tablero de 6 categorías por 6 valores, tres modos de juego
  (individual, por personas o por parejas sorteadas con ruletas), preguntas con
  audio y reproductor propio, comodines y ranking final con estadísticas.

### CashDrop

**[GitHub](https://github.com/AleixAj/cashdrop) · [Demo](https://cashdrop.aleixaj.com/)**

Adaptación web del concurso: se reparte 1.000.000 € en 20 fajos entre cuatro
respuestas y solo se conserva lo colocado sobre la correcta.

- **Rol**: desarrollo completo de la experiencia.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, sin paso de build.
- **Qué demuestra**: modelado de reglas, arrastre con soporte táctil escrito a
  mano, banco de más de 125 preguntas desacoplado del motor y control de estado
  de partida.

## Stack Principal

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei**
- **Framer Motion** (animaciones e interacciones)
- **Tailwind CSS 3**
- **React Icons**
- **EmailJS**
- **Cloudflare Workers + Assets**
- **Laravel**, **PHP**, **MySQL**, **.NET**, **Docker** y herramientas de
  automatización/despliegue presentes en la sección de skills.
- **Godot** para desarrollo de juegos móviles fuera del portfolio.

## Skills · Para Qué Uso Cada Tecnología

Resumen breve de cada herramienta listada en la sección Skills del portfolio,
ordenado igual que en la UI (de base a especializado).

### Frontend

| Skill | Para qué la uso |
|-------|-----------------|
| **HTML** | Estructura semántica de las páginas y accesibilidad base. |
| **CSS** | Estilos, layout responsive y animaciones puras del navegador. |
| **XML** | Marcado para configuración, intercambio de datos e integraciones legacy. |
| **JavaScript** | Lógica del cliente, manipulación del DOM y eventos. |
| **TypeScript** | JavaScript con tipado estático para escalar proyectos sin perder claridad. |
| **Bootstrap** | Prototipado rápido y proyectos donde el sistema de componentes es suficiente. |
| **Tailwind** | Sistema de utilidades para diseño consistente y rápido (usado en este portfolio). |
| **Vite** | Build tool con HMR rápido y bundles optimizados para producción. |
| **React** | Librería UI basada en componentes; base de las apps de este portfolio. |
| **Three.js** | Escenas 3D en WebGL (cámaras, materiales, luces, geometría). |
| **React Three Fiber** | Renderer declarativo de Three.js en React; usado en el hero 3D y `Solar Explorer`. |
| **GSAP** | Animaciones avanzadas con timelines y control fino sobre el tiempo. |

### Backend

| Skill | Para qué la uso |
|-------|-----------------|
| **JSON** | Formato estándar para APIs, configuración y serialización de estado. |
| **PHP** | Lenguaje backend para webs y APIs (proyectos personales y profesionales). |
| **Java** | Lenguaje OO usado en formación y trabajos con backends empresariales. |
| **Laravel** | Framework PHP full-stack: autenticación, ORM Eloquent, queues y APIs (usado en `Obsidian`). |
| **.NET** | Stack de Microsoft para servicios y APIs en entornos corporativos. |
| **MySQL** | Base de datos relacional para modelar dominio y consultas con índices/joins. |
| **API Rest** | Diseño de endpoints HTTP, recursos, versiones y contratos con frontends. |
| **Stripe** | Pasarela de pagos: checkout, webhooks y suscripciones. |

### DevOps y herramientas

| Skill | Para qué la uso |
|-------|-----------------|
| **Git** | Control de versiones distribuido, ramas, rebases y revisión por PR. |
| **Bitbucket** | Hosting de repos y PRs en entornos corporativos. |
| **Docker** | Contenedores reproducibles para desarrollo y despliegue. |
| **Jenkins** | Pipelines de CI/CD: build, test, despliegue automatizado. |
| **Cloudflare** | Workers + Assets para despliegue del portfolio y CDN global. |
| **Railway** | Hosting de aplicaciones y bases de datos para proyectos rápidos. |
| **Jira** | Gestión de tickets, sprints y planificación ágil. |
| **Salesforce** | CRM empresarial (Apex, Lightning, integraciones). |
| **GitHub Copilot** | Asistente IA integrado en el IDE para autocompletar y refactors. |
| **Cursor** | IDE con agentes IA para desarrollo asistido y revisión de código. |
| **Claude** | Modelo IA para apoyo en arquitectura, código y documentación técnica. |
| **Godot** | Motor 2D/3D usado para desarrollo de juegos móviles personales. |
| **Photoshop** | Edición de imagen y diseño de assets para UI. |
| **Aseprite** | Pixel art y animación sprite para proyectos personales y game dev. |

## Secciones Del Portfolio

- **Inicio**: presentación personal, escena 3D interactiva, mensajes dinámicos,
  badge de búsqueda activa de empleo, mini-ficha profesional (perfiles, ubicación,
  años de experiencia, modalidad e idiomas), doble CTA hacia proyectos y contacto,
  y CV en dos acciones: verlo en el navegador o descargarlo.
- **Trayectoria**: experiencia laboral y formación académica sin scroll interno,
  con **chips de cliente** (`CaixaBank`, `Nestlé`, `Naturgy`) en los puestos
  donde los proyectos llegaron a marcas reconocibles.
- **Proyectos**: tarjetas con **glow cian estilo neón**, logos adaptados a móvil,
  descripciones trilingües, tecnologías, GitHub y, según el proyecto, demo,
  Google Play o descarga para Windows y Mac, con hover de expansión (muelle) en
  escritorio. Cada tarjeta tiene un botón de información que abre una **ficha del
  proyecto** con resumen, captura opcional, puntos destacados, stack y estado real, sacada del
  README de su repositorio. Orden por profundidad técnica (full-stack primero,
  después los productos publicados); si la última tarjeta queda sola en su fila,
  se centra.
- **Tecnologías** (`Skills` en EN): tecnologías agrupadas por frontend (incluye
  HTML, CSS, XML y herramientas de UI), backend, DevOps y herramientas (incluye
  `Godot` para game dev móvil y `Aseprite` para pixel art), con iconos de marca.
  Cada icono **enlaza a la web oficial** de la tecnología y tiene un efecto
  *glare* al pasar el ratón (solo escritorio).
- **Arte**: galería personal con visor a pantalla completa y navegación por
  **swipe/arrastre** (móvil y escritorio), teclado, flechas y puntos; las
  miniaturas se expanden al hover.
- **Contacto**: formulario conectado con EmailJS y enlaces profesionales.

## Estructura

```txt
public/              # Assets estáticos (imágenes WebP, GLB, CV, fuentes, galería hobbies/)
scripts/             # Pipeline de optimización de imágenes (sharp)
src/
├── consts/          # Datos estáticos: i18n, nav, skills, projects, experience, hobbies, device
├── components/      # Navbar, ProjectCard, ProjectModal, TimelineItem, Scene3D, StarBackground, RotatingText
├── sections/        # Hero, Trayectoria, Projects, Skills, Hobbies, Contact
├── App.jsx          # Navegación, idioma, URL, teclado, scroll y reveal animations
├── main.jsx
└── index.css        # Tailwind, tipografía, animaciones, glow de tarjetas y reglas responsive
.env.example         # Plantilla de variables EmailJS (copiar a .env.local)
```

### Assets requeridos en `public/`

| Archivo | Uso |
|---------|-----|
| `gaming_bedroom.glb` | Modelo 3D del hero |
| `AJ.png` | Logo en navbar y footer (295x224, 21 KB) |
| `favicon-32.png`, `apple-touch-icon.png` | Icono de pestaña y de pantalla de inicio |
| `fonts/*.woff2` | Space Grotesk y DM Sans autoalojadas (generadas desde Google Fonts, licencia OFL) |
| `og-image.png` | Imagen social para LinkedIn, WhatsApp y Twitter/X |
| `cv-aleix-es.pdf`, `cv-aleix-en.pdf` | Descarga del CV según idioma activo (Hero y Contact). ES y CAT comparten el mismo PDF; el atributo `download` fija el nombre con el que se guarda (`CV Aleix Auqué.pdf` / `CV Aleix Auqué EN.pdf`) en lugar del slug interno |
| `FamilyTrivia.webp`, `CashDrop.webp`, `obsidian-pixelart.webp`, `solar-explorerlogo.webp`, `orbex-icon.webp`, `kylen-chat.webp`, `kylen-chat-demo.webp`, `onering-gif.gif` | Tarjetas de proyectos (máx. 400 px; `npm run optimize:images` las mantiene en tamaño) |
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
npm run generate:og       # Genera public/og-image.png para social previews
npm run optimize:model    # Requiere @gltf-transform/cli; comprime el .glb con meshopt + WebP
npm run optimize:images   # Convierte PNG/JPEG a WebP, recorta el arte de las tarjetas y genera thumbnails
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
  mejorar la navegación táctil. El hero móvil reduce padding, chips visibles y
  tamaño de CTAs para mantener todo dentro del viewport.
- Los proyectos enlazan a demos públicas y repositorios reales.
- El selector de idioma usa banderas SVG para evitar diferencias de renderizado
  entre sistemas operativos.
- Metadata SEO y social preview configuradas en `index.html`, con
  **`hreflang` `es/en/ca/x-default`** apuntando a la URL real de cada idioma y
  **`og:locale:alternate`**, más un sitemap con las tres direcciones.
- `App.jsx` actualiza `title`, `description`, `og:*` y `twitter:*` en runtime
  al cambiar el idioma, manteniendo el SEO coherente para cada locale.
- JSON-LD `Person` para mejorar el contexto semántico del portfolio.
- Accesibilidad cuidada: **enlace de salto al contenido** y landmark `<main>`,
  `focus-visible` global, labels reales en formulario, navegación por teclado
  (incluido el scroll de página, que en un contenedor propio no funciona solo) y
  swipe en la galería, `aria-labels` en acciones con iconos, **menú móvil y
  diálogos con `Escape` + focus trap**,
  `aria-current="page"` para la sección activa en el navbar y respeto de
  **`prefers-reduced-motion`** (animaciones reducidas o desactivadas).
- **Indicador de sección activa** en el navbar (subrayado en desktop, marcador
  lateral en mobile) sincronizado con el scroll.
- Formulario con estados diferenciados: envío, éxito, error de servicio y falta
  de configuración de EmailJS.
- Teléfono fuera del footer público para evitar scraping; el contacto pasa por
  email, formulario, LinkedIn o CV.
- **Scroll y viewport estables en móvil**: documento bloqueado, contenedor de
  scroll fijo y secciones con `min-h-full` en móvil para evitar el salto típico
  al ocultarse la barra de direcciones; el fondo de estrellas queda fijo al
  viewport y se ve a través de las secciones semitransparentes.

### Verificación

- `npm run lint`: sin errores.
- `npm run build`: build de producción verificado.
- Primera visita medida sobre el build de producción, con CPU 4x más lenta y red
  móvil: **674 KB** sin contar el modelo 3D (que se descarga aparte y sólo donde
  procede), **CLS 0,034** y 261 ms de bloqueo del hilo principal.
- Recorrido completo sin errores de consola ni peticiones fallidas: seis
  secciones, las siete fichas de proyecto y la galería, en los tres idiomas.
- Revisado sin hallazgos: paridad de las 51 claves de traducción entre `es`,
  `en` y `ca`; jerarquía de encabezados sin saltos; ninguna imagen sin `alt`;
  ningún botón o enlace sin nombre accesible; sin `id` duplicados; todos los
  `target="_blank"` con `rel="noopener"`.
- Lighthouse local sobre preview de producción:
  - Accessibility: 98
  - Best Practices: 100
  - SEO: 92

> Nota: el score de performance de Lighthouse local queda condicionado por el
> hero 3D (Three.js/WebGL). El proyecto prioriza una experiencia visual 3D, con
> optimizaciones específicas para reducir peso, diferir carga y liberar GPU.

## Seguridad

SPA estático (sin backend propio salvo el formulario vía EmailJS) con varias
capas de defensa:

- **Cabeceras de seguridad** (`public/_headers`, aplicadas por Cloudflare en cada
  respuesta):
  - **Content-Security-Policy** estricta: scripts solo del propio origen (con
    `'wasm-unsafe-eval'` para el decodificador meshopt del modelo 3D), estilos
    inline acotados (React/Framer Motion + Tailwind) y un único origen externo
    permitido: la API de EmailJS. Al autoalojar las fuentes, `style-src` y
    `font-src` quedan en `'self'`.
  - **HSTS**, **X-Frame-Options: DENY** + `frame-ancestors 'none'` (anti-clickjacking),
    **X-Content-Type-Options: nosniff**, **Referrer-Policy**, **Permissions-Policy**
    (cámara/micrófono/geolocalización desactivados) y **Cross-Origin-Opener-Policy**.
- **Sin XSS**: React escapa el contenido por defecto; sin `dangerouslySetInnerHTML`,
  `innerHTML`, `eval` ni `new Function`.
- **Enlaces externos** con `rel="noopener noreferrer"` (anti reverse-tabnabbing).
- **Formulario de contacto endurecido**: honeypot anti-bots, rate limit entre
  envíos y `maxLength` en todos los campos.
- **Secretos fuera del repo**: las claves de EmailJS viven en `.env.local`
  (gitignored); solo se versiona `.env.example`.

> Hardening recomendado en el panel de EmailJS: restringir *Allowed Origins* al
> dominio, activar bot-protection/reCAPTCHA y el rate limit de la cuenta (la
> *public key* es visible en el bundle del cliente, como en cualquier integración
> EmailJS del lado del navegador).

## Para Revisores Técnicos

Puntos concretos que merece la pena revisar en el código:

- `src/App.jsx`: navegación por secciones, idioma tomado de `?lang=` y
  persistido, URL sincronizada con idioma y sección visible, scroll lock global
  con contenedor `#app-scroll` interno, acceso por teclado a ese contenedor
  (enlace de salto + reenvío de AvPág/Inicio/Fin/flechas mientras el foco está
  fuera), medición de las posiciones de sección al cambiar idioma, tamaño o
  fuentes, reveal animations y sincronización de `canonical` y meta tags con el
  idioma activo.
- `src/index.css`: `overflow: hidden` en `html`/`body`, `overscroll-behavior: none`
  y reglas responsive para mobile landscape.
- `src/components/Navbar.jsx`: indicador de sección activa (`aria-current`),
  mobile menu con focus trap, `Escape` para cerrar, retorno de foco al
  hamburger y `LanguageSwitcher` con banderas SVG (España, UK y senyera).
- `src/consts/i18n.js`, `nav.js`, `projects.js`, `experience.js`, `skills.jsx`:
  contenido trilingüe (`es`, `en`, `ca`) en una sola fuente de verdad.
- `src/sections/Hero.jsx`: badge de búsqueda activa, `ProfileChip`/`OpenToWorkBadge`
  reutilizables, doble CTA (proyectos + contacto), CV en ver/descargar, entrada
  escalonada con Framer Motion y palabra rotativa letra a letra (`src/components/RotatingText.jsx`,
  componente de React Bits adaptado).
- `src/components/ProjectModal.jsx`: diálogo de proyecto renderizado en un portal
  sobre `<body>` (el contenedor de scroll crea su propio contexto de apilado),
  con semántica de diálogo, focus trap, retorno de foco y bloqueo del fondo sin
  desplazamiento lateral gracias a `scrollbar-gutter: stable`.
- `src/consts/device.js`: detección de ahorro de datos/conexión lenta resuelta a
  nivel de módulo, antes de que React decida importar los chunks pesados.
- `src/components/ProjectCard.jsx`: tarjeta con glow cian (clase `.project-card`),
  entrada `whileInView` y hover de expansión con muelle, activo solo en
  dispositivos con puntero real (`matchMedia('(hover: hover)')`).
- `src/components/Scene3D.jsx`: carga del GLB, centrado automático del modelo,
  OrbitControls (solo escritorio), animación flotante también en móvil y balance
  rendimiento/nitidez con DPR adaptativo.
- `src/components/StarBackground.jsx`: fondo WebGL estático con `frameloop="demand"`.
- `src/components/TimelineItem.jsx`: chips de cliente con color de marca por
  experiencia para resaltar referencias relevantes (CaixaBank, Nestlé, Naturgy).
- `src/sections/Hobbies.jsx`: galería con thumbnails y visor con **swipe/drag**
  (Framer Motion `drag="x"` con umbral de distancia/velocidad), slide animado
  (`AnimatePresence`), teclado, flechas, puntos y precarga de vecinas.
- `scripts/optimize-images.mjs`: pipeline reproducible para optimizar assets.
- `vite.config.js`: separación de chunks para React, Three.js y EmailJS.

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
- **Modelo 3D** comprimido con meshopt + texturas WebP (2,98 MB), con preload
  restringido a pantallas de escritorio (`media="(min-width: 1024px)"`) para que
  en un móvil no compita con el CSS y el JS críticos.
- **Freno por conexión**: con ahorro de datos activado o en 2G no se descargan ni
  Three.js ni el modelo (`src/consts/device.js`); el hero muestra su degradado.
- **Fondo de estrellas** en `frameloop="demand"` (render estático; animación en
  CSS), con el número de estrellas reducido en móvil para liberar GPU.
- **Fuentes autoalojadas** con preload de los dos ficheros latinos y corte por
  rango Unicode (84 KB en total; el resto solo si el texto lo necesita).
- **Arte de las tarjetas recortado** a 400 px: de 509 KB a 145 KB, con el icono
  de Orbex pasando de 249 KB (JPEG 512x512) a 36 KB.
- **Caché por tipo de recurso** en `public/_headers`: un año e `immutable` para
  el build con hash y las fuentes, 30 días para modelo e imágenes.
- **Preconnect** a EmailJS para la primera petición del formulario.
- **Galería**: thumbnails de ~5 KB para la grilla, archivo completo solo en el
  visor activo y precarga de vecinas, con `fetchPriority` adaptativo.
- **Hero 3D**: antialias activo, DPR adaptativo con `PerformanceMonitor` y
  animación flotante también en móvil (sin control táctil); el render continuo
  solo se mantiene mientras el hero está visible (`frameloop="demand"` al salir).

El código fuente incluye comentarios en inglés orientados a revisión técnica en GitHub.
