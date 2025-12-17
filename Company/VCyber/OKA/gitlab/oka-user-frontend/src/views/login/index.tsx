import { AuthLayout } from '@/shared/layouts'
import LoginForm from './components/LoginForm'

export default function LoginView() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
