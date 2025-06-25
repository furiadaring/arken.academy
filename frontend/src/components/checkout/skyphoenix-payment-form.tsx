'use client'

import { TExternalPaymentFormProps } from '@/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import axios from 'redaxios'
import { Button } from '../shared/btn'

export const SkyphoenixPaymentForm = ({ amount, currency }: TExternalPaymentFormProps) => {
  const t = useTranslations('payment')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/skyphoenix-payment', {
        amount: amount,
        currency: currency,
      })

      const data = await response.data

      // Redirect to payment URL
      if (data.payment_detail.payment_link) {
        router.push(data.payment_detail.payment_link)
      } else {
        throw new Error('Payment URL not received')
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during payment processing')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
        {t('payBtn')}
      </Button>
    </form>
  )
}
