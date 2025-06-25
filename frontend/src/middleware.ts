// import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/lib/const'
// import createIntlMiddleware from 'next-intl/middleware'
// import { NextRequest, NextResponse } from 'next/server'
// import { auth } from './auth'
// import { routing } from './i18/routing'

// const intlMiddleware = createIntlMiddleware(routing)

// const authMiddleware = auth(async (req: NextRequest) => {
//   const { nextUrl } = req
//   const pathname = nextUrl.pathname

//   const session = await auth()
//   const isLoggedIn = !!session

//   const isPublicRoute = publicRoutes.includes(pathname)
//   const isAuthRoute = authRoutes.includes(pathname)

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL(`${DEFAULT_LOGIN_REDIRECT}`, nextUrl.origin))
//     }
//     return NextResponse.next()
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return NextResponse.redirect(new URL(`/login`, nextUrl.origin))
//   }

//   return NextResponse.next()
// })

// const isPublicPath = (pathname: string): boolean => {
//   return publicRoutes.some((route) => pathname.startsWith(route))
// }

// export default function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname
//   console.log('Middleware processing:', pathname)

//   const response = intlMiddleware(req)

//   if (!isPublicPath(req.nextUrl.pathname)) {
//     return (authMiddleware as unknown as (req: NextRequest) => Promise<NextResponse>)(req)
//   }

//   return response
// }

// export const config = {
//   matcher: ['/', '/((?!api|backend-api|_next|static|favicon\.ico|.*\..*).*)'],
// }
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|backend-api|trpc|_next|_vercel|.*\\..*).*)',
}
