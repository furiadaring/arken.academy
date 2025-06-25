import { PrismaClient } from '@prisma/client'
import {
  seedAdmins,
  seedOffices,
  seedPackages,
  seedPromocodes,
} from './seed-all'

const prisma = new PrismaClient()

async function deploy() {
  try {
    console.log('🚀 Начинаем процесс развертывания...')

    console.log('📊 Применяем миграции базы данных...')
    await prisma.$executeRaw`prisma migrate deploy`
    console.log('✅ Миграции успешно применены')

    console.log('🗑️ Очищаем базу данных...')
    await clearDatabase()
    console.log('✅ База данных очищена')

    console.log('🌱 Заполняем базу данными...')

    await seedOffices(prisma)
    await seedPackages(prisma)
    await seedPromocodes(prisma)
    await seedAdmins(prisma)

    console.log('✅ База данных успешно заполнена')
    console.log('🎉 Развертывание завершено успешно!')

    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Ошибка при развертывании:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

async function clearDatabase() {
  try {
    await prisma.$executeRaw`SET session_replication_role = 'replica';`

    await prisma.users.deleteMany({})
    await prisma.promocodes.deleteMany({})
    await prisma.packages.deleteMany({})
    await prisma.admins.deleteMany({})
    await prisma.offices.deleteMany({})

    await prisma.$executeRaw`SET session_replication_role = 'origin';`

    console.log('Все таблицы успешно очищены')
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error)
    throw error
  }
}

deploy()
