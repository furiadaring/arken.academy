import { TItem } from '@/types'
import { useMessages, useTranslations } from 'next-intl'
import { SectionTitle } from '../shared/section-title'

export const Advantages = () => {
  const t = useTranslations('advantages')
  const messages = useMessages()

  const items = Object.values(messages.advantages.advItems) as TItem[]
  return (
    <section className="bg-1">
      <div className="relative container mx-auto max-w-[1280px] px-3 py-5 lg:pt-16">
        <SectionTitle className="text-lg">{t('title')}</SectionTitle>
        <p className="text-text/70 mt-4.5 text-center text-sm leading-tight font-light lg:pt-5 lg:text-lg">
          {t.rich('subtitle', {
            important: (children) => <span className="text-gradient font-normal">{children}</span>,
          })}
        </p>
        <p className="text-gradient mx-auto w-3/5 py-4.5 text-center text-lg leading-[100%] lg:mt-12 lg:text-[22px]">
          {t('advItemsTitle')}
        </p>
        <ul className="gap-5 space-y-2.5 px-3.5 lg:grid lg:grid-cols-2 lg:space-y-0">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <p className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#A9F12F] lg:h-10 lg:w-10">
                <svg
                  width="15"
                  height="18"
                  viewBox="0 0 15 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:scale-120"
                >
                  <path
                    d="M14.6542 7.22472L14.6473 10.7409L9.50071 10.7306L9.95785 15.2356L7.33313 17.8603L4.8472 15.3744L9.49035 10.7313L0.336636 10.7147L0.342851 7.19917L9.67197 7.21575L4.98531 2.52909L7.47192 0.0424805L14.6542 7.22472Z"
                    fill="#070707"
                  />
                </svg>
              </p>
              <h3 className="text-sm leading-tight tracking-tighter lg:text-[20px]">
                {item.title}
                <span className="text-text/70 font-light">{item.subtitle}</span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
