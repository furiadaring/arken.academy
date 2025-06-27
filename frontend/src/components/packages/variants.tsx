import choiceIcon from '@/assets/packages/choice-icon.png'
import choiceImg from '@/assets/packages/choice.png'
import masterIcon from '@/assets/packages/master-icon.svg'
import vipIcon from '@/assets/packages/vip-icon.svg'
import { useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import { VariantsCard } from '../shared/variants.card'

export const Variants = () => {
  const t = useTranslations('packages')
  const messages = useMessages()
  const variants = messages.packages.variants
  return (
    <section className="relative z-10 container mx-auto max-w-[1280px] px-3 pb-7">
      <div className="space-y-7">
        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 lg:max-w-full lg:grid-cols-2">
          <VariantsCard {...variants[0]} className="bg-[#EEF1F4] shadow-[0px_0px_34px_0px_#FFFFFF26_inset]" />
          <VariantsCard
            {...variants[1]}
            className="bg-gradient-to-b from-[#FFD0B4] to-[#EEF1F4] shadow-[0px_4px_25px_0px_#D3DFFC66]"
          />
        </div>
        <div
          className={`mx-auto grid max-w-[420px] grid-cols-1 overflow-hidden rounded-[35px] bg-gradient-to-b from-[#C4EFFF] to-[#EEF1F4] lg:max-w-full lg:grid-cols-2 lg:rounded-[35px] lg:shadow-[0px_0px_34px_0px_#FFFFFF26_inset]`}
        >
          <div className="relative -mb-14 min-h-[488px] w-full overflow-hidden rounded-t-[35px] lg:min-h-[660px] lg:rounded-b-[35px]">
            <Image
              src={choiceIcon}
              alt="choice"
              className="absolute top-6 right-0 z-10 lg:right-4"
              width={167}
              height={40}
            />
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
            className="lg:rounded-0 from-[#C4EFFF] to-[#EEF1F4] pt-18 text-[#000000] lg:h-[660px] lg:border-0 lg:bg-gradient-to-b lg:from-transparent lg:via-transparent lg:to-transparent lg:shadow-[0px_4px_25px_0px_#B5F3F566]"
          />
        </div>

        <div>
          <h5 className="text-title">{t('more.title')}</h5>
          <p className="text-text mt-3 text-sm leading-[24px] font-light lg:max-w-4xl lg:pt-1 lg:text-lg lg:tracking-wide">
            {t.rich('more.subtitle', {
              b: (children) => <b>{children}</b>,
            })}
          </p>
        </div>

        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 lg:max-w-full lg:grid-cols-2">
          <VariantsCard
            {...variants[3]}
            className="bg-gradient-to-b from-[#FFF1C4] to-[#EEF1F4] shadow-[0px_0px_34px_0px_#FFFFFF26_inset]"
            icon={masterIcon}
          />
          <VariantsCard
            {...variants[4]}
            className="bg-gradient-to-b from-[#FFC4C4] to-[#EEF1F4] shadow-[0px_0px_34px_0px_#FFFFFF26_inset]"
            icon={vipIcon}
          />
        </div>
      </div>
    </section>
  )
}
