'use client'

import { loginUser } from '@/actions/user-login'
import { loginSchema } from '@/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEvent, useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Spinner } from '../shared/spinner'

export const LoginForm = () => {
  const t = useTranslations('register')
  const [state, formAction, isLoading] = useActionState(loginUser, null)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSendMail = async (e: FormEvent) => {
    e.preventDefault()
    const validatedEmail = loginSchema.pick({ email: true }).safeParse({ email })
    console.log({ validatedEmail })
    if (!validatedEmail.success) {
      toast.error(t('emailError'))
      return
    }
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    console.log(data)
    toast(t('emailSent', { email }))
  }

  useEffect(() => {
    if (!state) return
    console.log('State updated:', state)

    if (state.message === 'success') {
      toast.success(t('successMessageLogin'))
      setTimeout(() => {
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
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded-[64px] border border-white/15 bg-white/10 py-5 pl-14"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded-[64px] border border-white/15 bg-white/10 py-5 pl-14"
        required
      />
      <div className="flex items-center justify-between py-2 text-sm font-light">
        <span className="text-white/60">{t('forgotPassword')}</span>
        <button type="button" onClick={handleSendMail} className="cursor-pointer hover:scale-105">
          {t('resetPassword')}
        </button>
      </div>
      <Button type="submit" className="mt-3 py-4" disabled={isLoading}>
        <span className="flex items-center gap-2">
          {isLoading ? <Spinner /> : null}
          {t('login')}
        </span>
      </Button>
    </form>
  )
}
