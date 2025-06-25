'use client'

import { Link } from '@/i18/navigation'
import { usePathname } from 'next/navigation'

export const AdminLinks = () => {
  const pathname = usePathname()
  return (
    <div className="flex gap-6">
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('users') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/users"
      >
        Все пользователи
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('payments') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/payments"
      >
        Платежи
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('roles') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/roles"
      >
        Роли и доступы
      </Link>
    </div>
  )
}
