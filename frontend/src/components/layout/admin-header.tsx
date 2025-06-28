'use client'

import { adminLogout } from '@/actions/admin-logout'
import { TLinks } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AdminHeader = ({ links, isLogged }: { links: TLinks[]; isLogged: boolean }) => {
  const pathname = usePathname()
  return (
    <header className="border-b border-[#252525] bg-[#0D0D0D]/90 px-3 py-4.5 backdrop-blur-[25px]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image className="h-10 w-20 object-contain" src="/logo.svg" alt="Logo" width={130} height={67} />
        </Link>
        {isLogged ? (
          <>
            <div className="hidden space-x-2 lg:block">
              {links.map((link) => (
                <Link
                  className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes(link.href) ? 'bg-[#E67935] text-white' : 'bg-[#222222] text-white'}`}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <form action={adminLogout}>
              <button
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-[#252525]"
                type="submit"
              >
                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.7508 8.20917L11.4583 6.91667L6.875 11.5L11.4583 16.0833L12.7508 14.7908L10.3858 12.4167L19.25 12.4167L19.25 10.5833L10.3858 10.5833L12.7508 8.20917ZM4.58333 19.75L17.4167 19.75C18.4342 19.75 19.25 18.925 19.25 17.9167L19.25 14.25L17.4167 14.25L17.4167 17.9167L4.58333 17.9167L4.58333 5.08333L17.4167 5.08333L17.4167 8.75L19.25 8.75L19.25 5.08333C19.25 4.075 18.4342 3.25 17.4167 3.25L4.58333 3.25C3.575 3.25 2.75 4.075 2.75 5.08333L2.75 17.9167C2.75 18.925 3.575 19.75 4.58333 19.75Z"
                    fill="white"
                  />
                </svg>
                <span className="hidden font-light text-white lg:block">Logout</span>
              </button>
            </form>
          </>
        ) : null}
      </div>
    </header>
  )
}
