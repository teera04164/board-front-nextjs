import { toast } from 'react-toastify';
import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from '@/hooks/query/usePosts';
import { useErrorHandler } from './useErrorHandler';
import { ModalType } from '@/constants/modal';
import { useModalStore } from '@/stores/modalStore';
import { PostRequest, UpdatePostRequest } from '@/types/request/post.type';

export interface ISearchState {
    searchText: string;
    communityId: string;
}

export const usePostManagement = () => {

    const { modalState, closeModal } = useModalStore();
    const { handleError } = useErrorHandler();

    const createPostMutation = useCreatePostMutation();
    const updatePostMutation = useUpdatePostMutation();
    const deletePostMutation = useDeletePostMutation();

    const isLoading =
        createPostMutation.isPending ||
        updatePostMutation.isPending ||
        deletePostMutation.isPending;

    const handleSubmitPost = async (value: PostRequest) => {
        try {
            if (modalState.type === ModalType.UPDATE_POST) {
                await handleUpdatePost(value);
            } else {
                await handleCreatePost(value);
            }
            if (modalState.type) {
                handleSuccess(modalState.type);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleApiError = (error: unknown) => {
        handleError(error, true);
    }

    const handleCreatePost = async (value: PostRequest) => {
        await createPostMutation.mutateAsync(value);
    };

    const handleUpdatePost = async (value: PostRequest) => {
        const updatePostRequest: UpdatePostRequest = {
            ...value,
            id: modalState.postId,
        };
        await updatePostMutation.mutateAsync(updatePostRequest);
    };

    const handleDeletePost = async () => {
        try {
            await deletePostMutation.mutateAsync(modalState.postId);
            handleSuccess(ModalType.DELETE_POST);
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleSuccess = (type: ModalType) => {
        closeModal();
        const messages: { [key in ModalType]: string } = {
            [ModalType.CREATE_POST]: 'Post created successfully',
            [ModalType.UPDATE_POST]: 'Post updated successfully',
            [ModalType.DELETE_POST]: 'Post deleted successfully',
        };
        toast.success(messages[type]);
    };

    return {
        isLoading,
        handleSubmitPost,
        handleDeletePost,
    };
};