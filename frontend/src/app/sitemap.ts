import { MetadataRoute } from 'next'

const baseUrl = 'https://arkenacademy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    // User layout routes
    '',
    'auth',
    'login',
    'packages',
    'policy/privacy',
    'policy/refund',

    // Protected routes
    'account/all-packages',
    'account/faq',
    'account/my-packages',
    'checkout',
    'payment-details',
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
