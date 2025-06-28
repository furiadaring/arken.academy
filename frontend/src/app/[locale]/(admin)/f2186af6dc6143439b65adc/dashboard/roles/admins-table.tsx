'use client'

import { AppTable } from '@/components/admin/app-table'
import { api } from '@/lib/api'
import { adminColumns } from '@/lib/table-columns'
import { TAdmin, TOffice } from '@/types'
import { FC, useOptimistic, useState, useTransition } from 'react'
import { toast } from 'sonner'

type AdminsTableProps = {
  admins: Array<TAdmin>
  offices: Array<TOffice>
}

export const AdminsTable: FC<AdminsTableProps> = ({ admins, offices }) => {
  const [isPending, startTransition] = useTransition()

  const initialData = admins.map((admin, index) => ({
    ...admin,
    number: String(index + 1),
  }))

  const [tableData, setTableData] = useState(initialData)

  // Tracking which row is being edited
  const [editingId, setEditingId] = useState<string | null>(null)

  type TOptimisticAction =
    | { type: 'delete'; id: string }
    | { type: 'edit'; id: string; data: TAdmin & { number: string } }
    | { type: 'add'; data: TAdmin & { number: string } }

  const [optimisticData, addOptimisticUpdate] = useOptimistic<Array<TAdmin & { number: string }>, TOptimisticAction>(
    tableData,
    (state, action) => {
      if (action.type === 'delete') {
        return state.filter((admin) => admin.id !== action.id)
      } else if (action.type === 'edit') {
        return state.map((admin) => (admin.id === action.id ? { ...admin, ...action.data } : admin))
      } else if (action.type === 'add') {
        return [...state, action.data]
      }
      return state
    },
  )

  // Check if data has changed
  const hasDataChanged = (original: TAdmin, edited: TAdmin): boolean => {
    // Fields to compare (excluding fields like 'number' that we don't send to the server)
    const fieldsToCompare = ['username', 'password', 'officeName', 'isActive', 'isSuperAdmin']

    return fieldsToCompare.some((field) => {
      if (field === 'password' && edited[field as keyof TAdmin] === '') {
        // Empty password means no change
        return false
      }
      return original[field as keyof TAdmin] !== edited[field as keyof TAdmin]
    })
  }

  const handleEditAdmin = async (id: string, admin: TAdmin & { number: string }) => {
    const previousState = tableData
    const originalAdmin = tableData.find((item) => item.id === id)
    if (originalAdmin && !hasDataChanged(originalAdmin, admin)) {
      console.log('No changes detected, skipping server update')
      setEditingId(null)
      return
    }

    setEditingId(null)

    startTransition(async () => {
      try {
        addOptimisticUpdate({ type: 'edit', id, data: admin })
        setTableData((current) => current.map((item) => (item.id === id ? { ...item, ...admin } : item)))
        const res = await api.post(`/admins`, {
          id,
          username: admin.username,
          password: admin.password,
          officeName: admin.officeName,
        })

        const result = res.data

        if (!result) {
          throw new Error('Error updating admin')
        }
        toast.success(result.message || 'Admin successfully updated')
      } catch (error) {
        console.error({ error })
        setTableData(previousState)
        setEditingId(id) // Return to editing mode
        toast.error(`Error updating admin: ${error instanceof Error ? error.message : error}`)
      }
    })
  }

  // Add a new empty admin row
  const handleAddAdmin = async (id?: string, newRow?: TAdmin) => {
    if (id && newRow) {
      // Close current editing if any
      if (editingId) {
        setEditingId(null)
      }

      // Create a new admin with default values
      const newAdmin = {
        ...newRow,
        officeName: offices[0].name,
        number: String(tableData.length + 1),
        isActive: true,
        isSuperAdmin: false,
        createdAt: new Date().toISOString(),
        username: '',
        password: '',
        id,
      }

      // Update both states (base and optimistic)
      setTableData((current) => [...current, newAdmin])

      // Set the row to editing mode immediately
      setEditingId(id)
    }
  }

  // Delete an admin
  const handleDeleteAdmin = async (id: string) => {
    const previousState = tableData

    startTransition(async () => {
      try {
        // If deleting the row being edited, clear editing state
        if (editingId === id) {
          setEditingId(null)
        }

        addOptimisticUpdate({ type: 'delete', id })
        setTableData((current) => current.filter((admin) => admin.id !== id))
        const res = await api.delete(`/admins/${id}`)
        const result = res.data

        if (!result) {
          throw new Error('Error deleting admin')
        }

        toast.success(result.message)
      } catch (error) {
        console.error({ error })
        setTableData(previousState)
        toast.error(`Error deleting admin: ${error instanceof Error ? error.message : error}`)
      }
    })
  }

  return (
    <>
      {isPending && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/5">
          <div className="animate-pulse rounded-lg bg-black p-4 text-white shadow-lg">Обновление данных...</div>
        </div>
      )}
      <AppTable
        columns={adminColumns}
        data={optimisticData}
        onEdit={(id, row) => {
          if (editingId === id) {
            // Save edited row
            handleEditAdmin(id, row as TAdmin & { number: string })
          } else {
            // Start editing this row
            setEditingId(id)
          }
        }}
        onAdd={handleAddAdmin}
        onDelete={handleDeleteAdmin}
        actionLabel="Edit"
        className="overflow-x-auto rounded-lg shadow-lg"
        offices={offices}
        editingRows={editingId ? [editingId] : []}
      />
    </>
  )
}
