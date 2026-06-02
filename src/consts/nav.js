/**
 * Navigation config: navbar links, section order,
 * and rotating hero words per language.
 */
export const NAV_ITEMS = [
  { id: 'inicio',   labels: { es: 'Inicio',      en: 'Home',       ca: 'Inici'      } },
  { id: 'about',    labels: { es: 'Trayectoria', en: 'Journey',    ca: 'Trajectòria' } },
  { id: 'projects', labels: { es: 'Proyectos',   en: 'Projects',   ca: 'Projectes'  } },
  { id: 'skills',   labels: { es: 'Tecnologías', en: 'Skills',     ca: 'Tecnologies' } },
  { id: 'hobbies',  labels: { es: 'Arte',        en: 'Art',        ca: 'Art'        } },
  { id: 'contact',  labels: { es: 'Contacto',    en: 'Contact',    ca: 'Contacte'   } },
]

export const SECTIONS = ['inicio', 'about', 'projects', 'skills', 'hobbies', 'contact']

export const ROTATING_WORDS = {
  es: ['ideas', 'proyectos', 'sueños', 'visiones', 'retos'],
  en: ['ideas', 'projects', 'dreams', 'visions', 'challenges'],
  ca: ['idees', 'projectes', 'somnis', 'visions', 'reptes'],
}
