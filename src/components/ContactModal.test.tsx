import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactModal from './ContactModal'
import { contacts } from '../data/contacts'

function ContactModalHarness({ language = 'pt' }: { language?: 'pt' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open contact dialog
      </button>
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        language={language}
      />
    </>
  )
}

describe('ContactModal', () => {
  it('does not render its dialog when closed', () => {
    render(<ContactModal isOpen={false} onClose={vi.fn()} language="pt" />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('displays all four Portuguese contact links with the correct destinations', () => {
    render(<ContactModal isOpen onClose={vi.fn()} language="pt" />)

    const dialog = screen.getByRole('dialog', { name: 'Vamos conversar?' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(within(dialog).getAllByRole('link')).toHaveLength(4)

    for (const contact of contacts) {
      const link = within(dialog).getByRole('link', {
        name: new RegExp(contact.ariaLabel.pt),
      })

      expect(link).toHaveAttribute('href', contact.url)
      expect(link).toHaveTextContent(contact.display)
      if (contact.external) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      } else {
        expect(link).not.toHaveAttribute('target')
      }
    }

    expect(contacts.find((contact) => contact.id === 'whatsapp')?.url).toBe(
      'https://wa.me/5591988930042',
    )
  })

  it('translates its heading, description and close button into English', () => {
    render(<ContactModal isOpen onClose={vi.fn()} language="en" />)

    expect(screen.getByRole('dialog', { name: "Let's connect!" })).toBeInTheDocument()
    expect(
      screen.getByText(/choose your preferred channel to discuss projects/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close contacts' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /visit alexandro leão's github profile/i }),
    ).toHaveAttribute('href', 'https://github.com/AlexandroLeao')
  })

  it('moves focus into the dialog and restores it to the opener on close', async () => {
    const user = userEvent.setup()
    render(<ContactModalHarness />)

    const opener = screen.getByRole('button', { name: 'Open contact dialog' })
    opener.focus()
    await user.click(opener)

    const closeButton = screen.getByRole('button', { name: 'Fechar contatos' })
    expect(closeButton).toHaveFocus()

    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<ContactModalHarness />)

    await user.click(screen.getByRole('button', { name: 'Open contact dialog' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open contact dialog' })).toHaveFocus()
  })

  it('closes when the backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<ContactModalHarness />)

    await user.click(screen.getByRole('button', { name: 'Open contact dialog' }))
    const dialog = screen.getByRole('dialog')
    const backdrop = dialog.parentElement
    if (!backdrop) throw new Error('Expected a dialog backdrop')

    fireEvent.mouseDown(backdrop)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not close when the dialog content is clicked', () => {
    const onClose = vi.fn()
    render(<ContactModal isOpen onClose={onClose} language="pt" />)

    fireEvent.mouseDown(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('locks background scrolling while open and restores the original setting', () => {
    const onClose = vi.fn()
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'auto'

    try {
      const { rerender, unmount } = render(
        <ContactModal isOpen onClose={onClose} language="pt" />,
      )

      expect(document.body.style.overflow).toBe('hidden')

      rerender(<ContactModal isOpen={false} onClose={onClose} language="pt" />)
      expect(document.body.style.overflow).toBe('auto')

      unmount()
    } finally {
      document.body.style.overflow = originalOverflow
    }
  })
})
