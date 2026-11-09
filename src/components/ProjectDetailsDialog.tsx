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

        <div id={detailsId} className="grid min-w-0 gap-x-6 gap-y-5 px-4 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
          <div className="grid min-w-0 content-start gap-5">
            <section className="min-w-0">
              <h4 className="font-display mb-3 text-sm font-semibold text-(--color-primary)">{text.highlights}</h4>
              <ul className="grid gap-2.5">
                {project.details.features.map((feature) => (
                  <li key={feature.pt} className="flex min-w-0 items-start gap-2.5 text-[13px] leading-6 text-(--color-text-muted) sm:text-sm">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)" />
                    <span className="min-w-0">{feature[language]}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="min-w-0 rounded-xl border border-(--color-border) bg-(--color-background) p-3">
              <h4 className="font-display mb-1.5 text-sm font-semibold text-(--color-primary)">{text.challenge}</h4>
              <p className="text-[13px] leading-6 text-(--color-text-muted) sm:text-sm">{project.details.challenges[language]}</p>
            </section>
          </div>

          <div className="grid min-w-0 content-start gap-5 border-t border-(--color-border) pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <section className="min-w-0 rounded-xl border border-(--color-border) bg-(--color-background) p-3">
              <h4 className="font-display mb-1.5 text-sm font-semibold text-(--color-primary)">{text.architecture}</h4>
              <p className="text-[13px] leading-6 text-(--color-text-muted) sm:text-sm">{project.details.architecture[language]}</p>
            </section>
            <section className="min-w-0">
              <h4 className="font-display mb-1.5 text-sm font-semibold text-(--color-primary)">{text.practices}</h4>
              <p className="text-[13px] leading-6 text-(--color-text-muted) sm:text-sm">{project.details.practices[language]}</p>
            </section>
          </div>

          {project.details.visualReferences && (
            <section className="min-w-0 border-t border-(--color-border) pt-4 sm:col-span-2">
              <h4 className="font-display mb-3 text-sm font-semibold text-(--color-primary)">{text.visual}</h4>
              <ul className="grid min-w-0 gap-2 sm:grid-cols-3">
                {project.details.visualReferences.map((reference) => (
                  <li key={reference.pt} className="min-w-0 break-words rounded-xl border border-(--color-border) bg-(--color-background) px-3 py-2.5 text-xs leading-5 text-(--color-text)">
                    {reference[language]}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-5 text-(--color-text-muted)">{text.inspiration}</p>
            </section>
          )}
        </div>
      </dialog>, document.body)}
    </>
  )
}
