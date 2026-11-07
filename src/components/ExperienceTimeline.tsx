import { useState } from 'react'
import ExperienceCard from './ExperienceCard'
import { experiences, type ExperienceLanguage } from '../data/experiences'

type ExperienceTimelineProps = {
  language: ExperienceLanguage
}

const translations = {
  pt: { navigation: 'Linha do tempo profissional' },
  en: { navigation: 'Professional timeline' },
}

export default function ExperienceTimeline({ language }: ExperienceTimelineProps) {
  const [selectedId, setSelectedId] = useState(experiences[0].id)
  const text = translations[language]

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-8">
      <nav aria-label={text.navigation}>
        <ol className="grid gap-3 sm:grid-cols-3 lg:relative lg:grid-cols-1 lg:border-l-2 lg:border-(--color-border) lg:pl-5">
          {experiences.map((experience) => {
            const isSelected = experience.id === selectedId

            return (
              <li key={experience.id} className="relative min-w-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[1.7rem] top-6 hidden h-3 w-3 rounded-full border-2 border-(--color-background) lg:block ${
                    isSelected ? 'bg-(--color-primary)' : 'bg-(--color-border)'
                  }`}
                />
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls={`experience-panel-${experience.id}`}
                  onClick={() => setSelectedId(experience.id)}
                  className={`flex h-full min-h-28 w-full flex-col items-start rounded-2xl border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transition-none ${
                    isSelected
                      ? 'border-(--color-primary) bg-(--color-background)'
                      : 'border-(--color-border) bg-(--color-surface) hover:border-(--color-primary)'
                  }`}
                >
                  <span className="mb-2 text-xs font-medium text-(--color-text-muted)">
                    {experience.period[language]}
                  </span>
                  <span className={`font-display text-base font-bold ${
                    isSelected ? 'text-(--color-primary)' : 'text-(--color-text)'
                  }`}>
                    {experience.company}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs leading-5 text-(--color-text-muted)">
                    {experience.role[language]}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="grid min-w-0">
        {experiences.map((experience) => {
          const isSelected = experience.id === selectedId

          return (
            <div
              key={experience.id}
              id={`experience-panel-${experience.id}`}
              role="region"
              aria-label={`${experience.role[language]} — ${experience.company}`}
              aria-hidden={!isSelected}
              inert={!isSelected}
              className={`col-start-1 row-start-1 min-w-0 transition-opacity duration-200 motion-reduce:transition-none ${
                isSelected ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
              }`}
            >
              <ExperienceCard experience={experience} language={language} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
