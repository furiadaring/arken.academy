import { api } from '@/lib/api'
import crypto from 'crypto'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'
const API_KEY = process.env.RESEND_API_KEY

if (!API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(API_KEY)

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { email: string }
    console.log({ body })
    const resetToken = crypto.randomBytes(20).toString('hex')
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const passwordResetExpiresAt = new Date(Date.now() + 1000 * 60 * 10)

    const updatedUser = await api.post('/users', {
      email: body.email,
      passwordResetToken,
      passwordResetExpiresAt,
    })
    console.log({ updatedUser })
    const response = await resend.emails.send({
      from: 'support@arken.academy',
      to: body.email,
      subject: 'Arken Academy | Сброс пароля',
      html: `<p>Hello!</p>
      <p>You requested a password reset on the educational platform Arken Academy.</p>
      <p>For password reset, click the link: ${process.env.AUTH_URL}/reset-password/${updatedUser.data.passwordResetToken}</p>
      <p>If you did not request a password reset, please ignore this message.</p>
      <p>With respect,<br />
      Arken Academy Team</p>`,
    })
    console.log({ response })
    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    })
  }
}
