import { TItem } from '@/types'
import { useMessages, useTranslations } from 'next-intl'

export const Advantages = () => {
  const t = useTranslations('advantages')
  const messages = useMessages()

  const items = Object.values(messages.advantages.advItems) as TItem[]
  return (
    <section id="advantages">
      <div className="relative container mx-auto max-w-[1280px] px-3 py-5 lg:pt-16">
        <h3 className="text-title">{t('title')}</h3>
        <p className="text-text/70 mt-4.5 text-center text-sm leading-tight font-light lg:pt-5 lg:text-lg">
          {t.rich('subtitle', {
            important: (children) => <span className="text-gradient-red font-normal">{children}</span>,
          })}
        </p>
        <p className="text-gradient-red mx-auto w-3/5 py-4.5 text-center text-lg leading-[100%] lg:mt-12 lg:text-[22px]">
          {t('advItemsTitle')}
        </p>
        <ul className="gap-5 space-y-2.5 px-3.5 lg:grid lg:grid-cols-2 lg:space-y-0">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <p className="bg-secondary flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full lg:h-10 lg:w-10">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2569_756)">
                    <path
                      d="M1.37535 7.43262L13.9395 7.43262"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.6574 1.15074L13.9395 7.43279L7.6574 13.7148"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2569_756">
                      <rect width="14" height="14" fill="white" transform="translate(14.5 14.5) rotate(-180)" />
                    </clipPath>
                  </defs>
                </svg>
              </p>
              <h3 className="text-sm leading-tight tracking-tighter lg:text-[20px]">
                {item.title}
                <span className="text-text/70 font-light">{item.subtitle}</span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
