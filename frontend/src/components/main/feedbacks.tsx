import feedbacksImage from '@/assets/feedbacks.png'
import { VideoProvider } from '@/context/video-context'
import { TItem } from '@/types'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../shared/btn'
import { Card } from '../shared/card'
import { Carousel } from '../shared/carousel'
import { SectionTitle } from '../shared/section-title'
import { VideoPlayer } from '../shared/video-player'

export const Feedbacks = () => {
  const locale = useLocale()
  const t = useTranslations('feedbacks')
  const messages = useMessages()

  const items = Object.values(messages.feedbacks.items) as TItem[]
  return (
    <section className="bg-1" id="feedbacks">
      <div className="container mx-auto max-w-[1280px] pb-5 lg:pt-16">
        <SectionTitle className="px-3">{t('title')}</SectionTitle>
        <div className="items-center gap-5 lg:flex lg:justify-between">
          <div className="w-full lg:w-[48%]">
            <div className="px-3">
              <SectionTitle className="pt-5 pb-4 !text-lg lg:mt-8 lg:text-left lg:!text-[28px]">
                {t('subtitle')}
              </SectionTitle>
              <p className="mt-1 px-4 text-center leading-[100%] font-light text-white/70 lg:px-0">
                {t('description')}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 px-3 md:grid-cols-2 md:px-0">
              {items.map((item, index) => (
                <Card key={index} className="px-14 py-8 text-center lg:items-start lg:px-4 lg:text-left">
                  <div className="mx-auto w-28 rounded-[26px] border border-white/5 bg-[#0D0D0C] px-6 py-2 lg:mx-0 lg:mb-3">
                    <h3 className="text-[26px] leading-10 text-lime-400">{item?.title}</h3>
                  </div>
                  <p className="mt-5 px-2 leading-[22px] font-light tracking-tight text-white/70 lg:mt-0 lg:pb-2.5">
                    {item?.subtitle}
                  </p>
                </Card>
              ))}
            </div>
            <Card className="mt-5 rounded-none px-8 py-5 text-center lg:h-auto lg:rounded-[30px] lg:px-4 lg:py-6 lg:text-left">
              <div className="lg:flex lg:gap-5">
                <div className="mt-4 lg:w-1/2">
                  <div className="mx-auto w-28 rounded-[26px] border border-white/5 bg-[#0D0D0C] px-6 py-2 lg:mx-0">
                    <h3 className="text-[26px] leading-10 text-lime-400">{t('thirdItemTitle')}</h3>
                  </div>
                  <p className="mt-3 px-2 leading-[22px] font-light tracking-tight text-white/70 lg:pb-2.5">
                    {t('thirdItemSubtitle')}
                  </p>
                </div>
                <div className="mt-5 grow lg:w-2/5 lg:translate-y-1/2">
                  <Link href="/packages">
                    <Button className="">
                      <span className="lg:text-lg">{t('btnText')}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
          <div className="relative hidden aspect-square lg:block lg:w-[50%]">
            <Image
              loading="lazy"
              src={feedbacksImage}
              alt="feedbacks"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="mt-20 max-h-[530px] object-contain"
            />
          </div>
        </div>
        <VideoProvider>
          <Carousel className="px-3 pt-5 lg:hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                withoutShadows
                className="mx-auto h-auto max-w-[291px] overflow-hidden rounded-[30px] border border-white/10 p-0"
              >
                <VideoPlayer
                  src={`/video/${locale}/${index + 1}.mp4`}
                  autoPlay={index === 0}
                  className="h-[472px]"
                  videoId={`mobile-video-${index}`}
                />
              </Card>
            ))}
          </Carousel>
        </VideoProvider>
        <VideoProvider>
          <div className="mt-16 hidden grid-cols-4 gap-6 lg:grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                withoutShadows
                className="mx-auto h-auto max-w-[291px] overflow-hidden rounded-[30px] border border-white/10 p-0"
              >
                <VideoPlayer
                  src={`/video/${locale}/${index + 1}.mp4`}
                  autoPlay={index === 0}
                  className="h-[472px]"
                  videoId={`desktop-video-${index}`}
                />
              </Card>
            ))}
          </div>
        </VideoProvider>
      </div>
    </section>
  )
}
