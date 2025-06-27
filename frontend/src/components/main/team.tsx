import five from '@/assets/team/five.png'
import four from '@/assets/team/four.png'
import one from '@/assets/team/one.png'
import three from '@/assets/team/three.png'
import two from '@/assets/team/two.png'
import { useMessages, useTranslations } from 'next-intl'
import { Carousel } from '../shared/carousel'
import { TeamCardMore } from '../shared/team.card.more'
import { TeamCard } from './team.card'

const images = [one, two, three, four, five]

export const Team = () => {
  const t = useTranslations('team')
  const messages = useMessages()

  const items = Object.keys(messages.team.items)

  return (
    <section className="overflow-hidden lg:pt-12" id="about">
      <div className="relative z-11 container mx-auto max-w-[1280px] py-3 pl-3 md:p-3 lg:mt-12 lg:px-0">
        <h3 className="text-title">
          {t('title')} <br className="lg:hidden" /> Arken.Academy
        </h3>
        <Carousel className="mt-5 lg:hidden">
          {items.map((key, index) => (
            <TeamCard
              key={key}
              itemKey={key}
              name={t(`items.${key}.name`)}
              subtitle={t(`items.${key}.subtitle`)}
              image={images[index]}
            />
          ))}
        </Carousel>
        <div className="mt-15 hidden grid-cols-3 gap-6 lg:grid">
          {items.map((key, index) => (
            <TeamCard
              key={key}
              itemKey={key}
              name={t(`items.${key}.name`)}
              subtitle={t(`items.${key}.subtitle`)}
              image={images[index]}
            />
          ))}
          <TeamCardMore className="py-7" />
        </div>
        <TeamCardMore className="mt-7.5 lg:hidden" />
      </div>
    </section>
  )
}
