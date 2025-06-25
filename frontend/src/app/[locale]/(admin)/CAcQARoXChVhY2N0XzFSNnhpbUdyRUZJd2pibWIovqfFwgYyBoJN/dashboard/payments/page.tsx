import { UsersPagination } from '@/components/admin/users-pagination'
import { UsersTable } from '@/components/admin/users-table'
import { api } from '@/lib/api'
import { TSearchparamsPaginationData, TUser, TUsersPaginationData } from '@/types'
import { cookies } from 'next/headers'

export default async function AdminDashboardUsersPage({ searchParams }: TSearchparamsPaginationData) {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  const cookieHeader = allCookies
    .map((cookie) => (cookie.name.includes('token') ? `${cookie.name}=${cookie.value}` : ''))
    .join('; ')
  const { page, pageSize } = await searchParams

  const response = await api.get('/users?paid=true', {
    params: {
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 20,
    },
    headers: {
      'X-Client-Source': 'next-admin-panel',
      Cookie: cookieHeader,
    },
  })
  const { users, pagination } = response.data as TUsersPaginationData
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const processedUsers = users.map((user: TUser, index: number) => ({
    ...user,
    number: (startIndex + index + 1).toString(),
  }))

  return (
    <section className="mx-auto my-5 flex flex-col items-center justify-center gap-6 px-3 pt-5">
      <UsersTable users={processedUsers} />
      <UsersPagination pagination={pagination} />
    </section>
  )
}
