import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ScrollProgress from './ScrollProgress'

const originalHeight = Object.getOwnPropertyDescriptor(
  document.documentElement,
  'scrollHeight',
)

afterEach(() => {
  vi.unstubAllGlobals()
  if (originalHeight) {
    Object.defineProperty(document.documentElement, 'scrollHeight', originalHeight)
  } else {
    Reflect.deleteProperty(document.documentElement, 'scrollHeight')
  }
})

describe('ScrollProgress', () => {
  it('tracks scroll position without section markers', () => {
    const frames: FrameRequestCallback[] = []
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.push(callback)
      return frames.length
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.stubGlobal('innerHeight', 1000)
    vi.stubGlobal('scrollY', 0)

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })

    const { getByRole } = render(<ScrollProgress language="pt" />)
    const progress = getByRole('progressbar', {
      name: 'Progresso de leitura da página',
    })

    expect(progress).toHaveAttribute('aria-valuenow', '0')
    expect(progress.querySelectorAll('span')).toHaveLength(0)
    expect(progress).toHaveClass('absolute', 'bottom-0')

    vi.stubGlobal('scrollY', 500)
    fireEvent.scroll(window)
    act(() => {
      frames.splice(0).forEach((frame) => frame(0))
    })

    expect(progress).toHaveAttribute('aria-valuenow', '50')
    expect(progress.firstElementChild).toHaveStyle('transform: scaleX(0.5)')
  })
})
