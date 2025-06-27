'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const imgs = ['main.svg', 'packages.svg', 'feedbacks.svg', 'about-us.svg', 'contacts.svg', 'enter.svg']

type TBurgerProps = {
  links: {
    href: string
    label: string
  }[]
}

export const Burger = ({ links }: TBurgerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const t = useTranslations('menu')

  useEffect(() => {
    if (isOpen) {
      setIsBackgroundVisible(true)
      setTimeout(() => {
        setIsMenuVisible(true)
      }, 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsMenuVisible(false)
    setTimeout(() => {
      setIsBackgroundVisible(false)
    }, 150)
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  return (
    <div className="relative lg:hidden">
      <button
        className="relative z-[101] flex items-center space-x-2"
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
      >
        <div className="relative h-5 w-5">
          <Image
            className={`burger-icon absolute inset-0 h-5 w-5 object-contain transition-opacity duration-150 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            src="/burger.svg"
            alt="Menu"
            width={18}
            height={12}
          />
          <Image
            className={`burger-icon burger-icon-open absolute inset-0 h-5 w-5 object-contain transition-opacity duration-150 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            src="/close.svg"
            alt="Close"
            width={18}
            height={12}
          />
        </div>
      </button>
      {isOpen && (
        <>
          <div
            className={`bg-background fixed inset-0 z-[100] h-full w-full transition-opacity duration-150 ease-in-out ${isBackgroundVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
          />
          <div
            className={`header-menu bg-background fixed right-0 z-[101] flex w-svw flex-col justify-between gap-10 px-3 pt-4 transition-all duration-150 ease-in-out ${isMenuVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
          >
            <Link href="/" className="absolute -top-11 z-[102] mb-4 flex cursor-pointer">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                src="/logo.svg"
                alt="Logo"
                width={145}
                height={48}
              />
            </Link>
            <div className="bg-background z-[101] grid grid-cols-2 gap-4 rounded shadow-md">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  onClick={handleClose}
                  href={link.href}
                  className={`${index === 5 ? 'bg-secondary' : 'bg-background-card'} burger-card menu-item-animate flex items-center justify-center`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Image
                    className="grow object-contain"
                    src={`/menu/${imgs[index]}`}
                    alt="Logo"
                    width={86}
                    height={86}
                  />
                  <span className="text-[#000000]">{link.label}</span>
                </Link>
              ))}
            </div>
            <p className="text-center text-xs font-extralight text-white/70">
              © {new Date().getFullYear()} {t('copyright')}. Arken Academy
            </p>
          </div>
        </>
      )}
    </div>
  )
}
