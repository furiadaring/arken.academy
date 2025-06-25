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
      from: 'info@arken.academy',
      to: body.email,
      subject: 'Добро пожаловать в Arken Academy',
      html: `<p>Здравствуйте ${body.name}!</p>
    <p>Вы успешно зарегистрировались на образовательной платформе arken Academy.</p>
    <p>Ваш аккаунт создан. Теперь вы можете:</p>
    <ul>
      <li>Получить доступ к личному кабинету</li>
      <li>Ознакомиться с программой обучения</li>
      <li>Выбрать подходящий обучающий пакет</li>
    </ul>
    <p>👉 Перейти в личный кабинет: <a href="http://arken.academy/account/all-packages">Войти в академию</a></p>
    <p>Обучающие материалы становятся доступны после активации одного из пакетов. Мы сознательно исключили бессмысленные «бесплатные вводные» — в курсе только то, что реально работает.</p>
    <p>С уважением,<br />
    Команда arken Academy</p>`,
    })
    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    })
  }
}
