import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const seedUsers = async () => {
  for (let i = 0; i < 100; i++) {
    await prisma.users.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@gmail.com`,
        password: '123456',
      },
    })
  }
}

if (require.main === module) {
  seedUsers()
    .catch(e => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      console.log('Seeding completed')
      await prisma.$disconnect()
    })
}
