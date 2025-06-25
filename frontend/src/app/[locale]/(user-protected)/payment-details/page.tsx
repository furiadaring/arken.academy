import { auth } from '@/auth'
import { PaymentForm } from '@/components/payment/form'
import { redirect } from 'next/navigation'
type SearchParams = Promise<{ price: string; package: string; name: string }>

export default async function PaymentDetailsPage({ searchParams }: { searchParams: SearchParams }) {
  const { price, package: packageName, name: packageType } = await searchParams
  const session = await auth()
  if (!session?.user?.email || !session.user.name) {
    redirect('/login')
  }

  return (
    <section className="mx-auto max-w-[1200px] px-1.5 pb-16 lg:pt-10">
      <PaymentForm
        price={price}
        packageName={packageName}
        email={session.user.email}
        name={session.user.name}
        packageType={packageType}
      />
    </section>
  )
}
