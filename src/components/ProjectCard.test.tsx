import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const ideasProject = projects.find((project) => project.id === 'ideas-organizer')
const adventureProject = projects.find((project) => project.id === 'adventure-files')
const natsuProject = projects.find((project) => project.id === 'natsu-matsuri')

if (!ideasProject || !adventureProject || !natsuProject) {
  throw new Error('Required portfolio projects are missing.')
}

describe('ProjectCard', () => {
  it('keeps identical card structure and responsive images', () => {
    const { unmount } = render(<ProjectCard project={ideasProject} language="pt" />)
    const card = screen.getByRole('article')

    expect(card).toHaveClass('group', 'h-full', 'flex-col')
    expect(card).not.toHaveClass('lg:col-span-2', 'lg:grid')
    expect(card).toHaveAttribute('id', 'project-ideas-organizer')
    expect(card.querySelector('div.aspect-video')).toBeInTheDocument()
    expect(card.querySelector('img')).toHaveClass('group-hover:scale-[1.025]', 'motion-reduce:transition-none')
    expect(card.querySelector('img')).toHaveAttribute('sizes', '(min-width: 1024px) 33vw, calc(100vw - 3rem)')
    expect(card.querySelector('dialog')).not.toBeInTheDocument()
    unmount()

    for (const project of [adventureProject, natsuProject]) {
      const rendered = render(<ProjectCard project={project} language="pt" />)
      expect(screen.getByRole('article')).toHaveClass('group', 'h-full', 'flex-col')
      rendered.unmount()
    }
  })

  it('shows the existing project content with an interactive stack chart', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)

    expect(screen.getByRole('heading', { name: ideasProject.name })).toBeInTheDocument()
    expect(screen.getByText(ideasProject.description.pt)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: ideasProject.imageAlt.pt })).toBeInTheDocument()

    const legend = screen.getByRole('group', { name: 'Tecnologias do projeto' })
    expect(within(legend).getAllByRole('button')).toHaveLength(ideasProject.technologies.length)
    expect(within(legend).getByRole('button', { name: `${ideasProject.name} — React` })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(ideasProject.stackUsage.React.pt)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ver detalhes' })).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('changes the short usage description from the chart legend', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)
    const legend = screen.getByRole('group', { name: 'Tecnologias do projeto' })

    fireEvent.click(within(legend).getByRole('button', { name: `${ideasProject.name} — Vitest` }))
    expect(within(legend).getByRole('button', { name: `${ideasProject.name} — Vitest` })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(ideasProject.stackUsage.Vitest.pt)).toBeInTheDocument()
    expect(within(legend).getByRole('button', { name: `${ideasProject.name} — React` })).toHaveAttribute('aria-pressed', 'false')
  })

  it('supports pointer and keyboard selection on chart segments', () => {
    render(<ProjectCard project={adventureProject} language="pt" />)

    const typescriptSegment = screen.getByRole('button', { name: 'Ver uso de TypeScript' })
    fireEvent.click(typescriptSegment)
    expect(screen.getByText(adventureProject.stackUsage.TypeScript.pt)).toBeInTheDocument()

    const databaseSegment = screen.getByRole('button', { name: 'Ver uso de PostgreSQL' })
    fireEvent.keyDown(databaseSegment, { key: 'Enter' })
    expect(screen.getByText(adventureProject.stackUsage.PostgreSQL.pt)).toBeInTheDocument()
    fireEvent.keyDown(typescriptSegment, { key: ' ' })
    expect(screen.getByText(adventureProject.stackUsage.TypeScript.pt)).toBeInTheDocument()
  })

  it('keeps the selected technology when switching languages', () => {
    const { rerender } = render(<ProjectCard project={ideasProject} language="pt" />)
    fireEvent.click(within(screen.getByRole('group', { name: 'Tecnologias do projeto' })).getByRole('button', { name: `${ideasProject.name} — Vitest` }))

    rerender(<ProjectCard project={ideasProject} language="en" />)
    const legend = screen.getByRole('group', { name: 'Project technologies' })
    expect(within(legend).getByRole('button', { name: `${ideasProject.name} — Vitest` })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(ideasProject.stackUsage.Vitest.en)).toBeInTheDocument()
  })

  it('preserves links and technology inventories for every project', () => {
    for (const project of projects) {
      const rendered = render(<ProjectCard project={project} language="pt" />)

      expect(Object.keys(project.stackUsage).sort()).toEqual([...project.technologies].sort())
      const legend = screen.getByRole('group', { name: 'Tecnologias do projeto' })
      expect(within(legend).getAllByRole('button')).toHaveLength(project.technologies.length)
      expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', project.githubUrl)

      if (project.liveUrl) {
        expect(screen.getByRole('link', { name: /Visitar projeto/ })).toHaveAttribute('href', project.liveUrl)
      }
      rendered.unmount()
    }
  })
})
