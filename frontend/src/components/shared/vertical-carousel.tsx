'use client'

import { createColumns } from '@/lib/helpers'
import { TVerticalCarouselProps } from '@/types'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export const VerticalCarousel = ({ images = [], className = '', columnCount = 3 }: TVerticalCarouselProps) => {
  const columnsRef = useRef<(HTMLDivElement | null)[]>([])
  const animationRefs = useRef<(number | null)[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isLg, setIsLg] = useState(false)
  const imageSize = isLg ? 75 : 44

  useEffect(() => {
    setIsClient(true)
    const lgBreakpoint = window.matchMedia('(min-width: 1024px)')
    setIsLg(lgBreakpoint.matches)
    lgBreakpoint.addEventListener('change', () => setIsLg(lgBreakpoint.matches))
    return () => {
      lgBreakpoint.removeEventListener('change', () => setIsLg(lgBreakpoint.matches))
    }
  }, [])

  const columns = useMemo(() => createColumns(images, columnCount), [images, columnCount])

  useEffect(() => {
    if (!isClient) return
    const animationRefsSnapshot = animationRefs.current
    // Set up animation for each column
    columns.forEach((_, columnIndex) => {
      const columnElement = columnsRef.current[columnIndex]
      if (!columnElement) return

      // Calculate content height for looping
      const contentHeight = columnElement.scrollHeight / 2

      // Start position - different for up/down scrolling columns
      let y = columnIndex % 2 === 0 ? 0 : -contentHeight / 2

      const animate = () => {
        // Variable speed based on column position
        const speed = Math.random() * (0.3 + columnIndex * 0.1)

        // Move in the appropriate direction
        y += columnIndex % 2 === 0 ? -speed : speed

        // Reset logic to ensure continuous scrolling
        if (columnIndex % 2 === 0) {
          // For upward scrolling columns
          if (y <= -contentHeight) {
            // Jump back to start when we've gone too far
            y = 0
          }
        } else {
          // For downward scrolling columns
          if (y >= 0) {
            // Jump back when we've scrolled through
            y = -contentHeight
          }
        }
        columnElement.style.transform = `translateY(${y}px)`
        animationRefsSnapshot[columnIndex] = requestAnimationFrame(animate)
      }

      animationRefsSnapshot[columnIndex] = requestAnimationFrame(animate)
    })

    return () => {
      animationRefsSnapshot.forEach((ref) => {
        if (ref) cancelAnimationFrame(ref)
      })
    }
  }, [columns, isClient])

  return (
    <div className={`flex justify-between gap-4 ${className}`}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="overflow-hidden" style={{ height: `${imageSize * 5}px` }}>
          <div
            ref={(el) => {
              columnsRef.current[columnIndex] = el
              return undefined
            }}
            className="flex flex-col gap-4 will-change-transform"
            style={{ transition: 'transform 0s linear' }}
          >
            {column.map((image, imageIndex) => (
              <div
                key={`${columnIndex}-${imageIndex}`}
                className="relative"
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={image}
                  alt={`Member ${imageIndex + 1}`}
                  fill
                  sizes={`${imageSize}px`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
