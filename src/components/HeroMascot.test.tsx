import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import HeroMascot from './HeroMascot'

afterEach(() => vi.useRealTimers())

describe('HeroMascot', () => {
  it('uses only the three approved full-character images at one fixed aspect ratio', () => {
    const { container } = render(<HeroMascot alt="Alexandro acenando" language="pt" />)
    const character = screen.getByRole('button', { name: 'Cutucar o personagem Alexandro' })
    const imageSources = Array.from(container.querySelectorAll('img')).map((img) => img.getAttribute('src'))

    expect(character).toHaveClass('aspect-[4/3]', 'w-full', 'max-w-lg')
    expect(imageSources).toEqual([
      '/images/hero-illustration-1024.webp',
      '/images/hero-wave-1024.webp',
      '/images/hero-poke-1024.webp',
    ])
    expect(container.querySelectorAll('picture')).toHaveLength(3)
    expect(container.querySelector('.hero-mascot-wave')).toBeInTheDocument()
    expect(container.querySelector('.hero-mascot-poke')).toBeInTheDocument()
    for (const image of container.querySelectorAll('img')) {
      expect(image).toHaveAttribute('width', '1448')
      expect(image).toHaveAttribute('height', '1086')
    }
  })

  it('shows the original click pose for 500 ms, then resumes waving', () => {
    vi.useFakeTimers()
    render(<HeroMascot alt="Alexandro" language="pt" />)
    const character = screen.getByRole('button', { name: 'Cutucar o personagem Alexandro' })

    expect(character).toHaveAttribute('data-poked', 'false')
    fireEvent.click(character)
    expect(character).toHaveAttribute('data-poked', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('Ai! Fui cutucado!')

    act(() => vi.advanceTimersByTime(499))
    expect(character).toHaveAttribute('data-poked', 'true')
    act(() => vi.advanceTimersByTime(1))
    expect(character).toHaveAttribute('data-poked', 'false')
    expect(screen.getByRole('status')).toHaveTextContent('Acenando')
  })
})
