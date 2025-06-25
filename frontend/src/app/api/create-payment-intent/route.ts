import { auth } from '@/auth'
import { encryptEmail } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
export async function POST(request: NextRequest) {
  try {
    if (!process.env.PUBLIC_ENCRYPTION_KEY) {
      throw new Error('PUBLIC_ENCRYPTION_KEY is not defined')
    }
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { amount, packageName } = await request.json()
    const encryptedEmail = encryptEmail(session?.user?.email)
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        email: encryptedEmail,
        packageName,
      },
    })
    console.log({ paymentIntent })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Internal Error:', error)
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
