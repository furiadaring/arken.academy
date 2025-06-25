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

const links = [
  { facebook: 'https://www.facebook.com/profile.php?id=61573705956668', twitter: 'https://x.com/Amir_Najafov' },
  { facebook: 'https://www.facebook.com/rus.aitbaev/', twitter: 'https://x.com/rustam_aitbaev' },
  { facebook: 'https://www.facebook.com/Maksym.Terekhin', twitter: 'https://x.com/Maksym_Terekhin' },
  { facebook: 'https://www.facebook.com/IrinaSokolovaaa/', twitter: 'https://x.com/SocolovaIra' },
  { facebook: 'https://www.facebook.com/profile.php?id=100088886540995', twitter: 'https://x.com/daniel_falkenst' },
]

export const Team = () => {
  const t = useTranslations('team')
  const messages = useMessages()

  const items = Object.keys(messages.team.items)

  return (
    <section className="bg-[] overflow-hidden lg:pt-12" id="about">
      <div className="relative z-11 container mx-auto max-w-[1280px] py-3 pl-3 lg:mt-12 lg:px-0">
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
              links={links[index]}
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
              links={links[index]}
            />
          ))}
          <TeamCardMore className="py-7" />
        </div>
        <TeamCardMore className="lg:hidden" />
        <div className="hidden lg:block">
          <div className="absolute top-1/4 left-0 z-0 h-[180px] w-[180px] rounded-full bg-[#BEE6D3] opacity-70 blur-[125px]"></div>
          <div className="absolute top-1/2 left-1/3 z-0 h-[180px] w-[180px] -translate-x-40 -translate-y-30 rounded-full bg-[#E6CFBE] opacity-70 blur-[125px]"></div>
          <div className="absolute top-1/6 left-1/2 z-0 h-[180px] w-[180px] translate-x-10 rounded-full bg-[#C9E6BE] opacity-70 blur-[125px]"></div>
          <div className="absolute top-1/2 right-10 z-0 h-[180px] w-[180px] -translate-y-40 rounded-full bg-[#E6E5BE] opacity-70 blur-[125px]"></div>
          <div className="absolute bottom-20 left-20 z-0 h-[180px] w-[180px] rounded-full bg-[#BEE6D2] opacity-70 blur-[125px]"></div>
          <div className="absolute bottom-20 left-1/2 z-0 h-[180px] w-[180px] rounded-full bg-[#BEE6D2] opacity-70 blur-[125px]"></div>
          <div className="absolute right-1/6 bottom-1/6 z-0 h-[180px] w-[180px] rounded-full bg-[#C7BEE6] opacity-70 blur-[125px]"></div>
        </div>
        <div className="lg:hidden">
          <div className="absolute top-1/4 -right-1/12 z-0 h-[180px] w-[180px] rounded-full bg-[#C9E6BE] opacity-70 blur-[125px]"></div>
        </div>
      </div>
    </section>
  )
}
