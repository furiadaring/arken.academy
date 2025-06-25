import one from '@/assets/markets/1.png'
import two from '@/assets/markets/2.png'
import three from '@/assets/markets/3.png'
import four from '@/assets/markets/4.png'
import five from '@/assets/markets/5.png'
import { TItem } from '@/types'
import { useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Card } from '../shared/card'
import { SectionTitle } from '../shared/section-title'

const images = [one, two, three, four, five]

export const Markets = () => {
  const t = useTranslations('markets')
  const messages = useMessages()

  const items = Object.values(messages.markets.items) as TItem[]

  return (
    <section className="bg-1" id="markets">
      <div className="re container mx-auto max-w-[1280px] px-3 pt-5 lg:pt-12">
        <SectionTitle className="text-lg">{t('title')}</SectionTitle>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-6">
          {items.map((item, index) => (
            <Card key={index} className={`p-6 ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3 lg:py-3'} `}>
              <div className={`${index < 3 ? '' : 'flex-row-reverse items-center lg:flex'}`}>
                <Image
                  src={images[index]}
                  alt="markets"
                  loading="lazy"
                  className={`z-50 aspect-square h-[212px] w-full object-scale-down ${index < 3 ? '' : 'lg:-my-4 lg:-mr-5'}`}
                />
                <div className="mt-4 lg:mt-0">
                  <h3 className="text-gradient mt-1 lg:text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm font-light text-white">{item.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
