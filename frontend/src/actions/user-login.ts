'use server'

import { signIn } from '@/auth'
import { loginSchema } from '@/types'

type TLoginState = {
  message: string
  data: {
    email: string
    password: string
  }
}

export const loginUser = async (_prevState: TLoginState | null, formData: FormData) => {
  const email = (formData.get('email') as string) || ''
  const password = (formData.get('password') as string) || ''

  try {
    const validatedData = loginSchema.safeParse({ email, password })

    if (!validatedData.success) {
      const errors = validatedData.error.errors.map((error) => error.message)
      const errorMessage = errors.join(', ')

      return {
        message: errorMessage,
        data: { email, password: '' },
      }
    }

    try {
      const result = await signIn('credentials', {
        email: validatedData.data.email,
        password: validatedData.data.password,
        redirect: false,
      })

      console.log('Login result:', result)

      if (result?.error) {
        // Преобразуем технические ошибки в понятные сообщения
        let errorMessage = result.error

        if (result.error.includes('CredentialsSignin')) {
          errorMessage = 'Invalid credentials'
        }

        return {
          message: errorMessage,
          data: { email, password: '' },
        }
      }
    } catch (signInError: unknown) {
      console.error('SignIn error:', signInError)
      return {
        message: 'Invalid credentials',
        data: { email, password: '' },
      }
    }
    try {
      try {
        const response = await fetch(`${process.env.AUTH_URL}/api/check-first-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: validatedData.data.email }),
        })

        const data = await response.json()

        if (data.isFirstLogin) {
          try {
            await fetch(`${process.env.AUTH_URL}/api/send-greetings`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: data.name || '',
                email: validatedData.data.email,
              }),
            })
            console.log('Welcome email sent successfully')
          } catch (emailError) {
            console.error('Failed to send welcome email:', emailError)
          }
        }
      } catch (checkError) {
        console.error('Error checking first login:', checkError)
      }

      return {
        message: 'success',
        data: { email, password: '' },
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        message: error instanceof Error ? error.message : 'Login failed',
        data: { email, password: '' },
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      message: error instanceof Error ? error.message : 'Registration failed',
      data: { email, password: '' },
    }
  }
}
