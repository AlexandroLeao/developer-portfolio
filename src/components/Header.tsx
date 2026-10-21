
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Recupera e Persiste a preferência de tema do usuário no navegador.
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme === 'dark') {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
      >
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-(--color-text)"
        >
          <span className="text-(--color-primary)">&lt;/&gt;</span> Alexandro
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#about"
            className="text-sm text-(--color-text-muted) transition hover:text-(--color-primary)"
          >
            Sobre
          </a>

          <a
            href="#skills"
            className="text-sm text-(--color-text-muted) transition hover:text-(--color-primary)"
          >
            Tecnologias
          </a>

          <a
            href="#projects"
            className="text-sm text-(--color-text-muted) transition hover:text-(--color-primary)"
          >
            Projetos
          </a>

          <a
            href="#contact"
            className="text-sm text-(--color-text-muted) transition hover:text-(--color-primary)"
          >
            Contato
          </a>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
          title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) transition-colors duration-300 hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
        >
          {theme === 'light' ? (
            <Moon size={20} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Sun size={20} strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </nav>
    </header>
  )
}

export default Header
