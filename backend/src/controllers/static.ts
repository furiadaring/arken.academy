import { Request, Response } from 'express'

export const getBook = async (_req: Request, res: Response) => {
  const path = require('path')
  res.sendFile(
    path.resolve(__dirname, '../../public/Book_of_strong_decisions.pdf')
  )
}
