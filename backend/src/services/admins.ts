import { prisma } from '@/config/prisma'
import bcrypt from 'bcrypt'

export const getAdmins = async () => {
  return await prisma.admins.findMany({
    where: {
      isSuperAdmin: false,
    },
  })
}

export const addAdmin = async (data: {
  username: string
  password: string
  officeName: string
  isActive?: boolean
}) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10)
  return await prisma.admins.upsert({
    where: {
      username: data.username,
    },
    update: {
      password: hashedPassword,
      officeName: data.officeName,
      isActive: data.isActive,
    },
    create: {
      username: data.username,
      password: hashedPassword,
      officeName: data.officeName,
      isActive: data.isActive,
    },
  })
}
export const deleteAdmin = async (id: string) => {
  return await prisma.admins.delete({
    where: {
      id: id,
    },
  })
}
