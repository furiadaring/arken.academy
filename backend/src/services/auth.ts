import { generateTokens } from '@/lib/helpers'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma'

export const managerLogin = async (data: {
  username: string
  password: string
}) => {
  const manager = await prisma.admins.findUnique({
    where: {
      username: data.username,
    },
  })
  if (!manager) return null
  const isPasswordValid = await bcrypt.compare(data.password, manager.password)
  if (!isPasswordValid || !manager) return null
  const { accessToken, refreshToken } = generateTokens(manager)
  await prisma.admins.update({
    where: {
      id: manager.id,
    },
    data: {
      refreshToken: refreshToken,
    },
  })
  return { ...manager, accessToken, refreshToken }
}

export const managerLogout = async (refreshToken: string) => {
  await prisma.admins.update({
    where: {
      refreshToken: refreshToken,
    },
    data: {
      refreshToken: null,
    },
  })
}

export const refreshToken = async (refreshToken: string) => {
  console.log('Refresh token service called with token:', refreshToken)
  
  // First try to find by exact match
  let manager = await prisma.admins.findUnique({
    where: {
      refreshToken,
    },
  })
  
  if (!manager) {
    console.log('No manager found with exact refresh token match')
    
    // If no exact match, try to find by decoded token ID
    try {
      const jwt = await import('jsonwebtoken')
      const { env } = await import('@/config/env')
      
      if (!env.accessTokenSecret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined')
      }
      
      const decoded = jwt.verify(refreshToken, env.accessTokenSecret)
      if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
        console.log('Found valid token with ID:', decoded.id)
        
        manager = await prisma.admins.findUnique({
          where: {
            id: decoded.id as string,
          },
        })
        
        if (manager) {
          console.log('Found manager by ID, current refreshToken:', manager.refreshToken)
        }
      }
    } catch (error) {
      console.error('Error decoding refresh token:', error)
      return null
    }
  }
  
  if (!manager) {
    console.log('No manager found after all attempts')
    return null
  }
  
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(manager)
  console.log('Generated new tokens for manager:', manager.id)
  
  await prisma.admins.update({
    where: {
      id: manager.id,
    },
    data: {
      refreshToken: newRefreshToken,
    },
  })
  
  return { accessToken, refreshToken: newRefreshToken }
}
