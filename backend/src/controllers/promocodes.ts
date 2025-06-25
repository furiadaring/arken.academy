import { Request, Response } from 'express'
import * as service from '../services/promocodes'

// Promocodes
export const createPromocode = async (req: Request, res: Response) => {
  try {
    const promocode = await service.createPromocode(req.body)
    res.status(201).json(promocode)
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const getPromocodes = async (req: Request, res: Response) => {
  try {
    const promocodes = await service.getPromocodes()
    if (!promocodes) {
      res.status(404).json({ error: 'Promocodes not found' })
      return
    }
    res.status(200).json(promocodes)
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}

export const verifyPromocode = async (req: Request, res: Response) => {
  try {
    const promocode = await service.verifyPromocode(
      req.body.code,
      req.body.packageName
    )
    if (!promocode) {
      res.status(404).json({ error: 'Promocode not found: ' + req.body.code })
      return
    }
    res
      .status(200)
      .json({ code: promocode?.code, discount: promocode?.discount })
  } catch (error) {
    console.error({ error })
    res.status(400).json({ error: 'Bad Request: ' + error })
  }
}
