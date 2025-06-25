import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '../shared/btn'
import { SectionTitle } from '../shared/section-title'
import { VerticalCarousel } from '../shared/vertical-carousel'

const slides = [
  'Frame 143.png',
  'Frame 146.png',
  'Frame 150.png',
  'Frame 153.png',
  'Frame 154.png',
  'Frame 156.png',
  'Frame 157.png',
  'Frame 161.png',
  'Frame 162.png',
]

export const Community = () => {
  const t = useTranslations('community')

  return (
    <section className="bg-[#0D0D0D]">
      <div className="relative container mx-auto max-w-[1280px] px-3 pt-5 lg:px-4 lg:pt-26">
        <div className="lg:flex lg:gap-6 lg:[&>*]:flex-1">
          <div className="space-y-5">
            <div className="mx-auto w-4/5 rounded-[64px] border border-white/26 bg-white/3 px-3.5 py-3 shadow-[0px_4px_14px_0px_#FFFFFF1A_inset] backdrop-blur-[25px] lg:mx-0 lg:w-1/2">
              <p className="text-center text-sm font-extralight text-white">
                <span className="text-gradient font-bold">#1</span> {t('badge')}
              </p>
            </div>
            <SectionTitle className="!text-lg lg:pb-5 lg:text-left lg:!text-[41px]">{t('title')}</SectionTitle>
            <Link href="/packages">
              <Button className="lg:mt-5 lg:w-[65%] lg:text-lg">{t('btnText')}</Button>
            </Link>
          </div>
          <div className="relative mt-5 lg:-mt-5">
            <div className="absolute -top-3 left-0 z-10 h-46 w-full bg-gradient-to-b from-[#000000] to-transparent blur-sm lg:h-60"></div>
            <div className="absolute -bottom-3 left-0 z-10 h-46 w-full bg-gradient-to-b from-transparent to-[#000000] blur-sm lg:h-60"></div>
            <VerticalCarousel images={slides.map((el) => `/community/${el}`)} columnCount={6} />
          </div>
        </div>
      </div>
    </section>
  )
}
