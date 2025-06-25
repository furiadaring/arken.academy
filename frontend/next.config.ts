import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // images: {
  //   formats: ['image/webp'],
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  //   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  //   qualities: [80, 100],
  // },

  experimental: {
    optimizePackageImports: ['next-intl'],
  },
}

const withNextIntl = createNextIntlPlugin('./src/i18/request.ts')
export default withNextIntl(nextConfig)
