'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const isHome = pathname === '/'

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
        className={`relative z-[101] flex items-center space-x-2`}
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
      >
        <div className={`relative h-5 w-5`}>
          <svg
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`burger-icon absolute inset-0 h-5 w-5 object-contain transition-opacity duration-150 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          >
            <path
              d="M0 11.5C0 12.0523 0.447715 12.5 1 12.5H17C17.5523 12.5 18 12.0523 18 11.5C18 10.9477 17.5523 10.5 17 10.5H1C0.447716 10.5 0 10.9477 0 11.5ZM0 6.5C0 7.05228 0.447715 7.5 1 7.5H9C9.55228 7.5 10 7.05228 10 6.5C10 5.94772 9.55229 5.5 9 5.5H1C0.447715 5.5 0 5.94772 0 6.5ZM1 0.5C0.447716 0.5 0 0.947715 0 1.5C0 2.05228 0.447715 2.5 1 2.5H17C17.5523 2.5 18 2.05228 18 1.5C18 0.947715 17.5523 0.5 17 0.5H1Z"
              fill={isHome ? 'white' : 'black'}
            />
          </svg>

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
            <div className="bg-background z-[101] grid grid-cols-2 gap-4 rounded">
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
                  <span className="text-text">{link.label}</span>
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
