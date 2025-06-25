'use server'

import { api } from '@/lib/api'
import { loginSchema } from '@/types'

export const resetPassword = async (_prevState: { message: string } | null, formData: FormData) => {
  try {
    const token = formData.get('token')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    console.log({ password })
    const validatedPassword = loginSchema.pick({ password: true }).safeParse({ password })
    if (validatedPassword.success === false) {
      return { message: 'passwordError' }
    }
    if (password !== confirmPassword) {
      return { message: 'passwordsDoNotMatch' }
    }

    if (!token) {
      return { message: 'invalidToken' }
    }

    const response = await api.post('/users/reset-password', {
      token,
      password,
    })
    console.log({ response })
    return { message: 'passwordResetSuccess' }
  } catch (error) {
    console.error('Password reset error:', error)
    return { message: 'passwordResetError' }
  }
}
