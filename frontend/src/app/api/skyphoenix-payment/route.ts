// import { auth } from '@/auth'
import { encryptEmail } from '@/lib/utils'
import { createHmac } from 'crypto'
import { NextResponse } from 'next/server'
import axios from 'redaxios'
const email = process.env.SKYPHOENIX_EMAIL
const secretKey = process.env.SKYPHOENIX_SECRET_KEY
const baseUrl = process.env.SKYPHOENIX_PAYMENT_URL
const skyphoenixPublicKey = process.env.SKYPHOENIX_PUBLIC_KEY

export async function POST(request: Request) {
  try {
    if (!email || !secretKey || !baseUrl || !skyphoenixPublicKey) {
      throw new Error(
        'SKYPHOENIX_EMAIL or SKYPHOENIX_SECRET_KEY or SKYPHOENIX_PAYMENT_URL or SKYPHOENIX_PUBLIC_KEY is not defined',
      )
    }
    // const session = await auth()
    // if (!session || !session.user || !session.user.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    const { amount, currency } = await request.json()
    console.log({ amount, currency })

    function getHashingString(str: string, key: string): string {
      const hmac = createHmac('sha256', key)
      hmac.update(str)
      return hmac.digest('hex')
    }

    const time = Math.floor(Date.now() / 1000) //+ 86400 // + 1 day (86400 seconds)
    const sign_str = `${time}${email}`
    const sign = getHashingString(sign_str, secretKey)
    console.log({ sign })
    const headers = {
      'Content-Type': 'application/json',
      'X-App-Access-Sig': sign,
      Accept: 'application/json, text/plain',
      'X-App-Access-Ts': String(time),
      'X-App-Token': skyphoenixPublicKey,
    }
    console.log({ headers })

    try {
      const encryptedEmail = encryptEmail(email)

      console.log({ encryptedEmail })

      const reqBody = {
        status: 'new_order',
        amount_currency_out: amount,
        currency_out: currency,
        currency_in: 'USDT',
        amount_currency_in: 0,
        preferred_bank: '',
        comment: 'Deposit',
        incoming_id: encryptedEmail,
        back_link: `${process.env.AUTH_URL}/account/my-packages`,
      }
      console.log({ reqBody })

      const fullUrl = `${baseUrl}/api/v2/neworder`
      console.log('Making request to:', fullUrl)

      const response = await axios.post(fullUrl, reqBody, {
        headers,
      })

      const data = await response.data
      console.log({ data })

      return NextResponse.json({ result: data.result, order_id: data.order_id, payment_detail: data.payment_detail })
    } catch (error) {
      console.error('Error in encryption or request:', error)
      throw error
    }
  } catch (error) {
    console.error('Payment System SKYPHOENIX Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
