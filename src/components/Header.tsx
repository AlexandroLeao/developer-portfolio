
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Language = 'pt' | 'en'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
}

function Header({ language, onLanguageChange }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') === 'dark'
        ? 'dark'
        : 'light'
    }

    return 'light'
  })

  // Aplica o tema e salva a preferência do visitante.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  const translations = {
    pt: {
      navigation: 'Navegação principal',
      home: 'Alexandro Leão — voltar ao início',
      about: 'Sobre',
      skills: 'Tecnologias',
      projects: 'Projetos',
      contact: 'Contato',
      darkTheme: 'Ativar tema escuro',
      lightTheme: 'Ativar tema claro',
      language: 'Selecionar idioma',
    },
    en: {
      navigation: 'Main navigation',
      home: 'Alexandro Leão — back to home',
      about: 'About',
      skills: 'Technologies',
      projects: 'Projects',
      contact: 'Contact',
      darkTheme: 'Switch to dark mode',
      lightTheme: 'Switch to light mode',
      language: 'Select language',
    },
  }

  const text = translations[language]

  const navigationLinks = [
    { href: '#about', label: text.about },
    { href: '#skills', label: text.skills },
    { href: '#projects', label: text.projects },
    { href: '#contact', label: text.contact },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label={text.navigation}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
      >
        <a
          href="#home"
          aria-label={text.home}
          className="font-display text-2xl font-bold tracking-tight text-(--color-text) transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
        >
          AL<span className="text-(--color-primary)">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-(--color-text-muted) transition hover:text-(--color-primary)"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Seletor de idioma */}
          <div
            role="group"
            aria-label={text.language}
            className="flex items-center rounded-full border border-(--color-border) bg-(--color-surface) p-1"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('pt')}
              aria-pressed={language === 'pt'}
              lang="pt-BR"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ${
                language === 'pt'
                  ? 'bg-[#0b3d3e] text-white'
                  : 'text-(--color-text-muted) hover:text-(--color-primary)'
              }`}
            >
              PT
            </button>

            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              lang="en"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ${
                language === 'en'
                  ? 'bg-[#0b3d3e] text-white'
                  : 'text-(--color-text-muted) hover:text-(--color-primary)'
              }`}
            >
              EN
            </button>
          </div>

          {/* Alternância entre tema claro e escuro */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? text.darkTheme : text.lightTheme}
            title={theme === 'light' ? text.darkTheme : text.lightTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            {theme === 'light' ? (
              <Moon size={20} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Sun size={20} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
