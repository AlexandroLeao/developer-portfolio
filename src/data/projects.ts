
export type Language = 'pt' | 'en'

type TranslatedText = Record<Language, string>

export type Project = {
  id: string
  name: string
  nameTranslations?: TranslatedText
  year: number
  image: string
  imageSrcSet: string
  imageAlt: TranslatedText
  description: TranslatedText
  technologies: string[]
  stackFileCounts: Record<string, number>
  stackUsage: Record<string, TranslatedText>
  githubUrl: string
  liveUrl?: string
  details: {
    features: TranslatedText[]
    architecture: TranslatedText
    challenges: TranslatedText
    practices: TranslatedText
  }
}

export const projects: Project[] = [
  {
    id: 'adventure-files',
    name: 'Adventure Files',
    year: 2026,
    image: '/images/projects/adventure-files-1200.webp',
    imageSrcSet: [
      '/images/projects/adventure-files-640.webp 640w',
      '/images/projects/adventure-files-1200.webp 1200w',
      '/images/projects/adventure-files-1672.webp 1672w',
    ].join(', '),
    imageAlt: {
      pt: 'Ilustração do Adventure Files com uma interface de criação de personagens RPG, classes de aventureiros e cenário de fantasia.',
      en: 'Adventure Files illustration showing an RPG character creator, adventurer classes, and a fantasy landscape.',
    },
    description: {
      pt: 'Aplicação full-stack para criar, personalizar e salvar personagens de RPG, com autenticação, banco de dados e exportação de fichas em PNG.',
      en: 'Full-stack application for creating, customizing, and saving RPG characters, with authentication, database storage, and PNG character-sheet exports.',
    },
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
    ],
    stackFileCounts: {
      React: 18,
      TypeScript: 35,
      'Node.js': 7,
      Express: 4,
      PostgreSQL: 2,
      Supabase: 12,
    },
    stackUsage: {
      React: { pt: 'Interface e personalização dos personagens.', en: 'Character creation and customization interface.' },
      TypeScript: { pt: 'Tipos e segurança dos dados no front-end.', en: 'Types and data safety in the frontend.' },
      'Node.js': { pt: 'Serviços de back-end da aplicação.', en: 'Application backend services.' },
      Express: { pt: 'Rotas e endpoints da API REST.', en: 'REST API routes and endpoints.' },
      PostgreSQL: { pt: 'Armazenamento dos dados dos personagens.', en: 'Storage for character data.' },
      Supabase: { pt: 'Autenticação e controle de acesso.', en: 'Authentication and access control.' },
    },
    githubUrl: 'https://github.com/AlexandroLeao/rpg-character-creator',
    liveUrl: 'https://adventure-files-staging.vercel.app/',
    details: {
      features: [
        {
          pt: 'Cadastro, login, recuperação de senha e gerenciamento da conta.',
          en: 'Registration, sign-in, password recovery, and account management.',
        },
        {
          pt: 'Criação guiada em seis etapas, com oito classes e personalização de personagens.',
          en: 'Guided six-stage creator with eight character classes and customization options.',
        },
        {
          pt: 'Persistência, edição e exclusão de um personagem por conta.',
          en: 'Persistent storage, editing, and deletion of one character per account.',
        },
        {
          pt: 'Exportação de fichas de personagem em PNG nos formatos Story/Status e Portrait.',
          en: 'PNG character-sheet exports in Story/Status and Portrait formats.',
        },
      ],
      architecture: {
        pt: 'Front-end React e TypeScript, API REST com Node.js e Express, autenticação pelo Supabase Auth e armazenamento PostgreSQL com políticas de Row Level Security (RLS).',
        en: 'React and TypeScript frontend, Node.js and Express REST API, Supabase Auth, and PostgreSQL persistence with Row Level Security (RLS) policies.',
      },
      challenges: {
        pt: 'Integrar autenticação, autorização e persistência segura de dados por usuário a uma experiência de criação responsiva, bilíngue e inspirada em jogos retrô.',
        en: 'Integrating authentication, authorization, and secure user-scoped persistence into a responsive, bilingual character creator inspired by retro games.',
      },
      practices: {
        pt: 'Desenvolvimento com auxílio de IA, documentação técnica, testes automatizados de front-end, API e segurança do banco, controle de versão e integração contínua com GitHub Actions.',
        en: 'AI-assisted development with technical documentation, automated frontend, API, and database-security tests, version control, and continuous integration with GitHub Actions.',
      },
    },
  },
  {
    id: 'ideas-organizer',
    name: 'Ideas and Projects Organizer',
    nameTranslations: { pt: 'Ideas and Projects Organizer', en: 'Ideas and Projects Organizer' },
    year: 2026,
    image: '/images/projects/organizador-ideias-1200.webp',
    imageSrcSet: [
      '/images/projects/organizador-ideias-640.webp 640w',
      '/images/projects/organizador-ideias-1200.webp 1200w',
      '/images/projects/organizador-ideias-1672.webp 1672w',
    ].join(', '),
    imageAlt: {
      pt: 'Ilustração de um organizador de ideias com cartões de projetos, indicadores e uma lâmpada.',
      en: 'Illustration of an ideas organizer with project cards, status indicators, and a light bulb.',
    },
    description: {
      pt: 'Aplicação para registrar, organizar e acompanhar ideias e projetos pessoais, com categorias, prioridades e diferentes etapas de progresso.',
      en: 'An application for capturing, organizing, and tracking personal ideas and projects using categories, priorities, and progress stages.',
    },
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Router',
      'Vitest',
    ],
    stackFileCounts: {
      React: 9,
      TypeScript: 24,
      'Tailwind CSS': 7,
      'TanStack Router': 4,
      Vitest: 4,
    },
    stackUsage: {
      React: { pt: 'Interface de ideias, filtros e formulários.', en: 'Ideas, filters, and forms interface.' },
      TypeScript: { pt: 'Tipos dos projetos e dos estados.', en: 'Types for projects and application state.' },
      'Tailwind CSS': { pt: 'Estilos e responsividade da interface.', en: 'Interface styling and responsiveness.' },
      'TanStack Router': { pt: 'Navegação entre as telas.', en: 'Navigation between application screens.' },
      Vitest: { pt: 'Testes automatizados da aplicação.', en: 'Automated application tests.' },
    },
    githubUrl:
      'https://github.com/AlexandroLeao/app-project-ideias',
    liveUrl:
      'https://app-project-ideias.vercel.app/',
    details: {
      features: [
        {
          pt: 'Cadastro, edição e exclusão de ideias e projetos.',
          en: 'Create, edit, and delete ideas and projects.',
        },
        {
          pt: 'Organização por categorias, prioridades e status.',
          en: 'Organize items by categories, priorities, and status.',
        },
        {
          pt: 'Pesquisa, filtros e marcação de favoritos.',
          en: 'Search, filters, and favorites.',
        },
        {
          pt: 'Gerenciamento de datas, prazos e anotações.',
          en: 'Manage dates, deadlines, and notes.',
        },
      ],
      architecture: {
        pt: 'Interface desenvolvida com React e TypeScript, navegação com TanStack Router e persistência local dos dados por meio do LocalStorage.',
        en: 'Built with React and TypeScript, using TanStack Router for navigation and LocalStorage for local data persistence.',
      },
      challenges: {
        pt: 'Estruturar uma aplicação que permita acompanhar diferentes ideias e projetos de maneira simples, mantendo a organização dos dados e da interface.',
        en: 'Designing an application that makes it easy to track multiple ideas and projects while keeping data and interface organization consistent.',
      },
      practices: {
        pt: 'Projeto desenvolvido com auxílio de IA, utilizando documentação técnica, testes automatizados, controle de versão e integração contínua.',
        en: 'AI-assisted development supported by technical documentation, automated tests, version control, and continuous integration.',
      },
    },
  },
  {
    id: 'natsu-matsuri',
    name: 'Natsu Matsuri Project',
    year: 2023,
    image: '/images/projects/natsu-matsuri-1200.webp',
    imageSrcSet: [
      '/images/projects/natsu-matsuri-640.webp 640w',
      '/images/projects/natsu-matsuri-1200.webp 1200w',
      '/images/projects/natsu-matsuri-1672.webp 1672w',
    ].join(', '),
    imageAlt: {
      pt: 'Ilustração de um sistema financeiro com cartões de entradas, saídas e saldo, além de registros de vendas.',
      en: 'Illustration of a financial system with income, expense, and balance cards alongside sales records.',
    },
    description: {
      pt: 'Sistema desenvolvido para registrar movimentações financeiras e acompanhar os resultados das vendas durante um festival cultural japonês.',
      en: 'A system developed to record financial transactions and track sales results during a Japanese cultural festival.',
    },
    technologies: [
      'React',
      'JavaScript',
      'styled-components',
      'LocalStorage',
    ],
    stackFileCounts: {
      React: 8,
      JavaScript: 15,
      'styled-components': 7,
      LocalStorage: 2,
    },
    stackUsage: {
      React: { pt: 'Componentes dos registros financeiros.', en: 'Financial records interface components.' },
      JavaScript: { pt: 'Cálculos de entradas, saídas e saldo.', en: 'Income, expense, and balance calculations.' },
      'styled-components': { pt: 'Estilos dos componentes da interface.', en: 'Styles for interface components.' },
      LocalStorage: { pt: 'Persistência das transações no navegador.', en: 'Transaction persistence in the browser.' },
    },
    githubUrl:
      'https://github.com/AlexandroLeao/natsu-matsuri-project',
    liveUrl:
      'https://alexandroleao.github.io/natsu-matsuri-project/',
    details: {
      features: [
        {
          pt: 'Registro de entradas e saídas financeiras.',
          en: 'Record income and expense transactions.',
        },
        {
          pt: 'Seleção de produtos e quantidades.',
          en: 'Select products and quantities.',
        },
        {
          pt: 'Cálculo de entradas, saídas e saldo total.',
          en: 'Calculate income, expenses, and total balance.',
        },
        {
          pt: 'Visualização e exclusão de transações registradas.',
          en: 'View and delete recorded transactions.',
        },
      ],
      architecture: {
        pt: 'Aplicação React com componentes estilizados utilizando styled-components, gerenciamento de estado com hooks e persistência em LocalStorage.',
        en: 'React application using styled-components, hook-based state management, and LocalStorage persistence.',
      },
      challenges: {
        pt: 'Transformar uma necessidade operacional de um evento em uma interface simples para registrar vendas e acompanhar movimentações financeiras.',
        en: 'Turning an event management need into a simple interface for recording sales and monitoring financial transactions.',
      },
      practices: {
        pt: 'Desenvolvimento baseado em componentes React, organização de transações e controle de versão com Git.',
        en: 'Development using React components, transaction management, and Git version control.',
      },
    },
  },
]
