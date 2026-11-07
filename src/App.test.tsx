import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Developer Portfolio', () => {
  it('uses consistent section typography across the portfolio', () => {
    const { container } = render(<App />)
    for (const id of ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']) {
      const heading = container.querySelector('#' + id + '-title')
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl')
      expect(heading?.previousElementSibling).toHaveClass('mb-4', 'text-xs')
    }

    const skills = container.querySelector('#skills')!
    const intro = skills.querySelector('h2 + div + p')
    expect(intro).toHaveClass('text-base', 'sm:text-lg', 'leading-8')

    const categoryHeading = screen.getByRole('heading', { name: 'Front-End' })
    expect(categoryHeading).toHaveClass('text-xl', 'sm:text-2xl')
  })

  it('uses a concise About eyebrow and hover lift on hero actions', async () => {
    const user = userEvent.setup()
    render(<App />)

    const about = screen.getByRole('region', { name: 'Sobre mim.' })
    expect(within(about).getByText('O QUE ME MOVE')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Entrar em contato' })[0]).toHaveClass('cta-hover-lift')
    expect(screen.getByRole('link', { name: 'Baixar currículo em PDF' })).toHaveClass('cta-hover-lift')

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('WHAT DRIVES ME')).toBeInTheDocument()
  })

  it('shows the About heading without repeated role and education labels', () => {
    render(<App />)
    const about = screen.getByRole('region', { name: 'Sobre mim.' })

    expect(within(about).getByRole('heading', { name: 'Sobre mim.' })).toBeInTheDocument()
    expect(within(about).queryByText('Desenvolvedor de Software')).not.toBeInTheDocument()
    expect(within(about).queryByText('Formado em Análise e Desenvolvimento de Sistemas')).not.toBeInTheDocument()
  })

  it('shows six featured qualifications in a compact three-column grid', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const grid = container.querySelector<HTMLElement>('#certification-results')!

    expect(grid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3')
    expect(within(grid).getAllByRole('article')).toHaveLength(6)
    for (const name of [
      'Engenharia de Software',
      'Cloud Fundamentals, Administration and Solution Architect',
      'SCRUM: Gerenciando Projetos de Software com Agilidade',
      'The Complete Full-Stack Web Development Bootcamp',
      'Fundamentos do Suporte Técnico',
      'Bootcamp Itaú | Java com Inteligência Artificial',
    ]) {
      expect(within(grid).getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(within(grid).queryByRole('heading', { name: 'UX e UI Design' })).not.toBeInTheDocument()
    expect(within(grid).getByText('Em andamento')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Destaques' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('group', { name: 'Área de conhecimento' }))
      .toHaveClass('technology-category-nav', 'overflow-x-auto', 'snap-x', 'sm:flex-wrap')
    expect(screen.getByRole('button', { name: 'Todas as áreas' }))
      .toHaveClass('shrink-0', 'whitespace-nowrap')

    const degree = screen.getByRole('heading', { name: 'Tecnólogo em Análise e Desenvolvimento de Sistemas' })
    expect(degree).toBeInTheDocument()
    expect(within(grid).queryByText('Centro Universitário FAVIP Wyden')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Todas' }))
    expect(within(grid).getAllByRole('article')).toHaveLength(18)
  })

  it('filters certifications and the ongoing Java bootcamp by knowledge area', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const grid = container.querySelector<HTMLElement>('#certification-results')!
    const filters = screen.getByRole('group', { name: 'Área de conhecimento' })

    await user.click(within(filters).getByRole('button', { name: 'Programação e Desenvolvimento Web' }))
    expect(within(grid).getAllByRole('article')).toHaveLength(2)
    expect(within(grid).getByRole('heading', {
      name: 'Bootcamp Itaú | Java com Inteligência Artificial',
    })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Todas' }))
    expect(within(grid).getAllByRole('article')).toHaveLength(8)
    expect(within(grid).getByRole('heading', { name: 'Legacy JavaScript Algorithms and Data Structures V7' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('group', { name: 'Knowledge area' })).toBeInTheDocument()
    expect(within(grid).getAllByRole('article')).toHaveLength(8)
  })

  it('keeps all 30 technologies in a compact, deselectable category browser', async () => {
    const user = userEvent.setup()
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: 'Áreas de tecnologia' })
    expect(within(navigation).getAllByRole('button')).toHaveLength(5)
    expect(navigation).toHaveClass('overflow-x-auto', 'lg:flex-col')
    expect(within(navigation).getByRole('button', { name: /Engenharia & Ferramentas/ }))
      .toHaveClass('lg:leading-tight', 'lg:py-1.5')
    expect(within(navigation).queryByText('Explore por área')).not.toBeInTheDocument()

    const frontendGrid = screen.getByRole('button', { name: 'HTML5' }).parentElement
    expect(frontendGrid).toHaveClass('sm:grid-cols-4')
    expect(frontendGrid?.children).toHaveLength(8)

    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'false')
    expect(document.getElementById('technology-detail-panel')).toHaveClass('min-h-19')

    await user.click(screen.getByRole('button', { name: 'CSS3' }))
    expect(screen.getByRole('button', { name: 'CSS3' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('region', { name: /CSS3 — Detalhes da tecnologia/ }))
      .toHaveTextContent('Utilizo CSS3 para criar layouts responsivos')
    expect(screen.queryByText('Onde foi aplicado')).not.toBeInTheDocument()

    await user.click(screen.getByRole('heading', { level: 2, name: /^Tecnologias/ }))
    expect(screen.getByRole('button', { name: 'CSS3' })).toHaveAttribute('aria-pressed', 'false')
    expect(document.getElementById('technology-detail-panel')).toHaveClass('min-h-19')

    await user.click(within(navigation).getByRole('button', { name: /Cloud & DevOps/ }))
    const cloudGrid = screen.getByRole('button', { name: 'Azure' }).parentElement
    expect(cloudGrid).toHaveClass('sm:grid-cols-3')
    expect(cloudGrid?.children).toHaveLength(6)

    await user.click(screen.getByRole('button', { name: 'Azure' }))
    expect(screen.getByRole('region', { name: /Azure — Detalhes da tecnologia/ }))
      .toHaveTextContent('Estudei fundamentos de infraestrutura e serviços do Microsoft Azure')
    await user.click(screen.getByRole('button', { name: 'Azure' }))
    expect(screen.getByRole('button', { name: 'Azure' })).toHaveAttribute('aria-pressed', 'false')

    await user.click(within(navigation).getByRole('button', { name: /Inteligência Artificial/ }))
    expect(screen.getByRole('button', { name: 'IA Generativa' }).parentElement?.children).toHaveLength(4)

    await user.click(within(navigation).getByRole('button', { name: /Engenharia & Ferramentas/ }))
    expect(screen.getByRole('button', { name: 'Git' }).parentElement?.children).toHaveLength(6)

    await user.click(within(navigation).getByRole('button', { name: /Back-End & Dados/ }))
    expect(screen.getByRole('button', { name: 'Node.js' }).parentElement?.children).toHaveLength(6)

    await user.click(within(navigation).getByRole('button', { name: /Cloud & DevOps/ }))
    await user.click(screen.getByRole('button', { name: 'Azure' }))
    expect(screen.getByRole('button', { name: 'Azure' })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('button', { name: 'Azure' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('navigation', { name: 'Technology areas' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /Azure — Technology details/ }))
      .toHaveTextContent('I studied Microsoft Azure infrastructure and service fundamentals')

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(screen.getByRole('button', { name: 'Azure' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('region', { name: /Azure — Technology details/ }))
      .toHaveTextContent('I studied Microsoft Azure infrastructure and service fundamentals')
  })

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.documentElement.lang = 'pt-BR'
  })

  it('marks only selected section titles for lightweight entrance feedback', () => {
    render(<App />)

    for (const name of [/^Projetos/, /^Experiência/, /^Formação e certificações/]) {
      const heading = screen.getByRole('heading', { level: 2, name })
      expect(heading).toHaveAttribute('data-reveal-on-scroll')
    }

    expect(screen.getByRole('heading', { level: 2, name: /^Sobre mim/ }))
      .not.toHaveAttribute('data-reveal-on-scroll')
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
