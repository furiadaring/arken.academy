import one from '@/assets/stats/one.svg'
import three from '@/assets/stats/three.svg'
import two from '@/assets/stats/two.svg'
import { useMessages, useTranslations } from 'next-intl'
import { Carousel } from '../shared/carousel'
import { StatsItem } from './stats.item'

const images = [one, two, three]

export const Stats = () => {
  const t = useTranslations('stats')
  const messages = useMessages()

  const items = Object.keys(messages.stats.items)
  return (
    <section className="relative z-12 w-full pb-5 lg:mt-10">
      <div className="absolute -top-10 left-0 h-10 w-full rounded-t-[25px] border-t border-[#FFFFFF]/10 bg-white bg-blend-darken lg:-top-24 lg:h-20 lg:rounded-t-[60px]"></div>
      <div className="relative container mx-auto max-w-[1280px] bg-white pl-3">
        <h3 className="text-title">
          Arken.Academy <br className="lg:hidden" /> {t('title')}
        </h3>
        <Carousel className="mt-5 lg:mt-15">
          {items.map((key, index) => (
            <StatsItem
              key={key}
              title={t(`items.${key}.title`)}
              subtitle={t(`items.${key}.subtitle`)}
              image={images[index]}
            />
          ))}
        </Carousel>
        {/* <div className="hidden lg:block">
          <div className="absolute top-30 left-20 z-0 h-[175px] w-[175px] rounded-full bg-[#87EB62]/60 opacity-50 blur-[100px]"></div>
          <div className="absolute top-30 left-1/2 z-0 h-[175px] w-[175px] -translate-x-1/2 rounded-full bg-[#87EB62] opacity-50 blur-[100px]"></div>
          <div className="absolute top-30 right-20 z-0 h-[175px] w-[175px] rounded-full bg-[#DFE6BE] opacity-50 blur-[100px]"></div>
          <div className="absolute bottom-30 left-40 z-0 h-[210px] w-[210px] rounded-full bg-[#DFE6BE] opacity-50 blur-[100px]"></div>
          <div className="absolute bottom-20 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-[#BEE3E6] opacity-50 blur-[100px]"></div>
          <div className="absolute right-20 bottom-20 z-0 h-[160px] w-[160px] rounded-full bg-[#BEE6D2] opacity-50 blur-[100px]"></div>
        </div>
        <div className="lg:hidden">
          <div className="absolute top-10 left-0 z-50 h-[175px] w-[175px] rounded-full bg-[#87EB62] opacity-50 blur-[100px]"></div>
          <div className="absolute right-10 bottom-10 z-0 h-[175px] w-[175px] rounded-full bg-[#87EB62] opacity-50 blur-[100px]"></div>
        </div> */}
      </div>
    </section>
  )
}
