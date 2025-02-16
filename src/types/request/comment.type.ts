import { PaginationRequest } from '../api.types'

export interface createCommentRequest {
  postId: string
  content: string
}

export interface CommentSearchRequest extends PaginationRequest {
  postId: string
}
