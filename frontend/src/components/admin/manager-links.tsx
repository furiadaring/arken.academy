'use client'

import { Link } from '@/i18/navigation'
import { usePathname } from 'next/navigation'

export const AdminLinks = () => {
  const pathname = usePathname()
  return (
    <div className="flex gap-6">
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('all-clients') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/all-clients"
      >
        Все пользователи
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('without-promocode') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/without-promocode"
      >
        Без промокода
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('my-clients') ? 'bg-[#A3E635] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/my-clients"
      >
        Мои клиенты
      </Link>
    </div>
  )
}
