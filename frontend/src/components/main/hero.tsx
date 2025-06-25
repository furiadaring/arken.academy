import cellsImg from '@/assets/bg/cells.svg'
import phone from '@/assets/bg/phone.png'
import topGlow from '@/assets/bg/top_bg_glow.png'
import { Button } from '@/components/shared/btn'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const t = await getTranslations('hero')
  return (
    <section className="text-gradient relative">
      <div className="pointer-events-none absolute inset-x-0 -top-[100px] -z-10 flex w-full items-end justify-between">
        <div className="relative">
          <Image src={cellsImg} alt="cells left" priority />
        </div>
        <div className="scale-x-[-1]">
          <Image src={cellsImg} alt="cells right" priority />
        </div>
      </div>
      <div className="absolute -top-[100px] left-1/2 -z-50 h-[400px] w-full max-w-[390px] -translate-x-1/2 overflow-hidden lg:h-[580px] lg:max-w-[1020px]">
        <Image
          src={topGlow}
          alt="top-glow"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute left-0 w-full max-w-screen"
        />
      </div>
      <div className="container mx-auto flex max-w-[1280px] flex-col items-center justify-center px-3 pt-1 text-center">
        <div className="rounded-[64px] border border-white/26 bg-white/3 px-3.5 py-2 shadow-[0px_4px_14px_0px_#FFFFFF1A_inset] backdrop-blur-[25px] lg:mt-24 lg:px-8 lg:py-3">
          <span className="text-sm font-extralight text-white">{t('badge')}</span>
        </div>
        <h1 className="lg:leding py-3 text-[22px] leading-[28px] font-medium lg:max-w-4xl lg:py-9 lg:text-[52px] lg:leading-[100%]">
          {t('title')}
        </h1>
        <span className="absolute top-1/6 left-1/2 h-1/12 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a3e635] opacity-50 blur-[125px]"></span>
        <p className="text-text text-xs leading-[18px] font-light lg:mt-3 lg:max-w-4xl lg:pt-1 lg:text-lg lg:leading-[22px] lg:tracking-wide">
          {t('subtitle')}
        </p>

        <div className="relative z-10 grid grid-cols-2 items-center gap-2 pt-2 lg:max-w-3xl lg:grid-cols-[12%_1fr_1fr_12%] lg:justify-items-center lg:pt-5">
          <span className="relative mr-4 hidden h-[2px] w-20 bg-gradient-to-l from-[#FFFFFF] to-[#1E260F] lg:block">
            <span className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white"></span>
          </span>
          <Link href="/packages">
            <Button variant="primary" className="lg:mx-auto lg:min-w-[250px] xl:min-w-[260px]">
              <span className="text-xs text-nowrap lg:text-lg">{t('button.choose')}</span>
            </Button>
          </Link>
          <Link href={isLoggedIn ? '/account/all-packages' : '/login'}>
            <Button variant="secondary" className="lg:mx-auto lg:min-w-[220px] xl:min-w-[260px]">
              <span className="text-xs text-nowrap lg:text-lg">
                {isLoggedIn ? t('button.account') : t('button.enter')}
              </span>
            </Button>
          </Link>
          <span className="relative ml-4 hidden h-[2px] w-20 bg-gradient-to-r from-[#FFFFFF] to-[#1E260F] lg:block">
            <span className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-white"></span>
          </span>
        </div>
        <div className="relative mt-5 ml-[13%] text-center lg:ml-20">
          <div className="relative z-10">
            <Image src={phone} alt="phone" className="mt-0.5" priority />
          </div>
          <div className="absolute top-1/2 left-1/2 -z-10 h-5/6 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[586px] bg-[#A1E830]/40 blur-[300px]"></div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-[1%] -z-10 flex w-full scale-y-[-1] items-end justify-between">
        <div className="relative">
          <Image src={cellsImg} alt="cells left" priority />
        </div>
        <div className="scale-x-[-1]">
          <Image src={cellsImg} alt="cells right" priority />
        </div>
      </div>
    </section>
  )
}
