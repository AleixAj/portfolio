# Aleix Auqué - Software Developer Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184-111827?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-9-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

<p>
  <a href="README.md"><img src="docs/readme/lang-es.svg" alt="Español" width="170"></a>
  <a href="README.en.md"><img src="docs/readme/lang-en.svg" alt="English" width="170"></a>
  <img src="docs/readme/lang-ca-active.svg" alt="Català" width="170">
</p>

**Portfolio en línia:** [aleixaj.com](https://aleixaj.com)  
**LinkedIn:** [linkedin.com/in/aleixauque](https://linkedin.com/in/aleixauque/)  
**GitHub:** [github.com/AleixAj](https://github.com/AleixAj)

Portfolio professional orientat a empreses i equips tècnics. Presenta el meu
perfil com a desenvolupador de programari mitjançant una experiència web
acurada, multilingüe, amb projectes reals desplegats, trajectòria professional,
stack tècnic i contacte directe.

L'objectiu no és només mostrar una landing visual, sinó demostrar criteri de
producte, atenció al detall, capacitat full-stack i experiència a l'hora de portar
projectes des d'una idea fins a producció.

## Què demostra

- Desenvolupament frontend modern amb **React 19**, components reutilitzables i
  una experiència responsive pensada per a escriptori, tauleta i mòbil.
- Integració d'una escena 3D lleugera amb **Three.js**, **React Three Fiber** i
  càrrega diferida per mantenir un bon rendiment inicial.
- Interfície **trilingüe ES / EN / CAT** sense dependències addicionals. Cada
  idioma té la seva pròpia URL (`/`, `/?lang=en`, `/?lang=ca`), de manera que un
  enllaç compartit s'obre en l'idioma en què es va compartir; `hreflang`,
  `canonical`, `meta` i `og:*` es mantenen sincronitzats amb l'idioma actiu.
- **La URL reflecteix el que es veu**: a més de l'idioma, la secció visible
  s'escriu com a fragment (`#projects`), així que qualsevol secció es pot
  enllaçar, desar a les adreces d'interès o compartir.
- **Totalment navegable amb el teclat**: enllaç de salt al contingut, contenidor de
  desplaçament enfocable i suport d'AvPàg/RePàg, Inici/Fi, fletxes i espai, que
  en una pàgina el desplaçament de la qual viu en un `div` no funcionen per
  defecte.
- **Fitxes de projecte**: cada targeta obre un diàleg amb el resum del README
  del seu repositori (què és, què té, stack i estat real), perquè una empresa se'n
  faci una idea sense sortir de la pàgina ni obrir GitHub.
- **Arquitectura de desplaçament estable al mòbil**: el document queda bloquejat
  (`overflow: hidden`) i el contingut viu en un contenidor `fixed` amb el seu
  propi desplaçament, cosa que evita salts quan s'amaga o es mostra la barra del
  navegador (`100dvh` canviant) i els rebots d'overscroll.
- **Alineació lateral unificada**: totes les seccions comparteixen el mateix
  contenidor (`max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem]`) perquè el contingut
  caigui sobre la mateixa línia vertical a totes les pàgines.
- Hero amb **minifitxa professional** preparada per a recrutadors: badge de
  cerca activa, perfils als quals opto (frontend, full-stack, backend),
  ubicació, anys d'experiència, modalitat i idiomes, doble CTA (projectes +
  contacte) i el CV tant per veure'l al navegador com per descarregar-lo.
- Presentació clara de l'experiència laboral amb **xips de client** per destacar
  marques reconeixibles, formació i projectes amb demos públiques, repositoris
  reals i enllaços verificables.
- Cura de la UX: navegació per seccions amb **indicador de secció activa**,
  animacions subtils, targetes de projecte coherents, formularis, estats
  responsive, adaptació a dispositius tàctils i escalat progressiu en pantalles
  ultraamples (`2xl` des de 2200px, `3xl` des de 2560px; `1920x1080` manté el
  layout estàndard).
- **Capa d'animació amb Framer Motion**: entrades esglaonades en fer scroll,
  microinteraccions de hover (targetes que s'expandeixen amb efecte molla),
  paraula rotativa del hero animada lletra a lletra (component *RotatingText* de
  React Bits) i galeria d'art amb **swipe/arrossegament** + transició de slide.
  Tot respecta `prefers-reduced-motion`.
- **Identitat tipogràfica**: titulars en **Space Grotesk** i cos en **DM
  Sans**, totes dues **autoallotjades** (sense peticions a tercers), amb un
  accent cian neó coherent amb el logo en titulars i targetes.
- Accessibilitat revisada: enllaç de salt al contingut, landmark `<main>`,
  `focus-visible` global, menú mòbil i diàlegs amb `Escape` i focus trap,
  `aria-current` a la navbar, formularis amb labels i estats `aria-live`, àrees
  tàctils de 44 px als diàlegs, estils `:hover` restringits a dispositius amb
  punter real i respecte per `prefers-reduced-motion`.
- Preparació per a producció amb **Vite**, **Tailwind CSS**, **EmailJS** i
  desplegament a **Cloudflare Workers + Assets**.

## Decisions tècniques clau

- **Arquitectura data-driven**: textos, navegació, experiència (amb clients
  destacats per lloc de treball), skills, hobbies i projectes viuen a
  `src/consts/`, separant el contingut de la UI.
- **Càrrega progressiva**: `React.lazy` separa l'escena 3D i el fons d'estrelles
  del bundle inicial.
- **Rendiment 3D**: el model GLB (2,98 MB: 1,22 MB de textures WebP i la resta
  geometria comprimida amb meshopt) fa servir DPR adaptatiu i només es precarrega
  en pantalles d'escriptori; en connexions amb estalvi de dades o 2G no es
  descarreguen ni el model ni Three.js, i el hero es queda amb el seu degradat.
  L'animació flotant també funciona al mòbil (sense control tàctil, només
  visual).
- **Animació i tipografia**: Framer Motion per a entrades, hovers i la paraula
  rotativa del hero (*RotatingText* de React Bits); tipografia Space Grotesk +
  DM Sans; targetes de projecte amb glow cian (classe `.project-card`). Tot sota
  el control de `prefers-reduced-motion`.
- **Galeria optimitzada**: miniatures WebP per a la graella i fitxers complets
  només quan s'obre el visor, amb **swipe/arrossegament** (mòbil i escriptori) i
  precàrrega de les imatges veïnes per a un canvi instantani.
- **CV per idioma**: `CV_BY_LANG` a `App.jsx` és l'única font de veritat (ruta +
  nom de descàrrega) i alimenta els tres enllaços de CV del lloc (dos al hero,
  un al footer), de manera que canviar de CV vol dir tocar un sol lloc.
- **SEO multilingüe real**: cada idioma té URL pròpia (`/`, `/?lang=en`,
  `/?lang=ca`), declarada a `hreflang` i al sitemap, i `App.jsx` manté
  `canonical`, `title`, `description`, `og:*` i `twitter:*` apuntant a la URL
  de l'idioma actiu. Abans els tres `hreflang` apuntaven a la mateixa adreça,
  i això és justament el que fa que un cercador els ignori. Les banderes del
  switcher (Espanya, Regne Unit i la **senyera**) són SVG inline perquè es
  renderitzin idèntiques en qualsevol sistema operatiu.
- **Rastreig i indexació**: `public/robots.txt` (amb referència al sitemap) i
  `public/sitemap.xml`; la imatge social declara `og:image:width/height/alt`
  perquè LinkedIn/WhatsApp la renderitzin sense retalls ni una segona petició.
- **Scroll lock controlat**: `html`/`body`/`#root` no es desplacen; només ho fa
  `#app-scroll` amb `overscroll-behavior: none` i `touch-action: pan-y`. Les
  seccions fan servir `min-h-full` al mòbil i `100dvh` només a l'escriptori per
  evitar reajustaments quan es plega la barra del navegador.
- **Responsive real**: mòbil, escriptori estàndard, tàctil en horitzontal i
  pantalles ultraamples tenen ajustos dedicats; el hero compacta xips i CTA al
  mòbil per mantenir el contingut per sobre del fold.
- **Tipografia autoallotjada**: els `.woff2` de Space Grotesk i DM Sans se
  serveixen des del mateix domini amb el tall per rangs Unicode intacte.
  S'estalvia un full d'estils bloquejant i dos handshakes TLS en el camí crític,
  la pàgina deixa de fer peticions a tercers (rellevant per al RGPD) i la CSP es
  pot tancar a `style-src 'self'` i `font-src 'self'`.
- **Alineació centrada segura**: les seccions fan servir `align-items: safe center`,
  que centra mentre el contingut hi cap i alinea a dalt quan no, en lloc de
  desbordar per tots dos costats i amagar el títol darrere de la barra fixa.
- **Desplegament senzill**: build estàtic amb Vite i publicació a Cloudflare
  Workers + Assets amb fallback SPA, amb capçaleres de memòria cau per tipus de
  recurs (un any per al build amb hash i les fonts, 30 dies per al model i les
  imatges).

## Projectes destacats

### Obsidian

**[GitHub](https://github.com/AleixAj/obsidian) · [Demo](https://obsidian.aleixaj.com)**

E-commerce full-stack de streetwear construït per mostrar un flux de botiga
real, des del catàleg fins al checkout.

- **Rol**: desenvolupament frontend i backend.
- **Stack**: React 19, TypeScript, Vite, TanStack Query, Laravel 11, Sanctum, MySQL.
- **Què demostra**: arquitectura full-stack, autenticació per cookie, persistència
  de la cistella/wishlist contra el backend, consum d'API, estat de servidor i un
  checkout que genera comandes reals a la base de dades.
- **Estat**: la passarel·la de pagament està pendent de connectar; el checkout
  crea comandes però encara no cobra.

### Orbex

**[GitHub (web del joc)](https://github.com/AleixAj/orbex-web) · [Jugar al navegador](https://kylen02.itch.io/orbex) · [Google Play](https://play.google.com/store/apps/details?id=com.aleix.orbex)**

Joc de punteria estil *Zuma* per a Android, fet en solitari i publicat a Google
Play, amb backend propi.

- **Rol**: disseny, programació, art i backend.
- **Stack**: Godot 4.6, GDScript amb tipatge estàtic, Supabase (PostgreSQL),
  Android.
- **Què demostra**: motor de cadena propi, plugin d'editor a mida per traçar els
  recorreguts, corba de dificultat calculada per script i calibrada amb
  telemetria, backend amb rànquing global i per nivell, amics, desament al núvol,
  esborrament del compte (RGPD) i límits al servidor contra trampes.

### Nadir

**[GitHub](https://github.com/AleixAj/nadir) · [Demo](https://nadir.aleixaj.com)**

Monitor de preus plantejat com un SaaS real: compara el mateix producte a
diverses botigues, en desa l'històric i avisa quan baixa del preu objectiu.

- **Rol**: disseny, frontend, backend i desplegament.
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Neon Postgres,
  Drizzle ORM, Better Auth, Zod, Vitest, Cloudflare Workers (OpenNext).
- **Què demostra**: Server Actions validades amb Zod que comproven la sessió i
  la propietat de les dades, comptes amb Google o correu, perfil amb foto,
  llistes pròpies, gràfica de l'històric feta en SVG, comparativa de botigues
  per preu final, tasca programada amb Cron Trigger, protecció SSRF en llegir
  pàgines i una demo sense registre.
- **Estat**: publicat a `nadir.aleixaj.com`. Les grans botigues no deixen
  llegir els seus preus, així que el catàleg és real però la seva evolució se
  simula (la web ho indica). Falten els avisos per correu.

### Kylen Chat for Twitch

**[GitHub](https://github.com/AleixAj/kylenchat) · [Instal·lador per a Windows](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Setup.exe) · [Instal·lador per a Mac](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Mac.dmg)**

App d'escriptori per a streamers amb una sola pantalla: el xat de Twitch en una
finestra transparent que queda sempre damunt del joc i deixa passar els clics.

- **Rol**: idea, desenvolupament, disseny i identitat visual, publicació i manteniment.
- **Stack**: Electron, JavaScript, Node.js, WebSocket (Twitch IRC), electron-builder, GitHub Actions.
- **Què demostra**: app d'escriptori real amb instal·lador i actualitzacions
  automàtiques des de GitHub Releases, versió per a Mac (Intel i Apple Silicon)
  compilada automàticament amb GitHub Actions, xat en temps real amb reconnexió robusta,
  emotes de 7TV/BTTV/FFZ, rendiment mesurat (menys del 2 % d'un nucli en xats
  molt ràpids, sense fer servir la targeta gràfica), perfils per joc amb drecera global, avisos de directe amb un requadre propi damunt del joc,
  interfície en castellà i anglès i validació de totes les dades que arriben.
- **Estat**: publicada per a Windows i per a Mac (en proves), codi obert amb llicència MIT.
- **Al portfolio**: la fitxa inclou una captura de l'app en ús damunt d'una partida.

### Solar Explorer

**[GitHub](https://github.com/AleixAj/solar-system) · [Demo](https://solarsystem.aleixaj.com)**

Explorador 3D del Sistema Solar amb escena WebGL, planetes seleccionables i
càmera interactiva.

- **Rol**: desenvolupament frontend, interacció 3D i disseny responsive.
- **Stack**: React, TypeScript, Three.js, React Three Fiber, Tailwind CSS.
- **Què demostra**: treball amb WebGL, composició d'escena, interacció de
  càmera, dades visuals i experiència responsive.

### Lord of the Clicks

**[GitHub](https://github.com/AleixAj/lordoftheclicks) · [Demo](https://lotrclicker.aleixaj.com/)**

Clicker incremental inspirat en la Terra Mitjana (30 zones, 20 companys,
24 missions), construït com una app frontend completa amb progressió, desament
persistent i lògica de joc separada de la interfície.

- **Rol**: desenvolupament frontend, arquitectura de joc i disseny responsive.
- **Stack**: React, TypeScript, Zustand, Tailwind CSS, Vitest.
- **Què demostra**: domini modelat amb TypeScript, estat global persistent,
  contingut data-driven, tests de lògica, accessibilitat i deploy a Cloudflare.

### FamilyTrivia

**[GitHub](https://github.com/AleixAj/familytrivia) · [Demo](https://familytrivia.aleixaj.com)**

Trivial web interactiu dissenyat per jugar en grup i compartir en pantalla.

- **Rol**: desenvolupament complet de l'experiència.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, Chart.js.
- **Què demostra**: tauler de 6 categories per 6 valors, tres modes de joc
  (individual, per persones o per parelles sortejades amb ruletes), preguntes amb
  àudio i reproductor propi, comodins i rànquing final amb estadístiques.

### CashDrop

**[GitHub](https://github.com/AleixAj/cashdrop) · [Demo](https://cashdrop.aleixaj.com/)**

Adaptació web del concurs: es reparteix 1.000.000 € en 20 feixos entre quatre
respostes i només es conserva el que s'ha col·locat sobre la correcta.

- **Rol**: desenvolupament complet de l'experiència.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, sense pas de build.
- **Què demostra**: modelatge de regles, arrossegament amb suport tàctil escrit a
  mà, banc de més de 125 preguntes desacoblat del motor i control de l'estat de
  la partida.

## Stack principal

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei**
- **Framer Motion** (animacions i interaccions)
- **Tailwind CSS 3**
- **React Icons**
- **EmailJS**
- **Cloudflare Workers + Assets**
- **Laravel**, **PHP**, **MySQL**, **.NET**, **Docker** i eines
  d'automatització/desplegament presents a la secció de tecnologies.
- **Godot** per al desenvolupament de jocs mòbils fora del portfolio.

## Skills · Per a què faig servir cada tecnologia

Resum breu de cada eina llistada a la secció Tecnologies del portfolio, ordenat igual
que a la UI (de base a especialitzat).

### Frontend

| Skill | Per a què la faig servir |
|-------|-----------------|
| **HTML** | Estructura semàntica de les pàgines i accessibilitat bàsica. |
| **CSS** | Estils, layout responsive i animacions pures del navegador. |
| **XML** | Marcatge per a configuració, intercanvi de dades i integracions legacy. |
| **JavaScript** | Lògica del client, manipulació del DOM i esdeveniments. |
| **TypeScript** | JavaScript amb tipatge estàtic per escalar projectes sense perdre claredat. |
| **Bootstrap** | Prototipatge ràpid i projectes on el sistema de components és suficient. |
| **Tailwind** | Sistema d'utilitats per a un disseny coherent i ràpid (utilitzat en aquest portfolio). |
| **Vite** | Build tool amb HMR ràpid i bundles optimitzats per a producció. |
| **React** | Biblioteca d'UI basada en components; base de les apps d'aquest portfolio. |
| **Next.js** | Framework de React amb Server Components i Server Actions (usat a `Nadir`). |
| **Electron** | Apps d'escriptori amb tecnologies web i instal·lador propi (usat a `Kylen Chat`). |
| **Three.js** | Escenes 3D en WebGL (càmeres, materials, llums, geometria). |
| **React Three Fiber** | Renderer declaratiu de Three.js a React; utilitzat al hero 3D i a `Solar Explorer`. |
| **GSAP** | Animacions avançades amb timelines i control precís del temps. |

### Backend

| Skill | Per a què la faig servir |
|-------|-----------------|
| **JSON** | Format estàndard per a APIs, configuració i serialització d'estat. |
| **PHP** | Llenguatge backend per a webs i APIs (projectes personals i professionals). |
| **Java** | Llenguatge OO utilitzat en formació i feines amb backends empresarials. |
| **Laravel** | Framework PHP full-stack: autenticació, ORM Eloquent, queues i APIs (utilitzat a `Obsidian`). |
| **.NET** | Stack de Microsoft per a serveis i APIs en entorns corporatius. |
| **Node.js** | Entorn de JavaScript per a servidors, scripts i apps d'escriptori. |
| **MySQL** | Base de dades relacional per modelar el domini i consultes amb índexs/joins. |
| **PostgreSQL** | Base de dades relacional a `Nadir` (Neon + Drizzle ORM) i `Orbex` (Supabase). |
| **Supabase** | Backend amb Postgres, inici de sessió i funcions al servidor (usat a `Orbex`). |
| **API Rest** | Disseny d'endpoints HTTP, recursos, versions i contractes amb frontends. |
| **Stripe** | Passarel·la de pagaments: checkout, webhooks i subscripcions. |

### DevOps i eines

| Skill | Per a què la faig servir |
|-------|-----------------|
| **Git** | Control de versions distribuït, branques, rebases i revisió per PR. |
| **Bitbucket** | Hosting de repos i PRs en entorns corporatius. |
| **Docker** | Contenidors reproduïbles per a desenvolupament i desplegament. |
| **Jenkins** | Pipelines de CI/CD: build, test, desplegament automatitzat. |
| **GitHub Actions** | CI/CD: lint, tests, builds i publicació automàtica de versions. |
| **Vitest** | Tests unitaris de la lògica de les apps (preus, gràfiques, joc). |
| **Cloudflare** | Workers + Assets per al desplegament del portfolio i CDN global. |
| **Railway** | Hosting d'aplicacions i bases de dades per a projectes ràpids. |
| **Jira** | Gestió de tiquets, sprints i planificació àgil. |
| **Salesforce** | CRM empresarial (Apex, Lightning, integracions). |
| **GitHub Copilot** | Assistent d'IA integrat a l'IDE per autocompletar i fer refactors. |
| **Cursor** | IDE amb agents d'IA per a desenvolupament assistit i revisió de codi. |
| **Claude** | Model d'IA com a suport en arquitectura, codi i documentació tècnica. |
| **Godot** | Motor 2D/3D utilitzat per al desenvolupament de jocs mòbils personals. |
| **Photoshop** | Edició d'imatge i disseny d'assets per a la UI. |
| **Aseprite** | Pixel art i animació de sprites per a projectes personals i game dev. |

## Seccions del portfolio

- **Inici**: presentació personal, escena 3D interactiva, missatges dinàmics,
  badge de cerca activa de feina, minifitxa professional (perfils, ubicació,
  anys d'experiència, modalitat i idiomes), doble CTA cap a projectes i
  contacte, i CV en dues accions: veure'l al navegador o descarregar-lo.
- **Trajectòria**: experiència laboral i formació acadèmica sense scroll intern,
  amb **xips de client** (`CaixaBank`, `Nestlé`, `Naturgy`) als llocs de treball
  on els projectes van arribar a marques reconeixibles.
- **Projectes**: targetes amb **glow cian estil neó**, logos adaptats al mòbil,
  descripcions trilingües, tecnologies, GitHub i, segons el projecte, demo,
  Google Play o descàrrega per a Windows i Mac, amb hover d'expansió (molla) a
  l'escriptori. Cada targeta té un botó d'informació que obre una **fitxa del
  projecte** amb resum, captura opcional, punts destacats, stack i estat real, extreta del
  README del seu repositori. Ordre per profunditat tècnica (full-stack primer,
  després els productes publicats); si l'última targeta queda sola a la seva
  fila, es centra.
- **Tecnologies** (`Skills` en anglès): tecnologies agrupades en frontend (inclou
  HTML, CSS, XML i eines d'UI), backend, DevOps i eines (inclou `Godot` per a
  game dev mòbil i `Aseprite` per a pixel art), amb icones de marca. Cada icona
  **enllaça al web oficial** de la tecnologia i té un efecte *glare* en passar-hi
  el ratolí (només escriptori).
- **Art**: galeria personal amb visor a pantalla completa i navegació per
  **swipe/arrossegament** (mòbil i escriptori), teclat, fletxes i punts; les
  miniatures s'expandeixen amb el hover.
- **Contacte**: formulari connectat amb EmailJS i enllaços professionals.

## Estructura

```txt
public/              # Assets estàtics (imatges WebP, GLB, CV, fonts, galeria hobbies/)
scripts/             # Pipeline d'optimització d'imatges (sharp)
src/
├── consts/          # Dades estàtiques: i18n, nav, skills, projects, experience, hobbies, device
├── components/      # Navbar, ProjectCard, ProjectModal, TimelineItem, Scene3D, StarBackground, RotatingText
├── sections/        # Hero, Trayectoria, Projects, Skills, Hobbies, Contact
├── App.jsx          # Navegació, idioma, URL, teclat, scroll i reveal animations
├── main.jsx
└── index.css        # Tailwind, tipografia, animacions, glow de targetes i regles responsive
.env.example         # Plantilla de variables d'EmailJS (copiar a .env.local)
```

### Assets necessaris a `public/`

| Fitxer | Ús |
|---------|-----|
| `gaming_bedroom.glb` | Model 3D del hero |
| `AJ.png` | Logo a la navbar i al footer (295x224, 21 KB) |
| `favicon-32.png`, `apple-touch-icon.png` | Icona de pestanya i de pantalla d'inici |
| `fonts/*.woff2` | Space Grotesk i DM Sans autoallotjades (generades des de Google Fonts, llicència OFL) |
| `og-image.png` | Imatge social per a LinkedIn, WhatsApp i Twitter/X |
| `cv-aleix-es.pdf`, `cv-aleix-en.pdf` | Descàrrega del CV segons l'idioma actiu (Hero i Contact). ES i CAT comparteixen el mateix PDF; l'atribut `download` fixa el nom amb què es desa (`CV Aleix Auqué.pdf` / `CV Aleix Auqué EN.pdf`) en lloc del slug intern |
| `FamilyTrivia.webp`, `CashDrop.webp`, `obsidian-pixelart.webp`, `solar-explorerlogo.webp`, `orbex-icon.webp`, `nadir-logo.webp`, `kylen-chat.webp`, `kylen-chat-demo.webp`, `onering-gif.gif` | Targetes de projectes (màx. 400 px; `npm run optimize:images` les manté a la mida) |
| `hobbies/NN.webp` + `hobbies/NN-thumb.webp` | Galeria d'art (completa + miniatura) |

## Execució local

Requisits:

- Node.js 18+
- npm

Instal·lació i desenvolupament:

```bash
npm install
npm run dev
```

Build de producció:

```bash
npm run build
```

## Variables d'entorn

Per activar el formulari de contacte, crea `.env.local` amb credencials
d'[EmailJS](https://www.emailjs.com/):

```env
VITE_EMAILJS_SERVICE_ID=el_teu_service_id
VITE_EMAILJS_TEMPLATE_ID=el_teu_template_id
VITE_EMAILJS_PUBLIC_KEY=la_teva_public_key
```

## Scripts

```bash
npm run dev               # Servidor de desenvolupament
npm run build             # Build de producció
npm run preview           # Build + preview amb Wrangler
npm run deploy            # Build + deploy amb Wrangler
npm run lint              # Linting amb ESLint
npm run generate:og       # Genera public/og-image.png per a les social previews
npm run optimize:model    # Requereix @gltf-transform/cli; comprimeix el .glb amb meshopt + WebP
npm run optimize:images   # Converteix PNG/JPEG a WebP, retalla l'art de les targetes i genera miniatures
```

## Desplegament

El projecte està preparat per a Cloudflare Workers + Assets:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`
- output directory: `dist`
- SPA fallback: `not_found_handling="single-page-application"`

També es pot desplegar a Vercel o Netlify com a SPA estàtica fent servir
`npm run build` i publicant `dist`, afegint les variables d'EmailJS si es vol
activar el formulari.

## Qualitat

- `npm run build` verificat abans de publicar.
- L'escena 3D es carrega de manera diferida per reduir el JavaScript inicial.
- Les seccions i targetes es compacten al mòbil per evitar talls visuals i
  millorar la navegació tàctil. El hero mòbil redueix el padding, els xips
  visibles i la mida dels CTA per mantenir-ho tot dins del viewport.
- Els projectes enllacen a demos públiques i repositoris reals.
- El selector d'idioma fa servir banderes SVG per evitar diferències de
  renderitzat entre sistemes operatius.
- Metadades SEO i social preview configurades a `index.html`, amb
  **`hreflang` `es/en/ca/x-default`** apuntant a la URL real de cada idioma i
  **`og:locale:alternate`**, a més d'un sitemap amb les tres adreces.
- `App.jsx` actualitza `title`, `description`, `og:*` i `twitter:*` en temps
  d'execució en canviar l'idioma, i així manté el SEO coherent per a cada locale.
- JSON-LD `Person` per millorar el context semàntic del portfolio.
- Accessibilitat acurada: **enllaç de salt al contingut** i landmark `<main>`,
  `focus-visible` global, labels reals al formulari, navegació amb el teclat
  (inclòs el desplaçament de la pàgina, que en un contenidor propi no funciona
  sol) i swipe a la galeria, `aria-labels` en accions amb icones, **menú mòbil i
  diàlegs amb `Escape` + focus trap**,
  `aria-current="page"` per a la secció activa a la navbar i respecte de
  **`prefers-reduced-motion`** (animacions reduïdes o desactivades).
- **Indicador de secció activa** a la navbar (subratllat a l'escriptori,
  marcador lateral al mòbil) sincronitzat amb el scroll.
- Formulari amb estats diferenciats: enviament, èxit, error del servei i manca
  de configuració d'EmailJS.
- Telèfon fora del footer públic per evitar el scraping; el contacte passa per
  correu electrònic, formulari, LinkedIn o CV.
- **Scroll i viewport estables al mòbil**: document bloquejat, contenidor de
  desplaçament fix i seccions amb `min-h-full` al mòbil per evitar el salt típic
  quan s'amaga la barra d'adreces; el fons d'estrelles queda fix al viewport i es
  veu a través de les seccions semitransparents.

### Verificació

- `npm run lint`: sense errors.
- `npm run build`: build de producció verificat.
- Primera visita mesurada sobre el build de producció, amb la CPU 4x més lenta i
  xarxa mòbil: **674 KB** sense comptar el model 3D (que es descarrega a part i
  només on escau), **CLS 0,034** i 261 ms de bloqueig del fil principal.
- Recorregut complet sense errors de consola ni peticions fallides: sis
  seccions, les set fitxes de projecte i la galeria, en els tres idiomes.
- Revisat sense incidències: paritat de les 51 claus de traducció entre `es`,
  `en` i `ca`; jerarquia d'encapçalaments sense salts; cap imatge sense `alt`;
  cap botó ni enllaç sense nom accessible; sense `id` duplicats; tots els
  `target="_blank"` amb `rel="noopener"`.
- Lighthouse local sobre la preview de producció:
  - Accessibility: 98
  - Best Practices: 100
  - SEO: 92

> Nota: la puntuació de performance de Lighthouse local queda condicionada pel
> hero 3D (Three.js/WebGL). El projecte prioritza una experiència visual 3D, amb
> optimitzacions específiques per reduir pes, diferir la càrrega i alliberar la GPU.

## Seguretat

SPA estàtica (sense backend propi excepte el formulari, que passa per EmailJS) amb diverses
capes de defensa:

- **Capçaleres de seguretat** (`public/_headers`, aplicades per Cloudflare a
  cada resposta):
  - **Content-Security-Policy** estricta: scripts només del mateix origen (amb
    `'wasm-unsafe-eval'` per al descodificador meshopt del model 3D), estils
    inline limitats (React/Framer Motion + Tailwind) i un únic origen extern
    permès: l'API d'EmailJS. En autoallotjar les fonts, `style-src` i
    `font-src` queden en `'self'`.
  - **HSTS**, **X-Frame-Options: DENY** + `frame-ancestors 'none'` (anti-clickjacking),
    **X-Content-Type-Options: nosniff**, **Referrer-Policy**, **Permissions-Policy**
    (càmera/micròfon/geolocalització desactivats) i **Cross-Origin-Opener-Policy**.
- **Sense XSS**: React escapa el contingut per defecte; sense `dangerouslySetInnerHTML`,
  `innerHTML`, `eval` ni `new Function`.
- **Enllaços externs** amb `rel="noopener noreferrer"` (anti reverse-tabnabbing).
- **Formulari de contacte reforçat**: honeypot antibots, rate limit entre
  enviaments i `maxLength` a tots els camps.
- **Secrets fora del repo**: les claus d'EmailJS viuen a `.env.local`
  (gitignored); només es versiona `.env.example`.

> Hardening recomanat al panell d'EmailJS: restringir *Allowed Origins* al
> domini, activar bot-protection/reCAPTCHA i el rate limit del compte (la
> *public key* és visible al bundle del client, com en qualsevol integració
> d'EmailJS del costat del navegador).

## Per a revisors tècnics

Punts concrets que val la pena revisar al codi:

- `src/App.jsx`: navegació per seccions, idioma pres de `?lang=` i persistit,
  URL sincronitzada amb l'idioma i la secció visible, scroll lock global amb
  contenidor `#app-scroll` intern, accés amb el teclat a aquest contenidor
  (enllaç de salt + reenviament d'AvPàg/Inici/Fi/fletxes mentre el focus és
  fora), mesura de les posicions de secció en canviar l'idioma, la mida o les
  fonts, reveal animations i sincronització de `canonical` i meta tags amb
  l'idioma actiu.
- `src/index.css`: `overflow: hidden` a `html`/`body`, `overscroll-behavior: none`
  i regles responsive per a mobile landscape.
- `src/components/Navbar.jsx`: indicador de secció activa (`aria-current`),
  mobile menu amb focus trap, `Escape` per tancar, retorn del focus al
  hamburger i `LanguageSwitcher` amb banderes SVG (Espanya, UK i senyera).
- `src/consts/i18n.js`, `nav.js`, `projects.js`, `experience.js`, `skills.jsx`:
  contingut trilingüe (`es`, `en`, `ca`) en una sola font de veritat.
- `src/sections/Hero.jsx`: badge de cerca activa, `ProfileChip`/`OpenToWorkBadge`
  reutilitzables, doble CTA (projectes + contacte), CV per veure o descarregar,
  entrada esglaonada amb Framer Motion i paraula rotativa lletra a lletra (`src/components/RotatingText.jsx`,
  component de React Bits adaptat).
- `src/components/ProjectModal.jsx`: diàleg de projecte renderitzat en un portal
  sobre `<body>` (el contenidor de scroll crea el seu propi context d'apilament),
  amb semàntica de diàleg, focus trap, retorn del focus i bloqueig del fons sense
  desplaçament lateral gràcies a `scrollbar-gutter: stable`.
- `src/consts/device.js`: detecció d'estalvi de dades/connexió lenta resolta a
  nivell de mòdul, abans que React decideixi importar els chunks pesants.
- `src/components/ProjectCard.jsx`: targeta amb glow cian (classe `.project-card`),
  entrada `whileInView` i hover d'expansió amb molla, actiu només en
  dispositius amb punter real (`matchMedia('(hover: hover)')`).
- `src/components/Scene3D.jsx`: càrrega del GLB, centrat automàtic del model,
  OrbitControls (només escriptori), animació flotant també al mòbil i equilibri
  rendiment/nitidesa amb DPR adaptatiu.
- `src/components/StarBackground.jsx`: fons WebGL estàtic amb `frameloop="demand"`.
- `src/components/TimelineItem.jsx`: xips de client amb color de marca per
  experiència per ressaltar referències rellevants (CaixaBank, Nestlé, Naturgy).
- `src/sections/Hobbies.jsx`: galeria amb miniatures i visor amb **swipe/drag**
  (Framer Motion `drag="x"` amb llindar de distància/velocitat), slide animat
  (`AnimatePresence`), teclat, fletxes, punts i precàrrega de les veïnes.
- `scripts/optimize-images.mjs`: pipeline reproduïble per optimitzar assets.
- `vite.config.js`: separació de chunks per a React, Three.js i EmailJS.

## Rendiment

Pipeline d'optimització d'assets reproduïble:

```bash
npm run optimize:model    # comprimeix el .glb amb meshopt + textures WebP (~85% menys)
npm run optimize:images   # converteix PNGs a WebP i genera miniatures per a la galeria
```

Altres optimitzacions aplicades:

- **Chunks separats** (Vite `manualChunks`): React, Three.js i EmailJS viatgen en
  bundles independents per a una millor memòria cau entre desplegaments.
- **Lazy loading** de l'escena 3D i del fons d'estrelles (`React.lazy`).
- **Model 3D** comprimit amb meshopt + textures WebP (2,98 MB), amb preload
  restringit a pantalles d'escriptori (`media="(min-width: 1024px)"`) perquè en
  un mòbil no competeixi amb el CSS i el JS crítics.
- **Fre per connexió**: amb l'estalvi de dades activat o en 2G no es descarreguen
  ni Three.js ni el model (`src/consts/device.js`); el hero mostra el seu degradat.
- **Fons d'estrelles** en `frameloop="demand"` (render estàtic; animació en
  CSS), amb el nombre d'estrelles reduït al mòbil per alliberar la GPU.
- **Fonts autoallotjades** amb preload dels dos fitxers llatins i tall per rang
  Unicode (84 KB en total; la resta només si el text ho necessita).
- **Art de les targetes retallat** a 400 px: de 509 KB a 145 KB, amb la icona
  d'Orbex passant de 249 KB (JPEG 512x512) a 36 KB.
- **Memòria cau per tipus de recurs** a `public/_headers`: un any i `immutable`
  per al build amb hash i les fonts, 30 dies per al model i les imatges.
- **Preconnect** a EmailJS per a la primera petició del formulari.
- **Galeria**: miniatures de ~5 KB per a la graella, fitxer complet només al
  visor actiu i precàrrega de les veïnes, amb `fetchPriority` adaptatiu.
- **Hero 3D**: antialias actiu, DPR adaptatiu amb `PerformanceMonitor` i
  animació flotant també al mòbil (sense control tàctil); el render continu
  només es manté mentre el hero és visible (`frameloop="demand"` en sortir).

El codi font inclou comentaris en anglès orientats a la revisió tècnica a GitHub.
