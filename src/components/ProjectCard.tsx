
import { useRef, useState } from 'react'
import {
  ArrowUpRight,
  FileText,
  Code2,
  X,
} from 'lucide-react'
import type { Language, Project } from '../data/projects'

const detailTabs = ['features', 'architecture', 'challenges', 'practices'] as const
type DetailTab = (typeof detailTabs)[number]

type ProjectCardProps = {
  project: Project
  language: Language
}

const translations = {
  pt: {
    showDetails: 'Ver detalhes',
    caseStudy: 'Estudo de caso',
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
    caseStudy: 'Case study',
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
  const [activeTab, setActiveTab] = useState<DetailTab>('features')
  const dialogRef = useRef<HTMLDialogElement>(null)

  const text = translations[language]
  const detailsId = `project-details-${project.id}`

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)">
      {/* ILUSTRAÇÃO */}
      <div className="aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-background)">
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          sizes="(min-width: 1024px) 33vw, calc(100vw - 3rem)"
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

        {/* DETALHES DO PROJETO */}
        <div className="mt-auto flex justify-center pt-6">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => {
              setActiveTab('features')
              dialogRef.current?.showModal()
              setIsExpanded(true)
            }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-background) px-5 py-2.5 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            <FileText size={17} aria-hidden="true" />
            {text.showDetails}
          </button>
        </div>

        <dialog
          ref={dialogRef}
          onClose={() => setIsExpanded(false)}
          aria-modal="true"
          aria-labelledby={`project-dialog-title-${project.id}`}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return
            const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < left || event.clientX > right ||
              event.clientY < top || event.clientY > bottom
            ) {
              dialogRef.current?.close()
            }
          }}
          className="fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,48rem)] overflow-y-auto rounded-3xl border border-(--color-border) bg-(--color-surface) p-0 text-(--color-text) shadow-2xl backdrop:bg-black/70"
        >
          <div className="flex items-center justify-between gap-4 border-b border-(--color-border) px-5 py-4 sm:px-7 sm:py-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-(--color-primary)">
                {text.caseStudy}
              </span>
              <h3 id={`project-dialog-title-${project.id}`} className="font-display mt-1 text-xl font-bold leading-snug sm:text-2xl">
                {project.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={text.hideDetails}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--color-border) text-(--color-text) hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div
            role="tablist"
            aria-label={text.caseStudy}
            onKeyDown={(event) => {
              const currentIndex = detailTabs.indexOf(activeTab)
              let nextIndex = currentIndex
              if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % detailTabs.length
              else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + detailTabs.length) % detailTabs.length
              else if (event.key === 'Home') nextIndex = 0
              else if (event.key === 'End') nextIndex = detailTabs.length - 1
              else return
              event.preventDefault()
              setActiveTab(detailTabs[nextIndex])
              event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus()
            }}
            className="flex flex-wrap gap-2 border-b border-(--color-border) px-5 py-3 sm:px-7"
          >
            {detailTabs.map((tab) => (
              <button
                key={tab}
                id={`project-tab-${project.id}-${tab}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={detailsId}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) ${
                  activeTab === tab
                    ? 'border-(--color-primary) bg-(--color-background) text-(--color-primary)'
                    : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary) hover:text-(--color-primary)'
                }`}
              >
                {text[tab]}
              </button>
            ))}
          </div>

          <div
            id={detailsId}
            role="tabpanel"
            aria-labelledby={`project-tab-${project.id}-${activeTab}`}
            tabIndex={0}
            className="p-5 sm:p-7"
          >
            <h4 className="font-display mb-4 text-lg font-semibold text-(--color-text)">
              {text[activeTab]}
            </h4>

            {activeTab === 'features' ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.details.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-(--color-border) bg-(--color-background) p-3 text-sm leading-6 text-(--color-text-muted)"
                  >
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-(--color-primary)" />
                    <span>{feature[language]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-l-2 border-(--color-primary) bg-(--color-background) px-5 py-4 text-base leading-7 text-(--color-text-muted)">
                {project.details[activeTab][language]}
              </p>
            )}
          </div>
        </dialog>

        {/* LINKS EXTERNOS */}
        <div className="mt-3 flex flex-wrap justify-center gap-3">
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
