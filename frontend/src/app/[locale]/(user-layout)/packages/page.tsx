import Image from 'next/image'

import faqBg from '@/assets/bg/cells.svg'
import { Auth, Faq, Hero, Variants } from '@/components/packages'

export default function PackagesPage() {
  return (
    <>
      <div className="bg">
        <Hero />
        <Variants />
        <Auth />
      </div>
      <div className="relative lg:pt-10">
        <Image src={faqBg} alt="faq-bg" className="absolute top-0 left-0 z-0" />
        <Faq />
      </div>
    </>
  )
}
