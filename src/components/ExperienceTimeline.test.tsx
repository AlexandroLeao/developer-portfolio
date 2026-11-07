import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExperienceTimeline from './ExperienceTimeline'
import { experiences } from '../data/experiences'

describe('ExperienceTimeline', () => {
  it('shows the latest experience by default and keeps all panels mounted', () => {
    const { container } = render(<ExperienceTimeline language="pt" />)
    const navigation = screen.getByRole('navigation', { name: 'Linha do tempo profissional' })
    expect(within(navigation).getAllByRole('button')).toHaveLength(experiences.length)

    const axia = within(navigation).getByRole('button', { name: /AXIA Energia/ })
    expect(axia).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('region', { name: /Supervisor de Almoxarifado.*AXIA Energia/ })).toBeInTheDocument()

    const panels = container.querySelectorAll('[id^="experience-panel-"]')
    expect(panels).toHaveLength(experiences.length)
    for (const panel of panels) {
      expect(panel).toHaveClass('col-start-1', 'row-start-1')
    }
  })

  it('switches the selected experience without expanding the timeline', () => {
    render(<ExperienceTimeline language="pt" />)
    const navigation = screen.getByRole('navigation', { name: 'Linha do tempo profissional' })
    const axia = within(navigation).getByRole('button', { name: /AXIA Energia/ })
    const realme = within(navigation).getByRole('button', { name: /realme/ })

    fireEvent.click(realme)

    expect(axia).toHaveAttribute('aria-pressed', 'false')
    expect(realme).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('region', { name: /Consultor de Vendas.*realme/ })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: /AXIA Energia/ })).not.toBeInTheDocument()
    expect(screen.getByText(experiences[1].summary.pt)).toBeInTheDocument()
  })

  it('keeps the selection when switching to English', () => {
    const { rerender } = render(<ExperienceTimeline language="pt" />)
    fireEvent.click(screen.getByRole('button', { name: /realme/ }))

    rerender(<ExperienceTimeline language="en" />)

    expect(screen.getByRole('navigation', { name: 'Professional timeline' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /Technology Sales Consultant.*realme/ })).toBeInTheDocument()
    expect(screen.getByText(experiences[1].summary.en)).toBeInTheDocument()
  })

  it('preserves the project link on the Kosei Home milestone', () => {
    render(<ExperienceTimeline language="pt" />)
    fireEvent.click(screen.getByRole('button', { name: /Kosei Home/ }))
    expect(screen.getByRole('link', { name: 'Ver projeto relacionado' })).toHaveAttribute('href', '#projects')
  })
})
