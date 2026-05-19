/**
 * Tech stack with react-icons.
 * Grouped by category to render the Skills section without extra logic.
 */
import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiVite, SiGreensock, SiPhp, SiLaravel, SiMysql, SiDotnet, SiJson, SiXml, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker, SiCloudflareworkers, SiRailway, SiStripe, SiClaude, SiGithubcopilot } from 'react-icons/si'
import { TbApi, TbCursorText, TbPhotoEdit } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

export const SKILL_CATEGORIES = [
  {
    title: { es: 'Frontend', en: 'Frontend' },
    skills: [
      { label: 'React',             Icon: SiReact,       color: '#61DAFB' },
      { label: 'TypeScript',        Icon: SiTypescript,  color: '#3178C6' },
      { label: 'JavaScript',        Icon: SiJavascript,  color: '#F7DF1E' },
      { label: 'Tailwind',          Icon: SiTailwindcss, color: '#06B6D4' },
      { label: 'Vite',              Icon: SiVite,        color: '#646CFF' },
      { label: 'React Three Fiber', Icon: SiThreedotjs,  color: '#ffffff' },
      { label: 'Three.js',          Icon: SiThreedotjs,  color: '#ffffff' },
      { label: 'HTML',              Icon: SiHtml5,       color: '#E34F26' },
      { label: 'CSS',               Icon: SiCss,         color: '#1572B6' },
      { label: 'GSAP',              Icon: SiGreensock,   color: '#88CE02' },
      { label: 'Bootstrap',         Icon: SiBootstrap,   color: '#7952B3' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend' },
    skills: [
      { label: 'Laravel',  Icon: SiLaravel, color: '#FF2D20' },
      { label: 'PHP',      Icon: SiPhp,     color: '#777BB4' },
      { label: '.NET',     Icon: SiDotnet,  color: '#512BD4' },
      { label: 'MySQL',    Icon: SiMysql,   color: '#4479A1' },
      { label: 'API Rest', Icon: TbApi,     color: '#22D3EE' },
      { label: 'Java',     Icon: FaJava,    color: '#ED8B00' },
      { label: 'Stripe',   Icon: SiStripe,  color: '#635BFF' },
      { label: 'JSON',     Icon: SiJson,    color: '#FACC15' },
      { label: 'XML',      Icon: SiXml,     color: '#F97316' },
    ],
  },
  {
    title: { es: 'DevOps y herramientas', en: 'DevOps and tools' },
    skills: [
      { label: 'Git',        Icon: SiGit,                 color: '#F05032' },
      { label: 'Docker',     Icon: SiDocker,              color: '#2496ED' },
      { label: 'Cloudflare', Icon: SiCloudflareworkers,   color: '#F38020' },
      { label: 'Railway',    Icon: SiRailway,             color: '#ffffff' },
      { label: 'Jenkins',    Icon: SiJenkins,             color: '#D24939' },
      { label: 'Bitbucket',  Icon: SiBitbucket,           color: '#0052CC' },
      { label: 'Jira',       Icon: SiJira,                color: '#0052CC' },
      { label: 'Salesforce', Icon: SiSalesforce,          color: '#00A1E0' },
      { label: 'GitHub Copilot', Icon: SiGithubcopilot,   color: '#ffffff' },
      { label: 'Cursor',     Icon: TbCursorText,          color: '#ffffff' },
      { label: 'Claude',     Icon: SiClaude,              color: '#D97757' },
      { label: 'Photoshop',  Icon: TbPhotoEdit,           color: '#31A8FF' },
    ],
  },
]
