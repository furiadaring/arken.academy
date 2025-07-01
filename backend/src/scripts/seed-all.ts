import { Package, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

type TPackageData = {
  name: Package
  price: number
}

export const seedSuperAdmin = async (
  prismaClient?: PrismaClient
): Promise<void> => {
  const dbClient = prismaClient || prisma
  try {
    console.log('Starting to seed super admin...')
    // Use default password '123456' if env variable is not set
    const adminPassword = process.env.SUPER_ADMINS_PASSWORD || 'G6e5n4e3r2a1l'
    console.log(
      `Using ${
        process.env.SUPER_ADMINS_PASSWORD ? 'environment' : 'default'
      } password for super admin`
    )

    const adminsPassword = bcrypt.hashSync(adminPassword, 10)
    const superAdmin = await dbClient.admins.upsert({
      where: { username: 'General' },
      update: {
        password: adminsPassword,
      },
      create: {
        username: 'General',
        isSuperAdmin: true,
        isActive: true,
        password: adminsPassword,
      },
    })
    console.log(`Super admin ${superAdmin.username} created or updated`)
  } catch (error) {
    console.error('Error seeding super admin:', error)
    throw error
  } finally {
    // Отключаем соединение только если это локальный экземпляр
    if (!prismaClient) {
      await prisma.$disconnect()
    }
  }
}

export const seedPackages = async (
  prismaClient?: PrismaClient
): Promise<void> => {
  const dbClient = prismaClient || prisma
  try {
    console.log('Starting to seed packages...')

    // Define packages with their prices and discounts
    const packages: TPackageData[] = [
      { name: Package.BASE, price: 250 },
      { name: Package.PRO, price: 1000 },
      { name: Package.PROFI, price: 1500 },
      { name: Package.MASTER, price: 2000 },
      { name: Package.VIP, price: 5000 },
    ]

    // Create packages in the database
    for (const pkg of packages) {
      await dbClient.packages.upsert({
        where: { name: pkg.name },
        update: {
          price: pkg.price,
        },
        create: {
          name: pkg.name,
          price: pkg.price,
        },
      })
      console.log(`Package ${pkg.name} created or updated`)
    }

    console.log('Packages seeding completed successfully')
  } catch (error) {
    console.error('Error seeding packages:', error)
    throw error
  } finally {
    // Отключаем соединение только если это локальный экземпляр
    if (!prismaClient) {
      await prisma.$disconnect()
    }
  }
}

export const seedOffices = async (
  prismaClient?: PrismaClient
): Promise<void> => {
  const dbClient = prismaClient || prisma
  try {
    console.log('Starting to seed offices...')

    const offices: { name: string }[] = [{ name: 'One' }, { name: 'Two' }]

    for (const office of offices) {
      await dbClient.offices.upsert({
        where: { name: office.name },
        update: {},
        create: {
          name: office.name,
        },
      })
      console.log(`Office ${office.name} created or updated`)
    }

    console.log('Offices seeding completed successfully')
  } catch (error) {
    console.error('Error seeding offices:', error)
    throw error
  } finally {
    // Отключаем соединение только если это локальный экземпляр
    if (!prismaClient) {
      await prisma.$disconnect()
    }
  }
}

export const seedPromocodes = async (
  prismaClient?: PrismaClient
): Promise<void> => {
  const dbClient = prismaClient || prisma
  try {
    console.log('Starting to seed promocodes...')
    const offices = await dbClient.offices.findMany()
    const promocodes: {
      code: string
      discount: number
      package: Package
      officeName: string
    }[] = [
      {
        code: 'a100',
        discount: 150,
        package: Package.BASE,
        officeName: offices[1].name,
      },
      {
        code: 'a90',
        discount: 160,
        package: Package.BASE,
        officeName: offices[1].name,
      },
      {
        code: 'a500',
        discount: 500,
        package: Package.PRO,
        officeName: offices[1].name,
      },

      {
        code: 'c100',
        discount: 150,
        package: Package.BASE,
        officeName: offices[0].name,
      },
      {
        code: 'c90',
        discount: 160,
        package: Package.BASE,
        officeName: offices[0].name,
      },
      {
        code: 'c500',
        discount: 500,
        package: Package.PRO,
        officeName: offices[0].name,
      },
    ]

    for (const promo of promocodes) {
      await dbClient.promocodes.upsert({
        where: { code: promo.code },
        update: {
          discount: promo.discount,
          packageName: promo.package,
          officeName: promo.officeName,
        },
        create: {
          code: promo.code,
          discount: promo.discount,
          packageName: promo.package,
          officeName: promo.officeName,
        },
      })
      console.log(`Promocode ${promo.code} created or updated`)
    }

    console.log('Promocodes seeding completed successfully')
  } catch (error) {
    console.error('Error seeding promocodes:', error)
    throw error
  } finally {
    if (!prismaClient) {
      await prisma.$disconnect()
    }
  }
}

export const seedAdmins = seedSuperAdmin

if (require.main === module) {
  seedSuperAdmin()
    .then(() => {
      console.log('Seeding super admin completed')
      return seedPackages()
    })
    .then(() => {
      console.log('Seeding packages completed')
      return seedOffices()
    })
    .then(() => {
      console.log('Seeding offices completed')
      return seedPromocodes()
    })
    .then(() => {
      console.log('Seeding promocodes completed')
      process.exit(0)
    })
    .catch(error => {
      console.error('Error during seeding:', error)
      process.exit(1)
    })
}
