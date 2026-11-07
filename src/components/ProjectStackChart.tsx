import type { Language, Project } from '../data/projects'

type ProjectStackChartProps = {
  project: Project
  language: Language
}

const stackColors: Record<string, string> = {
  React: '#128e84',
  TypeScript: '#3f87a6',
  'Node.js': '#78a16d',
  Express: '#b29b69',
  PostgreSQL: '#7588ad',
  Supabase: '#57a58a',
  'Tailwind CSS': '#51aaa7',
  'TanStack Router': '#a88183',
  Vitest: '#ac9b5d',
  JavaScript: '#c6a24e',
  'styled-components': '#a27f9f',
  LocalStorage: '#668c9d',
}

const translations = {
  pt: {
    heading: 'Uso das tecnologias',
    unit: 'arquivos',
    ariaLabel: 'Tecnologias por arquivos de código',
    method: 'Arquivos associados a cada tecnologia nos repositórios. Uma mesma origem pode contar para mais de uma tecnologia; os valores não são porcentagens.',
  },
  en: {
    heading: 'Technology usage',
    unit: 'files',
    ariaLabel: 'Technologies by source files',
    method: 'Source files associated with each technology in the repositories. A file may count toward multiple technologies; these values are not percentages.',
  },
}

// Repository snapshot: 2026-11-07. Values are code-file counts, not estimated percentages.
// Each technology is counted by its applicable code files (language, imports,
// backend modules, routing, style usage, tests, storage calls, or SQL migrations).
export default function ProjectStackChart({ project, language }: ProjectStackChartProps) {
  const text = translations[language]
  const maxCount = Math.max(1, ...project.technologies.map((technology) => project.stackFileCounts[technology] ?? 0))

  return (
    <section className="min-w-0 border-t border-(--color-border) pt-3" aria-label={text.ariaLabel}>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h4 className="text-[11px] font-semibold tracking-wide text-(--color-text)">
          {text.heading}
        </h4>
        <span className="shrink-0 text-[10px] text-(--color-text-muted)" title={text.method}>
          {text.unit}
        </span>
      </div>

      <ul className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-3" title={text.method}>
        {project.technologies.map((technology) => {
          const count = project.stackFileCounts[technology] ?? 0
          const width = (count / maxCount) * 100

          return (
            <li
              key={technology}
              className="group min-w-0"
              aria-label={technology + ': ' + count + ' ' + text.unit}
              title={technology + ' · ' + count + ' ' + text.unit}
            >
              <div className="mb-1 flex min-w-0 items-baseline justify-between gap-1">
                <span className="min-w-0 break-words text-[10px] font-medium leading-tight text-(--color-text)">
                  {technology}
                </span>
                <span className="shrink-0 text-[10px] tabular-nums text-(--color-text-muted)">
                  {count}
                </span>
              </div>
              <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-(--color-border)">
                <div
                  className="h-full rounded-full transition-[filter] duration-200 group-hover:brightness-125 motion-reduce:transition-none"
                  style={{
                    width: String(width) + '%',
                    backgroundColor: stackColors[technology] ?? '#668d83',
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
