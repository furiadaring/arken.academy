import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const SocialLink = ({ href, children }: { href: string } & PropsWithChildren) => (
  <Link
    href={href}
    target="_blank"
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#2D2D2D33] shadow-[0px_4px_34px_0px_#FFFFFF26_inset] backdrop-blur-[25px] hover:scale-110"
  >
    {children}
  </Link>
)
