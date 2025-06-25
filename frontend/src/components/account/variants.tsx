import { TCardProps } from '@/types'
import { useMessages } from 'next-intl'
import { VariantsCard } from '../shared/variants.card'

const classes = [
  'bg-[#FDFFEF] text-[#000000] shadow-[0px_4px_25px_0px_#D3DFFC66]',
  'bg-gradient-to-br from-[#D3DCFD] to-[#DAFEF2] text-[#000000] shadow-[0px_4px_25px_0px_#D3DFFC66]',
  'bg-gradient-to-br from-[#F8FFD7] via-[#ACF0FF] to-[#D0FFD9] text-[#000000] shadow-[0px_4px_25px_0px_#B5F3F566] ',
  'bg-gradient-to-br from-[#FFDBC2] to-[#FFE88B] text-[#000000] shadow-[0px_4px_25px_0px_#FFE1AA66]',
  'bg-gradient-to-br from-[#FFC2A1] to-[#B8BEFF] text-[#000000] shadow-[0px_4px_25px_0px_#ECC1BA66]',
]

export const Variants = () => {
  const messages = useMessages()
  const variants = messages.packages.variants as TCardProps[]
  return (
    <section className="relative z-10 container mx-auto max-w-[1280px] px-3 pb-7">
      <div className="space-y-7">
        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 lg:max-w-full lg:grid-cols-2">
          {variants.map((variant, index) => (
            <VariantsCard key={index} {...variant} className={classes[index]} />
          ))}
        </div>
      </div>
    </section>
  )
}
