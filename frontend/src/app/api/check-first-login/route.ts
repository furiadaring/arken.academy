import { api } from '@/lib/api'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { email: string }

    if (!body.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 })
    }

    try {
      const userResponse = await api.post('/users/check-first-login', {
        email: body.email,
      })

      return new Response(
        JSON.stringify({
          isFirstLogin: userResponse.data?.isFirstLogin || false,
          name: userResponse.data?.name || '',
        }),
        { status: 200 }
      )
    } catch (apiError) {
      console.error('API error checking first login:', apiError)
      return new Response(
        JSON.stringify({
          error: 'Failed to check first login status',
          isFirstLogin: false,
        }),
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error checking first login status:', error)
    return new Response(JSON.stringify({ error: 'Failed to check login status', isFirstLogin: false }), {
      status: 500,
    })
  }
}
