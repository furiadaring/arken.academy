import { auth } from '@/auth'
import { Footer } from '@/components/layout/footer'
import { GoUp } from '@/components/layout/go-up'
import { Header } from '@/components/layout/header'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <>
      <Header session={!!session} />
      <main className="mt-[80px] lg:mt-0">{children}</main>
      <Footer />
      <GoUp />
    </>
  )
}
