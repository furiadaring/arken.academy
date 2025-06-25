import { auth } from '@/auth'
import { encryptEmail } from '@/lib/utils'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PAYPORT_API_KEY
const PAYMENT_URL = process.env.PAYPORT_PAYMENT_URL
const MERCHANT_ID = process.env.PAYPORT_MERCHANT_ID

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY || !PAYMENT_URL || !MERCHANT_ID) {
      throw new Error('PAYPORT_API_KEY or PAYPORT_PAYMENT_URL or PAYPORT_MERCHANT_ID is not defined')
    }
    const session = await auth()
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const formData = await request.formData()
    const amountRaw = formData.get('amount')
    const convertedAmountRaw = formData.get('convertedAmount')
    const currency = formData.get('cur')?.toString().toUpperCase() || 'RUB'
    const locale = formData.get('locale')?.toString() || 'en'

    if (
      !convertedAmountRaw ||
      !amountRaw ||
      typeof amountRaw !== 'string' ||
      isNaN(Number(convertedAmountRaw)) ||
      Number(convertedAmountRaw) <= 0
    ) {
      return NextResponse.json({ error: 'Invalid amount provided' }, { status: 400 })
    }

    const encryptedEmail = encryptEmail(session.user.email)
    console.log({ encryptedEmail })
    const orderId = Date.now().toString()
    const params = {
      merchant_id: MERCHANT_ID,
      amount: Number(convertedAmountRaw),
      currency,
      currency2currency: 1,
      order_id: orderId,
      order_desc: 'Deposit',
      customer_id: orderId,
      return_url: `${process.env.AUTH_URL}/account/my-packages`,
      cancel_url: `${process.env.AUTH_URL}/checkout`,
      response_url: `${process.env.AUTH_URL}/account/my-packages`,
      server_url: `${process.env.AUTH_URL}/backend-api/v1/webhooks/payport?order_id=${encryptedEmail}`,
      locale,
      custom_param: `USD=${Number(amountRaw)}`,
    }

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null))
    const sortedParams = Object.fromEntries(Object.entries(filteredParams).sort(([a], [b]) => a.localeCompare(b)))

    let signature = API_KEY
    for (const [, value] of Object.entries(sortedParams)) {
      signature += `|${value}`
    }

    const finalData = {
      ...sortedParams,
      signature: crypto.createHash('sha1').update(signature).digest('hex').toLowerCase(),
    }
    const formHtml = generateFormHtml(PAYMENT_URL, finalData)
    return new NextResponse(formHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateFormHtml(url: string, data: Record<string, string | number>): string {
  let formHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Redirecting to payment gateway...</title>
      <style>
        body {
          background-color: #000201;
          color: #f7fee7;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top: 4px solid #a3e635;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="loader"></div>
      <p>Redirecting to payment gateway...</p>
      <form method="POST" action="${url}" id="paymentForm">
  `

  for (const [name, value] of Object.entries(data)) {
    const safeValue = String(value).replace(/"/g, '&quot;')
    formHtml += `<input type="hidden" name="${name}" value="${safeValue}">\n`
  }

  formHtml += `
      </form>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(function() {
            document.getElementById('paymentForm').submit();
          }, 1000);
        });
      </script>
    </body>
    </html>
  `

  return formHtml
}
