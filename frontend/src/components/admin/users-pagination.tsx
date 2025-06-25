'use client'

import { Pagination } from '@/components/ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

type TPaginationData = {
  total: number
  pageSize: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

type TUsersPaginationProps = {
  pagination: TPaginationData
}

export const UsersPagination: FC<TUsersPaginationProps> = ({ pagination }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    
    // Preserve pageSize if it exists
    if (searchParams.has('pageSize')) {
      params.set('pageSize', searchParams.get('pageSize')!)
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={handlePageChange}
      hasNextPage={pagination.hasNextPage}
      hasPreviousPage={pagination.hasPreviousPage}
    />
  )
}
