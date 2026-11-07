import { ArrowUpRight, Code2 } from 'lucide-react'
import type { Language, Project } from '../data/projects'
import ProjectStackChart from './ProjectStackChart'

type ProjectCardProps = {
  project: Project
  language: Language
}

const translations = {
  pt: {
    repository: 'GitHub',
    liveDemo: 'Visitar projeto',
    opensNewTab: 'Abre em uma nova aba',
  },
  en: {
    repository: 'GitHub',
    liveDemo: 'Live Demo',
    opensNewTab: 'Opens in a new tab',
  },
}

export default function ProjectCard({ project, language }: ProjectCardProps) {
  const text = translations[language]
  const projectName = project.nameTranslations?.[language] ?? project.name

  return (
    <article
      id={`project-${project.id}`}
      className="group flex h-full min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)"
    >
      <div className="aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-background)">
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          sizes="(min-width: 1024px) 33vw, calc(100vw - 3rem)"
          alt={project.imageAlt[language]}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:transform-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-7">
        <div>
          <span className="mb-3 block text-sm font-medium text-(--color-primary)">
            {project.year}
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-(--color-text) sm:text-2xl">
            {projectName}
          </h3>
          <p className="mt-4 text-sm leading-7 text-(--color-text-muted) sm:text-base">
            {project.description[language]}
          </p>
        </div>

        <ProjectStackChart project={project} language={language} />

        <div className="mt-auto flex flex-wrap justify-center gap-2.5 pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${projectName} — ${text.repository}. ${text.opensNewTab}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) px-3 py-2.5 text-xs font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) xl:px-5 xl:text-sm"
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
              aria-label={`${projectName} — ${text.liveDemo}. ${text.opensNewTab}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0b3d3e] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#082e2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) xl:px-5 xl:text-sm"
            >
              {text.liveDemo}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
