
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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

describe('ProjectCard', () => {
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

    expect(
      screen.getByRole('heading', {
        name: 'Funcionalidades',
      }),
    ).toBeTruthy()

    const hideDetails = screen.getByRole('button', {
      name: 'Ocultar detalhes',
    })

    expect(
      hideDetails.getAttribute('aria-expanded'),
    ).toBe('true')

    fireEvent.click(hideDetails)

    expect(
      screen.queryByRole('heading', {
        name: 'Funcionalidades',
      }),
    ).toBeNull()
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

    expect(
      screen.getByRole('heading', {
        name: 'Development practices',
      }),
    ).toBeTruthy()
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
      'https://alexandroleao.github.io/Natsu-Matsuri-Project/',
    )
  })
})
