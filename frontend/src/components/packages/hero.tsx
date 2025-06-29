import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '../shared/btn'

export const Hero = () => {
  const t = useTranslations('packages.hero')
  return (
    <section className="relative mb-10 py-3">
      <div className="relative z-10 container mx-auto max-w-[1280px] px-3 text-center lg:mt-10 lg:pb-10 xl:flex">
        <div className="lg:w-1/2">
          <h3 className="text-title">{t('title')}</h3>
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
