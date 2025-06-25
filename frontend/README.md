# A.Academy

## Page Structure

The application is organized using Next.js App Router with route groups and layouts for different user roles.

### Main Structure

- `[locale]` - Internationalization wrapper (supports multiple languages)
  
### User-facing Pages

- **Public Pages**
  - `/packages` - Available course packages
  - `/login` - User login page

- **Protected Pages** (require authentication)
  - `/payment-details` - Payment form for package purchase
  - `/checkout` - Order confirmation after payment
  - `/account` - User dashboard
    - `/account/my-packages` - User's purchased packages
    - `/account/all-packages` - All available packages
    - `/account/faq` - Frequently asked questions

### Admin Pages

- **Super Admin**
  - `/super/login` - Admin login
  - `/super/dashboard` - Admin dashboard
    - `/super/dashboard/users` - User management
    - `/super/dashboard/roles` - Role management
    - `/super/dashboard/payments` - Payment tracking

- **Manager Pages**
  - `/super/manager/my-clients` - Clients assigned to the manager
  - `/super/manager/all-clients` - All clients in the system
  - `/super/manager/without-promocode` - Clients without promocodes

### Layout Structure

The application uses nested layouts:
- Root layout (`[locale]/layout.tsx`)
  - User layout (`[locale]/(user-layout)/layout.tsx`)
    - Protected layout (`[locale]/(user-layout)/(protected)/layout.tsx`)
      - Account layout (`[locale]/(user-layout)/(protected)/account/layout.tsx`)
  - Admin layout (`[locale]/(admin)/super/dashboard/layout.tsx`)
    - Manager layout (`[locale]/(admin)/super/manager/layout.tsx`)

## Technologies

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- next-intl for internationalization
- Server Actions for form handling
- Zod for validation