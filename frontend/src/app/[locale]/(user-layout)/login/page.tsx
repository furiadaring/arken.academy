import { useTranslations } from 'next-intl'

import { signIn } from '@/auth'
import { GoogleIcon, MailRuIcon, PasswordIcon, RegisterIcon, YandexIcon } from '@/components/shared/icons'
import { LoginBtn } from '@/components/shared/login-btn'
import { SectionTitle } from '@/components/shared/section-title'
import Link from 'next/link'

const btns = [
  { title: 'Google', icon: <GoogleIcon /> },
  { title: 'Yandex', icon: <YandexIcon /> },
  { title: 'MailRu', icon: <MailRuIcon /> },
]

export default function LoginPage() {
  const t = useTranslations('login')

  return (
    <section className="mx-auto flex min-h-[calc(100svh-99px)] flex-col items-center justify-center gap-6 px-3 py-10">
      <div className="max-w-2xl">
        <div className="space-y-3 pb-8 text-center">
          <SectionTitle className="pb-2 !text-[32px]">{t('title')}</SectionTitle>
          <p className="font-light">{t('subtitle')}</p>
        </div>
        <div className="mx-auto max-w-[470px] space-y-3">
          {btns.map((btn, index) => (
            <form
              key={btn.title}
              action={async () => {
                'use server'
                await signIn(btn.title.toLowerCase(), { redirectTo: '/account/all-packages' })
              }}
            >
              <LoginBtn white={index === 0} title={`${t('btn')} ${btn.title}`} icon={btn.icon} />
            </form>
          ))}
          <Link href="/auth?login=true">
            <LoginBtn title={t('login')} icon={<PasswordIcon />} />
          </Link>
          <div className="flex items-center justify-center gap-4 py-6">
            <span className="h-[1px] w-full bg-white/10"></span>
            <p className="text-center font-light text-white/60">{t('or')}</p>
            <span className="h-[1px] w-full bg-white/10"></span>
          </div>
          <Link href="/auth?register=true">
            <LoginBtn title={t('register')} icon={<RegisterIcon />} />
          </Link>
          <p className="pt-6 text-center font-light text-white/60">
            🔒{' '}
            {t.rich('policy', {
              policy: (chunks) => <Link href="/policy/privacy">{chunks}</Link>,
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
