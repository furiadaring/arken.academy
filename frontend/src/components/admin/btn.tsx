import { ReactNode } from 'react'

export const ActionButton = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: {
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'danger' | 'success'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}) => {
  const baseClasses =
    'flex justify-center items-center px-6 py-2 rounded-full text-xs font-light cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
  const variantClasses = {
    primary: 'bg-accent text-white',
    danger: 'bg-red-600 text-white',
    success: 'bg-success text-white',
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`} disabled={disabled} type={type}>
      {children}
    </button>
  )
}
