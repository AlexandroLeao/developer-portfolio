
export type Language = 'pt' | 'en'

type TranslatedText = Record<Language, string>

export type Project = {
  id: string
  name: string
  year: number
  image: string
  imageAlt: TranslatedText
  description: TranslatedText
  technologies: string[]
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
    id: 'ideas-organizer',
    name: 'Organizador de Ideias e Projetos',
    year: 2026,
    image: '/images/projects/organizador-ideias.png',
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
    image: '/images/projects/natsu-matsuri.png',
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
    githubUrl:
      'https://github.com/AlexandroLeao/Natsu-Matsuri-Project',
    liveUrl:
      'https://alexandroleao.github.io/Natsu-Matsuri-Project/',
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
