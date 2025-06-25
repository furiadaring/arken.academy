import { addAdmin, deleteAdmin, getAdmins } from '@/controllers/admins'
import { managerLogin, managerLogout, refreshToken } from '@/controllers/auth'
import { addOffice, getOffices } from '@/controllers/offices'
import { getPackages, getUserPackages } from '@/controllers/packages'
import {
  createPromocode,
  getPromocodes,
  verifyPromocode,
} from '@/controllers/promocodes'
import { getBook } from '@/controllers/static'
import {
  bindUserToOffice,
  checkFirstLogin,
  getUserByToken,
  getUsers,
  loginUser,
  resetPassword,
  signInUser,
  signUpUser,
  updateUser,
} from '@/controllers/users'
import { skyphoenixWebhook } from '@/controllers/webhooks'
import { authenticateAdmin, authenticateManager } from '@/middlewares/auth'
import { Router } from 'express'

const router = Router()

// Auth
router.post('/auth/login', managerLogin)
router.post('/auth/logout', managerLogout)
router.post('/auth/refresh', refreshToken)

// Users
router.post('/users', updateUser)
router.post('/users/signin', signInUser)
router.post('/users/signup', signUpUser)
router.post('/users/login', loginUser)
router.post('/users/token', getUserByToken)
router.post('/users/reset-password', resetPassword)
router.post('/users/check-first-login', checkFirstLogin)
router.get('/users', authenticateManager, getUsers)
router.post('/users/bind-to-office', bindUserToOffice)

// Admins
router.get('/admins', authenticateAdmin, getAdmins)
router.post('/admins', authenticateAdmin, addAdmin)
router.delete('/admins/:id', authenticateAdmin, deleteAdmin)

// Offices
router.get('/offices', authenticateManager, getOffices)
router.post('/offices', authenticateManager, addOffice)

// Promocodes
router.post('/promocodes', authenticateManager, createPromocode)
router.get('/promocodes', getPromocodes)
router.post('/promocodes/verify', verifyPromocode)

// Packages
router.get('/packages', getPackages)
router.post('/packages/user', getUserPackages)

//Static
router.get('/book', getBook)

//Webhooks
router.post('/webhooks/skyphoenix', skyphoenixWebhook)

export default router
