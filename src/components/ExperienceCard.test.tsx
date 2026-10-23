
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExperienceCard from './ExperienceCard'
import { experiences } from '../data/experiences'

const axiaExperience = experiences.find(
  (experience) => experience.id === 'axia-energia',
)

const realmeExperience = experiences.find(
  (experience) => experience.id === 'realme',
)

const koseiExperience = experiences.find(
  (experience) => experience.id === 'kosei-home',
)

if (!axiaExperience || !realmeExperience || !koseiExperience) {
  throw new Error('Required professional experiences are missing.')
}

describe('ExperienceCard', () => {
  it('renders professional information in Portuguese', () => {
    render(
      <ExperienceCard
        experience={axiaExperience}
        language="pt"
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: axiaExperience.role.pt,
      }),
    ).toBeTruthy()

    expect(
      screen.getByText('AXIA Energia'),
    ).toBeTruthy()

    expect(
      screen.getByText(axiaExperience.period.pt),
    ).toBeTruthy()

    expect(
      screen.getByText(axiaExperience.summary.pt),
    ).toBeTruthy()

    expect(
      screen.getByText('Suporte de TI'),
    ).toBeTruthy()
  })

  it('opens and closes the experience details', () => {
    render(
      <ExperienceCard
        experience={axiaExperience}
        language="pt"
      />,
    )

    const showDetailsButton = screen.getByRole('button', {
      name: 'Ver detalhes',
    })

    expect(
      showDetailsButton.getAttribute('aria-expanded'),
    ).toBe('false')

    fireEvent.click(showDetailsButton)

    expect(
      screen.getByRole('heading', {
        name: 'Principais contribuições',
      }),
    ).toBeTruthy()

    expect(
      screen.getByText(
        axiaExperience.contributions[0].pt,
      ),
    ).toBeTruthy()

    const hideDetailsButton = screen.getByRole('button', {
      name: 'Ocultar detalhes',
    })

    expect(
      hideDetailsButton.getAttribute('aria-expanded'),
    ).toBe('true')

    fireEvent.click(hideDetailsButton)

    expect(
      screen.queryByRole('heading', {
        name: 'Principais contribuições',
      }),
    ).toBeNull()
  })

  it('displays translated content in English', () => {
    render(
      <ExperienceCard
        experience={realmeExperience}
        language="en"
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: realmeExperience.role.en,
      }),
    ).toBeTruthy()

    expect(
      screen.getByText(realmeExperience.summary.en),
    ).toBeTruthy()

    expect(
      screen.getByText('Technical Communication'),
    ).toBeTruthy()

    fireEvent.click(
      screen.getByRole('button', {
        name: 'View details',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Key contributions',
      }),
    ).toBeTruthy()

    expect(
      screen.getByText(
        realmeExperience.contributions[0].en,
      ),
    ).toBeTruthy()
  })

  it('expands each experience independently', () => {
    render(
      <>
        <ExperienceCard
          experience={axiaExperience}
          language="pt"
        />

        <ExperienceCard
          experience={realmeExperience}
          language="pt"
        />
      </>,
    )

    const initialButtons = screen.getAllByRole('button', {
      name: 'Ver detalhes',
    })

    expect(initialButtons).toHaveLength(2)

    fireEvent.click(initialButtons[0])

    expect(
      screen.getByRole('region', {
        name: 'Principais contribuições — AXIA Energia',
      }),
    ).toBeTruthy()

    expect(
      screen.getByRole('button', {
        name: 'Ver detalhes',
      }).getAttribute('aria-expanded'),
    ).toBe('false')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Ver detalhes',
      }),
    )

    expect(
      screen.getAllByRole('button', {
        name: 'Ocultar detalhes',
      }),
    ).toHaveLength(2)

    expect(
      screen.getByRole('region', {
        name: 'Principais contribuições — realme',
      }),
    ).toBeTruthy()
  })

  it('provides a related project link for Kosei Home', () => {
    render(
      <ExperienceCard
        experience={koseiExperience}
        language="pt"
      />,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Ver detalhes',
      }),
    )

    const relatedProjectLink = screen.getByRole('link', {
      name: 'Ver projeto relacionado',
    })

    expect(
      relatedProjectLink.getAttribute('href'),
    ).toBe('#projects')

    expect(
      screen.getByText('Natsu Matsuri Project'),
    ).toBeTruthy()
  })

  it('does not show a related project link when none exists', () => {
    render(
      <ExperienceCard
        experience={axiaExperience}
        language="pt"
      />,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Ver detalhes',
      }),
    )

    expect(
      screen.queryByRole('link', {
        name: 'Ver projeto relacionado',
      }),
    ).toBeNull()
  })
})
