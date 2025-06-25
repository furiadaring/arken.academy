import { Request, Response } from 'express'
import * as service from '../services/offices'

export const getOffices = async (_req: Request, res: Response) => {
  const offices = await service.getOffices()
  res.json(offices)
}
export const addOffice = async (req: Request, res: Response) => {
  try {
    const office = await service.addOffice(req.body)
    res.status(201).json(office)
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}
