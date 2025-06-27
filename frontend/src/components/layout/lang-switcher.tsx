'use client'

import { Locale, localesWithFlags } from '@/i18'
import { useRouter } from '@/i18/navigation'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'

type TLocaleKey = keyof typeof localesWithFlags

export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale() as Locale
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const switcherRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const changeLanguage = (newLocale: Locale) => {
    setIsOpen(false)
    router.replace(pathname, { locale: newLocale })
  }

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={switcherRef} className={`relative z-[100] ${className} `} style={{ position: 'relative' }}>
      <button
        type="button"
        className="flex items-center space-x-2 rounded p-2 transition-opacity [&:disabled]:opacity-30"
        onClick={() => startTransition(() => setIsOpen(!isOpen))}
        disabled={isPending}
      >
        <span className={`${isHome ? 'text-white' : 'text-text'} capitalize`}>{locale}</span>
        <span>
          <svg
            className={`h-2 w-3 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-0' : 'rotate-180'} `}
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91 0.0900002L6.5 4.67L11.09 0.0900002L12.5 1.5L6.5 7.5L0.5 1.5L1.91 0.0900002Z"
              fill={isHome ? 'white' : 'black'}
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className={`${isHome ? 'bg-[#181A1B] text-white' : 'bg-background text-text'} fixed z-[999] mt-1 w-36 rounded-xl border border-white/10 p-3 shadow-md backdrop-blur-md transition-all delay-300 duration-300 ease-in-out lg:w-44`}
          style={{
            top: switcherRef.current ? switcherRef.current.getBoundingClientRect().bottom + 5 : 'auto',
            left: switcherRef.current ? switcherRef.current.getBoundingClientRect().left - 50 : 'auto',
          }}
        >
          {Object.entries(localesWithFlags).map(([localeKey, { flag, name }]) => (
            <button
              key={localeKey}
              onClick={() => changeLanguage(localeKey as TLocaleKey)}
              className={`flex w-full items-center space-x-2 rounded p-2 text-left transition-all duration-300 ease-in-out ${
                localeKey === locale ? 'bg-background/60' : ''
              }`}
            >
              <Image src={flag} alt={localeKey} width={20} height={20} />
              <span className="capitalize">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
