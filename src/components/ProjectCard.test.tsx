import { render, screen, within } from '@testing-library/react'
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
  it('keeps equal-size cards and responsive project images', () => {
    for (const project of projects) {
      const rendered = render(<ProjectCard project={project} language="pt" />)
      const card = screen.getByRole('article')

      expect(card).toHaveClass('group', 'h-full', 'flex-col')
      expect(card).not.toHaveClass('lg:col-span-2', 'lg:grid')
      expect(card).toHaveAttribute('id', 'project-' + project.id)
      expect(card.querySelector('div.aspect-video')).toBeInTheDocument()
      expect(card.querySelector('img')).toHaveClass('group-hover:scale-[1.025]', 'motion-reduce:transition-none')
      expect(card.querySelector('img')).toHaveAttribute('sizes', '(min-width: 1024px) 33vw, calc(100vw - 3rem)')
      expect(card.querySelector('dialog')).not.toBeInTheDocument()
      rendered.unmount()
    }
  })

  it('localizes the Ideas Organizer title without changing its description', () => {
    const { rerender } = render(<ProjectCard project={ideasProject} language="pt" />)
    expect(screen.getByRole('heading', { name: 'Organizador de Ideias e Projetos' })).toBeInTheDocument()
    expect(screen.getByText(ideasProject.description.pt)).toBeInTheDocument()

    rerender(<ProjectCard project={ideasProject} language="en" />)
    expect(screen.getByRole('heading', { name: 'Ideas and Projects Organizer' })).toBeInTheDocument()
    expect(screen.getByText(ideasProject.description.en)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ideas and Projects Organizer.*GitHub/ })).toBeInTheDocument()
  })

  it('renders measured technology bars without equal-sized donut slices or usage descriptions', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)

    const graph = screen.getByRole('region', { name: 'Tecnologias por arquivos de código' })
    const bars = within(graph).getAllByRole('listitem')
    expect(bars).toHaveLength(ideasProject.technologies.length)
    expect(within(graph).getByRole('listitem', { name: 'TypeScript: 24 arquivos' })).toBeInTheDocument()
    expect(within(graph).getByRole('listitem', { name: 'Vitest: 4 arquivos' })).toBeInTheDocument()
    expect(graph.querySelector('svg')).not.toBeInTheDocument()
    expect(within(graph).queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText(ideasProject.stackUsage.React.pt)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ver detalhes' })).not.toBeInTheDocument()
  })

  it('preserves every technology and its measured source-file count for each project', () => {
    for (const project of projects) {
      const rendered = render(<ProjectCard project={project} language="en" />)
      const graph = screen.getByRole('region', { name: 'Technologies by source files' })

      expect(Object.keys(project.stackFileCounts).sort()).toEqual([...project.technologies].sort())
      expect(within(graph).getAllByRole('listitem')).toHaveLength(project.technologies.length)

      for (const technology of project.technologies) {
        const count = project.stackFileCounts[technology]
        expect(count).toBeGreaterThan(0)
        expect(within(graph).getByRole('listitem', { name: technology + ': ' + count + ' files' })).toBeInTheDocument()
      }

      expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', project.githubUrl)
      if (project.liveUrl) {
        expect(screen.getByRole('link', { name: /Live Demo/ })).toHaveAttribute('href', project.liveUrl)
      }
      rendered.unmount()
    }
  })
})
