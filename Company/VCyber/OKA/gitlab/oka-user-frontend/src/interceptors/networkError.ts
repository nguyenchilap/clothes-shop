import type { AxiosInstance } from 'axios'

export interface NetworkErrorHandler {
  onNetworkError?: (error: Error) => void
  onServerError?: (status: number, message: string) => void
}

export function setupNetworkErrorInterceptor(
  axiosInstance: AxiosInstance,
  handlers?: NetworkErrorHandler
) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Network error (no response)
      if (!error.response) {
        console.error('Network Error:', error.message)
        handlers?.onNetworkError?.(error)
        return Promise.reject(new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'))
      }

      // Server error (5xx)
      if (error.response.status >= 500) {
        console.error('Server Error:', error.response.status, error.response.data)
        handlers?.onServerError?.(error.response.status, error.response.data?.message || 'Server error')
        return Promise.reject(new Error('Lỗi server. Vui lòng thử lại sau.'))
      }

      // Client error (4xx) - let individual handlers deal with these
      return Promise.reject(error)
    }
  )
}

