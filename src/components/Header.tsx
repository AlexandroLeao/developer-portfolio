
function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-white"
        >
          <span className="text-indigo-400">&lt;/&gt;</span> Alexandro
        </a>

        {/* Navegação */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm text-slate-300 transition hover:text-indigo-400">
            Sobre
          </a>
          <a href="#skills" className="text-sm text-slate-300 transition hover:text-indigo-400">
            Tecnologias
          </a>
          <a href="#projects" className="text-sm text-slate-300 transition hover:text-indigo-400">
            Projetos
          </a>
          <a href="#contact" className="text-sm text-slate-300 transition hover:text-indigo-400">
            Contato
          </a>
        </div>

        {/* Botão de tema */}
        <button
          type="button"
          aria-label="Alternar tema"
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          ☀️
        </button>
      </nav>
    </header>
  )
}

export default Header
