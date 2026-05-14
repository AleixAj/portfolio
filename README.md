# Aleix Auqué — Portfolio 3D

Portfolio de software developer orientado a empresas: presentación personal,
escena 3D ligera, proyectos desplegados, trayectoria profesional, stack técnico
y formulario de contacto.

## Stack

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei** — escena 3D GLB interactiva
- **Tailwind CSS 3**
- **EmailJS** — formulario de contacto sin backend
- **Cloudflare Workers + Assets** — despliegue SPA con Wrangler

## Estructura del proyecto

```
src/
├── consts/          # Datos estáticos (nav, skills, projects, experience, hobbies)
├── components/      # Componentes reutilizables (Navbar, ProjectCard, TimelineItem, Scene3D, StarBackground)
├── sections/        # Secciones de página (Hero, Trayectoria, Projects, Skills, Hobbies, Contact)
├── App.jsx          # Orquestador: lógica de scroll y navegación entre secciones
├── main.jsx
└── index.css
```

## Requisitos previos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz con tus credenciales de [EmailJS](https://www.emailjs.com/):

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

## Secciones

| Sección | Descripción |
|---|---|
| Inicio | Hero con escena 3D interactiva (OrbitControls en desktop) y palabras animadas |
| Trayectoria | Timeline doble: experiencia laboral y formación académica |
| Proyectos | Cards de proyectos con demo y enlace a GitHub |
| Skills | Grid de tecnologías con iconos y colores de marca |
| Arte | Galería de dibujos a lápiz con modal y navegación por teclado |
| Contacto | Formulario con EmailJS + footer con redes sociales |

## Despliegue

El proyecto está preparado para Cloudflare Workers + Assets:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`
- output directory: `dist`
- SPA fallback: `not_found_handling="single-page-application"`

`wrangler.jsonc` debe incluir `assets.directory="./dist"` para que Wrangler
sepa qué carpeta publicar después del build.

También puede desplegarse en Vercel/Netlify como SPA estática usando
`npm run build` y publicando `dist`, siempre añadiendo las variables de
EmailJS si se quiere activar el formulario.

## Notas de calidad

- Los proyectos enlazan a demos públicas y repositorios reales.
- La escena 3D se carga de forma diferida para reducir el JavaScript inicial.
- La galería de arte añade etiquetas accesibles y mantiene navegación por teclado.
- `npm run lint` y `npm run build` deben pasar antes de publicar.
