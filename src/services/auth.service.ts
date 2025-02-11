import { AuthResponse } from '@/types/response/auth.type';
import { axiosInstance } from './axios';
import { UserProfileResponse } from '@/types/response/user.type';

export const authService = {
  async login(username: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', {
      username,
    });
    return response.data
  },

  async getProfile(): Promise<UserProfileResponse> {
    const response = await axiosInstance.get<UserProfileResponse>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },
};