import { axiosInstance } from './axios';
import { PostDetail, PostsResponse } from '@/types/response/post.type';
import { PostRequest, PostSearchRequest, UpdatePostRequest } from '@/types/request/post.type';

export const postService = {
  async getAllPost(params: PostSearchRequest): Promise<PostsResponse> {
    const response = await axiosInstance.get<PostsResponse>('/posts', {
      params: {
        limit: params.limit,
        page: params.page,
        search: params.search,
        communityId: params.communityId,
      },
    });
    return response.data;
  },

  async getAllPostMe(params: PostSearchRequest): Promise<PostsResponse> {
    const response = await axiosInstance.get<PostsResponse>('/posts/me', {
      params: {
        limit: params.limit,
        page: params.page,
        search: params.search,
        communityId: params.communityId,
      },
    });
    return response.data;
  },

  async createPost(requestBody: PostRequest): Promise<PostDetail> {
    const response = await axiosInstance.post<PostDetail>('/posts', requestBody);
    return response.data;
  },

  async getPostById(id: string): Promise<PostDetail> {
    const response = await axiosInstance.get<PostDetail>(`/posts/${id}`);
    return response.data;
  },

  async updatePost(requestBody: UpdatePostRequest): Promise<PostDetail> {
    const response = await axiosInstance.put<PostDetail>(`/posts/${requestBody.id}`, requestBody);
    return response.data;
  },

  async deletePost(id: string): Promise<PostDetail> {
    const response = await axiosInstance.delete<PostDetail>(`/posts/${id}`);
    return response.data;
  },
};
