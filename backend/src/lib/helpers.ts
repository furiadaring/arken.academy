import { env } from '@/config/env'
import { TAdmin } from '@/types/auth'
import jwt from 'jsonwebtoken'

export const generateTokens = (user: TAdmin) => {
  if (!env.accessTokenSecret) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined')
  }
  if (!env.refreshTokenSecret) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined')
  }
  const accessToken = jwt.sign({ id: user.id }, env.accessTokenSecret, {
    expiresIn: '15m',
  })

  const refreshToken = jwt.sign({ id: user.id }, env.refreshTokenSecret, {
    expiresIn: '7d',
  })

  return { accessToken, refreshToken }
}
