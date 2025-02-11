import { AxiosInstance } from 'axios';
import *  as StorageUtil from '@/utils/storage';

export const setupAuthInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config) => {
            const token = StorageUtil.getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};