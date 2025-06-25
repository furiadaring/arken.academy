import { env } from '@/config/env'
import { accessTokenExpiresIn, refreshTokenExpiresIn } from '@/lib/const'
import * as service from '@/services/auth'
import { clearCookie, setCookie } from '@/utils/cookie'
import { Request, Response } from 'express'

export const managerLogin = async (req: Request, res: Response) => {
  try {
    const manager = await service.managerLogin(req.body)
    if (!manager) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    setCookie(res, 'access-token', manager.accessToken, {
      maxAge: accessTokenExpiresIn,
    })
    setCookie(res, 'refresh-token', manager.refreshToken, {
      maxAge: refreshTokenExpiresIn,
    })
    res
      .status(200)
      .json({ ...manager, accessTokenExpiresIn, refreshTokenExpiresIn })
  } catch (error) {
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const managerLogout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies[env.cookiePrefix + 'refresh-token']
    if (!refreshToken) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    clearCookie(res, env.cookiePrefix + 'access-token')
    clearCookie(res, env.cookiePrefix + 'refresh-token')
    await service.managerLogout(refreshToken)
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken =
      req.body?.refreshToken || req.cookies[env.cookiePrefix + 'refresh-token']

    if (!refreshToken) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const result = await service.refreshToken(refreshToken)

    if (!result) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    setCookie(res, 'access-token', result.accessToken, {
      maxAge: accessTokenExpiresIn,
    })
    setCookie(res, 'refresh-token', result.refreshToken, {
      maxAge: refreshTokenExpiresIn,
    })
    res
      .status(200)
      .json({ accessToken: result.accessToken, accessTokenExpiresIn })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}
