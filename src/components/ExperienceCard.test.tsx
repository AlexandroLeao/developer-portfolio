import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExperienceCard from './ExperienceCard'
import { experiences } from '../data/experiences'

const axiaExperience = experiences.find((experience) => experience.id === 'axia-energia')!
const realmeExperience = experiences.find((experience) => experience.id === 'realme')!
const koseiExperience = experiences.find((experience) => experience.id === 'kosei-home')!

describe('ExperienceCard', () => {
  it('renders a complete experience overview in Portuguese', () => {
    render(<ExperienceCard experience={axiaExperience} language="pt" />)

    expect(screen.getByRole('heading', { name: axiaExperience.role.pt })).toBeInTheDocument()
    expect(screen.getByText(axiaExperience.company)).toBeInTheDocument()
    expect(screen.getByText(axiaExperience.period.pt)).toBeInTheDocument()
    expect(screen.getByText(axiaExperience.summary.pt)).toBeInTheDocument()
    expect(screen.getByText('Suporte de TI')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Principais contribuições' })).toBeInTheDocument()
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

  it('links the Kosei Home experience to Natsu Matsuri', () => {
    render(<ExperienceCard experience={koseiExperience} language="pt" />)

    expect(screen.getByRole('link', { name: 'Ver projeto relacionado' })).toHaveAttribute('href', '#projects')
    expect(screen.getByText('Natsu Matsuri Project')).toBeInTheDocument()
  })

  it('omits the project action when no related project exists', () => {
    render(<ExperienceCard experience={axiaExperience} language="pt" />)
    expect(screen.queryByRole('link', { name: 'Ver projeto relacionado' })).not.toBeInTheDocument()
  })
})
