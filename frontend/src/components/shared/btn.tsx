import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { ReactNode } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[50px] text-xs font-medium transition-colors group relative mr-5 flex w-full items-center justify-center gap-2.5 px-6 py-3',
  {
    variants: {
      variant: {
        primary: 'gradient-border text-white ',
        secondary: 'border-2 border-solid border-white/30 bg-transparent text-white',
      },
      size: {
        sm: 'py-2 pr-3 pl-6 text-base',
        lg: 'py-2 pr-3 pl-6 text-lg',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      disabled: false,
    },
  },
)

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
      className={cn(buttonVariants({ variant, size, disabled }), className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className="-ml-5 truncate">{children}</span>
      <span
        className={`h-5 w-5 pt-0.5 transition-all duration-300 ease-in-out group-hover:rotate-12 lg:h-7 lg:w-7 ${size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'}`}
      >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="24" height="24" rx="12" fill="white" />
          <g clipPath="url(#clip0_2669_3544)">
            <path
              d="M7.2503 11.9424L18.0195 11.9424"
              stroke="#FB8138"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6349 6.55792L18.0195 11.9425L12.6349 17.3271"
              stroke="#FB8138"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2669_3544">
              <rect width="12" height="12" fill="white" transform="translate(18.5 18) rotate(-180)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </button>
  )
}

export const LinkButton = ({ children, link, variant = 'primary', className, size = 'sm' }: TLinkButtonProps) => {
  return (
    <Link href={link} className={cn(buttonVariants({ variant, size }), '', className)}>
      <span className="-ml-5 truncate">{children}</span>
      <span
        className={`h-5 w-5 pt-0.5 transition-all duration-300 ease-in-out group-hover:rotate-12 lg:h-7 lg:w-7 ${size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'}`}
      >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="24" height="24" rx="12" fill="white" />
          <g clipPath="url(#clip0_2669_3544)">
            <path
              d="M7.2503 11.9424L18.0195 11.9424"
              stroke="#FB8138"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6349 6.55792L18.0195 11.9425L12.6349 17.3271"
              stroke="#FB8138"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2669_3544">
              <rect width="12" height="12" fill="white" transform="translate(18.5 18) rotate(-180)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </Link>
  )
}
