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
      className={`w-full overflow-hidden rounded-[24px] border-b-2 border-white/6 ${isOpen ? 'faq-gradient' : 'bg-gradient-to-r from-[#1D1D1D] to-[#2C2C2D]'} ${className}`}
    >
      <div className="flex cursor-pointer items-center justify-between px-4 py-7.5 lg:px-15" onClick={toggleAccordion}>
        <h3 className="mr-4 text-sm leading-5 tracking-tight lg:text-lg lg:leading-[38px]">{question}</h3>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
          <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.8003 12.204L22.7907 17.7421L14.681 17.7269L15.4033 24.8229L11.2698 28.9564L7.35308 25.0397L14.6658 17.7269L0.248174 17.7014L0.258532 12.1626L14.9538 12.1895L7.5706 4.80636L11.4873 0.889648L22.801 12.2034L22.8003 12.204Z"
              fill="#E67935"
            />
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
