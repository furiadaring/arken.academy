import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'ru'] as const
export type TLocale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'ru',
  localePrefix: 'never',
})
