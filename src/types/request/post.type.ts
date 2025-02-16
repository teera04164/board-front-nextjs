import { PaginationRequest } from '../api.types'
export interface PostSearchRequest extends PaginationRequest {
  search: string
  communityId: string
}

export interface PostRequest {
  title: string
  content: string
  communityId: string
}

export interface UpdatePostRequest extends PostRequest {
  id: string
}
