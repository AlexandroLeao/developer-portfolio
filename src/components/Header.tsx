
import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import ScrollProgress from './ScrollProgress'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash.slice(1) : '',
  )

  const headerRef = useRef<HTMLElement>(null)

  // Aplica e salva o tema escolhido.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Fecha o menu com Escape ou ao clicar fora do Header.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target

      if (
        target instanceof Node &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('pointerdown', handleOutsideClick)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('pointerdown', handleOutsideClick)
    }
  }, [isMenuOpen])

  // Mantém o cabeçalho sempre visível e ajusta o fundo após o início da página.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
      if (window.scrollY <= 64) setActiveSection('')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Observa a seção em foco sem calcular posições a cada evento de rolagem.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sectionIds = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)

        if (activeEntries[0]) {
          setActiveSection(activeEntries[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  function toggleTheme() {
    setTheme((current) =>
      current === 'light' ? 'dark' : 'light',
    )
  }

  function changeLanguage(nextLanguage: Language) {
    onLanguageChange(nextLanguage)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function returnHome() {
    closeMenu()
    setActiveSection('')
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
    <header
      ref={headerRef}
      className={`smart-header fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? 'border-(--color-border) shadow-sm backdrop-blur-md'
          : 'border-transparent'
      }`}
      style={{
        backgroundColor: isScrolled
          ? 'var(--color-background)'
          : 'transparent',
      }}
    >
      <nav
        aria-label={text.navigation}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
      >
        <div className="flex items-center justify-between gap-3">
          {/* LOGOTIPO */}
          <a
            href="#home"
            aria-label={`AL. — ${text.home}`}
            onClick={returnHome}
            className="nav-hover-lift font-display shrink-0 text-2xl font-bold tracking-tight text-(--color-text) transition-[transform,opacity] duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            AL<span className="text-(--color-primary)">.</span>
          </a>

          {/* NAVEGAÇÃO DESKTOP */}
          <div className="hidden items-center gap-5 xl:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`nav-hover-lift border-b-2 pb-1 text-sm whitespace-nowrap transition-[color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) ${
                  activeSection === link.href.slice(1)
                    ? 'border-(--color-primary) text-(--color-primary)'
                    : 'border-transparent text-(--color-text-muted) hover:text-(--color-primary)'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CONTROLES */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* SELETOR DE IDIOMA */}
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

            {/* TEMA CLARO / ESCURO */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? text.darkTheme
                  : text.lightTheme
              }
              title={
                theme === 'light'
                  ? text.darkTheme
                  : text.lightTheme
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              {theme === 'light' ? (
                <Moon
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              ) : (
                <Sun
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
            </button>

            {/* BOTÃO DO MENU MOBILE */}
            <button
              type="button"
              onClick={() =>
                setIsMenuOpen((current) => !current)
              }
              aria-label={
                isMenuOpen
                  ? text.closeMenu
                  : text.openMenu
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) xl:hidden"
            >
              {isMenuOpen ? (
                <X
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* NAVEGAÇÃO RESPONSIVA */}
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
                onClick={closeMenu}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-(--color-background) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ${
                  activeSection === link.href.slice(1)
                    ? 'bg-(--color-background) text-(--color-primary)'
                    : 'text-(--color-text)'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <ScrollProgress language={language} />
    </header>
  )
}

export default Header
