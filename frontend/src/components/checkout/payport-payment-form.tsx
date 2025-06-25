'use client'

import { getRatesFromPayPort } from '@/lib/utils'
import { TExternalPaymentFormProps } from '@/types'
import { useTranslations } from 'next-intl'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Spinner } from '../shared/spinner'

export const PayportPaymentForm = ({ amount, currency, locale }: TExternalPaymentFormProps) => {
  const t = useTranslations('payment')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true)
      try {
        const rateData = await getRatesFromPayPort(currency, amount)
        if (isNaN(rateData.amount)) {
          toast.error(t('error'))
          return
        }
        setConvertedAmount(rateData.amount)
      } catch (error) {
        console.error('Error fetching rate:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRate()
  }, [currency, amount, t])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Create a hidden form and submit it
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = '/api/payport-payment'

    // Add amount input
    const amountInput = document.createElement('input')
    amountInput.type = 'hidden'
    amountInput.name = 'amount'
    amountInput.value = Number(amount.toFixed(2)).toString()
    form.appendChild(amountInput)

    const convertedAmountInput = document.createElement('input')
    convertedAmountInput.type = 'hidden'
    convertedAmountInput.name = 'convertedAmount'
    convertedAmountInput.value = Number(convertedAmount?.toFixed(2) || 0).toString()
    form.appendChild(convertedAmountInput)

    // Add currency input
    const currencyInput = document.createElement('input')
    currencyInput.type = 'hidden'
    currencyInput.name = 'cur'
    currencyInput.value = currency
    form.appendChild(currencyInput)

    // Add locale input
    const localeInput = document.createElement('input')
    localeInput.type = 'hidden'
    localeInput.name = 'locale'
    localeInput.value = locale || 'en'
    form.appendChild(localeInput)
    // Append form to body and submit
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 rounded-lg border border-[#FFFFFF]/10 bg-[#1B1B1BB2] p-4">
        <div className="flex justify-between">
          <span>{t('total')}:</span>
          <span className="flex min-h-6 items-center gap-2">
            {loading ? <Spinner /> : <span>{convertedAmount?.toFixed(2)}</span>}
            {currency}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>{t('equivalent')}:</span>
          <span>{amount.toFixed(2)} USD</span>
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full" disabled={loading}>
        {t('payBtn')}
      </Button>
    </form>
  )
}
