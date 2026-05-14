import { SiHtml5, SiCss, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiThreedotjs, SiVite, SiGreensock, SiPhp, SiLaravel, SiMysql, SiDotnet, SiJson, SiXml, SiGit, SiJenkins, SiBitbucket, SiJira, SiSalesforce, SiDocker, SiCloudflareworkers, SiRailway, SiStripe, SiClaude, SiGithubcopilot, SiVegas } from 'react-icons/si'
import { TbApi, TbCursorText, TbPhotoEdit } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

export const SKILL_CATEGORIES = [
  {
    title: { es: 'Frontend', en: 'Frontend' },
    skills: [
      { label: 'HTML',              Icon: SiHtml5,       color: '#E34F26' },
      { label: 'CSS',               Icon: SiCss,         color: '#1572B6' },
      { label: 'Bootstrap',         Icon: SiBootstrap,   color: '#7952B3' },
      { label: 'Tailwind',          Icon: SiTailwindcss, color: '#06B6D4' },
      { label: 'JavaScript',        Icon: SiJavascript,  color: '#F7DF1E' },
      { label: 'TypeScript',        Icon: SiTypescript,  color: '#3178C6' },
      { label: 'React',             Icon: SiReact,       color: '#61DAFB' },
      { label: 'Vite',              Icon: SiVite,        color: '#646CFF' },
      { label: 'React Three Fiber', Icon: SiThreedotjs,  color: '#ffffff' },
      { label: 'GSAP',              Icon: SiGreensock,   color: '#88CE02' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend' },
    skills: [
      { label: 'PHP',      Icon: SiPhp,     color: '#777BB4' },
      { label: 'Laravel',  Icon: SiLaravel, color: '#FF2D20' },
      { label: '.NET',     Icon: SiDotnet,  color: '#512BD4' },
      { label: 'API Rest', Icon: TbApi,     color: '#22D3EE' },
      { label: 'MySQL',    Icon: SiMysql,   color: '#4479A1' },
      { label: 'XML',      Icon: SiXml,     color: '#F97316' },
      { label: 'JSON',     Icon: SiJson,    color: '#FACC15' },
      { label: 'Java',     Icon: FaJava,    color: '#ED8B00' },
      { label: 'Stripe',   Icon: SiStripe,  color: '#635BFF' },
    ],
  },
  {
    title: { es: 'DevOps y herramientas', en: 'DevOps and tools' },
    skills: [
      { label: 'Git',        Icon: SiGit,                 color: '#F05032' },
      { label: 'Jenkins',    Icon: SiJenkins,             color: '#D24939' },
      { label: 'Bitbucket',  Icon: SiBitbucket,           color: '#0052CC' },
      { label: 'Jira',       Icon: SiJira,                color: '#0052CC' },
      { label: 'Salesforce', Icon: SiSalesforce,          color: '#00A1E0' },
      { label: 'Docker',     Icon: SiDocker,              color: '#2496ED' },
      { label: 'Cloudflare', Icon: SiCloudflareworkers,   color: '#F38020' },
      { label: 'Railway',    Icon: SiRailway,             color: '#ffffff' },
      { label: 'Claude',     Icon: SiClaude,              color: '#D97757' },
      { label: 'GitHub Copilot', Icon: SiGithubcopilot,   color: '#ffffff' },
      { label: 'Cursor',     Icon: TbCursorText,          color: '#ffffff' },
      { label: 'Photoshop',  Icon: TbPhotoEdit,           color: '#31A8FF' },
      { label: 'Sony Vegas', Icon: SiVegas,               color: '#1A9BD7' },
    ],
  },
]
