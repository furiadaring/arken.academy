import rateLimit from 'express-rate-limit'

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 500, // Limit each IP to 500 requests per windowMs
  standardHeaders: true, // Return limit information in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later' },
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Limit each IP to 20 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many authorization attempts, please do not try again later',
  },
})
