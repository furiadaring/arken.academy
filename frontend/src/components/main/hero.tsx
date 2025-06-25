import cellsImg from '@/assets/bg/cells.svg'
import phone from '@/assets/bg/phone.png'
import { Button, LinkButton } from '@/components/shared/btn'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { SectionTitle } from '../shared/section-title'

export const Hero = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const t = await getTranslations('hero')
  return (
    <section className="text-gradient relative">
      <div className="pointer-events-none absolute inset-x-0 -top-[100px] -z-10 flex w-full items-end justify-between bg-[#181A1B]">
        <div className="relative">
          <Image src={cellsImg} alt="cells left" priority />
        </div>
        <div className="scale-x-[-1]">
          <Image src={cellsImg} alt="cells right" priority />
        </div>
      </div>
      <div className="container mx-auto max-w-[1280px] bg-[#181A1B] px-3 pt-1">
        <div className="flex flex-col justify-between lg:mt-24 lg:flex-row lg:gap-20">
          <div className="flex flex-col items-center">
            <div className="badge-border mb-3 rounded-[64px] px-5 py-3 shadow-[0px_4px_14px_0px_#FFFFFF1A_inset] backdrop-blur-[25px] lg:px-8 lg:py-3">
              <span className="relative z-10 text-sm font-extralight text-white">{t('badge')}</span>
            </div>
            <SectionTitle className="py-3 !text-left text-[27px] leading-[32px] !font-bold lg:max-w-4xl lg:py-9 lg:text-[41px] lg:leading-[100%] 2xl:text-[72px]">
              {t('title')}
            </SectionTitle>
            <div className="flex flex-col-reverse items-center lg:flex-row">
              <div className="relative z-10 grid w-full grid-cols-2 items-center gap-2 pt-2 lg:max-w-3xl lg:grid-cols-[8%_1fr_1fr_8%] lg:justify-items-center lg:pt-5">
                <span className="relative mr-4 hidden h-[2px] w-14 bg-gradient-to-l from-[#FFFFFF] to-[#1E260F] lg:block">
                  <span className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white"></span>
                </span>
                <LinkButton link="/packages" variant="primary" className="lg:mx-auto lg:min-w-[250px] xl:min-w-[260px]">
                  <span className="text-xs text-nowrap lg:text-lg">{t('button.choose')}</span>
                </LinkButton>
                <Link href={isLoggedIn ? '/account/all-packages' : '/login'}>
                  <Button variant="secondary" className="lg:mx-auto lg:min-w-[220px] xl:min-w-[260px]">
                    <span className="text-xs text-nowrap lg:text-lg">
                      {isLoggedIn ? t('button.account') : t('button.enter')}
                    </span>
                  </Button>
                </Link>
                <span className="relative ml-4 hidden h-[2px] w-14 bg-gradient-to-r from-[#FFFFFF] to-[#1E260F] lg:block">
                  <span className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white"></span>
                </span>
              </div>
              <span className="absolute top-1/6 left-1/2 h-1/12 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E67935] opacity-50 blur-[125px]"></span>
              <p className="mt-2 w-5/6 text-center text-xs font-light text-white lg:mt-3 lg:max-w-4xl lg:pt-1 lg:text-lg lg:leading-[22px]">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="relative z-10 ml-[10%]">
            <Image src={phone} alt="phone" className="mt-0.5" priority />
          </div>
          <div className="absolute top-1/2 left-1/2 -z-10 h-5/6 w-1/6 -translate-y-1/2 rounded-[586px] bg-[#FB8138]/40 blur-[300px]"></div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-[1%] -z-10 flex w-full scale-y-[-1] items-end justify-between">
        <div className="relative">
          <Image src={cellsImg} alt="cells left" priority />
        </div>
      </div>
      <div className="scale-x-[-1]">
        <Image src={cellsImg} alt="cells right" priority />
      </div>
    </section>
  )
}
