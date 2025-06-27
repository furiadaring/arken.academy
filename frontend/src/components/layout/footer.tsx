'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = ['/', '/packages', '/#feedbacks', '/#about', '/#contacts']

const docsLinks = ['/privacy', '/refund']

export const Footer = () => {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  const navItems = t.raw('navItems') as string[]
  const docsItems = t.raw('docsItems') as string[]

  return (
    <footer className="bg-[#181A1B] pt-16 pb-5 text-white">
      <div className="px-4.5 lg:px-0">
        <div className="container mx-auto max-w-[1280px] lg:flex lg:gap-10 lg:pb-30">
          <div className="mb-6 lg:mb-0 lg:pr-12">
            <Image src="/logo.svg" alt="Arken" width={190} height={93} className="mx-auto mb-9 h-auto lg:mx-0" />
            <p className="mt-4 px-6 text-sm leading-normal font-light tracking-wider lg:max-w-[313px] lg:p-0">
              {t('title')}
            </p>
          </div>

          <div className="mt-5 px-3 lg:mt-10 lg:grow-2 lg:pl-10">
            <h3 className="mb-3 text-base font-medium lg:text-[20px]">{t('navTitle')}</h3>
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-accent mr-2">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                  <Link
                    href={navLinks[index]}
                    className="hover:text-accent text-sm font-light transition-colors lg:text-base"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-14 px-3 lg:mt-10 lg:grow-2">
            <h3 className="mb-3 text-base font-medium lg:text-[20px]">{t('docsTitle')}</h3>
            <nav className="space-y-4">
              {docsItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-accent mr-2">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5H13V3.5H0V4.5Z"
                        fill="#fff"
                      />
                    </svg>
                  </span>
                  <Link
                    href={`/policy${docsLinks[index]}`}
                    className="hover:text-accent text-sm font-light tracking-wider transition-colors lg:text-base"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-16 px-3 lg:mt-10">
            <h3 className="mb-4 text-base font-medium lg:text-[20px]">{t('contactTitle')}</h3>
            <div className="space-y-4 text-sm font-light lg:text-base">
              <p className="flex items-center">+905517234160</p>
              <p className="flex items-center">info@arken.academy</p>
              <p className="flex items-center">{t('contactAddres')}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-white/15 lg:border-t lg:py-5">
          <div className="container mx-auto max-w-[1280px]">
            <h3 className="mb-2 lg:text-center">{t('rulesTitle')}</h3>
            <p className="text-xs leading-tight font-extralight tracking-tight text-white/70">{t('rulesDesc')}</p>
          </div>
        </div>

        <div className="container mx-auto mt-4 max-w-[1280px]">
          <h3 className="mb-2 text-center text-sm">{t('riskTitle')}</h3>
          <p className="text-xs leading-tight font-extralight tracking-tight text-white/70">{t('riskDesc')}</p>
        </div>

        <div className="mt-5 text-center text-xs tracking-tight text-white/50">
          <span className="font-extralight">
            © {currentYear}. {t('copyright')}{' '}
          </span>
          Arken Academy
        </div>
      </div>
    </footer>
  )
}
