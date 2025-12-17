import { Link } from 'react-router'
import { Input, PasswordInput, Button, Alert, Checkbox } from '@/shared/components/ui'
import { useModel, useController } from '../hooks'
import { useT } from '@/contexts/TranslateContext'

const LoginForm = () => {
  const t = useT()
  const model = useModel()
  const controller = useController(model)
  
  const { formData, isLoading, error } = model
  const { handleEmailChange, handlePasswordChange, handleRememberChange, handleSubmit } = controller

  return (
    <>
      {error && (
        <Alert variant='destructive' description={error} className='mb-5' />
      )}
      <form className='flex flex-col w-full gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-sm text-white'>{t('auth.login.emailLabel')}</label>
          <Input
            type='email'
            placeholder={t('auth.login.emailPlaceholder')}
            value={formData.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-sm text-white'>{t('auth.login.passwordLabel')}</label>
          <PasswordInput
            placeholder={t('auth.login.passwordPlaceholder')}
            value={formData.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className='flex justify-between mb-3'>
          <Checkbox
            label={t('auth.login.rememberMe')}
            checked={formData.isRememberLogin}
            onCheckedChange={handleRememberChange}
          />
          <Link to='/quen-mat-khau' className='text-white font-normal text-sm leading-5 tracking-normal underline'>
            {t('auth.login.forgotPassword')}
          </Link>
        </div>
        <Button
          disabled={!formData.email || !formData.password || isLoading}
          size='lg'
          type='submit'
        >
          {isLoading && (
            <div className='animate-spin size-4 rounded-full border-2 border-current border-t-transparent' />
          )}
          {isLoading ? t('auth.login.submitting') : t('auth.login.submitButton')}
        </Button>
      </form>
    </>
  )
}

export default LoginForm
