import { prisma } from '@/config/prisma'
import bcrypt from 'bcrypt'

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } })
}

export const createUserFromOAuth = async (
  email: string,
  name: string,
  phoneNumber: string
) => {
  return prisma.users.create({
    data: {
      email,
      name,
      phoneNumber,
    },
  })
}

export const createUserWithPassword = async (
  email: string,
  name: string,
  hashedPassword: string
) => {
  return prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })
}

export const updateUser = async (data: {
  email: string
  name: string
  packageType?: 'BASE' | 'PRO' | 'PROFI' | 'MASTER' | 'VIP'
  promocodeName?: string
  phoneNumber?: string
  payedAmount?: number
  payedAt?: Date
  officeName?: string
  passwordResetToken?: string
  passwordResetExpiresAt?: Date
}) => {
  console.log({ data })
  let office = data.officeName
  let validPromocodeName: string | undefined = undefined

  if (data.promocodeName) {
    console.log('promocodeName', data.promocodeName)
    const result = await prisma.promocodes.findUnique({
      where: { code: data.promocodeName },
      select: { officeName: true },
    })
    if (result) {
      office = result.officeName
      validPromocodeName = data.promocodeName
    }
  }
  return await prisma.users.upsert({
    where: { email: data.email },
    update: {
      packageType: data.packageType,
      promocodeName: validPromocodeName,
      phoneNumber: data.phoneNumber,
      payedAmount: data.payedAmount,
      payedAt: data.payedAt,
      officeName: office,
      name: data.name,
      passwordResetToken: data.passwordResetToken,
      passwordResetExpiresAt: data.passwordResetExpiresAt,
    },
    create: {
      email: data.email,
      name: data.name ?? '',
      packageType: data.packageType,
      promocodeName: validPromocodeName,
      phoneNumber: data.phoneNumber,
      payedAmount: data.payedAmount,
      payedAt: data.payedAt,
      officeName: office,
      passwordResetToken: data.passwordResetToken,
      passwordResetExpiresAt: data.passwordResetExpiresAt,
    },
  })
}

export const bindUserToOffice = async (userId: string, officeName: string) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      officeName: officeName,
    },
  })
}

export const getUsers = async (params?: {
  withoutPromocode?: boolean
  office?: string
  paid?: boolean
  page?: number
  pageSize?: number
}) => {
  // Default page size to 20 if not provided
  const pageSize = params?.pageSize || 20
  const page = params?.page || 1
  const skip = (page - 1) * pageSize

  // Get total count for pagination metadata
  const totalCount = await prisma.users.count({
    where: {
      ...(params?.withoutPromocode && {
        OR: [{ promocodeName: null }, { promocodeName: '' }],
      }),
      ...(params?.office && {
        officeName: params.office,
      }),
      ...(params?.paid && {
        payedAt: {
          not: null,
        },
      }),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Get paginated users
  const users = await prisma.users.findMany({
    include: {
      promocode: {
        select: {
          code: true,
          office: { select: { name: true } },
        },
      },
    },
    where: {
      ...(params?.withoutPromocode && {
        OR: [{ promocodeName: null }, { promocodeName: '' }],
      }),
      ...(params?.office && {
        officeName: params.office,
      }),
      ...(params?.paid && {
        payedAt: {
          not: null,
        },
      }),
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    users,
    pagination: {
      total: totalCount,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      hasNextPage: page < Math.ceil(totalCount / pageSize),
      hasPreviousPage: page > 1,
    },
  }
}
export const getUserByToken = async (token: string) => {
  return await prisma.users.findFirst({
    where: {
      password: {
        not: null,
      },
      passwordResetToken: token,
      passwordResetExpiresAt: {
        gte: new Date(),
      },
    },
  })
}

export const checkFirstLogin = async (email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        lastLoginAt: true,
      },
    })

    if (!user) {
      return { isFirstLogin: false }
    }

    const isFirstLogin = !user.lastLoginAt

    if (isFirstLogin) {
      await prisma.users.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
        },
      })
    }

    return {
      isFirstLogin,
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    console.error('Error checking first login:', error)
    return { isFirstLogin: false }
  }
}

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await getUserByToken(token)

  if (!user) {
    return null
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.users.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpiresAt: null,
    },
  })

  return await prisma.users.findUnique({
    where: { id: user.id },
  })
}

export const getAdminById = async (id: string) => {
  return await prisma.admins.findUnique({
    where: { id },
  })
}
