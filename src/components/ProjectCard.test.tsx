
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const ideasProject = projects.find(
  (project) => project.id === 'ideas-organizer',
)

const natsuProject = projects.find(
  (project) => project.id === 'natsu-matsuri',
)

if (!ideasProject || !natsuProject) {
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
  it('uses the same fixed-ratio card layout for every project', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)

    const card = screen.getByRole('article')
    expect(card).not.toHaveClass('lg:col-span-2', 'lg:grid')
    expect(card).toHaveAttribute('id', 'project-ideas-organizer')
    expect(card.querySelector('img')).toHaveAttribute('sizes', '(min-width: 1024px) 33vw, calc(100vw - 3rem)')
    expect(card.querySelector('div.aspect-video')).toBeInTheDocument()
  })

  it('renders the project information in Portuguese', () => {
    render(
      <ProjectCard
        project={ideasProject}
        language="pt"
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Organizador de Ideias e Projetos',
      }),
    ).toBeTruthy()

    expect(
      screen.getByText(ideasProject.description.pt),
    ).toBeTruthy()

    expect(
      screen.getByRole('img', {
        name: ideasProject.imageAlt.pt,
      }),
    ).toBeTruthy()

    expect(
      screen.getByText('TypeScript'),
    ).toBeTruthy()
  })

  it('opens and closes the project details', () => {
    render(
      <ProjectCard
        project={ideasProject}
        language="pt"
      />,
    )

    const showDetails = screen.getByRole('button', {
      name: 'Ver detalhes',
    })

    expect(
      showDetails.getAttribute('aria-expanded'),
    ).toBe('false')

    fireEvent.click(showDetails)

    expect(screen.getByRole('dialog', { name: ideasProject.name })).toBeVisible()
    expect(
      screen.getByRole('heading', {
        name: 'Funcionalidades',
      }),
    ).toBeTruthy()

    const hideDetails = screen.getByRole('button', {
      name: 'Ocultar detalhes',
    })

    expect(screen.getByRole('tab', { name: 'Funcionalidades' })).toHaveAttribute('aria-selected', 'true')

    fireEvent.click(hideDetails)

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: 'Ver detalhes' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('centers a subtle pill action and renders tabbed project details', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)

    const openDetails = screen.getByRole('button', { name: 'Ver detalhes' })
    expect(openDetails).toHaveClass('justify-center', 'rounded-full')
    expect(openDetails.parentElement).toHaveClass('justify-center')
    const content = screen.getByRole('article').querySelector('.justify-between')
    expect(content).toHaveClass('gap-5')
    expect(openDetails.querySelector('.lucide-chevron-down')).toBeNull()

    fireEvent.click(openDetails)

    const panel = screen.getByRole('tabpanel', { name: 'Funcionalidades' })
    expect(panel.querySelector('ul')).toHaveClass('sm:grid-cols-2')
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(screen.getByRole('tablist')).toHaveClass('grid-cols-2', 'sm:grid-cols-4')

    fireEvent.click(screen.getByRole('tab', { name: 'Desafios' }))
    expect(screen.getByRole('tabpanel', { name: 'Desafios' })).toHaveTextContent(ideasProject.details.challenges.pt)
    expect(screen.queryByRole('heading', { name: 'Funcionalidades' })).toBeNull()
  })

  it('supports arrow keys and Home/End within the detail tabs', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)
    fireEvent.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    const tabs = screen.getByRole('tablist', { name: 'Estudo de caso' })
    fireEvent.keyDown(tabs, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Arquitetura' })).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(tabs, { key: 'End' })
    expect(screen.getByRole('tab', { name: 'Práticas' })).toHaveAttribute('aria-selected', 'true')
  })

  it('dismisses the detail dialog when the backdrop is clicked', () => {
    render(<ProjectCard project={ideasProject} language="pt" />)
    fireEvent.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    const dialog = screen.getByRole('dialog', { name: ideasProject.name })
    dialog.getBoundingClientRect = () => ({
      left: 100, right: 900, top: 100, bottom: 600,
    }) as DOMRect

    fireEvent.click(dialog, { clientX: 300, clientY: 300 })
    expect(dialog).toBeVisible()

    fireEvent.click(dialog, { clientX: 50, clientY: 50 })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('displays translated content in English', () => {
    render(
      <ProjectCard
        project={ideasProject}
        language="en"
      />,
    )

    expect(
      screen.getByText(ideasProject.description.en),
    ).toBeTruthy()

    expect(
      screen.getByRole('button', {
        name: 'View details',
      }),
    ).toBeTruthy()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'View details',
      }),
    )

    fireEvent.click(screen.getByRole('tab', { name: 'Practices' }))
    expect(screen.getByRole('tabpanel', { name: 'Practices' })).toHaveTextContent(ideasProject.details.practices.en)
  })

  it('provides repository and live demo links', () => {
    render(
      <ProjectCard
        project={ideasProject}
        language="pt"
      />,
    )

    const githubLink = screen.getByRole('link', {
      name: /GitHub/,
    })

    const liveLink = screen.getByRole('link', {
      name: /Visitar projeto/,
    })

    expect(
      githubLink.getAttribute('href'),
    ).toBe(ideasProject.githubUrl)

    expect(
      liveLink.getAttribute('href'),
    ).toBe(ideasProject.liveUrl)

    expect(
      githubLink.getAttribute('target'),
    ).toBe('_blank')

    expect(
      liveLink.getAttribute('rel'),
    ).toContain('noopener')
  })

  it('renders the Natsu Matsuri project and its live link', () => {
    render(
      <ProjectCard
        project={natsuProject}
        language="pt"
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Natsu Matsuri Project',
      }),
    ).toBeTruthy()

    expect(
      screen
        .getByRole('link', {
          name: /Visitar projeto/,
        })
        .getAttribute('href'),
    ).toBe(
      'https://alexandroleao.github.io/natsu-matsuri-project/',
    )
  })
})
