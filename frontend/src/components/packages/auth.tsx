import authBackgroundImageLg from '@/assets/packages/auth-lg.png'
import authBackgroundImageSm from '@/assets/packages/auth.png'
import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../shared/btn'

export const Auth = async () => {
  const t = await getTranslations('packages.auth')
  const session = await auth()
  return (
    <section className={`relative w-full overflow-hidden`}>
      <div className="relative mx-auto h-[430px] w-full max-w-[1200px] lg:ml-3 lg:h-[700px]">
        <div className="font-secondary absolute top-16 left-4 z-10 -translate-y-1/2 space-y-2 text-center sm:left-1/2 sm:-translate-x-1/2 lg:top-2/5 lg:left-3/5 lg:w-1/2 lg:space-y-6 lg:text-left">
          <h2 className="text-gradient-red -packages-lg text-3xl font-bold lg:text-5xl 2xl:text-8xl">
            {t('sectionTitle')}
          </h2>
          <p className="text text-gradient-red -packages-sm text-lg lg:text-2xl 2xl:text-5xl">{t('sectionSubtitle')}</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 min-h-[432px] w-full lg:aspect-auto lg:h-[770px]">
        <Image
          src={authBackgroundImageSm}
          alt="Investment expert"
          className="block object-contain object-center lg:hidden"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Image
          src={authBackgroundImageLg}
          alt="Investment expert"
          className="hidden object-contain object-center lg:block"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="-mt-8 border border-white/30 bg-gradient-to-r from-[#99999900] to-[#B2B2B2]/20 p-4 px-6 backdrop-blur-[44px] lg:absolute lg:bottom-10 lg:left-[30%] lg:flex lg:-translate-x-1/4 lg:flex-row-reverse lg:items-center lg:gap-10 lg:rounded-[30px] lg:from-[#4C4C4C00]/10 lg:to-[#B2B2B2]/10 xl:w-1/2 2xl:gap-[150px]">
        <div>
          <h5 className="text-medium text-lg">{t('blockTitle')}</h5>
          <p className="pb-4 text-sm leading-6 font-light">{t('blockSubtitle')}</p>
        </div>
        <Link href={session?.user ? '/account/all-packages' : '/login'} className="w-full">
          <Button className="w-full !rounded-[20px] lg:h-20">
            <span className="font-semibold">{session?.user ? t('account') : t('btn')}</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}
