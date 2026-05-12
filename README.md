# Aleix Auqué — Portfolio 3D

Portfolio personal con escena 3D interactiva, animaciones y formulario de contacto.

## Stack

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei** — escena 3D con modelo GLTF
- **GSAP** — animaciones
- **Tailwind CSS 3**
- **EmailJS** — formulario de contacto sin backend

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
npm run preview  # Vista previa del build
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

El proyecto está configurado para desplegarse en cualquier hosting de estáticos. Para Vercel o Netlify basta con conectar el repositorio y añadir las variables de entorno del paso anterior.
