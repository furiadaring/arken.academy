'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const adminLogout = async () => {
  try {
    const cookieStore = await cookies()
    const cookiePrefix = process.env.COOKIE_PREFIX || ''

    // Get the refresh token value
    const refreshTokenValue = cookieStore.get(cookiePrefix + 'refresh-token')?.value
    console.log(refreshTokenValue)
    try {
      if (refreshTokenValue) {
        // Send the refresh token in both the request body and as an Authorization header
        await api.post(
          '/auth/logout',
          { refreshToken: refreshTokenValue },
          {
            headers: {
              Authorization: `Bearer ${refreshTokenValue}`,
              Cookie: `${cookiePrefix}refresh-token=${refreshTokenValue}`,
            },
          },
        )
      }
    } catch (apiError) {
      console.error('API logout error:', apiError)
    }

    // Clear cookies after API call (or attempt)
    // Clear cookies with the same attributes they were set with
    cookieStore.set(cookiePrefix + 'access-token', '', {
      maxAge: 0,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    cookieStore.set(cookiePrefix + 'refresh-token', '', {
      maxAge: 0,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    cookieStore.set(cookiePrefix + 'role', '', {
      maxAge: 0,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  } catch (error) {
    console.error('Logout error:', error)
  }

  redirect('/f2186af6dc6143439b65adc/login')
}
