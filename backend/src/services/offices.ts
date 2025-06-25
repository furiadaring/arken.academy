import { prisma } from '@/config/prisma'

export const getOffices = async () => {
  return await prisma.offices.findMany({
    include: {
      promocodes: true,
    },
  })
}
export const addOffice = async (data: { name: string }) => {
  return await prisma.offices.create({
    data: {
      name: data.name,
    },
  })
}
