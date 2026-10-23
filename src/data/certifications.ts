export type CertificationLanguage = 'pt' | 'en'

export type LocalizedText = Record<CertificationLanguage, string>

export type CertificationCategory = 'engineering' | 'development' | 'foundations'

export type CredentialVerification =
  | { type: 'direct'; url: string }
  | { type: 'manual'; portalUrl: string; code: string }

export type Certification = {
  id: string
  title: LocalizedText
  issuer: string
  completedAt: string
  duration?: LocalizedText
  category: CertificationCategory
  featured: boolean
  summary: LocalizedText
  topics: LocalizedText[]
  skills: LocalizedText[]
  verification?: CredentialVerification
}

const t = (pt: string, en: string): LocalizedText => ({ pt, en })

export const academicEducation = {
  id: 'systems-analysis-degree',
  degree: t('Tecnólogo em Análise e Desenvolvimento de Sistemas', 'Technology Degree in Systems Analysis and Development'),
  institution: 'Centro Universitário FAVIP Wyden',
  completionYear: 2024,
  status: 'completed' as const,
  summary: t(
    'Graduação voltada à análise, ao projeto e ao desenvolvimento de sistemas de informação, com formação em fundamentos de programação e tecnologia.',
    'A degree focused on analyzing, designing, and developing information systems, with a foundation in programming and technology.',
  ),
  // Intencionalmente sem PDF, URL ou código de validação do diploma.
}

export const ongoingEducation = [
  {
    id: 'java-bootcamp',
    title: t('Bootcamp de Desenvolvimento Java', 'Java Development Bootcamp'),
    status: 'in-progress' as const,
    summary: t(
      'Formação em Java em andamento. Os conteúdos concluídos e a certificação serão atualizados ao término do bootcamp.',
      'Java training in progress. Completed topics and certification details will be updated after the bootcamp ends.',
    ),
  },
]

export const certificationCategories: {
  id: CertificationCategory
  title: LocalizedText
}[] = [
  { id: 'engineering', title: t('Engenharia, Cloud e Sistemas', 'Engineering, Cloud and Systems') },
  { id: 'development', title: t('Programação e Desenvolvimento Web', 'Programming and Web Development') },
  { id: 'foundations', title: t('Suporte e Fundamentos de TI', 'IT Support and Foundations') },
]

// URLs individuais são as impressas nos certificados recebidos.
// Antes da publicação, revisar o destino de cada link no Vercel Preview.
// Códigos de documentos acadêmicos e de certificados que possam revelar
// informações pessoais adicionais não são armazenados neste arquivo.
export const certifications: Certification[] = [
  {
    id: 'software-engineering',
    title: t('Engenharia de Software', 'Software Engineering'),
    issuer: 'FIAP Nano Courses', completedAt: '2026-10-02', duration: t('100h', '100h'),
    category: 'engineering', featured: true,
    summary: t('Fundamentos de engenharia de requisitos, modelagem e qualidade de software.', 'Software requirements, modeling, and quality fundamentals.'),
    topics: [
      t('Ciclo de vida do software, levantamento de requisitos e documentação técnica.', 'Software lifecycle, requirements elicitation, and technical documentation.'),
      t('Modelagem com UML, projeto de sistemas e fundamentos de testes e qualidade.', 'UML modeling, systems design, and testing and quality fundamentals.'),
    ],
    skills: [t('Requisitos', 'Requirements'), t('UML', 'UML'), t('Qualidade de software', 'Software Quality')],
    verification: { type: 'manual', portalUrl: 'https://on.fiap.com.br/validar-certificado/', code: 'B9CDF1397D781EC643839B4066AA8E7A' },
  },
  {
    id: 'cloud-fundamentals',
    title: t('Cloud Fundamentals, Administration and Solution Architect', 'Cloud Fundamentals, Administration and Solution Architect'),
    issuer: 'FIAP Nano Courses', completedAt: '2026-10-14', duration: t('80h', '80h'),
    category: 'engineering', featured: true,
    summary: t('Conceitos de computação em nuvem, arquitetura de soluções, containers e práticas DevOps.', 'Cloud computing, solution architecture, containers, and DevOps concepts.'),
    topics: [
      t('Modelos de serviço e fundamentos de AWS, Azure e Google Cloud.', 'Service models and fundamentals of AWS, Azure, and Google Cloud.'),
      t('Virtualização, Docker, orquestração de containers e noções de DevSecOps.', 'Virtualization, Docker, container orchestration, and DevSecOps concepts.'),
    ],
    skills: [t('Cloud', 'Cloud'), t('Docker', 'Docker'), t('DevOps', 'DevOps')],
    verification: { type: 'manual', portalUrl: 'https://on.fiap.com.br/validar-certificado/', code: '2443839968A949AB6BCF8BBB102E335' },
  },
  {
    id: 'full-stack-bootcamp',
    title: t('The Complete Full-Stack Web Development Bootcamp', 'The Complete Full-Stack Web Development Bootcamp'),
    issuer: 'Udemy · Dr. Angela Yu', completedAt: '2023-07-13', duration: t('62h', '62h'),
    category: 'development', featured: true,
    summary: t('Introdução abrangente ao desenvolvimento de aplicações web de ponta a ponta.', 'Broad introduction to end-to-end web application development.'),
    topics: [
      t('Interfaces com HTML, CSS, JavaScript, Bootstrap e React.', 'Interfaces with HTML, CSS, JavaScript, Bootstrap, and React.'),
      t('Node.js, Express, APIs REST, persistência com SQL e autenticação.', 'Node.js, Express, REST APIs, SQL persistence, and authentication.'),
    ],
    skills: [t('React', 'React'), t('Node.js', 'Node.js'), t('Full-Stack', 'Full-Stack')],
    verification: { type: 'direct', url: 'https://ude.my/UC-b5ea098a-9449-4e40-b260-3988b8337ebf' },
  },
  {
    id: 'javascript-algorithms',
    title: t('Legacy JavaScript Algorithms and Data Structures V7', 'Legacy JavaScript Algorithms and Data Structures V7'),
    issuer: 'freeCodeCamp', completedAt: '2023-06-06', duration: t('aprox. 300h', 'approx. 300h'),
    category: 'development', featured: true,
    summary: t('Fundamentos de JavaScript aplicados a algoritmos, estruturas de dados e resolução de problemas.', 'JavaScript fundamentals applied to algorithms, data structures, and problem-solving.'),
    topics: [
      t('ES6+, programação orientada a objetos e programação funcional.', 'ES6+, object-oriented programming, and functional programming.'),
      t('Manipulação de dados, expressões regulares e desafios de lógica.', 'Data manipulation, regular expressions, and algorithmic challenges.'),
    ],
    skills: [t('JavaScript', 'JavaScript'), t('Algoritmos', 'Algorithms'), t('Estruturas de dados', 'Data Structures')],
    verification: { type: 'direct', url: 'https://www.freecodecamp.org/certification/fccac5a0970-ee73-49f0-8a09-47848bba1575/javascript-algorithms-and-data-structures' },
  },
  {
    id: 'scrum',
    title: t('SCRUM: Gerenciando Projetos de Software com Agilidade', 'SCRUM: Managing Software Projects with Agility'),
    issuer: 'IFRS · Aprenda Mais', completedAt: '2026-09-29', duration: t('40h', '40h'),
    category: 'engineering', featured: true,
    summary: t('Aplicação do Scrum ao planejamento, à execução e à melhoria contínua de projetos.', 'Using Scrum for planning, delivery, and continuous improvement of projects.'),
    topics: [
      t('Gestão ágil, criação de projetos e planejamento e estimativas.', 'Agile management, project setup, planning, and estimation.'),
      t('Implementação, revisão e retrospectiva no Scrum.', 'Implementation, review, and retrospective in Scrum.'),
    ],
    skills: [t('Scrum', 'Scrum'), t('Planejamento', 'Planning'), t('Agilidade', 'Agility')],
    // O portal do IFRS pode revelar CPF no certificado; validação pública pendente.
  },
  {
    id: 'information-architecture',
    title: t('Arquitetura da Informação e Projeto de Sistemas', 'Information Architecture and Systems Design'),
    issuer: 'UNICAMP · GGTE', completedAt: '2023-02-28', duration: t('40h', '40h'),
    category: 'engineering', featured: false,
    summary: t('Organização da informação e estruturação de sistemas voltadas à navegação e à experiência do usuário.', 'Information organization and systems structuring for navigation and user experience.'),
    topics: [
      t('Arquitetura da informação, organização de conteúdo e estrutura de navegação.', 'Information architecture, content organization, and navigation structures.'),
      t('Conceitos de projeto de sistemas e foco nas necessidades dos usuários.', 'Systems design concepts with attention to user needs.'),
    ],
    skills: [t('Arquitetura da informação', 'Information Architecture'), t('UX', 'UX'), t('Projeto de sistemas', 'Systems Design')],
    verification: { type: 'direct', url: 'https://moocs.ggte.unicamp.br/certificate/6Bco4JvM' },
  },
  {
    id: 'ux-ui-design',
    title: t('UX e UI Design', 'UX and UI Design'),
    issuer: 'TIM Tec', completedAt: '2023-02-28', duration: t('40h', '40h'),
    category: 'engineering', featured: true,
    summary: t('Princípios de experiência do usuário e construção de interfaces intuitivas.', 'User experience principles and the design of intuitive interfaces.'),
    topics: [
      t('Pesquisa de usuários e organização da experiência digital.', 'User research and organization of digital experiences.'),
      t('Fundamentos de prototipação, interface e usabilidade.', 'Fundamentals of prototyping, interfaces, and usability.'),
    ],
    skills: [t('UX', 'UX'), t('UI', 'UI'), t('Usabilidade', 'Usability')],
    // URL impressa no certificado ainda precisa de confirmação de disponibilidade.
  },
  {
    id: 'database-administration',
    title: t('Administrando Banco de Dados', 'Database Administration'),
    issuer: 'Fundação Bradesco · Escola Virtual', completedAt: '2022-11-25', duration: t('15h', '15h'),
    category: 'engineering', featured: false,
    summary: t('Fundamentos de organização, administração e manutenção de bancos de dados.', 'Fundamentals of database organization, administration, and maintenance.'),
    topics: [
      t('Conceitos de bancos de dados e sistemas gerenciadores de bancos de dados.', 'Database concepts and database management systems.'),
      t('Noções de administração de dados, estruturação e manutenção.', 'Data administration, organization, and maintenance concepts.'),
    ],
    skills: [t('Banco de dados', 'Databases'), t('SGBD', 'DBMS'), t('Administração', 'Administration')],
    verification: { type: 'manual', portalUrl: 'https://www.ev.org.br/validar-certificado', code: '5AC3659D-9EEB-4DF9-8544-F4C8ECADDC22' },
  },
  {
    id: 'bootstrap-4',
    title: t('Bootstrap 4 — Ultimate Guide', 'Bootstrap 4 — Ultimate Guide'),
    issuer: 'Udemy · Josh Werner', completedAt: '2023-03-01', duration: t('5,5h', '5.5h'),
    category: 'development', featured: false,
    summary: t('Criação de páginas responsivas com o framework Bootstrap 4.', 'Building responsive pages with the Bootstrap 4 framework.'),
    topics: [
      t('Sistema de grid, componentes e utilitários de estilização.', 'Grid system, components, and styling utilities.'),
      t('Organização de layouts responsivos para diferentes telas.', 'Responsive layouts for different screen sizes.'),
    ],
    skills: [t('Bootstrap', 'Bootstrap'), t('CSS', 'CSS'), t('Responsividade', 'Responsive Design')],
    verification: { type: 'direct', url: 'https://ude.my/UC-7d274931-8990-4f00-9c1c-becdd7cba155' },
  },
  {
    id: 'javascript-jquery',
    title: t('JavaScript & jQuery — Certification Course for Beginners', 'JavaScript & jQuery — Certification Course for Beginners'),
    issuer: 'Udemy · YouAccel Training', completedAt: '2024-02-24', duration: t('2,5h', '2.5h'),
    category: 'development', featured: false,
    summary: t('Introdução à interatividade web com JavaScript e jQuery.', 'Introduction to web interactivity with JavaScript and jQuery.'),
    topics: [
      t('Fundamentos de JavaScript e uso da biblioteca jQuery.', 'JavaScript fundamentals and use of the jQuery library.'),
      t('Manipulação de elementos da página e eventos.', 'Page element manipulation and events.'),
    ],
    skills: [t('JavaScript', 'JavaScript'), t('jQuery', 'jQuery'), t('DOM', 'DOM')],
    verification: { type: 'direct', url: 'https://ude.my/UC-0daa35f2-9c8d-4f96-b181-447e4d5731d1' },
  },
  {
    id: 'javascript-beginners',
    title: t('JavaScript for Beginners Complete Course', 'JavaScript for Beginners Complete Course'),
    issuer: 'Udemy · Proper Dot Institute', completedAt: '2023-02-27', duration: t('2h', '2h'),
    category: 'development', featured: false,
    summary: t('Introdução aos conceitos básicos de programação com JavaScript.', 'Introduction to basic programming concepts with JavaScript.'),
    topics: [
      t('Variáveis, tipos de dados, funções e estruturas condicionais.', 'Variables, data types, functions, and conditionals.'),
      t('Estruturas de repetição e noções de interatividade no navegador.', 'Loops and browser interactivity basics.'),
    ],
    skills: [t('JavaScript', 'JavaScript'), t('Lógica', 'Logic'), t('Fundamentos Web', 'Web Fundamentals')],
    verification: { type: 'direct', url: 'https://ude.my/UC-3bc518d9-e9b3-45fd-984d-31c195b97f06' },
  },
  {
    id: 'web-fundamentals',
    title: t('Internet and Web Development Fundamentals', 'Internet and Web Development Fundamentals'),
    issuer: 'Udemy · YouAccel Training', completedAt: '2023-03-01', duration: t('4h', '4h'),
    category: 'development', featured: false,
    summary: t('Introdução ao funcionamento da internet e aos fundamentos do desenvolvimento web.', 'Introduction to how the internet works and the fundamentals of web development.'),
    topics: [
      t('Fundamentos da internet, hospedagem e protocolos de comunicação.', 'Internet fundamentals, hosting, and communication protocols.'),
      t('Estrutura de páginas e introdução a HTML e CSS.', 'Page structure and introduction to HTML and CSS.'),
    ],
    skills: [t('Web', 'Web'), t('HTML', 'HTML'), t('CSS', 'CSS')],
    verification: { type: 'direct', url: 'https://ude.my/UC-bbbe9a92-f488-468f-93ca-590839b2685c' },
  },
  {
    id: 'programming-logic',
    title: t('Curso Completo de Lógica de Programação e Algoritmos', 'Complete Course in Programming Logic and Algorithms'),
    issuer: 'Udemy · Becode', completedAt: '2022-11-18', duration: t('2,5h', '2.5h'),
    category: 'development', featured: false,
    summary: t('Prática de raciocínio lógico e construção de algoritmos.', 'Practice in logical reasoning and algorithm construction.'),
    topics: [
      t('Variáveis, operadores, condições e estruturas de repetição.', 'Variables, operators, conditions, and loops.'),
      t('Fundamentos de elaboração de algoritmos para resolver problemas.', 'Fundamentals of designing algorithms to solve problems.'),
    ],
    skills: [t('Algoritmos', 'Algorithms'), t('Lógica', 'Logic'), t('Resolução de problemas', 'Problem Solving')],
    verification: { type: 'direct', url: 'https://ude.my/UC-b6b65ea1-922a-42b9-a82f-1b4bac25d0ca' },
  },
  {
    id: 'google-it-support',
    title: t('Fundamentos do Suporte Técnico', 'Technical Support Fundamentals'),
    issuer: 'Google · Coursera', completedAt: '2023-07-25',
    category: 'foundations', featured: true,
    summary: t('Fundamentos de suporte técnico e diagnóstico de problemas de hardware e software.', 'IT support and hardware and software troubleshooting fundamentals.'),
    topics: [
      t('Hardware, sistemas operacionais e noções de redes de computadores.', 'Hardware, operating systems, and computer networking basics.'),
      t('Atendimento ao usuário, instalação de software e resolução de problemas.', 'User support, software installation, and troubleshooting.'),
    ],
    skills: [t('Suporte de TI', 'IT Support'), t('Redes', 'Networking'), t('Diagnóstico', 'Troubleshooting')],
    verification: { type: 'direct', url: 'https://coursera.org/verify/YQW8JLRZ4KTS' },
  },
  {
    id: 'ict',
    title: t('Tecnologia da Informação e Comunicação', 'Information and Communication Technology'),
    issuer: 'SENAI PA', completedAt: '2021-03-20', duration: t('14h', '14h'),
    category: 'foundations', featured: false,
    summary: t('Introdução aos conceitos de tecnologias da informação e comunicação.', 'Introduction to information and communication technologies.'),
    topics: [
      t('Conceitos básicos de tecnologia e sistemas de informação.', 'Basic concepts of technology and information systems.'),
      t('Utilização de recursos digitais em contextos profissionais.', 'Use of digital resources in professional settings.'),
    ],
    skills: [t('TIC', 'ICT'), t('Tecnologia', 'Technology'), t('Fundamentos', 'Fundamentals')],
    // Código do SENAI mantido fora do código público até revisão da consulta.
  },
  {
    id: 'tech-english',
    title: t('Inglês para Área de Tecnologia — Suporte e Help Desk', 'English for Technology — IT Support and Help Desk'),
    issuer: 'Kultivi', completedAt: '2026-09-28', duration: t('4h36', '4h 36m'),
    category: 'foundations', featured: false,
    summary: t('Vocabulário técnico em inglês aplicado ao suporte e ao atendimento em TI.', 'Technical English vocabulary for IT support and help desk communication.'),
    topics: [
      t('Vocabulário de equipamentos, sistemas e chamados técnicos.', 'Vocabulary for equipment, systems, and support tickets.'),
      t('Comunicação com usuários em contextos de suporte e Help Desk.', 'User communication in IT support and help desk contexts.'),
    ],
    skills: [t('Inglês técnico', 'Technical English'), t('Help Desk', 'Help Desk'), t('Comunicação', 'Communication')],
    // Documento com código, mas sem portal público confirmado.
  },
  {
    id: 'systems-ethics',
    title: t('Ética no Desenvolvimento de Sistemas', 'Ethics in Systems Development'),
    issuer: 'Fundação Bradesco · Escola Virtual', completedAt: '2022-11-22', duration: t('8h', '8h'),
    category: 'foundations', featured: false,
    summary: t('Responsabilidade profissional e princípios éticos no desenvolvimento de sistemas.', 'Professional responsibility and ethical principles in systems development.'),
    topics: [
      t('Ética na atuação profissional e utilização responsável da tecnologia.', 'Professional ethics and responsible use of technology.'),
      t('Cuidados com informações e decisões no desenvolvimento de sistemas.', 'Considerations around information and decisions in systems development.'),
    ],
    skills: [t('Ética', 'Ethics'), t('Responsabilidade', 'Responsibility'), t('Tecnologia', 'Technology')],
    verification: { type: 'manual', portalUrl: 'https://www.ev.org.br/validar-certificado', code: '5A446054-52C0-4583-87CC-CB58E02713DC' },
  },
]
