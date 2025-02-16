import { useCommentsQuery, useInfiniteCommentsQuery } from '@/hooks/query/useComments'
import React, { useEffect, useMemo } from 'react'
import { CommentsResponse, CommentWithUser } from '@/types/response/comment.type'
import AvatarImage from '@/components/common/image/AvatarImage'
import { fromNow } from '@/utils/date'
import { getErrorMessage } from '@/utils/error-handler'
import { useInView } from 'react-intersection-observer'
import { RiLoader2Fill } from 'react-icons/ri'
import { useLoadCommentsInfinite } from '@/hooks/useLoadCommentsInfinite'

type ICommentList = {
  postId: string
}

export const CommentList: React.FC<ICommentList> = ({ postId }) => {
  const {
    comments,
    isFetchingNextPage,
    loadMoreRef,
    isError,
    isLoadingPosts: isLoadingComments,
  } = useLoadCommentsInfinite(postId)

  if (isLoadingComments) {
    return <LoadingComment />
  }

  if (isError) {
    return <CommentError error={isError} />
  }

  return (
    <div className="mt-8 space-y-6">
      {comments.map((comment: CommentWithUser) => (
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
      <div ref={loadMoreRef} className="h-4">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <RiLoader2Fill className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        )}
      </div>
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
