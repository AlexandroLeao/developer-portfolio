import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  BookOpen,
  GraduationCap,
  ChevronDown,
  Download,
  Mail,
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
  type CertificationCategory,
} from './data/certifications'
import ExperienceTimeline from './components/ExperienceTimeline'
import HeroMascot from './components/HeroMascot'
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
      resume: 'Baixar currículo',
      resumeLabel: 'Baixar currículo em PDF',
      illustration: 'Ilustração de Alexandro Leão utilizando um notebook',
      scrollHint: 'Role para explorar',
    },
    about: {
      eyebrow: 'O QUE ME MOVE',
      title: 'Sobre mim',
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
      categoryLabel: 'Áreas de tecnologia',
      detailsLabel: 'Detalhes da tecnologia',
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
      viewLabel: 'Visualizar',
      featuredLabel: 'Destaques',
      allLabel: 'Todas',
      categoryLabel: 'Área de conhecimento',
      allCategoriesLabel: 'Todas as áreas',
      ongoingLabel: 'Em desenvolvimento',
      ongoingStatus: 'Em andamento',
    },
    contact: {
      eyebrow: 'VAMOS CONVERSAR?',
      title: 'Tem uma ideia ou oportunidade?',
      description:
        'Se você tem um projeto em mente, uma oportunidade profissional ou quer trocar uma ideia sobre tecnologia, será um prazer conversar.',
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
      resume: 'Download résumé',
      resumeLabel: 'Download résumé as PDF',
      illustration: 'Illustration of Alexandro Leão using a laptop',
      scrollHint: 'Scroll to explore',
    },
    about: {
      eyebrow: 'WHAT DRIVES ME',
      title: 'About me',
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
      categoryLabel: 'Technology areas',
      detailsLabel: 'Technology details',
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
      viewLabel: 'View',
      featuredLabel: 'Highlights',
      allLabel: 'All',
      categoryLabel: 'Knowledge area',
      allCategoriesLabel: 'All areas',
      ongoingLabel: 'Currently learning',
      ongoingStatus: 'In progress',
    },
    contact: {
      eyebrow: "LET'S CONNECT",
      title: 'Have an idea or an opportunity?',
      description:
        "If you have a project in mind, a professional opportunity, or simply want to talk about technology, I'd be happy to connect.",
      button: 'Get in touch',
    },
    navigation: {
      backToTop: 'Back to the top of the page',
    },
  },
}

// Shared typography hierarchy for portfolio sections.
const sectionEyebrowClass = 'mb-4 block text-xs font-semibold tracking-[0.2em] text-(--color-primary)'
const sectionHeadingClass = 'font-display text-4xl font-bold tracking-tight sm:text-5xl'
const sectionIntroClass = 'text-base leading-8 text-(--color-text-muted) sm:text-lg'
const subsectionHeadingClass = 'font-display text-xl font-semibold text-(--color-text) sm:text-2xl'

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
  const [certificationView, setCertificationView] = useState<'featured' | 'all'>('featured')
  const [selectedCertificationCategory, setSelectedCertificationCategory] = useState<CertificationCategory | 'all'>('all')
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const [activeTechnologyCategory, setActiveTechnologyCategory] = useState<CategoryId>('frontend')
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<string | null>(null)
  const technologyGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (event.target instanceof Element && event.target.closest('.smart-header')) return

      if (!technologyGridRef.current?.contains(event.target)) {
        setSelectedTechnologyId(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

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

  // Revela apenas os títulos selecionados, uma vez, sem listeners de scroll.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal-on-scroll]'),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    headings.forEach((heading) => {
      heading.classList.add('reveal-pending')
      observer.observe(heading)
    })

    return () => {
      observer.disconnect()
      headings.forEach((heading) =>
        heading.classList.remove('reveal-pending', 'reveal-visible'),
      )
    }
  }, [])

  const text = translations[language]

  const visibleCertifications = certifications.filter(
    (certification) =>
      (certificationView === 'all' || certification.featured) &&
      (selectedCertificationCategory === 'all' || certification.category === selectedCertificationCategory),
  )

  const completedCards = (category: CertificationCategory) =>
    visibleCertifications
      .filter((certification) => certification.category === category)
      .map((certification) => ({ kind: 'completed' as const, certification }))

  const certificationCards = [
    ...completedCards('engineering'),
    ...completedCards('development'),
    ...(selectedCertificationCategory === 'all' || selectedCertificationCategory === 'development'
      ? ongoingEducation.map((course) => ({ kind: 'ongoing' as const, course }))
      : []),
    ...completedCards('foundations'),
  ]

  const activeCategory =
    technologyCategories.find((category) => category.id === activeTechnologyCategory) ??
    technologyCategories[0]

  const selectedTechnology = activeCategory.technologies.find(
    (technology) => technology.id === selectedTechnologyId,
  )

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
              className="cta-hover-lift inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Mail size={18} aria-hidden="true" />
              {text.hero.contact}
            </button>

            <a
              href={
                language === 'pt'
                  ? '/resumes/alexandro-leao-curriculo-pt.pdf'
                  : '/resumes/alexandro-leao-resume-en.pdf'
              }
              download
              aria-label={text.hero.resumeLabel}
              className="cta-hover-lift inline-flex items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text-muted) transition-[color,transform] duration-200 hover:text-(--color-text) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Download size={18} aria-hidden="true" />
              {text.hero.resume}
            </a>
          </div>
        </div>

        {/* ILUSTRAÇÃO */}
        <div className="relative isolate flex w-full flex-1 items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 hidden rounded-full bg-[#235d59]/45 blur-[75px] dark:block"
          />

          <HeroMascot alt={text.hero.illustration} language={language} />
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
            <span className={sectionEyebrowClass}>
              {text.about.eyebrow}
            </span>

            <h2
              id="about-title"
              className={sectionHeadingClass}
            >
              {text.about.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

          </div>

          <div className="space-y-6">
            {text.about.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className={sectionIntroClass}
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
        className="scroll-mt-12 border-t border-(--color-border) py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl">
            <span className={sectionEyebrowClass}>
              {text.skills.eyebrow}
            </span>
            <h2
              id="skills-title"
              className={sectionHeadingClass}
            >
              {text.skills.title}
              <span className="text-(--color-primary)">.</span>
            </h2>
            <div aria-hidden="true" className="mt-4 h-1 w-16 rounded-full bg-(--color-primary)" />
            <p className={`${sectionIntroClass} mt-4`}>
              {text.skills.description}
            </p>
          </div>

          <div className="grid items-stretch gap-3 lg:grid-cols-[13.625rem_minmax(0,1fr)]">
            <nav
              aria-label={text.skills.categoryLabel}
              className="technology-category-nav flex snap-x snap-proximity flex-nowrap gap-2 overflow-x-auto rounded-3xl border border-(--color-border) bg-(--color-surface) p-2 lg:flex-col lg:overflow-visible lg:p-3"
            >
              {technologyCategories.map((category) => {
                const isActive = category.id === activeTechnologyCategory

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveTechnologyCategory(category.id)
                      setSelectedTechnologyId(null)
                    }}
                    className={`technology-category min-h-10 shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-center text-[13px] font-medium leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) lg:min-h-11 lg:w-full lg:flex-1 lg:basis-0 lg:whitespace-normal lg:rounded-xl lg:px-2 lg:py-1.5 lg:leading-tight ${
                      isActive
                        ? 'border-(--color-primary) bg-(--color-background) text-(--color-text)'
                        : 'border-transparent text-(--color-text-muted)'
                    }`}
                  >
                    {category.title[language]}
                  </button>
                )
              })}
            </nav>

            <div className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-4 sm:p-5">
              <h3 className={subsectionHeadingClass}>
                {activeCategory.title[language]}
              </h3>

              <div
                ref={technologyGridRef}
                className={`mt-3 grid grid-cols-2 gap-2.5 ${
                  activeCategory.technologies.length === 8
                    ? 'sm:grid-cols-4'
                    : activeCategory.technologies.length === 6
                      ? 'sm:grid-cols-3'
                      : 'sm:grid-cols-2'
                }`}
              >
                {activeCategory.technologies.map((technology) => {
                  const isSelected = selectedTechnologyId === technology.id

                  return (
                    <button
                      key={technology.id}
                      type="button"
                      aria-pressed={isSelected}
                      aria-controls="technology-detail-panel"
                      onClick={() => setSelectedTechnologyId((current) =>
                        current === technology.id ? null : technology.id
                      )}
                      className={`technology-card group flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border bg-(--color-background) px-2 py-2.5 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) sm:min-h-22 ${
                        isSelected
                          ? 'technology-card-selected border-(--color-primary)'
                          : 'border-(--color-border)'
                      }`}
                    >
                      <i aria-hidden="true" className={`${technology.icon} technology-icon text-[1.75rem]`} />
                      <span className="text-xs font-semibold leading-snug text-(--color-text)">
                        {technology.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                id="technology-detail-panel"
                role="region"
                aria-label={selectedTechnology
                  ? `${selectedTechnology.name} — ${text.skills.detailsLabel}`
                  : text.skills.detailsLabel}
                aria-live="polite"
                className="mt-4 flex min-h-19 items-center border-t border-(--color-border) pt-3"
              >
                {selectedTechnology && (
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-semibold text-(--color-text)">
                      {selectedTechnology.name}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-(--color-text-muted)">
                      {selectedTechnology.description[language]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section
        id="projects"
        aria-labelledby="projects-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className={sectionEyebrowClass}>
              {text.projects.eyebrow}
            </span>

            <h2
              id="projects-title"
              data-reveal-on-scroll
              className={sectionHeadingClass}
            >
              {text.projects.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className={`${sectionIntroClass} mt-6`}>
              {text.projects.description}
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
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
        className="scroll-mt-12 overflow-x-clip border-t border-(--color-border) pt-8 pb-24 sm:pt-10 sm:pb-32"
      >
        <div className="mx-auto w-full min-w-0 max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className={sectionEyebrowClass}>
              {text.experience.eyebrow}
            </span>

            <h2
              id="experience-title"
              data-reveal-on-scroll
              className={sectionHeadingClass}
            >
              {text.experience.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className={`${sectionIntroClass} mt-6`}>
              {text.experience.description}
            </p>
          </div>

          <ExperienceTimeline language={language} />
        </div>
      </section>

      {/* FORMAÇÃO E CERTIFICAÇÕES */}
      <section
        id="certifications"
        aria-labelledby="certifications-title"
        className="scroll-mt-12 border-t border-(--color-border) pt-14 pb-24 sm:pt-16 sm:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-2xl">
            <span className={sectionEyebrowClass}>
              {text.certifications.eyebrow}
            </span>

            <h2
              id="certifications-title"
              data-reveal-on-scroll
              className={sectionHeadingClass}
            >
              {text.certifications.title}
              <span className="text-(--color-primary)">.</span>
            </h2>

            <div
              aria-hidden="true"
              className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
            />

            <p className={`${sectionIntroClass} mt-6`}>
              {text.certifications.description}
            </p>
          </div>

          {/* GRADUAÇÃO */}
          <div className="mb-8">
            <h3 className={`${subsectionHeadingClass} mb-3`}>
              {text.certifications.degreeLabel}
            </h3>

            <article className="flex items-start gap-3 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 sm:items-center sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) text-(--color-primary)">
                <GraduationCap size={23} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-(--color-primary)">
                    {academicEducation.institution}
                  </span>
                  <span className="rounded-full border border-(--color-border) bg-(--color-background) px-2.5 py-0.5 text-xs font-medium text-(--color-text-muted)">
                    {text.certifications.degreeStatus} · {academicEducation.completionYear}
                  </span>
                </div>

                <h4 className="font-display text-base font-bold tracking-tight text-(--color-text) sm:text-lg">
                  {academicEducation.degree[language]}
                </h4>

                <p className="mt-1 max-w-3xl text-xs leading-5 text-(--color-text-muted) sm:text-sm">
                  {academicEducation.summary[language]}
                </p>
              </div>
            </article>
          </div>

          {/* CURSOS E CERTIFICAÇÕES */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className={subsectionHeadingClass}>
                {text.certifications.certificationLabel}
              </h3>

              <div
                role="group"
                aria-label={text.certifications.viewLabel}
                className="flex gap-1 rounded-full border border-(--color-border) bg-(--color-surface) p-1"
              >
                {(['featured', 'all'] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    aria-pressed={certificationView === view}
                    aria-controls="certification-results"
                    onClick={() => setCertificationView(view)}
                    className={
                      'min-h-9 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ' +
                      (certificationView === view
                        ? 'bg-(--color-background) text-(--color-primary)'
                        : 'text-(--color-text-muted) hover:text-(--color-text)')
                    }
                  >
                    {view === 'featured'
                      ? text.certifications.featuredLabel
                      : text.certifications.allLabel}
                  </button>
                ))}
              </div>
            </div>

            <div
              role="group"
              aria-label={text.certifications.categoryLabel}
              className="technology-category-nav mb-4 flex snap-x snap-proximity flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
            >
              <button
                type="button"
                aria-pressed={selectedCertificationCategory === 'all'}
                aria-controls="certification-results"
                onClick={() => setSelectedCertificationCategory('all')}
                className={
                  'min-h-9 shrink-0 snap-start whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ' +
                  (selectedCertificationCategory === 'all'
                    ? 'border-(--color-primary) bg-(--color-surface) text-(--color-primary)'
                    : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary)')
                }
              >
                {text.certifications.allCategoriesLabel}
              </button>
              {certificationCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selectedCertificationCategory === category.id}
                  aria-controls="certification-results"
                  onClick={() => setSelectedCertificationCategory(category.id)}
                  className={
                    'min-h-9 shrink-0 snap-start whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ' +
                    (selectedCertificationCategory === category.id
                      ? 'border-(--color-primary) bg-(--color-surface) text-(--color-primary)'
                      : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary)')
                  }
                >
                  {category.title[language]}
                </button>
              ))}
            </div>

            <div
              id="certification-results"
              aria-live="polite"
              className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {certificationCards.map((card) =>
                card.kind === 'completed' ? (
                  <CertificationCard
                    key={card.certification.id}
                    certification={card.certification}
                    language={language}
                  />
                ) : (
                  <article
                    key={card.course.id}
                    className="group flex h-full min-w-0 flex-col rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 transition-[transform,border-color] duration-200 hover:border-(--color-primary) motion-safe:hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold text-(--color-primary)">
                        {text.certifications.ongoingLabel}
                      </span>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-background) text-(--color-primary)">
                        <BookOpen size={17} aria-hidden="true" />
                      </div>
                    </div>
                    <h4 className="font-display mt-2 text-base font-bold leading-snug tracking-tight text-(--color-text) sm:text-lg">
                      {card.course.title[language]}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-(--color-text-muted)">
                      {card.course.summary[language]}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {card.course.skills.map((skill) => (
                        <li
                          key={skill.pt}
                          className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-1 text-[11px] text-(--color-text)"
                        >
                          {skill[language]}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto border-t border-(--color-border) pt-3">
                      <span className="inline-flex rounded-full border border-(--color-border) px-3 py-1 text-xs font-semibold text-(--color-primary)">
                        {text.certifications.ongoingStatus}
                      </span>
                    </div>
                  </article>
                ),
              )}
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
          <span className={sectionEyebrowClass}>
            {text.contact.eyebrow}
          </span>

          <h2
            id="contact-title"
            className={`${sectionHeadingClass} max-w-3xl`}
          >
            {text.contact.title}
          </h2>

          <div
            aria-hidden="true"
            className="mt-6 h-1 w-16 rounded-full bg-(--color-primary)"
          />

          <p className={`${sectionIntroClass} mt-7 max-w-2xl`}>
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
        className={`back-to-top fixed right-5 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-primary) shadow-lg transition-all duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) sm:right-8 sm:bottom-8 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp
          size={18}
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
