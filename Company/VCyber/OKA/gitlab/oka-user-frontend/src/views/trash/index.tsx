import { useT } from '@/contexts/TranslateContext'

export default function TrashView() {
  const t = useT()
  
  return (
    <div className='min-h-screen bg-background p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold text-foreground mb-6'>{t('pages.trash.title')}</h1>
        <div className='bg-card rounded-xl border border-border p-6'>
          <p className='text-muted-foreground'>{t('pages.trash.comingSoon')}</p>
        </div>
      </div>
    </div>
  )
}
