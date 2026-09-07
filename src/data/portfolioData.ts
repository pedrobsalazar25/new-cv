import { Project, Service, ExperienceItem, Skill, ClientPartner, Certification, TimeLog } from '../types';

export const PERSONAL_INFO = {
  name: "Pedro Barrios",
  title: "Artist, Muralist & Creative Web Developer",
  shortBio: "Artist and developer crafting large-scale murals, fine art, and high-performance digital web experiences.",
  fullBio: "Pedro Barrios is a Venezuelan-born artist and developer known for his vibrant street art, large-scale public murals, gallery exhibitions, and modern web applications. Co-founder of 'The Worst Crew' alongside Jaime Molina, Pedro combines geometric abstraction, coastal color palettes, and cutting-edge web technologies to build memorable physical and digital experiences.",
  location: "",
  email: "pedrorafaelbarriossalazar@gmail.com",
  phone: "+58 414 968 6441",
  phoneRaw: "+584149686441",
  whatsapp: "+34 604 06 58 49",
  whatsappUrl: "https://wa.me/34604065849",
  availability: "Available for Murals, Gallery Commissions & Web Development Projects",
  stats: [
    { value: "12+", label: "YEARS OF CREATIVE EXPERIENCE" },
    { value: "40+", label: "PUBLIC MURALS COMPLETED" },
    { value: "80+", label: "FINE ART & DIGITAL PROJECTS" },
    { value: "12", label: "PUBLIC ART AWARDS" }
  ],
  socials: {
    github: "https://github.com/pedrobarrios",
    linkedin: "https://linkedin.com/in/pedrobarrios",
    behance: "https://behance.net/pedrobarrios",
    dribbble: "https://dribbble.com/pedrobarrios",
    instagram: "https://instagram.com/pedrobarriosart",
    twitter: "https://twitter.com/pedrobarriosart"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "smile-sanctuary",
    title: "SMILE SANCTUARY",
    subtitle: "smilesanctuary.net",
    liveUrl: "https://smilesanctuary.net/",
    faviconUrl: "https://pedrobarrios.com/favicons/smilesanctuary_net.png",
    category: "health",
    categoryLabel: "SALUD & ODONTOLOGÍA",
    year: "2024",
    client: "Smile Sanctuary Dental Clinic",
    location: "United States",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    description: "Clínica dental que ofrece atención dental integral y servicios de odontología estética.",
    story: "Desarrollo de plataforma web intuitiva con reserva de citas, catálogo de tratamientos estéticos y diseño responsive optimizado para conversión de pacientes.",
    medium: "React, Web Application, UI/UX, SEO",
    featured: true
  },
  {
    id: "marketing-innovations",
    title: "MARKETING INNOVATIONS",
    subtitle: "marketinginnovations.biz",
    liveUrl: "https://marketinginnovations.biz/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=marketinginnovations.biz&sz=32",
    category: "marketing",
    categoryLabel: "MARKETING DIGITAL",
    year: "2024",
    client: "Marketing Innovations Agency",
    location: "Remote / Global",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    description: "Agencia de marketing digital enfocada en optimización de ROI y crecimiento acelerado.",
    story: "Diseño y arquitectura web orientada a la conversión de leads B2B, analítica avanzada de campañas y presentación de servicios de marketing digital.",
    medium: "Full-Stack Web Development, Performance Marketing",
    featured: true
  },
  {
    id: "debt-relief-help",
    title: "DEBT RELIEF HELP",
    subtitle: "debtreliefhelp.org",
    liveUrl: "https://debtreliefhelp.org/",
    faviconUrl: "https://pedrobarrios.com/favicons/debtreliefhelp_org.png",
    category: "financial",
    categoryLabel: "SERVICIOS FINANCIEROS",
    year: "2024",
    client: "Debt Relief Help Foundation",
    location: "United States",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de negociación y alivio de deudas para tarjetas de crédito, préstamos personales, cobros y deudas empresariales.",
    story: "Plataforma de asesoría financiera con calculadora interactiva de reducción de deudas, formularios de evaluación de elegibilidad en tiempo real y arquitectura segura.",
    medium: "Web Platform, Interactive Forms, Security Protocols",
    featured: true
  },
  {
    id: "neotropic-foundation",
    title: "NEOTROPIC FOUNDATION",
    subtitle: "neotropicfoundation.org",
    liveUrl: "https://neotropicfoundation.org/",
    faviconUrl: "https://pedrobarrios.com/favicons/neotropicfoundation_org.png",
    category: "realestate-environment",
    categoryLabel: "SIN FINES DE LUCRO",
    year: "2024",
    client: "Neotropic Foundation",
    location: "Costa Rica / Global",
    image: "https://images.unsplash.com/photo-1511497584788-876761c1193c?auto=format&fit=crop&w=1000&q=80",
    description: "Fundación ambiental y de conservación enfocada en la preservación de biodiversidad neotropical.",
    story: "Sitio web institucional con pasarela de donaciones, exhibición multimedia de proyectos de reforestación y conservación de fauna silvestre.",
    medium: "CMS Development, Responsive Web Design, Media Integration",
    featured: true
  },
  {
    id: "axiom-financial",
    title: "AXIOM FINANCIAL",
    subtitle: "axiomfinancialllc.com",
    liveUrl: "https://axiomfinancialllc.com/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=axiomfinancialllc.com&sz=32",
    category: "financial",
    categoryLabel: "SERVICIOS FINANCIEROS",
    year: "2024",
    client: "Axiom Financial LLC",
    location: "United States",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    description: "Consultoría financiera corporativa y servicios de experiencia empresarial.",
    story: "Plataforma corporativa elegante diseñada para posicionar servicios de consultoría estratégica, análisis patrimonial y asesoría financiera empresarial.",
    medium: "Corporate UI/UX, Web Architecture, Performance Optimization",
    featured: true
  },
  {
    id: "explore-costa-rica",
    title: "EXPLORE COSTA RICA",
    subtitle: "explorecostarica.net",
    liveUrl: "https://explorecostarica.net/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=explorecostarica.net&sz=32",
    category: "realestate-environment",
    categoryLabel: "VIAJES Y TURISMO",
    year: "2024",
    client: "Explore Costa Rica",
    location: "Costa Rica",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de aventura, turismo ecológico y reubicación en Costa Rica.",
    story: "Portal turístico y de consejería en relocalización con catálogos de tours de aventura, guías de estilo de vida en Costa Rica y formularios de reserva.",
    medium: "Travel Portal, Interactive Booking Engine, SEO",
    featured: true
  },
  {
    id: "green-power-solar",
    title: "GREEN POWER SOLAR SYSTEMS",
    subtitle: "greenpowersolarsystems.com",
    liveUrl: "https://greenpowersolarsystems.com/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=greenpowersolarsystems.com&sz=32",
    category: "realestate-environment",
    categoryLabel: "ENERGÍA RENOVABLE",
    year: "2024",
    client: "Green Power Solar Systems",
    location: "United States",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    description: "Sistemas de energía solar y soluciones de energía verde residenciales e industriales.",
    story: "Sitio web dinámico con estimador interactivo de ahorro de energía solar, catálogo de paneles fotovoltaicos y generación de cotizaciones automatizadas.",
    medium: "Web Application, Solar Savings Calculator, Lead Gen"
  },
  {
    id: "webs-para-abogados",
    title: "WEBS PARA ABOGADOS",
    subtitle: "websparaabogados.com",
    liveUrl: "https://websparaabogados.com/",
    faviconUrl: "https://pedrobarrios.com/favicons/websparaabogados_com.png",
    category: "financial",
    categoryLabel: "SERVICIOS LEGALES",
    year: "2024",
    client: "Webs para Abogados (España & Panamá)",
    location: "España / Panamá",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de diseño web y captación digital para bufetes de abogados en España y Panamá.",
    story: "Plataforma especializada en soluciones digitales para firmas legales, integrando captura de clientes, posicionamiento SEO jurídico y diseño sobrio y profesional.",
    medium: "Legal Tech Web Design, SEO & Conversion Optimization"
  },
  {
    id: "vivienda-latina-usa",
    title: "VIVIENDA LATINA USA",
    subtitle: "viviendalatinausa.com",
    liveUrl: "https://viviendalatinausa.com/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=viviendalatinausa.com&sz=32",
    category: "realestate-environment",
    categoryLabel: "BIENES RAÍCES",
    year: "2024",
    client: "Vivienda Latina USA",
    location: "United States / Latinoamérica",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de hipoteca e inversión inmobiliaria con enfoque en la comunidad latina.",
    story: "Portal inmobiliario adaptado con herramientas de precalificación hipotecaria, listados de propiedades de inversión y recursos educativos financieros.",
    medium: "Real Estate Portal, Mortgage Calculators, UI/UX"
  },
  {
    id: "medikos",
    title: "MEDIKOS",
    subtitle: "medikos.net",
    liveUrl: "https://medikos.net/",
    faviconUrl: "https://www.google.com/s2/favicons?domain=medikos.net&sz=32",
    category: "health",
    categoryLabel: "MARKETING MÉDICO",
    year: "2024",
    client: "Medikos Health Network",
    location: "Global",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    description: "Agencia de marketing digital especializada en prácticas médicas y clínicas estéticas.",
    story: "Solución integral de crecimiento digital para profesionales de la salud, optimizando páginas de captura médica y reputación online.",
    medium: "Healthcare Marketing Tech, Web Development"
  },
  {
    id: "sewage-treatment-cr",
    title: "SEWAGE TREATMENT CR",
    subtitle: "sewagetreatmentcr.net",
    liveUrl: "https://sewagetreatmentcr.net/",
    faviconUrl: "https://pedrobarrios.com/favicons/sewagetreatmentcr_net.png",
    category: "realestate-environment",
    categoryLabel: "SERVICIOS AMBIENTALES",
    year: "2024",
    client: "Sewage Treatment Costa Rica",
    location: "Costa Rica",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    description: "Sistemas compactos y ecológicos de tratamiento de aguas residuales con tecnología LZT para hogares, empresas e industrias.",
    story: "Catálogo industrial interactivo para sistemas de purificación de agua LZT, especificaciones técnicas y cotizaciones automatizadas.",
    medium: "Industrial Web Catalog, Eco-Tech Platform"
  },
  {
    id: "mortgage-freedom",
    title: "MORTGAGE FREEDOM",
    subtitle: "mortgagefreedom.org",
    liveUrl: "https://mortgagefreedom.org/",
    faviconUrl: "https://pedrobarrios.com/favicons/mortgagefreedom_org.png",
    category: "financial",
    categoryLabel: "SERVICIOS FINANCIEROS",
    year: "2024",
    client: "Mortgage Freedom Network",
    location: "United States",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de planificación y optimización de estrategias hipotecarias para reducir gastos de intereses y optimizar flujo de caja.",
    story: "Aplicación web financiera con simuladores de amortización, estrategias de pago acelerado y consultoría personalizada.",
    medium: "Fintech Application, Amortization Engine"
  },
  {
    id: "costa-rica-loan-experts",
    title: "COSTA RICA LOAN EXPERTS",
    subtitle: "costaricaloanexperts.net",
    liveUrl: "https://costaricaloanexperts.net/",
    faviconUrl: "https://pedrobarrios.com/favicons/costaricaloanexperts_net.png",
    category: "financial",
    categoryLabel: "PRÉSTAMOS Y BIENES RAÍCES",
    year: "2024",
    client: "Costa Rica Loan Experts",
    location: "Costa Rica",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    description: "Préstamos privados y oportunidades de inversión inmobiliaria en Costa Rica respaldados por propiedades.",
    story: "Portal de financiamiento privado con herramientas de aplicación de préstamos con colateral hipotecario y panel de inversores.",
    medium: "Fintech Portal, Private Equity Web System"
  },
  {
    id: "700-club",
    title: "700 CLUB",
    subtitle: "700club.net",
    liveUrl: "https://700club.net/",
    faviconUrl: "https://pedrobarrios.com/favicons/700club_net.png",
    category: "financial",
    categoryLabel: "SERVICIOS DE CRÉDITO",
    year: "2024",
    client: "700 Club Credit Restoration",
    location: "United States",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
    description: "Servicios de reparación y construcción de crédito incluyendo análisis crediticio, disputas y restauración por robo de identidad.",
    story: "Plataforma de restauración crediticia con seguimiento de disputas, análisis de reporte de crédito e integración de identidad digital.",
    medium: "Fintech Portal, Secure Client Portal"
  }
];

export const SERVICES: Service[] = [
  {
    id: "large-scale-murals",
    title: "LARGE-SCALE MURALS",
    description: "Transforming civic spaces, commercial buildings, and urban corridors with high-impact outdoor murals.",
    icon: "Brush",
    deliverables: [
      "Facade design & color consultation",
      "Surface prep, lift operations & site safety",
      "Weather-resistant exterior paint systems",
      "Community workshops & public engagement"
    ]
  },
  {
    id: "web-development",
    title: "WEB DEVELOPMENT",
    description: "Custom React and TypeScript web applications engineered for speed, beauty, and performance.",
    icon: "LayoutGrid",
    deliverables: [
      "Custom responsive layouts & mobile design",
      "High-contrast editorial typography & design systems",
      "Full-stack Express API integrations & database architecture",
      "Performance optimization & sub-second loads"
    ]
  },
  {
    id: "gallery-commissions",
    title: "GALLERY COMMISSIONS",
    description: "Bespoke studio fine art on wood panel, paper, and canvas for collectors, galleries, and corporate art programs.",
    icon: "Palette",
    deliverables: [
      "Original gouache, ink & tea stain studio works",
      "Custom carved wood panel installations",
      "Limited edition print & flag releases",
      "Archival framing & gallery documentation"
    ]
  },
  {
    id: "creative-direction",
    title: "CREATIVE DIRECTION",
    description: "Cohesive spatial art direction, restaurant identity design, and visual brand systems.",
    icon: "FramedImage",
    deliverables: [
      "Spatial & interior artwork strategy",
      "Brand identity & typographic guidelines",
      "Custom iconography & architectural accents",
      "Collaborative project curation"
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "origami-seo",
    period: "AUG 2025 – PRESENT",
    role: "SEO & Web Content Specialist",
    organization: "Origami Solutions",
    location: "On-site",
    description: "Worked as an SEO and Web Content Specialist supporting multiple client accounts across different industries. My work focused on maintaining and updating client websites, creating content aligned with SEO best practices, and preparing performance reports with actionable insights.",
    highlights: [
      "Performed website maintenance, content updates, on-page SEO improvements, and technical checks to improve site visibility and usability.",
      "Created SEO-driven content for landing pages, blog posts, and product descriptions following brand voice and keyword research.",
      "Prepared SEO analysis reports, keyword tracking summaries, and competitor audits to guide client marketing decisions.",
      "Supported Google Ads campaigns by reviewing landing page performance, setting up basic tracking, and aligning content with campaign goals."
    ]
  },
  {
    id: "freelance-dev",
    period: "2023 – PRESENT",
    role: "Freelance Web Developer",
    organization: "Freelance",
    location: "Remote",
    description: "As a freelance Web and Android Developer, I build fast, reliable, and user-focused applications for small businesses, startups, and personal clients. I collaborate with founders, designers, and non-technical stakeholders to translate ideas into well-structured digital products.",
    highlights: [
      "Built responsive web & Android applications for small businesses, startups, and personal clients",
      "Collaborated directly with founders and designers to turn ideas into structured digital products",
      "Delivered performant, accessible code with ongoing technical support and maintenance"
    ]
  },
  {
    id: "aimhii-dev",
    period: "2023",
    role: "Developer",
    organization: "AIMHII",
    location: "Hybrid / Remote",
    description: "At AIMHII, I helped build and refine digital products focused on delivering clean interfaces and smooth user experiences. I collaborated with cross-functional teams to clarify requirements, plan feature rollouts, and ensure quality across releases.",
    highlights: [
      "Collaborated with cross-functional teams to plan and execute product feature rollouts",
      "Engineered intuitive UI components centered on delivering smooth user experiences",
      "Maintained code quality, testing standards, and agile sprint deliveries"
    ]
  },
  {
    id: "professor-udo",
    period: "2020 – 2022",
    role: "College Professor — IT",
    organization: "Universidad de Oriente",
    location: "Venezuela",
    description: "Full-time professor teaching development, networking, and technical fundamentals. Designed hands-on labs and delivered real-world IT examples.",
    highlights: [
      "Taught core software development, computer networking, and IT fundamentals",
      "Designed hands-on technical laboratory assignments and coursework",
      "Mentored students in engineering practices, troubleshooting, and real-world IT solutions"
    ]
  },
  {
    id: "english-prof-bsl",
    period: "2014 – 2019",
    role: "English Professor",
    organization: "British School of Languages",
    location: "On-site",
    description: "Taught English to students across levels, designed curricula, and tracked learner progress with structured assessments.",
    highlights: [
      "Delivered comprehensive language instruction across foundational and advanced proficiency levels",
      "Developed structured educational curricula, lesson units, and interactive learning tools",
      "Monitored individual student progress and evaluated language acquisition through assessments"
    ]
  },
  {
    id: "english-teacher-nie",
    period: "2012 – 2014",
    role: "English Teacher",
    organization: "National Institute of English",
    location: "On-site",
    description: "Delivered group and 1:1 instruction, improved lesson planning, and supported students with practical language use.",
    highlights: [
      "Provided group classes and customized 1:1 language coaching sessions",
      "Created practical lesson plans tailored for everyday communication and business contexts",
      "Guided students in building confidence and fluently applying language concepts"
    ]
  },
  {
    id: "radio-producer",
    period: "2009 – 2010",
    role: "Radio Producer",
    organization: "Oceanica Radio Station",
    location: "On-site",
    description: "Produced segments, coordinated programming, and supported live broadcast operations.",
    highlights: [
      "Produced radio segments and coordinated daily station broadcasting schedules",
      "Managed live audio broadcast operations, mixing, and soundboard controls",
      "Supported technical audio workflows and guest interview logistics"
    ]
  },
  {
    id: "content-writer-gobo",
    period: "2008 – 2009",
    role: "Content Writer & Marketing Assistant",
    organization: "Gobo Latino",
    location: "On-site",
    description: "Wrote content and supported marketing initiatives with research and publishing workflows.",
    highlights: [
      "Authored digital content, marketing articles, and promotional copy",
      "Conducted market research and audience trend analysis for outreach campaigns",
      "Supported publication schedules and digital content distribution workflows"
    ]
  },
  {
    id: "lab-manager-udo",
    period: "2008 – 2009",
    role: "Computer Lab Manager",
    organization: "Universidad de Oriente",
    location: "Venezuela",
    description: "Maintained lab systems, managed access, and supported students and faculty with technical issues.",
    highlights: [
      "Managed computer lab systems, operating system deployments, and hardware health",
      "Provided technical assistance to university faculty, researchers, and students",
      "Supervised network workstation access, user credentials, and security protocols"
    ]
  },
  {
    id: "it-technician-udo",
    period: "2008 – 2009",
    role: "IT Technician",
    organization: "Universidad de Oriente",
    location: "Venezuela",
    description: "Provided technical support across university systems, including hardware and network troubleshooting.",
    highlights: [
      "Delivered IT support across university departments, offices, and computer facilities",
      "Troubleshot hardware defects, network connectivity errors, and system software",
      "Maintained hardware inventories, network cabling, and workstation upgrades"
    ]
  },
  {
    id: "tech-support-oceanica",
    period: "2007 – 2008",
    role: "Technical Support",
    organization: "Oceanica Radio Station",
    location: "On-site",
    description: "Installed DMX consoles, trained staff on broadcasting equipment, and supported live audio workflows.",
    highlights: [
      "Installed and calibrated DMX audio control consoles and studio broadcast hardware",
      "Trained radio hosts, technicians, and station staff on live transmission equipment",
      "Resolved real-time audio routing issues and maintained broadcast hardware integrity"
    ]
  },
  {
    id: "network-tech-intersound",
    period: "2006 – 2007",
    role: "Network Technician",
    organization: "Intersound Global Trading",
    location: "Venezuela",
    description: "Supported the installation and configuration of networking systems for the Estadio Monumental sound infrastructure.",
    highlights: [
      "Assisted in configuring network hardware for Estadio Monumental's stadium sound system",
      "Installed networking cables, routing devices, and high-capacity audio transmission nodes",
      "Conducted network diagnostic tests to guarantee reliable signal distribution during events"
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "LARGE-SCALE MURALS", level: 98 },
  { name: "WEB DEVELOPMENT (REACT/TS)", level: 92 },
  { name: "FINE ART & WOOD SCULPTURE", level: 95 },
  { name: "CREATIVE DIRECTION & UI", level: 90 }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: "RiNo District", logoText: "RiNo ART DISTRICT", category: "Public Art" },
  { name: "Birdcall", logoText: "BIRDCALL", category: "Commercial" },
  { name: "Town of Vail", logoText: "TOWN OF VAIL", category: "Municipal" },
  { name: "Space Gallery", logoText: "SPACE GALLERY", category: "Fine Art" },
  { name: "IRC", logoText: "RESCUE ORG", category: "Non-Profit" },
  { name: "New Belgium", logoText: "NEW BELGIUM", category: "Brand" }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert-1", title: "SEO II", issuer: "HubSpot Academy", date: "Aug 2025", iconUrl: "https://www.hubspot.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-2", title: "Generative AI for Educators Certificate", issuer: "Google Career Certificates", date: "Jul 2025", iconUrl: "https://www.google.com/favicon.ico", category: "ai-data" },
  { id: "cert-3", title: "SEO", issuer: "HubSpot Academy", date: "Jul 2025", iconUrl: "https://www.hubspot.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-4", title: "Create Digital Content, Communicate and Collaborate Online", issuer: "Cisco", date: "May 2025", iconUrl: "https://www.cisco.com/favicon.ico", category: "cs-dev" },
  { id: "cert-5", title: "Introduction to Modern AI", issuer: "Cisco", date: "May 2025", iconUrl: "https://www.cisco.com/favicon.ico", category: "ai-data" },
  { id: "cert-6", title: "Digital Marketing Learner", issuer: "Certiprof", date: "Jan 2025", iconUrl: "", category: "marketing-ads" },
  { id: "cert-7", title: "Display & Video 360 Certification Exam", issuer: "Skillshop", date: "Jan 2025", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-8", title: "Search Ads 360 Certification Exam", issuer: "Skillshop", date: "Jan 2025", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-9", title: "Amazon DSP Advanced Certification", issuer: "Amazon", date: "Sep 2024", iconUrl: "https://www.amazon.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-10", title: "Amazon Video Ads Certification", issuer: "Amazon", date: "Sep 2024", iconUrl: "https://www.amazon.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-11", title: "CS101: Introduction to Computer Science I", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-12", title: "CS102: Introduction to Computer Science II", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-13", title: "CS105: Introduction to Python", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-14", title: "CS107: C++ Programming", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-15", title: "CS201: Elementary Data Structures", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-16", title: "CS202: Discrete Structures", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-17", title: "CS301: Computer Architecture", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-18", title: "CS302: Software Engineering", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-19", title: "CS401: Operating Systems", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-20", title: "CS402: Computer Communications and Networks", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-21", title: "CS403: Introduction to Modern Database Systems", issuer: "Saylor Academy", date: "Sep 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "cs-dev" },
  { id: "cert-22", title: "Content Marketing", issuer: "HubSpot Academy", date: "Sep 2024", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-23", title: "Data Engineering Professional", issuer: "ITRONIX SOLUTION", date: "Sep 2024", iconUrl: "", category: "ai-data" },
  { id: "cert-24", title: "Foundations Of Business And Entrepreneurship", issuer: "SkillFront", date: "Sep 2024", iconUrl: "https://www.skillfront.com/favicon.ico", category: "business-security" },
  { id: "cert-25", title: "ISO 9001 Quality Management Systems Associate", issuer: "SkillFront", date: "Sep 2024", iconUrl: "https://www.skillfront.com/favicon.ico", category: "business-security" },
  { id: "cert-26", title: "ISO/IEC 27001 Information Security Associate", issuer: "SkillFront", date: "Sep 2024", iconUrl: "https://www.skillfront.com/favicon.ico", category: "business-security" },
  { id: "cert-27", title: "Inbound", issuer: "HubSpot Academy", date: "Sep 2024", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-28", title: "Inbound Marketing", issuer: "HubSpot Academy", date: "Sep 2024", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-29", title: "Introduction to Data Science", issuer: "Cisco", date: "Sep 2024", iconUrl: "https://www.cisco.com/favicon.ico", category: "ai-data" },
  { id: "cert-30", title: "Introduction to IoT", issuer: "Cisco", date: "Sep 2024", iconUrl: "https://www.cisco.com/favicon.ico", category: "ai-data" },
  { id: "cert-31", title: "Mobile App Campaign Badge", issuer: "X", date: "Sep 2024", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-32", title: "Networking Basics", issuer: "Cisco", date: "Sep 2024", iconUrl: "https://www.cisco.com/favicon.ico", category: "cs-dev" },
  { id: "cert-33", title: "Social Media Marketing", issuer: "HubSpot Academy", date: "Sep 2024", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-34", title: "CS406: Information Security Certification", issuer: "Saylor Academy", date: "Aug 2024", iconUrl: "https://pedrobarrios.com/favicons/saylor_academy.png", category: "business-security" },
  { id: "cert-35", title: "Google Analytics for Power Users", issuer: "Google", date: "Aug 2024", iconUrl: "https://www.google.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-36", title: "Introduction to Cybersecurity", issuer: "Cisco", date: "Aug 2024", iconUrl: "https://www.cisco.com/favicon.ico", category: "business-security" },
  { id: "cert-37", title: "Advanced Google Analytics", issuer: "Google Skillshop", date: "Sep 2023", iconUrl: "https://www.google.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-38", title: "Twitter Ads Manager Fundamentals Badge", issuer: "Twitter", date: "Sep 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-39", title: "Twitter for Creatives Badge", issuer: "Twitter", date: "Sep 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-40", title: "App Install Campaign Specialist", issuer: "Twitter", date: "Aug 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-41", title: "Cross-Border Advertising", issuer: "Twitter", date: "Aug 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-42", title: "Google Analytics for Beginners", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-43", title: "Launch and Connect Badge", issuer: "Twitter", date: "Aug 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-44", title: "Web Traffic Campaigns Specialist", issuer: "Twitter", date: "Aug 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-45", title: "Search Engine Marketing Course", issuer: "Digital Marketing Certificate", date: "Jul 2023", iconUrl: "", category: "marketing-ads" },
  { id: "cert-46", title: "SEO certification course", issuer: "Digital Marketing Certificate", date: "Apr 2023", iconUrl: "", category: "seo-analytics" },
  { id: "cert-47", title: "Digital Citizenship and Safety Course", issuer: "Digital Marketing Certificate", date: "Apr 2023", iconUrl: "", category: "business-security" },
  { id: "cert-48", title: "Digital Marketing Certificate", issuer: "Digital Marketing Certificate", date: "Apr 2023", iconUrl: "", category: "marketing-ads" },
  { id: "cert-49", title: "Email Marketing", issuer: "HubSpot Academy", date: "Feb 2023", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-50", title: "Google Ads Display Certification", issuer: "Google Skillshop", date: "Feb 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-51", title: "Google Ads Search Certification", issuer: "Google Skillshop", date: "Feb 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-52", title: "Google Ads Video Certification", issuer: "Google Skillshop", date: "Feb 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-53", title: "Google Digital Garage", issuer: "Google", date: "Feb 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-54", title: "Google Tag Manager Fundamentals", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-55", title: "HubSpot CMS for Developers", issuer: "HubSpot Academy", date: "Feb 2023", iconUrl: "https://www.hubspot.com/favicon.ico", category: "cs-dev" },
  { id: "cert-56", title: "Inbound Sales", issuer: "HubSpot Academy", date: "Feb 2023", iconUrl: "https://www.hubspot.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-57", title: "Introduction to IT & Cybersecurity", issuer: "Cisco", date: "Feb 2023", iconUrl: "https://www.cisco.com/favicon.ico", category: "business-security" },
  { id: "cert-58", title: "IT Essentials", issuer: "Cisco", date: "Feb 2023", iconUrl: "https://www.cisco.com/favicon.ico", category: "cs-dev" },
  { id: "cert-59", title: "Media Buying & Planning", issuer: "Google Skillshop", date: "Feb 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-60", title: "Microsoft Advertising Certified Professional", issuer: "Microsoft", date: "Aug 2023", iconUrl: "https://www.microsoft.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-61", title: "Microsoft Advertising Search Certification", issuer: "Microsoft", date: "Aug 2023", iconUrl: "https://www.microsoft.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-62", title: "Microsoft Advertising Shopping Certification", issuer: "Microsoft", date: "Aug 2023", iconUrl: "https://www.microsoft.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-63", title: "Mobile Experience", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "cs-dev" },
  { id: "cert-64", title: "PPC Fundamentals", issuer: "Semrush", date: "Sep 2023", iconUrl: "https://www.semrush.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-65", title: "SEO Fundamentals Course", issuer: "Semrush", date: "Sep 2023", iconUrl: "https://www.semrush.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-66", title: "Semrush Site Audit Course", issuer: "Semrush", date: "Sep 2023", iconUrl: "https://www.semrush.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-67", title: "Semrush Technical SEO Course", issuer: "Semrush", date: "Sep 2023", iconUrl: "https://www.semrush.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-68", title: "Twitter Video Ads Specialist Badge", issuer: "Twitter", date: "Sep 2023", iconUrl: "https://x.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-69", title: "Amazon Ads Retail Certification", issuer: "Amazon", date: "Aug 2023", iconUrl: "https://www.amazon.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-70", title: "Campaign Manager 360", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-71", title: "Google Ads AI-Powered Performance Ads Assessment", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "marketing-ads" },
  { id: "cert-72", title: "Google Analytics Individual Qualification", issuer: "Google Skillshop", date: "Aug 2023", iconUrl: "https://www.google.com/favicon.ico", category: "seo-analytics" },
  { id: "cert-73", title: "Yandex.Metrica Expert", issuer: "Yandex", date: "Aug 2023", iconUrl: "https://yandex.com/favicon.ico", category: "seo-analytics" }
];

export const DEFAULT_TIME_LOGS: TimeLog[] = [
  {
    id: "log-1",
    taskName: "Frontend Architecture & Mobile Autoplay Carousel",
    projectName: "Portfolio Experience 2024",
    projectId: "smile-sanctuary",
    category: "development",
    startTime: "2026-08-14T06:00:00.000Z",
    endTime: "2026-08-14T08:45:00.000Z",
    durationSeconds: 9900, // 2h 45m
    hourlyRate: 90,
    billable: true,
    isBilled: false,
    notes: "Implemented touch gestures, dynamic timer progress, pause/resume and full project modal repository.",
    createdAt: "2026-08-14T08:45:00.000Z"
  },
  {
    id: "log-2",
    taskName: "Legal Platform CMS Backend & Case Management",
    projectName: "PEDRO RAFAEL BARRIOS SALAZAR - Legal Platform",
    projectId: "pedro-barrios-legal",
    category: "development",
    startTime: "2026-08-13T09:15:00.000Z",
    endTime: "2026-08-13T13:45:00.000Z",
    durationSeconds: 16200, // 4h 30m
    hourlyRate: 95,
    billable: true,
    isBilled: true,
    notes: "Built Firestore real-time synchronization, search indexing, and bilingual ES/EN language toggles.",
    createdAt: "2026-08-13T13:45:00.000Z"
  },
  {
    id: "log-3",
    taskName: "Public Mural Geometric Palette Calibration",
    projectName: "Origins of Fire - Miami Mural Project",
    projectId: "origins-fire",
    category: "art-mural",
    startTime: "2026-08-12T10:00:00.000Z",
    endTime: "2026-08-12T15:30:00.000Z",
    durationSeconds: 19800, // 5h 30m
    hourlyRate: 85,
    billable: true,
    isBilled: true,
    notes: "Prepared large-scale architectural wall grid and layered mineral paint color specs.",
    createdAt: "2026-08-12T15:30:00.000Z"
  },
  {
    id: "log-4",
    taskName: "UI/UX Mockups & Typography Pairing Sprint",
    projectName: "Smile Sanctuary Dental Clinic",
    projectId: "smile-sanctuary",
    category: "design",
    startTime: "2026-08-11T14:00:00.000Z",
    endTime: "2026-08-11T17:15:00.000Z",
    durationSeconds: 11700, // 3h 15m
    hourlyRate: 85,
    billable: true,
    isBilled: false,
    notes: "Crafted high-contrast accessible layouts and patient appointment booking flows.",
    createdAt: "2026-08-11T17:15:00.000Z"
  }
];
