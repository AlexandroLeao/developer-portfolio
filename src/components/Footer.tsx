import { ArrowUpRight } from 'lucide-react'
import ContactIcon from './ContactIcon'
import {
  contacts,
  type ContactLanguage,
} from '../data/contacts'

type FooterProps = {
  language: ContactLanguage
}

const translations = {
  pt: {
    role: 'Desenvolvedor de Software',
    description:
      'Gosto de entender problemas e transformar ideias em soluções que facilitem o dia a dia.',
    rights: 'Todos os direitos reservados.',
    contactLabel: 'Redes sociais e canais de contato',
    opensNewTab: 'Abre em uma nova aba',
    backToTop: 'Voltar ao início',
  },
  en: {
    role: 'Software Developer',
    description:
      'I enjoy understanding problems and turning ideas into solutions that make everyday life easier.',
    rights: 'All rights reserved.',
    contactLabel: 'Social networks and contact channels',
    opensNewTab: 'Opens in a new tab',
    backToTop: 'Back to top',
  },
}

export default function Footer({ language }: FooterProps) {
  const text = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* NAME AND INTRODUCTION */}
          <div className="max-w-md">
            <a
              href="#home"
              aria-label={text.backToTop}
              className="font-display inline-block text-xl font-bold tracking-tight text-(--color-text) transition-colors hover:text-(--color-primary) focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary)"
            >
              Alexandro Leão
              <span className="text-(--color-primary)">.</span>
            </a>

            <p className="mt-2 text-sm font-semibold text-(--color-primary)">
              {text.role}
            </p>

            <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">
              {text.description}
            </p>
          </div>

          {/* DIRECT CONTACT LINKS */}
          <nav aria-label={text.contactLabel}>
            <ul className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <a
                    href={contact.url}
                    target={
                      contact.external ? '_blank' : undefined
                    }
                    rel={
                      contact.external
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={
                      contact.external
                        ? `${contact.ariaLabel[language]}. ${text.opensNewTab}`
                        : contact.ariaLabel[language]
                    }
                    title={contact.label[language]}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-background) text-(--color-text) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:text-(--color-primary) hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-primary) motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <ContactIcon
                      icon={contact.icon}
                      size={21}
                    />

                    <ArrowUpRight
                      size={11}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="absolute right-1.5 top-1.5 text-(--color-primary) opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* DIVIDER */}
        <div
          aria-hidden="true"
          className="my-8 h-px w-full bg-(--color-border)"
        />

        {/* COPYRIGHT */}
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs leading-6 text-(--color-text-muted)">
            © {currentYear} Alexandro Leão. {text.rights}
          </p>

          <p className="text-xs text-(--color-text-muted)">
            Belém, Pará · Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
