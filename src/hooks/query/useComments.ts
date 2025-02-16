import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKey';
import { commentService } from '@/services/comment.service';
import { CommentSearchRequest, createCommentRequest } from '@/types/request/comment.type';

export const useCommentsQuery = (params: CommentSearchRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, params.postId],
    queryFn: () => commentService.getAllComments(params),
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestData: createCommentRequest) => commentService.createComment(requestData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST, data.postId],
      });
    },
  });
};
