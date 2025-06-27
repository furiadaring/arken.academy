import { UsersPagination } from '@/components/admin/users-pagination'
import { UsersTable } from '@/components/admin/users-table'
import { api } from '@/lib/api'
import { getUsersForManager } from '@/lib/helpers'
import { TSearchparamsPaginationData, TUsersPaginationData } from '@/types'
import { cookies } from 'next/headers'

export default async function MyClientsPage({ searchParams }: TSearchparamsPaginationData) {
  const cookieStore = await cookies()
  const cookiePrefix = process.env.COOKIE_PREFIX || ''
  const office = cookieStore.get(cookiePrefix + 'office')?.value
  const allCookies = cookieStore.getAll()
  const cookieHeader = allCookies
    .map((cookie) => (cookie.name.includes('token') ? `${cookie.name}=${cookie.value}` : ''))
    .join('; ')
  const { page, pageSize } = await searchParams

  const response = await api.get('/users', {
    params: { office, page: Number(page) || 1, pageSize: Number(pageSize) || 20 },
    headers: {
      Cookie: cookieHeader,
      'X-Client-Source': 'next-admin-panel',
    },
  })
  const { users, pagination } = response.data as TUsersPaginationData
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize

  const processedUsers = getUsersForManager(users, startIndex)

  return (
    <section className="mx-auto my-5 flex flex-col items-center justify-center gap-6 px-3 pt-5">
      <UsersTable users={processedUsers} />
      <UsersPagination pagination={pagination} />
    </section>
  )
}
