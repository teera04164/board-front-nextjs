import { ModalType } from '@/constants/modal'

export interface SearchState {
  searchText: string
  communityId: string
  isSearching: boolean
}

export interface ModalState {
  type: ModalType | null
  postId: string
}
