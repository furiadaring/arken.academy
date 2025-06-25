import { prisma } from '../config/prisma'

export const getPackages = async () => {
  return await prisma.packages.findMany()
}

export const getUserPackages = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      packageType: true,
      payedAt: true,
      payedAmount: true,
    },
  })
}
