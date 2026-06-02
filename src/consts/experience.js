/**
 * Work experience and education data.
 * Bilingual fields as { es, en, ca } for role, period, and desc.
 */
export const EXPERIENCE = [
  {
    company: 'Grup Romeu',
    role: { es: 'Desarrollador de Software', en: 'Software Developer', ca: 'Desenvolupador de Programari' },
    period: { es: 'Ago 2025 – Ene 2026', en: 'Aug 2025 – Jan 2026', ca: 'Ago 2025 – Gen 2026' },
    desc: {
      es: 'Contrato temporal full-stack por sustitución, desarrollando una aplicación interna para gestión de material quirúrgico con PHP y JavaScript.',
      en: 'Temporary full-stack replacement contract, building an internal application to manage surgical material with PHP and JavaScript.',
      ca: 'Contracte temporal full-stack per substitució, desenvolupant una aplicació interna per a la gestió de material quirúrgic amb PHP i JavaScript.',
    },
  },
  {
    company: 'Nemon',
    role: { es: 'Desarrollador de Software', en: 'Software Developer', ca: 'Desenvolupador de Programari' },
    period: { es: 'May 2023 – Abr 2025', en: 'May 2023 – Apr 2025', ca: 'Maig 2023 – Abr 2025' },
    desc: {
      es: 'Desarrollo de soluciones a medida para distribuidoras de electricidad y gas, trabajando sobre un framework propio en PHP y procesos de negocio reales.',
      en: 'Developed custom solutions for electricity and gas distributors, working on a proprietary PHP framework and real business processes.',
      ca: 'Desenvolupament de solucions a mida per a distribuïdores d\'electricitat i gas, treballant sobre un framework propi en PHP i processos de negoci reals.',
    },
  },
  {
    company: 'VIEWNEXT',
    role: { es: 'Release Manager & Desarrollador de Software', en: 'Release Manager & Software Developer', ca: 'Release Manager i Desenvolupador de Programari' },
    period: { es: 'Nov 2019 – Abr 2023', en: 'Nov 2019 – Apr 2023', ca: 'Nov 2019 – Abr 2023' },
    desc: {
      es: 'Gestión de releases y soporte al desarrollo en entornos corporativos: Salesforce para Nestlé, despliegues con COPADO en CaixaBank y pipelines con Bitbucket/Jenkins en Naturgy.',
      en: 'Release management and development support in enterprise environments: Salesforce for Nestle, COPADO deployments at CaixaBank, and Bitbucket/Jenkins pipelines at Naturgy.',
      ca: 'Gestió de releases i suport al desenvolupament en entorns corporatius: Salesforce per a Nestlé, desplegaments amb COPADO a CaixaBank i pipelines amb Bitbucket/Jenkins a Naturgy.',
    },
    clients: [
      { name: 'CaixaBank', color: '#007EAE' },
      { name: 'Nestlé',    color: '#B8956A' },
      { name: 'Naturgy',   color: '#FF6900' },
    ],
  },
  {
    company: 'Comun. Regants Pantà de Riudecanyes',
    role: { es: 'Desarrollador de Software', en: 'Software Developer', ca: 'Desenvolupador de Programari' },
    period: { es: 'Feb 2018 – Jun 2018', en: 'Feb 2018 – Jun 2018', ca: 'Feb 2018 – Jun 2018' },
    desc: {
      es: 'Prácticas de 400h centradas en mantenimiento y evolución de software de gestión de usuarios y base de datos.',
      en: '400-hour internship focused on maintaining and evolving user management and database software.',
      ca: 'Pràctiques de 400 h centrades en el manteniment i l\'evolució de programari de gestió d\'usuaris i base de dades.',
    },
  },
]

export const EDUCATION = [
  {
    center: 'Lemoncoders',
    title: 'Bootcamp Frontend Developer',
    period: { es: 'May 2025', en: 'May 2025', ca: 'Maig 2025' },
    desc: { es: 'JavaScript, TypeScript, HTML, CSS y React.', en: 'JavaScript, TypeScript, HTML, CSS, and React.', ca: 'JavaScript, TypeScript, HTML, CSS i React.' },
  },
  {
    center: 'Fundació esplai',
    title: 'Bootcamp PHP',
    period: { es: 'Jul – Sep 2019', en: 'Jul – Sep 2019', ca: 'Jul – Set 2019' },
    desc: { es: '275h presenciales. PHP y Laravel.', en: '275 in-person hours. PHP and Laravel.', ca: '275 h presencials. PHP i Laravel.' },
  },
  {
    center: 'Fundació esplai',
    title: 'Bootcamp Java',
    period: { es: 'Abr – Jun 2019', en: 'Apr – Jun 2019', ca: 'Abr – Jun 2019' },
    desc: { es: '275h presenciales. Java y SQL.', en: '275 in-person hours. Java and SQL.', ca: '275 h presencials. Java i SQL.' },
  },
  {
    center: 'INS Baix Camp',
    title: { es: 'CFGS Desarrollo de Aplicaciones Web (DAW)', en: 'Higher Vocational Degree in Web Application Development', ca: 'CFGS Desenvolupament d\'Aplicacions Web (DAW)' },
    period: '2015 – 2018',
    desc: '',
  },
  {
    center: 'INS Domènech i Montaner',
    title: { es: 'ESO y Bachillerato Tecnológico', en: 'Secondary Education and Technological Baccalaureate', ca: 'ESO i Batxillerat Tecnològic' },
    period: '2008 – 2014',
    desc: '',
  },
]
