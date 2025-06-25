import { JSX, ReactNode } from 'react'
import z from 'zod'
import { Locale } from './i18'

export type TItem = {
  title: string
  subtitle: string
}

export type TVerticalCarouselProps = {
  images: string[]
  className?: string
  columnCount: number
  imageSize?: number
}

export type TFaqItem = {
  question: string
  answer: string
}

export type TOffice = {
  id: string
  name: string
  createdAt: string
}
export type TPromocode = {
  id: string
  code: string
  discount: number
  packageName: string
  officeId: string
  createdAt: string
  office: TOffice
}

export type TUser = {
  id: string
  email: string
  name: string
  packageType: string | null
  promocodeId: string | null
  officeName: string | null
  promocode: Pick<TPromocode, 'code' | 'office'> | null
  payedAmount: number | null
  payedAt: string | null
  createdAt: string
}

export type TAdmin = {
  id: string
  username: string
  password: string
  isSuperAdmin: boolean
  officeName: string
  isActive: boolean
  createdAt: string
}

export type TTableColumn<T = string> = {
  key: string
  header: string
  width?: number
  render?: (value: string, row: T) => ReactNode
  className?: string
}

export type TTableRow = {
  id: string
}
export type TIconType = 'edit' | 'check' | 'close'

export type TAppTableProps<T extends TTableRow = TTableRow, R = unknown> = {
  columns?: TTableColumn<T>[]
  data?: T[]
  onEdit?: (id: string, row: T) => void
  onDelete?: (id: string) => void
  onAdd?: (id?: string, newRow?: T) => void
  iconBeforeRow?: (row: T) => TIconType | null
  offices?: TOffice[]
  className?: string
  headerClassName?: string
  rowClassName?: string
  cellClassName?: string
  actionLabel?: string
  expandable?: boolean
  renderExpandedRow?: (row: T) => ReactNode
  emptyMessage?: string
  adapter?: TDataAdapter<T, R>
  rawData?: R
  editingRows?: string[]
}

export type TDataAdapter<T extends TTableRow, R = unknown> = {
  adapt: (rawData: R) => T[]
  getColumns: (rawData: R) => TTableColumn<T>[]
}

export type TLinks = {
  href: string
  label: string
  icon?: () => JSX.Element
}

export type TCardProps = {
  icon: string
  title: string
  subtitle: string
  features: string[]
  price: string
  name: string
}

export type TPromo = { code: string; discount: string }

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const paymentDataFSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
  email: z.string().email({ message: 'Неверный email' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Неверный номер телефона' })
    .refine((value) => phoneRegex.test(value), { message: 'Неверный номер телефона' }),
  country: z.string().min(2, { message: 'Страна должна содержать не менее 2 символов' }),
  payedAmount: z.string().transform((value) => Number(value)),
  promocodeName: z.string().optional(),
  packageName: z.string(),
})

export type TFormState = {
  data: z.infer<typeof paymentDataFSchema>
  message: string
  errors: Record<keyof z.infer<typeof paymentDataFSchema>, string[]> | null
}

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is required' }),
})
export type TRegisterFormState = {
  data: z.infer<typeof registerSchema>
  error?: string
}

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is required' }),
})
export type TLoginFormState = {
  data: z.infer<typeof loginSchema>
  error?: string
}

export type TOptions = {
  mode: 'payment'
  amount: number
  currency: string
}

export type TCurrency = 'UZS' | 'RUB' | 'KZT' | 'KGS' | 'TRY' | 'USD'

export type TPolicy = {
  title: string
  subtitle: string
  items: TPolicySection[]
}
export type TPolicySection = {
  title: string
  subtitle?: string
  items?: (string | { title: string; subtitle?: string; items?: string[] })[]
}

export type TExternalPaymentFormProps = {
  amount: number
  currency: TCurrency
  locale?: Locale
}

export type TPaginationData = {
  total: number
  pageSize: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type TSearchparamsPaginationData = {
  searchParams: Promise<{ page?: string; pageSize?: string }>
}

export type TUsersPaginationData = {
  users: TUser[]
  pagination: TPaginationData
}
