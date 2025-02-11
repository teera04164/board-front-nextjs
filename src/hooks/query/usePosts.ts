import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { QUERY_KEYS } from '@/constants/queryKey';
import { PostRequest, PostSearchRequest, UpdatePostRequest } from '@/types/request/post.type';

export const usePostsQuery = (params: PostSearchRequest) => {
    return useQuery({
        queryKey: [QUERY_KEYS.POSTS, params],
        queryFn: () => postService.getAllPost(params),
    });
};

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (requestBody: PostRequest) => postService.createPost(requestBody),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
        },
    });
};

export const usePostQuery = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST, id],
        queryFn: () => postService.getPostById(id),
        enabled: !!id,
    });
};

export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (requestBody: UpdatePostRequest) => postService.updatePost(requestBody),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
        },
    });
};

export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => postService.deletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
        },
    });
};
