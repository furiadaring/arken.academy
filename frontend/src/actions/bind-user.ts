'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'

export const bindUser = async (userId: string, officeName: string) => {
  let result
  try {
    const { data } = await api.post('/users/bind-to-office', { userId, officeName })
    result = data
  } catch (error) {
    console.error({ error })
    result = error
  }
  revalidatePath('/f2186af6dc6143439b65adc/manager/without-promocode')
  return result
}
