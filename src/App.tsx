import { Fragment, useEffect, useState } from 'react'
import {
  ArrowUp,
  BookOpen,
  GraduationCap,
  BrainCircuit,
  ChevronDown,
  Cloud,
  Code2,
  Download,
  Mail,
  Server,
  Workflow,
  X,
} from 'lucide-react'
import Header from './components/Header'
import ContactModal from './components/ContactModal'
import Footer from './components/Footer'
import CertificationCard from './components/CertificationCard'
import {
  academicEducation,
  certificationCategories,
  certifications,
  ongoingEducation,
} from './data/certifications'
import ExperienceCard from './components/ExperienceCard'
import { experiences } from './data/experiences'
import ProjectCard from './components/ProjectCard'
import { projects } from './data/projects'

type Language = 'pt' | 'en'

type CategoryId =
  | 'frontend'
  | 'backend'
  | 'ai'
  | 'cloud'
  | 'engineering'

type Technology = {
  id: string
  name: string
  icon: string
  description: {
    pt: string
    en: string
  }
}

type TechnologyCategory = {
  id: CategoryId
  title: {
    pt: string
    en: string
  }
  technologies: Technology[]
}

const technologyCategories: TechnologyCategory[] = [
  {
    id: 'frontend',
    title: { pt: 'Front-End', en: 'Front-End' },
    technologies: [
      {
        id: 'html',
        name: 'HTML5',
        icon: 'devicon-html5-plain',
        description: {
          pt: 'Utilizo HTML5 para estruturar páginas semânticas, acessíveis e organizadas.',
          en: 'I use HTML5 to build semantic, accessible, and well-structured web pages.',
        },
      },
      {
        id: 'css',
        name: 'CSS3',
        icon: 'devicon-css3-plain',
        description: {
          pt: 'Utilizo CSS3 para criar layouts responsivos, animações e experiências visuais consistentes.',
          en: 'I use CSS3 to create responsive layouts, animations, and consistent visual experiences.',
        },
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'devicon-javascript-plain',
        description: {
          pt: 'Utilizo JavaScript para desenvolver interatividade, lógica de aplicações e integração com APIs.',
          en: 'I use JavaScript to implement interactivity, application logic, and API integrations.',
        },
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: 'devicon-typescript-plain',
        description: {
          pt: 'Utilizo TypeScript para adicionar tipagem estática, melhorar a manutenção e reduzir erros no desenvolvimento.',
          en: 'I use TypeScript to add static typing, improve maintainability, and reduce development errors.',
        },
      },
      {
        id: 'react',
        name: 'React',
        icon: 'devicon-react-original',
        description: {
          pt: 'Utilizo React para construir interfaces dinâmicas com componentes reutilizáveis e gerenciamento de estado.',
          en: 'I use React to build dynamic interfaces with reusable components and state management.',
        },
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        icon: 'devicon-tailwindcss-original',
        description: {
          pt: 'Utilizo Tailwind CSS para desenvolver interfaces responsivas com estilos consistentes e reutilizáveis.',
          en: 'I use Tailwind CSS to develop responsive interfaces with consistent, reusable styles.',
        },
      },
      {
        id: 'bootstrap',
        name: 'Bootstrap',
        icon: 'devicon-bootstrap-plain',
        description: {
          pt: 'Utilizo Bootstrap para acelerar a construção de layouts responsivos e componentes de interface.',
          en: 'I use Bootstrap to speed up the creation of responsive layouts and interface components.',
        },
      },
      {
        id: 'tanstack',
        name: 'TanStack',
        icon: 'devicon-react-original',
        description: {
          pt: 'Exploro ferramentas do ecossistema TanStack para organizar o gerenciamento de dados e estados assíncronos em aplicações React.',
          en: 'I explore the TanStack ecosystem to organize data fetching and asynchronous state in React applications.',
        },
      },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Back-End & Dados', en: 'Back-End & Data' },
    technologies: [
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: 'devicon-nodejs-plain',
        description: {
          pt: 'Utilizo Node.js para desenvolver serviços e aplicações back-end com JavaScript.',
          en: 'I use Node.js to develop back-end services and applications with JavaScript.',
        },
      },
      {
        id: 'express',
        name: 'Express',
        icon: 'devicon-express-original',
        description: {
          pt: 'Utilizo Express para estruturar rotas, middlewares e APIs em aplicações Node.js.',
          en: 'I use Express to structure routes, middleware, and APIs in Node.js applications.',
        },
      },
      {
        id: 'rest',
        name: 'APIs REST',
        icon: 'devicon-fastapi-plain',
        description: {
          pt: 'Desenvolvo e integro APIs REST para permitir a comunicação entre interfaces, serviços e bancos de dados.',
          en: 'I build and integrate REST APIs to connect interfaces, services, and databases.',
        },
      },
      {
        id: 'sql',
        name: 'SQL',
        icon: 'devicon-azuresqldatabase-plain',
        description: {
          pt: 'Utilizo SQL para consultar, organizar e manipular dados em bancos relacionais.',
          en: 'I use SQL to query, organize, and manipulate data in relational databases.',
        },
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'devicon-postgresql-plain',
        description: {
          pt: 'Utilizo PostgreSQL para modelagem relacional, armazenamento de dados e consultas em aplicações.',
          en: 'I use PostgreSQL for relational modeling, data storage, and application queries.',
        },
      },
      {
        id: 'java',
        name: 'Java',
        icon: 'devicon-java-plain',
        description: {
          pt: 'Aprofundo meus conhecimentos em Java e orientação a objetos para desenvolver APIs e aplicações back-end robustas.',
          en: 'I am expanding my knowledge of Java and object-oriented programming to build robust back-end APIs and applications.',
        },
      },
    ],
  },
  {
    id: 'ai',
    title: {
      pt: 'Inteligência Artificial',
      en: 'Artificial Intelligence',
    },
    technologies: [
      {
        id: 'generative-ai',
        name: 'IA Generativa',
        icon: 'devicon-python-plain',
        description: {
          pt: 'Estudo aplicações de IA Generativa para apoiar a criação de conteúdo, análise de informações e automação de processos.',
          en: 'I study Generative AI applications for content generation, information analysis, and process automation.',
        },
      },
      {
        id: 'llms',
        name: 'LLMs',
        icon: 'devicon-pytorch-original',
        description: {
          pt: 'Exploro modelos de linguagem para desenvolver funcionalidades inteligentes e integrar recursos de IA a sistemas.',
          en: 'I explore language models to build intelligent features and integrate AI capabilities into software.',
        },
      },
      {
        id: 'ai-agents',
        name: 'Agentes de IA',
        icon: 'devicon-python-plain',
        description: {
          pt: 'Pretendo desenvolver agentes capazes de integrar modelos de linguagem, ferramentas e APIs para automatizar tarefas.',
          en: 'I plan to build agents that connect language models, tools, and APIs to automate tasks.',
        },
      },
      {
        id: 'applied-ai',
        name: 'IA Aplicada',
        icon: 'devicon-tensorflow-original',
        description: {
          pt: 'Busco aplicar inteligência artificial na resolução de problemas reais e na criação de soluções de software úteis.',
          en: 'I aim to apply artificial intelligence to real-world problems and useful software solutions.',
        },
      },
    ],
  },
  {
    id: 'cloud',
    title: {
      pt: 'Cloud & DevOps — Fundamentos',
      en: 'Cloud & DevOps — Fundamentals',
    },
    technologies: [
      {
        id: 'aws',
        name: 'AWS',
        icon: 'devicon-amazonwebservices-plain-wordmark',
        description: {
          pt: 'Conheço fundamentos de serviços AWS, como EC2, Lambda e IAM, e pretendo aplicá-los em projetos na nuvem.',
          en: 'I understand AWS fundamentals such as EC2, Lambda, and IAM, and plan to apply them in cloud projects.',
        },
      },
      {
        id: 'azure',
        name: 'Azure',
        icon: 'devicon-azure-plain',
        description: {
          pt: 'Estudei fundamentos de infraestrutura e serviços do Microsoft Azure, incluindo máquinas virtuais e redes.',
          en: 'I studied Microsoft Azure infrastructure and service fundamentals, including virtual machines and networking.',
        },
      },
      {
        id: 'gcp',
        name: 'Google Cloud',
        icon: 'devicon-googlecloud-plain',
        description: {
          pt: 'Conheço conceitos de serviços Google Cloud e pretendo explorar suas possibilidades em aplicações escaláveis.',
          en: 'I understand Google Cloud service concepts and plan to explore them in scalable applications.',
        },
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: 'devicon-docker-plain',
        description: {
          pt: 'Conheço os fundamentos de conteinerização e pretendo utilizar Docker para padronizar ambientes de aplicações.',
          en: 'I understand containerization fundamentals and plan to use Docker to standardize application environments.',
        },
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: 'devicon-kubernetes-plain',
        description: {
          pt: 'Estudei conceitos de orquestração de contêineres e pretendo aprofundar sua aplicação em sistemas distribuídos.',
          en: 'I studied container orchestration concepts and plan to deepen my knowledge of distributed systems.',
        },
      },
      {
        id: 'cicd',
        name: 'CI/CD',
        icon: 'devicon-githubactions-plain',
        description: {
          pt: 'Conheço princípios de integração e entrega contínuas para automatizar testes, builds e implantação de software.',
          en: 'I understand continuous integration and delivery principles for automating tests, builds, and deployments.',
        },
      },
    ],
  },
  {
    id: 'engineering',
    title: {
      pt: 'Engenharia & Ferramentas',
      en: 'Engineering & Tools',
    },
    technologies: [
      {
        id: 'git',
        name: 'Git',
        icon: 'devicon-git-plain',
        description: {
          pt: 'Utilizo Git para versionar código, organizar alterações e acompanhar a evolução dos projetos.',
          en: 'I use Git for version control, organizing changes, and tracking project evolution.',
        },
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: 'devicon-github-original',
        description: {
          pt: 'Utilizo GitHub para hospedar repositórios, documentar projetos e colaborar no desenvolvimento.',
          en: 'I use GitHub to host repositories, document projects, and collaborate on development.',
        },
      },
      {
        id: 'scrum',
        name: 'Scrum',
        icon: 'devicon-jira-plain',
        description: {
          pt: 'Conheço práticas Scrum para planejar entregas incrementais, organizar prioridades e promover melhoria contínua.',
          en: 'I understand Scrum practices for incremental delivery, prioritization, and continuous improvement.',
        },
      },
      {
        id: 'uml',
        name: 'UML',
        icon: 'devicon-unifiedmodelinglanguage-plain',
        description: {
          pt: 'Utilizo conceitos de UML para representar requisitos, fluxos, estruturas e interações de sistemas.',
          en: 'I use UML concepts to represent requirements, workflows, structures, and system interactions.',
        },
      },
      {
        id: 'qa',
        name: 'QA',
        icon: 'devicon-selenium-original',
        description: {
          pt: 'Aplico conceitos de qualidade de software, regras de negócio e testes para melhorar a confiabilidade das aplicações.',
          en: 'I apply software quality concepts, business rules, and testing to improve application reliability.',
        },
      },
      {
        id: 'zod',
        name: 'Zod',
        icon: 'devicon-typescript-plain',
        description: {
          pt: 'Utilizo Zod para validar dados e tornar mais segura a comunicação entre formulários, APIs e aplicações.',
          en: 'I use Zod to validate data and make communication between forms, APIs, and applications safer.',
        },
      },
    ],
  },
]

const translations = {
  pt: {
    hero: {
      role: 'Desenvolvedor de Software',
      description: 'Transformando código em soluções.',
      contact: 'Entrar em contato',
      resume: 'Currículo em breve',
      resumeLabel: 'Download do currículo disponível em breve',
      illustration: 'Ilustração de Alexandro Leão utilizando um notebook',
      scrollHint: 'Role para explorar',
    },
    about: {
      eyebrow: 'CONHEÇA UM POUCO SOBRE MIM',
      title: 'Sobre mim',
      subtitle: 'Desenvolvedor de Software',
      education: 'Formado em Análise e Desenvolvimento de Sistemas',
      paragraphs: [
        'Sou Desenvolvedor de Software, formado em Análise e Desenvolvimento de Sistemas, e acredito no potencial da tecnologia para transformar problemas reais em soluções eficientes.',
        'Gosto de compreender os desafios por trás de cada necessidade e desenvolver ferramentas que simplifiquem processos e gerem resultados. Essa abordagem já me levou a criar soluções para gestão de vendas, controle de estoque e organização de projetos pessoais.',
        'Minha trajetória também fortaleceu habilidades como comunicação, liderança e resolução de problemas. Busco evoluir continuamente em engenharia de software, backend, automação, inteligência artificial e computação em nuvem.',
      ],
    },
    skills: {
      eyebrow: 'MINHAS FERRAMENTAS E CONHECIMENTOS',
      title: 'Tecnologias',
      description:
        'Tecnologias, ferramentas e conceitos que utilizo e exploro para transformar ideias em soluções.',
      detailsLabel: 'Como utilizo ou pretendo aplicar',
      close: 'Fechar detalhes',
    },
    projects: {
      eyebrow: 'SOLUÇÕES QUE DESENVOLVI',
      title: 'Projetos',
      description:
        'Uma seleção de projetos que desenvolvi para transformar necessidades e ideias em soluções práticas.',
    },
    experience: {
      eyebrow: 'MINHA TRAJETÓRIA PROFISSIONAL',
      title: 'Experiência',
      description:
        'Minha trajetória reúne experiências em desenvolvimento de software, suporte técnico, gestão de processos e tecnologia, com foco em resolver problemas, melhorar operações e entregar resultados.',
    },
    certifications: {
      eyebrow: 'FORMAÇÃO E APRENDIZADO CONTÍNUO',
      title: 'Formação e certificações',
      description:
        'Minha formação acadêmica e os estudos que aprofundam minhas competências em desenvolvimento de software, engenharia, cloud e tecnologia.',
      degreeLabel: 'Formação acadêmica',
      degreeStatus: 'Concluída',
      certificationLabel: 'Cursos e certificações',
      showAll: 'Mostrar todas as certificações',
      showLess: 'Mostrar menos certificações',
      ongoingLabel: 'Em desenvolvimento',
      ongoingStatus: 'Em andamento',
    },
    contact: {
      eyebrow: 'VAMOS CONVERSAR?',
      title: 'Tem uma ideia ou oportunidade?',
      description:
        'Estou aberto a oportunidades profissionais, novos projetos e colaborações. Vamos conversar sobre como podemos construir algo juntos.',
      button: 'Entrar em contato',
    },
    navigation: {
      backToTop: 'Voltar ao topo da página',
    },
  },
  en: {
    hero: {
      role: 'Software Developer',
      description: 'Turning code into solutions.',
      contact: 'Get in touch',
      resume: 'Résumé coming soon',
      resumeLabel: 'Résumé download coming soon',
      illustration: 'Illustration of Alexandro Leão using a laptop',
      scrollHint: 'Scroll to explore',
    },
    about: {
      eyebrow: 'GET TO KNOW ME',
      title: 'About me',
      subtitle: 'Software Developer',
      education: 'Degree in Systems Analysis and Development',
      paragraphs: [
        "I'm a Software Developer with a degree in Systems Analysis and Development, and I believe in using technology to turn real-world problems into efficient solutions.",
        'I enjoy understanding the challenges behind each need and building tools that simplify processes and deliver meaningful results. This approach has led me to develop solutions for sales management, inventory tracking, and personal project organization.',
        "My professional journey has also strengthened my communication, leadership, and problem-solving skills. I'm continuously expanding my knowledge of software engineering, backend development, automation, artificial intelligence, and cloud computing.",
      ],
    },
    skills: {
      eyebrow: 'MY TOOLS AND KNOWLEDGE',
      title: 'Technologies',
      description:
        'Technologies, tools, and concepts I use and explore to turn ideas into solutions.',
      detailsLabel: 'How I use it or plan to apply it',
      close: 'Close details',
    },
    projects: {
      eyebrow: 'SOLUTIONS I HAVE BUILT',
      title: 'Projects',
      description:
        'A selection of projects I have built to turn needs and ideas into practical solutions.',
    },
    experience: {
      eyebrow: 'MY PROFESSIONAL JOURNEY',
      title: 'Experience',
      description:
        'My professional journey combines software development, technical support, process management, and technology, with a focus on solving problems, improving operations, and delivering results.',
    },
    certifications: {
      eyebrow: 'EDUCATION AND CONTINUOUS LEARNING',
      title: 'Education and certifications',
      description:
        'My academic background and continuous learning in software development, engineering, cloud computing, and technology.',
      degreeLabel: 'Academic education',
      degreeStatus: 'Completed',
      certificationLabel: 'Courses and certifications',
      showAll: 'Show all certifications',
      showLess: 'Show fewer certifications',
      ongoingLabel: 'Currently learning',
      ongoingStatus: 'In progress',
    },
    contact: {
      eyebrow: "LET'S CONNECT",
      title: 'Have an idea or an opportunity?',
      description:
        "I'm open to professional opportunities, new projects, and collaborations. Let's discuss what we can build together.",
      button: 'Get in touch',
    },
    navigation: {
      backToTop: 'Back to the top of the page',
    },
  },
}

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  ai: BrainCircuit,
  cloud: Cloud,
  engineering: Workflow,
}

type TechnologyDetailsProps = {
  technology: Technology
  language: Language
  detailsLabel: string
  closeLabel: string
  onClose: () => void
  className?: string
}

function TechnologyDetails({
  technology,
  language,
  detailsLabel,
  closeLabel,
  onClose,
  className = '',
}: TechnologyDetailsProps) {
  return (
    <div
      className={`technology-details flex items-start justify-between gap-4 rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 sm:p-6 ${className}`}
      role="region"
      aria-label={`${technology.name} — ${detailsLabel}`}
    >
      <div className="max-w-3xl">
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-(--color-primary)">
          {detailsLabel}
        </span>

        <h4 className="font-display mb-2 text-lg font-semibold">
          {technology.name}
        </h4>

        <p className="text-sm leading-7 text-(--color-text-muted) sm:text-base">
          {technology.description[language]}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="shrink-0 rounded-full p-2 text-(--color-text-muted) transition-colors hover:bg-(--color-background) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-(--color-primary)"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-language') === 'en'
        ? 'en'
        : 'pt'
    }

    return 'pt'
  })

  const [isAtTop, setIsAtTop] = useState(() => {
    return typeof window === 'undefined' || window.scrollY < 80
  })

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showAllCertifications, setShowAllCertifications] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Partial<Record<CategoryId, string>>
  >({})

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang =
      language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY

      setIsAtTop(currentY < 80)

      setShowBackToTop(
        currentY > Math.max(window.innerHeight * 1.5, 900),
      )
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const text = translations[language]

  function toggleTechnology(
    categoryId: CategoryId,
    technologyId: string,
  ) {
    setSelectedTechnologies((current) => ({
      ...current,
      [categoryId]:
        current[categoryId] === technologyId
          ? undefined
          : technologyId,
    }))
  }

  return (
    <>
      <main
      id="home"
      className="min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300"
    >
      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-32 pb-20 lg:flex-row lg:gap-16 lg:pb-28"
      >
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-primary)">
            {text.hero.role}
          </span>

          <h1
            id="hero-title"
            className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Alexandro Leão
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-(--color-text-muted)">
            {text.hero.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Mail size={18} aria-hidden="true" />
              {text.hero.contact}
            </button>

            <span
              aria-label={text.hero.resumeLabel}
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text-muted) opacity-60"
            >
              <Download size={18} aria-hidden="true" />
              {text.hero.resume}
            </span>
          </div>
        </div>

        {/* ILUSTRAÇÃO */}
        <div className="relative isolate flex w-full flex-1 items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 hidden rounded-full bg-[#235d59]/45 blur-[75px] dark:block"
          />

          <img
            src="/images/hero-illustration.png"
            alt={text.hero.illustration}
            width={1448}
            height={1086}
            className="relative z-10 h-auto w-full max-w-lg object-contain"
          />
        </div>

        {/* INDICADOR DA HERO — APENAS DESKTOP */}
        <a
          href="#about"
          aria-label={text.hero.scrollHint}
          aria-hidden={!isAtTop}
          tabIndex={isAtTop ? 0 : -1}
          className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 whitespace-nowrap text-(--color-text-muted) transition-opacity duration-500 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) md:flex ${
            isAtTop
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <span
            aria-hidden="true"
            className="flex text-xs font-medium tracking-[0.12em] sm:text-sm"
          >
            {Array.from(text.hero.scrollHint).map(
              (letter, index) => (
                <span
                  key={`${language}-${index}`}
                  className="scroll-hint-letter inline-block"
                  style={{
                    animationDelay: `${index * 65}ms`,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ),
            )}
          </span>

          <ChevronDown
            size={22}
            strokeWidth={1.6}
            aria-hidden="true"
            className="scroll-hint-arrow text-(--color-primary)"
          />
        </a>
      </section>

      {/* SOBRE MIM */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-16 pb-10 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-8"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="flex flex-col items-start">
            <span className="mb-5 text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
              {text.about.eyebrow}
            </span>

            <h2
              id="about-title"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {text.about.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <div className="mt-8 space-y-3">
              <p className="text-lg font-semibold text-(--color-text)">
                {text.about.subtitle}
              </p>

              <p className="max-w-sm text-sm leading-relaxed text-(--color-text-muted)">
                {text.about.education}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {text.about.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-(--color-text-muted) sm:text-lg sm:leading-9"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section
        id="skills"
        aria-labelledby="skills-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-14 pb-24 sm:pt-16 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
              {text.skills.eyebrow}
            </span>

            <h2
              id="skills-title"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {text.skills.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className="mt-6 text-base leading-8 text-(--color-text-muted) sm:text-lg">
              {text.skills.description}
            </p>
          </div>

          <div className="space-y-14">
            {technologyCategories.map((category) => {
              const CategoryIcon =
                categoryIcons[category.id]

              const selectedId =
                selectedTechnologies[category.id]

              const selectedIndex =
                category.technologies.findIndex(
                  (technology) =>
                    technology.id === selectedId,
                )

              const selectedTechnology =
                selectedIndex >= 0
                  ? category.technologies[selectedIndex]
                  : undefined

              return (
                <div key={category.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <CategoryIcon
                      size={20}
                      strokeWidth={1.8}
                      className="text-(--color-primary)"
                      aria-hidden="true"
                    />

                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {category.title[language]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    {category.technologies.map(
                      (technology, index) => {
                        const isSelected =
                          selectedId === technology.id

                        const isEndOfMobileRow =
                          index % 2 === 1 ||
                          index ===
                            category.technologies.length - 1

                        const selectedIsInThisRow =
                          selectedTechnology &&
                          Math.floor(selectedIndex / 2) ===
                            Math.floor(index / 2)

                        return (
                          <Fragment key={technology.id}>
                            <button
                              type="button"
                              aria-pressed={isSelected}
                              aria-expanded={isSelected}
                              onClick={() =>
                                toggleTechnology(
                                  category.id,
                                  technology.id,
                                )
                              }
                              className={`technology-card group flex min-h-32 flex-col items-center justify-center gap-4 rounded-2xl border bg-(--color-surface) px-3 py-5 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) ${
                                isSelected
                                  ? 'technology-card-selected border-(--color-primary)'
                                  : 'border-(--color-border)'
                              }`}
                            >
                              <i
                                aria-hidden="true"
                                className={`${technology.icon} technology-icon text-4xl transition-all duration-300`}
                              />

                              <span className="text-xs font-semibold leading-snug text-(--color-text) sm:text-sm">
                                {technology.name}
                              </span>
                            </button>

                            {/* DETALHES NO MOBILE */}
                            {isEndOfMobileRow &&
                              selectedIsInThisRow && (
                                <TechnologyDetails
                                  technology={
                                    selectedTechnology
                                  }
                                  language={language}
                                  detailsLabel={
                                    text.skills.detailsLabel
                                  }
                                  closeLabel={
                                    text.skills.close
                                  }
                                  onClose={() =>
                                    toggleTechnology(
                                      category.id,
                                      selectedTechnology.id,
                                    )
                                  }
                                  className="col-span-2 sm:hidden"
                                />
                              )}
                          </Fragment>
                        )
                      },
                    )}
                  </div>

                  {/* DETALHES NO DESKTOP */}
                  {selectedTechnology && (
                    <TechnologyDetails
                      technology={selectedTechnology}
                      language={language}
                      detailsLabel={
                        text.skills.detailsLabel
                      }
                      closeLabel={text.skills.close}
                      onClose={() =>
                        toggleTechnology(
                          category.id,
                          selectedTechnology.id,
                        )
                      }
                      className="mt-5 hidden sm:flex"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section
        id="projects"
        aria-labelledby="projects-title"
        className="scroll-mt-12 border-t border-(--color-border) py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
              {text.projects.eyebrow}
            </span>

            <h2
              id="projects-title"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {text.projects.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className="mt-6 text-base leading-8 text-(--color-text-muted) sm:text-lg">
              {text.projects.description}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA PROFISSIONAL */}
      <section
        id="experience"
        aria-labelledby="experience-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-14 pb-24 sm:pt-16 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
              {text.experience.eyebrow}
            </span>

            <h2
              id="experience-title"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {text.experience.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className="mt-6 text-base leading-8 text-(--color-text-muted) sm:text-lg">
              {text.experience.description}
            </p>
          </div>

          <ol className="relative ml-2 max-w-5xl space-y-7 border-l-2 border-(--color-border) pl-8 sm:ml-3 sm:space-y-8 sm:pl-10">
            {experiences.map((experience) => (
              <li key={experience.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-9.5 top-8 h-3 w-3 rounded-full border-2 border-(--color-background) bg-(--color-primary) sm:-left-11.5"
                />

                <ExperienceCard
                  experience={experience}
                  language={language}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FORMAÇÃO E CERTIFICAÇÕES */}
      <section
        id="certifications"
        aria-labelledby="certifications-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-14 pb-24 sm:pt-16 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
              {text.certifications.eyebrow}
            </span>

            <h2
              id="certifications-title"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {text.certifications.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className="mt-6 text-base leading-8 text-(--color-text-muted) sm:text-lg">
              {text.certifications.description}
            </p>
          </div>

          {/* GRADUAÇÃO */}
          <div className="mb-14">
            <h3 className="font-display mb-5 text-xl font-semibold text-(--color-text) sm:text-2xl">
              {text.certifications.degreeLabel}
            </h3>

            <article className="flex flex-col gap-5 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 sm:flex-row sm:items-start sm:p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-background) text-(--color-primary)">
                <GraduationCap size={27} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-(--color-primary)">
                    {academicEducation.institution}
                  </span>
                  <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-medium text-(--color-text-muted)">
                    {text.certifications.degreeStatus} · {academicEducation.completionYear}
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold tracking-tight text-(--color-text) sm:text-2xl">
                  {academicEducation.degree[language]}
                </h4>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-(--color-text-muted) sm:text-base">
                  {academicEducation.summary[language]}
                </p>
              </div>
            </article>
          </div>

          {/* CURSOS E CERTIFICAÇÕES */}
          <div>
            <h3 className="font-display mb-8 text-xl font-semibold text-(--color-text) sm:text-2xl">
              {text.certifications.certificationLabel}
            </h3>

            <div className="space-y-12">
              {certificationCategories.map((category) => {
                const categoryCertifications = certifications.filter(
                  (certification) =>
                    certification.category === category.id &&
                    (showAllCertifications || certification.featured),
                )

                if (categoryCertifications.length === 0) {
                  return null
                }

                return (
                  <div key={category.id}>
                    <h4 className="font-display mb-5 text-lg font-semibold text-(--color-text) sm:text-xl">
                      {category.title[language]}
                    </h4>

                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {categoryCertifications.map((certification) => (
                        <CertificationCard
                          key={certification.id}
                          certification={certification}
                          language={language}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                aria-expanded={showAllCertifications}
                onClick={() => setShowAllCertifications((current) => !current)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-6 py-3 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
              >
                {showAllCertifications
                  ? text.certifications.showLess
                  : `${text.certifications.showAll} (${certifications.length})`}
                <ChevronDown
                  size={17}
                  aria-hidden="true"
                  className={`transition-transform duration-200 motion-reduce:transition-none ${
                    showAllCertifications ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* FORMAÇÃO EM ANDAMENTO */}
          <div className="mt-16">
            <h3 className="font-display mb-5 text-xl font-semibold text-(--color-text) sm:text-2xl">
              {text.certifications.ongoingLabel}
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ongoingEducation.map((course) => (
                <article
                  key={course.id}
                  className="flex min-w-0 gap-4 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-background) text-(--color-primary)">
                    <BookOpen size={23} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                      {text.certifications.ongoingStatus}
                    </span>
                    <h4 className="font-display mt-3 text-xl font-bold text-(--color-text)">
                      {course.title[language]}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
                      {course.summary[language]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-12 border-t border-(--color-border) py-20 sm:py-28"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
          <span className="mb-5 text-xs font-semibold tracking-[0.2em] text-(--color-primary)">
            {text.contact.eyebrow}
          </span>

          <h2
            id="contact-title"
            className="font-display max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {text.contact.title}
            <span className="text-(--color-primary)">.</span>
          </h2>

          <div
            aria-hidden="true"
            className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
          />

          <p className="mt-7 max-w-2xl text-base leading-8 text-(--color-text-muted) sm:text-lg">
            {text.contact.description}
          </p>

          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            <Mail size={18} aria-hidden="true" />
            {text.contact.button}
          </button>
        </div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO */}
      <a
        href="#home"
        aria-label={text.navigation.backToTop}
        title={text.navigation.backToTop}
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`back-to-top fixed right-5 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-primary) shadow-lg transition-all duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) sm:right-8 sm:bottom-8 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp
          size={20}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </a>
      </main>
      <Footer language={language} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        language={language}
      />
    </>
  )
}

export default App
