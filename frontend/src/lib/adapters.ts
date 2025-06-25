import { TDataAdapter, TUser } from '@/types'

export const userAdapter: TDataAdapter<TUser & { number: string }, TUser[]> = {
  adapt: (rawData) =>
    rawData.map((user, index) => ({
      ...user,
      number: (index + 1).toString(),
    })),
  getColumns: () => [
    { key: 'number', header: '№', width: 60 },
    { key: 'name', header: 'Имя', width: 150 },
    {
      key: 'createdAt',
      header: 'Дата авторизации',
      width: 150,
      render: (value: string) => {
        if (typeof value === 'string') {
          return new Date(value).toLocaleDateString('ru-RU')
        }
        return String(value || '')
      },
    },
    {
      key: 'payedAt',
      header: 'Дата оплаты',
      width: 150,
      render: (value: string) => {
        if (typeof value === 'string') {
          const date = new Date(value)
          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} | ${date.toLocaleDateString('ru-RU')}`
        }
        return '-'
      },
    },
    {
      key: 'payedAmount',
      header: 'Сумма',
      width: 100,
      render: (value: string) => (value ? `$${value}` : '-'),
    },
    {
      key: 'packageType',
      header: 'Пакет',
      width: 120,
      render: (value: string) => value || 'Базовый',
    },
    {
      key: 'office',
      header: 'Офис',
      width: 100,
      render: () => 'Юг',
    },
    {
      key: 'email',
      header: 'Email',
      className: 'hidden md:block',
      render: (value: string) => {
        if (!value) return '-'
        const parts = value.split('@')
        if (parts.length !== 2) return value

        const username = parts[0]
        const domain = parts[1]
        const maskedUsername = username.substring(0, 3) + '•'.repeat(Math.min(username.length - 3, 10))

        return `${maskedUsername}@${domain}`
      },
    },
  ],
}
