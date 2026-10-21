
import Header from './components/Header'

function App() {
  return (
    <main
      id="home"
      className="min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300"
    >
      <Header />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
        <span className="mb-5 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-primary)">
          Desenvolvedor de Software
        </span>

        <h1 className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Alexandro Leão
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
          Transformando código em soluções.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-[#263e93] px-8 py-3 font-semibold text-white transition hover:bg-[#344eaa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            Ver projetos
          </a>

          <a
            href="#contact"
            className="rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text) transition hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            Entre em contato
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
