import * as React from 'react'
import { Input, type InputProps } from './input'

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const ToggleIcon = ({ visible, setVisible }: { visible: boolean; setVisible: (visible: boolean) => void }) => {
  return (
    <span className='text-white [&_svg]:size-5 cursor-pointer' onClick={() => setVisible(!visible)}>
      {visible ? <EyeIcon /> : <EyeOffIcon />}
    </span>
  )
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = React.useState(false)
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      ref={ref}
      icon={<ToggleIcon visible={visible} setVisible={setVisible} />}
      iconPosition='end'
    />
  )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }

