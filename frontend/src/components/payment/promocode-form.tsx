'use client'
import { applyPromocode } from '@/actions/apply-promocode'
import { TPromo } from '@/types'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Spinner } from '../shared/spinner'

export const PromocodeForm = ({ setPromocode }: { setPromocode: (promocode: TPromo) => void }) => {
  const t = useTranslations('payment')
  const [actionState, action, isPending] = useActionState(applyPromocode, null)
  const searchParams = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const [codeValue, setCodeValue] = useState('')

  useEffect(() => {
    if (!actionState) return
    if (actionState.message === 'promoCodeSuccess') {
      toast.success(t(actionState.message))
      if (actionState.promocode?.code) {
        setCodeValue(actionState.promocode.code)
      }
    } else {
      toast.error(t(actionState.message))
      setCodeValue('')
    }
    if (actionState.promocode?.discount) {
      setPromocode(actionState.promocode)
    }
  }, [actionState, setPromocode, t])

  return (
    <div className="w-full">
      <form className="flex flex-col gap-2 lg:flex-row" action={action}>
        <input
          type="text"
          name="code"
          required
          value={codeValue}
          onChange={(e) => setCodeValue(e.target.value)}
          className="border-text/50 flex-1 rounded-full border bg-transparent px-4 py-3"
          placeholder={t('promoCodePlaceholder')}
        />
        <input type="hidden" name="name" value={name} />
        <Button type="submit" disabled={isPending} className="!mr-0">
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner />
              {t('applyCouponCodeBtn')}
            </div>
          ) : (
            t('applyCouponCodeBtn')
          )}
        </Button>
      </form>
    </div>
  )
}
