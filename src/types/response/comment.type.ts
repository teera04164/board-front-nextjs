import { Pagination } from './pagination.type'
import { User } from './user.type'

export interface Comment {
  id: string
  content: string
  userId: string
  postId: string
  createdAt: string
  updatedAt: string
}

export interface CommentWithUser extends Comment {
  user: User
}

export interface CommentsResponse {
  comments: CommentWithUser[]
  pagination: Pagination
}

export interface AddCommentResponse {
  content: string
  createdAt: string
  id: string
  postId: string
  updatedAt: string
  userId: string
}
