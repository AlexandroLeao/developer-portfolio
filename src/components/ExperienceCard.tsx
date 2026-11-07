import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Experience, ExperienceLanguage } from '../data/experiences'

type ExperienceCardProps = {
  experience: Experience
  language: ExperienceLanguage
}

const translations = {
  pt: {
    contributions: 'Principais contribuições',
    skills: 'Competências',
    relatedProject: 'Ver projeto relacionado',
  },
  en: {
    contributions: 'Key contributions',
    skills: 'Skills',
    relatedProject: 'View related project',
  },
}

export default function ExperienceCard({
  experience,
  language,
}: ExperienceCardProps) {
  const text = translations[language]

  return (
    <article className="grid min-w-0 gap-5 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 sm:p-6 lg:h-full lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6 lg:p-7">
      <div className="flex min-w-0 flex-col gap-4">
        <header>
          <div className="mb-3 flex flex-wrap items-center gap-2">
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
          <p className="mt-2 text-base font-semibold text-(--color-primary)">
            {experience.company}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-(--color-text-muted)">
            <MapPin size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            <span>{experience.location[language]}</span>
          </p>
        </header>

        <p className="text-sm leading-7 text-(--color-text-muted) sm:text-base">
          {experience.summary[language]}
        </p>

        <section className="border-t border-(--color-border) pt-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
            {text.skills}
          </h4>
          <ul className="grid grid-cols-2 gap-2">
            {experience.skills.map((skill, index) => (
              <li
                key={`${experience.id}-skill-${index}`}
                className="flex min-h-10 min-w-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-background) px-3 py-2 text-center text-xs font-medium leading-5 text-(--color-text)"
              >
                <span>{skill[language]}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      <section className="flex min-w-0 flex-col border-t border-(--color-border) pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <h4 className="font-display mb-4 text-base font-semibold text-(--color-text)">
          {text.contributions}
        </h4>
        <ul className="divide-y divide-(--color-border)">
          {experience.contributions.map((contribution, index) => (
            <li
              key={`${experience.id}-contribution-${index}`}
              className="flex items-start gap-3 py-3 text-sm leading-6 text-(--color-text-muted) first:pt-0 last:pb-0"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)" />
              <span>{contribution[language]}</span>
            </li>
          ))}
        </ul>
        {experience.relatedProject && (
          <div className="mt-auto border-t border-(--color-border) pt-3 text-right">
            <a
              href={experience.relatedProject.href}
              className="inline-flex min-h-10 items-center justify-end gap-2 rounded-full text-sm font-semibold text-(--color-primary) transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              {text.relatedProject}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p className="text-xs text-(--color-text-muted)">
              {experience.relatedProject.name}
            </p>
          </div>
        )}
      </section>
    </article>
  )
}
