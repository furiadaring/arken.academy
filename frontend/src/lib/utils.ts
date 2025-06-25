import crypto from 'crypto'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TExchangeRateResponse = {
  fromCurrency: string
  toCurrency: string
  rate: number
  amount: number
  convertedAmount: number
  timestamp: number
}

export const getRatesFromPayPort = async (currency: string, amount: number): Promise<{ amount: number }> => {
  const toCurrency = 'USD'
  try {
    const response = await fetch('/api/get-payport-rates', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        currency,
      }),
    })
    const data = await response.json()
    return {
      amount: Number(data.amount),
    }
  } catch (error) {
    console.error(`Error fetching rate for ${currency} to ${toCurrency}:`, error)
    throw error
  }
}

export const encryptEmail = (email: string): string => {
  try {
    const secretKey = process.env.ENCRYPTION_SECRET_KEY || ''
    const ivHex = process.env.ENCRYPTION_IV || ''
    
    if (!secretKey || !ivHex) {
      throw new Error('Encryption environment variables not set')
    }
    
    const key = crypto.createHash('sha256').update(secretKey).digest().slice(0, 16)
    
    const iv = Buffer.from(ivHex, 'hex').slice(0, 16)
    
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    
    let encrypted = cipher.update(email, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    
    return encrypted
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  } catch (error) {
    console.error('Error encrypting email:', error)
    throw error
  }
}
