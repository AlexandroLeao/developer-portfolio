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
  Docker: '#4d94cb',
  OpenAPI: '#91a653',
  Playwright: '#b178a2',
  'Tailwind CSS': '#51aaa7',
  'TanStack Router': '#a88183',
  Vitest: '#ac9b5d',
  JavaScript: '#c6a24e',
  'styled-components': '#a27f9f',
  LocalStorage: '#668c9d',
}

const translations = {
  pt: {
    ariaLabel: 'Distribuição das tecnologias do projeto',
    method: 'As fatias representam associações selecionadas de arquivos de código e ferramentas. Um mesmo arquivo pode aparecer em mais de uma stack; não são percentuais de linguagens.',
  },
  en: {
    ariaLabel: 'Project technology distribution',
    method: 'Slices reflect selected code and tooling file associations. The same file may belong to more than one stack; these are not language percentages.',
  },
}

function pointOnCircle(fraction: number) {
  const angle = fraction * Math.PI * 2 - Math.PI / 2
  return {
    x: Number((50 + 44 * Math.cos(angle)).toFixed(4)),
    y: Number((50 + 44 * Math.sin(angle)).toFixed(4)),
  }
}

function slicePath(start: number, end: number) {
  const from = pointOnCircle(start)
  const to = pointOnCircle(end)
  const largeArc = end - start > 0.5 ? 1 : 0

  return [
    'M 50 50',
    'L ' + from.x + ' ' + from.y,
    'A 44 44 0 ' + largeArc + ' 1 ' + to.x + ' ' + to.y,
    'Z',
  ].join(' ')
}

// Manual snapshots: 2026-11-07 for other projects; 2026-11-12 for Adventure Files.
// See the quality guide for the selected code/tooling association rules.
export default function ProjectStackChart({ project, language }: ProjectStackChartProps) {
  const text = translations[language]
  const total = Math.max(
    1,
    project.technologies.reduce((sum, technology) => sum + (project.stackFileCounts[technology] ?? 0), 0),
  )
  const slices = project.technologies.map((technology, index) => {
    const count = project.stackFileCounts[technology] ?? 0
    const precedingFiles = project.technologies
      .slice(0, index)
      .reduce((sum, previous) => sum + (project.stackFileCounts[previous] ?? 0), 0)
    const start = precedingFiles / total
    const end = (precedingFiles + count) / total

    return { technology, count, path: slicePath(start, end) }
  })

  return (
    <figure className="min-w-0 border-t border-(--color-border) pt-4" aria-label={text.ariaLabel}>
      <div className="flex min-h-24 items-center gap-3">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={text.ariaLabel}
          className="h-22 w-22 shrink-0 overflow-visible drop-shadow-sm"
        >
          {slices.map(({ technology, count, path }) => (
            <path
              key={technology}
              data-stack={technology}
              data-files={count}
              d={path}
              fill={stackColors[technology] ?? '#668d83'}
              stroke="var(--color-surface)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              className="transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none"
            >
              <title>{technology}</title>
            </path>
          ))}
        </svg>

        <ul aria-label={text.ariaLabel} className="grid min-w-0 flex-1 grid-cols-2 gap-x-2 gap-y-1.5">
          {project.technologies.map((technology) => (
            <li key={technology} className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium leading-tight text-(--color-text)">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: stackColors[technology] ?? '#668d83' }}
              />
              <span className="min-w-0 break-words">{technology}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="sr-only">{text.method}</figcaption>
    </figure>
  )
}
