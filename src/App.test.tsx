import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
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

    expect(screen.getByRole('button', { name: /Destaques \(7\)/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('7 de 17 certificações')

    await user.click(screen.getByRole('button', { name: /Todas \(17\)/ }))
    expect(screen.getByRole('status')).toHaveTextContent('17 de 17 certificações')

    expect(engineeringHeading.nextElementSibling).toHaveClass('xl:grid-cols-3')

    const developmentHeading = screen.getByRole('heading', {
      name: 'Programação e Desenvolvimento Web',
    })
    expect(developmentHeading.nextElementSibling?.lastElementChild).toHaveClass('md:col-span-2', 'md:mx-auto')
  })

  it('filters completed certifications by knowledge area', async () => {
    const user = userEvent.setup()
    render(<App />)

    const areaFilter = screen.getByRole('combobox', { name: 'Área de conhecimento' })
    await user.selectOptions(areaFilter, 'development')

    expect(screen.getByRole('status')).toHaveTextContent('2 de 17 certificações')
    expect(screen.getByRole('heading', { name: 'Programação e Desenvolvimento Web' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Engenharia, Cloud e Sistemas' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Todas \(17\)/ }))
    expect(screen.getByRole('status')).toHaveTextContent('7 de 17 certificações')

    expect(screen.getByRole('heading', {
      name: 'Bootcamp Itaú | Java com Inteligência Artificial',
    })).toBeInTheDocument()
  })

  it('explores technology categories and links verified projects', async () => {
    const user = userEvent.setup()
    render(<App />)

    const projectCard = screen.getByRole('heading', {
      name: 'Adventure Files',
    }).closest('article')
    expect(projectCard).not.toHaveClass('lg:col-span-2', 'lg:grid')
    expect(projectCard?.parentElement).toHaveClass('lg:grid-cols-3')

    const navigation = screen.getByRole('navigation', { name: 'Explore por área' })
    expect(within(navigation).getAllByRole('button')).toHaveLength(5)

    const frontendGrid = screen.getByRole('button', { name: 'HTML5' }).parentElement
    expect(frontendGrid).toHaveClass('sm:grid-cols-4')

    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'true')
    const details = screen.getByRole('region', { name: /React — Como utilizo ou pretendo aplicar/ })
    expect(within(details).getByRole('link', { name: /Adventure Files/ })).toHaveAttribute(
      'href', '#project-adventure-files',
    )

    await user.click(within(navigation).getByRole('button', { name: /Back-End & Dados/ }))
    expect(screen.getByRole('button', { name: 'Node.js' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Java' }).parentElement).toHaveClass('sm:grid-cols-3')

    await user.click(screen.getByRole('button', { name: 'Java' }))
    expect(screen.getByText('Em estudo ou sem projeto público associado.')).toBeInTheDocument()

    await user.click(within(navigation).getByRole('button', { name: /Front-End/ }))
    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'true')
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
