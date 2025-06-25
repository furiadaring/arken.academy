'use client'

import { ReactNode, useEffect, useRef } from 'react'

type THeaderWrapperProps = {
  children: ReactNode
}

export const HeaderWrapper = ({ children }: THeaderWrapperProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(0)
  const defaultOffset = 100

  useEffect(() => {
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop
    const containHide = () => headerRef.current?.classList.contains('header-hide') || false

    const handleScroll = () => {
      const header = headerRef.current
      if (!header) return

      const isLargeScreen = window.innerWidth >= 1024
      const currentScrollPos = scrollPosition()

      if (currentScrollPos > 0) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }

      if (isLargeScreen) {
        header.classList.remove('header-hide')
        return
      }
      if (currentScrollPos > lastScrollRef.current && !containHide() && currentScrollPos > defaultOffset) {
        header.classList.add('header-hide')
      } else if (currentScrollPos < lastScrollRef.current && containHide()) {
        header.classList.remove('header-hide')
      }

      lastScrollRef.current = currentScrollPos
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        headerRef.current?.classList.remove('header-hide')
      } else {
        handleScroll()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={headerRef} className="header-wrapper transition-transform duration-300 ease-in-out">
      {children}
    </div>
  )
}
