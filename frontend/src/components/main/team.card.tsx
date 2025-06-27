'use client'

import { useMessages, useTranslations } from 'next-intl'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { Button } from '../shared/btn'

type TTeamCardProps = {
  name: string
  subtitle: string
  image: StaticImageData
  itemKey?: string
}

export const TeamCard = ({ name, subtitle, image, itemKey }: TTeamCardProps) => {
  const t = useTranslations('team')
  const messages = useMessages()
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const descriptionArray = itemKey ? (messages.team?.items?.[itemKey]?.description as string[]) || [] : []

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative h-[495px] w-full lg:h-[650px]">
      <div
        className={`flip-card-inner transform-style-preserve-3d relative h-full w-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front side */}
        <div className="bg-background-team-card border-b-border absolute flex h-full w-full flex-col justify-between rounded-4xl border-b p-5 shadow-[0px_4px_26.2px_0px_#FFFFFF26_inset] backdrop-blur-[25px] backface-hidden">
          <div className="relative mx-auto mb-2 aspect-[342/345] w-full max-w-[290px] lg:max-w-[342px]">
            <Image
              src={image}
              alt={`Team member ${name}`}
              className="rounded-xl object-cover shadow-[0px_0px_20px_0px_#C7FBE340]"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="grow lg:px-4">
            <h2 className="text-gradient-red font-medium lg:py-2 lg:text-[22px]">{name}</h2>
            <p className="text-text mb-4 text-[10px] font-light lg:text-base lg:leading-snug">{subtitle}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Button onClick={handleFlip}>
                <span className="lg:text-lg">{t('more')}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="bg-background-team-card border-b-border absolute flex h-full w-full rotate-y-180 flex-col justify-between overflow-hidden rounded-4xl border-b p-5 shadow-[0px_4px_26.2px_0px_#FFFFFF26_inset] backdrop-blur-[25px] backface-hidden">
          <div>
            <h2 className="text-gradient-red mb-2 text-2xl font-medium">{name}</h2>
            <ul className="mb-2 space-y-1 lg:space-y-3">
              {descriptionArray.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-lime-400">•</span>
                  <span className="text-text text-sm leading-tight font-light lg:text-base lg:leading-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleFlip}>
              <span className="lg:text-lg">{t('back')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
