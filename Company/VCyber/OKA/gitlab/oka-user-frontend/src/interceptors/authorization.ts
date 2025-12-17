import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { STORAGE_KEYS } from '@/shared/constants'

export function setupAuthorizationInterceptor(axiosInstance: AxiosInstance) {
  // Request interceptor - add authorization header
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor - handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // If 401 and not already retried, try to refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // TODO: Implement token refresh logic
          // const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
          // const response = await refreshTokenAPI(refreshToken)
          // localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken)
          // return axiosInstance(originalRequest)
        } catch {
          // Refresh failed, logout user
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          window.location.href = '/dang-nhap'
        }
      }

      return Promise.reject(error)
    }
  )
}

