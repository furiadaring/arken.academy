import { TCurrency } from '@/types'

export const superLinks = [
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/users',
    label: 'Все пользователи',
  },
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/payments',
    label: 'Платежи',
  },
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/dashboard/roles',
    label: 'Роли и доступы',
  },
]

export const managerLinks = [
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/all-clients',
    label: 'Все пользователи',
  },
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/without-promocode',
    label: 'Без промокода',
  },
  {
    href: '/CAcQARoXChVhY2N0XzFSNnhpbUdyRUZJd2pibWIovqfFwgYyBoJN/manager/my-clients',
    label: 'Мои клиенты',
  },
]
export const accessTokenExpiresIn = 15 * 60 * 1000
export const refreshTokenExpiresIn = 7 * 24 * 60 * 60 * 1000

export const variablesStripe = {
  colorPrimary: '#a3e635',
  colorBackground: '#000201',
  fontFamily: 'var(--font-primary)',
  borderRadius: '25px',
  fontSizeSm: '12px',
  fontSizeMd: '16px',
  colorText: '#ffffffff',
  colorDanger: '#dc3545',
  colorSuccess: '#a3e635',
  spacingUnit: '4px',
  spacingGridRow: '20px',
}

export const currencies: TCurrency[] = ['UZS', 'KZT', 'TRY', 'USD'] //'KGS','RUB',
export const PAYPORT_CURRENCIES: TCurrency[] = ['UZS', 'KZT']
export const GETPAY_CURRENCIES: TCurrency[] = ['TRY']

export const fixedRates: Record<string, number> = {
  USD: 1,
  // RUB: 0.0127, // ~79 RUB за 1 USDT (актуальный курс на июнь 2025)
  KZT: 0.002, // ~510 KZT за 1 USDT (актуальный курс на июнь 2025)
  // KGS: 0.0115, // ~87 KGS за 1 USDT (актуальный курс на июнь 2025)
  TRY: 0.0256, // ~39 TRY за 1 USDT (актуальный курс на июнь 2025)
  UZS: 0.000078, // ~12800 UZS за 1 USDT (актуальный курс на июнь 2025)
}

export const apiAuthPrefix = 'api'
export const publicRoutes = ['/', '/login', '/policy', '/terms', '/packages']
export const authRoutes = ['/login']
export const DEFAULT_LOGIN_REDIRECT = '/login'
