import type { ReactNode } from 'react'
import { cn } from '@/shared/utils'
import { t } from '@/services/translate'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md'
}: DialogProps) {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />
      
      {/* Dialog content */}
      <div
        className={cn(
          'relative w-full mx-4 bg-card rounded-xl border border-border shadow-lg',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className='flex items-center justify-between px-6 py-4 border-b border-border'>
            <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
            <button
              onClick={onClose}
              aria-label={t('common.close')}
              className='p-2 rounded-full hover:bg-secondary transition-colors'
            >
              <svg
                className='w-5 h-5 text-muted-foreground'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  )
}

export interface DialogFooterProps {
  children: ReactNode
  className?: string
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn('flex justify-end gap-3 mt-6', className)}>{children}</div>
  )
}

export default Dialog
