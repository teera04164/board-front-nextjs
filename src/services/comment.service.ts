
import { axiosInstance } from './axios';
import { AddCommentResponse, CommentsResponse } from '@/types/response/comment.type';
import { createCommentRequest } from '@/types/request/comment.type';
import { PostDetail } from '@/types/response/post.type';

export const commentService = {
  async getAllComments(postId: string): Promise<CommentsResponse> {
    const response = await axiosInstance.get<CommentsResponse>(`/posts/${postId}/comments`);
    return response.data;
  },

  async createComment(requestData: createCommentRequest): Promise<AddCommentResponse> {
    const response = await axiosInstance.post<AddCommentResponse>(`/posts/${requestData.postId}/comments`, {
      content: requestData.content,
    });
    return response.data;
  },

  async deleteComment(postId: string, commentId: string): Promise<PostDetail> {
    const response = await axiosInstance.delete<PostDetail>(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  },
};