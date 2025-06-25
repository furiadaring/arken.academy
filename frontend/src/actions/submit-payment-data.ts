'use server'

import { api } from '@/lib/api'
import { refreshTokenExpiresIn } from '@/lib/const'
import { TFormState, paymentDataFSchema } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function submitPaymentData(_prevState: TFormState | null, formData: FormData): Promise<TFormState | null> {
  const data = Object.fromEntries(formData)
  try {
    const cookieStore = await cookies()
    console.log({ data })
    const parsedData = paymentDataFSchema.safeParse(data)
    if (!parsedData.success) {
      return {
        message: parsedData.error.message,
        data,
        errors: parsedData.error.flatten().fieldErrors,
      } as unknown as TFormState
    }

    await api.post('/users', parsedData.data)
    cookieStore.set('checkoutData', JSON.stringify(parsedData.data), {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
      maxAge: refreshTokenExpiresIn,
    })
  } catch (error) {
    console.log(error)
    return { message: 'Error' + error, data, errors: null } as unknown as TFormState
  }
  redirect('/checkout')
}
