
export type ExperienceLanguage = 'pt' | 'en'

export type TranslatedText = Record<ExperienceLanguage, string>

export type Experience = {
  id: string
  company: string
  role: TranslatedText
  employmentType: TranslatedText
  period: TranslatedText
  location: TranslatedText
  summary: TranslatedText
  skills: TranslatedText[]
  contributions: TranslatedText[]
  relatedProject?: {
    name: string
    href: string
  }
}

export const experiences: Experience[] = [
  {
    id: 'axia-energia',
    company: 'AXIA Energia',
    role: {
      pt: 'Supervisor de Almoxarifado com Apoio em Suporte de TI',
      en: 'Warehouse Supervisor with IT Support Responsibilities',
    },
    employmentType: {
      pt: 'Temporário',
      en: 'Temporary',
    },
    period: {
      pt: 'Mai. 2024 – Jun. 2026',
      en: 'May 2024 – Jun 2026',
    },
    location: {
      pt: 'Belém, Pará, Brasil',
      en: 'Belém, Pará, Brazil',
    },
    summary: {
      pt: 'Atuação na gestão de materiais e processos operacionais, utilizando sistemas para controle de estoque, rastreabilidade e organização de informações. Também participei de atividades de suporte técnico, aplicando conhecimentos de TI na identificação e resolução de problemas.',
      en: 'Managed inventory operations and material workflows, using management systems to maintain accurate records, traceability, and organized processes. Also supported technical troubleshooting activities, applying IT knowledge to identify and resolve equipment-related issues.',
    },
    skills: [
      {
        pt: 'Suporte de TI',
        en: 'IT Support',
      },
      {
        pt: 'Sistemas de gestão',
        en: 'Management Systems',
      },
      {
        pt: 'Análise de problemas',
        en: 'Troubleshooting',
      },
      {
        pt: 'Organização de dados',
        en: 'Data Organization',
      },
      {
        pt: 'Melhoria de processos',
        en: 'Process Improvement',
      },
      {
        pt: 'Trabalho em equipe',
        en: 'Teamwork',
      },
    ],
    contributions: [
      {
        pt: 'Controle de entradas, saídas e movimentações em sistema, contribuindo para a confiabilidade das informações e a rastreabilidade dos materiais.',
        en: 'Managed incoming and outgoing inventory records in internal systems, supporting data accuracy and material traceability.',
      },
      {
        pt: 'Organização e padronização de processos de estoque, apoiando a eficiência operacional e a prevenção de perdas.',
        en: 'Helped standardize inventory processes to improve operational efficiency and reduce the risk of losses.',
      },
      {
        pt: 'Atendimento a demandas de suporte técnico, com diagnóstico de problemas em equipamentos, periféricos e impressoras.',
        en: 'Assisted with IT support requests, troubleshooting equipment, peripherals, and printers.',
      },
      {
        pt: 'Colaboração com diferentes equipes na resolução de problemas e melhoria de processos internos.',
        en: 'Collaborated across teams to resolve operational issues and improve internal processes.',
      },
    ],
  },
  {
    id: 'realme',
    company: 'realme',
    role: {
      pt: 'Consultor de Vendas em Tecnologia',
      en: 'Technology Sales Consultant',
    },
    employmentType: {
      pt: 'Experiência profissional',
      en: 'Professional Experience',
    },
    period: {
      pt: 'Dez. 2025 – Abr. 2026',
      en: 'Dec 2025 – Apr 2026',
    },
    location: {
      pt: 'Belém, Pará, Brasil',
      en: 'Belém, Pará, Brazil',
    },
    summary: {
      pt: 'Atuação em vendas consultivas de smartphones e soluções tecnológicas, combinando conhecimento técnico, análise das necessidades dos clientes e comunicação para gerar resultados e apoiar o desenvolvimento da equipe.',
      en: 'Provided consultative sales and technical guidance for smartphones and related technologies, combining product knowledge, customer needs analysis, and communication skills to drive results and support team development.',
    },
    skills: [
      {
        pt: 'Comunicação técnica',
        en: 'Technical Communication',
      },
      {
        pt: 'Diagnóstico de problemas',
        en: 'Troubleshooting',
      },
      {
        pt: 'Liderança',
        en: 'Leadership',
      },
      {
        pt: 'Treinamento',
        en: 'Training',
      },
      {
        pt: 'Análise de necessidades',
        en: 'Needs Analysis',
      },
      {
        pt: 'Orientação a resultados',
        en: 'Results Orientation',
      },
    ],
    contributions: [
      {
        pt: 'Alcance do 1º lugar em desempenho de vendas entre vendedores dos shoppings de Belém durante um período de avaliação.',
        en: 'Achieved first place in sales performance among shopping mall sales representatives in Belém during a specific evaluation period.',
      },
      {
        pt: 'Identificação das necessidades dos clientes e recomendação de soluções tecnológicas adequadas a diferentes perfis.',
        en: 'Assessed customer needs and recommended suitable technology solutions.',
      },
      {
        pt: 'Apoio técnico na identificação e resolução de problemas relacionados a smartphones, incluindo orientação pós-venda.',
        en: 'Provided technical guidance and troubleshooting assistance for smartphones, including after-sales support.',
      },
      {
        pt: 'Treinamento e integração de novos colaboradores, compartilhando conhecimentos e apoiando a padronização do atendimento.',
        en: 'Trained and onboarded new team members, sharing knowledge and standardizing customer service practices.',
      },
      {
        pt: 'Atuação como referência para colegas, contribuindo para a colaboração da equipe e o cumprimento de metas.',
        en: 'Supported colleagues as a team point of contact, contributing to collaboration and sales targets.',
      },
    ],
  },
  {
    id: 'kosei-home',
    company: 'Centro de Reabilitação Social Kosei Home',
    role: {
      pt: 'Desenvolvedor Web',
      en: 'Web Developer',
    },
    employmentType: {
      pt: 'Freelance',
      en: 'Freelance',
    },
    period: {
      pt: 'Abr. 2023 – Abr. 2024',
      en: 'Apr 2023 – Apr 2024',
    },
    location: {
      pt: 'Ananindeua, Pará, Brasil',
      en: 'Ananindeua, Pará, Brazil',
    },
    summary: {
      pt: 'Desenvolvimento de uma aplicação web para apoiar o controle financeiro das vendas em festivais culturais, substituindo processos manuais por registros digitais e cálculos automatizados.',
      en: 'Developed a web application to support financial tracking during cultural festivals, replacing manual processes with digital transaction records and automated calculations.',
    },
    skills: [
      {
        pt: 'React',
        en: 'React',
      },
      {
        pt: 'JavaScript',
        en: 'JavaScript',
      },
      {
        pt: 'Desenvolvimento Front-end',
        en: 'Front-end Development',
      },
      {
        pt: 'UX/UI',
        en: 'UX/UI',
      },
      {
        pt: 'Lógica de programação',
        en: 'Programming Logic',
      },
      {
        pt: 'Resolução de problemas',
        en: 'Problem Solving',
      },
    ],
    contributions: [
      {
        pt: 'Desenvolvimento de interface web responsiva utilizando React e JavaScript, com foco em usabilidade e simplicidade.',
        en: 'Built a responsive web interface using React and JavaScript, prioritizing usability and simplicity.',
      },
      {
        pt: 'Implementação de funcionalidades para registro de movimentações financeiras, seleção de produtos, quantidades e valores.',
        en: 'Implemented features for recording financial transactions, selecting products, quantities, and amounts.',
      },
      {
        pt: 'Automatização dos cálculos de vendas, trocos, entradas, saídas e saldo, reduzindo a dependência de controles manuais.',
        en: 'Automated sales, change, income, expense, and balance calculations, reducing reliance on manual tracking.',
      },
      {
        pt: 'Organização da interface e dos fluxos de interação para facilitar a utilização da aplicação durante os eventos.',
        en: 'Designed intuitive interfaces and interaction flows for use during events.',
      },
      {
        pt: 'Implementação de persistência local dos registros para manter as informações entre sessões.',
        en: 'Implemented local data persistence to maintain records across sessions.',
      },
    ],
    relatedProject: {
      name: 'Natsu Matsuri Project',
      href: '#projects',
    },
  },
]
