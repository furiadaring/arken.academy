import { ReactNode } from 'react'

type TCardProps = {
  className?: string
  children: ReactNode
}

export const Card = ({ className, children }: TCardProps) => (
  <div
    className={`card-shadow bg-card relative flex h-full w-full flex-col justify-between rounded-[40px] border border-b border-[#0000001A] backface-hidden ${className} overflow-hidden`}
  >
    {children}
  </div>
)
