import { routing } from '@/i18/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Noto_Sans, Sofia_Sans_Extra_Condensed } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Toaster } from 'sonner'
import '../globals.css'

const mainFont = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['cyrillic', 'latin'],
})

const secondaryFont = Sofia_Sans_Extra_Condensed({
  variable: '--font-secondary',
  subsets: ['cyrillic', 'latin'],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('layout')
  const title = t('title')
  const description = t('description')
  const keywords = t('keywords').split(', ')
  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className={`${mainFont.variable} ${secondaryFont.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster toastOptions={{ style: { background: '#222222', color: '#fff', border: '1px solid #FFFFFF26' } }} />
      </body>
    </html>
  )
}
