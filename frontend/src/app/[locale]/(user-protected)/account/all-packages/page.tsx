import { Variants } from '@/components/account/variants'
import { SectionTitle } from '@/components/shared/section-title'
import { useTranslations } from 'next-intl'

export default function AllPackagesPage() {
  const t = useTranslations('account')
  return (
    <section>
      <SectionTitle className="py-7.5 !text-[20px] lg:!text-[42px]">{t('allPackagesTitle')}</SectionTitle>
      <Variants />
    </section>
  )
}
