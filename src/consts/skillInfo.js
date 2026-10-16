/**
 * One line per technology: what I use it for. Shown on the TV in the 3D room
 * when you pick a technology in the Skills panel. Same texts as the tables in
 * the READMEs (keep them in sync). Keyed by the label in SKILL_CATEGORIES /
 * AI_TOOLS (the Spanish one for translated labels).
 */
export const SKILL_INFO = {
  "HTML": {
    es: "Estructura semántica de las páginas y accesibilidad base.",
    en: "Semantic page structure and baseline accessibility.",
    ca: "Estructura semàntica de les pàgines i accessibilitat bàsica.",
  },
  "CSS": {
    es: "Estilos, diseño responsive y animaciones nativas del navegador.",
    en: "Styling, responsive layout and native browser animations.",
    ca: "Estils, disseny responsive i animacions natives del navegador.",
  },
  "XML": {
    es: "Marcado para configuración, intercambio de datos e integraciones con sistemas heredados.",
    en: "Markup for configuration, data exchange and integrations with legacy systems.",
    ca: "Marcatge per a configuració, intercanvi de dades i integracions amb sistemes heretats.",
  },
  "JavaScript": {
    es: "Lógica del cliente, manipulación del DOM y eventos.",
    en: "Client-side logic, DOM manipulation and events.",
    ca: "Lògica del client, manipulació del DOM i esdeveniments.",
  },
  "TypeScript": {
    es: "JavaScript con tipado estático para escalar proyectos sin perder claridad.",
    en: "Statically typed JavaScript to scale projects without losing clarity.",
    ca: "JavaScript amb tipatge estàtic per escalar projectes sense perdre claredat.",
  },
  "Bootstrap": {
    es: "Prototipado rápido y proyectos donde el sistema de componentes es suficiente.",
    en: "Rapid prototyping and projects where its component system is enough.",
    ca: "Prototipatge ràpid i projectes on el sistema de components és suficient.",
  },
  "Tailwind": {
    es: "Sistema de utilidades para diseño consistente y rápido (usado en este portfolio).",
    en: "Utility system for fast, consistent design (used in this portfolio).",
    ca: "Sistema d'utilitats per a un disseny coherent i ràpid (utilitzat en aquest portfolio).",
  },
  "Vite": {
    es: "Herramienta de build con HMR rápido y bundles optimizados para producción.",
    en: "Build tool with fast HMR and optimised production bundles.",
    ca: "Eina de build amb HMR ràpid i bundles optimitzats per a producció.",
  },
  "React": {
    es: "Biblioteca de interfaces basada en componentes; base de las apps de este portfolio.",
    en: "Component-based UI library; the foundation of the apps in this portfolio.",
    ca: "Biblioteca d'interfícies basada en components; base de les apps d'aquest portfolio.",
  },
  "Next.js": {
    es: "Framework de React con Server Components y Server Actions (usado en Nadir).",
    en: "React framework with Server Components and Server Actions (used in Nadir).",
    ca: "Framework de React amb Server Components i Server Actions (usat a Nadir).",
  },
  "Svelte": {
    es: "Framework compilado con reactividad fina (runes); SvelteKit como SPA estática en Waymark.",
    en: "Compiled framework with fine-grained reactivity (runes); SvelteKit as a static SPA in Waymark.",
    ca: "Framework compilat amb reactivitat fina (runes); SvelteKit com a SPA estàtica a Waymark.",
  },
  "Electron": {
    es: "Apps de escritorio con tecnologías web e instalador propio (usado en Kylen Chat y NEXUS).",
    en: "Desktop apps built with web technologies and their own installer (used in Kylen Chat and NEXUS).",
    ca: "Apps d'escriptori amb tecnologies web i instal·lador propi (usat a Kylen Chat i NEXUS).",
  },
  "Three.js": {
    es: "Escenas 3D en WebGL (cámaras, materiales, luces, geometría).",
    en: "3D scenes in WebGL (cameras, materials, lights, geometry).",
    ca: "Escenes 3D en WebGL (càmeres, materials, llums, geometria).",
  },
  "React Three Fiber": {
    es: "Renderizador declarativo de Three.js para React; usado en la portada 3D de esta web y en Solar Explorer.",
    en: "Declarative Three.js renderer for React; used in this site's 3D hero and in Solar Explorer.",
    ca: "Renderitzador declaratiu de Three.js per a React; usat a la portada 3D d'aquesta web i a Solar Explorer.",
  },
  "GSAP": {
    es: "Animaciones avanzadas con timelines y control fino sobre el tiempo.",
    en: "Advanced animations with timelines and fine-grained timing control.",
    ca: "Animacions avançades amb timelines i control precís del temps.",
  },
  "MapLibre": {
    es: "Mapas vectoriales y globo 3D en WebGL, de código abierto y sin claves de API (usado en Waymark).",
    en: "Vector maps and a WebGL 3D globe, open source with no API keys (used in Waymark).",
    ca: "Mapes vectorials i globus 3D en WebGL, de codi obert i sense claus d'API (usat a Waymark).",
  },
  "JSON": {
    es: "Formato estándar para APIs, configuración y serialización de estado.",
    en: "Standard format for APIs, configuration and state serialisation.",
    ca: "Format estàndard per a APIs, configuració i serialització d'estat.",
  },
  "PHP": {
    es: "Lenguaje backend para webs y APIs (proyectos personales y profesionales).",
    en: "Backend language for websites and APIs (personal and professional projects).",
    ca: "Llenguatge backend per a webs i APIs (projectes personals i professionals).",
  },
  "Java": {
    es: "Lenguaje orientado a objetos que aprendí en el bootcamp de Java (275 h).",
    en: "Object-oriented language I learned in a 275-hour Java bootcamp.",
    ca: "Llenguatge orientat a objectes que vaig aprendre al bootcamp de Java (275 h).",
  },
  "Laravel": {
    es: "Framework PHP full-stack: autenticación, ORM Eloquent, colas y APIs (usado en Obsidian).",
    en: "Full-stack PHP framework: authentication, Eloquent ORM, queues and APIs (used in Obsidian).",
    ca: "Framework PHP full-stack: autenticació, ORM Eloquent, cues i APIs (usat a Obsidian).",
  },
  "Node.js": {
    es: "Entorno de JavaScript para servidores, scripts y apps de escritorio.",
    en: "JavaScript runtime for servers, scripts and desktop apps.",
    ca: "Entorn de JavaScript per a servidors, scripts i apps d'escriptori.",
  },
  "MySQL": {
    es: "Base de datos relacional: modelado de datos y consultas con índices y joins.",
    en: "Relational database: data modelling and queries with indexes and joins.",
    ca: "Base de dades relacional: modelatge de dades i consultes amb índexs i joins.",
  },
  "PostgreSQL": {
    es: "Base de datos relacional en Nadir (Neon + Drizzle ORM) y Orbex (Supabase).",
    en: "Relational database in Nadir (Neon + Drizzle ORM) and Orbex (Supabase).",
    ca: "Base de dades relacional a Nadir (Neon + Drizzle ORM) i Orbex (Supabase).",
  },
  "Supabase": {
    es: "Backend con Postgres, autenticación y funciones en servidor (usado en Orbex).",
    en: "Backend with Postgres, authentication and server functions (used in Orbex).",
    ca: "Backend amb Postgres, autenticació i funcions al servidor (usat a Orbex).",
  },
  "API REST": {
    es: "Diseño de endpoints HTTP, recursos, versiones y contratos con frontends.",
    en: "Design of HTTP endpoints, resources, versioning and contracts with frontends.",
    ca: "Disseny d'endpoints HTTP, recursos, versions i contractes amb frontends.",
  },
  "Stripe": {
    es: "Pasarela de pagos: checkout, webhooks y suscripciones.",
    en: "Payment gateway: checkout, webhooks and subscriptions.",
    ca: "Passarel·la de pagaments: checkout, webhooks i subscripcions.",
  },
  "Git": {
    es: "Control de versiones distribuido: ramas, rebases y revisión mediante pull requests.",
    en: "Distributed version control: branching, rebasing and review through pull requests.",
    ca: "Control de versions distribuït: branques, rebases i revisió mitjançant pull requests.",
  },
  "Bitbucket": {
    es: "Alojamiento de repositorios y pull requests en entornos corporativos.",
    en: "Repository and pull request hosting in corporate environments.",
    ca: "Allotjament de repositoris i pull requests en entorns corporatius.",
  },
  "Docker": {
    es: "Contenedores reproducibles para desarrollo y despliegue.",
    en: "Reproducible containers for development and deployment.",
    ca: "Contenidors reproduïbles per a desenvolupament i desplegament.",
  },
  "Jenkins": {
    es: "Pipelines de CI/CD: build, tests y despliegue automatizado.",
    en: "CI/CD pipelines: build, tests and automated deployment.",
    ca: "Pipelines de CI/CD: build, tests i desplegament automatitzat.",
  },
  "GitHub Actions": {
    es: "CI/CD: lint, tests, builds y publicación automática de versiones.",
    en: "CI/CD: lint, tests, builds and automated releases.",
    ca: "CI/CD: lint, tests, builds i publicació automàtica de versions.",
  },
  "Vitest": {
    es: "Tests unitarios de la lógica de las apps (precios, gráficas, juego).",
    en: "Unit tests for app logic (prices, charts, game rules).",
    ca: "Tests unitaris de la lògica de les apps (preus, gràfiques, joc).",
  },
  "Cloudflare": {
    es: "Workers y Assets para desplegar este portfolio, Waymark y Nadir en su CDN global.",
    en: "Workers and Assets to deploy this portfolio, Waymark and Nadir on its global CDN.",
    ca: "Workers i Assets per desplegar aquest portfolio, Waymark i Nadir a la seva CDN global.",
  },
  "Railway": {
    es: "Alojamiento de aplicaciones y bases de datos para proyectos rápidos.",
    en: "App and database hosting for quick projects.",
    ca: "Allotjament d'aplicacions i bases de dades per a projectes ràpids.",
  },
  "Jira": {
    es: "Gestión de tickets, sprints y planificación ágil.",
    en: "Ticket management, sprints and agile planning.",
    ca: "Gestió de tiquets, sprints i planificació àgil.",
  },
  "Salesforce": {
    es: "CRM empresarial: gestión de releases y despliegues entre entornos en VIEWNEXT.",
    en: "Enterprise CRM: release management and deployments across environments at VIEWNEXT.",
    ca: "CRM empresarial: gestió de releases i desplegaments entre entorns a VIEWNEXT.",
  },
  "Godot": {
    es: "Motor de juegos 2D/3D con el que he creado Orbex, mi juego para Android.",
    en: "2D/3D game engine I used to build Orbex, my Android game.",
    ca: "Motor de jocs 2D/3D amb què he creat Orbex, el meu joc per a Android.",
  },
  "Photoshop": {
    es: "Edición de imágenes y diseño de recursos gráficos para interfaces.",
    en: "Image editing and graphic assets for interfaces.",
    ca: "Edició d'imatges i disseny de recursos gràfics per a interfícies.",
  },
  "Aseprite": {
    es: "Pixel art y animación de sprites para proyectos personales y videojuegos.",
    en: "Pixel art and sprite animation for personal projects and games.",
    ca: "Pixel art i animació de sprites per a projectes personals i videojocs.",
  },
  "Claude": {
    es: "Apoyo para programar, revisar código y documentar.",
    en: "Help with coding, code review and documentation.",
    ca: "Suport per programar, revisar codi i documentar.",
  },
  "GitHub Copilot": {
    es: "Autocompletado y refactorizaciones con IA dentro del editor.",
    en: "AI autocompletion and refactoring inside the editor.",
    ca: "Autocompletat i refactoritzacions amb IA dins de l'editor.",
  },
  "Cursor": {
    es: "Editor con agentes de IA para desarrollo asistido.",
    en: "Editor with AI agents for assisted development.",
    ca: "Editor amb agents d'IA per a desenvolupament assistit.",
  },
  "Codex": {
    es: "Agente de programación de OpenAI al que delego tareas de código.",
    en: "OpenAI's coding agent, for delegating programming tasks.",
    ca: "Agent de programació d'OpenAI a qui delego tasques de codi.",
  },
  "Higgsfield": {
    es: "Generación de imágenes y vídeo.",
    en: "Image and video generation.",
    ca: "Generació d'imatges i vídeo.",
  },
  "PixelLab": {
    es: "Generación de pixel art y sprites.",
    en: "Pixel art and sprite generation.",
    ca: "Generació de pixel art i sprites.",
  },
  "Suno": {
    es: "Generación de música.",
    en: "Music generation.",
    ca: "Generació de música.",
  },
}
