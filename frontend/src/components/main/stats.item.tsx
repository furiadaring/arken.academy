import Image, { StaticImageData } from 'next/image'
import { Card } from '../shared/card'

type TStatsItemProps = {
  title: string
  subtitle: string
  image: StaticImageData
}

export const StatsItem = ({ title, subtitle, image }: TStatsItemProps) => {
  return (
    <Card className="flex min-h-[490px] flex-col items-center justify-between overflow-hidden rounded-[35px] px-3 py-12 text-center lg:h-[536px] lg:px-7">
      <h3 className="text-gradient text-3xl font-medium lg:text-[34px]">{title}</h3>
      <p className="text-text mt-3 text-xl font-light lg:text-[22px]">{subtitle}</p>
      <Image src={image} alt="Stat item" className="max-h-[245px]" />
    </Card>
  )
}
