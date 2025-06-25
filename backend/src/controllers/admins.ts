import * as service from '@/services/admins'
import { Request, Response } from 'express'

export const getAdmins = async (_req: Request, res: Response) => {
  const admins = await service.getAdmins()
  res.json(admins)
}
export const addAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await service.addAdmin(req.body)
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await service.deleteAdmin(req.params.id)
    res.status(200).json({ message: 'Admin deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}
