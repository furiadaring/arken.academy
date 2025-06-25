'use client'

import { resetPassword } from '@/actions/user-reset-password'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Spinner } from '../shared/spinner'

export function ResetPasswordForm({ token }: { token: string }) {
  console.log('ResetPasswordForm rendered with token:', token)
  const router = useRouter()
  const t = useTranslations('resetPassword')
  const [state, action, isLoading] = useActionState(resetPassword, null)

  useEffect(() => {
    if (state?.message === 'passwordResetSuccess') {
      toast.success(t('passwordResetSuccess'))
      setTimeout(() => {
        router.push('/auth')
      }, 1500)
    }
    if (state?.message) {
      toast.error(t(state?.message))
    }
  }, [state, t, router])

  return (
    <form className="space-y-3" action={action}>
      <input
        type="password"
        name="password"
        placeholder={t('newPassword')}
        className="w-full rounded-[64px] border border-white/15 bg-white/10 py-5 pl-14"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder={t('confirmPassword')}
        className="w-full rounded-[64px] border border-white/15 bg-white/10 py-5 pl-14"
        required
      />
      <input type="hidden" name="token" value={token} />
      <Button type="submit" className="mt-3 w-full py-4" disabled={isLoading}>
        <span className="flex items-center justify-center gap-2">
          {isLoading ? <Spinner /> : null}
          {t('resetPassword')}
        </span>
      </Button>
    </form>
  )
}
