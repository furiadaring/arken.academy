import { adminRefresh } from '@/actions/admin-refresh'
import { AdminHeader } from '@/components/layout/admin-header'
import { AppTabs } from '@/components/shared/app-tabs'
import { superLinks } from '@/lib/const'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SuperDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookiePrefix = process.env.COOKIE_PREFIX || ''

  const accessTokenValue = cookieStore.get(cookiePrefix + 'access-token')?.value
  const isSuperAdmin = cookieStore.get(cookiePrefix + 'role')?.value === 'admin'
  if (!isSuperAdmin) {
    redirect('/f2186af6dc6143439b65adc/manager/all-clients')
  }
  if (!accessTokenValue) {
    await adminRefresh()
  }

  return (
    <>
      <AdminHeader links={superLinks} isLogged={!!accessTokenValue} />
      <div className="pb-20">{children}</div>
      <AppTabs tabs={superLinks} />
    </>
  )
}
