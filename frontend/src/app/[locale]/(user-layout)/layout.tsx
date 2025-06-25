import { Footer } from '@/components/layout/footer'
import { GoUp } from '@/components/layout/go-up'
import { Header } from '@/components/layout/header'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-[80px] lg:mt-0">{children}</main>
      <Footer />
      <GoUp />
    </>
  )
}
