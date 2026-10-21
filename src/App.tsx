
import { useEffect, useState } from 'react'
import { ChevronDown, Download, Mail } from 'lucide-react'
import Header from './components/Header'

type Language = 'pt' | 'en'

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
  },
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

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  // Mostra o indicador somente quando o visitante está no topo.
  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < 80)
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

  return (
    <main
      id="home"
      className="min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300"
    >
      <Header language={language} onLanguageChange={setLanguage} />

      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-32 pb-32 lg:flex-row lg:gap-16"
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Mail size={18} aria-hidden="true" />
              {text.hero.contact}
            </a>

            <span
              aria-label={text.hero.resumeLabel}
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text-muted) opacity-60"
            >
              <Download size={18} aria-hidden="true" />
              {text.hero.resume}
            </span>
          </div>
        </div>

        {/* Ilustração com brilho suave apenas no tema escuro */}
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

        {/* Indicador animado de rolagem */}
        <a
          href="#about"
          aria-label={text.hero.scrollHint}
          aria-hidden={!isAtTop}
          tabIndex={isAtTop ? 0 : -1}
          className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 whitespace-nowrap text-(--color-text-muted) transition-opacity duration-500 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) sm:bottom-8 ${
            isAtTop
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <span
            aria-hidden="true"
            className="flex text-xs font-medium tracking-[0.12em] sm:text-sm"
          >
            {Array.from(text.hero.scrollHint).map((letter, index) => (
              <span
                key={`${language}-${index}`}
                className="scroll-hint-letter inline-block"
                style={{
                  animationDelay: `${index * 65}ms`,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>

          <ChevronDown
            size={22}
            strokeWidth={1.6}
            aria-hidden="true"
            className="scroll-hint-arrow text-(--color-primary)"
          />
        </a>
      </section>

      {/* SOBRE MIM / ABOUT */}
      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-12 border-t border-(--color-border) py-24 sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Coluna de apresentação */}
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

          {/* Coluna com a história profissional */}
          <div className="space-y-6">
            {text.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-(--color-text-muted) sm:text-lg sm:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
