import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FileText, X } from 'lucide-react'
import type { Language, Project } from '../data/projects'

type ProjectDetailsDialogProps = {
  project: Project
  language: Language
}

const translations = {
  pt: {
    details: 'Detalhes',
    close: 'Fechar detalhes',
    highlights: 'Destaques',
    architecture: 'Arquitetura',
    challenge: 'Desafio',
    practices: 'Desenvolvimento',
    visual: 'Referências visuais',
    inspiration: 'Inspirações de linguagem visual, sem vínculo com as obras citadas.',
  },
  en: {
    details: 'Details',
    close: 'Close details',
    highlights: 'Highlights',
    architecture: 'Architecture',
    challenge: 'Challenge',
    practices: 'Development',
    visual: 'Visual references',
    inspiration: 'Visual inspirations only; no affiliation with the referenced works.',
  },
}

export default function ProjectDetailsDialog({ project, language }: ProjectDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const text = translations[language]
  const projectName = project.nameTranslations?.[language] ?? project.name
  const detailsId = `project-details-${project.id}`

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={detailsId}
        onClick={() => {
          dialogRef.current?.showModal()
          setIsOpen(true)
        }}
        className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-(--color-border) px-2 py-2 text-xs font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
      >
        <FileText size={14} aria-hidden="true" />
        {text.details}
      </button>

      {createPortal(<dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            event.currentTarget.close()
          }
        }}
        aria-modal="true"
        aria-labelledby={`project-details-title-${project.id}`}
        className="fixed top-1/2 left-1/2 m-0 max-h-[calc(100dvh-1rem)] w-[calc(100vw-1.5rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-(--color-border) bg-(--color-surface) p-0 text-(--color-text) shadow-2xl backdrop:bg-black/70"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-(--color-border) bg-(--color-surface) px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-primary)">
              {project.year} · {text.details}
            </p>
            <h3 id={`project-details-title-${project.id}`} className="font-display mt-1 text-xl font-bold leading-tight sm:text-2xl">
              {projectName}
            </h3>
          </div>
          <button
            type="button"
            aria-label={text.close}
            onClick={() => dialogRef.current?.close()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--color-border) hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div id={detailsId} className="grid gap-3 px-4 py-3 sm:grid-cols-[1fr_0.95fr] sm:gap-5 sm:px-6 sm:py-5">
          <section className="min-w-0">
            <h4 className="font-display mb-2 text-base font-semibold text-(--color-primary)">{text.highlights}</h4>
            <ul className="grid gap-2">
              {project.details.features.map((feature) => (
                <li key={feature.pt} className="flex items-start gap-2 text-[13px] leading-5 text-(--color-text-muted) sm:text-sm sm:leading-6">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)" />
                  {feature[language]}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid min-w-0 content-start gap-2.5 border-t border-(--color-border) pt-3 sm:gap-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
            <section className="rounded-xl bg-(--color-background) p-2.5 sm:p-3">
              <h4 className="font-display mb-1 text-sm font-semibold text-(--color-primary)">{text.architecture}</h4>
              <p className="text-[13px] leading-5 text-(--color-text-muted) sm:text-sm">{project.details.architecture[language]}</p>
            </section>
            <section className="project-dialog-secondary">
              <h4 className="font-display mb-1 text-sm font-semibold">{text.challenge}</h4>
              <p className="text-[13px] leading-5 text-(--color-text-muted) sm:text-sm">{project.details.challenges[language]}</p>
            </section>
            <section className="project-dialog-secondary">
              <h4 className="font-display mb-1 text-sm font-semibold">{text.practices}</h4>
              <p className="text-[13px] leading-5 text-(--color-text-muted) sm:text-sm">{project.details.practices[language]}</p>
            </section>
            {project.details.visualReferences && (
              <section className="border-t border-(--color-border) pt-2">
                <h4 className="font-display mb-1.5 text-sm font-semibold text-(--color-primary)">{text.visual}</h4>
                <div className="flex items-center gap-3">
                  <img
                    src={project.image}
                    alt={project.imageAlt[language]}
                    loading="lazy"
                    className="hidden h-16 w-24 shrink-0 rounded-lg border border-(--color-border) object-cover [@media(min-height:700px)]:block"
                  />
                  <div className="min-w-0">
                    <ul className="flex flex-wrap gap-1">
                      {project.details.visualReferences.map((reference) => (
                        <li key={reference.pt} className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-0.5 text-[11px] leading-4 text-(--color-text)">
                          {reference[language]}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-[11px] leading-4 text-(--color-text-muted)">{text.inspiration}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </dialog>, document.body)}
    </>
  )
}
