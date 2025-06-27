import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { Burger } from './burger'
import { HeaderWrapper } from './header-wrapper'
import LocaleSwitcher from './lang-switcher'

export const Header = async () => {
  const session = await auth()
  const t = await getTranslations('menu')

  const links = [
    { href: '/', label: t('home') },
    { href: '/packages', label: t('packages') },
    { href: '/#feedbacks', label: t('feedbacks') },
    { href: '/#about', label: t('about') },
    { href: '/#contacts', label: t('contacts') },
    { href: session ? '/account/all-packages' : '/login', label: session ? t('account') : t('enter') },
  ]

  return (
    <HeaderWrapper>
      <header className="relative z-30 mx-auto flex w-full items-center justify-between px-3 py-4">
        <Link href="/" className="z-[99] cursor-pointer">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain lg:hidden"
            src="/logo.svg"
            alt="Logo"
            width={145}
            height={48}
          />
        </Link>
        <div className="container mx-auto hidden w-full max-w-[1240px] items-center justify-between space-x-2 font-light text-white lg:flex">
          {links.slice(0, 3).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent tracking-wider">
              {link.label}
            </Link>
          ))}
          <Link href="/" className="cursor-pointer lg:ml-20">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-12 w-24 object-contain"
              src="/logo.svg"
              alt="Logo"
              width={130}
              height={67}
            />
          </Link>
          <LocaleSwitcher />
          {links.slice(3).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent tracking-wider">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-2 lg:hidden">
          <LocaleSwitcher />
          <Burger links={links} />
        </div>
      </header>
    </HeaderWrapper>
  )
}
