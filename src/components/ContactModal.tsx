import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import ContactIcon from './ContactIcon'
import {
  contacts,
  type ContactChannel,
  type ContactLanguage,
} from '../data/contacts'

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
  language: ContactLanguage
}

const translations = {
  pt: {
    eyebrow: 'ENTRE EM CONTATO',
    title: 'Vamos conversar?',
    description:
      'Escolha o canal que preferir para conversarmos sobre projetos, oportunidades profissionais ou colaborações.',
    close: 'Fechar contatos',
    externalLink: 'Abre em uma nova aba',
  },
  en: {
    eyebrow: 'GET IN TOUCH',
    title: "Let's connect!",
    description:
      'Choose your preferred channel to discuss projects, professional opportunities, or collaborations.',
    close: 'Close contacts',
    externalLink: 'Opens in a new tab',
  },
}

function ContactLink({
  contact,
  language,
}: {
  contact: ContactChannel
  language: ContactLanguage
}) {
  const text = translations[language]

  return (
    <a
      href={contact.url}
      target={contact.external ? '_blank' : undefined}
      rel={contact.external ? 'noopener noreferrer' : undefined}
      aria-label={
        contact.external
          ? `${contact.ariaLabel[language]}. ${text.externalLink}`
          : contact.ariaLabel[language]
      }
      className="group flex min-w-0 items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-background) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transform-none motion-reduce:transition-none sm:p-5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface) text-(--color-primary) transition-colors group-hover:border-(--color-primary)">
        <ContactIcon icon={contact.icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-(--color-text) sm:text-base">
          {contact.label[language]}
        </span>

        <span className="mt-1 block break-all text-xs leading-5 text-(--color-text-muted) sm:text-sm">
          {contact.display}
        </span>
      </span>

      <ArrowUpRight
        size={19}
        aria-hidden="true"
        className="shrink-0 text-(--color-primary) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
      />
    </a>
  )
}

export default function ContactModal({
  isOpen,
  onClose,
  language,
}: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)

  const text = translations[language]

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousBodyOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const dialog = dialogRef.current
      if (!dialog) {
        return
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0)

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (!dialog.contains(activeElement)) {
        event.preventDefault()
        if (event.shiftKey) {
          lastElement.focus()
        } else {
          firstElement.focus()
        }
        return
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      previousActiveElement?.focus()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        tabIndex={-1}
        className="w-full max-h-full max-w-xl overflow-y-auto rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-2xl outline-none sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-(--color-primary)">
              {text.eyebrow}
            </p>

            <h2
              id="contact-modal-title"
              className="font-display mt-3 text-2xl font-bold tracking-tight text-(--color-text) sm:text-3xl"
            >
              {text.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={text.close}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--color-border) text-(--color-text) transition-colors hover:border-(--color-primary) hover:text-(--color-primary) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <p
          id="contact-modal-description"
          className="mt-5 text-sm leading-7 text-(--color-text-muted) sm:text-base"
        >
          {text.description}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3">
          {contacts.map((contact) => (
            <ContactLink
              key={contact.id}
              contact={contact}
              language={language}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-7 h-1 w-14 rounded-full bg-(--color-primary)"
        />
      </div>
    </div>
  )
}
