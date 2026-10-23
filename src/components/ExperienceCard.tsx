
import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  MapPin,
} from 'lucide-react'
import type {
  Experience,
  ExperienceLanguage,
} from '../data/experiences'

type ExperienceCardProps = {
  experience: Experience
  language: ExperienceLanguage
}

const translations = {
  pt: {
    showDetails: 'Ver detalhes',
    hideDetails: 'Ocultar detalhes',
    contributions: 'Principais contribuições',
    skills: 'Competências',
    relatedProject: 'Ver projeto relacionado',
  },
  en: {
    showDetails: 'View details',
    hideDetails: 'Hide details',
    contributions: 'Key contributions',
    skills: 'Skills',
    relatedProject: 'View related project',
  },
}

export default function ExperienceCard({
  experience,
  language,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const text = translations[language]
  const detailsId = `experience-details-${experience.id}`

  return (
    <article className="relative min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 transition-colors duration-300 sm:p-7 lg:p-8">
      {/* CARGO E EMPRESA */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-xs font-medium text-(--color-primary)">
            {experience.period[language]}
          </span>

          <span className="text-xs font-medium text-(--color-text-muted)">
            {experience.employmentType[language]}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-(--color-text) sm:text-2xl">
          {experience.role[language]}
        </h3>

        <p className="text-base font-semibold text-(--color-primary)">
          {experience.company}
        </p>

        <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
          <MapPin
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0"
          />

          <span>{experience.location[language]}</span>
        </div>
      </div>

      {/* RESUMO PROFISSIONAL */}
      <p className="mt-5 text-sm leading-7 text-(--color-text-muted) sm:text-base sm:leading-8">
        {experience.summary[language]}
      </p>

      {/* COMPETÊNCIAS */}
      <div className="mt-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
          {text.skills}
        </h4>

        <ul className="flex flex-wrap gap-2">
          {experience.skills.map((skill, index) => (
            <li
              key={`${experience.id}-skill-${index}`}
              className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-xs font-medium text-(--color-text)"
            >
              {skill[language]}
            </li>
          ))}
        </ul>
      </div>

      {/* BOTÃO DE EXPANSÃO */}
      <div className="mt-7 border-t border-(--color-border) pt-5">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => {
            setIsExpanded((current) => !current)
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-text) transition-colors duration-200 hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
        >
          {isExpanded
            ? text.hideDetails
            : text.showDetails}

          <ChevronDown
            size={17}
            aria-hidden="true"
            className={`transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* CONTRIBUIÇÕES EXPANSÍVEIS */}
        {isExpanded && (
          <div
            id={detailsId}
            role="region"
            aria-label={`${text.contributions} — ${experience.company}`}
            className="mt-6 space-y-5"
          >
            <div>
              <h4 className="font-display mb-4 text-base font-semibold text-(--color-text) sm:text-lg">
                {text.contributions}
              </h4>

              <ul className="space-y-3">
                {experience.contributions.map(
                  (contribution, index) => (
                    <li
                      key={`${experience.id}-contribution-${index}`}
                      className="flex items-start gap-3 text-sm leading-7 text-(--color-text-muted) sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)"
                      />

                      <span>
                        {contribution[language]}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* PROJETO RELACIONADO */}
            {experience.relatedProject && (
              <div className="border-t border-(--color-border) pt-5">
                <a
                  href={experience.relatedProject.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-(--color-primary) transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
                >
                  {text.relatedProject}

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </a>

                <p className="mt-1 text-xs text-(--color-text-muted)">
                  {experience.relatedProject.name}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
