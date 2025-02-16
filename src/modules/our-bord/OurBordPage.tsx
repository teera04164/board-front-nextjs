'use client'

import React from 'react'
import { CreatePostModal } from '@/components/modal/CreatePostModal'
import { DeletePostModal } from '@/components/modal/DeletePostModal'
import { usePostManagement } from '@/hooks/usePostManagement'
import { ModalType } from '@/constants/modal'
import { useModalStore } from '@/stores/modalStore'
import { useSearchStore } from '@/stores/searchStore'
import { BordContent } from '@/components/bord/BordContent'
import { useDebounce } from '@/hooks/useDebounce'
import { usePostsMeQuery } from '@/hooks/query/usePosts'
import PostList from '@/components/posts/PostList'

const OurBordPage: React.FC = () => {
  const { searchState, setSearchText, toggleCommunity, setSearching } = useSearchStore()

  const { modalState, openCreateModal, openEditModal, openDeleteModal, closeModal } = useModalStore()

  const { isLoading, handleSubmitPost, handleDeletePost } = usePostManagement()

  const isCreateOrEditModalOpen = modalState.type === ModalType.CREATE_POST || modalState.type === ModalType.UPDATE_POST
  const isDeleteModalOpen = modalState.type === ModalType.DELETE_POST
  const isEditModal = modalState.type === ModalType.UPDATE_POST

  const debouncedSearchText = useDebounce(searchState.searchText, 500)
  const { data: postResp } = usePostsMeQuery({
    page: 1,
    limit: 99999,
    search: debouncedSearchText,
    communityId: searchState.communityId,
  })

  return (
    <>
      <BordContent
        searchState={searchState}
        setSearchText={setSearchText}
        setSearching={setSearching}
        onCommunityChange={toggleCommunity}
        onOpenCreateModal={openCreateModal}
      >
        <PostList
          onEditPost={openEditModal}
          onDeletePost={openDeleteModal}
          posts={postResp?.posts || []}
          isPrivatePage={true}
        />
      </BordContent>

      {isCreateOrEditModalOpen && (
        <CreatePostModal
          isEditMode={isEditModal}
          postId={modalState.postId}
          onSubmit={handleSubmitPost}
          isOpen={isCreateOrEditModalOpen}
          onClose={closeModal}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && (
        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={closeModal}
          onSubmit={handleDeletePost}
          isLoading={isLoading}
          postId={modalState.postId}
        />
      )}
    </>
  )
}

export default OurBordPage
