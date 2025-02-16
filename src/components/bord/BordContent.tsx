import React from 'react'
import { SearchState } from '@/stores/types'
import Header from './Header'

interface BordContentProps {
  searchState: SearchState
  setSearchText: (text: string) => void
  setSearching: (val: boolean) => void
  onCommunityChange: (communityId: string) => void
  onOpenCreateModal: () => void
  children?: React.ReactNode
}

export const BordContent: React.FC<BordContentProps> = ({
  searchState,
  setSearchText,
  setSearching,
  onCommunityChange,
  onOpenCreateModal,
  children,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-20">
      <div className="w-full max-w-[798px]">
        <Header
          searchState={searchState}
          setSearchText={setSearchText}
          setSearching={setSearching}
          onCommunityChange={onCommunityChange}
          onCreatePost={onOpenCreateModal}
        />
        {children}
      </div>
    </div>
  )
}
