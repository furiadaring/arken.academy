// import bcrypt from 'bcrypt'

import { TUser } from '@/types'

export const createColumns = (images: string[], columnCount: number): string[][] => {
  if (!images.length) return []

  const columns: string[][] = []

  for (let i = 0; i < columnCount; i++) {
    const offset = i % images.length
    const reordered = [...images.slice(offset), ...images.slice(0, offset)]
    const repeated = [...reordered, ...reordered, ...reordered, ...reordered]
    columns.push(repeated)
  }

  return columns
}

export const formatRichText = (text: string) => {
  const match = text.match(/<b>([^<]+)<\/b>\s*(.*)/)
  const match2 = text.match(/<p>([^<]+)<\/p>\s*(.*)/)

  if (match) {
    return {
      label: match[1],
      value: match[2],
    }
  }

  if (match2) {
    return {
      label: match2[1],
      value: match2[2],
    }
  }

  return {
    label: '',
    value: text,
  }
}

export const getUsersForManager = (users: TUser[], startIndex: number) =>
  users.map((user: TUser, index: number) => {
    const parts = user.email.split('@')
    let formattedEmail = '-'
    if (parts.length === 2) {
      const username = parts[0]
      const domain = parts[1]
      const maskedUsername = username.substring(0, 3) + '•'.repeat(Math.min(username.length - 3, 10))
      formattedEmail = `${maskedUsername}@${domain}`
    }
    return {
      ...user,
      email: formattedEmail,
      number: (index + startIndex + 1).toString(),
    }
  })
