import { z } from 'zod'

// Cookie schema for type safety
const TCookieValue = z.string().optional()

/**
 * Get a cookie value from the browser
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined

  const cookiePrefix = process.env.NEXT_PUBLIC_COOKIE_PREFIX || ''
  const fullName = cookiePrefix + name

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${fullName}=`)

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return TCookieValue.parse(cookieValue)
  }

  return undefined
}

/**
 * Set a cookie in the browser
 * @param name The name of the cookie to set
 * @param value The value to set
 * @param options Cookie options like expiration, path, etc.
 */
export const setCookie = (
  name: string,
  value: string,
  options: {
    expires?: Date | number
    path?: string
    sameSite?: 'strict' | 'lax' | 'none'
    secure?: boolean
    maxAge?: number
  } = {},
): void => {
  if (typeof document === 'undefined') return

  const cookiePrefix = process.env.NEXT_PUBLIC_COOKIE_PREFIX || ''
  const fullName = cookiePrefix + name

  let cookieString = `${fullName}=${encodeURIComponent(value)}`

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date()
      date.setTime(date.getTime() + options.expires)
      options.expires = date
    }
    cookieString += `; expires=${options.expires.toUTCString()}`
  }

  if (options.path) cookieString += `; path=${options.path}`
  if (options.sameSite) cookieString += `; samesite=${options.sameSite}`
  if (options.secure) cookieString += `; secure`
  if (options.maxAge) cookieString += `; max-age=${options.maxAge}`

  document.cookie = cookieString
}

/**
 * Delete a cookie from the browser
 * @param name The name of the cookie to delete
 */
export const deleteCookie = (name: string): void => {
  setCookie(name, '', {
    path: '/',
    expires: -1,
    maxAge: -1,
  })
}
