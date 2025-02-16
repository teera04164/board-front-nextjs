import { useCommentsQuery } from '@/hooks/query/useComments'
import React from 'react'
import { CommentWithUser } from '@/types/response/comment.type'
import AvatarImage from '@/components/common/image/AvatarImage'
import { fromNow } from '@/utils/date'
import { getErrorMessage } from '@/utils/error-handler'

type ICommentList = {
  postId: string
}

export const CommentList: React.FC<ICommentList> = ({ postId }) => {
  const {
    data: commentResp,
    isLoading,
    isError,
    error,
  } = useCommentsQuery({
    postId,
    limit: 99999,
    page: 1,
  })

  if (isLoading) {
    return <LoadingComment />
  }

  if (isError) {
    return <CommentError error={error} />
  }

  if (!commentResp?.comments) {
    return null
  }

  return (
    <div className="mt-8 space-y-6">
      {Array.isArray(commentResp.comments) &&
        commentResp.comments.map((comment: CommentWithUser) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <div className="avatar">
              <div className="h-10 w-10 rounded-full">
                <AvatarImage src={comment.user.image} alt={comment.user.fullName} size={40} />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{comment.user.fullName}</p>
                <p className="text-xs text-gray-300">{fromNow(comment.createdAt)}</p>
              </div>
              <p className="mt-2 text-xs text-gray-500">{comment.content}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

interface ICommentError {
  error: unknown | null
}
const CommentError: React.FC<ICommentError> = ({ error }) => {
  const errorObj = getErrorMessage(error)
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="text-red-500">{errorObj.message ?? ''}</div>
    </div>
  )
}

const LoadingComment: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
    </div>
  )
}
