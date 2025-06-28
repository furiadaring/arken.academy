import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'tr'] as const
export type TLocale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'never',
})
