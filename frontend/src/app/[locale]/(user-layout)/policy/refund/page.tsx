import { PolicySection } from '@/components/policy-section'
import { SectionTitle } from '@/components/shared/section-title'
import { TPolicy, TPolicySection } from '@/types'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

const RefundPolicyPage: FC = () => {
  const t = useTranslations('policy.refund')
  const policy: TPolicy = {
    title: t('title'),
    subtitle: t('subtitle'),
    items: t.raw('items') as TPolicySection[],
  }

  return (
    <section className="container mx-auto max-w-[1280px] px-3 py-8">
      <SectionTitle className="mb-6 !text-2xl lg:!text-[32px]">{policy.title}</SectionTitle>
      <p className="mb-8 leading-tight font-light">{policy.subtitle}</p>
      {policy.items.map((section, idx) => (
        <PolicySection section={section} key={idx} />
      ))}
    </section>
  )
}

export default RefundPolicyPage
