import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const API_KEY = process.env.RESEND_API_KEY

if (!API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(API_KEY)

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { name: string; email: string }
    console.log({ body })
    const response = await resend.emails.send({
      from: 'info@arkenacademy.com',
      to: body.email,
      subject: 'Welcome to Arken Academy',
      html: `<p>Hello ${body.name}!</p>
    <p>You successfully registered on the educational platform arken Academy.</p>
    <p>Your account has been created. Now you can:</p>
    <ul>
      <li>Get access to your personal cabinet</li>
      <li>Learn about the training program</li>
      <li>Choose the appropriate training package</li>
    </ul>
    <p>👉 Go to your personal account: <a href="http://arkenacademy.com/account/all-packages">Login to the academy</a></p>
    <p>Training materials become available after activating one of the packages. We consciously excluded meaningless «free introductions» — the course only includes what really works.</p>
    <p>With respect,<br />
    Arken Academy Team</p>`,
    })
    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    })
  }
}
