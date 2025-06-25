import { useMessages, useTranslations } from 'next-intl'
import { Card } from './card'

export const TeamCardMore = ({ className }: { className?: string }) => {
  const t = useTranslations('team.moreItem')
  const messages = useMessages()
  const items = messages.team?.moreItem?.items as string[]
  return (
    <div className={className}>
      <h2 className="text-gradient px-5 py-7 text-lg">
        {t('titleClr')} <span className="text-text">{t('title')}</span>
      </h2>
      <div className="px-3">
        <Card className="px-5 py-6">
          <div className="flex flex-col items-center">
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.12793" width="67" height="67" rx="33.5" fill="#A3E635" />
              <path
                d="M49.9633 37.5164L37.4909 37.4929V49.5607H30.4902V37.4805L18.0026 37.4584L18.0164 29.6056L30.4902 29.6277L30.4909 17.5606H37.4902L37.4909 29.6402L49.9771 29.6636L49.9633 37.5164Z"
                fill="#2D2D2D"
              />
            </svg>
            <h3 className="text-gradient my-3 w-4/5 text-center text-2xl font-medium lg:text-[26px]">
              {t('moreText')}
            </h3>
            <p className="text-text/70 mb-4 text-center leading-tight font-light tracking-tight lg:mx-auto lg:mt-4 lg:w-11/12">
              {t('subtitle')}
            </p>
          </div>

          <ul className="mt-1 space-y-3 pb-12 lg:space-y-5 lg:pl-5">
            {items?.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 text-lime-400">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.01665 10.9573C8.02625 10.967 8.32073 11.0408 8.67098 11.1213C9.02127 11.2018 9.31165 11.2554 9.31632 11.2404C9.32095 11.2254 9.35719 10.9823 9.39682 10.7001C9.47643 10.1335 9.66919 9.47186 9.87516 9.05809C10.5172 7.76854 11.6691 6.91469 13.0661 6.69276L13.4219 6.63623L13.4219 6.06657L13.4219 5.49687L13.0994 5.44277C10.9869 5.08835 9.60959 3.50877 9.35195 1.14492C9.33513 0.990565 9.31503 0.864314 9.30729 0.864314C9.23604 0.864314 8.05547 1.14883 8.03315 1.17137C8.017 1.18766 8.02901 1.33237 8.05988 1.49288C8.4015 3.27023 9.37965 4.71651 10.649 5.32123L10.9535 5.4663L4.69216 5.47766L0.73291 5.48487L0.73291 6.63777L4.70235 6.64499L10.9489 6.65639L10.5645 6.85116C9.56725 7.35639 8.77772 8.34745 8.31277 9.67772C8.18027 10.0567 7.98036 10.9207 8.01665 10.9573Z"
                      fill="#A3E635"
                    />
                  </svg>
                </span>
                <span className="text-text font-light tracking-tight">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
