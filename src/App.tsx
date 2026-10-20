
import Header from './components/Header'

function App() {
  return (
    <main id="home" className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
        <span className="mb-4 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
          Desenvolvedor de Software
        </span>

        <h1 className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Olá, eu sou{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Alexandro Leão
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
          Transformando ideias em experiências digitais modernas,
          funcionais e responsivas.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-indigo-500 px-8 py-3 font-semibold text-white transition hover:bg-indigo-400"
          >
            Ver projetos
          </a>

          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            Entre em contato
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
