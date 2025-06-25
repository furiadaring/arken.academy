'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const adminRefresh = async () => {
  const cookieStore = await cookies()
  const cookiePrefix = process.env.COOKIE_PREFIX || ''
  const refreshTokenValue = cookieStore.get(cookiePrefix + 'refresh-token')?.value
  if (!refreshTokenValue) {
    return redirect('/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/login')
  }
  try {
    const response = await api.post(
      '/auth/refresh',
      {
        refreshToken: refreshTokenValue,
      },
      {
        headers: {
          'X-Client-Source': 'next-admin-panel',
          Cookie: `${cookiePrefix}refresh-token=${refreshTokenValue}`,
        },
      },
    )

    cookieStore.set(cookiePrefix + 'access-token', response.data.accessToken, {
      maxAge: 30, // response.data.accessTokenExpiresIn,
    })

    return { success: true }
  } catch (error) {
    console.error('Token refresh error:', error)
    return redirect('/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/login')
  }
}
