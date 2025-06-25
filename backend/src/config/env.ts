import dotenv from 'dotenv'
dotenv.config()

if (!process.env.PORT) {
  throw new Error('PORT is not defined')
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined')
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error('REFRESH_TOKEN_SECRET is not defined')
}
if (!process.env.COOKIE_PREFIX) {
  throw new Error('COOKIE_PREFIX is not defined')
}
if (!process.env.SITE_URL) {
  throw new Error('SITE_URL is not defined')
}
if (!process.env.ENCRYPTION_IV) {
  throw new Error('ENCRYPTION_IV is not defined')
}
if (!process.env.ENCRYPTION_SECRET_KEY) {
  throw new Error('ENCRYPTION_SECRET_KEY is not defined')
}
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
}
if (!process.env.SKYPHOENIX_SECRET) {
  throw new Error('SKYPHOENIX_SECRET is not defined')
}

export const env = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  cookiePrefix: process.env.COOKIE_PREFIX,
  siteUrl: process.env.SITE_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  skyphoenixSecret: process.env.SKYPHOENIX_SECRET,
  encryptionIV: process.env.ENCRYPTION_IV,
  encryptionSecretKey: process.env.ENCRYPTION_SECRET_KEY,
} as const
