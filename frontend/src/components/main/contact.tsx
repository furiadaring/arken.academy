'use client'

import one from '@/assets/contacts/1.png'
import two from '@/assets/contacts/2.png'
import three from '@/assets/contacts/3.png'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '../shared/btn'
import { Card } from '../shared/card'
import { SectionTitle } from '../shared/section-title'

import { z } from 'zod'

export const Contact = () => {
  const t = useTranslations('contact')

  const schema = z.object({
    name: z.string().min(2, t('nameError')),
    phone: z
      .string()
      .min(8, t('phoneError'))
      .refine((val) => /^[+]?[\d\-()]+$/.test(val), t('phoneError')),
  })

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    try {
      const formData = new FormData(form)
      const name = String(formData.get('name') || '').trim()
      const phone = String(formData.get('phone') || '').replace(/\s+/g, '')
      const result = schema.safeParse({ name, phone })
      if (!result.success) {
        const zodErrors: { name?: string; phone?: string } = {}
        result.error.errors.forEach((err) => {
          if (err.path[0]) zodErrors[err.path[0] as 'name' | 'phone'] = err.message
        })
        Object.values(zodErrors).forEach((value) => {
          toast.error(value)
        })
        return
      }
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      })
      if (!response.ok) {
        toast(t('error'))
      }
      toast(t('success'))
      form.reset()
    } catch (error) {
      toast(t('error'))
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="bg-7" id="contacts">
      <div className="container mx-auto max-w-[1280px] py-3 lg:pt-16 lg:pb-9">
        <div className="lg:flex lg:gap-6 lg:[&>*]:flex-1">
          <div>
            <div className="mx-auto w-4/5 lg:mx-0 lg:w-1/2">
              <Card withoutShadows className="border border-white/15 py-4">
                <div className="mx-auto flex items-center gap-5">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.5 12H7.5C7.5 7.03 11.53 3 16.5 3V5C12.63 5 9.5 8.13 9.5 12ZM16.5 9V7C13.74 7 11.5 9.24 11.5 12H13.5C13.5 10.34 14.84 9 16.5 9ZM5.5 2C5.5 0.89 4.61 0 3.5 0C2.39 0 1.5 0.89 1.5 2C1.5 3.11 2.39 4 3.5 4C4.61 4 5.5 3.11 5.5 2ZM9.95 2.5H7.95C7.71 3.92 6.49 5 5 5H2C1.17 5 0.5 5.67 0.5 6.5V9H6.5V6.74C8.36 6.15 9.75 4.51 9.95 2.5ZM17.5 15C18.61 15 19.5 14.11 19.5 13C19.5 11.89 18.61 11 17.5 11C16.39 11 15.5 11.89 15.5 13C15.5 14.11 16.39 15 17.5 15ZM19 16H16C14.51 16 13.29 14.92 13.05 13.5H11.05C11.25 15.51 12.64 17.15 14.5 17.74V20H20.5V17.5C20.5 16.67 19.83 16 19 16Z"
                      fill="white"
                    />
                  </svg>
                  <p className="text-sm font-light">{t('badge')}</p>
                </div>
              </Card>
            </div>
            <div className="my-4.5 px-3 lg:px-0">
              <SectionTitle className="py-4 !text-lg text-balance lg:text-left lg:!text-[52px] lg:!leading-[115%]">
                {t('title')}
              </SectionTitle>
              <p className="text-center leading-[22px] tracking-tighter text-[#F7FEE7B2] lg:text-left lg:leading-normal lg:tracking-normal">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute top-0 left-16">
              <Image src={one} alt="img man" width={263} height={263} />
            </div>
            <div className="absolute right-0 bottom-10">
              <Image src={two} alt="img woman" width={263} height={263} />
            </div>
          </div>
        </div>

        <div className="gap-6 lg:flex">
          <Card withoutShadows className="mt-5 rounded-none px-8 py-5 text-center lg:w-[80%] lg:rounded-[40px] lg:py-8">
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4.5 lg:flex lg:space-y-0 lg:py-5">
                <div className="lg:w-4/5">
                  <div className="relative mb-4.5">
                    <svg
                      className="absolute top-1/2 left-8 -translate-y-1/2 lg:left-14"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 2C9.6 2 10.5 2.9 10.5 4C10.5 5.1 9.6 6 8.5 6C7.4 6 6.5 5.1 6.5 4C6.5 2.9 7.4 2 8.5 2ZM8.5 12C11.2 12 14.3 13.29 14.5 14H2.5C2.73 13.28 5.81 12 8.5 12ZM8.5 0C6.29 0 4.5 1.79 4.5 4C4.5 6.21 6.29 8 8.5 8C10.71 8 12.5 6.21 12.5 4C12.5 1.79 10.71 0 8.5 0ZM8.5 10C5.83 10 0.5 11.34 0.5 14V16H16.5V14C16.5 11.34 11.17 10 8.5 10Z"
                        fill="#A5A99C"
                      />
                    </svg>
                    <input
                      type="text"
                      name="name"
                      placeholder={t('formName')}
                      className="w-full rounded-[64px] border border-white/15 bg-white/10 px-3.5 py-3 pl-16 text-[#F7FEE799] lg:w-11/12 lg:pl-16"
                    />
                  </div>

                  <div className="relative">
                    <svg
                      className="absolute top-1/2 left-8 -translate-y-1/2 lg:left-14"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1082_1883)">
                        <path
                          d="M15.5 12H17.5C17.5 9.24 15.26 7 12.5 7V9C14.16 9 15.5 10.34 15.5 12ZM19.5 12H21.5C21.5 7.03 17.47 3 12.5 3V5C16.37 5 19.5 8.13 19.5 12ZM20.5 15.5C19.25 15.5 18.05 15.3 16.93 14.93C16.83 14.9 16.72 14.88 16.62 14.88C16.36 14.88 16.11 14.98 15.91 15.17L13.71 17.37C10.88 15.93 8.56 13.62 7.12 10.78L9.32 8.57C9.6 8.31 9.68 7.92 9.57 7.57C9.2 6.45 9 5.25 9 4C9 3.45 8.55 3 8 3H4.5C3.95 3 3.5 3.45 3.5 4C3.5 13.39 11.11 21 20.5 21C21.05 21 21.5 20.55 21.5 20V16.5C21.5 15.95 21.05 15.5 20.5 15.5ZM5.53 5H7.03C7.1 5.88 7.25 6.75 7.48 7.58L6.28 8.79C5.88 7.58 5.62 6.32 5.53 5ZM19.5 18.97C18.18 18.88 16.9 18.62 15.7 18.21L16.9 17.01C17.75 17.25 18.62 17.4 19.5 17.46V18.97Z"
                          fill="#A5A99C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1082_1883">
                          <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>

                    <input
                      type="tel"
                      name="phone"
                      placeholder={t('formPhone')}
                      className="w-full rounded-[64px] border border-white/15 bg-white/10 px-3.5 py-3 pl-16 text-[#F7FEE799] lg:w-11/12 lg:pl-16"
                    />
                  </div>
                </div>
                <Button type="submit" className="lg:hidden">
                  <span className="lg:text-lg">{t('formBtn')}</span>
                </Button>
                <button
                  type="submit"
                  className={`group bg-accent relative mr-5 hidden w-2/5 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[24px] py-3 pr-3 pl-6 text-xs text-black lg:flex`}
                >
                  <span className="mt-0.5 -ml-5 lg:text-lg">{t('formBtn')}</span>
                  <span className="h-5 w-5 transition-all duration-300 ease-in-out group-hover:-rotate-12 lg:h-7 lg:w-7">
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                    >
                      <rect x="0.242188" y="0.848022" width="21.7665" height="21.7665" rx="10.8833" fill={'#1E260F'} />
                      <path
                        d="M16.3164 10.4435L16.3116 12.995L12.5765 12.9874L12.9087 16.2557L11.0049 18.1595L9.20118 16.3559L12.5696 12.9874L5.92874 12.9757L5.93288 10.4249L12.7029 10.4373L9.30131 7.03573L11.105 5.23206L16.3164 10.4435Z"
                        fill={'#A3E635'}
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </Card>
          <div className="relative hidden w-2/5 lg:block">
            <div className="absolute top-0 left-[10%]">
              <Image src={three} alt="img woman" width={263} height={263} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
