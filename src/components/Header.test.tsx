import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Header from './Header'

const observerInstances: MockIntersectionObserver[] = []

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    observerInstances.push(this)
  }
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  observerInstances.length = 0
  const section = document.createElement('section')
  section.id = 'projects'
  document.body.append(section)
})

afterEach(() => {
  document.getElementById('projects')?.remove()
  vi.unstubAllGlobals()
  localStorage.clear()
  window.history.replaceState(null, '', '/')
})

describe('Header navigation indicator', () => {
  it('marks the visible section without scrolling listeners for section detection', () => {
    const { container } = render(
      <Header language="pt" onLanguageChange={vi.fn()} />,
    )

    const latestObserver = observerInstances.at(-1)
    const projectLinks = container.querySelectorAll('a[href="#projects"]')
    expect(projectLinks).toHaveLength(2)
    expect(projectLinks[0]).not.toHaveAttribute('aria-current')

    const section = document.getElementById('projects')!
    expect(latestObserver?.observe).toHaveBeenCalledWith(section)

    act(() => {
      latestObserver?.callback(
        [{
          isIntersecting: true,
          target: section,
          boundingClientRect: { top: 100 },
        } as unknown as IntersectionObserverEntry],
        latestObserver as unknown as IntersectionObserver,
      )
    })

    for (const link of projectLinks) {
      expect(link).toHaveAttribute('aria-current', 'location')
    }
  })
  it('keeps the navigation and progress track visible after scrolling down', () => {
    vi.stubGlobal('scrollY', 950)

    const { container } = render(
      <Header language="pt" onLanguageChange={vi.fn()} />,
    )

    fireEvent.scroll(window)

    const header = container.querySelector('header')!
    const progress = header.querySelector('[role="progressbar"]')

    expect(header).not.toHaveClass('-translate-y-full', 'opacity-0')
    expect(header.querySelector('nav')).toBeInTheDocument()
    expect(progress).toHaveClass('absolute', 'bottom-0')
    expect(progress?.parentElement).toBe(header)
  })

})
