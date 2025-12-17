import * as React from 'react'
import { cn } from '@/shared/utils'

export type InputProps = {
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
} & React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconPosition = 'start', icon, ...props }, ref) => {
    const clonedIcon =
      icon &&
      React.cloneElement(icon as React.ReactSVGElement, {
        width: 20,
        height: 20,
        color: '#757575'
      })

    return (
      <div
        className={cn(
          'inline-flex gap-2 items-center rounded-md border border-input bg-background-secondary transition-[alt,box-shadow]',
          'h-[44px] w-full min-w-0 px-4 py-3 text-base',
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
          { 'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50': props.disabled },
          className
        )}
      >
        {iconPosition === 'start' && clonedIcon}
        <input
          ref={ref}
          type={type}
          data-slot='input'
          className={cn(
            'flex-1 bg-transparent outline-none text-foreground',
            'placeholder:text-disabled-foreground',
            'file:hidden'
          )}
          {...props}
        />
        {iconPosition === 'end' && clonedIcon}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

