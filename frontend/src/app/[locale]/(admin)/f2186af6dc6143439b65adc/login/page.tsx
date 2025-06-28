'use client'

import { adminLogin } from '@/actions/admin-login'
import { Button } from '@/components/shared/btn'
import { useActionState } from 'react'

export default function AdminLoginPage() {
  const [actionState, action] = useActionState(adminLogin, null)

  return (
    <section className="mx-auto flex min-h-[calc(100svh-80px)] flex-col items-center justify-center gap-6 px-3 pt-5">
      <div className="max-w-2xl">
        <h1 className="pb-15 text-center text-[32px] font-medium">Введите логин и пароль</h1>
        <form action={action}>
          {actionState?.error && <p className="pb-3 text-center text-red-500">{actionState.error}</p>}
          <div className="mb-4 space-y-4">
            <div className="relative">
              <svg
                className="absolute top-1/2 left-6 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 12C10.7 12 13.8 13.29 14 14H2C2.23 13.28 5.31 12 8 12ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                  fill="#E67935"
                />
              </svg>

              <input
                type="text"
                name="login"
                defaultValue={actionState?.login?.toString()}
                placeholder="Введите ваше имя"
                className="border-text/50 bg-background/20 w-full rounded-[64px] border py-5 pl-14"
              />
            </div>
            <div className="relative">
              <svg
                className="absolute top-1/2 left-5 -translate-y-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1469_899)">
                  <path
                    d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6ZM18 20H6V10H18V20Z"
                    fill="#E67935"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1469_899">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <input
                type="password"
                name="password"
                placeholder="Введите ваш пароль"
                className="border-text/50 bg-background/20 w-full rounded-[64px] border py-5 pl-14"
              />
            </div>
          </div>
          <Button type="submit" className="py-4">
            Подтвердить
          </Button>
        </form>
      </div>
    </section>
  )
}
