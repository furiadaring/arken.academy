import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { AdminsTable } from './admins-table'

export default async function AdminDashboardRolesPage() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  const cookieHeader = allCookies
    .map((cookie) => (cookie.name.includes('token') ? `${cookie.name}=${cookie.value}` : ''))
    .join('; ')
  const [admins, offices] = await Promise.all([
    api.get('/admins', {
      headers: {
        'X-Client-Source': 'next-admin-panel',
        Cookie: cookieHeader,
      },
    }),
    api.get('/offices', {
      headers: {
        'X-Client-Source': 'next-admin-panel',
        Cookie: cookieHeader,
      },
    }),
  ])

  return (
    <section className="mx-auto my-5 flex flex-col items-center justify-center gap-6 px-3 pt-5">
      <AdminsTable admins={admins.data} offices={offices.data} />
    </section>
  )
}
