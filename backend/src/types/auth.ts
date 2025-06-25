export type TAdmin = {
  id: string
  username: string
  password: string
  accessToken?: string
  refreshToken?: string | null
  isSuperAdmin: boolean
  officeName: string | null
  isActive: boolean
  createdAt: Date | string
}
