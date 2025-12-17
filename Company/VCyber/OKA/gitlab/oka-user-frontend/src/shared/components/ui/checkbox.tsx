import * as React from 'react'
import { cn } from '@/shared/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  onCheckedChange?: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
        <div className='relative'>
          <input
            ref={ref}
            type='checkbox'
            checked={checked}
            onChange={handleChange}
            className='sr-only peer'
            {...props}
          />
          <div className={cn(
            'size-5 rounded border-2 border-border flex items-center justify-center transition-colors',
            'peer-checked:bg-primary peer-checked:border-primary',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring'
          )}>
            {checked && <CheckIcon />}
          </div>
        </div>
        {label && <span className='text-sm text-foreground'>{label}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }

