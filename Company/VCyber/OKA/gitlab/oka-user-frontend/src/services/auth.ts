import { post } from './http'
import { API_ENDPOINTS } from '@/shared/constants'
import type { User } from '@/contexts/AuthContext'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data)
  },

  logout: async (): Promise<void> => {
    return post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return post<RefreshTokenResponse>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken })
  }
}

export default authService

