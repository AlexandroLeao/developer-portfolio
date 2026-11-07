import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const ideasProject = projects.find((project) => project.id === 'ideas-organizer')
const adventureProject = projects.find((project) => project.id === 'adventure-files')
const natsuProject = projects.find((project) => project.id === 'natsu-matsuri')

if (!ideasProject || !adventureProject || !natsuProject) {
  throw new Error('Required portfolio projects are missing.')
}

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
})

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
      expect(document.getElementById('project-details-' + project.id)?.closest('dialog')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Detalhes' })).toBeInTheDocument()
      rendered.unmount()
    }
  })

  it('shows Ideas and Projects Organizer in both languages', () => {
    const { rerender } = render(<ProjectCard project={ideasProject} language="pt" />)
    expect(screen.getByRole('heading', { name: 'Ideas and Projects Organizer' })).toHaveClass('text-xl', 'sm:text-2xl')
    expect(screen.getByText(ideasProject.description.pt)).toHaveClass('text-sm', 'sm:text-base')

    rerender(<ProjectCard project={ideasProject} language="en" />)
    expect(screen.getByRole('heading', { name: 'Ideas and Projects Organizer' })).toBeInTheDocument()
    expect(screen.getByText(ideasProject.description.en)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ideas and Projects Organizer.*GitHub/ })).toBeInTheDocument()
  })

  it('renders a proportional pie with stack names but no visible counts or descriptions', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)

    const graph = screen.getByRole('figure', { name: 'Distribuição das tecnologias do projeto' })
    expect(within(graph).getByRole('img', { name: 'Distribuição das tecnologias do projeto' })).toBeInTheDocument()
    const slices = graph.querySelectorAll('svg path')
    expect(slices).toHaveLength(ideasProject.technologies.length)
    expect(graph.querySelector('svg [tabindex]')).not.toBeInTheDocument()
    expect(graph.querySelector('button')).not.toBeInTheDocument()

    const legend = within(graph).getByRole('list', { name: 'Distribuição das tecnologias do projeto' })
    expect(within(legend).getAllByRole('listitem')).toHaveLength(ideasProject.technologies.length)
    for (const technology of ideasProject.technologies) {
      expect(within(legend).getByText(technology)).toBeInTheDocument()
    }
    expect(slices[1]).toHaveAttribute('data-stack', 'TypeScript')
    expect(slices[1]).toHaveAttribute('data-files', '24')
    expect(slices[4]).toHaveAttribute('data-files', '4')
    expect(within(graph).queryByText('24')).not.toBeInTheDocument()
    expect(screen.queryByText(ideasProject.stackUsage.React.pt)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Detalhes' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('includes every measured stack and preserves project links in PT/EN', () => {
    for (const project of projects) {
      const rendered = render(<ProjectCard project={project} language="en" />)
      const graph = screen.getByRole('figure', { name: 'Project technology distribution' })
      const slices = graph.querySelectorAll('svg path')

      expect(Object.keys(project.stackFileCounts).sort()).toEqual([...project.technologies].sort())
      expect(slices).toHaveLength(project.technologies.length)

      project.technologies.forEach((technology, index) => {
        expect(project.stackFileCounts[technology]).toBeGreaterThan(0)
        expect(slices[index]).toHaveAttribute('data-stack', technology)
        expect(slices[index]).toHaveAttribute('data-files', String(project.stackFileCounts[technology]))
      })

      expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', project.githubUrl)
      if (project.liveUrl) {
        expect(screen.getByRole('link', { name: /Visit/ })).toHaveAttribute('href', project.liveUrl)
      }
      rendered.unmount()
    }
  })

  it('shows concise bilingual details and visual references for Adventure Files', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<ProjectCard project={adventureProject} language="pt" />)
    await user.click(screen.getByRole('button', { name: 'Detalhes' }))

    const dialog = screen.getByRole('dialog', { name: 'Adventure Files' })
    expect(dialog).toHaveClass('max-h-[calc(100dvh-1rem)]')
    expect(dialog).toHaveClass('top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'max-w-3xl')
    expect(dialog.parentElement).toBe(document.body)
    expect(within(dialog).getByText(adventureProject.details.features[0].pt)).toBeInTheDocument()
    expect(within(dialog).getByText('Referências visuais')).toBeInTheDocument()
    expect(within(dialog).getByText(/Zelda · Pokémon/)).toBeInTheDocument()

    rerender(<ProjectCard project={adventureProject} language="en" />)
    expect(within(dialog).getByText('Visual references')).toBeInTheDocument()
    expect(within(dialog).getByText(adventureProject.details.architecture.en)).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Close details' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('anchors the stack chart to the bottom of each project card', () => {
    for (const project of projects) {
      const rendered = render(<ProjectCard project={project} language="en" />)
      const chart = screen.getByRole('figure', { name: 'Project technology distribution' })
      expect(chart.parentElement).toHaveClass('mt-auto')
      expect(chart.parentElement?.nextElementSibling).toHaveClass('flex', 'items-center')
      rendered.unmount()
    }
  })

  it('dismisses project details on a backdrop click but not on content clicks', async () => {
    const user = userEvent.setup()
    render(<ProjectCard project={ideasProject} language="pt" />)
    await user.click(screen.getByRole('button', { name: 'Detalhes' }))
    const dialog = screen.getByRole('dialog', { name: 'Ideas and Projects Organizer' })
    const originalRect = dialog.getBoundingClientRect.bind(dialog)
    const rectSpy = vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
      ...originalRect(), left: 20, top: 20, right: 400, bottom: 400,
    } as DOMRect)

    fireEvent.click(within(dialog).getByText('Destaques'), { clientX: 100, clientY: 100 })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(dialog, { clientX: 0, clientY: 0 })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Detalhes' })).toHaveAttribute('aria-expanded', 'false')
    rectSpy.mockRestore()
  })
})
