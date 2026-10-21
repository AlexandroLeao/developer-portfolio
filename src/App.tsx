
import { Download, Mail } from 'lucide-react'
import Header from './components/Header'

function App() {
  return (
    <main
      id="home"
      className="min-h-screen bg-(--color-background) text-(--color-text) transition-colors duration-300"
    >
      <Header />

      <section
        aria-labelledby="hero-title"
        className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 pt-32 pb-16 lg:flex-row lg:gap-16"
      >
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-primary)">
            Desenvolvedor de Software
          </span>

          <h1
            id="hero-title"
            className="font-display mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Alexandro Leão
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-(--color-text-muted)">
            Transformando código em soluções.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <Mail size={18} aria-hidden="true" />
              Entrar em contato
            </a>

            <span
              aria-label="Download do currículo disponível em breve"
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-8 py-3 font-semibold text-(--color-text-muted) opacity-60"
            >
              <Download size={18} aria-hidden="true" />
              Currículo em breve
            </span>
          </div>
        </div>

        {/* Ilustração com brilho suave apenas no tema escuro */}
        <div className="relative isolate flex w-full flex-1 items-center justify-center">
          {/* Brilho atrás da ilustração */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 hidden rounded-full bg-[#235d59]/45 blur-[75px] dark:block"
          />

          {/* Ilustração original preservada */}
          <img
            src="/images/hero-illustration.png"
            alt="Ilustração de Alexandro Leão utilizando um notebook"
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
