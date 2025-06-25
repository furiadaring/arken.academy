import { Request, Response } from 'express'

export const getBook = async (_req: Request, res: Response) => {
  const path = require('path')
  res.sendFile(path.resolve(__dirname, '../../public/alphabit_edu_book.pdf'))
}
