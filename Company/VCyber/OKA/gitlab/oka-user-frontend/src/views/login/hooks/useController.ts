import { t } from '@/services/translate'
import type { LoginModel } from './useModel'

export interface LoginController {
  handleEmailChange: (email: string) => void
  handlePasswordChange: (password: string) => void
  handleRememberChange: (checked: boolean) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export function useController(model: LoginModel): LoginController {
  const { setFormData, setIsLoading, setError, formData } = model

  const handleEmailChange = (email: string) => {
    setFormData({ email })
    setError(null)
  }

  const handlePasswordChange = (password: string) => {
    setFormData({ password })
    setError(null)
  }

  const handleRememberChange = (checked: boolean) => {
    setFormData({ isRememberLogin: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email) {
      setError(t('auth.errors.emailRequired'))
      return
    }

    const emailRegex = /.+@.+/
    if (!emailRegex.test(formData.email)) {
      setError(t('auth.errors.emailInvalid'))
      return
    }

    if (!formData.password) {
      setError(t('auth.errors.passwordRequired'))
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // TODO: Call login API
      console.log('Login with:', formData)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // On success, redirect to home or first available route
      window.location.href = '/thu-muc'
    } catch (err) {
      setError(t('auth.errors.invalidCredentials'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleEmailChange,
    handlePasswordChange,
    handleRememberChange,
    handleSubmit
  }
}
