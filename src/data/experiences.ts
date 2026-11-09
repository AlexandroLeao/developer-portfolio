
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
    projectId: string
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
      pt: 'Gestão de estoque e rastreabilidade de materiais, com apoio na resolução de problemas de TI.',
      en: 'Managed inventory and material traceability while assisting with IT troubleshooting.',
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
        pt: 'Organização de dados',
        en: 'Data Organization',
      },
      {
        pt: 'Melhoria de processos',
        en: 'Process Improvement',
      },
    ],
    contributions: [
      {
        pt: 'Controle de entradas e saídas com registros rastreáveis em sistema.',
        en: 'Tracked incoming and outgoing materials in internal systems.',
      },
      {
        pt: 'Padronização de rotinas de estoque para apoiar a eficiência operacional.',
        en: 'Standardized inventory routines to support operational efficiency.',
      },
      {
        pt: 'Suporte a equipamentos, periféricos e impressoras.',
        en: 'Troubleshot equipment, peripherals, and printers.',
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
      pt: 'Vendas consultivas de tecnologia, orientação técnica e apoio ao desenvolvimento da equipe.',
      en: 'Provided consultative technology sales, technical guidance, and team support.',
    },
    skills: [
      {
        pt: 'Comunicação técnica',
        en: 'Technical Communication',
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
    ],
    contributions: [
      {
        pt: '1º lugar em desempenho de vendas nos shoppings de Belém durante um período de avaliação.',
        en: 'Ranked first in sales performance across Belém shopping malls during an evaluation period.',
      },
      {
        pt: 'Orientação técnica e suporte pós-venda para smartphones.',
        en: 'Provided technical guidance and after-sales smartphone support.',
      },
      {
        pt: 'Treinamento e integração de novos colaboradores.',
        en: 'Trained and onboarded new team members.',
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
      pt: 'Desenvolvi uma aplicação web para digitalizar o controle de vendas de eventos culturais e automatizar cálculos financeiros.',
      en: 'Built a web app to digitize sales records at cultural events and automate financial calculations.',
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
    ],
    contributions: [
      {
        pt: 'Interface responsiva desenvolvida com React e JavaScript.',
        en: 'Built a responsive interface with React and JavaScript.',
      },
      {
        pt: 'Cálculos automáticos de vendas, troco, entradas, saídas e saldo.',
        en: 'Automated sales, change, income, expense, and balance calculations.',
      },
      {
        pt: 'Persistência local dos registros entre sessões.',
        en: 'Saved records locally across sessions.',
      },
    ],
    relatedProject: {
      projectId: 'natsu-matsuri',
      name: 'Natsu Matsuri Project',
      href: '#projects',
    },
  },
]
