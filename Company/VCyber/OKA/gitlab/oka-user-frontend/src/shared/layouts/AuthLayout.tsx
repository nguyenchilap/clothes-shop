import logo from '@/assets/imgs/logo-dark.svg'
import backgroundImage from '@/assets/imgs/background.png'
import { Divider } from '@/shared/components/ui'
import { useT } from '@/contexts/TranslateContext'

interface AuthLayoutProps {
  children: React.ReactNode
}

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useT()
  
  return (
    <>
      <img className='mb-6' src={logo} height={48} alt='Logo' />
      <h1 className='text-2xl font-semibold text-white'>{t('auth.login.title')}</h1>
      <h3 className='text-center mt-3 mb-8 text-white font-normal text-base leading-6 tracking-normal'>
        {t('auth.login.subtitle')} <br />
        {t('auth.login.description')}
      </h3>
      {children}
      <div className='flex text-white gap-4 mt-8 text-sm'>
        <span className='cursor-pointer hover:underline'>{t('footer.termsOfService')}</span>
        <Divider orientation='vertical' className='bg-white h-5' />
        <span className='cursor-pointer hover:underline'>{t('footer.privacyPolicy')}</span>
      </div>
    </>
  )
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useT()
  
  return (
    <main
      className='flex-1 min-h-screen h-full flex justify-center relative'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className='flex flex-col mt-[96px] mb-8 items-center w-[480px] px-4'>
        <FormLayout>{children}</FormLayout>
      </div>
      <div className='absolute bottom-4 right-4 text-white text-sm opacity-70'>
        {t('app.version')}
      </div>
    </main>
  )
}
