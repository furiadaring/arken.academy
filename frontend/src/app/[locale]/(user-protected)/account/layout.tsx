import { AccountNav } from '@/components/layout/account-nav'
import { AppTabs } from '@/components/shared/app-tabs'
import { TLinks } from '@/types'
import { useMessages } from 'next-intl'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const messages = useMessages()
  const links = messages.account.links as TLinks[]
  return (
    <div className="mx-auto min-h-[calc(100svh-99px)] max-w-[1200px]">
      <div className="grid gap-6 px-3 pt-7 pb-20 lg:grid-cols-[20%_80%] lg:pb-0">
        <AccountNav />
        <div className="pb-20 lg:pb-0">{children}</div>
      </div>
      <AppTabs tabs={links} />
    </div>
  )
}
