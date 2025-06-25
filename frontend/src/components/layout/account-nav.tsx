'use client'
import allPackagesIcon from '@/assets/account/all-packages.svg'
import faqIcon from '@/assets/account/faq.svg'
import myPackagesIcon from '@/assets/account/my-packages.svg'
import { TLinks } from '@/types'
import { useMessages } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const icons = [allPackagesIcon, myPackagesIcon, faqIcon]
export const AccountNav = () => {
  const pathname = usePathname()
  const messages = useMessages()
  const links = messages.account.links as TLinks[]
  return (
    <nav className="hidden border-r border-[#252525] lg:block">
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${pathname === link.href ? 'bg-[#202020]' : ''} flex w-full items-center gap-2 rounded-2xl p-6 hover:text-lime-400`}
            >
              <Image src={icons[index]} alt={link.label} />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
