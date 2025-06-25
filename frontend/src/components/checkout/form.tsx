import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'
import { Button } from '../shared/btn'
import './stripe-element-styles.css'

export const CheckoutForm = ({ amount, packageName }: { amount: number; packageName: string }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const t = useTranslations('payment')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (elements == null || stripe == null) {
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      return
    }

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, packageName }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(`Payment intent creation failed: ${data.error || res.statusText}`)
      }

      if (!data.clientSecret) {
        throw new Error('No client secret returned from the server')
      }

      const confirmResult = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_AUTH_URL}/account/my-packages`,
        },
      })
      console.log({ confirmResult })
      if (confirmResult.error) {
        throw confirmResult.error
      }
    } catch (e) {
      console.error('Payment error:', e)
      setErrorMessage(e instanceof Error ? e.message : 'An unexpected error occurred')
    }
  }

  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
            {t('loading')}
          </span>
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="stripe-element-container">
        <PaymentElement className="!h-full" options={{ layout: { type: 'tabs', defaultCollapsed: false } }} />
      </div>
      <Button type="submit" className="mt-6">
        {t('payBtn')}
      </Button>
      {errorMessage && <p className="pt-2 text-red-500">{errorMessage}</p>}
    </form>
  )
}
