import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ModalState } from './types'
import { ModalType } from '@/constants/modal'

interface ModalStore {
  modalState: ModalState

  openCreateModal: () => void
  openEditModal: (postId: string) => void
  openDeleteModal: (postId: string) => void
  closeModal: () => void
}

const initialState: ModalState = {
  type: null,
  postId: '',
}

export const useModalStore = create<ModalStore>()(
  devtools(
    (set) => ({
      modalState: initialState,

      openCreateModal: () => set({ modalState: { type: ModalType.CREATE_POST, postId: '' } }, false, 'openCreateModal'),

      openEditModal: (postId: string) =>
        set({ modalState: { type: ModalType.UPDATE_POST, postId } }, false, 'openEditModal'),

      openDeleteModal: (postId: string) =>
        set({ modalState: { type: ModalType.DELETE_POST, postId } }, false, 'openDeleteModal'),

      closeModal: () => set({ modalState: initialState }, false, 'closeModal'),
    }),
    { name: 'modal-store' },
  ),
)
