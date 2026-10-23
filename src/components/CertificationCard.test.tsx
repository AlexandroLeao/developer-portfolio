import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CertificationCard from './CertificationCard'
import { certifications } from '../data/certifications'

const softwareEngineering = certifications.find(
  (certification) => certification.id === 'software-engineering',
)!

const directCertificate = certifications.find(
  (certification) => certification.verification?.type === 'direct',
)!

const certificateWithoutVerification = certifications.find(
  (certification) => !certification.verification,
)!

describe('CertificationCard', () => {
  it('displays a certificate in Portuguese with its key information', () => {
    render(
      <CertificationCard
        certification={softwareEngineering}
        language="pt"
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Engenharia de Software' }),
    ).toBeInTheDocument()
    expect(screen.getByText('FIAP Nano Courses')).toBeInTheDocument()
    expect(screen.getByText(/100h/)).toBeInTheDocument()
    expect(screen.getByText('Requisitos')).toBeInTheDocument()
    expect(
      screen.getByText(softwareEngineering.summary.pt),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Ver detalhes' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('region', { name: /Conteúdos abordados/ }),
    ).not.toBeInTheDocument()
  })

  it('expands and collapses the course topics using an accessible button', async () => {
    const user = userEvent.setup()
    render(
      <CertificationCard
        certification={softwareEngineering}
        language="pt"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    expect(
      screen.getByRole('button', { name: 'Ocultar detalhes' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('region', {
        name: /Conteúdos abordados — Engenharia de Software/,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(softwareEngineering.topics[0].pt)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ocultar detalhes' }))

    expect(
      screen.getByRole('button', { name: 'Ver detalhes' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByText(softwareEngineering.topics[0].pt),
    ).not.toBeInTheDocument()
  })

  it('translates the card and expanded content into English', async () => {
    const user = userEvent.setup()
    render(
      <CertificationCard
        certification={softwareEngineering}
        language="en"
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Software Engineering' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Requirements')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'View details' }))

    expect(screen.getByText('Topics covered')).toBeInTheDocument()
    expect(
      screen.getByText(softwareEngineering.topics[0].en),
    ).toBeInTheDocument()
    expect(screen.getByText('Credential verification')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Copy code' }),
    ).toBeInTheDocument()
  })

  it('expands cards independently', async () => {
    const user = userEvent.setup()
    render(
      <>
        <CertificationCard
          certification={softwareEngineering}
          language="pt"
        />
        <CertificationCard
          certification={directCertificate}
          language="pt"
        />
      </>,
    )

    const cards = screen.getAllByRole('article')
    const firstCard = within(cards[0])
    const secondCard = within(cards[1])

    await user.click(firstCard.getByRole('button', { name: 'Ver detalhes' }))

    expect(
      firstCard.getByRole('button', { name: 'Ocultar detalhes' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      secondCard.getByRole('button', { name: 'Ver detalhes' }),
    ).toHaveAttribute('aria-expanded', 'false')

    await user.click(secondCard.getByRole('button', { name: 'Ver detalhes' }))

    expect(
      firstCard.getByRole('button', { name: 'Ocultar detalhes' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      secondCard.getByRole('button', { name: 'Ocultar detalhes' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('displays the official direct verification link safely', async () => {
    const user = userEvent.setup()
    render(
      <CertificationCard
        certification={directCertificate}
        language="pt"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    if (directCertificate.verification?.type !== 'direct') {
      throw new Error('Expected a certificate with direct verification')
    }

    const certificateLink = screen.getByRole('link', {
      name: /Ver certificado/,
    })

    expect(certificateLink).toHaveAttribute(
      'href',
      directCertificate.verification.url,
    )
    expect(certificateLink).toHaveAttribute('target', '_blank')
    expect(certificateLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('copies a manual verification code and links to the issuer portal', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    render(
      <CertificationCard
        certification={softwareEngineering}
        language="pt"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    if (softwareEngineering.verification?.type !== 'manual') {
      throw new Error('Expected a certificate with manual verification')
    }

    expect(
      screen.getByText(softwareEngineering.verification.code),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /Validar certificado/ }),
    ).toHaveAttribute('href', softwareEngineering.verification.portalUrl)

    await user.click(screen.getByRole('button', { name: 'Copiar código' }))

    expect(writeText).toHaveBeenCalledWith(softwareEngineering.verification.code)
    expect(
      screen.getByRole('button', { name: 'Código copiado!' }),
    ).toBeInTheDocument()
  })

  it('does not show verification actions when no verified URL or code exists', async () => {
    const user = userEvent.setup()
    render(
      <CertificationCard
        certification={certificateWithoutVerification}
        language="pt"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    expect(screen.getByText('Conteúdos abordados')).toBeInTheDocument()
    expect(screen.queryByText('Verificação da certificação')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copiar código' })).not.toBeInTheDocument()
  })
})
