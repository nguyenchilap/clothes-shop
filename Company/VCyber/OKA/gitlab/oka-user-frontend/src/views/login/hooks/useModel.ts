import { useState } from 'react'

export interface LoginFormData {
  email: string
  password: string
  isRememberLogin: boolean
}

export interface LoginModel {
  formData: LoginFormData
  isLoading: boolean
  error: string | null
  setFormData: (data: Partial<LoginFormData>) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetForm: () => void
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  isRememberLogin: false
}

export function useModel(): LoginModel {
  const [formData, setFormDataState] = useState<LoginFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setFormData = (data: Partial<LoginFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormDataState(initialFormData)
    setError(null)
  }

  return {
    formData,
    isLoading,
    error,
    setFormData,
    setIsLoading,
    setError,
    resetForm
  }
}
