import { adminRefresh } from '@/actions/admin-refresh'
import { AdminHeader } from '@/components/layout/admin-header'
import { AppTabs } from '@/components/shared/app-tabs'
import { managerLinks } from '@/lib/const'
import { cookies } from 'next/headers'

export default async function ManagerDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookiePrefix = process.env.COOKIE_PREFIX || ''

  const accessTokenValue = cookieStore.get(cookiePrefix + 'access-token')?.value
  console.log({ accessTokenValue })
  if (!accessTokenValue) {
    console.log('Access token not found')
    await adminRefresh()
  }

  return (
    <>
      <AdminHeader links={managerLinks} isLogged={!!accessTokenValue} />
      <div className="lg:pb-20">{children}</div>
      <AppTabs tabs={managerLinks} />
    </>
  )
}
