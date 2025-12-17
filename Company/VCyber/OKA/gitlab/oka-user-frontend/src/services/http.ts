import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { setupAuthorizationInterceptor } from '@/interceptors/authorization'
import { setupNetworkErrorInterceptor } from '@/interceptors/networkError'

const API_BASE_URL = __API_BASE_URL__

// Create axios instance
export const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Setup interceptors
setupAuthorizationInterceptor(http)
setupNetworkErrorInterceptor(http)

// Helper functions for common HTTP methods
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.get<T>(url, config)
  return response.data
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.post<T>(url, data, config)
  return response.data
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.put<T>(url, data, config)
  return response.data
}

export async function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.patch<T>(url, data, config)
  return response.data
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await http.delete<T>(url, config)
  return response.data
}

export default http

