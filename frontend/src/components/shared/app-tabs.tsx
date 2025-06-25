'use client'

import { TLinks } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AppTabs = ({ tabs }: { tabs: TLinks[] }) => {
  const pathname = usePathname()

  const renderIcon = (index: number) => {
    if (pathname.includes('/account')) {
      switch (index) {
        case 0:
          return (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.63672 10.5H6.5459C7.07273 10.5002 7.49976 10.9273 7.5 11.4541V16.3633C7.5 16.8903 7.07287 17.3181 6.5459 17.3184H1.63672C1.10954 17.3184 0.681641 16.8905 0.681641 16.3633V11.4541C0.68188 10.9271 1.10969 10.5 1.63672 10.5ZM11.4541 10.5H16.3633C16.8903 10.5 17.3181 10.9271 17.3184 11.4541V16.3633C17.3184 16.8905 16.8905 17.3184 16.3633 17.3184H11.4541C10.9271 17.3181 10.5 16.8903 10.5 16.3633V11.4541C10.5002 10.9273 10.9273 10.5002 11.4541 10.5ZM1.63672 0.681641H6.5459C7.07288 0.68188 7.5 1.10969 7.5 1.63672V6.5459C7.49976 7.07273 7.07273 7.49976 6.5459 7.5H1.63672C1.10969 7.5 0.68188 7.07288 0.681641 6.5459V1.63672C0.681641 1.10954 1.10954 0.681641 1.63672 0.681641ZM11.4541 0.681641H16.3633C16.8905 0.681641 17.3184 1.10954 17.3184 1.63672V6.5459C17.3181 7.07287 16.8903 7.5 16.3633 7.5H11.4541C10.9273 7.49976 10.5002 7.07273 10.5 6.5459V1.63672C10.5 1.10969 10.9271 0.68188 11.4541 0.681641Z"
                stroke="currentColor"
                strokeWidth="1.36364"
              />
            </svg>
          )
        case 1:
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.2545 10.9167C14.942 10.9167 15.547 10.5408 15.8587 9.9725L19.1403 4.02333C19.4795 3.41833 19.0395 2.66666 18.3428 2.66666H4.77616L3.91449 0.833328H0.916992V2.66666H2.75033L6.05033 9.62416L4.81283 11.8608C4.14366 13.0892 5.02366 14.5833 6.41699 14.5833H17.417V12.75H6.41699L7.42533 10.9167H14.2545ZM5.64699 4.49999H16.7845L14.2545 9.08333H7.81949L5.64699 4.49999ZM6.41699 15.5C5.40866 15.5 4.59283 16.325 4.59283 17.3333C4.59283 18.3417 5.40866 19.1667 6.41699 19.1667C7.42533 19.1667 8.25033 18.3417 8.25033 17.3333C8.25033 16.325 7.42533 15.5 6.41699 15.5ZM15.5837 15.5C14.5753 15.5 13.7595 16.325 13.7595 17.3333C13.7595 18.3417 14.5753 19.1667 15.5837 19.1667C16.592 19.1667 17.417 18.3417 17.417 17.3333C17.417 16.325 16.592 15.5 15.5837 15.5Z"
                fill="currentColor"
              />
            </svg>
          )
        case 2:
          return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.08301 15.5H10.9163V13.6667H9.08301V15.5ZM9.99967 0.833344C4.93967 0.833344 0.833008 4.94001 0.833008 10C0.833008 15.06 4.93967 19.1667 9.99967 19.1667C15.0597 19.1667 19.1663 15.06 19.1663 10C19.1663 4.94001 15.0597 0.833344 9.99967 0.833344ZM9.99967 17.3333C5.95717 17.3333 2.66634 14.0425 2.66634 10C2.66634 5.95751 5.95717 2.66668 9.99967 2.66668C14.0422 2.66668 17.333 5.95751 17.333 10C17.333 14.0425 14.0422 17.3333 9.99967 17.3333ZM9.99967 4.50001C7.97384 4.50001 6.33301 6.14084 6.33301 8.16668H8.16634C8.16634 7.15834 8.99134 6.33334 9.99967 6.33334C11.008 6.33334 11.833 7.15834 11.833 8.16668C11.833 10 9.08301 9.77084 9.08301 12.75H10.9163C10.9163 10.6875 13.6663 10.4583 13.6663 8.16668C13.6663 6.14084 12.0255 4.50001 9.99967 4.50001Z"
                fill="currentColor"
              />
            </svg>
          )
        default:
          return (
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <g>
                <path
                  d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          )
      }
    }

    switch (pathname) {
      case '/dashboard':
        switch (index) {
          case 0:
            return (
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <g>
                  <path
                    d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            )
          case 1:
            return (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path
                  d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
                  fill="currentColor"
                />
              </svg>
            )
          case 2:
            return (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            )
          default:
            return (
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <g>
                  <path
                    d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            )
        }
      default:
        return (
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
            <g>
              <path
                d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                fill="currentColor"
              />
            </g>
          </svg>
        )
    }
  }

  return (
    <div className="fixed bottom-0 z-50 flex w-full items-center gap-2 rounded-t-2xl border-t border-white/40 bg-[#3a3a3a]/80 px-6 py-4 backdrop-blur-[25px] lg:hidden">
      {tabs.map((tab, index) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex w-full flex-col items-center justify-center gap-2 ${
            pathname.includes(tab.href) ? 'text-lime-400' : 'text-white'
          }`}
        >
          {renderIcon(index)}
          <span className="text-center text-xs font-light">{tab.label}</span>
        </Link>
      ))}
    </div>
  )
}
