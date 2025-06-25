'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Children, ReactNode, useEffect, useState } from 'react'

type TCarouselProps = {
  children: ReactNode
  className?: string
}

export const Carousel = ({ children, className }: TCarouselProps) => {
  const slides = Children.toArray(children)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const lgBreakpoint = window.matchMedia('(min-width: 1024px)')
      setIsLargeScreen(lgBreakpoint.matches)
    }
    checkScreenSize()
    const lgBreakpoint = window.matchMedia('(min-width: 1024px)')
    lgBreakpoint.addEventListener('change', checkScreenSize)
    return () => {
      lgBreakpoint.removeEventListener('change', checkScreenSize)
    }
  }, [])

  const plugins = isLargeScreen ? [] : [Autoplay()]

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      breakpoints: {
        '(min-width: 1024px)': { slidesToScroll: 3 },
      },
    },
    plugins,
  )

  return (
    <div className={`${className}`}>
      <div className={`overflow-hidden`} ref={emblaRef}>
        <div className="flex lg:justify-between">
          {slides.map((child, index) => (
            <div key={index} className="h-full min-w-0 shrink-0 grow-0 basis-[90%] px-1 lg:basis-[31%] lg:px-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
