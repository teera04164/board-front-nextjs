import { AuthResponse } from '@/types/api.types';
import { axiosInstance } from './axios';
import { User } from './types/auth';

export const authService = {
  async login(username: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', {
      username,
    });
    return response.data
  },

  async register(data: {
    username: string;
    fullName: string;
    image?: string;
  }): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  },
};