import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Footer from './Footer'
import { contacts } from '../data/contacts'

describe('Footer', () => {
  it('shows the professional identity and all four direct contact links', () => {
    render(<Footer language="pt" />)

    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: 'Voltar ao início' })).toHaveTextContent('Alexandro Leão')
    expect(within(footer).getByText('Desenvolvedor de Software')).toBeInTheDocument()

    const navigation = within(footer).getByRole('navigation', {
      name: 'Redes sociais e canais de contato',
    })

    expect(within(navigation).getAllByRole('link')).toHaveLength(4)

    for (const contact of contacts) {
      const link = within(navigation).getByRole('link', {
        name: new RegExp(contact.ariaLabel.pt),
      })
      expect(link).toHaveAttribute('href', contact.url)

      if (contact.external) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      } else {
        expect(link).not.toHaveAttribute('target')
      }
    }
  })

  it('uses the English translations when language is English', () => {
    render(<Footer language="en" />)

    expect(screen.getByText('Software Developer')).toBeInTheDocument()
    expect(screen.getByText('All rights reserved.', { exact: false })).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', {
        name: 'Social networks and contact channels',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /visit alexandro leão's linkedin profile/i }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/alexandroleao/')
  })

  it('keeps the back-to-top link separate from contact destinations', () => {
    render(<Footer language="pt" />)

    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute(
      'href',
      '#home',
    )

    const navigation = screen.getByRole('navigation', {
      name: 'Redes sociais e canais de contato',
    })
    for (const link of within(navigation).getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toBe('#home')
    }
    expect(
      within(navigation).getByRole('link', {
        name: /iniciar conversa com alexandro leão no whatsapp/i,
      }),
    ).toHaveAttribute('href', 'https://wa.me/5591988930042')
  })

  it('displays the current copyright year automatically', () => {
    render(<Footer language="pt" />)

    expect(screen.getByText(`© ${new Date().getFullYear()} Alexandro Leão. Todos os direitos reservados.`)).toBeInTheDocument()
  })
})
