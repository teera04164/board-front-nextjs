import { useEffect, useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { useInfinitePostsQuery } from './query/usePosts'
import { ISearchState } from './usePostManagement'
import { PostDetail } from '@/types/response/post.type'
import { useInView } from 'react-intersection-observer'

export const useLoadPostInfinite = (searchState: ISearchState) => {
  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: '300px 0px',
  })
  const debouncedSearchText = useDebounce(searchState.searchText, 500)
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfinitePostsQuery({
    limit: 5,
    search: debouncedSearchText,
    communityId: searchState.communityId,
  })

  const allPosts = useMemo(() => {
    return (
      data?.pages.reduce<PostDetail[]>((acc, page) => {
        return [...acc, ...(page.posts || [])]
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
    allPosts,
    isLoadingPosts,
    isFetchingNextPage,
    loadMoreRef,
    inView,
    error,
    isError,
    hasNextPage,
  }
}
