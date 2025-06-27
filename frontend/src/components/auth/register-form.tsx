'use client'

import { registerUser } from '@/actions/user-register'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Spinner } from '../shared/spinner'

export const RegisterForm = () => {
  const t = useTranslations('register')
  const router = useRouter()
  const [state, formAction, isLoading] = useActionState(registerUser, null)

  useEffect(() => {
    if (!state) return
    console.log('State updated:', state)

    if (state.message === 'success') {
      toast.success(t('successMessageRegister'))
      setTimeout(() => {
        console.log('Redirecting to account page...')
        router.push('/account/all-packages')
      }, 1500)
    } else {
      console.log('Error detected in form:', state.message)
      toast.error(state.message)
    }
  }, [state, t, router])

  return (
    <form className="space-y-3" action={formAction}>
      <input
        defaultValue={state?.data?.name}
        name="name"
        type="text"
        placeholder={t('name')}
        className="border-text/15 bg-background/10 w-full rounded-[64px] border py-5 pl-14"
        required
      />
      <input
        defaultValue={state?.data?.email}
        name="email"
        type="email"
        placeholder={t('email')}
        className="border-text/15 bg-background/10 w-full rounded-[64px] border py-5 pl-14"
        required
      />
      <input
        name="password"
        type="password"
        placeholder={t('password')}
        className="border-text/15 bg-background/10 w-full rounded-[64px] border py-5 pl-14"
        required
      />
      <Button type="submit" className="mt-3 py-4" disabled={isLoading}>
        <span className="flex items-center gap-2">
          {isLoading ? <Spinner /> : null}
          {t('btn')}
        </span>
      </Button>
    </form>
  )
}
