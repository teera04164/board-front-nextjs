import { Community } from '@/types/response/community.type'
import { axiosInstance } from './axios'

export const communityService = {
  async getCommunities(): Promise<Community[]> {
    const response = await axiosInstance.get<Community[]>('/communities')
    return response.data
  },

  async getCommunity(id: string) {
    const response = await axiosInstance.get<Community[]>(`/communities/${id}`)
    return response.data
  },

  async createCommunity(name: string) {
    const response = await axiosInstance.post<Community>('/communities', {
      name,
    })
    return response.data
  },
}
