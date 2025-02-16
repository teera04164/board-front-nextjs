import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/queryKey'
import { commentService } from '@/services/comment.service'
import { createCommentRequest } from '@/types/request/comment.type'

export const useCommentsQuery = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, postId],
    queryFn: () => commentService.getAllComments(postId),
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
