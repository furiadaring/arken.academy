import { Package } from '@prisma/client'
import { prisma } from '../config/prisma'

export const createPromocode = async (data: {
  code: string
  discount: number
  packageName: Package
  officeName: string
}) => {
  return await prisma.promocodes.create({
    data: {
      code: data.code,
      discount: data.discount,
      packageName: data.packageName,
      officeName: data.officeName,
    },
  })
}

export const getPromocodes = async () => {
  return await prisma.promocodes.findMany({
    include: {
      package: true,
      office: true,
      //   users: true,
    },
  })
}

export const verifyPromocode = async (code: string, packageName: Package) => {
  return await prisma.promocodes.findUnique({
    where: {
      code,
      packageName,
    },
  })
}
