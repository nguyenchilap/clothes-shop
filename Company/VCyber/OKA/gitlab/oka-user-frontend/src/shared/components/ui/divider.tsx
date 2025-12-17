import * as React from 'react'
import { cn } from '@/shared/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-border shrink-0',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-auto w-px self-stretch',
          className
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

export { Divider }

