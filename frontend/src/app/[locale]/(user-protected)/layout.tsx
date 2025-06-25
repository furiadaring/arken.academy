import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import { Header } from '@/components/layout/header'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    return redirect('/login')
  }
  return (
    <>
      <Header />
      <main className="mt-[100px] lg:mt-0">{children}</main>
    </>
  )
}
