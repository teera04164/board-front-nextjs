import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '@/services/post.service'
import { QUERY_KEYS } from '@/constants/queryKey'
import { PostRequest, PostSearchRequest, UpdatePostRequest } from '@/types/request/post.type'
import type { QueryClient } from '@tanstack/react-query'

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
