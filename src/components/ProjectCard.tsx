
import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
} from 'lucide-react'
import type { Language, Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  language: Language
}

const translations = {
  pt: {
    showDetails: 'Ver detalhes',
    hideDetails: 'Ocultar detalhes',
    repository: 'GitHub',
    liveDemo: 'Visitar projeto',
    features: 'Funcionalidades',
    architecture: 'Arquitetura e decisões técnicas',
    challenges: 'Desafios',
    practices: 'Práticas de desenvolvimento',
    opensNewTab: 'Abre em uma nova aba',
  },
  en: {
    showDetails: 'View details',
    hideDetails: 'Hide details',
    repository: 'GitHub',
    liveDemo: 'Live Demo',
    features: 'Features',
    architecture: 'Architecture and technical decisions',
    challenges: 'Challenges',
    practices: 'Development practices',
    opensNewTab: 'Opens in a new tab',
  },
}

export default function ProjectCard({
  project,
  language,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const text = translations[language]
  const detailsId = `project-details-${project.id}`

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)">
      {/* ILUSTRAÇÃO */}
      <div className="aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-background)">
        <img
          src={project.image}
          alt={project.imageAlt[language]}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <span className="mb-3 text-sm font-medium text-(--color-primary)">
          {project.year}
        </span>

        <h3 className="font-display text-2xl font-bold tracking-tight text-(--color-text)">
          {project.name}
        </h3>

        <p className="mt-4 text-sm leading-7 text-(--color-text-muted) sm:text-base">
          {project.description[language]}
        </p>

        {/* TECNOLOGIAS */}
        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={
            language === 'pt'
              ? 'Tecnologias utilizadas'
              : 'Technologies used'
          }
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-xs font-medium text-(--color-text-muted)"
            >
              {technology}
            </li>
          ))}
        </ul>

        {/* DETALHES EXPANSÍVEIS */}
        <div className="mt-6">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() =>
              setIsExpanded((current) => !current)
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
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

          {isExpanded && (
            <div
              id={detailsId}
              className="mt-6 space-y-5 border-t border-(--color-border) pt-6"
            >
              <div>
                <h4 className="font-display mb-3 text-base font-semibold text-(--color-text)">
                  {text.features}
                </h4>

                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-(--color-text-muted)">
                  {project.details.features.map(
                    (feature, index) => (
                      <li key={index}>
                        {feature[language]}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-display mb-2 text-base font-semibold text-(--color-text)">
                  {text.architecture}
                </h4>

                <p className="text-sm leading-7 text-(--color-text-muted)">
                  {project.details.architecture[language]}
                </p>
              </div>

              <div>
                <h4 className="font-display mb-2 text-base font-semibold text-(--color-text)">
                  {text.challenges}
                </h4>

                <p className="text-sm leading-7 text-(--color-text-muted)">
                  {project.details.challenges[language]}
                </p>
              </div>

              <div>
                <h4 className="font-display mb-2 text-base font-semibold text-(--color-text)">
                  {text.practices}
                </h4>

                <p className="text-sm leading-7 text-(--color-text-muted)">
                  {project.details.practices[language]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* LINKS EXTERNOS */}
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} — ${text.repository}. ${text.opensNewTab}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            <Code2 size={17} aria-hidden="true" />
            {text.repository}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — ${text.liveDemo}. ${text.opensNewTab}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              {text.liveDemo}
              <ArrowUpRight
                size={17}
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
