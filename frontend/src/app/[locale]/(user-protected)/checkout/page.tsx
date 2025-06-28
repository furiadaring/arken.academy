import { Checkout } from '@/components/checkout/checkout'
import { Button } from '@/components/shared/btn'
import { SectionTitle } from '@/components/shared/section-title'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default async function CheckoutPage() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('checkoutData')?.value
  const t = await getTranslations('payment')
  const data = raw ? JSON.parse(raw) : null

  if (!data) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-xl">{t('noData')}</p>
        <Link href="/packages">
          <Button>{t('backToPackages')}</Button>
        </Link>
      </div>
    )
  }

  const currentDate = new Date()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="bg-background/20 border-text/60 rounded-[40px] border px-3 py-8 shadow-[0px_4px_34px_0px_#FFFFFF0D_inset] backdrop-blur-[25px] lg:px-6">
        <SectionTitle className="text-accent mb-8 text-center text-[24px] lg:!text-[32px]">
          {t('orderComplete')}
        </SectionTitle>

        <div className="space-y-6">
          <div className="border-text/60 flex items-center justify-between border-b pb-4">
            <span className="font-light">{t('date')}:</span>
            <span className="font-medium">{formatDate(currentDate)}</span>
          </div>

          <div className="border-text/60 flex items-center justify-between border-b pb-4">
            <span className="font-light">{t('total')}:</span>
            <span className="font-medium">${data.payedAmount}</span>
          </div>

          <div className="border-text/60 flex items-center justify-between border-b pb-4">
            <span className="font-light">{t('paymentMethod')}:</span>
            <span className="font-medium">Payme</span>
          </div>
          <Checkout amount={data.payedAmount} packageName={data.packageName} />
        </div>
      </div>
    </div>
  )
}
