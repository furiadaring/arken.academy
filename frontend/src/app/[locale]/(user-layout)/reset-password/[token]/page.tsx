import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { SectionTitle } from '@/components/shared/section-title'
import { api } from '@/lib/api'
import console from 'console'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function PasswordResetPage({ params }: { params: Promise<{ token: string }> }) {
  const token = (await params).token
  const t = await getTranslations('resetPassword')

  try {
    console.log('Verifying token:', token)
    const response = await api.post('/users/token', { token })
    console.log('Token response:', response)

    if (!response?.data) {
      console.error('User not found for token')
      return (
        <section className="mx-auto flex min-h-[calc(100svh-99px)] flex-col items-center justify-center gap-6 py-10">
          <div className="w-full max-w-md px-4 text-center">
            <h2 className="text-xl font-bold">{t('invalidToken')}</h2>
            <p className="mt-4">{t('tokenExpired')}</p>
            <Link href="/auth" className="mt-6 inline-block text-lime-500 hover:underline">
              {t('backToLogin')}
            </Link>
          </div>
        </section>
      )
    }

    return (
      <section className="mx-auto flex min-h-[calc(100svh-99px)] flex-col items-center justify-center gap-6 py-10">
        <div className="w-full max-w-md px-4">
          <div className="space-y-3 pb-8 text-center">
            <SectionTitle className="!text-[32px]">{t('title')}</SectionTitle>
            <p className="font-light">{t('subtitle')}</p>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error fetching user by token:', error)
    return (
      <section className="mx-auto flex min-h-[calc(100svh-99px)] flex-col items-center justify-center gap-6 py-10">
        <div className="w-full max-w-md px-4 text-center">
          <h2 className="text-xl font-bold">{t('invalidToken')}</h2>
          <Link href="/auth" className="mt-6 inline-block text-lime-500 hover:underline">
            {t('backToLogin')}
          </Link>
        </div>
      </section>
    )
  }
}
