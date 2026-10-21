
import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

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

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Fecha o menu ao pressionar Escape.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  function toggleTheme() {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  function changeLanguage(nextLanguage: Language) {
    onLanguageChange(nextLanguage)
  }

  const translations = {
    pt: {
      navigation: 'Navegação principal',
      home: 'Alexandro Leão — voltar ao início',
      about: 'Sobre',
      skills: 'Tecnologias',
      projects: 'Projetos',
      experience: 'Experiência',
      certifications: 'Certificações',
      contact: 'Contato',
      darkTheme: 'Ativar tema escuro',
      lightTheme: 'Ativar tema claro',
      language: 'Selecionar idioma',
      openMenu: 'Abrir menu de navegação',
      closeMenu: 'Fechar menu de navegação',
    },
    en: {
      navigation: 'Main navigation',
      home: 'Alexandro Leão — back to home',
      about: 'About',
      skills: 'Technologies',
      projects: 'Projects',
      experience: 'Experience',
      certifications: 'Certifications',
      contact: 'Contact',
      darkTheme: 'Switch to dark mode',
      lightTheme: 'Switch to light mode',
      language: 'Select language',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
  }

  const text = translations[language]

  const navigationLinks = [
    { href: '#about', label: text.about },
    { href: '#skills', label: text.skills },
    { href: '#projects', label: text.projects },
    { href: '#experience', label: text.experience },
    { href: '#certifications', label: text.certifications },
    { href: '#contact', label: text.contact },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label={text.navigation}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Logotipo */}
          <a
            href="#home"
            aria-label={text.home}
            onClick={() => setIsMenuOpen(false)}
            className="font-display shrink-0 text-2xl font-bold tracking-tight text-(--color-text) transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            AL<span className="text-(--color-primary)">.</span>
          </a>

          {/* Navegação desktop */}
          <div className="hidden items-center gap-5 xl:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm whitespace-nowrap text-(--color-text-muted) transition hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Controles */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Seletor de idioma */}
            <div
              role="group"
              aria-label={text.language}
              className="flex items-center rounded-full border border-(--color-border) bg-(--color-surface) p-1"
            >
              <button
                type="button"
                onClick={() => changeLanguage('pt')}
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
                onClick={() => changeLanguage('en')}
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

            {/* Tema claro/escuro */}
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

            {/* Menu para telas menores */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-label={isMenuOpen ? text.closeMenu : text.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) xl:hidden"
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Navegação responsiva */}
        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className={`mt-4 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 shadow-lg xl:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-(--color-text) transition-colors hover:bg-(--color-background) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
