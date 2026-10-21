
import { useEffect, useState } from 'react'
import { Download, Mail } from 'lucide-react'
import Header from './components/Header'

type Language = 'pt' | 'en'

const translations = {
  pt: {
    role: 'Desenvolvedor de Software',
    description: 'Transformando código em soluções.',
    contact: 'Entrar em contato',
    resume: 'Currículo em breve',
    resumeLabel: 'Download do currículo disponível em breve',
    illustration:
      'Ilustração de Alexandro Leão utilizando um notebook',
  },
  en: {
    role: 'Software Developer',
    description: 'Turning code into solutions.',
    contact: 'Get in touch',
    resume: 'Résumé coming soon',
    resumeLabel: 'Résumé download coming soon',
    illustration:
      'Illustration of Alexandro Leão using a laptop',
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

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)

    document.documentElement.lang =
      language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const text = translations[language]

  return (
    <main
      id="home"
      className="min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300"
    >
      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      <section
        aria-labelledby="hero-title"
        className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-32 pb-16 lg:flex-row lg:gap-16"
      >
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-primary)">
            {text.role}
          </span>

          <h1
            id="hero-title"
            className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Alexandro Leão
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-(--color-text-muted)">
            {text.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Mail size={18} aria-hidden="true" />
              {text.contact}
            </a>

            <span
              aria-label={text.resumeLabel}
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text-muted) opacity-60"
            >
              <Download size={18} aria-hidden="true" />
              {text.resume}
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
            alt={text.illustration}
            width={1448}
            height={1086}
            className="relative z-10 h-auto w-full max-w-lg object-contain"
          />
        </div>
      </section>
    </main>
  )
}

export default App
