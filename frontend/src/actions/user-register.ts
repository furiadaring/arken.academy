'use server'

import { signIn } from '@/auth'
import { registerSchema } from '@/types'

type TRegisterState = {
  message: string
  data: {
    name: string
    email: string
    password: string
  }
}

export const registerUser = async (_prevState: TRegisterState | null, formData: FormData) => {
  const name = (formData.get('name') as string) || ''
  const email = (formData.get('email') as string) || ''
  const password = (formData.get('password') as string) || ''

  try {
    const validatedData = registerSchema.safeParse({ name, email, password })
    console.log('Register data:', validatedData)
    if (!validatedData.success) {
      const errors = validatedData.error.errors.map((error) => error.message)
      const errorMessage = errors.join(', ')

      return {
        message: errorMessage,
        data: { name, email, password: '' },
      }
    }

    try {
      console.log('Starting registration process')

      try {
        const result = await signIn('register', {
          name: validatedData.data.name,
          email: validatedData.data.email,
          password: validatedData.data.password,
          redirect: false,
        })

        console.log('SignIn result:', result)

        if (result?.error) {
          console.error('Registration error:', result.error)

          let errorMessage = result.error

          if (result.error.includes('CredentialsSignin')) {
            errorMessage = 'Invalid credentials'
          }

          return {
            message: errorMessage,
            data: { name, email, password: '' },
          }
        }

        console.log('Registration successful')

        try {
          const response = await fetch(`${process.env.AUTH_URL}/api/send-greetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: validatedData.data.name,
              email: validatedData.data.email,
            }),
          })

          if (!response.ok) {
            console.error('Failed to send welcome email:', await response.text())
          } else {
            console.log('Welcome email sent successfully')
          }
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError)
        }
      } catch (signInError) {
        console.error('SignIn error during registration:', signInError)
        return {
          message: 'Registration failed',
          data: { name, email, password: '' },
        }
      }

      return {
        message: 'success',
        data: { name, email, password: '' },
      }
    } catch (error: unknown) {
      console.error('Registration error:', error)
      return {
        message: error instanceof Error ? error.message : 'Registration failed',
        data: { name, email, password: '' },
      }
    }
  } catch (error: unknown) {
    console.error('Registration error:', error)
    return {
      message: error instanceof Error ? error.message : 'Registration failed',
      data: { name, email, password: '' },
    }
  }
}
