/**
 * Tech stack with react-icons.
 * Grouped by category to render the Skills section without extra logic.
 */
import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiVite, SiGreensock, SiPhp, SiLaravel, SiMysql, SiDotnet, SiJson, SiXml, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker, SiCloudflareworkers, SiRailway, SiStripe, SiClaude, SiGithubcopilot, SiGodotengine, SiAseprite } from 'react-icons/si'
import { TbApi, TbCursorText, TbPhotoEdit } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

export const SKILL_CATEGORIES = [
  {
    title: { es: 'Frontend', en: 'Frontend', ca: 'Frontend' },
    skills: [
      { label: 'HTML',              Icon: SiHtml5,       color: '#E34F26' },
      { label: 'CSS',               Icon: SiCss,         color: '#1572B6' },
      { label: 'XML',               Icon: SiXml,         color: '#F97316' },
      { label: 'JavaScript',        Icon: SiJavascript,  color: '#F7DF1E' },
      { label: 'TypeScript',        Icon: SiTypescript,  color: '#3178C6' },
      { label: 'Bootstrap',         Icon: SiBootstrap,   color: '#7952B3' },
      { label: 'Tailwind',          Icon: SiTailwindcss, color: '#06B6D4' },
      { label: 'Vite',              Icon: SiVite,        color: '#646CFF' },
      { label: 'React',             Icon: SiReact,       color: '#61DAFB' },
      { label: 'Three.js',          Icon: SiThreedotjs,  color: '#ffffff' },
      { label: 'React Three Fiber', Icon: SiThreedotjs,  color: '#ffffff' },
      { label: 'GSAP',              Icon: SiGreensock,   color: '#88CE02' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend', ca: 'Backend' },
    skills: [
      { label: 'JSON',     Icon: SiJson,    color: '#FACC15' },
      { label: 'PHP',      Icon: SiPhp,     color: '#777BB4' },
      { label: 'Java',     Icon: FaJava,    color: '#ED8B00' },
      { label: 'Laravel',  Icon: SiLaravel, color: '#FF2D20' },
      { label: '.NET',     Icon: SiDotnet,  color: '#512BD4' },
      { label: 'MySQL',    Icon: SiMysql,   color: '#4479A1' },
      { label: 'API Rest', Icon: TbApi,     color: '#22D3EE' },
      { label: 'Stripe',   Icon: SiStripe,  color: '#635BFF' },
    ],
  },
  {
    title: { es: 'DevOps y herramientas', en: 'DevOps and tools', ca: 'DevOps i eines' },
    skills: [
      { label: 'Git',            Icon: SiGit,                 color: '#F05032' },
      { label: 'Bitbucket',      Icon: SiBitbucket,           color: '#0052CC' },
      { label: 'Docker',         Icon: SiDocker,              color: '#2496ED' },
      { label: 'Jenkins',        Icon: SiJenkins,             color: '#D24939' },
      { label: 'Cloudflare',     Icon: SiCloudflareworkers,   color: '#F38020' },
      { label: 'Railway',        Icon: SiRailway,             color: '#ffffff' },
      { label: 'Jira',           Icon: SiJira,                color: '#0052CC' },
      { label: 'Salesforce',     Icon: SiSalesforce,          color: '#00A1E0' },
      { label: 'GitHub Copilot', Icon: SiGithubcopilot,       color: '#ffffff' },
      { label: 'Cursor',         Icon: TbCursorText,          color: '#ffffff' },
      { label: 'Claude',         Icon: SiClaude,              color: '#D97757' },
      { label: 'Godot',          Icon: SiGodotengine,         color: '#478CBF' },
      { label: 'Photoshop',      Icon: TbPhotoEdit,           color: '#31A8FF' },
      { label: 'Aseprite',       Icon: SiAseprite,            color: '#7D929E' },
    ],
  },
]
