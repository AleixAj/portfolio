/**
 * Tech stack with react-icons.
 * Grouped by category to render the Skills section without extra logic.
 * Each skill carries the URL of its official website, opened from the Skills grid.
 */
import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiVite, SiGreensock, SiPhp, SiLaravel, SiMysql, SiDotnet, SiJson, SiXml, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker, SiCloudflareworkers, SiRailway, SiStripe, SiClaude, SiGithubcopilot, SiGodotengine, SiAseprite } from 'react-icons/si'
import { TbApi, TbCursorText, TbPhotoEdit } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

export const SKILL_CATEGORIES = [
  {
    title: { es: 'Frontend', en: 'Frontend', ca: 'Frontend' },
    skills: [
      { label: 'HTML',              Icon: SiHtml5,       color: '#E34F26', url: 'https://developer.mozilla.org/docs/Web/HTML' },
      { label: 'CSS',               Icon: SiCss,         color: '#1572B6', url: 'https://developer.mozilla.org/docs/Web/CSS' },
      { label: 'XML',               Icon: SiXml,         color: '#F97316', url: 'https://www.w3.org/XML/' },
      { label: 'JavaScript',        Icon: SiJavascript,  color: '#F7DF1E', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
      { label: 'TypeScript',        Icon: SiTypescript,  color: '#3178C6', url: 'https://www.typescriptlang.org/' },
      { label: 'Bootstrap',         Icon: SiBootstrap,   color: '#7952B3', url: 'https://getbootstrap.com/' },
      { label: 'Tailwind',          Icon: SiTailwindcss, color: '#06B6D4', url: 'https://tailwindcss.com/' },
      { label: 'Vite',              Icon: SiVite,        color: '#646CFF', url: 'https://vite.dev/' },
      { label: 'React',             Icon: SiReact,       color: '#61DAFB', url: 'https://react.dev/' },
      { label: 'Three.js',          Icon: SiThreedotjs,  color: '#ffffff', url: 'https://threejs.org/' },
      { label: 'React Three Fiber', Icon: SiThreedotjs,  color: '#ffffff', url: 'https://r3f.docs.pmnd.rs/' },
      { label: 'GSAP',              Icon: SiGreensock,   color: '#88CE02', url: 'https://gsap.com/' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend', ca: 'Backend' },
    skills: [
      { label: 'JSON',     Icon: SiJson,    color: '#FACC15', url: 'https://www.json.org/' },
      { label: 'PHP',      Icon: SiPhp,     color: '#777BB4', url: 'https://www.php.net/' },
      { label: 'Java',     Icon: FaJava,    color: '#ED8B00', url: 'https://www.java.com/' },
      { label: 'Laravel',  Icon: SiLaravel, color: '#FF2D20', url: 'https://laravel.com/' },
      { label: '.NET',     Icon: SiDotnet,  color: '#512BD4', url: 'https://dotnet.microsoft.com/' },
      { label: 'MySQL',    Icon: SiMysql,   color: '#4479A1', url: 'https://www.mysql.com/' },
      { label: 'API Rest', Icon: TbApi,     color: '#22D3EE', url: 'https://developer.mozilla.org/docs/Glossary/REST' },
      { label: 'Stripe',   Icon: SiStripe,  color: '#635BFF', url: 'https://stripe.com/' },
    ],
  },
  {
    title: { es: 'DevOps y herramientas', en: 'DevOps and tools', ca: 'DevOps i eines' },
    skills: [
      { label: 'Git',            Icon: SiGit,                 color: '#F05032', url: 'https://git-scm.com/' },
      { label: 'Bitbucket',      Icon: SiBitbucket,           color: '#0052CC', url: 'https://bitbucket.org/' },
      { label: 'Docker',         Icon: SiDocker,              color: '#2496ED', url: 'https://www.docker.com/' },
      { label: 'Jenkins',        Icon: SiJenkins,             color: '#D24939', url: 'https://www.jenkins.io/' },
      { label: 'Cloudflare',     Icon: SiCloudflareworkers,   color: '#F38020', url: 'https://www.cloudflare.com/' },
      { label: 'Railway',        Icon: SiRailway,             color: '#ffffff', url: 'https://railway.com/' },
      { label: 'Jira',           Icon: SiJira,                color: '#0052CC', url: 'https://www.atlassian.com/software/jira' },
      { label: 'Salesforce',     Icon: SiSalesforce,          color: '#00A1E0', url: 'https://www.salesforce.com/' },
      { label: 'GitHub Copilot', Icon: SiGithubcopilot,       color: '#ffffff', url: 'https://github.com/features/copilot' },
      { label: 'Cursor',         Icon: TbCursorText,          color: '#ffffff', url: 'https://www.cursor.com/' },
      { label: 'Claude',         Icon: SiClaude,              color: '#D97757', url: 'https://www.anthropic.com/claude' },
      { label: 'Godot',          Icon: SiGodotengine,         color: '#478CBF', url: 'https://godotengine.org/' },
      { label: 'Photoshop',      Icon: TbPhotoEdit,           color: '#31A8FF', url: 'https://www.adobe.com/products/photoshop.html' },
      { label: 'Aseprite',       Icon: SiAseprite,            color: '#7D929E', url: 'https://www.aseprite.org/' },
    ],
  },
]
