'use client'

import { Link } from '@/i18/navigation'
import { usePathname } from 'next/navigation'

export const AdminLinks = () => {
  const pathname = usePathname()
  return (
    <div className="flex gap-6">
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('all-clients') ? 'bg-[#E67935] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/f2186af6dc6143439b65adc/manager/all-clients"
      >
        Все пользователи
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('without-promocode') ? 'bg-[#E67935] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/f2186af6dc6143439b65adc/manager/without-promocode"
      >
        Без промокода
      </Link>
      <Link
        className={`rounded-2xl px-6 py-2 text-sm font-light ${pathname.includes('my-clients') ? 'bg-[#E67935] text-[#222222]' : 'bg-[#222222] text-white'}`}
        href="/f2186af6dc6143439b65adc/manager/my-clients"
      >
        Мои клиенты
      </Link>
    </div>
  )
}
