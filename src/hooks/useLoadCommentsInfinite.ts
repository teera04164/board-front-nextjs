import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteCommentsQuery } from './query/useComments'
import { CommentWithUser } from '@/types/response/comment.type'

export const useLoadCommentsInfinite = (postId: string) => {
  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: '300px 0px',
  })
  const {
    data,
    fetchNextPage,
    error,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfiniteCommentsQuery({
    limit: 5,
    postId,
  })

  const comments = useMemo(() => {
    return (
      data?.pages.reduce<CommentWithUser[]>((acc, page) => {
        return [...acc, ...(page.comments || [])]
      }, []) || []
    )
  }, [data])

  useEffect(() => {
    const shouldFetchNext = inView && hasNextPage && !isFetchingNextPage
    if (shouldFetchNext) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    comments,
    isLoadingPosts,
    isFetchingNextPage,
    loadMoreRef,
    inView,
    error,
    isError,
  }
}
