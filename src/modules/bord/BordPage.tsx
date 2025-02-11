"use client";

import React from 'react';
import { CreatePostModal } from '@/components/modal/CreatePostModal';
import { DeletePostModal } from '@/components/modal/DeletePostModal';
import { usePostManagement } from '@/hooks/usePostManagement';
import { BordContent } from './components/BordContent';
import { ModalType } from '@/constants/modal';
import { useModalStore } from '@/stores/modalStore';
import { useSearchStore } from '@/stores/searchStore';

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
    handleDeletePost,
  } = usePostManagement();


  const isCreateOrEditModalOpen = modalState.type === ModalType.CREATE_POST || modalState.type === ModalType.UPDATE_POST;
  const isDeleteModalOpen = modalState.type === ModalType.DELETE_POST;
  const isEditModal = modalState.type === ModalType.UPDATE_POST;

  return (
    <>
      <BordContent
        searchState={searchState}
        setSearchText={setSearchText}
        setSearching={setSearching}
        onCommunityChange={toggleCommunity}
        onOpenCreateModal={openCreateModal}
        onEditPost={openEditModal}
        onDeletePost={openDeleteModal}
      />

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
  );
};

export default BordPage;