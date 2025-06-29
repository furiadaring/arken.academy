export const i18n = {
  defaultLocale: 'tr',
  locales: ['en', 'tr'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localesWithFlags = {
  en: {
    flag: '/en.svg',
    name: 'English',
  },
  tr: {
    flag: '/tr.svg',
    name: 'Türkçe',
  },
}
