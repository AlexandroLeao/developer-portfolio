
import { useState } from 'react'
import {
  ArrowUpRight,
  Award,
  Check,
  ChevronDown,
  Copy,
} from 'lucide-react'
import type {
  Certification,
  CertificationLanguage,
} from '../data/certifications'

type CertificationCardProps = {
  certification: Certification
  language: CertificationLanguage
}

const translations = {
  pt: {
    showDetails: 'Ver detalhes',
    hideDetails: 'Ocultar detalhes',
    skills: 'Competências',
    topics: 'Conteúdos abordados',
    verification: 'Verificação da certificação',
    viewCertificate: 'Ver certificado',
    verifyCertificate: 'Validar certificado',
    verificationCode: 'Código de autenticação',
    copyCode: 'Copiar código',
    copied: 'Código copiado!',
    copyError: 'Não foi possível copiar o código.',
    manualInstructions:
      'Copie o código e informe-o no portal oficial da instituição.',
    opensNewTab: 'Abre em uma nova aba',
  },
  en: {
    showDetails: 'View details',
    hideDetails: 'Hide details',
    skills: 'Skills',
    topics: 'Topics covered',
    verification: 'Credential verification',
    viewCertificate: 'View certificate',
    verifyCertificate: 'Verify certificate',
    verificationCode: 'Verification code',
    copyCode: 'Copy code',
    copied: 'Code copied!',
    copyError: 'Unable to copy the code.',
    manualInstructions:
      'Copy the code and enter it on the institution’s official verification portal.',
    opensNewTab: 'Opens in a new tab',
  },
}

function formatCompletionDate(
  date: string,
  language: CertificationLanguage,
) {
  const parsedDate = new Date(`${date}T12:00:00Z`)

  return new Intl.DateTimeFormat(
    language === 'pt' ? 'pt-BR' : 'en-US',
    {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(parsedDate)
}

export default function CertificationCard({
  certification,
  language,
}: CertificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copyStatus, setCopyStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const text = translations[language]
  const detailsId = `certification-details-${certification.id}`

  const verification = certification.verification

  async function handleCopyCode() {
    if (!verification || verification.type !== 'manual') {
      return
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      await navigator.clipboard.writeText(verification.code)
      setCopyStatus('success')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-primary) hover:shadow-lg focus-within:border-(--color-primary) motion-reduce:transform-none motion-reduce:transition-none">
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        {/* INSTITUIÇÃO E ÍCONE */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-(--color-primary)">
              {certification.issuer}
            </p>

            <p className="mt-2 text-xs text-(--color-text-muted)">
              {formatCompletionDate(
                certification.completedAt,
                language,
              )}

              {certification.duration && (
                <>
                  <span
                    aria-hidden="true"
                    className="mx-2"
                  >
                    ·
                  </span>

                  {certification.duration[language]}
                </>
              )}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-background) text-(--color-primary) transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none">
            <Award
              size={23}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* TÍTULO */}
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-(--color-text) sm:text-2xl">
          {certification.title[language]}
        </h3>

        {/* RESUMO */}
        <p className="mt-4 text-sm leading-7 text-(--color-text-muted) sm:text-base">
          {certification.summary[language]}
        </p>

        {/* COMPETÊNCIAS */}
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
            {text.skills}
          </h4>

          <ul className="flex flex-wrap gap-2">
            {certification.skills.map((skill, index) => (
              <li
                key={`${certification.id}-skill-${index}`}
                className="rounded-full border border-(--color-border) bg-(--color-background) px-3 py-1.5 text-xs font-medium text-(--color-text)"
              >
                {skill[language]}
              </li>
            ))}
          </ul>
        </div>

        {/* DETALHES EXPANSÍVEIS */}
        <div className="mt-auto pt-7">
          <div className="border-t border-(--color-border) pt-5">
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={() => {
                setIsExpanded((current) => !current)
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              {isExpanded
                ? text.hideDetails
                : text.showDetails}

              <ChevronDown
                size={17}
                aria-hidden="true"
                className={`transition-transform duration-200 motion-reduce:transition-none ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {isExpanded && (
            <div
              id={detailsId}
              role="region"
              aria-label={`${text.topics} — ${certification.title[language]}`}
              className="mt-6 space-y-6"
            >
              {/* CONTEÚDOS APRENDIDOS */}
              <div>
                <h4 className="font-display mb-4 text-base font-semibold text-(--color-text)">
                  {text.topics}
                </h4>

                <ul className="space-y-3">
                  {certification.topics.map(
                    (topic, index) => (
                      <li
                        key={`${certification.id}-topic-${index}`}
                        className="flex items-start gap-3 text-sm leading-7 text-(--color-text-muted)"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)"
                        />

                        <span>{topic[language]}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* VERIFICAÇÃO DA CERTIFICAÇÃO */}
              {verification && (
                <div className="border-t border-(--color-border) pt-5">
                  <h4 className="font-display mb-4 text-base font-semibold text-(--color-text)">
                    {text.verification}
                  </h4>

                  {verification.type === 'direct' && (
                    <a
                      href={verification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${text.viewCertificate} — ${certification.title[language]}. ${text.opensNewTab}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-primary) transition-colors hover:border-(--color-primary) hover:bg-(--color-background) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
                    >
                      {text.viewCertificate}

                      <ArrowUpRight
                        size={17}
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  {verification.type === 'manual' && (
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-xs font-semibold text-(--color-text-muted)">
                          {text.verificationCode}
                        </p>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <code className="min-w-0 flex-1 break-all rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-3 text-xs leading-6 text-(--color-text)">
                            {verification.code}
                          </code>

                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-(--color-border) px-4 py-2.5 text-sm font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
                          >
                            {copyStatus === 'success' ? (
                              <Check
                                size={17}
                                aria-hidden="true"
                              />
                            ) : (
                              <Copy
                                size={17}
                                aria-hidden="true"
                              />
                            )}

                            {copyStatus === 'success'
                              ? text.copied
                              : text.copyCode}
                          </button>
                        </div>

                        <p
                          role="status"
                          aria-live="polite"
                          className="mt-2 text-xs text-(--color-text-muted)"
                        >
                          {copyStatus === 'success'
                            ? text.copied
                            : copyStatus === 'error'
                              ? text.copyError
                              : ''}
                        </p>
                      </div>

                      <p className="text-sm leading-7 text-(--color-text-muted)">
                        {text.manualInstructions}
                      </p>

                      <a
                        href={verification.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${text.verifyCertificate} — ${certification.title[language]}. ${text.opensNewTab}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-primary) transition-colors hover:border-(--color-primary) hover:bg-(--color-background) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
                      >
                        {text.verifyCertificate}

                        <ArrowUpRight
                          size={17}
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
