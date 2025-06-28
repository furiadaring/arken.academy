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
        className="bg-background/20 border-text/60 text-text flex min-h-[45px] w-[139px] items-center justify-between rounded-[12px] border px-4 py-2 text-xl font-medium"
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
          className="border-text/60 bg-text/30 absolute top-full left-0 z-10 mt-1 w-[139px] rounded-[12px] border py-3"
          style={{ backdropFilter: 'blur(30px)' }}
        >
          {currencies.map((currency, index) => (
            <button
              key={currency}
              className={`hover:bg-text/20 block w-full cursor-pointer px-4 py-3 text-xl font-medium text-white disabled:cursor-not-allowed disabled:text-[#FFFFFF4D] ${
                index < currencies.length - 1 ? 'border-text/60 border-b' : ''
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
