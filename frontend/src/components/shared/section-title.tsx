import { FC, PropsWithChildren } from 'react'

export const SectionTitle: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <h2 className={`text-gradient-red pt-1 text-center text-2xl leading-[100%] font-medium lg:text-[52px] ${className}`}>
    {children}
  </h2>
)
