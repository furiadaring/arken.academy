import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '../shared/btn'
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
    <section>
      <div className="relative container mx-auto max-w-[1280px] px-3 pt-5 lg:px-4 lg:pt-26">
        <div className="lg:flex lg:flex-row-reverse lg:gap-10 lg:[&>*]:flex-1">
          <div className="space-y-5">
            <div className="badge-border mx-auto w-4/5 rounded-[64px] bg-white/3 px-3.5 py-3 shadow-[0px_4px_14px_0px_#FFFFFF1A_inset] backdrop-blur-[25px] lg:mx-0 lg:w-1/2">
              <p className="text-center text-sm font-extralight">
                <span className="text-gradient-red font-bold">#1</span> {t('badge')}
              </p>
            </div>
            <h3 className="text-title lg:!text-left">{t('title')}</h3>
            <Link href="/login">
              <Button className="lg:mt-5 lg:w-[65%] lg:text-lg">{t('btnText')}</Button>
            </Link>
          </div>
          <div className="relative mt-5 lg:-mt-5">
            <div className="absolute -top-3 left-0 z-10 h-46 w-full bg-gradient-to-b from-[#FFFFFF] to-transparent blur-sm lg:h-80"></div>
            <div className="absolute -bottom-12 left-0 z-10 h-46 w-full bg-gradient-to-b from-transparent to-[#FFFFFF] blur-sm lg:h-80"></div>
            <VerticalCarousel images={slides.map((el) => `/community/${el}`)} columnCount={6} />
          </div>
        </div>
      </div>
    </section>
  )
}
