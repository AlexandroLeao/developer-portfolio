
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
    visualReferences?: TranslatedText[]
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
      'Docker',
      'OpenAPI',
      'Playwright',
    ],
    // Selected file associations audited at RPG main 3fe824b on 2026-11-12.
    // Exact rules and lists: docs/performance-and-quality.md.
    stackFileCounts: {
      React: 18,
      TypeScript: 35,
      'Node.js': 7,
      Express: 5,
      PostgreSQL: 2,
      Supabase: 7,
      Docker: 4,
      OpenAPI: 2,
      Playwright: 5,
    },
    stackUsage: {
      React: { pt: 'Interface e personalização dos personagens.', en: 'Character creation and customization interface.' },
      TypeScript: { pt: 'Tipos e segurança dos dados no front-end.', en: 'Types and data safety in the frontend.' },
      'Node.js': { pt: 'Serviços de back-end da aplicação.', en: 'Application backend services.' },
      Express: { pt: 'Rotas e endpoints da API REST.', en: 'REST API routes and endpoints.' },
      PostgreSQL: { pt: 'Armazenamento dos dados dos personagens.', en: 'Storage for character data.' },
      Supabase: { pt: 'Autenticação e controle de acesso.', en: 'Authentication and access control.' },
      Docker: { pt: 'Imagem multi-stage da API e smoke em CI.', en: 'Multi-stage API image and CI smoke checks.' },
      OpenAPI: { pt: 'Contrato de cinco operações e testes de regressão.', en: 'Five-operation contract and regression tests.' },
      Playwright: { pt: 'Três cenários full-stack com Supabase local isolado.', en: 'Three full-stack scenarios with isolated local Supabase.' },
    },
    githubUrl: 'https://github.com/AlexandroLeao/rpg-character-creator',
    liveUrl: 'https://adventure-files-staging.vercel.app/',
    details: {
      features: [
        {
          pt: 'Login, recuperação e acesso seguro.',
          en: 'Secure login and account recovery.',
        },
        {
          pt: 'Criador em 6 etapas e 8 classes.',
          en: 'Six stages and eight character classes.',
        },
        {
          pt: 'Personagem salvo, edição e exclusão.',
          en: 'Save, edit, and delete one character.',
        },
        {
          pt: 'Fichas PNG Story/Status e Portrait.',
          en: 'Story/Status and Portrait PNG sheets.',
        },
      ],
      architecture: {
        pt: 'React/TypeScript, API REST Node.js/Express, Supabase Auth e PostgreSQL com RLS. Contrato OpenAPI 3.1 e Docker local para a API.',
        en: 'React/TypeScript, Node.js/Express REST API, Supabase Auth, and PostgreSQL with RLS. OpenAPI 3.1 contract and local API Docker image.',
      },
      challenges: {
        pt: 'Unir segurança por usuário a uma experiência retrô, responsiva e bilíngue.',
        en: 'Combine user-scoped security with a retro, responsive, bilingual experience.',
      },
      practices: {
        pt: '358 verificações aprovadas: 183 front-end, 133 API (16 de contrato OpenAPI), 39 pgTAP e 3 E2E full-stack. Integração contínua no GitHub Actions e smoke Docker separado.',
        en: '358 passing checks: 183 frontend, 133 API (16 OpenAPI contract tests), 39 pgTAP, and 3 full-stack E2E. GitHub Actions CI and a separate Docker smoke.',
      },
      visualReferences: [
        {
          pt: 'Pixel art original e RPGs',
          en: 'Original pixel art and RPGs',
        },
        {
          pt: 'Computadores retrô 80/90',
          en: 'Retro 80s/90s computers',
        },
        {
          pt: 'D&D · Zelda · Pokémon · Mario · Fallout · Adventure Time',
          en: 'D&D · Zelda · Pokémon · Mario · Fallout · Adventure Time',
        },
      ],
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
          pt: 'Criar, editar e acompanhar ideias e projetos.',
          en: 'Create, edit, and track ideas and projects.',
        },
        {
          pt: 'Categorias, prioridades, status e prazos.',
          en: 'Categories, priorities, status, and deadlines.',
        },
        {
          pt: 'Busca, filtros e favoritos em uma visão prática.',
          en: 'Search, filters, and favorites in one clear view.',
        },
        {
          pt: 'Anexos privados com validação de arquivos e links temporários.',
          en: 'Private attachments with file validation and expiring links.',
        },
      ],
      architecture: {
        pt: 'React/TypeScript e TanStack; dados no LocalStorage e anexos no Lovable Cloud.',
        en: 'React/TypeScript and TanStack; LocalStorage data and Lovable Cloud attachments.',
      },
      challenges: {
        pt: 'Organizar muitos planos sem sobrecarregar a interface.',
        en: 'Organize many plans without overwhelming the interface.',
      },
      practices: {
        pt: 'Zod, validação de anexos, testes automatizados e integração contínua.',
        en: 'Zod, attachment validation, automated tests, and continuous integration.',
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
          pt: 'Registro de entradas, saídas e vendas do festival.',
          en: 'Track festival income, expenses, and sales.',
        },
        {
          pt: 'Seleção de produtos, quantidades e valores.',
          en: 'Select products, quantities, and prices.',
        },
        {
          pt: 'Cálculo automático de totais e saldo.',
          en: 'Automatic totals and balance calculations.',
        },
        {
          pt: 'Histórico com edição e exclusão de transações.',
          en: 'Transaction history with editing and deletion.',
        },
      ],
      architecture: {
        pt: 'React, styled-components, hooks e persistência no LocalStorage.',
        en: 'React, styled-components, hooks, and LocalStorage persistence.',
      },
      challenges: {
        pt: 'Transformar o controle financeiro de um evento em uma tela simples.',
        en: 'Turn event finances into one simple management screen.',
      },
      practices: {
        pt: 'Componentes reutilizáveis, cálculos reativos e versionamento Git.',
        en: 'Reusable components, reactive calculations, and Git versioning.',
      },
    },
  },
]
