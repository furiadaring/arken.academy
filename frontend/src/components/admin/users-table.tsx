'use client'

import { bindUser } from '@/actions/bind-user'
import { AppTable } from '@/components/admin/app-table'
import { userColumns } from '@/lib/table-columns'
import { TUser } from '@/types'
import { FC } from 'react'
import { toast } from 'sonner'

type UsersTableProps = {
  users: Array<TUser & { number: string }>
  office?: string | undefined
}

export const UsersTable: FC<UsersTableProps> = ({ users, office }) => {
  const handleEditUser = async (id: string, user: TUser & { number: string }) => {
    try {
      const data = await bindUser(id, office ?? '')
      console.log({ data })

      if (data) {
        toast.success(`User ${user.name} with id ${id} added to office ${office}`)
      }
    } catch (error) {
      console.error({ error })
      toast.error(`Error adding user ${user.name} with id ${id} to office ${office}`)
    }
  }

  return (
    <AppTable
      columns={userColumns}
      data={users}
      className="overflow-x-auto rounded-lg shadow-lg"
      onEdit={office ? handleEditUser : undefined}
      actionLabel={office ? 'Закрепить' : undefined}
    />
  )
}
