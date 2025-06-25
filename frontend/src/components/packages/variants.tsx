import choiceIcon from '@/assets/packages/choice-icon.png'
import choiceImg from '@/assets/packages/choice.png'
import masterIcon from '@/assets/packages/master-icon.svg'
import vipIcon from '@/assets/packages/vip-icon.svg'
import { useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import { SectionTitle } from '../shared/section-title'
import { VariantsCard } from '../shared/variants.card'

export const Variants = () => {
  const t = useTranslations('packages')
  const messages = useMessages()
  const variants = messages.packages.variants
  return (
    <section className="relative z-10 container mx-auto max-w-[1280px] px-3 pb-7">
      <div className="space-y-7">
        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 lg:max-w-full lg:grid-cols-2">
          <VariantsCard {...variants[0]} className="bg-[#FDFFEF] text-[#000000] shadow-[0px_4px_25px_0px_#D3DFFC66]" />
          <VariantsCard
            {...variants[1]}
            className="bg-gradient-to-br from-[#D3DCFD] to-[#DAFEF2] text-[#000000] shadow-[0px_4px_25px_0px_#D3DFFC66]"
          />
        </div>
        <div
          className={`mx-auto grid max-w-[420px] grid-cols-1 overflow-hidden rounded-[35px] bg-gradient-to-br from-[#F8FFD7] via-[#ACF0FF] to-[#D0FFD9] lg:max-w-full lg:grid-cols-2 lg:rounded-[35px] lg:shadow-[0px_4px_25px_0px_#B5F3F566]`}
        >
          <div className="relative -mb-14 min-h-[488px] w-full overflow-hidden rounded-t-[35px] lg:min-h-[660px] lg:rounded-b-[35px]">
            <Image src={choiceIcon} alt="choice" className="absolute top-6 left-5 z-10" width={167} height={40} />
            <Image
              src={choiceImg}
              alt="choice"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover object-top"
            />
          </div>
          <VariantsCard
            {...variants[2]}
            className="lg:rounded-0 bg-gradient-to-br from-[#F8FFD7] via-[#ACF0FF] to-[#D0FFD9] pt-18 text-[#000000] shadow-[0px_4px_25px_0px_#B5F3F566] lg:h-[660px] lg:border-0 lg:bg-gradient-to-b lg:from-transparent lg:via-transparent lg:to-transparent lg:shadow-none"
          />
        </div>

        <div>
          <SectionTitle className="lg:text-left">{t('more.title')}</SectionTitle>
          <p className="mt-3 text-sm leading-[24px] font-light text-[#B9B9B9] lg:max-w-4xl lg:pt-1 lg:text-lg lg:tracking-wide">
            {t.rich('more.subtitle', {
              b: (children) => <b>{children}</b>,
            })}
          </p>
        </div>

        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 lg:max-w-full lg:grid-cols-2">
          <VariantsCard
            {...variants[3]}
            className="bg-gradient-to-br from-[#FFDBC2] to-[#FFE88B] text-[#000000] shadow-[0px_4px_25px_0px_#FFE1AA66]"
            icon={masterIcon}
          />
          <VariantsCard
            {...variants[4]}
            className="bg-gradient-to-br from-[#FFC2A1] to-[#B8BEFF] text-[#000000] shadow-[0px_4px_25px_0px_#ECC1BA66]"
            icon={vipIcon}
          />
        </div>
      </div>
    </section>
  )
}
