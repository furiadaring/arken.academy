'use client'

import { Locale } from '@/i18'
import { variablesStripe } from '@/lib/const'
import { TCurrency } from '@/types'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { CurrencyDropdown } from './currency-dropdown'
import { CheckoutForm } from './form'
import { PayportPaymentForm } from './payport-payment-form'
import { SkyphoenixPaymentForm } from './skyphoenix-payment-form'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export const Checkout = ({ amount, packageName }: { amount: number; packageName: string }) => {
  const searchParams = useSearchParams()
  const isSuccess = searchParams.get('success=true')
  const t = useTranslations('payment')
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency | undefined>(undefined)
  const locale = useLocale() as Locale
  const isPayportPayment = process.env.NEXT_PUBLIC_PAYMENT_SYSTEM === 'PAYPORT'
  const isStripePayment = selectedCurrency === 'USD'

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="font-light">{t('selectCurrency')}:</span>
        <CurrencyDropdown defaultValue={selectedCurrency} onChange={setSelectedCurrency} />
      </div>
      <div className="my-8">
        <Link
          href="/account/all-packages"
          className="hover:text-accent mb-6 flex items-center gap-2 text-sm font-light text-white/70"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6">
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                d="M6 12H18M6 12L11 7M6 12L11 17"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          {t('goToDashboard')}
        </Link>

        {isStripePayment && (
          <div className="py-6">
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'payment',
                amount: amount * 100,
                currency: 'usd',
                locale,
                appearance: { variables: variablesStripe },
              }}
            >
              <CheckoutForm amount={amount * 100} packageName={packageName} />
            </Elements>
          </div>
        )}
        {selectedCurrency && (
          <div className="mt-6">
            {isPayportPayment ? (
              <PayportPaymentForm amount={amount} currency={selectedCurrency} locale={locale} />
            ) : (
              <SkyphoenixPaymentForm amount={amount} currency={selectedCurrency} />
            )}
          </div>
        )}

        {!selectedCurrency && (
          <div className="mt-6 rounded-lg border border-[#FFFFFF]/10 bg-[#1B1B1BB2] p-6 text-center">
            {t('selectCurrency')}
          </div>
        )}

        {isSuccess && (
          <p className="mt-6 text-center">{t.rich('thankYou', { span: (chunks) => <span>{chunks}</span> })}</p>
        )}
      </div>
    </>
  )
}
