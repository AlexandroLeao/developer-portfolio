
import { useRef, useState } from 'react'
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  X,
} from 'lucide-react'
import type {
  Certification,
  CertificationLanguage,
} from '../data/certifications'

type CertificationCardProps = {
  certification: Certification
  language: CertificationLanguage
  hideOnMobile?: boolean
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
  hideOnMobile = false,
}: CertificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
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
    <article className={`group h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) transition-[transform,border-color] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-(--color-primary) focus-within:border-(--color-primary) motion-reduce:transform-none motion-reduce:transition-none ${hideOnMobile ? 'hidden sm:flex' : 'flex'}`}>
      <div className="flex flex-1 flex-col p-4">
        {/* INSTITUIÇÃO E ÍCONE */}
        <div className="mb-3 flex min-h-12 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-(--color-primary)">
              {certification.issuer}
            </p>

            <p className="mt-1 text-[11px] text-(--color-text-muted)">
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

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-background) text-(--color-primary)">
            <Award
              size={18}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* TÍTULO */}
        <h3 className="font-display min-h-12 text-base font-bold leading-snug tracking-tight text-(--color-text) sm:min-h-14 sm:text-lg">
          {certification.title[language]}
        </h3>

        {/* RESUMO */}
        <p className="mt-2 flex-1 text-xs leading-5 text-(--color-text-muted)">
          {certification.summary[language]}
        </p>

        {/* COMPETÊNCIAS */}
        <div className="mt-4 sm:min-h-20">
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
            {text.skills}
          </h4>

          <ul className="flex flex-wrap gap-1.5">
            {certification.skills.map((skill, index) => (
              <li
                key={`${certification.id}-skill-${index}`}
                className="rounded-full border border-(--color-border) bg-(--color-background) px-2 py-1 text-[11px] font-medium text-(--color-text)"
              >
                {skill[language]}
              </li>
            ))}
          </ul>
        </div>

        {/* DETALHES EXPANSÍVEIS */}
        <div className="mt-3 border-t border-(--color-border) pt-3">
          <div className="flex justify-center">
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={() => {
                dialogRef.current?.showModal()
                setIsExpanded(true)
              }}
              className="inline-flex min-h-9 items-center justify-center rounded-full border border-(--color-border) px-4 py-1.5 text-xs font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
            >
              {text.showDetails}
            </button>
          </div>

          <dialog
            ref={dialogRef}
            onClose={() => setIsExpanded(false)}
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              if (
                event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom
              ) {
                event.currentTarget.close()
              }
            }}
            aria-modal="true"
            aria-labelledby={`cert-dialog-title-${certification.id}`}
            className="fixed inset-0 m-auto max-h-[calc(100dvh-1.5rem)] w-[min(94vw,54rem)] overflow-y-auto rounded-2xl border border-(--color-border) bg-(--color-surface) p-0 text-(--color-text) shadow-2xl backdrop:bg-black/70"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(--color-border) bg-(--color-surface) p-4 sm:p-5">
              <h3
                id={`cert-dialog-title-${certification.id}`}
                className="font-display text-lg font-bold leading-snug sm:text-xl"
              >
                {certification.title[language]}
              </h3>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label={text.hideDetails}
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--color-border) text-(--color-text) hover:border-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div
              id={detailsId}
              role="region"
              aria-label={`${text.topics} — ${certification.title[language]}`}
              className={verification ? 'grid gap-5 p-4 sm:p-5 md:grid-cols-2' : 'p-4 sm:p-5'}
            >
              {/* CONTEÚDOS APRENDIDOS */}
              <div>
                <h4 className="font-display mb-3 text-sm font-semibold text-(--color-text)">
                  {text.topics}
                </h4>

                <ul className="space-y-2.5">
                  {certification.topics.map(
                    (topic, index) => (
                      <li
                        key={`${certification.id}-topic-${index}`}
                        className="flex items-start gap-2 text-xs leading-5 text-(--color-text-muted) sm:text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-primary)"
                        />

                        <span>{topic[language]}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* VERIFICAÇÃO DA CERTIFICAÇÃO */}
              {verification && (
                <div className="min-w-0 border-t border-(--color-border) pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5">
                  <h4 className="font-display mb-3 text-sm font-semibold text-(--color-text)">
                    {text.verification}
                  </h4>

                  {verification.type === 'direct' && (
                    <a
                      href={verification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${text.viewCertificate} — ${certification.title[language]}. ${text.opensNewTab}`}
                      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold text-(--color-primary) transition-colors hover:border-(--color-primary) hover:bg-(--color-background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
                    >
                      {text.viewCertificate}

                      <ArrowUpRight
                        size={17}
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  {verification.type === 'manual' && (
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs font-semibold text-(--color-text-muted)">
                          {text.verificationCode}
                        </p>

                        <div className="flex flex-col gap-2">
                          <code className="min-w-0 break-all rounded-lg border border-(--color-border) bg-(--color-background) px-3 py-2 text-[11px] leading-5 text-(--color-text)">
                            {verification.code}
                          </code>

                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
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
                          className="mt-1 text-xs text-(--color-text-muted)"
                        >
                          {copyStatus === 'success'
                            ? text.copied
                            : copyStatus === 'error'
                              ? text.copyError
                              : ''}
                        </p>
                      </div>

                      <p className="text-xs leading-5 text-(--color-text-muted)">
                        {text.manualInstructions}
                      </p>

                      <a
                        href={verification.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${text.verifyCertificate} — ${certification.title[language]}. ${text.opensNewTab}`}
                        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-semibold text-(--color-primary) transition-colors hover:border-(--color-primary) hover:bg-(--color-background) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)"
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
          </dialog>
        </div>
      </div>
    </article>
  )
}
