import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { postService } from '@/services/post.service'
import { QUERY_KEYS } from '@/constants/queryKey'
import { PostRequest, PostSearchRequest, UpdatePostRequest } from '@/types/request/post.type'
import type { QueryClient } from '@tanstack/react-query'
import { PostsResponse } from '@/types/response/post.type'

const invalidatePostsQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] })
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS_ME] })
}

export const usePostsQuery = (params: PostSearchRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => postService.getAllPost(params),
  })
}

export const useInfinitePostsQuery = ({ limit, search, communityId }: PostSearchRequest) => {
  return useInfiniteQuery<PostsResponse>({
    queryKey: [QUERY_KEYS.POSTS, { search, communityId }],
    queryFn: ({ pageParam = 1 }) =>
      postService.getAllPost({
        page: Number(pageParam),
        limit,
        search: search as string,
        communityId: communityId as string,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.pagination.totalPages
      const nextPage = allPages.length + 1
      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
  })
}

export const usePostsMeQuery = (params: PostSearchRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS_ME, params],
    queryFn: () => postService.getAllPostMe(params),
  })
}

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestBody: PostRequest) => postService.createPost(requestBody),
    onSuccess: () => {
      invalidatePostsQueries(queryClient)
    },
  })
}

export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST, id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestBody: UpdatePostRequest) => postService.updatePost(requestBody),
    onSuccess: () => {
      invalidatePostsQueries(queryClient)
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: () => {
      invalidatePostsQueries(queryClient)
    },
  })
}
