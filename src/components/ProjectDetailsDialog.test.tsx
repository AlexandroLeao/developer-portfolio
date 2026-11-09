import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectDetailsDialog from './ProjectDetailsDialog'
import { projects } from '../data/projects'

const adventureFiles = projects.find((project) => project.id === 'adventure-files')!

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
})

describe('ProjectDetailsDialog', () => {
  it('balances detail columns and gives visual references their own full-width row', async () => {
    const user = userEvent.setup()
    render(<ProjectDetailsDialog project={adventureFiles} language="pt" />)

    await user.click(screen.getByRole('button', { name: 'Detalhes' }))

    const dialog = screen.getByRole('dialog', { name: 'Adventure Files' })
    const content = dialog.querySelector('#project-details-adventure-files')!
    const references = within(dialog).getByRole('heading', { name: 'Referências visuais' }).closest('section')!

    expect(content).toHaveClass('grid', 'sm:grid-cols-2', 'gap-x-6', 'gap-y-5')
    expect(content.children).toHaveLength(3)
    expect(references).toHaveClass('sm:col-span-2', 'min-w-0')
    expect(references.querySelector('ul')).toHaveClass('grid', 'sm:grid-cols-[0.8fr_0.8fr_1.4fr]')
    const referenceItems = references.querySelectorAll('li')
    expect(referenceItems).toHaveLength(3)
    expect(references.querySelector('img')).toBeNull()
    expect(referenceItems[0]).toHaveClass('items-center', 'justify-center', 'text-center')
    expect(referenceItems[1]).toHaveClass('items-center', 'justify-center', 'text-center')
    for (const reference of adventureFiles.details.visualReferences?.slice(0, 2) ?? []) {
      expect(within(references).getByText(reference.pt)).toBeInTheDocument()
    }
    const inspirationGrid = referenceItems[2].querySelector('div.grid-cols-3')!
    expect(Array.from(inspirationGrid.children, (item) => item.textContent)).toEqual([
      'D&D', 'Zelda', 'Pokémon', 'Mario', 'Fallout', 'Adventure Time',
    ])
    expect(within(dialog).getByRole('heading', { name: 'Desafio' })).toBeInTheDocument()
    expect(within(dialog).getByRole('heading', { name: 'Arquitetura' })).toBeInTheDocument()
  })

  it('keeps the content and reference layout consistent in English', async () => {
    const user = userEvent.setup()
    render(<ProjectDetailsDialog project={adventureFiles} language="en" />)

    await user.click(screen.getByRole('button', { name: 'Details' }))

    const dialog = screen.getByRole('dialog', { name: 'Adventure Files' })
    const references = within(dialog).getByRole('heading', { name: 'Visual references' }).closest('section')!
    expect(references).toHaveClass('sm:col-span-2')
    expect(within(references).getByText(adventureFiles.details.visualReferences![0].en)).toBeInTheDocument()
  })
})
