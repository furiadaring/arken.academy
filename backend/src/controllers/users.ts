import * as service from '@/services/users'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, name, phoneNumber } = req.body
    if (!email) {
      res.status(400).json({ error: 'Email is required' })
    }
    let dbUser = await service.findUserByEmail(email)
    if (!dbUser) {
      dbUser = await service.createUserFromOAuth(email, name, phoneNumber)
    }
    res.status(200).json(dbUser)
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const existingUser = await service.findUserByEmail(email)
    if (existingUser) {
      res.status(409).json({ error: 'Email already in use' })
      return
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await service.createUserWithPassword(
      email,
      name,
      hashedPassword
    )

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const user = await service.findUserByEmail(email)
    if (!user || !user.password) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await service.updateUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  // Parse pagination parameters
  const page = req.query.page ? parseInt(req.query.page as string) : 1
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 20

  const result = await service.getUsers({
    withoutPromocode: req.query.withoutPromocode === 'true',
    office: req.query.office as string,
    paid: req.query.paid === 'true',
    page,
    pageSize,
  })
  res.json(result)
}

export const bindUserToOffice = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId
    const officeName = req.body.officeName
    const user = await service.bindUserToOffice(userId, officeName)
    res.status(200).json({ user, message: 'User bound to office successfully' })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      res.status(400).json({ error: 'Token and password are required' })
      return
    }

    const user = await service.resetPassword(token, password)

    if (!user) {
      res.status(404).json({ error: 'Invalid or expired password reset token' })
      return
    }

    res.status(200).json({ message: 'Password has been reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(400).json({ error: 'Failed to reset password' })
  }
}

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      res.status(400).json({ error: 'Token is required' })
      return
    }

    const user = await service.getUserByToken(token)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Get user by token error:', error)
    res.status(400).json({ error: 'Failed to get user by token' })
  }
}

export const checkFirstLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({ error: 'Email is required' })
      return
    }

    const result = await service.checkFirstLogin(email)
    res.status(200).json(result)
  } catch (error) {
    console.error('Check first login error:', error)
    res.status(400).json({ error: 'Failed to check login status' })
  }
}
