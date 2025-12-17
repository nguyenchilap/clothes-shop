// Application constants - these are NOT translatable text
// For translatable text, use the translate service

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  USERS: {
    PROFILE: '/users/profile',
    LIST: '/users'
  },
  FILES: {
    LIST: '/files',
    UPLOAD: '/files/upload',
    DOWNLOAD: '/files/download',
    DELETE: '/files'
  },
  FOLDERS: {
    LIST: '/folders',
    CREATE: '/folders',
    DELETE: '/folders'
  }
} as const

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'app-theme',
  LANGUAGE: 'app-language'
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
} as const

// Re-export commonly used translation keys for convenience
export { t } from '@/services/translate'

// Helper to get app name from translations
export const APP_NAME = 'app.name' as const
export const PAGE_TITLES = {
  HOME: 'pages.home.title',
  LOGIN: 'auth.login.title',
  FOLDER: 'pages.folder.title',
  TRASH: 'pages.trash.title',
  NOT_FOUND: 'pages.notFound.title',
  ERROR: 'pages.error.title'
} as const
