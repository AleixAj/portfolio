// My tech stack by category, with its react-icons icon and official website.
// `basic: true` = the everyday basics (HTML, CSS...), shown as small pills at
// the top of the card. `main: true` = what I use day to day, shown as big
// tiles. The rest is listed smaller under "Also used".
import { SiHtml5, SiCss, SiXml, SiJson, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiVite, SiGreensock, SiPhp, SiLaravel, SiMysql, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker, SiCloudflareworkers, SiRailway, SiStripe, SiClaude, SiGithubcopilot, SiGodotengine, SiAseprite, SiNextdotjs, SiElectron, SiNodedotjs, SiPostgresql, SiSupabase, SiVitest, SiGithubactions, SiSvelte, SiMaplibre } from 'react-icons/si'
import { TbApi, TbCursorText, TbPhotoEdit } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

export const SKILL_CATEGORIES = [
  {
    title: { es: 'Frontend', en: 'Frontend', ca: 'Frontend' },
    skills: [
      { basic: true, label: 'HTML', Icon: SiHtml5, color: '#E34F26', url: 'https://developer.mozilla.org/docs/Web/HTML' },
      { basic: true, label: 'CSS',  Icon: SiCss,   color: '#1572B6', url: 'https://developer.mozilla.org/docs/Web/CSS' },
      { basic: true, label: 'XML',  Icon: SiXml,   color: '#F97316', url: 'https://www.w3.org/XML/' },
      { main: true, label: 'JavaScript',        Icon: SiJavascript,  color: '#F7DF1E', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
      { main: true, label: 'TypeScript',        Icon: SiTypescript,  color: '#3178C6', url: 'https://www.typescriptlang.org/' },
      { label: 'Bootstrap',         Icon: SiBootstrap,   color: '#7952B3', url: 'https://getbootstrap.com/' },
      { main: true, label: 'Tailwind',          Icon: SiTailwindcss, color: '#06B6D4', url: 'https://tailwindcss.com/' },
      { main: true, label: 'Vite',              Icon: SiVite,        color: '#646CFF', url: 'https://vite.dev/' },
      { main: true, label: 'React',             Icon: SiReact,       color: '#61DAFB', url: 'https://react.dev/' },
      { label: 'Next.js',           Icon: SiNextdotjs,   color: '#ffffff', url: 'https://nextjs.org/' },
      { label: 'Svelte',            Icon: SiSvelte,      color: '#FF3E00', url: 'https://svelte.dev/' },
      { main: true, label: 'Electron',          Icon: SiElectron,    color: '#47848F', url: 'https://www.electronjs.org/' },
      { main: true, label: 'Three.js',          Icon: SiThreedotjs,  color: '#ffffff', url: 'https://threejs.org/' },
      { main: true, label: 'React Three Fiber', Icon: SiThreedotjs,  color: '#ffffff', url: 'https://r3f.docs.pmnd.rs/' },
      { label: 'GSAP',              Icon: SiGreensock,   color: '#88CE02', url: 'https://gsap.com/' },
      { label: 'MapLibre',          Icon: SiMaplibre,    color: '#4A90D9', url: 'https://maplibre.org/' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend', ca: 'Backend' },
    skills: [
      { basic: true, label: 'JSON', Icon: SiJson, color: '#FACC15', url: 'https://www.json.org/' },
      { main: true, label: 'PHP',      Icon: SiPhp,     color: '#777BB4', url: 'https://www.php.net/' },
      { label: 'Java',     Icon: FaJava,    color: '#ED8B00', url: 'https://www.java.com/' },
      { main: true, label: 'Laravel',  Icon: SiLaravel, color: '#FF2D20', url: 'https://laravel.com/' },
      { main: true, label: 'Node.js',    Icon: SiNodedotjs,  color: '#5FA04E', url: 'https://nodejs.org/' },
      { main: true, label: 'MySQL',    Icon: SiMysql,   color: '#4479A1', url: 'https://www.mysql.com/' },
      { main: true, label: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1', url: 'https://www.postgresql.org/' },
      { main: true, label: 'Supabase',   Icon: SiSupabase,   color: '#3FCF8E', url: 'https://supabase.com/' },
      { main: true, label: { es: 'API REST', en: 'REST API', ca: 'API REST' }, Icon: TbApi,     color: '#22D3EE', url: 'https://developer.mozilla.org/docs/Glossary/REST' },
      { label: 'Stripe',   Icon: SiStripe,  color: '#635BFF', url: 'https://stripe.com/' },
    ],
  },
  {
    title: { es: 'DevOps y herramientas', en: 'DevOps and tools', ca: 'DevOps i eines' },
    skills: [
      { main: true, label: 'Git',            Icon: SiGit,                 color: '#F05032', url: 'https://git-scm.com/' },
      { label: 'Bitbucket',      Icon: SiBitbucket,           color: '#0052CC', url: 'https://bitbucket.org/' },
      { label: 'Docker',         Icon: SiDocker,              color: '#2496ED', url: 'https://www.docker.com/' },
      { label: 'Jenkins',        Icon: SiJenkins,             color: '#D24939', url: 'https://www.jenkins.io/' },
      { main: true, label: 'GitHub Actions', Icon: SiGithubactions,       color: '#2088FF', url: 'https://github.com/features/actions' },
      { label: 'Vitest',         Icon: SiVitest,              color: '#6E9F18', url: 'https://vitest.dev/' },
      { main: true, label: 'Cloudflare',     Icon: SiCloudflareworkers,   color: '#F38020', url: 'https://www.cloudflare.com/' },
      { label: 'Railway',        Icon: SiRailway,             color: '#ffffff', url: 'https://railway.com/' },
      { main: true, label: 'Jira',           Icon: SiJira,                color: '#0052CC', url: 'https://www.atlassian.com/software/jira' },
      { label: 'Salesforce',     Icon: SiSalesforce,          color: '#00A1E0', url: 'https://www.salesforce.com/' },
      { main: true, label: 'Godot',          Icon: SiGodotengine,         color: '#478CBF', url: 'https://godotengine.org/' },
      { label: 'Photoshop',      Icon: TbPhotoEdit,           color: '#31A8FF', url: 'https://www.adobe.com/products/photoshop.html' },
      { label: 'Aseprite',       Icon: SiAseprite,            color: '#7D929E', url: 'https://www.aseprite.org/' },
    ],
  },
]

// AI tools get their own strip under the three categories
export const AI_TOOLS = [
  { label: 'Claude',         Icon: SiClaude,        color: '#D97757', url: 'https://www.anthropic.com/claude' },
  { label: 'GitHub Copilot', Icon: SiGithubcopilot, color: '#ffffff', url: 'https://github.com/features/copilot' },
  { label: 'Cursor',         Icon: TbCursorText,    color: '#ffffff', url: 'https://www.cursor.com/' },
]
