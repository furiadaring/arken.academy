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
    <nav className="hidden border-r border-[#EEF1F4] lg:block">
      <ul className="mr-3 space-y-4">
        {links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${pathname === link.href ? 'badge-border' : ''} hover:text-accent flex w-full items-center gap-2 rounded-2xl p-6`}
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
