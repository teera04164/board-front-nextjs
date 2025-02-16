import React from 'react'
import { RiLoader2Fill } from 'react-icons/ri'

interface LoadMoreProps {
  isFetchingMore: boolean
  loadMoreRef: (node?: Element | null) => void
  className?: string
}

export const LoadMore: React.FC<LoadMoreProps> = ({ isFetchingMore, loadMoreRef, className = 'h-4' }) => {
  return (
    <div ref={loadMoreRef} className={className}>
      {isFetchingMore && (
        <div className="flex justify-center py-4">
          <RiLoader2Fill className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      )}
    </div>
  )
}
