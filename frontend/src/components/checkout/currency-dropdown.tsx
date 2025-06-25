'use client'

import { currencies } from '@/lib/const'
import { TCurrency } from '@/types'
import { useEffect, useRef, useState } from 'react'

type TCurrencyDropdownProps = {
  defaultValue?: TCurrency
  onChange?: (currency: TCurrency) => void
}

export const CurrencyDropdown = ({ defaultValue, onChange }: TCurrencyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCurrencySelect = (currency: TCurrency) => {
    setIsOpen(false)
    if (onChange) {
      onChange(currency)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex min-h-[45px] w-[139px] items-center justify-between rounded-[12px] border border-[#FFFFFF1A] bg-[#1B1B1BB2] px-4 py-2 text-xl font-medium text-white"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backdropFilter: 'blur(30px)' }}
      >
        {defaultValue}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-auto transform transition-transform ${isOpen ? 'rotate-180' : ''} `}
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#9AE6B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 z-10 mt-1 w-[139px] rounded-[12px] border border-[#FFFFFF1A] bg-[#1B1B1BB2] py-3"
          style={{ backdropFilter: 'blur(30px)' }}
        >
          {currencies.map((currency, index) => (
            <button
              // disabled={GETPAY_CURRENCIES.includes(currency)}
              key={currency}
              className={`block w-full cursor-pointer px-4 py-3 text-xl font-medium text-white hover:bg-[#FFFFFF0D] disabled:cursor-not-allowed disabled:text-[#FFFFFF4D] ${
                index < currencies.length - 1 ? 'border-b border-[#FFFFFF1A]' : ''
              }`}
              onClick={() => handleCurrencySelect(currency)}
            >
              {currency}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
