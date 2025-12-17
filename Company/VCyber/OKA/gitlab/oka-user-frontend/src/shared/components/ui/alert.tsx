import * as React from 'react'
import { cn } from '@/shared/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  description?: string
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', description, children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-muted text-foreground',
      destructive: 'bg-error-light text-error border-error',
      success: 'bg-success-light text-success border-success-border',
      warning: 'bg-warning-light text-warning border-warning-border'
    }

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(
          'relative w-full rounded-lg border p-4',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {description && <p className='text-sm'>{description}</p>}
        {children}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }

