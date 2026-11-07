import { useState } from 'react'
import { Code2 } from 'lucide-react'
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
    ariaLabel: 'Tecnologias do projeto',
    stackRole: 'Ver uso de',
  },
  en: {
    ariaLabel: 'Project technologies',
    stackRole: 'See how I used',
  },
}

export default function ProjectStackChart({ project, language }: ProjectStackChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const text = translations[language]
  const activeTechnology = project.technologies[activeIndex] ?? project.technologies[0]
  const usage = project.stackUsage[activeTechnology]?.[language]
  const segmentSize = 100 / project.technologies.length
  const visibleSegment = segmentSize - 1.8

  return (
    <div className="border-t border-(--color-border) pt-3">
      <div className="flex min-h-24 items-center gap-2.5">
        <div className="relative h-20 w-20 shrink-0">
          <svg
            viewBox="0 0 120 120"
            aria-label={`${project.name} — ${text.ariaLabel}`}
            className="h-full w-full overflow-visible"
          >
            <circle cx="60" cy="60" r="42" fill="none" stroke="var(--color-border)" strokeWidth="13" />
            {project.technologies.map((technology, index) => {
              const isActive = index === activeIndex

              return (
                <circle
                  key={technology}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${text.stackRole} ${technology}`}
                  cx="60"
                  cy="60"
                  r="42"
                  pathLength={100}
                  fill="none"
                  stroke={stackColors[technology] ?? '#668d83'}
                  strokeWidth={isActive ? 17 : 13}
                  strokeDasharray={`${visibleSegment} ${100 - visibleSegment}`}
                  strokeDashoffset={-index * segmentSize}
                  transform="rotate(-90 60 60)"
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveIndex(index)
                    }
                  }}
                  className="cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-primary) motion-reduce:transition-none"
                  style={{ filter: isActive ? 'drop-shadow(0 0 3px rgba(19, 154, 136, 0.26))' : undefined }}
                />
              )
            })}
          </svg>
          <Code2
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-(--color-primary)"
          />
        </div>

        <div role="group" aria-label={text.ariaLabel} className="grid min-w-0 flex-1 grid-cols-2 gap-x-1 gap-y-0.5">
          {project.technologies.map((technology, index) => (
            <button
              key={technology}
              type="button"
              aria-pressed={index === activeIndex}
              title={technology}
              onClick={() => setActiveIndex(index)}
              className={`flex min-h-6 min-w-0 items-center gap-1 rounded-md border px-1 py-1 text-left text-[10px] font-medium leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-primary) ${
                index === activeIndex
                  ? 'border-(--color-border) bg-(--color-background) text-(--color-text)'
                  : 'border-transparent text-(--color-text-muted)'
              }`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: stackColors[technology] ?? '#668d83' }}
              />
              <span className="min-w-0 break-words">{technology}</span>
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="mt-2 flex min-h-12 items-center rounded-xl border border-(--color-border) bg-(--color-background) px-2.5 py-1.5">
        <p className="text-xs leading-4 text-(--color-text-muted)">
          <strong className="font-semibold text-(--color-text)">{activeTechnology} — </strong>
          {usage}
        </p>
      </div>
    </div>
  )
}
