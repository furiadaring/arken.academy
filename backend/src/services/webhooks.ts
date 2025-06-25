import { prisma } from '@/config/prisma'
import { Package } from '@prisma/client'

export const addPayment = async (amount: number, email: string) => {
  console.log('✅ Charge succeeded for email:', email)
  return await prisma.users.update({
    where: { email },
    data: { payedAmount: amount, payedAt: new Date() },
  })
}

export const stripeWebhook = async (
  amount: number,
  email: string,
  packageName: Package
) => {
  console.log('✅ Charge succeeded for email:', email)
  return await prisma.users.update({
    where: { email },
    data: {
      payedAmount: amount / 100,
      payedAt: new Date(),
      packageType: packageName,
    },
  })
}
