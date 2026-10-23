
export type ContactLanguage = 'pt' | 'en'

export type ContactId =
  | 'email'
  | 'linkedin'
  | 'github'
  | 'whatsapp'

export type ContactIcon =
  | 'mail'
  | 'linkedin'
  | 'github'
  | 'message-circle'

export type LocalizedContactText = {
  pt: string
  en: string
}

export type ContactChannel = {
  id: ContactId
  icon: ContactIcon
  label: LocalizedContactText
  display: string
  url: string
  ariaLabel: LocalizedContactText
  external: boolean
}

export const contacts: ContactChannel[] = [
  {
    id: 'email',
    icon: 'mail',
    label: {
      pt: 'E-mail',
      en: 'Email',
    },
    display: 'alexmilhomes.aml@gmail.com',
    url: 'mailto:alexmilhomes.aml@gmail.com',
    ariaLabel: {
      pt: 'Enviar e-mail para Alexandro Leão',
      en: 'Send an email to Alexandro Leão',
    },
    external: false,
  },
  {
    id: 'linkedin',
    icon: 'linkedin',
    label: {
      pt: 'LinkedIn',
      en: 'LinkedIn',
    },
    display: 'linkedin.com/in/alexandroleao',
    url: 'https://www.linkedin.com/in/alexandroleao/',
    ariaLabel: {
      pt: 'Visitar o LinkedIn de Alexandro Leão',
      en: "Visit Alexandro Leão's LinkedIn profile",
    },
    external: true,
  },
  {
    id: 'github',
    icon: 'github',
    label: {
      pt: 'GitHub',
      en: 'GitHub',
    },
    display: 'github.com/AlexandroLeao',
    url: 'https://github.com/AlexandroLeao',
    ariaLabel: {
      pt: 'Visitar o GitHub de Alexandro Leão',
      en: "Visit Alexandro Leão's GitHub profile",
    },
    external: true,
  },
  {
    id: 'whatsapp',
    icon: 'message-circle',
    label: {
      pt: 'WhatsApp',
      en: 'WhatsApp',
    },
    display: '(91) 98893-0042',
    url: 'https://wa.me/5591988930042',
    ariaLabel: {
      pt: 'Iniciar conversa com Alexandro Leão no WhatsApp',
      en: 'Start a WhatsApp conversation with Alexandro Leão',
    },
    external: true,
  },
]

export function getContactById(
  id: ContactId,
): ContactChannel | undefined {
  return contacts.find((contact) => contact.id === id)
}
