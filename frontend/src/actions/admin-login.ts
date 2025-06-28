'use server'

import { api } from '@/lib/api'
import console from 'console'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type TAdminLoginState = {
  login: FormDataEntryValue | null
  error: null | string
}

export const adminLogin = async (_prevState: TAdminLoginState | null, formData: FormData) => {
  let redirectUrl = ''
  try {
    const login = formData.get('login')
    const password = formData.get('password')
    if (!login || !password) throw new Error('No login or password')

    const cookieStore = await cookies()

    const response = await api.post(
      '/auth/login',
      { username: login, password },
      {
        headers: {
          'X-Client-Source': 'next-admin-panel',
        },
      },
    )
    const cookiePrefix = process.env.COOKIE_PREFIX || ''
    const isAdmin = response.data.isSuperAdmin
    redirectUrl = response.data.isSuperAdmin
      ? '/f2186af6dc6143439b65adc/dashboard/users'
      : '/f2186af6dc6143439b65adc/manager/all-clients'
    cookieStore.set(cookiePrefix + 'role', isAdmin ? 'admin' : 'manager', {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    cookieStore.set(cookiePrefix + 'access-token', response.data.accessToken, {
      maxAge: response.data.accessTokenExpiresIn,
      path: '/', // Make cookie available for all paths
      sameSite: 'lax', // Allows cookies to be sent with same-site requests
      secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
    })

    cookieStore.set(cookiePrefix + 'refresh-token', response.data.refreshToken, {
      maxAge: response.data.refreshTokenExpiresIn,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    if (response.data.officeName) {
      cookieStore.set(cookiePrefix + 'office', response.data.officeName, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }
  } catch (error: unknown) {
    console.error({ error })
    const login = formData.get('login')

    let errorMessage = 'Что-то пошло не так'
    if (
      error &&
      typeof error === 'object' &&
      'data' in error &&
      error.data &&
      typeof error.data === 'object' &&
      'error' in error.data &&
      typeof error.data.error === 'string'
    ) {
      errorMessage = error.data.error
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return { login, error: errorMessage }
  }
  redirect(redirectUrl)
}
