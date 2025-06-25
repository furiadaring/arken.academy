import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { Locale } from '.'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : (routing.defaultLocale as Locale)

  try {
    const messages = (await import(`./dictionaries/${locale}/messages.json`)).default

    return {
      locale,
      messages,
    }
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error)
    return {
      locale,
      messages: {},
    }
  }
})
