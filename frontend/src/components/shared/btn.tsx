import Link from 'next/link'
import { ReactNode } from 'react'

type TButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'lg'
  onClick?: () => void
  disabled?: boolean
}
type TLinkButtonProps = {
  children: ReactNode
  link: string
  variant?: 'primary' | 'secondary'
  className?: string
  size?: 'sm' | 'lg'
}

export const Button = ({
  children,
  variant = 'primary',
  className,
  onClick,
  disabled,
  type = 'button',
  size = 'sm',
}: TButtonProps) => {
  return (
    <button
      className={`${disabled ? 'cursor-not-allowed opacity-50' : ''}group relative mr-5 flex cursor-pointer items-center justify-center gap-2.5 rounded-[50px] py-2 pr-3 pl-6 text-xs ${variant === 'secondary' ? 'border border-white/26 bg-transparent text-white' : 'bg-accent text-black'} w-full ${className} `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className={`mb-0.5 -ml-5 truncate ${size === 'sm' ? 'text-base' : 'text-lg'}`}>{children}</span>
      <span
        className={`h-5 w-5 transition-all duration-300 ease-in-out group-hover:-rotate-12 lg:h-7 lg:w-7 ${size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'}`}
      >
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <rect
            x="0.242188"
            y="0.848022"
            width="21.7665"
            height="21.7665"
            rx="10.8833"
            fill={variant === 'primary' ? '#1E260F' : '#A3E635'}
          />
          <path
            d="M16.3164 10.4435L16.3116 12.995L12.5765 12.9874L12.9087 16.2557L11.0049 18.1595L9.20118 16.3559L12.5696 12.9874L5.92874 12.9757L5.93288 10.4249L12.7029 10.4373L9.30131 7.03573L11.105 5.23206L16.3164 10.4435Z"
            fill={variant === 'primary' ? '#A3E635' : '#1E260F'}
          />
        </svg>
      </span>
    </button>
  )
}

export const LinkButton = ({ children, link, variant, className }: TLinkButtonProps) => {
  return (
    <Link
      href={link}
      className={`group relative mr-5 flex items-center justify-center gap-2.5 rounded-[50px] px-6 py-3 text-xs ${variant === 'secondary' ? 'border border-white/26 bg-transparent text-white' : 'bg-accent text-black'} w-full ${className} `}
    >
      <span>{children}</span>
      <span className="absolute top-0 right-2 h-5 w-5 translate-y-1/2 transition-all duration-300 ease-in-out group-hover:-rotate-12">
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0.242188"
            y="0.848022"
            width="21.7665"
            height="21.7665"
            rx="10.8833"
            fill={variant === 'primary' ? '#1E260F' : '#A3E635'}
          />
          <path
            d="M16.3164 10.4435L16.3116 12.995L12.5765 12.9874L12.9087 16.2557L11.0049 18.1595L9.20118 16.3559L12.5696 12.9874L5.92874 12.9757L5.93288 10.4249L12.7029 10.4373L9.30131 7.03573L11.105 5.23206L16.3164 10.4435Z"
            fill={variant === 'primary' ? '#A3E635' : '#1E260F'}
          />
        </svg>
      </span>
    </Link>
  )
}
