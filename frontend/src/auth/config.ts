import { api } from '@/lib/api'
import { registerSchema } from '@/types'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Yandex from 'next-auth/providers/yandex'

export const authConfig: NextAuthConfig = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    Google,
    Yandex,
    Credentials({
      id: 'register',
      name: 'Register',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const validatedData = registerSchema.safeParse({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          })

          if (!validatedData.success) {
            const errors = validatedData.error.errors.map((error) => error.message)
            throw new Error(errors.join(', '))
          }

          const registerResponse = await api.post('/users/signup', {
            name: validatedData.data.name,
            email: validatedData.data.email,
            password: validatedData.data.password,
          })

          if (!registerResponse.data) {
            throw new Error('Registration failed: No data received')
          }

          if (registerResponse.data.error) {
            throw new Error(registerResponse.data.error)
          }

          return {
            id: registerResponse.data.id,
            name: registerResponse.data.name,
            email: registerResponse.data.email,
          }
        } catch (error: unknown) {
          console.error('Registration error:', error)
          const errorMessage = error instanceof Error ? error.message : 'Registration failed'
          throw new Error(errorMessage)
        }
      },
    }),
    {
      id: 'mailru',
      name: 'MailRu',
      type: 'oauth',
      clientId: process.env.MAILRU_CLIENT_ID,
      clientSecret: process.env.MAILRU_CLIENT_SECRET,
      authorization: {
        url: 'https://oauth.mail.ru/login',
        params: {
          scope: 'userinfo',
          state: 'RANDOM_STRING',
        },
      },
      token: {
        url: 'https://oauth.mail.ru/token',
      },
      userinfo: {
        url: 'https://oauth.mail.ru/userinfo',
      },
      checks: ['state'],
      profile(profile) {
        return {
          id: profile.email,
          name: profile.name,
          email: profile.email,
          image: profile.image,
        }
      },
    },
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await api.post('/users/login', {
            email: credentials.email,
            password: credentials.password,
          })

          if (response.status === 200) {
            const user = response.data
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            }
          }

          throw new Error('Invalid credentials')
        } catch (error: unknown) {
          console.error('Auth error:', error)
          const errorMessage = error instanceof Error ? error.message : 'Invalid credentials'
          throw new Error(errorMessage)
        }
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async signIn(params) {
      try {
        if (params.account?.provider === 'credentials' || params.account?.provider === 'register') {
          if (params.account?.provider === 'register' && params.profile?.email) {
            try {
              await fetch(`${process.env.AUTH_URL}/api/send-greetings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: params.profile.name || '',
                  email: params.profile.email,
                }),
              })
            } catch (emailError) {
              console.error('Failed to send welcome email:', emailError)
            }
          }
          return true
        }

        const { profile } = params

        if (!profile?.email) {
          console.error('No profile or email found in OAuth sign in')
          return true
        }

        try {
          const userResponse = await api.post('/users/signin', {
            email: profile.email,
            name: profile.name,
            phoneNumber: profile.phone_number,
          })

          if (userResponse?.data) {
            try {
              const checkFirstLoginResponse = await fetch('/api/check-first-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: profile.email }),
              })

              const firstLoginData = await checkFirstLoginResponse.json()

              if (firstLoginData?.isFirstLogin && profile.email) {
                try {
                  await fetch(`${process.env.AUTH_URL}/api/send-greetings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: profile.name || '',
                      email: profile.email,
                    }),
                  })
                } catch (emailError) {
                  console.error('Failed to send welcome email:', emailError)
                }
              }
            } catch (error) {
              console.error('Error checking first login:', error)
            }
          }
        } catch (apiError) {
          console.error('Error in API call during signIn:', apiError)
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (token.id) session.user.id = token.id as string
        if (token.name) session.user.name = token.name as string
        if (token.email) session.user.email = token.email as string
        if (token.image) session.user.image = token.image as string
      }
      return session
    },
    authorized() {
      return true
    },
  },
}
