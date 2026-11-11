import { useState } from 'react'
import ExperienceCard from './ExperienceCard'
import { experiences, type ExperienceLanguage } from '../data/experiences'
import { centerMobileSelection } from '../utils/centerMobileSelection'

type ExperienceTimelineProps = {
  language: ExperienceLanguage
  onRelatedProjectClick?: (projectId: string) => void
}

const translations = {
  pt: { navigation: 'Linha do tempo profissional' },
  en: { navigation: 'Professional timeline' },
}

export default function ExperienceTimeline({ language, onRelatedProjectClick }: ExperienceTimelineProps) {
  const [selectedId, setSelectedId] = useState(experiences[0].id)
  const text = translations[language]
  const selectedIndex = experiences.findIndex((experience) => experience.id === selectedId)

  return (
    <div className="grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)] items-start gap-6 lg:items-stretch lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-8">
      <nav aria-label={text.navigation} className="w-full min-w-0 max-w-full lg:h-full">
        <ol data-mobile-selection-track className="technology-category-nav flex w-full min-w-0 max-w-full snap-x snap-proximity flex-nowrap gap-2 overflow-x-auto overscroll-x-contain rounded-3xl border border-(--color-border) bg-(--color-surface) p-2 touch-pan-x lg:grid lg:h-full lg:auto-rows-fr lg:grid-cols-1 lg:gap-3 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pl-8">
          {experiences.map((experience, index) => {
            const isSelected = experience.id === selectedId
            const isReached = index <= selectedIndex

            return (
              <li key={experience.id} className="relative min-w-36 shrink-0 snap-center lg:min-w-0 lg:shrink">
                {index < experiences.length - 1 && (
                  <span
                    aria-hidden="true"
                    data-testid={`timeline-connector-${index}`}
                    data-reached={index < selectedIndex}
                    className="pointer-events-none absolute -left-[2.0625rem] -bottom-[2.625rem] top-[1.875rem] hidden w-0.5 bg-(--color-border) lg:block"
                  >
                    <span
                      className={`absolute inset-0 origin-top bg-(--color-primary) transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        index < selectedIndex ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />
                  </span>
                )}
                <span
                  aria-hidden="true"
                  data-testid={`timeline-node-${index}`}
                  data-reached={isReached}
                  className={`absolute -left-[2.375rem] top-6 z-10 hidden h-3 w-3 rounded-full border-2 border-(--color-background) transition-colors duration-300 lg:block ${
                    isReached ? 'bg-(--color-primary)' : 'bg-(--color-border)'
                  }`}
                />
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls={`experience-panel-${experience.id}`}
                  onClick={(event) => {
                    setSelectedId(experience.id)
                    centerMobileSelection(event.currentTarget, 1024)
                  }}
                  className={`nav-hover-lift relative z-10 flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-center text-sm font-medium transition-[transform,border-color,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transition-none lg:min-h-28 lg:flex-col lg:items-start lg:justify-start lg:whitespace-normal lg:rounded-2xl lg:p-4 lg:text-left ${
                    isSelected
                      ? 'border-(--color-primary) bg-(--color-background)'
                      : 'border-(--color-border) bg-(--color-surface) hover:border-(--color-primary)'
                  }`}
                >
                  <span className="mb-2 hidden text-xs font-medium text-(--color-text-muted) lg:block">
                    {experience.period[language]}
                  </span>
                  <span className={`font-display text-sm font-semibold lg:text-base lg:font-bold ${
                    isSelected ? 'text-(--color-primary)' : 'text-(--color-text)'
                  }`}>
                    <span className="lg:hidden">{experience.id === 'kosei-home' ? 'Kosei Home' : experience.company}</span>
                    <span className="hidden lg:inline">{experience.company}</span>
                  </span>
                  <span className="mt-1 hidden text-xs leading-5 text-(--color-text-muted) lg:line-clamp-2">
                    {experience.role[language]}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="w-full min-w-0 max-w-full lg:h-full">
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
              hidden={!isSelected}
              className={`min-w-0 lg:h-full ${isSelected ? 'block' : 'hidden'}`}
            >
              <ExperienceCard experience={experience} language={language} onRelatedProjectClick={onRelatedProjectClick} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
