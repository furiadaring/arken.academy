'use client'

import { submitPaymentData } from '@/actions/submit-payment-data'
import payme from '@/assets/payment/payme.svg'
import { TPromo } from '@/types'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useActionState, useRef, useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { Button } from '../shared/btn'
import { SectionTitle } from '../shared/section-title'
import { PaymentInput } from './input'
import { PromocodeForm } from './promocode-form'

export const PaymentForm = ({
  price,
  packageName,
  email,
  packageType,
  name,
}: {
  price: string
  packageName: string
  email: string
  name: string
  packageType: string
}) => {
  const t = useTranslations('payment')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [promocode, setPromocode] = useState<TPromo | null>(null)
  const [state, formAction] = useActionState(submitPaymentData, null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isShowPromocode, setIsShowPromocode] = useState(false)
  return (
    <div className="flex flex-col gap-6 lg:flex-row [&>div]:w-full lg:[&>div]:w-1/2">
      <div className="bg-background/10 space-y-3 rounded-[40px] border border-[#FFFFFF]/10 px-3.5 py-6 shadow-[0px_4px_34px_0px_#FFFFFF0D_inset] backdrop-blur-[25px] lg:space-y-8 lg:px-8">
        <SectionTitle className="mb-12 text-[24px] lg:!text-[32px]">{t('title')}</SectionTitle>
        <form className="space-y-3 lg:space-y-8" action={formAction}>
          <input type="hidden" name="packageName" value={packageType} />
          <PaymentInput
            defaultValue={name || state?.data?.name}
            label={t('form.name')}
            name="name"
            type="text"
            placeholder={t('form.placeholderName')}
          />
          {state?.errors?.name && <p className="text-red-500">{state.errors.name[0]}</p>}
          <input type="hidden" name="email" value={email} />
          <PaymentInput
            defaultValue={email}
            name="email2"
            label={t('form.email')}
            type="email"
            disabled
            placeholder={t('form.placeholderEmail')}
          />
          {state?.errors?.email && <p className="text-red-500">{state.errors.email[0]}</p>}
          <label className="flex flex-col gap-3">
            <span>{t('form.phone')}</span>
            <PhoneInput
              defaultCountry={state?.data?.country || 'tr'}
              value={phone}
              onChange={(phone, { country }) => {
                setPhone(phone)
                setCountry(country.name)
              }}
              name="phoneNumber"
              inputProps={{ autoComplete: 'tel' }}
              inputClassName="w-full"
              countrySelectorStyleProps={{
                buttonClassName: '!p-5',
                dropdownStyleProps: {
                  listItemClassName: 'hover:!bg-[#ffffff33] ',
                  className: '!z-50',
                },
              }}
            />
          </label>
          {state?.errors?.phoneNumber && <p className="text-red-500">{state.errors.phoneNumber[0]}</p>}
          <PaymentInput
            defaultValue={state?.data?.country}
            label={t('form.country')}
            type="text"
            name="hiddenCountry"
            placeholder={t('form.searchPlaceholder')}
            value={country}
            disabled
          />
          {state?.errors?.country && <p className="text-red-500">{state.errors.country[0]}</p>}
          <input type="hidden" name="country" value={country} />
          <input type="hidden" name="phoneNumber" value={phone} />
          <input type="hidden" name="payedAmount" value={Number(price) - Number(promocode?.discount || 0)} />
          <input type="hidden" name="promocodeName" value={promocode?.code} />
          <div className="hidden text-sm font-light text-[#FFFFFF]/70 lg:block">
            {t.rich('personalData', {
              Link: (children: ReactNode) => (
                <Link href="/policy/privacy" className="underline">
                  {children}
                </Link>
              ),
            })}
          </div>
          <button type="submit" ref={buttonRef} className="sr-only">
            {t('btn')}
          </button>
        </form>
      </div>
      <div className="bg-background/10 space-y-3 rounded-[40px] border border-[#FFFFFF]/10 px-3.5 py-6 shadow-[0px_4px_34px_0px_#FFFFFF0D_inset] backdrop-blur-[25px] lg:space-y-6 lg:px-8">
        <SectionTitle className="mb-12 text-[24px] lg:!text-[32px]">{t('order')}</SectionTitle>
        <div className="w-full overflow-hidden rounded-[20px] font-light">
          <div className="space-y-1">
            <div className="bg-background/10 flex justify-between border-b border-[#454545] p-5">
              <p>{packageName}</p>
              <p className="font-medium">${price}</p>
            </div>
            <button
              onClick={() => setIsShowPromocode(!isShowPromocode)}
              className="relative z-10 flex w-full cursor-pointer justify-between border-b border-[#454545] bg-gradient-to-r from-[#FF863B] to-[#FF2600] p-5 text-white"
            >
              <p className="text-left">
                {promocode
                  ? t('promoCode')
                  : t.rich('promoCodeQuestion', {
                      span: (children: ReactNode) => (
                        <>
                          <br className="lg:hidden" />
                          <span className="text-sm text-white/90">{children}</span>
                        </>
                      ),
                    })}
              </p>
              {promocode ? (
                <>
                  <span>{promocode?.code}</span>
                  <p className="font-medium">{promocode?.discount ? `-$${promocode?.discount}` : ''}</p>
                </>
              ) : null}
            </button>
            <div className="relative">
              <div
                className={`bg-background/10 -z-10 flex w-full justify-between border-b border-[#454545] p-5 transition-all duration-300 ease-in-out will-change-transform ${
                  isShowPromocode && !promocode?.discount
                    ? 'pointer-events-auto static translate-y-0 opacity-100'
                    : 'pointer-events-none absolute top-0 left-0 w-full -translate-y-8 opacity-0'
                }`}
              >
                <PromocodeForm setPromocode={setPromocode} />
              </div>
            </div>
            <div className="bg-background/10 flex justify-between border-b border-[#454545] p-5">
              {t('total')}
              <p className="font-medium">${Number(price) - Number(promocode?.discount || 0)}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-2 lg:mt-4 lg:space-y-4">
          <div className="badge-border rounded-[20px] py-6 pl-10 lg:mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-accent flex h-6 w-6 items-center justify-center rounded-full">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fff]">
                  <div className="bg-accent flex h-4 w-4 items-center justify-center rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="mb-6 flex items-center gap-6">
                  <span className="font-light">Payme</span>
                  <Image src={payme} alt="Payme" width={80} height={24} className="h-6 w-auto" />
                </div>
                <p className="text-text/70 text-sm font-light">{t('paymentSystem')}</p>
              </div>
            </div>
          </div>

          <div className="text-text/70 text-sm font-light lg:hidden">
            {t.rich('personalData', {
              Link: (children: ReactNode) => (
                <Link href="/policy" className="underline">
                  {children}
                </Link>
              ),
            })}
          </div>
          <div className="lg:pt-4">
            <Button type="submit" onClick={() => buttonRef.current?.click()}>
              {t('btn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
