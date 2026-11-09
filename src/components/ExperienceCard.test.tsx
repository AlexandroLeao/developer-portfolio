import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ExperienceCard from './ExperienceCard'
import { experiences } from '../data/experiences'

const axiaExperience = experiences.find((experience) => experience.id === 'axia-energia')!
const realmeExperience = experiences.find((experience) => experience.id === 'realme')!
const koseiExperience = experiences.find((experience) => experience.id === 'kosei-home')!

describe('ExperienceCard', () => {
  it('renders a complete experience overview in Portuguese', () => {
    render(<ExperienceCard experience={axiaExperience} language="pt" />)

    expect(screen.getByRole('heading', { name: axiaExperience.role.pt })).toHaveClass('text-xl', 'sm:text-2xl')
    expect(screen.getByText(axiaExperience.company)).toBeInTheDocument()
    expect(screen.getByText(axiaExperience.period.pt)).toBeInTheDocument()
    expect(screen.getByText(axiaExperience.summary.pt)).toHaveClass('text-sm', 'sm:text-base')
    const skill = screen.getByText('Suporte de TI').closest('li')
    expect(skill?.parentElement).toHaveClass('grid', 'grid-cols-2')
    expect(skill?.parentElement?.children).toHaveLength(4)
    expect(skill?.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()

    const contributionsHeading = screen.getByRole('heading', { name: 'Principais contribuições' })
    expect(contributionsHeading.nextElementSibling?.tagName).toBe('UL')
    expect(contributionsHeading.nextElementSibling?.children).toHaveLength(3)
    expect(screen.getByText(axiaExperience.contributions[0].pt)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ver detalhes' })).not.toBeInTheDocument()
  })

  it('preserves English translations and all contributions', () => {
    render(<ExperienceCard experience={realmeExperience} language="en" />)

    expect(screen.getByRole('heading', { name: realmeExperience.role.en })).toBeInTheDocument()
    expect(screen.getByText(realmeExperience.summary.en)).toBeInTheDocument()
    expect(screen.getByText('Technical Communication')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Key contributions' })).toBeInTheDocument()
    for (const contribution of realmeExperience.contributions) {
      expect(screen.getByText(contribution.en)).toBeInTheDocument()
    }
  })

  it('centers the related-project action without a duplicate project label', async () => {
    const user = userEvent.setup()
    const onRelatedProjectClick = vi.fn()
    render(<ExperienceCard experience={koseiExperience} language="pt" onRelatedProjectClick={onRelatedProjectClick} />)

    expect(screen.getByRole('link', { name: 'Ver projeto relacionado' })).toHaveAttribute('href', '#projects')
    expect(screen.queryByText('Natsu Matsuri Project')).not.toBeInTheDocument()
    const relatedLink = screen.getByRole('link', { name: 'Ver projeto relacionado' })
    expect(relatedLink.closest('section')).toContainElement(
      screen.getByRole('heading', { name: 'Principais contribuições' }),
    )
    expect(relatedLink.parentElement).toHaveClass('justify-center')
    expect(relatedLink.querySelector('svg')).toBeNull()

    await user.click(relatedLink)
    expect(onRelatedProjectClick).toHaveBeenCalledOnce()
    expect(onRelatedProjectClick).toHaveBeenCalledWith('natsu-matsuri')
  })

  it('omits the project action when no related project exists', () => {
    render(<ExperienceCard experience={axiaExperience} language="pt" />)
    expect(screen.queryByRole('link', { name: 'Ver projeto relacionado' })).not.toBeInTheDocument()
  })
})
