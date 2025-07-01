import { auth } from '@/auth'
import { Book } from '@/components/account/book'
import { Button } from '@/components/shared/btn'
import { api } from '@/lib/api'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function MyPackagesPage() {
  const session = await auth()
  const t = await getTranslations('account')

  type TPackageResponse = {
    data: Record<string, unknown> | null
    error: Error | null
  }

  const packagesData: TPackageResponse = { data: null, error: null }

  if (!session?.user?.email) {
    redirect('/login')
  }
  try {
    const response = await api.post('/packages/user', { email: session.user.email })
    packagesData.data = response.data
    console.log(packagesData.data)
  } catch (error) {
    console.error('Error fetching user packages:', error)
    packagesData.error = error as Error
  }

  return (
    <section className="">
      {packagesData.error ? (
        <div className="p-4 text-center">
          <h2 className="text-lg font-medium text-red-500">{t('errorTitle')}</h2>
          <p className="mt-2 text-sm text-gray-500">{t('errorSubtitle')}</p>
        </div>
      ) : packagesData.data?.packageType ? (
        <Book />
      ) : (
        <div>
          <div className="text-center leading-snug text-[#898989]">
            <h1 className="text-lg font-light lg:text-[31px]">{t('emptyTitle')}</h1>
            <p className="mx-auto py-3 text-sm font-light lg:w-4/5 lg:py-7 lg:text-[20px]">{t('emptySubtitle')}</p>
          </div>
          <form className="relative z-10 mx-auto grid items-center gap-2 pt-2 lg:max-w-[560px] lg:grid-cols-[20%_1fr_20%] lg:justify-items-center lg:pt-5">
            <span className="relative mr-4 hidden h-[2px] w-20 bg-gradient-to-r from-[#FFFFFF] to-[#1E260F]/60 lg:block">
              <span className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rounded-full bg-black"></span>
            </span>
            <Link href="/packages">
              <Button variant="primary" className="lg:mx-auto lg:min-w-[250px]">
                <span className="text-xs text-nowrap lg:text-lg">{t('emptyBtn')}</span>
              </Button>
            </Link>
            <span className="relative ml-4 hidden h-[2px] w-20 bg-gradient-to-l from-[#FFFFFF] to-[#1E260F]/60 lg:block">
              <span className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-black"></span>
            </span>
          </form>
        </div>
      )}
    </section>
  )
}
