import { Request, Response } from 'express'

export const getBook = async (_req: Request, res: Response) => {
  const path = require('path')
  res.sendFile(path.resolve(__dirname, '../../public/arken_edu_book.pdf'))
}
