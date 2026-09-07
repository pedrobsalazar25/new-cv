export type Language = 'en' | 'es';

export const TRANSLATIONS = {
  en: {
    // Header
    nav: {
      work: 'WORK',
      services: 'SERVICES',
      about: 'ABOUT',
      experience: 'EXPERIENCE',
      certifications: 'CERTIFICATIONS',
      contact: 'CONTACT',
      talk: "LET'S TALK",
      roleBadge: 'WEB DEVELOPER'
    },
    // Hero
    hero: {
      badge: 'ARTIST, MURALIST & CREATIVE WEB DEVELOPER',
      headlinePart1: 'BRIDGING PHYSICAL ART',
      headlinePart2: '& DIGITAL CODE',
      headlineSub: 'FOR BOLD BRANDS & SPACES',
      bio: 'Artist and developer crafting large-scale murals, fine art, and high-performance digital web experiences.',
      viewWork: 'VIEW SELECTED WORK',
      exploreServices: 'EXPLORE SERVICES',
      availability: 'AVAILABLE FOR MURALS, GALLERY COMMISSIONS & WEB DEVELOPMENT PROJECTS',
      stats: [
        { value: "12+", label: "YEARS OF CREATIVE EXPERIENCE" },
        { value: "40+", label: "PUBLIC MURALS COMPLETED" },
        { value: "80+", label: "FINE ART & DIGITAL PROJECTS" },
        { value: "12", label: "PUBLIC ART AWARDS" }
      ]
    },
    // Selected Work
    work: {
      tag: 'FEATURED PROJECTS',
      title: 'PORTFOLIO',
      startProject: 'START A PROJECT',
      searchPlaceholder: 'Search projects by name, domain, or technology...',
      noResultsTitle: 'No projects found',
      noResultsDesc: 'We couldn’t find any projects matching your search criteria. Try adjusting your search keywords or clearing active category filters.',
      noResultsMatching: 'No results for',
      clearSearch: 'CLEAR ALL FILTERS',
      showMore: 'SHOW MORE PROJECTS',
      showLess: 'SHOW LESS',
      viewAllSeparateSite: 'SHOW ALL PROJECTS IN SEPARATE SITE',
      viewAllSeparateSiteShort: 'ALL PROJECTS SITE',
      openSeparateWindow: 'Open in new window',
      featuredCarouselTag: 'SWIPE OR AUTOPLAY',
      autoplayActive: 'Autoplay On',
      autoplayPaused: 'Autoplay Paused',
      viewCaseStudy: 'VIEW PROJECT DETAILS',
      tabs: {
        all: 'ALL PROJECTS',
        financial: 'FINANCIAL & LEGAL',
        health: 'HEALTH & MEDICAL',
        marketing: 'DIGITAL MARKETING',
        'realestate-environment': 'REAL ESTATE & SUSTAINABILITY'
      }
    },
    allProjectsPage: {
      tag: 'COMPLETE PORTFOLIO ARCHIVE',
      title: 'ALL PROJECTS REPOSITORY',
      subtitle: 'Explore the full body of custom web applications, digital systems, public murals, and brand design works.',
      backHome: 'BACK TO MAIN SITE',
      openNewTab: 'OPEN IN STANDALONE TAB',
      totalCount: 'TOTAL PROJECTS',
      filterAll: 'ALL',
      sortBy: 'SORT BY',
      sortLatest: 'NEWEST FIRST',
      sortOldest: 'OLDEST FIRST',
      sortAlpha: 'TITLE (A-Z)',
      viewLiveSite: 'VISIT LIVE SITE',
      quickView: 'QUICK VIEW',
      techStack: 'TECHNOLOGIES USED',
      category: 'CATEGORY',
      year: 'YEAR'
    },
    // Services
    services: {
      leftTag: 'WHAT I OFFER',
      leftTitle: 'CREATIVE SERVICES & WEB DEV',
      leftDesc: 'Elevating physical spaces and digital products with expressive geometric art, modern web applications, and strategic visual direction.',
      requestQuote: 'REQUEST A QUOTE',
      items: [
        {
          id: 'large-scale-murals',
          title: 'LARGE-SCALE MURALS',
          description: 'Transforming civic spaces, commercial buildings, and urban corridors with high-impact outdoor murals.',
          deliverables: [
            'Facade design & color consultation',
            'Surface prep, lift operations & site safety',
            'Weather-resistant exterior paint systems',
            'Community workshops & public engagement'
          ]
        },
        {
          id: 'web-development',
          title: 'WEB DEVELOPMENT',
          description: 'Custom React and TypeScript web applications engineered for speed, beauty, and performance.',
          deliverables: [
            'Custom responsive layouts & mobile design',
            'High-contrast editorial typography & design systems',
            'Full-stack Express API integrations & database architecture',
            'Performance optimization & sub-second loads'
          ]
        },
        {
          id: 'gallery-commissions',
          title: 'GALLERY COMMISSIONS',
          description: 'Bespoke studio fine art on wood panel, paper, and canvas for collectors, galleries, and corporate art programs.',
          deliverables: [
            'Original gouache, ink & tea stain studio works',
            'Custom carved wood panel installations',
            'Limited edition print & flag releases',
            'Archival framing & gallery documentation'
          ]
        },
        {
          id: 'creative-direction',
          title: 'CREATIVE DIRECTION',
          description: 'Cohesive spatial art direction, restaurant identity design, and visual brand systems.',
          deliverables: [
            'Spatial & interior artwork strategy',
            'Brand identity & typographic guidelines',
            'Custom iconography & architectural accents',
            'Collaborative project curation'
          ]
        }
      ]
    },
    // About
    about: {
      tag: 'ABOUT ME',
      headline: 'DESIGN & CODE IS SOLVING PROBLEMS WITH EMPATHY AND CREATIVITY.',
      fullBio: "Pedro Barrios is a Venezuelan-born artist and developer known for his vibrant street art, large-scale public murals, gallery exhibitions, and modern web applications. Co-founder of 'The Worst Crew' alongside Jaime Molina, Pedro combines geometric abstraction, coastal color palettes, and cutting-edge web technologies to build memorable physical and digital experiences.",
      subtitle: 'PEDRO BARRIOS — WEB DEVELOPER & DESIGNER',
      capabilities: 'CORE CAPABILITIES',
      skills: [
        { name: "LARGE-SCALE MURALS", level: 98 },
        { name: "WEB DEVELOPMENT (REACT/TS)", level: 92 },
        { name: "FINE ART & WOOD SCULPTURE", level: 95 },
        { name: "CREATIVE DIRECTION & UI", level: 90 }
      ],
      downloadResume: 'DOWNLOAD RESUME / CV'
    },
    // Experience
    experience: {
      tag: 'CAREER & HISTORY',
      title: 'TIMELINE & MILESTONES',
      partnersTitle: 'CLIENTS & CULTURAL PARTNERS',
      items: [
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
      ]
    },
    // Certifications
    certifications: {
      tag: 'CREDENTIALS & KNOWLEDGE',
      title: 'CERTIFICATIONS',
      subtitle: 'Continuous learning, specialization, and verified mastery across Computer Science, AI, Digital Marketing, Cybersecurity, and Data Systems.',
      searchPlaceholder: 'Search certifications, topics, or institutions...',
      all: 'ALL',
      csDev: 'CS & TECH',
      aiData: 'AI & DATA',
      marketingAds: 'MARKETING & ADS',
      seoAnalytics: 'SEO & ANALYTICS',
      businessSecurity: 'SECURITY & BIZ',
      showMore: 'SHOW ALL CERTIFICATIONS',
      showLess: 'SHOW FEWER',
      totalCount: 'VERIFIED CREDENTIALS'
    },
    // Footer
    footer: {
      desc: 'Senior Web Developer & UI/UX Designer specializing in modern React applications, e-commerce, and high-performance digital experiences.',
      getInTouch: 'GET IN TOUCH',
      followConnect: 'FOLLOW & CONNECT',
      rights: 'ALL RIGHTS RESERVED.',
      backToTop: 'BACK TO TOP'
    },
    // Project Modal
    projectModal: {
      caseStudy: 'CASE STUDY',
      overview: 'PROJECT OVERVIEW',
      concept: 'CONCEPT & BACKGROUND',
      year: 'YEAR',
      location: 'LOCATION',
      client: 'CLIENT / PARTNER',
      medium: 'MEDIUM & MATERIALS',
      dimensions: 'DIMENSIONS / SCALE',
      specs: 'PROJECT SPECIFICATIONS',
      format: 'FORMAT / SCALE',
      inquire: 'INQUIRE ABOUT THIS PROJECT',
      launch: 'LAUNCH PROJECT / VIEW LIVE',
      close: 'CLOSE'
    },
    // Contact Modal
    contactModal: {
      title: 'START A PROJECT',
      subtitle: "Let's build something exceptional together.",
      stepCategory: '1. PROJECT CATEGORY',
      categories: {
        murals: 'MURAL / PUBLIC ART',
        web: 'WEB APP / WEBSITE',
        gallery: 'FINE ART COMMISSION',
        branding: 'CREATIVE DIRECTION'
      },
      nameLabel: 'YOUR NAME *',
      namePlaceholder: 'e.g. Alex Rivera',
      emailLabel: 'EMAIL ADDRESS *',
      emailPlaceholder: 'alex@company.com',
      companyLabel: 'COMPANY / AGENCY',
      companyPlaceholder: 'e.g. Acme Inc. / Personal',
      budgetLabel: 'ESTIMATED BUDGET RANGE',
      messageLabel: 'PROJECT SCOPE & GOALS *',
      messagePlaceholder: 'Describe your web product requirements, tech stack preference, target timeline, or project goals...',
      submit: 'SEND INQUIRY',
      submitting: 'SENDING INQUIRY...',
      successTitle: 'INQUIRY RECEIVED!',
      successMessage: 'Pedro Barrios will review your project requirements and respond within 24 hours.',
      returnButton: 'RETURN TO PORTFOLIO'
    },
    // Resume Modal
    resumeModal: {
      title: 'RESUME / CV',
      downloadPdf: 'DOWNLOAD PDF RESUME',
      summaryTitle: 'PROFESSIONAL SUMMARY',
      experienceTitle: 'WORK EXPERIENCE',
      skillsTitle: 'TECHNICAL PROFICIENCY & SKILLS',
      skillsCategories: {
        frontend: 'FRONTEND ENGINEERING',
        frontendDesc: 'React, TypeScript, Next.js, Vite, Tailwind CSS, Framer Motion, HTML5/CSS3.',
        design: 'UI/UX & PRODUCT DESIGN',
        designDesc: 'Figma, Design Systems, Wireframing, Responsive Design, Accessibility (WCAG).',
        backend: 'BACKEND & INTEGRATIONS',
        backendDesc: 'Node.js, Express, REST APIs, GraphQL, PostgreSQL, WebSockets, Shopify API.',
        workflow: 'DEVELOPMENT & WORKFLOW',
        workflowDesc: 'Git, GitHub, CI/CD, Storybook, Jest, Web Performance & SEO Optimization.'
      },
      footerNote: 'PEDRO BARRIOS • OFFICIAL WEB DEVELOPER RESUME 2026'
    },
    // Projects data translations
    projects: [
      {
        id: "smile-sanctuary",
        title: "SMILE SANCTUARY",
        categoryLabel: "HEALTH & DENTAL",
        description: "Dental clinic offering comprehensive dental care and aesthetic dentistry services.",
        story: "Development of an intuitive web platform with appointment booking, aesthetic treatment catalog, and responsive design optimized for patient conversion.",
        medium: "React, Web Application, UI/UX, SEO"
      },
      {
        id: "marketing-innovations",
        title: "MARKETING INNOVATIONS",
        categoryLabel: "DIGITAL MARKETING",
        description: "Digital marketing agency focused on ROI optimization and accelerated client growth.",
        story: "Web design and architecture oriented towards B2B lead conversion, advanced campaign analytics, and presentation of digital marketing services.",
        medium: "Full-Stack Web Development, Performance Marketing"
      },
      {
        id: "debt-relief-help",
        title: "DEBT RELIEF HELP",
        categoryLabel: "FINANCIAL SERVICES",
        description: "Debt negotiation and relief services for credit cards, personal loans, collections, and corporate debt.",
        story: "Financial advisory platform featuring an interactive debt reduction calculator, real-time eligibility evaluation forms, and secure architecture.",
        medium: "Web Platform, Interactive Forms, Security Protocols"
      },
      {
        id: "neotropic-foundation",
        title: "NEOTROPIC FOUNDATION",
        categoryLabel: "NON-PROFIT & NGO",
        description: "Environmental and conservation foundation focused on the protection of neotropical biodiversity.",
        story: "Institutional website with donation gateway, multimedia showcase of reforestation projects, and wildlife conservation initiatives.",
        medium: "CMS Development, Responsive Web Design, Media Integration"
      },
      {
        id: "axiom-financial",
        title: "AXIOM FINANCIAL",
        categoryLabel: "FINANCIAL SERVICES",
        description: "Corporate financial consulting and business expertise services.",
        story: "Elegantly crafted corporate platform designed to position strategic consulting services, wealth analysis, and business advisory.",
        medium: "Corporate UI/UX, Web Architecture, Performance Optimization"
      },
      {
        id: "explore-costa-rica",
        title: "EXPLORE COSTA RICA",
        categoryLabel: "TRAVEL & TOURISM",
        description: "Adventure, eco-tourism, and relocation concierge services in Costa Rica.",
        story: "Tourism and relocation advisory portal featuring adventure tour catalogs, Costa Rica lifestyle guides, and reservation booking engines.",
        medium: "Travel Portal, Interactive Booking Engine, SEO"
      },
      {
        id: "green-power-solar",
        title: "GREEN POWER SOLAR SYSTEMS",
        categoryLabel: "RENEWABLE ENERGY",
        description: "Solar power systems and green energy solutions for residential and industrial applications.",
        story: "Dynamic website featuring an interactive solar savings estimator, photovoltaic panel catalog, and automated lead quote generation.",
        medium: "Web Application, Solar Savings Calculator, Lead Gen"
      },
      {
        id: "webs-para-abogados",
        title: "WEBS PARA ABOGADOS",
        categoryLabel: "LEGAL SERVICES",
        description: "Web design and digital lead capture services for law firms in Spain and Panama.",
        story: "Specialized platform for legal digital solutions, integrating client acquisition, legal SEO positioning, and a clean professional aesthetic.",
        medium: "Legal Tech Web Design, SEO & Conversion Optimization"
      },
      {
        id: "vivienda-latina-usa",
        title: "VIVIENDA LATINA USA",
        categoryLabel: "REAL ESTATE",
        description: "Mortgage and real estate investment services focused on the Latino community.",
        story: "Tailored real estate portal with mortgage pre-qualification tools, investment property listings, and financial education resources.",
        medium: "Real Estate Portal, Mortgage Calculators, UI/UX"
      },
      {
        id: "medikos",
        title: "MEDIKOS",
        categoryLabel: "MEDICAL MARKETING",
        description: "Digital marketing agency specialized in medical practices and aesthetic clinics.",
        story: "Comprehensive digital growth solution for health professionals, optimizing medical landing pages and online reputation.",
        medium: "Healthcare Marketing Tech, Web Development"
      },
      {
        id: "sewage-treatment-cr",
        title: "SEWAGE TREATMENT CR",
        categoryLabel: "ENVIRONMENTAL SERVICES",
        description: "Compact and eco-friendly wastewater treatment plant systems with LZT technology for homes, businesses, and industries.",
        story: "Interactive industrial catalog for LZT water purification systems, technical specifications, and automated quote requests.",
        medium: "Industrial Web Catalog, Eco-Tech Platform"
      },
      {
        id: "mortgage-freedom",
        title: "MORTGAGE FREEDOM",
        categoryLabel: "FINANCIAL SERVICES",
        description: "Mortgage strategy planning and optimization services to reduce interest expense and optimize cash flow.",
        story: "Financial web application with amortization simulators, accelerated payoff strategies, and personalized advisory.",
        medium: "Fintech Application, Amortization Engine"
      },
      {
        id: "costa-rica-loan-experts",
        title: "COSTA RICA LOAN EXPERTS",
        categoryLabel: "LOANS & REAL ESTATE",
        description: "Private loans and asset-backed real estate investment opportunities in Costa Rica.",
        story: "Private financing portal featuring property-backed loan application tools and an investor dashboard.",
        medium: "Fintech Portal, Private Equity Web System"
      },
      {
        id: "700-club",
        title: "700 CLUB",
        categoryLabel: "CREDIT SERVICES",
        description: "Credit repair and credit building services including credit analysis, disputes, and identity theft restoration.",
        story: "Credit restoration platform with dispute tracking, credit report analysis, and digital identity integration.",
        medium: "Fintech Portal, Secure Client Portal"
      }
    ]
  },
  es: {
    // Header
    nav: {
      work: 'TRABAJOS',
      services: 'SERVICIOS',
      about: 'SOBRE MÍ',
      experience: 'EXPERIENCIA',
      certifications: 'CERTIFICACIONES',
      contact: 'CONTACTO',
      talk: 'HABLEMOS',
      roleBadge: 'DESARROLLADOR WEB'
    },
    // Hero
    hero: {
      badge: 'ARTISTA, MURALISTA Y DESARROLLADOR WEB CREATIVO',
      headlinePart1: 'UNIENDO ARTE FÍSICO',
      headlinePart2: 'Y CÓDIGO DIGITAL',
      headlineSub: 'PARA MARCAS Y ESPACIOS AUDACES',
      bio: 'Artista y desarrollador que crea murales a gran escala, arte fino y experiencias web digitales de alto rendimiento.',
      viewWork: 'VER TRABAJOS DESTACADOS',
      exploreServices: 'EXPLORAR SERVICIOS',
      availability: 'DISPONIBLE PARA MURALES, ENCARGOS DE GALERÍA Y PROYECTOS WEB',
      stats: [
        { value: "12+", label: "AÑOS DE EXPERIENCIA CREATIVA" },
        { value: "40+", label: "MURALES PÚBLICOS COMPLETADOS" },
        { value: "80+", label: "PROYECTOS DE ARTE Y DIGITALES" },
        { value: "12", label: "PREMIOS DE ARTE PÚBLICO" }
      ]
    },
    // Selected Work
    work: {
      tag: 'PROYECTOS DESTACADOS',
      title: 'PORTAFOLIO',
      startProject: 'INICIAR PROYECTO',
      searchPlaceholder: 'Buscar proyectos por nombre, dominio o tecnología...',
      noResultsTitle: 'No se encontraron proyectos',
      noResultsDesc: 'No pudimos encontrar ningún proyecto que coincida con tus criterios. Intenta ajustar las palabras clave de búsqueda o restablecer los filtros de categoría.',
      noResultsMatching: 'Sin resultados para',
      clearSearch: 'RESTABLECER FILTROS',
      showMore: 'MOSTRAR MÁS PROYECTOS',
      showLess: 'MOSTRAR MENOS',
      viewAllSeparateSite: 'VER TODOS EN SITIO SEPARADO',
      viewAllSeparateSiteShort: 'SITIO DE PROYECTOS',
      openSeparateWindow: 'Abrir en nueva pestaña',
      featuredCarouselTag: 'DESLIZA O REPRODUCE',
      autoplayActive: 'Reproducción Automática Activa',
      autoplayPaused: 'Reproducción en Pausa',
      viewCaseStudy: 'VER DETALLES DEL PROYECTO',
      tabs: {
        all: 'TODOS LOS PROYECTOS',
        financial: 'FINANCIERO Y LEGAL',
        health: 'SALUD Y MEDICINA',
        marketing: 'MARKETING DIGITAL',
        'realestate-environment': 'BIENES RAÍCES Y AMBIENTAL'
      }
    },
    allProjectsPage: {
      tag: 'ARCHIVO COMPLETO DE PORTAFOLIO',
      title: 'REPOSITORIO DE PROYECTOS',
      subtitle: 'Explora el cuerpo completo de aplicaciones web a medida, sistemas digitales, murales públicos y diseño de marca.',
      backHome: 'VOLVER AL SITIO PRINCIPAL',
      openNewTab: 'ABRIR EN PESTAÑA INDEPENDIENTE',
      totalCount: 'TOTAL DE PROYECTOS',
      filterAll: 'TODOS',
      sortBy: 'ORDENAR POR',
      sortLatest: 'MÁS RECIENTES',
      sortOldest: 'MÁS ANTIGUOS',
      sortAlpha: 'TÍTULO (A-Z)',
      viewLiveSite: 'VISITAR SITIO EN VIVO',
      quickView: 'VISTA RÁPIDA',
      techStack: 'TECNOLOGÍAS USADAS',
      category: 'CATEGORÍA',
      year: 'AÑO'
    },
    // Services
    services: {
      leftTag: 'LO QUE OFREZCO',
      leftTitle: 'SERVICIOS CREATIVOS Y DESARROLLO WEB',
      leftDesc: 'Elevando espacios físicos y productos digitales con arte geométrico expresivo, aplicaciones web modernas y dirección visual estratégica.',
      requestQuote: 'SOLICITAR COTIZACIÓN',
      items: [
        {
          id: 'large-scale-murals',
          title: 'MURALES A GRAN ESCALA',
          description: 'Transformando espacios cívicos, edificios comerciales y corredores urbanos con murales al aire libre de gran impacto.',
          deliverables: [
            'Diseño de fachada y consultoría de color',
            'Preparación de superficie, grúas y seguridad en sitio',
            'Sistemas de pintura exterior resistentes al clima',
            'Talleres comunitarios y participación pública'
          ]
        },
        {
          id: 'web-development',
          title: 'DESARROLLO WEB',
          description: 'Aplicaciones web personalizadas en React y TypeScript diseñadas para velocidad, belleza y alto rendimiento.',
          deliverables: [
            'Diseño responsivo y experiencia móvil personalizada',
            'Tipografía editorial de alto contraste y sistemas de diseño',
            'Integraciones API Full-stack Express y arquitectura de BD',
            'Optimización de rendimiento y cargas de subsegundo'
          ]
        },
        {
          id: 'gallery-commissions',
          title: 'ENCARGOS DE GALERÍA',
          description: 'Arte fino de estudio a medida en paneles de madera, papel y lienzo para coleccionistas, galerías y programas corporativos.',
          deliverables: [
            'Obras de estudio originales en gouache, tinta y manchas de té',
            'Instalaciones de paneles de madera tallados a mano',
            'Ediciones limitadas de grabados y banderas',
            'Enmarcado de archivo y documentación de galería'
          ]
        },
        {
          id: 'creative-direction',
          title: 'DIRECCIÓN CREATIVA',
          description: 'Dirección de arte espacial cohesiva, diseño de identidad para restaurantes y sistemas de marca visual.',
          deliverables: [
            'Estrategia de obras de arte espaciales e interiores',
            'Identidad de marca y guías tipográficas',
            'Iconografía personalizada y acentos arquitectónicos',
            'Curaduría colaborativa de proyectos'
          ]
        }
      ]
    },
    // About
    about: {
      tag: 'SOBRE MÍ',
      headline: 'EL DISEÑO Y EL CÓDIGO ES RESOLVER PROBLEMAS CON EMPATÍA Y CREATIVIDAD.',
      fullBio: "Pedro Barrios es un artista y desarrollador de origen venezolano conocido por su vibrante arte urbano, murales públicos a gran escala, exposiciones en galerías y aplicaciones web modernas. Co-fundador de 'The Worst Crew' junto a Jaime Molina, Pedro combina la abstracción geométrica, paletas de colores costeros y tecnologías web de vanguardia para crear experiencias físicas y digitales memorables.",
      subtitle: 'PEDRO BARRIOS — DESARROLLADOR WEB Y DISEÑADOR',
      capabilities: 'CAPACIDADES PRINCIPALES',
      skills: [
        { name: "MURALES A GRAN ESCALA", level: 98 },
        { name: "DESARROLLO WEB (REACT/TS)", level: 92 },
        { name: "ARTE FINO Y ESCULTURA EN MADERA", level: 95 },
        { name: "DIRECCIÓN CREATIVA Y UI", level: 90 }
      ],
      downloadResume: 'DESCARGAR CURRÍCULUM / CV'
    },
    // Experience
    experience: {
      tag: 'CARRERA HISTÓRICA',
      title: 'TRAYECTORIA Y LOGROS',
      partnersTitle: 'CLIENTES Y SOCIOS CULTURALES',
      items: [
        {
          id: "origami-seo",
          period: "AGO 2025 – PRESENTE",
          role: "Especialista en SEO y Contenido Web",
          organization: "Origami Solutions",
          location: "Presencial",
          description: "Trabajé como Especialista en SEO y Contenido Web apoyando múltiples cuentas de clientes en diversas industrias. Mi trabajo se centró en mantener y actualizar sitios web de clientes, crear contenido alineado con las mejores prácticas de SEO y preparar informes de rendimiento con métricas clave.",
          highlights: [
            "Mantenimiento de sitios web, actualización de contenido, mejoras SEO on-page y revisiones técnicas para optimizar visibilidad y usabilidad.",
            "Creación de contenido orientado a SEO para páginas de destino, entradas de blog y descripciones de productos guiado por palabras clave.",
            "Elaboración de informes de análisis SEO, resúmenes de seguimiento de keywords y auditorías de competidores para orientar decisiones.",
            "Soporte en campañas de Google Ads revisando el rendimiento de landing pages, analítica básica y optimización de contenidos."
          ]
        },
        {
          id: "freelance-dev",
          period: "2023 – PRESENTE",
          role: "Desarrollador Web Freelance",
          organization: "Freelance",
          location: "Remoto",
          description: "Como desarrollador independiente Web y Android, construyo aplicaciones rápidas, confiables y enfocadas en el usuario para pequeñas empresas, startups y clientes particulares. Colaboro con fundadores, diseñadores y partes interesadas para traducir ideas en productos digitales bien estructurados.",
          highlights: [
            "Desarrollo de aplicaciones web y Android adaptadas para pequeñas empresas y clientes particulares",
            "Colaboración directa con fundadores para estructurar y materializar productos digitales",
            "Entrega de código optimizado, accesible y con soporte técnico continuo"
          ]
        },
        {
          id: "aimhii-dev",
          period: "2023",
          role: "Desarrollador",
          organization: "AIMHII",
          location: "Híbrido / Remoto",
          description: "En AIMHII, ayudé a construir y refinar productos digitales enfocados en ofrecer interfaces limpias y experiencias de usuario fluidas. Colaboré con equipos multidisciplinarios para aclarar requisitos, planificar lanzamientos de funciones y garantizar la calidad.",
          highlights: [
            "Colaboración con equipos multidisciplinarios para coordinar y ejecutar lanzamientos de funciones",
            "Ingeniería de componentes UI intuitivos enfocados en brindar experiencias de usuario fluidas",
            "Mantenimiento de estándares de calidad de código y entregas ágiles"
          ]
        },
        {
          id: "professor-udo",
          period: "2020 – 2022",
          role: "Profesor Universitario — TI",
          organization: "Universidad de Oriente",
          location: "Venezuela",
          description: "Profesor a tiempo completo impartiendo desarrollo, redes y fundamentos técnicos. Diseñé laboratorios prácticos y presenté ejemplos del mundo real.",
          highlights: [
            "Docencia en desarrollo de software, redes informáticas y fundamentos tecnológicos",
            "Diseño de asignaciones prácticas de laboratorio y planes de estudio técnicos",
            "Mentoría a estudiantes en prácticas de ingeniería, resolución de problemas y soluciones reales"
          ]
        },
        {
          id: "english-prof-bsl",
          period: "2014 – 2019",
          role: "Profesor de Inglés",
          organization: "British School of Languages",
          location: "Presencial",
          description: "Enseñé inglés a estudiantes de todos los niveles, diseñé planes de estudio y monitoreé el progreso de los alumnos con evaluaciones estructuradas.",
          highlights: [
            "Instrucción integral del idioma inglés para alumnos de diferentes niveles de dominio",
            "Desarrollo de currículos educativos estructurados, unidades didácticas y herramientas interactivas",
            "Seguimiento individualizado del progreso del estudiante y evaluación de la adquisición del idioma"
          ]
        },
        {
          id: "english-teacher-nie",
          period: "2012 – 2014",
          role: "Profesor de Inglés",
          organization: "National Institute of English",
          location: "Presencial",
          description: "Impartí instrucción grupal e individual (1:1), mejoré la planificación de lecciones y apoyé a los estudiantes en el uso práctico del idioma.",
          highlights: [
            "Impartición de clases grupales y sesiones de tutoría individualizadas",
            "Creación de planes de lección prácticos adaptados a la comunicación cotidiana",
            "Orientación a los estudiantes para generar confianza y aplicar con fluidez el idioma"
          ]
        },
        {
          id: "radio-producer",
          period: "2009 – 2010",
          role: "Productor de Radio",
          organization: "Oceanica Radio Station",
          location: "Presencial",
          description: "Producía segmentos, coordinaba la programación y apoyaba las operaciones de transmisión en vivo.",
          highlights: [
            "Producción de segmentos radiales y coordinación de la programación diaria de la emisora",
            "Gestión de operaciones de transmisión de audio en vivo, mezcla y consolas de sonido",
            "Soporte en flujos de trabajo técnicos de audio y logística de entrevistas"
          ]
        },
        {
          id: "content-writer-gobo",
          period: "2008 – 2009",
          role: "Redactor de Contenido y Asistente de Marketing",
          organization: "Gobo Latino",
          location: "Presencial",
          description: "Escribí contenido y apoyé iniciativas de marketing con flujos de trabajo de investigación y publicación.",
          highlights: [
            "Redacción de contenido digital, artículos de marketing y textos publicitarios",
            "Investigación de mercado y análisis de tendencias de audiencia para campañas de alcance",
            "Soporte en calendarios de publicación y distribución de contenidos digitales"
          ]
        },
        {
          id: "lab-manager-udo",
          period: "2008 – 2009",
          role: "Encargado del Laboratorio de Computación",
          organization: "Universidad de Oriente",
          location: "Venezuela",
          description: "Mantuve los sistemas del laboratorio, gestioné el acceso y brindé soporte técnico a estudiantes y profesores.",
          highlights: [
            "Gestión de sistemas del laboratorio de computación, despliegue de SO y mantenimiento de hardware",
            "Asistencia técnica directa a profesores universitarios, investigadores y estudiantes",
            "Supervisión del acceso a estaciones de trabajo en red, credenciales de usuario y seguridad"
          ]
        },
        {
          id: "it-technician-udo",
          period: "2008 – 2009",
          role: "Técnico de TI",
          organization: "Universidad de Oriente",
          location: "Venezuela",
          description: "Brindé soporte técnico en todos los sistemas universitarios, incluyendo solución de problemas de hardware y redes.",
          highlights: [
            "Soporte de TI en departamentos universitarios, oficinas y centros de cómputo",
            "Diagnóstico de fallos de hardware, errores de conectividad de red y software de sistema",
            "Mantenimiento de inventarios de hardware, cableado de red y actualización de equipos"
          ]
        },
        {
          id: "tech-support-oceanica",
          period: "2007 – 2008",
          role: "Soporte Técnico",
          organization: "Oceanica Radio Station",
          location: "Presencial",
          description: "Instalé consolas DMX, capacité al personal en equipos de transmisión y apoyé flujos de trabajo de audio en vivo.",
          highlights: [
            "Instalación y calibración de consolas de control de audio DMX y hardware de estudio",
            "Capacitación a locutores, técnicos y personal en equipos de transmisión en directo",
            "Resolución de problemas de enrutamiento de audio en tiempo real y mantenimiento de equipos"
          ]
        },
        {
          id: "network-tech-intersound",
          period: "2006 – 2007",
          role: "Técnico de Redes",
          organization: "Intersound Global Trading",
          location: "Venezuela",
          description: "Apoyé la instalación y configuración de sistemas de red para la infraestructura de sonido del Estadio Monumental.",
          highlights: [
            "Asistencia en la configuración del hardware de red para el sistema de sonido del Estadio Monumental",
            "Instalación de cables de red, enrutadores y nodos de transmisión de audio de alta capacidad",
            "Pruebas de diagnóstico de red para garantizar la distribución de señal durante eventos"
          ]
        }
      ]
    },
    // Certifications
    certifications: {
      tag: 'CREDENCIALES Y CONOCIMIENTO',
      title: 'CERTIFICACIONES',
      subtitle: 'Aprendizaje continuo, especialización y dominio verificado en Ciencias de la Computación, IA, Marketing Digital, Ciberseguridad y Sistemas de Datos.',
      searchPlaceholder: 'Buscar certificaciones, temas o instituciones...',
      all: 'TODAS',
      csDev: 'CS Y TECNOLOGÍA',
      aiData: 'IA Y DATOS',
      marketingAds: 'MARKETING Y PUBLICIDAD',
      seoAnalytics: 'SEO Y ANALÍTICA',
      businessSecurity: 'SEGURIDAD Y NEGOCIOS',
      showMore: 'MOSTRAR TODAS LAS CERTIFICACIONES',
      showLess: 'MOSTRAR MENOS',
      totalCount: 'CREDENCIALES VERIFICADAS'
    },
    // Footer
    footer: {
      desc: 'Desarrollador Web Senior y Diseñador UI/UX especializado en aplicaciones React modernas, comercio electrónico y experiencias digitales de alto rendimiento.',
      getInTouch: 'CONTACTO',
      followConnect: 'SÍGUEME Y CONECTA',
      rights: 'TODOS LOS DERECHOS RESERVADOS.',
      backToTop: 'VOLVER ARRIBA'
    },
    // Project Modal
    projectModal: {
      caseStudy: 'ESTUDIO DE CASO',
      overview: 'RESUMEN DEL PROYECTO',
      concept: 'CONCEPTO Y ANTECEDENTES',
      year: 'AÑO',
      location: 'UBICACIÓN',
      client: 'CLIENTE / SOCIO',
      medium: 'TÉCNICA Y MATERIALES',
      dimensions: 'DIMENSIONES / ESCALA',
      specs: 'ESPECIFICACIONES DEL PROYECTO',
      format: 'FORMATO / ESCALA',
      inquire: 'CONSULTAR SOBRE ESTE PROYECTO',
      launch: 'VER PROYECTO / EN VIVO',
      close: 'CERRAR'
    },
    // Contact Modal
    contactModal: {
      title: 'INICIAR UN PROYECTO',
      subtitle: "Construyamos algo excepcional juntos.",
      stepCategory: '1. CATEGORÍA DEL PROYECTO',
      categories: {
        murals: 'MURAL / ARTE PÚBLICO',
        web: 'APP WEB / SITIO WEB',
        gallery: 'ENCARGO DE ARTE FINO',
        branding: 'DIRECCIÓN CREATIVA'
      },
      nameLabel: 'TU NOMBRE *',
      namePlaceholder: 'ej. Alex Rivera',
      emailLabel: 'CORREO ELECTRÓNICO *',
      emailPlaceholder: 'alex@empresa.com',
      companyLabel: 'EMPRESA / AGENCIA',
      companyPlaceholder: 'ej. Acme Inc. / Personal',
      budgetLabel: 'PRESUPUESTO ESTIMADO',
      messageLabel: 'ALCANCE Y OBJETIVOS DEL PROYECTO *',
      messagePlaceholder: 'Describe los requerimientos de tu producto web, tecnología preferida, tiempos u objetivos del proyecto...',
      submit: 'ENVIAR CONSULTA',
      submitting: 'ENVIANDO CONSULTA...',
      successTitle: '¡CONSULTA RECIBIDA!',
      successMessage: 'Pedro Barrios revisará los requerimientos de tu proyecto y responderá en menos de 24 horas.',
      returnButton: 'VOLVER AL PORTAFOLIO'
    },
    // Resume Modal
    resumeModal: {
      title: 'CURRÍCULUM / CV',
      downloadPdf: 'DESCARGAR CV EN PDF',
      summaryTitle: 'RESUMEN PROFESIONAL',
      experienceTitle: 'EXPERIENCIA LABORAL',
      skillsTitle: 'HABILIDADES TÉCNICAS Y DOMINIO',
      skillsCategories: {
        frontend: 'INGENIERÍA FRONTEND',
        frontendDesc: 'React, TypeScript, Next.js, Vite, Tailwind CSS, Framer Motion, HTML5/CSS3.',
        design: 'DISEÑO UI/UX Y PRODUCTO',
        designDesc: 'Figma, Sistemas de Diseño, Wireframing, Diseño Responsivo, Accesibilidad (WCAG).',
        backend: 'BACKEND E INTEGRACIONES',
        backendDesc: 'Node.js, Express, REST APIs, GraphQL, PostgreSQL, WebSockets, Shopify API.',
        workflow: 'FLUJO DE TRABAJO Y DESARROLLO',
        workflowDesc: 'Git, GitHub, CI/CD, Storybook, Jest, Optimización SEO y Rendimiento Web.'
      },
      footerNote: 'PEDRO BARRIOS • CURRÍCULUM OFICIAL DE DESARROLLADOR WEB 2026'
    },
    // Projects data translations
    projects: [
      {
        id: "smile-sanctuary",
        title: "SMILE SANCTUARY",
        categoryLabel: "SALUD & ODONTOLOGÍA",
        description: "Clínica dental que ofrece atención dental integral y servicios de odontología estética.",
        story: "Desarrollo de plataforma web intuitiva con reserva de citas, catálogo de tratamientos estéticos y diseño responsive optimizado para conversión de pacientes.",
        medium: "React, Aplicación Web, UI/UX, SEO"
      },
      {
        id: "marketing-innovations",
        title: "MARKETING INNOVATIONS",
        categoryLabel: "MARKETING DIGITAL",
        description: "Agencia de marketing digital enfocada en optimización de ROI y crecimiento acelerado.",
        story: "Diseño y arquitectura web orientada a la conversión de leads B2B, analítica avanzada de campañas y presentación de servicios de marketing digital.",
        medium: "Desarrollo Web Full-Stack, Marketing de Rendimiento"
      },
      {
        id: "debt-relief-help",
        title: "DEBT RELIEF HELP",
        categoryLabel: "SERVICIOS FINANCIEROS",
        description: "Servicios de negociación y alivio de deudas para tarjetas de crédito, préstamos personales, cobros y deudas empresariales.",
        story: "Plataforma de asesoría financiera con calculadora interactiva de reducción de deudas, formularios de evaluación de elegibilidad en tiempo real y arquitectura segura.",
        medium: "Plataforma Web, Formularios Interactivos, Protocolos de Seguridad"
      },
      {
        id: "neotropic-foundation",
        title: "NEOTROPIC FOUNDATION",
        categoryLabel: "SIN FINES DE LUCRO",
        description: "Fundación ambiental y de conservación enfocada en la preservación de biodiversidad neotropical.",
        story: "Sitio web institucional con pasarela de donaciones, exhibición multimedia de proyectos de reforestación y conservación de fauna silvestre.",
        medium: "Desarrollo CMS, Diseño Web Responsive, Integración Multimedia"
      },
      {
        id: "axiom-financial",
        title: "AXIOM FINANCIAL",
        categoryLabel: "SERVICIOS FINANCIEROS",
        description: "Consultoría financiera corporativa y servicios de experiencia empresarial.",
        story: "Plataforma corporativa elegante diseñada para posicionar servicios de consultoría estratégica, análisis patrimonial y asesoría financiera empresarial.",
        medium: "UI/UX Corporativo, Arquitectura Web, Optimización de Rendimiento"
      },
      {
        id: "explore-costa-rica",
        title: "EXPLORE COSTA RICA",
        categoryLabel: "VIAJES Y TURISMO",
        description: "Servicios de aventura, turismo ecológico y reubicación en Costa Rica.",
        story: "Portal turístico y de consejería en relocalización con catálogos de tours de aventura, guías de estilo de vida en Costa Rica y formularios de reserva.",
        medium: "Portal Turístico, Motor de Reservas Interactivo, SEO"
      },
      {
        id: "green-power-solar",
        title: "GREEN POWER SOLAR SYSTEMS",
        categoryLabel: "ENERGÍA RENOVABLE",
        description: "Sistemas de energía solar y soluciones de energía verde residenciales e industriales.",
        story: "Sitio web dinámico con estimador interactivo de ahorro de energía solar, catálogo de paneles fotovoltaicos y generación de cotizaciones automatizadas.",
        medium: "Aplicación Web, Calculadora de Ahorro Solar, Generación de Leads"
      },
      {
        id: "webs-para-abogados",
        title: "WEBS PARA ABOGADOS",
        categoryLabel: "SERVICIOS LEGALES",
        description: "Servicios de diseño web y captación digital para bufetes de abogados en España y Panamá.",
        story: "Plataforma especializada en soluciones digitales para firmas legales, integrando captura de clientes, posicionamiento SEO jurídico y diseño sobrio y profesional.",
        medium: "Diseño Web Legal Tech, SEO y Optimización de Conversión"
      },
      {
        id: "vivienda-latina-usa",
        title: "VIVIENDA LATINA USA",
        categoryLabel: "BIENES RAÍCES",
        description: "Servicios de hipoteca e inversión inmobiliaria con enfoque en la comunidad latina.",
        story: "Portal inmobiliario adaptado con herramientas de precalificación hipotecaria, listados de propiedades de inversión y recursos educativos financieros.",
        medium: "Portal Inmobiliario, Calculadoras Hipotecarias, UI/UX"
      },
      {
        id: "medikos",
        title: "MEDIKOS",
        categoryLabel: "MARKETING MÉDICO",
        description: "Agencia de marketing digital especializada en prácticas médicas y clínicas estéticas.",
        story: "Solución integral de crecimiento digital para profesionales de la salud, optimizando páginas de captura médica y reputación online.",
        medium: "Tecnología de Marketing Médico, Desarrollo Web"
      },
      {
        id: "sewage-treatment-cr",
        title: "SEWAGE TREATMENT CR",
        categoryLabel: "SERVICIOS AMBIENTALES",
        description: "Sistemas compactos y ecológicos de tratamiento de aguas residuales con tecnología LZT para hogares, empresas e industrias.",
        story: "Catálogo industrial interactivo para sistemas de purificación de agua LZT, especificaciones técnicas y cotizaciones automatizadas.",
        medium: "Catálogo Web Industrial, Plataforma Eco-Tech"
      },
      {
        id: "mortgage-freedom",
        title: "MORTGAGE FREEDOM",
        categoryLabel: "SERVICIOS FINANCIEROS",
        description: "Servicios de planificación y optimización de estrategias hipotecarias para reducir gastos de intereses y optimizar flujo de caja.",
        story: "Aplicación web financiera con simuladores de amortización, estrategias de pago acelerado y consultoría personalizada.",
        medium: "Aplicación Fintech, Motor de Amortización"
      },
      {
        id: "costa-rica-loan-experts",
        title: "COSTA RICA LOAN EXPERTS",
        categoryLabel: "PRÉSTAMOS Y BIENES RAÍCES",
        description: "Préstamos privados y oportunidades de inversión inmobiliaria en Costa Rica respaldados por propiedades.",
        story: "Portal de financiamiento privado con herramientas de aplicación de préstamos con colateral hipotecario y panel de inversores.",
        medium: "Portal Fintech, Sistema Web de Capital Privado"
      },
      {
        id: "700-club",
        title: "700 CLUB",
        categoryLabel: "SERVICIOS DE CRÉDITO",
        description: "Servicios de reparación y construcción de crédito incluyendo análisis crediticio, disputas y restauración por robo de identidad.",
        story: "Plataforma de restauración crediticia con seguimiento de disputas, análisis de reporte de crédito e integración de identidad digital.",
        medium: "Portal Fintech, Portal Seguro de Clientes"
      }
    ]
  }
};
