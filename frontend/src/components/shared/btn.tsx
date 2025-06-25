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
        className={`h-5 w-5 transition-all duration-300 ease-in-out group-hover:rotate-12 lg:h-7 lg:w-7 ${size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'}`}
      >
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2428_1470)">
            <path
              d="M1.62545 8.91357L17.7793 8.91357"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.70238 0.836879L17.7793 8.9138L9.70237 16.9907"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2428_1470">
              <rect width="18" height="18" fill="white" transform="translate(18.5 18) rotate(-180)" />
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
      <span className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:rotate-12">
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2428_1470)">
            <path
              d="M1.62545 8.91357L17.7793 8.91357"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.70238 0.836879L17.7793 8.9138L9.70237 16.9907"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2428_1470">
              <rect width="18" height="18" fill="white" transform="translate(18.5 18) rotate(-180)" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </Link>
  )
}
