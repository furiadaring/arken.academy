import 'module-alias/register'

import { env } from '@/config/env'
import { payportWebhook, stripeWebhook } from '@/controllers/webhooks'
import { authLimiter, globalLimiter } from '@/middlewares/limiters'
import router from '@/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'

const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? env.siteUrl
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
  })
)

const rawBodyParser = (
  req: Request,
  _res: Response,
  buf: Buffer,
  _encoding: string | undefined
) => {
  if (
    req.originalUrl.includes('payport') ||
    req.originalUrl.includes('stripe')
  ) {
    ;(req as any).rawBody = buf
  }
}

app.use(
  '/api/v1/webhooks/stripe',
  express.raw({ type: 'application/json', verify: rawBodyParser })
)

app.use(
  '/api/v1/webhooks/payport',
  express.raw({
    type: 'application/x-www-form-urlencoded',
    verify: rawBodyParser,
  })
)

app.use(
  express.json({
    limit: '1mb',
  })
)

app.post(
  '/api/v1/webhooks/stripe',
  express.raw({ type: 'application/json', verify: rawBodyParser }),
  stripeWebhook
)
app.post(
  '/api/v1/webhooks/payport',
  express.raw({
    type: 'application/x-www-form-urlencoded',
    verify: rawBodyParser,
  }),
  payportWebhook
)

// Apply global limiter to all routes
app.use(globalLimiter)

// Apply special limiters to specific routes
app.use('/api/v1/auth/login', authLimiter)
app.use('/api/v1/auth/register', authLimiter)
app.use('/api/v1/auth/reset-password', authLimiter)

// Mount the main router
app.use('/api/v1', router)
app.use('/static', express.static('public'))

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`)
})

export default app
