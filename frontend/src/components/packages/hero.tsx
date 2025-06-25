import hero from '@/assets/bg/hero.png'
import bg from '@/assets/bg/main-sm.png'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../shared/btn'
import { SectionTitle } from '../shared/section-title'

export const Hero = () => {
  const t = useTranslations('packages.hero')
  return (
    <section className="relative py-3">
      <Image src={hero} alt="shadow" className="absolute -top-[100px] -z-10 hidden object-contain lg:block" />
      <div className="absolute -top-[80px] right-0 z-10">
        <Image src={bg} alt="bg" className="opacity-50 lg:hidden" />
      </div>
      <div className="absolute bottom-0 -z-50">
        <Image src={bg} alt="bg" className="top-full rotate-180 opacity-50 lg:absolute lg:left-0 lg:hidden" />
      </div>
      <div className="relative z-10 container mx-auto max-w-[1280px] px-3 text-center lg:mt-10 lg:pb-10 xl:flex">
        <div className="lg:w-1/2">
          <SectionTitle className="lg:text-left">{t('title')}</SectionTitle>
        </div>
        <div className="lg:mt-16 lg:w-1/2 lg:grow xl:-ml-40">
          <p className="text-text mt-3 text-xs leading-[18px] font-light lg:max-w-4xl lg:text-left lg:text-base lg:leading-[22px] lg:tracking-wide">
            {t('subtitle')}
          </p>
          <p className="text-text text-xs leading-[18px] font-light lg:max-w-4xl lg:text-left lg:text-base lg:leading-[22px] lg:tracking-wide">
            {t('subtitle2')}
          </p>
          <div className="mx-auto mt-2 max-w-[420px] px-10 lg:mt-5 lg:w-3/5 lg:px-0">
            <Link href="/#markets">
              <Button>
                <span className="text-xs lg:text-lg">{t('marketBtn')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
