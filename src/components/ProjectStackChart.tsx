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
    ariaLabel: 'Distribuição das tecnologias do projeto',
    method: 'As fatias representam a proporção de arquivos associados a cada stack. Um mesmo arquivo pode utilizar mais de uma tecnologia.',
  },
  en: {
    ariaLabel: 'Project technology distribution',
    method: 'Slices reflect the relative number of files associated with each stack. The same file may use more than one technology.',
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

// Repository snapshot: 2026-11-07. Proportions use measured source-file
// associations, not mutually exclusive language percentages.
export default function ProjectStackChart({ project, language }: ProjectStackChartProps) {
  const text = translations[language]
  const total = Math.max(
    1,
    project.technologies.reduce((sum, technology) => sum + (project.stackFileCounts[technology] ?? 0), 0),
  )
  let offset = 0

  const slices = project.technologies.map((technology) => {
    const count = project.stackFileCounts[technology] ?? 0
    const start = offset
    const end = offset + count / total
    offset = end

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
