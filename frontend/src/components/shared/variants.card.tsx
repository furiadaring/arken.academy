import { formatRichText } from '@/lib/helpers'
import { TCardProps } from '@/types'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './btn'

type TVariantsCardProps = TCardProps & {
  className: string
}

export const VariantsCard = ({ className, icon, title, subtitle, features, price, name }: TVariantsCardProps) => {
  const t = useTranslations('packages')
  return (
    <div
      className={`rounded-[35px] border-[0.88px] border-[#FFFFFF1A] px-3 py-4 lg:px-7.5 lg:py-6 ${className} flex h-full flex-col lg:relative lg:z-20`}
    >
      <div className="flex flex-col border-b border-[#00000033] pb-2.5 lg:min-h-[236px]">
        <div className={`mb-3 flex items-center ${icon ? 'justify-between' : 'justify-center lg:justify-start'} gap-2`}>
          <h2 className="text-center text-[20px] leading-[35px] lg:text-[26px] lg:leading-[32px]">{title}</h2>
          {icon && <Image src={icon} alt="icon" width={42} height={42} className="mr-4" />}
        </div>
        <p className="grow text-sm font-light">{subtitle}</p>
        <p className="mt-2 text-sm tracking-tight text-[#00000099] lg:mt-4">{t('hero.priceLabel')}</p>

        <p className="badge-border mt-2 w-min rounded-[40px] px-10 py-0.5 lg:mt-6">
          <span className="text-accent text-[20px] leading-[38px]">${price}</span>
        </p>
      </div>
      <div className="flex flex-1 flex-grow flex-col">
        <ul className="flex-grow overflow-y-auto py-2 lg:mt-4">
          {features.map((feature, index) => {
            const isNestedItem = !feature.includes('<') && index > 0

            if (isNestedItem) {
              return (
                <li key={index} className="ml-12 list-disc text-sm leading-[28px] tracking-tighter">
                  <span className="font-light tracking-[0.01em]">{feature}</span>
                </li>
              )
            }

            const { label, value } = formatRichText(feature)
            return (
              <li key={index} className="ml-5 list-disc text-sm leading-[28px] tracking-tighter">
                {label && <span className="mr-1">{label}</span>}
                {value && <span className="font-light tracking-[0.01em]">{value}</span>}
              </li>
            )
          })}
        </ul>
        <Link href={{ pathname: '/payment-details', query: { price, package: title, name } }}>
          <Button size="lg" className="mt-auto">
            {t('hero.chooseBtn')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
