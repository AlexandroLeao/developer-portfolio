import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Developer Portfolio', () => {
  it('contains the hero glow further without changing the illustration', () => {
    render(<App />)
    expect(screen.getByTestId('hero-glow')).toHaveClass(
      'inset-x-[13%]',
      'inset-y-[13%]',
      'bg-[#235d59]/35',
      'blur-[55px]',
      'dark:block',
    )
    expect(screen.getByTestId('hero-mascot')).toBeInTheDocument()
  })

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

  it('shows the same three featured qualifications on mobile and desktop', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const grid = container.querySelector<HTMLElement>('#certification-results')!

    expect(grid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3')
    const featuredCards = within(grid).getAllByRole('article')
    expect(featuredCards).toHaveLength(3)
    expect(featuredCards.map((card) => card.querySelector('h3')?.textContent)).toEqual([
      'Engenharia de Software',
      'Cloud Fundamentals, Administration and Solution Architect',
      'The Complete Full-Stack Web Development Bootcamp',
    ])
    expect(grid.querySelectorAll('article.hidden')).toHaveLength(0)
    for (const name of [
      'Engenharia de Software',
      'Cloud Fundamentals, Administration and Solution Architect',
      'The Complete Full-Stack Web Development Bootcamp',
    ]) {
      expect(within(grid).getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(within(grid).queryByRole('heading', { name: 'UX e UI Design' })).not.toBeInTheDocument()
    expect(within(grid).queryByText('Em andamento')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Destaques' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('group', { name: 'Área de conhecimento' }))
      .toHaveClass('technology-category-nav', 'overflow-x-auto', 'snap-x', 'sm:flex-wrap')
    expect(screen.getByRole('group', { name: 'Área de conhecimento' }))
      .toHaveAttribute('data-mobile-selection-track')
    expect(screen.getByRole('button', { name: 'Todas as áreas' }))
      .toHaveClass('shrink-0', 'whitespace-nowrap')

    const degree = screen.getByRole('heading', { name: 'Tecnólogo em Análise e Desenvolvimento de Sistemas' })
    expect(degree).toBeInTheDocument()
    expect(within(grid).queryByText('Centro Universitário FAVIP Wyden')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Todas' }))
    expect(within(grid).getAllByRole('article')).toHaveLength(18)
    expect(grid.querySelectorAll('article.hidden')).toHaveLength(0)
    expect(within(grid).getByText('Em andamento')).toBeInTheDocument()
  })

  it('shows one selectable project at a time on mobile while preserving the desktop grid', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const section = container.querySelector<HTMLElement>('#projects')!
    const navigation = within(section).getByRole('navigation', { name: 'Selecionar projeto' })
    const options = within(navigation).getAllByRole('button')
    const panels = Array.from(section.querySelectorAll<HTMLElement>('[id^="project-panel-"]'))

    expect(section).toHaveClass('overflow-x-clip')
    expect(navigation).toHaveAttribute('data-mobile-selection-track')
    expect(navigation).toHaveClass('overflow-x-auto', 'max-w-full', 'lg:hidden')
    expect(options).toHaveLength(3)
    expect(options.every((option) => option.classList.contains('snap-center'))).toBe(true)
    expect(options[0]).toHaveAttribute('aria-pressed', 'true')
    expect(panels).toHaveLength(3)
    expect(panels[0]).toHaveClass('block', 'lg:block')
    expect(panels[1]).toHaveClass('hidden', 'lg:block')
    expect(panels[2]).toHaveClass('hidden', 'lg:block')
    expect(section.querySelector('.lg\\:grid-cols-3')).toBeInTheDocument()

    await user.click(options[1])
    expect(options[0]).toHaveAttribute('aria-pressed', 'false')
    expect(options[1]).toHaveAttribute('aria-pressed', 'true')
    expect(panels[0]).toHaveClass('hidden', 'lg:block')
    expect(panels[1]).toHaveClass('block', 'lg:block')
    expect(panels[2]).toHaveClass('hidden', 'lg:block')

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(within(navigation).getByRole('button', { name: 'Ideas and Projects Organizer' }))
      .toHaveAttribute('aria-pressed', 'true')
    expect(navigation).toHaveAccessibleName('Select project')
  })

  it('centers a tapped project option inside the mobile track without page scrolling', async () => {
    const originalWidth = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 375 })

    try {
      const user = userEvent.setup()
      const { container } = render(<App />)
      const navigation = within(container.querySelector<HTMLElement>('#projects')!)
        .getByRole('navigation', { name: 'Selecionar projeto' })
      const option = within(navigation).getByRole('button', { name: 'Natsu Matsuri Project' })
      const scrollTo = vi.fn()

      Object.defineProperty(navigation, 'scrollWidth', { configurable: true, value: 850 })
      Object.defineProperty(navigation, 'clientWidth', { configurable: true, value: 320 })
      Object.defineProperty(navigation, 'scrollTo', { configurable: true, value: scrollTo })
      vi.spyOn(navigation, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 320 } as DOMRect)
      vi.spyOn(option, 'getBoundingClientRect').mockReturnValue({ left: 620, width: 185 } as DOMRect)

      await user.click(option)

      expect(option).toHaveAttribute('aria-pressed', 'true')
      expect(scrollTo).toHaveBeenCalledWith({ left: 530, behavior: 'smooth' })
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
    }
  })

  it.each([
    { width: 375, targetId: 'project-selector', hash: '#projects' },
    { width: 1280, targetId: 'project-natsu-matsuri', hash: '#project-natsu-matsuri' },
  ])('routes the related-project link to the correct $width px destination', async ({ width, targetId, hash }) => {
    const originalWidth = window.innerWidth
    const scrollIntoViewDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
    const scrollIntoView = vi.fn()

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width })
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    })
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      queueMicrotask(() => callback(0))
      return 1
    })

    try {
      const user = userEvent.setup()
      render(<App />)
      const timeline = screen.getByRole('navigation', { name: 'Linha do tempo profissional' })
      await user.click(within(timeline).getByRole('button', { name: /Centro de Reabilitação Social Kosei Home/ }))
      await user.click(screen.getByRole('link', { name: 'Ver projeto relacionado' }))

      await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce())
      const scrolledElement = scrollIntoView.mock.instances[0]
      expect(scrolledElement).toBe(document.getElementById(targetId))
      expect(window.location.hash).toBe(hash)
      expect(document.getElementById('project-panel-natsu-matsuri')).toHaveClass('block', 'lg:block')
      expect(document.getElementById('project-option-natsu-matsuri')).toHaveAttribute('aria-pressed', 'true')
      if (width >= 1024) {
        expect(scrolledElement).toHaveClass('scroll-mt-28')
      } else {
        expect(scrolledElement).toHaveClass('overflow-x-auto', 'scroll-mt-28')
      }
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
      if (scrollIntoViewDescriptor) {
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', scrollIntoViewDescriptor)
      } else {
        Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
      }
      window.history.replaceState(null, '', window.location.pathname)
    }
  })

  it('filters certifications and the ongoing Java bootcamp by knowledge area', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const grid = container.querySelector<HTMLElement>('#certification-results')!
    const filters = screen.getByRole('group', { name: 'Área de conhecimento' })

    await user.click(within(filters).getByRole('button', { name: 'Programação e Desenvolvimento Web' }))
    expect(within(grid).getAllByRole('article')).toHaveLength(2)
    const javaHeading = within(grid).getByRole('heading', {
      name: 'Bootcamp Itaú | Java com Inteligência Artificial',
    })
    const javaCard = javaHeading.closest('article')!
    const javaDescription = within(javaCard).getByText(/Formação em Java em andamento/)
    expect(javaHeading).toHaveClass('min-h-12', 'sm:min-h-14')
    expect(javaDescription).toHaveClass('flex-1')
    expect(javaDescription).not.toHaveClass('line-clamp-2')
    expect(within(javaCard).getByRole('heading', { name: 'Competências' })).toBeInTheDocument()
    const javaSkills = within(javaCard).getByRole('heading', { name: 'Competências' }).parentElement!
    expect(javaSkills).not.toHaveClass('sm:min-h-20')
    expect(javaSkills.querySelector('ul')).toHaveClass('justify-center')
    expect(within(javaCard).getByText('Em andamento').parentElement).toHaveClass('justify-center')

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
    expect(navigation).toHaveAttribute('data-mobile-selection-track')
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
    const restApiCard = screen.getByRole('button', { name: 'APIs REST' })
    expect(restApiCard.querySelector('svg.technology-icon')).toBeInTheDocument()
    expect(restApiCard.querySelector('.devicon-fastapi-plain')).not.toBeInTheDocument()

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

  it('marks all sections and their content for consistent scroll reveals', () => {
    const { container } = render(<App />)

    for (const id of ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']) {
      const heading = container.querySelector(`#${id}-title`)
      expect(heading?.closest('[data-reveal-on-scroll]')).not.toBeNull()
    }

    expect(container.querySelectorAll('[data-reveal-on-scroll]').length).toBeGreaterThanOrEqual(11)
    expect(screen.getByTestId('hero-mascot').closest('[data-reveal-on-scroll]')).toBeNull()
  })

  it('repeats reveals in both scroll directions without changing element geometry', () => {
    const observers: Array<{
      callback: IntersectionObserverCallback
      observe: ReturnType<typeof vi.fn>
      disconnect: ReturnType<typeof vi.fn>
    }> = []

    class MockIntersectionObserver {
      callback: IntersectionObserverCallback
      observe = vi.fn()
      disconnect = vi.fn()

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback
        observers.push(this)
      }
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    const { container, unmount } = render(<App />)
    const sectionTitle = container.querySelector<HTMLElement>('#projects-title')!
    const revealTarget = sectionTitle.closest<HTMLElement>('[data-reveal-on-scroll]')!
    const sectionObserver = observers.find((observer) =>
      observer.observe.mock.calls.some(([element]) => element === revealTarget),
    )!

    expect(sectionObserver).toBeDefined()
    expect(revealTarget).toHaveClass('reveal-pending')
    expect(revealTarget).not.toHaveClass('reveal-visible')

    act(() => {
      sectionObserver.callback(
        [{ target: revealTarget, isIntersecting: true } as unknown as IntersectionObserverEntry],
        sectionObserver as unknown as IntersectionObserver,
      )
    })
    expect(revealTarget).toHaveClass('reveal-visible')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 300 })
    fireEvent.scroll(window)
    expect(document.documentElement).toHaveAttribute('data-scroll-direction', 'down')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 200 })
    fireEvent.scroll(window)
    expect(document.documentElement).toHaveAttribute('data-scroll-direction', 'up')

    act(() => {
      sectionObserver.callback(
        [{ target: revealTarget, isIntersecting: false } as unknown as IntersectionObserverEntry],
        sectionObserver as unknown as IntersectionObserver,
      )
    })
    expect(revealTarget).not.toHaveClass('reveal-visible')
    expect(sectionObserver.observe.mock.calls.length).toBeGreaterThanOrEqual(11)

    act(() => {
      sectionObserver.callback(
        [{ target: revealTarget, isIntersecting: true } as unknown as IntersectionObserverEntry],
        sectionObserver as unknown as IntersectionObserver,
      )
    })
    expect(revealTarget).toHaveClass('reveal-visible')

    unmount()
    expect(sectionObserver.disconnect).toHaveBeenCalledOnce()
    expect(revealTarget).not.toHaveClass('reveal-pending')
    expect(document.documentElement).not.toHaveAttribute('data-scroll-direction')
  })

  it('keeps sections visible without an observer or with reduced motion', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const firstRender = render(<App />)
    expect(firstRender.container.querySelector('.reveal-pending')).toBeNull()
    firstRender.unmount()

    vi.stubGlobal('IntersectionObserver', class {
      observe = vi.fn()
      disconnect = vi.fn()
    })
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const secondRender = render(<App />)
    expect(secondRender.container.querySelector('.reveal-pending')).toBeNull()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
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
