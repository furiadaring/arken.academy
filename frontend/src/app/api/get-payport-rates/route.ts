import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const url = process.env.PAYPORT_RATE_URL
  const apiKey = process.env.PAYPORT_RATE_API_KEY

  try {
    if (!url || !apiKey) {
      throw new Error('PAYPORT_RATE_URL or PAYPORT_RATE_API_KEY is not defined')
    }
    const { amount, currency } = await request.json()

    // if (!amount || typeof amount !== 'string' || isNaN(Number(amount)) || Number(amount) <= 0) {
    //   console.error('Invalid amount provided')
    //   return NextResponse.json({ error: 'Invalid amount provided' }, { status: 400 })
    // }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ amount: Number(amount), currency: 'USD', merchant_expense: 1, exact_currency: false }),
    })
    const rateData = await response.json()
    const amounts = rateData.data.map((item: { temp_amount: number; currency: string }) => {
      if (item.currency === currency) {
        return item.temp_amount
      }
      return 0
    })

    const maxAmount = Math.max(...amounts.filter((a: unknown): a is number => typeof a === 'number'))

    return NextResponse.json({ amount: maxAmount })
  } catch (error) {
    console.error('Error fetching rate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
