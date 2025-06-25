import { Request, Response } from 'express'
import * as service from '../services/packages'

export const getPackages = async (req: Request, res: Response) => {
  const packages = await service.getPackages()
  res.json(packages)
}

export const getUserPackages = async (req: Request, res: Response) => {
  const packages = await service.getUserPackages(req.body.email)
  res.json(packages)
}
