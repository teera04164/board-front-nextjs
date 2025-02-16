import { axiosInstance } from './instance'
import { setupAuthInterceptor } from './interceptors/auth.interceptor'

setupAuthInterceptor(axiosInstance)

export { axiosInstance }
