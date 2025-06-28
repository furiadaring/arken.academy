'use client'
import { useTranslations } from 'next-intl'
import { Button } from '../shared/btn'

export const BookBtns = () => {
  const t = useTranslations('account')

  return (
    <div className="mt-5 mb-2 flex flex-col gap-2 backdrop-blur-lg lg:mt-0 lg:flex-row">
      <Button onClick={() => window.open('/api/book', '_blank')}>{t('bookBtn')}</Button>
      <Button
        onClick={() => {
          const link = document.createElement('a')
          link.href = 'https://arken.academy/backend-api/v1/book'
          link.download = 'arken_edu_book.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }}
      >
        {t('downloadBtn')}
      </Button>
    </div>
  )
}
