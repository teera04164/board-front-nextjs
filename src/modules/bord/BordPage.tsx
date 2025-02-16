"use client";

import React from 'react';
import { CreatePostModal } from '@/components/modal/CreatePostModal';
import { usePostManagement } from '@/hooks/usePostManagement';
import { ModalType } from '@/constants/modal';
import { useModalStore } from '@/stores/modalStore';
import { useSearchStore } from '@/stores/searchStore';
import PostList from '@/components/posts/PostList';
import { BordContent } from '@/components/bord/BordContent';
import { useDebounce } from '@/hooks/useDebounce';
import { usePostsQuery } from '@/hooks/query/usePosts';

const BordPage: React.FC = () => {

  const {
    searchState,
    setSearchText,
    toggleCommunity,
    setSearching,
  } = useSearchStore();

  const {
    modalState,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  } = useModalStore();

  const {
    isLoading,
    handleSubmitPost,
  } = usePostManagement();

  const debouncedSearchText = useDebounce(searchState.searchText, 500);
  const { data: postResp } = usePostsQuery({
    page: 1,
    limit: 99999,
    search: debouncedSearchText,
    communityId: searchState.communityId,
  })

  const isCreateModalOpen = modalState.type === ModalType.CREATE_POST
  const isEditModal = modalState.type === ModalType.UPDATE_POST;

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
          posts={postResp?.posts || []}
          onEditPost={openEditModal}
          onDeletePost={openDeleteModal}
        />
      </BordContent>

      {isCreateModalOpen && (
        <CreatePostModal
          isEditMode={isEditModal}
          postId={modalState.postId}
          onSubmit={handleSubmitPost}
          isOpen={isCreateModalOpen}
          onClose={closeModal}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default BordPage;