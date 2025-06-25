export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localesWithFlags = {
  ru: {
    flag: '/ru.svg',
    name: 'Русский',
  },
  en: {
    flag: '/en.svg',
    name: 'English',
  },
}
