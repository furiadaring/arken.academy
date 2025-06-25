import { ReactNode } from 'react'

type TCardProps = {
  className?: string
  children: ReactNode
  withoutShadows?: boolean
}

export const Card = ({ className, children, withoutShadows }: TCardProps) => (
  <div
    className={`card-shadow bg-background-team-card border-b-border relative flex h-full w-full flex-col justify-between rounded-[30px] border-b backface-hidden ${className} overflow-hidden`}
  >
    {!withoutShadows && (
      <>
        {/* <div className="absolute top-0 left-[5%] h-[176px] w-[175px] rounded-full bg-[#87EB62]/70 opacity-40 blur-3xl"></div>
        <div className="absolute right-[10%] bottom-0 h-[120px] w-[120px] rounded-full bg-[#DFE6BE] opacity-40 blur-3xl"></div> */}
        {/* <div className="absolute bottom-0 left-1/2 z-0 h-3/4 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BEE6BE]/70 opacity-20 blur-[25px] backdrop-blur-[25px]"></div> */}
      </>
    )}
    {children}
  </div>
)
