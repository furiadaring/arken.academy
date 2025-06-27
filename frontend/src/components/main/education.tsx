import { useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Card } from '../shared/card'

export const Education = () => {
  const t = useTranslations('education')
  const messages = useMessages()

  const items = Object.values(messages.education.items) as string[]
  return (
    <section>
      <div className="relative container mx-auto max-w-[1280px] py-3 lg:pt-16">
        <div className="lg:mb-8 lg:px-3">
          <h3 className="text-title"> {t('title')} </h3>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10">
          <div className="w-full lg:w-[48%] lg:space-y-4">
            <p className="text-text mt-6 px-3 text-sm leading-tight font-light tracking-tight lg:text-[22px]">
              {t('subtitle')}
            </p>
            <div className="relative mx-auto mt-2 min-h-[250px] max-w-[390px] lg:mx-2 lg:min-h-[368px] lg:max-w-full lg:overflow-hidden lg:rounded-3xl">
              <Image
                src={'/education.png'}
                alt="education"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="mt-5 hidden px-3 lg:block">
              <Card className="px-4 py-5 lg:p-6">
                <h2 className="text-gradient-red text-sm leading-tight tracking-normal lg:text-lg lg:leading-normal">
                  {t('advantagesTitle')}
                  <span className="text-text/70 font-light">{t('advantagesSubTitle')}</span>
                </h2>
              </Card>
            </div>
          </div>
          <div className="w-full px-3 lg:w-[52%]">
            <Card className="mt-5 !h-auto px-7 py-5 lg:mt-6 lg:py-13">
              <h2 className="text-gradient-red text-center text-lg leading-tight font-medium lg:text-[22px] lg:tracking-tight">
                {t('itemsTitle')}
              </h2>
              <ul className="mt-5 space-y-4.5 lg:space-y-7">
                {items.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-medium text-[#070707] text-white">
                      {index + 1}
                    </span>
                    <p className="text-text/70 leading-tight font-light tracking-tighter lg:text-lg lg:tracking-normal">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        <div className="mt-5 px-3 lg:hidden">
          <Card className="px-4 py-5">
            <h2 className="text-gradient-red text-sm leading-tight tracking-normal">
              {t('advantagesTitle')}
              <span className="text-text/70 font-light">{t('advantagesSubTitle')}</span>
            </h2>
          </Card>
        </div>
      </div>
    </section>
  )
}
