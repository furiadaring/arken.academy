'use client'
import { TFaqItem } from '@/types'
import { useState } from 'react'

type TFaqItemProps = TFaqItem & {
  className?: string
}

export const FaqItem = ({ question, answer, className = '' }: TFaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-[24px] border-b-2 border-white/6 ${isOpen ? 'faq-gradient' : 'bg-gradient-to-r from-[#FAFAFA] to-[#F4F7FF]'} ${className}`}
    >
      <div className="flex cursor-pointer items-center justify-between px-4 py-7.5 lg:px-15" onClick={toggleAccordion}>
        <h3
          className={`${isOpen ? 'font-medium' : ''} mr-4 text-sm leading-5 font-bold tracking-tight lg:text-lg lg:leading-[38px]`}
        >
          {question}
        </h3>
        <div className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}>
          <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="42.5" width="42" height="42" rx="21" transform="rotate(90 42.5 0)" fill="white" />
            <g clipPath="url(#clip0_2745_491)">
              <path
                d="M21.6152 10.5006L21.6152 32.0391"
                stroke="#FB8138"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.3842 21.2698L21.6149 32.0391L10.8457 21.2698"
                stroke="#FB8138"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2745_491">
                <rect width="24" height="24" fill="white" transform="translate(9.5 33) rotate(-90)" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-5 pb-5 text-sm leading-6 font-light tracking-tight lg:max-w-3/5 lg:px-15 lg:text-lg lg:leading-[28px]">
          {answer}
        </p>
      </div>
    </div>
  )
}
