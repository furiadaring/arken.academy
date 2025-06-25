'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type TPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export const Pagination: FC<TPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = Math.min(maxPagesToShow - 1, totalPages - 1)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2))
      }

      // Add ellipsis if needed at the beginning
      if (startPage > 2) {
        pages.push('...')
      }

      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed at the end
      if (endPage < totalPages - 1) {
        pages.push('...')
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={!hasPreviousPage}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-[36px]"
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="flex items-center justify-center px-2">
              {page}
            </span>
          )
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={!hasNextPage}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
