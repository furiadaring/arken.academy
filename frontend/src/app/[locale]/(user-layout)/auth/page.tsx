'use client'

import { LoginForm } from '@/components/auth/login-form'
import { RegisterForm } from '@/components/auth/register-form'
import { LoginIcon } from '@/components/shared/icons'
import { LoginBtn } from '@/components/shared/login-btn'
import { SectionTitle } from '@/components/shared/section-title'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [haveAccount, setHaveAccount] = useState(searchParams.get('login') === 'true')
  const t = useTranslations('register')

  return (
    <section className="mx-auto flex min-h-[calc(100svh-99px)] flex-col items-center justify-center gap-6 py-10">
      <div className="w-full max-w-md px-4">
        <div className="space-y-3 pb-8 text-center">
          <SectionTitle className="!text-[32px]">{haveAccount ? t('titleLogin') : t('titleRegister')}</SectionTitle>
          <p className="font-light">{haveAccount ? t('subtitleLogin') : t('subtitleRegister')}</p>
        </div>
        <div className="mx-auto w-full max-w-[470px] space-y-3">
          {haveAccount ? <LoginForm /> : <RegisterForm />}
          <div className="flex items-center justify-center gap-4 py-6">
            <span className="h-[1px] w-full bg-white/10"></span>
            <p className="shrink-0 text-center font-light text-white/60">
              {haveAccount ? t('isNotRegisteredYet') : t('haveAccount')}
            </p>
            <span className="h-[1px] w-full bg-white/10"></span>
          </div>
          <LoginBtn
            onClick={() => setHaveAccount(!haveAccount)}
            title={haveAccount ? t('btn') : t('login')}
            icon={<LoginIcon />}
          />
        </div>
      </div>
    </section>
  )
}
