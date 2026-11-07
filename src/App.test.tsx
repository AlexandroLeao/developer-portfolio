import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Developer Portfolio', () => {
  it('centers incomplete certification rows without empty grid slots', async () => {
    const user = userEvent.setup()
    render(<App />)

    const engineeringHeading = screen.getByRole('heading', {
      name: 'Engenharia, Cloud e Sistemas',
    })
    expect(engineeringHeading.nextElementSibling).toHaveClass('md:grid-cols-2')

    const foundationsHeading = screen.getByRole('heading', {
      name: 'Suporte e Fundamentos de TI',
    })
    expect(foundationsHeading.nextElementSibling).toHaveClass('md:max-w-xl')

    await user.click(screen.getByRole('button', {
      name: /Mostrar todas as certificações/,
    }))

    expect(engineeringHeading.nextElementSibling).toHaveClass('xl:grid-cols-3')

    const developmentHeading = screen.getByRole('heading', {
      name: 'Programação e Desenvolvimento Web',
    })
    expect(developmentHeading.nextElementSibling?.lastElementChild).toHaveClass('md:col-span-2', 'md:mx-auto')
  })

  it('balances project and technology grids', () => {
    render(<App />)

    const featuredProject = screen.getByRole('heading', {
      name: 'Adventure Files',
    }).closest('article')
    expect(featuredProject).toHaveClass('lg:col-span-2', 'lg:grid')

    const frontendGrid = screen.getByRole('button', { name: 'HTML5' }).parentElement
    expect(frontendGrid).toHaveClass('sm:grid-cols-4', 'xl:grid-cols-8')

    const backendGrid = screen.getByRole('button', { name: 'Java' }).parentElement
    expect(backendGrid).toHaveClass('sm:grid-cols-3', 'xl:grid-cols-6')

    const aiGrid = screen.getByRole('button', { name: 'IA Generativa' }).parentElement
    expect(aiGrid).toHaveClass('md:grid-cols-4')
  })

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.documentElement.lang = 'pt-BR'
  })

  it('renders the main portfolio sections', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Alexandro Leão',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^Sobre mim/,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^Tecnologias/,
      }),
    ).toBeInTheDocument()
  })

  it('switches the portfolio language to English', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'EN' }),
    )

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^About me/,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^Technologies/,
      }),
    ).toBeInTheDocument()

    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('portfolio-language')).toBe('en')
  })

  it('switches between light and dark themes', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(
      screen.getByRole('button', {
        name: 'Ativar tema escuro',
      }),
    )

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')

    await user.click(
      screen.getByRole('button', {
        name: 'Ativar tema claro',
      }),
    )

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })

  it('provides the Portuguese resume download', () => {
    render(<App />)

    const resumeLink = screen.getByRole('link', {
      name: 'Baixar currículo em PDF',
    })

    expect(resumeLink).toHaveTextContent('Baixar currículo')
    expect(resumeLink).toHaveAttribute(
      'href',
      '/resumes/alexandro-leao-curriculo-pt.pdf',
    )
    expect(resumeLink).toHaveAttribute('download')
  })

  it('provides the English resume download', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'EN' }),
    )

    const resumeLink = screen.getByRole('link', {
      name: 'Download résumé as PDF',
    })

    expect(resumeLink).toHaveTextContent('Download résumé')
    expect(resumeLink).toHaveAttribute(
      'href',
      '/resumes/alexandro-leao-resume-en.pdf',
    )
    expect(resumeLink).toHaveAttribute('download')
  })

})
