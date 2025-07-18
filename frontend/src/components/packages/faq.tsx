import { TFaqItem } from '@/types'
import { useMessages, useTranslations } from 'next-intl'
import { FaqItem } from './faq.item'

export const Faq = ({ withTitle = true }: { withTitle?: boolean }) => {
  const t = useTranslations('packages')
  const messages = useMessages()
  const items = messages.packages.faq.items as TFaqItem[]

  return (
    <section className="relative mx-auto max-w-[1280px] px-4 py-7.5">
      {withTitle ? (
        <h2 className="text-title mb-8 text-center text-lg lg:mb-15 lg:text-left lg:text-[52px]">{t('faq.title')}</h2>
      ) : null}
      <div className="flex flex-col space-y-4">
        {items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            // className={index % 2 === 1 ? 'mb-2' : ''}
          />
        ))}
      </div>
    </section>
  )
}
