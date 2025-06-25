'use server'

import { api } from '@/lib/api'
import { TPromo } from '@/types'

export const applyPromocode = async (_prevState: { message: string; promocode: TPromo } | null, formData: FormData) => {
  const code = formData.get('code') || ''
  const name = formData.get('name') || ''
  console.log({ code, name })
  try {
    if (!code || !name) {
      return { message: 'promoCodeError', promocode: { name: code, discount: '' } }
    }
    const response = await api.post('/promocodes/verify', { code, packageName: name })
    console.log(response.data)
    return { message: 'promoCodeSuccess', promocode: response.data }
  } catch (error) {
    console.error(error)
    return { message: 'promoCodeError', promocode: { name: code, discount: '' } }
  }
}
