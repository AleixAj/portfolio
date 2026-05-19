/**
 * Navigation config: navbar links, section order,
 * and rotating hero words per language.
 */
export const NAV_ITEMS = [
  { id: 'inicio',   labels: { es: 'Inicio',      en: 'Home'       } },
  { id: 'about',    labels: { es: 'Trayectoria', en: 'Journey'    } },
  { id: 'projects', labels: { es: 'Proyectos',   en: 'Projects'   } },
  { id: 'skills',   labels: { es: 'Skills',      en: 'Skills'     } },
  { id: 'hobbies',  labels: { es: 'Arte',        en: 'Art'        } },
  { id: 'contact',  labels: { es: 'Contacto',    en: 'Contact'    } },
]

export const SECTIONS = ['inicio', 'about', 'projects', 'skills', 'hobbies', 'contact']

export const ROTATING_WORDS = {
  es: ['ideas', 'proyectos', 'sueños', 'visiones', 'retos'],
  en: ['ideas', 'projects', 'dreams', 'visions', 'challenges'],
}
