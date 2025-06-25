import { TAdmin, TTableColumn, TUser } from '@/types'
// import { decryptPassword } from './helpers'

const unknown = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.1 14.4H9.9V12.6H8.1V14.4ZM9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2ZM9 3.6C7.011 3.6 5.4 5.211 5.4 7.2H7.2C7.2 6.21 8.01 5.4 9 5.4C9.99 5.4 10.8 6.21 10.8 7.2C10.8 9 8.1 8.775 8.1 11.7H9.9C9.9 9.675 12.6 9.45 12.6 7.2C12.6 5.211 10.989 3.6 9 3.6Z" fill="white"/>
</svg>
`
const none = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 1.81286L16.1871 0L9 7.18714L1.81286 0L0 1.81286L7.18714 9L0 16.1871L1.81286 18L9 10.8129L16.1871 18L18 16.1871L10.8129 9L18 1.81286Z" fill="#FF0000"/>
</svg>`
export const userColumns: TTableColumn<TUser & { number: string }>[] = [
  { key: 'number', header: '№', width: 40 },
  {
    key: 'name',
    header: 'Пользователь',
    width: 200,
    render: (value: string, row: TUser & { number: string }) => {
      // Create HTML string for name with email below it
      return `<div style="display: flex; flex-direction: column;">
        <span style="font-weight: 500;">${value}</span>
        <span style="font-size: 0.75rem; color: #9ca3af;">${row.email}</span>
      </div>`
    },
  },
  {
    key: 'createdAt',
    header: 'Дата авторизации',
    width: 150,
    render: (value: string) => {
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString('ru-RU')
      }
      return String(value || unknown)
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
      return unknown
    },
  },
  {
    key: 'payedAmount',
    header: 'Сумма',
    width: 100,
    render: (value: string) => (value ? `$${value}` : unknown),
  },
  {
    key: 'packageType',
    header: 'Пакет',
    width: 120,
    render: (value: string) => value || unknown,
  },
  {
    key: 'office',
    header: 'Офис',
    width: 100,
    render: (_: string, row: TUser & { number: string }) => row.officeName || unknown,
  },
  {
    key: 'promocode',
    header: 'Промокод',
    width: 100,
    render: (_: string, row: TUser & { number: string }) => row.promocode?.code || none,
  },
]

export const adminColumns: TTableColumn<TAdmin>[] = [
  {
    key: 'username',
    header: 'Имя пользователя',
    width: 150,
  },
  {
    key: 'password',
    header: 'Пароль',
    width: 120,
    render: () => '******',
  },
  {
    key: 'officeName',
    header: 'Офис',
    width: 120,
  },
  {
    key: 'createdAt',
    header: 'Дата создания',
    width: 120,
    render: (value: string) => {
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString('ru-RU')
      }
      return String(value || '')
    },
  },
  {
    key: 'isActive',
    header: 'Статус',
    width: 100,
    render: (_value: string, row: TAdmin) => (row.isActive ? 'Активен' : 'Не активен'),
  },
]
