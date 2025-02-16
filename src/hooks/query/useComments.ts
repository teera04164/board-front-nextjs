import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/queryKey'
import { commentService } from '@/services/comment.service'
import { CommentSearchRequest, createCommentRequest } from '@/types/request/comment.type'
import { CommentsResponse } from '@/types/response/comment.type'

export const useCommentsQuery = (params: CommentSearchRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, params.postId],
    queryFn: () => commentService.getAllComments(params),
  })
}

export const useInfiniteCommentsQuery = ({ limit, postId }: CommentSearchRequest) => {
  return useInfiniteQuery<CommentsResponse>({
    queryKey: [QUERY_KEYS.COMMENTS, { postId }],
    queryFn: ({ pageParam = 1 }) =>
      commentService.getAllComments({
        page: Number(pageParam),
        limit,
        postId,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.pagination.totalPages
      const nextPage = allPages.length + 1
      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
  })
}

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestData: createCommentRequest) => commentService.createComment(requestData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST, data.postId],
      })
    },
  })
}
