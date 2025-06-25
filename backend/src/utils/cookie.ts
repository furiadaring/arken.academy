import { env } from '@/config/env'
import { Response } from 'express'

type TCookieOptions = {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'none' | 'lax' | 'strict'
  maxAge?: number
  path?: string
}

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: TCookieOptions = {}
) => {
  const defaultOptions: TCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  }

  res.cookie(env.cookiePrefix + name, value, { ...defaultOptions, ...options })
}

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(env.cookiePrefix + name, {
    path: '/',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  })
}
