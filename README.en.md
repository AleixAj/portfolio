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
  <img src="docs/readme/lang-en-active.svg" alt="English" width="170">
  <a href="README.ca.md"><img src="docs/readme/lang-ca.svg" alt="Català" width="170"></a>
</p>

**Live portfolio:** [aleixaj.com](https://aleixaj.com)  
**LinkedIn:** [linkedin.com/in/aleixauque](https://linkedin.com/in/aleixauque/)  
**GitHub:** [github.com/AleixAj](https://github.com/AleixAj)

Professional portfolio aimed at companies and technical teams. It presents my
profile as a software developer through a polished, production-ready web
experience: a responsive React UI, a performant Three.js hero scene, trilingual
content (ES/EN/CA) with a real URL per language, keyboard-accessible
navigation, real deployed projects, professional background, tech stack and
direct contact.

The goal is not just to show a visual landing page, but to demonstrate product
thinking, attention to detail, performance awareness, maintainable structure,
full-stack skills and experience taking projects from an idea to production.

## What It Demonstrates

- Modern frontend development with **React 19**, reusable components and a
  responsive experience designed for desktop, tablet and mobile.
- Integration of a lightweight 3D scene with **Three.js**, **React Three Fiber**
  and lazy loading to keep initial performance high.
- **Trilingual ES / EN / CAT** interface with no extra dependencies. Each
  language has its own URL (`/`, `/?lang=en`, `/?lang=ca`), so a shared link
  opens in the language it was shared in; `hreflang`, `canonical`, `meta` and
  `og:*` stay in sync with the active language.
- **The URL reflects what you see**: besides the language, the visible section
  is written as a fragment (`#projects`), so any section can be linked,
  bookmarked or shared.
- **Fully keyboard-navigable**: skip-to-content link, focusable scroll container
  and support for Page Up/Page Down, Home/End, arrow keys and Space, which don't
  work by default on a page whose scroll lives inside a `div`.
- **Project details**: each card opens a dialog with a summary of its
  repository's README (what it is, what it includes, stack and actual status),
  so a company can get an idea without leaving the page or opening GitHub.
- **Stable scroll architecture on mobile**: the document is locked
  (`overflow: hidden`) and the content lives in a `fixed` container with its
  own scroll, avoiding jumps when the browser bar hides/shows (changing
  `100dvh`) and overscroll bounce.
- **Unified horizontal alignment**: all sections share the same container
  (`max-w-6xl 2xl:max-w-7xl 3xl:max-w-[100rem]`) so content lines up on the same
  vertical line across every page.
- Hero with a recruiter-ready **professional mini profile**: open-to-work badge,
  roles I'm targeting (frontend, full-stack, backend), location, years of
  experience, work arrangement and languages, dual CTA (projects + contact) and
  the CV available both to view in the browser and to download.
- Clear presentation of work experience with **client chips** highlighting
  recognizable brands, education, and projects with public demos, real
  repositories and verifiable links.
- Attention to UX: section navigation with an **active section indicator**,
  subtle animations, consistent project cards, forms, responsive states,
  adaptation to touch devices and progressive scaling on ultra-wide screens
  (`2xl` from 2200px, `3xl` from 2560px; `1920x1080` keeps the standard layout).
- **Animation layer with Framer Motion**: staggered scroll-in entrances, hover
  micro-interactions (cards that expand with a spring), the hero's rotating word
  animated letter by letter (React Bits' *RotatingText* component) and an art
  gallery with **swipe/drag** + slide transition. Everything respects
  `prefers-reduced-motion`.
- **Typographic identity**: headings in **Space Grotesk** and body text in **DM
  Sans**, both **self-hosted** (no third-party requests), with a neon cyan accent
  consistent with the logo on headings and cards.
- Reviewed accessibility: skip-to-content link, `<main>` landmark, global
  `focus-visible`, mobile menu and dialogs with `Escape` and focus trap,
  `aria-current` in the navbar, forms with labels and `aria-live` states,
  44 px touch targets in dialogs, `:hover` styles restricted to devices with a
  real pointer, and respect for `prefers-reduced-motion`.
- Production-ready setup with **Vite**, **Tailwind CSS**, **EmailJS** and
  deployment on **Cloudflare Workers + Assets**.

## Key Technical Decisions

- **Data-driven architecture**: copy, navigation, experience (with featured
  clients per role), skills, hobbies and projects live in `src/consts/`,
  separating content from UI.
- **Progressive loading**: `React.lazy` splits the 3D scene and the star
  background out of the initial bundle.
- **3D performance**: the GLB model (2.98 MB: 1.22 MB of WebP textures and the
  rest meshopt-compressed geometry) uses adaptive DPR and is only preloaded on
  desktop screens; on data-saver or 2G connections neither the model nor
  Three.js is downloaded, and the hero stays on its gradient. The floating
  animation also runs on mobile (no touch control, visual only).
- **Animation and typography**: Framer Motion for entrances, hovers and the
  hero's rotating word (React Bits' *RotatingText*); Space Grotesk + DM Sans
  typography; project cards with a cyan glow (`.project-card` class). All under
  `prefers-reduced-motion` control.
- **Optimized gallery**: WebP thumbnails for the grid and full-size files only
  when the viewer is opened, with **swipe/drag** (mobile and desktop) and
  preloading of neighboring images for instant switching.
- **CV per language**: `CV_BY_LANG` in `App.jsx` is the single source of truth
  (path + download name) and feeds the site's three CV links (two in the hero,
  one in the footer), so changing the CV means touching a single place.
- **Real multilingual SEO**: each language has its own URL (`/`, `/?lang=en`,
  `/?lang=ca`), declared in `hreflang` and in the sitemap, and `App.jsx` keeps
  `canonical`, `title`, `description`, `og:*` and `twitter:*` pointing to the
  active language's URL. Previously all three `hreflang` tags pointed to the
  same address, which is exactly what makes a search engine ignore them. The
  switcher flags (Spain, United Kingdom and the **senyera**) are inline SVGs so
  they render identically on any operating system.
- **Crawling and indexing**: `public/robots.txt` (referencing the sitemap) and
  `public/sitemap.xml`; the social image declares `og:image:width/height/alt`
  so LinkedIn/WhatsApp render it without cropping or a second request.
- **Controlled scroll lock**: `html`/`body`/`#root` don't scroll; only
  `#app-scroll` does, with `overscroll-behavior: none` and `touch-action: pan-y`.
  Sections use `min-h-full` on mobile and `100dvh` only on desktop to avoid
  readjustments when the browser bar collapses.
- **Real responsiveness**: mobile, standard desktop, touch landscape and
  ultra-wide screens have dedicated adjustments; the hero compacts chips and
  CTAs on mobile to keep content above the fold.
- **Self-hosted typography**: the Space Grotesk and DM Sans `.woff2` files are
  served from the site's own domain with their Unicode-range subsetting intact.
  This saves a render-blocking stylesheet and two TLS handshakes on the critical
  path, the page stops making third-party requests (relevant for GDPR) and the
  CSP can be locked down to `style-src 'self'` and `font-src 'self'`.
- **Safe centered alignment**: sections use `align-items: safe center`, which
  centers while the content fits and aligns to the top when it doesn't, instead
  of overflowing on both sides and hiding the title behind the fixed bar.
- **Simple deployment**: static build with Vite, published on Cloudflare
  Workers + Assets with SPA fallback and cache headers per resource type (one
  year for the hashed build and the fonts, 30 days for the model and images).

## Featured Projects

### Obsidian

**[GitHub](https://github.com/AleixAj/obsidian) · [Demo](https://obsidian.aleixaj.com)**

Full-stack streetwear e-commerce built to showcase a real store flow, from
catalog to checkout.

- **Role**: frontend and backend development.
- **Stack**: React 19, TypeScript, Vite, TanStack Query, Laravel 11, Sanctum, MySQL.
- **What it demonstrates**: full-stack architecture, cookie-based
  authentication, cart/wishlist persistence against the backend, API
  consumption, server state and a checkout that creates real orders in the
  database.
- **Status**: the payment gateway is not connected yet; checkout creates orders
  but does not charge yet.

### Orbex

**[GitHub (game website)](https://github.com/AleixAj/orbex-web) · [Play in the browser](https://kylen02.itch.io/orbex) · [Google Play](https://play.google.com/store/apps/details?id=com.aleix.orbex)**

*Zuma*-style aiming game for Android, built solo and published on Google
Play, with its own backend.

- **Role**: design, programming, art and backend.
- **Stack**: Godot 4.6, statically typed GDScript, Supabase (PostgreSQL),
  Android.
- **What it demonstrates**: custom chain engine, bespoke editor plugin for
  drawing the paths, script-calculated difficulty curve calibrated with
  telemetry, backend with global and per-level leaderboards, friends, cloud
  saves, account deletion (GDPR) and server-side limits against cheating.

### Nadir

**[GitHub](https://github.com/AleixAj/nadir) · [Demo](https://nadir.aleixaj.com)**

A price tracker built like a real SaaS: it compares the same product across
several stores, keeps its price history and alerts you when it drops below your
target price.

- **Role**: design, frontend, backend and deployment.
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Neon Postgres,
  Drizzle ORM, Better Auth, Resend, Zod, Vitest, Cloudflare Workers (OpenNext).
- **What it shows**: Server Actions validated with Zod that check session and
  data ownership, Google or email accounts (with email confirmation and
  password reset), email price alerts, profile photo, custom lists, an SVG
  price history chart, store comparison by final price, a scheduled job with a
  Cron Trigger, SSRF protection when reading pages, bot and spam protection
  (Turnstile captcha, per-IP and per-user limits, CSP), accessibility
  (keyboard, AA contrast, reduced motion), and a no-signup demo.
- **Status**: live at `nadir.aleixaj.com`. Big stores do not allow reading
  their prices, so the catalog is real but its price changes are simulated (the
  site says so). Telegram alerts are still to come.

### Kylen Chat for Twitch

**[GitHub](https://github.com/AleixAj/kylenchat) · [Windows installer](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Setup.exe) · [Mac installer](https://github.com/AleixAj/kylenchat/releases/latest/download/KylenChat-Mac.dmg)**

Desktop app for single-monitor streamers: Twitch chat in a transparent window
that stays on top of the game and lets clicks pass through.

- **Role**: concept, development, design and visual identity, publishing and maintenance.
- **Stack**: Electron, JavaScript, Node.js, WebSocket (Twitch IRC), electron-builder, GitHub Actions.
- **What it demonstrates**: a real desktop app with an installer and automatic
  updates from GitHub Releases, a Mac version (Intel and Apple Silicon) built
  automatically with GitHub Actions, real-time chat with robust reconnection,
  7TV/BTTV/FFZ emotes, measured performance (under 2 % of one core in very fast
  chats, without using the GPU), per-game profiles with a global shortcut, live alerts in their own box on top of the game,
  Spanish and English interface, and validation of all incoming data.
- **Status**: released for Windows and for Mac (in beta), open source under the MIT license.
- **In the portfolio**: the project details include a screenshot of the app in use over a game.

### Solar Explorer

**[GitHub](https://github.com/AleixAj/solar-system) · [Demo](https://solarsystem.aleixaj.com)**

3D Solar System explorer with a WebGL scene, selectable planets and an
interactive camera.

- **Role**: frontend development, 3D interaction and responsive design.
- **Stack**: React, TypeScript, Three.js, React Three Fiber, Tailwind CSS.
- **What it demonstrates**: WebGL work, scene composition, camera interaction,
  visual data and a responsive experience.

### Lord of the Clicks

**[GitHub](https://github.com/AleixAj/lordoftheclicks) · [Demo](https://lotrclicker.aleixaj.com/)**

Incremental clicker inspired by Middle-earth (30 zones, 20 companions,
24 quests), built as a complete frontend app with progression, persistent saves
and game logic separated from the interface.

- **Role**: frontend development, game architecture and responsive design.
- **Stack**: React, TypeScript, Zustand, Tailwind CSS, Vitest.
- **What it demonstrates**: domain modeled with TypeScript, persistent global
  state, data-driven content, logic tests, accessibility and deployment on
  Cloudflare.

### FamilyTrivia

**[GitHub](https://github.com/AleixAj/familytrivia) · [Demo](https://familytrivia.aleixaj.com)**

Interactive web trivia game designed for group play on a shared screen.

- **Role**: full development of the experience.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, Chart.js.
- **What it demonstrates**: a 6-category by 6-value board, three game modes
  (solo, individual players, or pairs drawn with spinning wheels), audio
  questions with a custom player, lifelines and a final leaderboard with
  statistics.

### CashDrop

**[GitHub](https://github.com/AleixAj/cashdrop) · [Demo](https://cashdrop.aleixaj.com/)**

Web adaptation of the game show: €1,000,000 is split into 20 bundles across
four answers, and only what's placed on the correct one is kept.

- **Role**: full development of the experience.
- **Stack**: HTML, CSS, JavaScript, Bootstrap 5, no build step.
- **What it demonstrates**: rule modeling, hand-written drag-and-drop with touch
  support, a bank of 125+ questions decoupled from the engine, and game state
  management.

## Main Stack

- **React 19** + **Vite 8**
- **Three.js** + **React Three Fiber** + **Drei**
- **Framer Motion** (animations and interactions)
- **Tailwind CSS 3**
- **React Icons**
- **EmailJS**
- **Cloudflare Workers + Assets**
- **Laravel**, **PHP**, **MySQL**, **.NET**, **Docker** and automation/deployment
  tools listed in the skills section.
- **Godot** for mobile game development outside the portfolio.

## Skills · What I Use Each Technology For

A short summary of each tool listed in the portfolio's Skills section, in the
same order as the UI (from foundational to specialized).

### Frontend

| Skill | What I use it for |
|-------|-------------------|
| **HTML** | Semantic page structure and baseline accessibility. |
| **CSS** | Styling, responsive layout and pure browser animations. |
| **XML** | Markup for configuration, data exchange and legacy integrations. |
| **JavaScript** | Client-side logic, DOM manipulation and events. |
| **TypeScript** | Statically typed JavaScript to scale projects without losing clarity. |
| **Bootstrap** | Rapid prototyping and projects where its component system is enough. |
| **Tailwind** | Utility system for fast, consistent design (used in this portfolio). |
| **Vite** | Build tool with fast HMR and optimized production bundles. |
| **React** | Component-based UI library; the foundation of the apps in this portfolio. |
| **Next.js** | React framework with Server Components and Server Actions (used in `Nadir`). |
| **Electron** | Desktop apps built with web tech and their own installer (used in `Kylen Chat`). |
| **Three.js** | 3D scenes in WebGL (cameras, materials, lights, geometry). |
| **React Three Fiber** | Declarative Three.js renderer for React; used in the 3D hero and `Solar Explorer`. |
| **GSAP** | Advanced animations with timelines and fine-grained timing control. |

### Backend

| Skill | What I use it for |
|-------|-------------------|
| **JSON** | Standard format for APIs, configuration and state serialization. |
| **PHP** | Backend language for websites and APIs (personal and professional projects). |
| **Java** | OO language used in my studies and at work on enterprise backends. |
| **Laravel** | Full-stack PHP framework: authentication, Eloquent ORM, queues and APIs (used in `Obsidian`). |
| **.NET** | Microsoft stack for services and APIs in corporate environments. |
| **Node.js** | JavaScript runtime for servers, scripts and desktop apps. |
| **MySQL** | Relational database for domain modeling and queries with indexes/joins. |
| **PostgreSQL** | Relational database in `Nadir` (Neon + Drizzle ORM) and `Orbex` (Supabase). |
| **Supabase** | Backend with Postgres, auth and server functions (used in `Orbex`). |
| **API Rest** | Design of HTTP endpoints, resources, versioning and contracts with frontends. |
| **Stripe** | Payment gateway: checkout, webhooks and subscriptions. |

### DevOps and Tools

| Skill | What I use it for |
|-------|-------------------|
| **Git** | Distributed version control, branching, rebasing and PR-based review. |
| **Bitbucket** | Repo and PR hosting in corporate environments. |
| **Docker** | Reproducible containers for development and deployment. |
| **Jenkins** | CI/CD pipelines: build, test, automated deployment. |
| **GitHub Actions** | CI/CD: lint, tests, builds and automated releases. |
| **Vitest** | Unit tests for app logic (prices, charts, game rules). |
| **Cloudflare** | Workers + Assets for deploying the portfolio and global CDN. |
| **Railway** | App and database hosting for quick projects. |
| **Jira** | Ticket management, sprints and agile planning. |
| **Salesforce** | Enterprise CRM (Apex, Lightning, integrations). |
| **GitHub Copilot** | AI assistant built into the IDE for autocompletion and refactors. |
| **Cursor** | IDE with AI agents for assisted development and code review. |
| **Claude** | AI model for support with architecture, code and technical documentation. |
| **Godot** | 2D/3D engine used for personal mobile game development. |
| **Photoshop** | Image editing and UI asset design. |
| **Aseprite** | Pixel art and sprite animation for personal projects and game dev. |

## Portfolio Sections

- **Home**: personal introduction, interactive 3D scene, dynamic messages,
  open-to-work badge, professional mini profile (roles, location, years of
  experience, work arrangement and languages), dual CTA to projects and contact,
  and the CV in two actions: view it in the browser or download it.
- **Journey**: work experience and education with no inner scroll, with
  **client chips** (`CaixaBank`, `Nestlé`, `Naturgy`) on the roles where
  projects reached recognizable brands.
- **Projects**: cards with a **neon-style cyan glow**, mobile-adapted logos,
  trilingual descriptions, technologies, GitHub and, depending on the project,
  demo, Google Play or a Windows and Mac download, with a spring expansion hover
  on desktop. Each card has an info button that opens **project details** with a
  summary, optional screenshot, highlights, stack and actual status, taken from
  its repository's README. Ordered by technical depth (full-stack first, then
  published products); if the last card ends up alone in its row, it's centered.
- **Skills** (*Tecnologías* in Spanish, *Tecnologies* in Catalan): technologies grouped into frontend
  (including HTML, CSS, XML and UI tools), backend, DevOps and tools (including
  `Godot` for mobile game dev and `Aseprite` for pixel art), with brand icons.
  Each icon **links to the technology's official website** and has a *glare*
  effect on hover (desktop only).
- **Art**: personal gallery with a fullscreen viewer and navigation via
  **swipe/drag** (mobile and desktop), keyboard, arrows and dots; thumbnails
  expand on hover.
- **Contact**: form connected to EmailJS and professional links.

## Structure

```txt
public/              # Static assets (WebP images, GLB, CV, fonts, hobbies/ gallery)
scripts/             # Image optimization pipeline (sharp)
src/
├── consts/          # Static data: i18n, nav, skills, projects, experience, hobbies, device
├── components/      # Navbar, ProjectCard, ProjectModal, TimelineItem, Scene3D, StarBackground, RotatingText
├── sections/        # Hero, Trayectoria, Projects, Skills, Hobbies, Contact
├── App.jsx          # Navigation, language, URL, keyboard, scroll and reveal animations
├── main.jsx
└── index.css        # Tailwind, typography, animations, card glow and responsive rules
.env.example         # EmailJS variables template (copy to .env.local)
```

### Required Assets in `public/`

| File | Purpose |
|------|---------|
| `gaming_bedroom.glb` | Hero 3D model |
| `AJ.png` | Logo in the navbar and footer (295x224, 21 KB) |
| `favicon-32.png`, `apple-touch-icon.png` | Tab icon and home screen icon |
| `fonts/*.woff2` | Self-hosted Space Grotesk and DM Sans (generated from Google Fonts, OFL license) |
| `og-image.png` | Social image for LinkedIn, WhatsApp and Twitter/X |
| `cv-aleix-es.pdf`, `cv-aleix-en.pdf` | CV download based on the active language (Hero and Contact). ES and CAT share the same PDF; the `download` attribute sets the saved file name (`CV Aleix Auqué.pdf` / `CV Aleix Auqué EN.pdf`) instead of the internal slug |
| `FamilyTrivia.webp`, `CashDrop.webp`, `obsidian-pixelart.webp`, `solar-explorerlogo.webp`, `orbex-icon.webp`, `nadir-logo.webp`, `kylen-chat.webp`, `kylen-chat-demo.webp`, `onering-gif.gif` | Project cards (max. 400 px; `npm run optimize:images` keeps them at size) |
| `hobbies/NN.webp` + `hobbies/NN-thumb.webp` | Art gallery (full size + thumbnail) |

## Running Locally

Requirements:

- Node.js 18+
- npm

Install and run in development:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Environment Variables

To enable the contact form, create `.env.local` with your
[EmailJS](https://www.emailjs.com/) credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Scripts

```bash
npm run dev               # Development server
npm run build             # Production build
npm run preview           # Build + preview with Wrangler
npm run deploy            # Build + deploy with Wrangler
npm run lint              # Linting with ESLint
npm run generate:og       # Generates public/og-image.png for social previews
npm run optimize:model    # Requires @gltf-transform/cli; compresses the .glb with meshopt + WebP
npm run optimize:images   # Converts PNG/JPEG to WebP, crops card art and generates thumbnails
```

## Deployment

The project is set up for Cloudflare Workers + Assets:

- build command: `npm run build`
- deploy command: `npx wrangler deploy`
- output directory: `dist`
- SPA fallback: `not_found_handling="single-page-application"`

It can also be deployed to Vercel or Netlify as a static SPA by running
`npm run build` and publishing `dist`, adding the EmailJS variables if you want
to enable the form.

## Quality

- `npm run build` verified before publishing.
- The 3D scene is lazy-loaded to reduce initial JavaScript.
- Sections and cards are compacted on mobile to avoid visual clipping and
  improve touch navigation. The mobile hero reduces padding, visible chips and
  CTA size to keep everything within the viewport.
- Projects link to public demos and real repositories.
- The language switcher uses SVG flags to avoid rendering differences across
  operating systems.
- SEO metadata and social preview configured in `index.html`, with
  **`hreflang` `es/en/ca/x-default`** pointing to each language's real URL and
  **`og:locale:alternate`**, plus a sitemap with all three addresses.
- `App.jsx` updates `title`, `description`, `og:*` and `twitter:*` at runtime
  when the language changes, keeping SEO consistent for each locale.
- `Person` JSON-LD to improve the portfolio's semantic context.
- Careful accessibility: **skip-to-content link** and `<main>` landmark, global
  `focus-visible`, real labels in the form, keyboard navigation (including page
  scrolling, which doesn't work on its own in a custom container) and swipe in
  the gallery, `aria-labels` on icon actions, **mobile menu and dialogs with
  `Escape` + focus trap**,
  `aria-current="page"` for the active section in the navbar and respect for
  **`prefers-reduced-motion`** (reduced or disabled animations).
- **Active section indicator** in the navbar (underline on desktop, side marker
  on mobile) synced with scrolling.
- Form with distinct states: sending, success, service error and missing
  EmailJS configuration.
- Phone number kept out of the public footer to prevent scraping; contact goes
  through email, the form, LinkedIn or the CV.
- **Stable scroll and viewport on mobile**: locked document, fixed scroll
  container and sections with `min-h-full` on mobile to avoid the typical jump
  when the address bar hides; the star background stays fixed to the viewport
  and shows through the semi-transparent sections.

### Verification

- `npm run lint`: no errors.
- `npm run build`: production build verified.
- First visit measured on the production build, with 4x CPU slowdown and a
  mobile network: **674 KB** excluding the 3D model (which is downloaded
  separately and only where appropriate), **CLS 0.034** and 261 ms of main
  thread blocking.
- Full walkthrough with no console errors or failed requests: six sections, all
  seven project detail dialogs and the gallery, in all three languages.
- Reviewed with no findings: parity of the 51 translation keys across `es`,
  `en` and `ca`; heading hierarchy with no skipped levels; no images without
  `alt`; no buttons or links without an accessible name; no duplicate `id`s; all
  `target="_blank"` links with `rel="noopener"`.
- Local Lighthouse on the production preview:
  - Accessibility: 98
  - Best Practices: 100
  - SEO: 92

> Note: the local Lighthouse performance score is affected by the 3D hero
> (Three.js/WebGL). The project prioritizes a 3D visual experience, with
> specific optimizations to reduce weight, defer loading and free up the GPU.

## Security

Static SPA (no backend of its own apart from the form via EmailJS) with several
layers of defense:

- **Security headers** (`public/_headers`, applied by Cloudflare on every
  response):
  - Strict **Content-Security-Policy**: scripts only from the site's own origin
    (with `'wasm-unsafe-eval'` for the 3D model's meshopt decoder), scoped
    inline styles (React/Framer Motion + Tailwind) and a single allowed external
    origin: the EmailJS API. Since the fonts are self-hosted, `style-src` and
    `font-src` stay at `'self'`.
  - **HSTS**, **X-Frame-Options: DENY** + `frame-ancestors 'none'` (anti-clickjacking),
    **X-Content-Type-Options: nosniff**, **Referrer-Policy**, **Permissions-Policy**
    (camera/microphone/geolocation disabled) and **Cross-Origin-Opener-Policy**.
- **No XSS**: React escapes content by default; no `dangerouslySetInnerHTML`,
  `innerHTML`, `eval` or `new Function`.
- **External links** with `rel="noopener noreferrer"` (anti reverse-tabnabbing).
- **Hardened contact form**: anti-bot honeypot, rate limiting between
  submissions and `maxLength` on every field.
- **Secrets kept out of the repo**: the EmailJS keys live in `.env.local`
  (gitignored); only `.env.example` is versioned.

> Recommended hardening in the EmailJS dashboard: restrict *Allowed Origins* to
> the domain, enable bot protection/reCAPTCHA and the account's rate limit (the
> *public key* is visible in the client bundle, as in any browser-side EmailJS
> integration).

## For Technical Reviewers

Specific points in the code worth reviewing:

- `src/App.jsx`: section navigation, language read from `?lang=` and
  persisted, URL synced with language and visible section, global scroll lock
  with an inner `#app-scroll` container, keyboard access to that container
  (skip link + forwarding of Page Up/Page Down/Home/End/arrows while focus is
  outside it), measuring section positions when the language, size or fonts
  change, reveal animations and syncing `canonical` and meta tags with the
  active language.
- `src/index.css`: `overflow: hidden` on `html`/`body`, `overscroll-behavior: none`
  and responsive rules for mobile landscape.
- `src/components/Navbar.jsx`: active section indicator (`aria-current`),
  mobile menu with focus trap, `Escape` to close, focus return to the hamburger
  and `LanguageSwitcher` with SVG flags (Spain, UK and senyera).
- `src/consts/i18n.js`, `nav.js`, `projects.js`, `experience.js`, `skills.jsx`:
  trilingual content (`es`, `en`, `ca`) in a single source of truth.
- `src/sections/Hero.jsx`: open-to-work badge, reusable
  `ProfileChip`/`OpenToWorkBadge`, dual CTA (projects + contact), CV view/download,
  staggered Framer Motion entrance and letter-by-letter rotating word
  (`src/components/RotatingText.jsx`, adapted React Bits component).
- `src/components/ProjectModal.jsx`: project dialog rendered in a portal on
  `<body>` (the scroll container creates its own stacking context), with dialog
  semantics, focus trap, focus return and background lock without layout shift
  thanks to `scrollbar-gutter: stable`.
- `src/consts/device.js`: data-saver/slow-connection detection resolved at
  module level, before React decides whether to import the heavy chunks.
- `src/components/ProjectCard.jsx`: card with cyan glow (`.project-card` class),
  `whileInView` entrance and spring expansion hover, active only on devices with
  a real pointer (`matchMedia('(hover: hover)')`).
- `src/components/Scene3D.jsx`: GLB loading, automatic model centering,
  OrbitControls (desktop only), floating animation also on mobile, and the
  performance/sharpness balance with adaptive DPR.
- `src/components/StarBackground.jsx`: static WebGL background with `frameloop="demand"`.
- `src/components/TimelineItem.jsx`: client chips with brand colors per role to
  highlight relevant references (CaixaBank, Nestlé, Naturgy).
- `src/sections/Hobbies.jsx`: gallery with thumbnails and a viewer with
  **swipe/drag** (Framer Motion `drag="x"` with a distance/velocity threshold),
  animated slide (`AnimatePresence`), keyboard, arrows, dots and neighbor
  preloading.
- `scripts/optimize-images.mjs`: reproducible pipeline for optimizing assets.
- `vite.config.js`: chunk splitting for React, Three.js and EmailJS.

## Performance

Reproducible asset optimization pipeline:

```bash
npm run optimize:model    # compresses the .glb with meshopt + WebP textures (~85% smaller)
npm run optimize:images   # converts PNGs to WebP and generates gallery thumbnails
```

Other optimizations applied:

- **Split chunks** (Vite `manualChunks`): React, Three.js and EmailJS ship in
  separate bundles for better caching across deployments.
- **Lazy loading** of the 3D scene and the star background (`React.lazy`).
- **3D model** compressed with meshopt + WebP textures (2.98 MB), with preload
  restricted to desktop screens (`media="(min-width: 1024px)"`) so it doesn't
  compete with critical CSS and JS on mobile.
- **Connection-aware loading**: with data saver enabled or on 2G, neither
  Three.js nor the model is downloaded (`src/consts/device.js`); the hero shows
  its gradient.
- **Star background** with `frameloop="demand"` (static render; CSS animation),
  with fewer stars on mobile to free up the GPU.
- **Self-hosted fonts** with preload of the two Latin files and Unicode-range
  subsetting (84 KB in total; the rest only if the text needs it).
- **Card art cropped** to 400 px: from 509 KB to 145 KB, with the Orbex icon
  going from 249 KB (512x512 JPEG) to 36 KB.
- **Cache per resource type** in `public/_headers`: one year and `immutable` for
  the hashed build and the fonts, 30 days for the model and images.
- **Preconnect** to EmailJS for the form's first request.
- **Gallery**: ~5 KB thumbnails for the grid, full-size file only in the active
  viewer, and neighbor preloading, with adaptive `fetchPriority`.
- **3D hero**: antialiasing on, adaptive DPR with `PerformanceMonitor` and the
  floating animation also on mobile (no touch control); continuous rendering
  only runs while the hero is visible (`frameloop="demand"` when leaving).

The source code includes English comments aimed at technical review on GitHub.
