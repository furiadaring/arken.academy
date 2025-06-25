import bgImg from '@/assets/bg/BG.png'
import Image from 'next/image'
type TBg3DProps = {
  className?: string
}

export const Bg3D = ({ className = '' }: TBg3DProps) => {
  return (
    <div className={`pointer-events-none absolute -z-10 w-dvw ${className}`}>
      <div className="relative h-svh w-full">
        <Image
          src={bgImg}
          alt="bg"
          className="h-svh"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}
