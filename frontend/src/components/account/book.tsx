import bookImage from '@/assets/account/book.png'
// import { api } from '@/lib/api'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { BookBtns } from './book-btns'

export const Book = async () => {
  const t = await getTranslations('account')
  // const book = await api.get('/book')
  return (
    <section className="relative grid overflow-hidden rounded-[25px] bg-gradient-to-r from-[#F8FFD7] via-[#ACF0FF] to-[#D0FFD9] text-[#000000] lg:grid-cols-[22%_1fr]">
      <div className="flex gap-3">
        <div className="relative min-h-[210px] min-w-[140px] lg:h-full lg:w-full">
          <Image
            src={bookImage}
            alt="book"
            className=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2 className="mt-4.5 mb-2 text-[20px] leading-6 lg:hidden">{t('bookTitle')}</h2>
      </div>
      <div className="flex flex-col px-3 pt-5 pb-3 lg:py-7">
        <div className="flex-grow">
          <h2 className="mb-2 hidden text-[22px] leading-8 lg:block">{t('bookTitle')}</h2>
          <p className="mb-7 text-sm lg:text-base lg:leading-5">
            {t.rich('bookSubtitle', {
              span: (chunks) => <span className="font-light">{chunks}</span>,
            })}
          </p>
        </div>
        <BookBtns />
      </div>
    </section>
  )
}
