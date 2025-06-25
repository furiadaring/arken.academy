import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const API_KEY = process.env.RESEND_API_KEY

if (!API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(API_KEY)

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { name: string; phone: string }
    console.log({ body })
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'furia.daring10@gmail.com',
      subject: 'У Вас новый запрос на консультацию от AlphaBit Academy',
      html: `<p>Имя: ${body.name}</p>
    <p>Телефон: ${body.phone}</p>`,
    })
    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    })
  }
}
