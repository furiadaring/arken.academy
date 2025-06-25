import { env } from '@/config/env'
import { TDecodedCookie } from '@/types/cookie'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Extract access token from request using various methods
 */
export const extractAccessToken = (req: Request): string | null => {
  // Try to get token from cookies
  let token = req.cookies?.[env.cookiePrefix + 'access-token']

  // If token not found in cookies, try to get from Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }

  // If token not found in Authorization header, try to parse from Cookie header
  if (!token && req.headers.cookie) {
    const cookieHeader = req.headers.cookie as string
    const cookies = parseCookieHeader(cookieHeader)
    token = cookies[env.cookiePrefix + 'access-token']
  }

  return token || null
}

/**
 * Parse cookie header string into an object
 */
export const parseCookieHeader = (
  cookieHeader: string
): Record<string, string> => {
  return cookieHeader
    .split(';')
    .reduce<Record<string, string>>((acc, cookie) => {
      const [name, value] = cookie.trim().split('=')
      if (name && value) {
        acc[name] = value
      }
      return acc
    }, {})
}

/**
 * Extract refresh token from request
 */
export const extractRefreshToken = (req: Request): string | null => {
  // Try to get token from cookies
  let token = req.cookies?.[env.cookiePrefix + 'refresh-token']

  // If token not found in cookies, try to parse from Cookie header
  if (!token && req.headers.cookie) {
    const cookieHeader = req.headers.cookie as string
    const cookies = parseCookieHeader(cookieHeader)
    token = cookies[env.cookiePrefix + 'refresh-token']
  }

  return token || null
}

/**
 * Verify JWT token and return decoded data
 */
export const verifyAccessToken = (token: string): { decoded: TDecodedCookie | null; expired: boolean } => {
  try {
    if (!env.accessTokenSecret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined')
    }

    const decoded = jwt.verify(token, env.accessTokenSecret) as TDecodedCookie
    return { decoded, expired: false }
  } catch (error) {
    const isExpired = error instanceof Error && error.name === 'TokenExpiredError'
    console.error(`Token verification error: ${isExpired ? 'Token expired' : error}`)
    return { decoded: null, expired: isExpired }
  }
}

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (
  refreshToken: string,
  res: Response
): Promise<{ decoded: TDecodedCookie | null; error?: string }> => {
  try {
    const { refreshToken: refreshTokenService } = await import(
      '@/services/auth'
    )
    const result = await refreshTokenService(refreshToken)

    if (!result) {
      return {
        decoded: null,
        error: 'Unable to refresh token. Please login again.',
      }
    }

    const { accessToken, refreshToken: newRefreshToken } = result
    const { setCookie } = await import('@/utils/cookie')
    const { accessTokenExpiresIn, refreshTokenExpiresIn } = await import(
      '@/lib/const'
    )

    setCookie(res, env.cookiePrefix + 'access-token', accessToken, {
      maxAge: accessTokenExpiresIn,
    })

    setCookie(res, env.cookiePrefix + 'refresh-token', newRefreshToken, {
      maxAge: refreshTokenExpiresIn,
    })

    res.setHeader('X-New-Access-Token', accessToken)

    const verificationResult = verifyAccessToken(accessToken)
    return { decoded: verificationResult.decoded }
  } catch (error) {
    console.error('Token refresh error:', error)
    return { decoded: null, error: 'Token refresh failed. Please login again.' }
  }
}
