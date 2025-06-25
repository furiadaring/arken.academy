import { getAdminById } from '@/services/users'
import {
  extractAccessToken,
  extractRefreshToken,
  refreshAccessToken,
  verifyAccessToken,
} from '@/utils/auth'
import { NextFunction, Request, Response } from 'express'

export const authenticateManager = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = extractAccessToken(req)
  console.log('authenticateManager', { token })
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const verificationResult = verifyAccessToken(token)
    let decodedToken = verificationResult.decoded

    if (!decodedToken) {
      // Only try to refresh if token is expired
      if (verificationResult.expired) {
        const refreshToken = extractRefreshToken(req)

        if (!refreshToken) {
          res.status(401).json({ error: 'Token expired. Please login again.' })
          return
        }

        const refreshResult = await refreshAccessToken(refreshToken, res)

        if (!refreshResult.decoded) {
          res
            .status(401)
            .json({ error: refreshResult.error || 'Authentication failed' })
          return
        }

        decodedToken = refreshResult.decoded
      } else {
        // Token is invalid (not expired)
        res.status(403).json({ error: 'Invalid token' })
        return
      }
    }

    const manager = await getAdminById(decodedToken.id)
    if (!manager) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    if (!req.body) req.body = {}
    req.body.manager = decodedToken
    next()
  } catch (err) {
    console.error('Token verification error:', err)
    res.status(403).json({ error: 'Forbidden' })
    return
  }
}

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('authenticateAdmin:', { cookies: req.cookies })
  console.log('authenticateAdmin', { headers: req.headers })

  const token = extractAccessToken(req)

  console.log('authenticateAdmin', { token })

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const verificationResult = verifyAccessToken(token)
    let decodedToken = verificationResult.decoded

    if (!decodedToken) {
      // Only try to refresh if token is expired
      if (verificationResult.expired) {
        const refreshToken = extractRefreshToken(req)

        if (!refreshToken) {
          res.status(401).json({ error: 'Token expired. Please login again.' })
          return
        }

        const refreshResult = await refreshAccessToken(refreshToken, res)

        if (!refreshResult.decoded) {
          res
            .status(401)
            .json({ error: refreshResult.error || 'Authentication failed' })
          return
        }

        decodedToken = refreshResult.decoded
      } else {
        // Token is invalid (not expired)
        res.status(403).json({ error: 'Invalid token' })
        return
      }
    }

    const admin = await getAdminById(decodedToken.id)
    if (!admin || !admin.isSuperAdmin) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    if (!req.body) req.body = {}
    req.body.admin = decodedToken
    next()
  } catch (err) {
    console.error('Token verification error:', err)
    res.status(403).json({ error: 'Forbidden' })
    return
  }
}
