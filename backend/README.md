# Academy API

A robust RESTful API for managing an educational platform with comprehensive user management, payment processing, and administrative capabilities.

## ✨ Features

- **User Management**

  - Registration and authentication
  - Role-based access control (Admin, Manager, User)
  - Profile management

- **Administration**

  - Multi-level admin system
  - Office management
  - User assignment and tracking

- **E-commerce**

  - Package management
  - Promo code system with flexible discounting
  - Payment processing (Stripe integration)
  - Transaction history

- **Security**

  - JWT authentication
  - Role-based authorization
  - Secure password hashing
  - CSRF protection

- **Developer Experience**
  - Comprehensive API documentation
  - TypeScript support
  - Environment-based configuration
  - Docker support

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/) (v1.0+)
- **Framework**: [Express.js](https://expressjs.com/) (v4.18+)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (v15+)
- **ORM**: [Prisma](https://www.prisma.io/) (v5.0+)
- **Authentication**: JWT with refresh tokens
- **Validation**: Zod schema validation
- **API Documentation**: OpenAPI/Swagger
- **Payment Processing**: [Stripe API](https://stripe.com/)
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm (v8+)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [Docker](https://www.docker.com/) & Docker Compose
- [pnpm](https://pnpm.io/) (v8+)
- [Node.js](https://nodejs.org/) (v18+ LTS)

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/arken.academy.git
   cd arken.academy/backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update the values in `.env` according to your setup

   Required environment variables:

   ```env
   # Server
   PORT=8000
   NODE_ENV=development

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/academy_db

   # Security
   JWT_SECRET=your-jwt-secret
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   ENCRYPTION_KEY=your-encryption-key

   # Stripe
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-webhook-secret

   # Cookies
   COOKIE_PREFIX=a-
   COOKIE_SECURE=false
   ```

### Database Setup

1. Start PostgreSQL using Docker:

   ```bash
   docker compose up -d postgres
   ```

2. Run database migrations:

   ```bash
   pnpm prisma migrate dev
   ```

3. Generate Prisma client:
   ```bash
   pnpm prisma generate
   ```

### Running the Application

For development:

```bash
pnpm dev
```

For production:

```bash
pnpm build
pnpm start
```

### Running Tests

```bash
pnpm test
```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

- Swagger UI: `http://localhost:8000/api/v1/api-docs`
- OpenAPI JSON: `http://localhost:8000/api/v1/api-docs-json`

The documentation includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## 🗃️ Database Schema

The database schema is managed using Prisma. Key entities include:

- **Users**: Platform users and their profiles
- **Admins**: Administrative users with different permission levels
- **Offices**: Physical locations/branches
- **Packages**: Course packages and subscriptions
- **Promocodes**: Discount and promotional codes
- **Transactions**: Payment records
- **Sessions**: User authentication sessions

To view or update the database schema, check the `prisma/schema.prisma` file.

## 💳 Payment Processing

The API integrates with Stripe for secure payment processing:

- Credit/debit card payments
- Recurring subscriptions
- Webhook support for payment events
- Secure customer data handling

### Webhook Endpoints

- `POST /api/v1/webhooks/stripe` - Stripe webhook handler

## 🚀 Deployment

### Docker Deployment

1. Build and start all services:

   ```bash
   docker compose up -d --build
   ```

2. Run database migrations:

   ```bash
   docker compose exec app pnpm prisma migrate deploy
   ```

3. View logs:
   ```bash
   docker compose logs -f
   ```

### Environment Variables

For production, ensure these environment variables are properly set:

- `NODE_ENV=production`
- `COOKIE_SECURE=true`
- `COOKIE_DOMAIN=yourdomain.com`
- `DATABASE_URL` (production database)
- `REDIS_URL` (if using Redis for sessions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the arken Academy team
- Special thanks to all contributors

3. The API will be available at `http://localhost:8000`.

### Option 2: Using the Deployment Script

1. Create a project archive:

   ```bash
   ./create-archive.sh
   ```

2. Transfer the `project.zip` file to your server.

3. Run the deployment script:

   ```bash
   ./deploy.sh
   ```

4. The script will:

   - Extract the project files
   - Install Docker and Docker Compose if needed
   - Start the application using Docker Compose

5. The API will be available at `http://localhost:8000`.

## Environment Variables

| Variable                      | Description                  |
| ----------------------------- | ---------------------------- |
| PORT                          | Server port (default: 8000)  |
| DATABASE_URL                  | PostgreSQL connection string |
| ENCRYPTION_KEY                | Key used for encryption      |
| JWT_SECRET                    | Secret for JWT tokens        |
| ACCESS_TOKEN_SECRET           | Secret for access tokens     |
| REFRESH_TOKEN_SECRET          | Secret for refresh tokens    |
| COOKIE_PREFIX                 | Prefix for cookies           |
| STRIPE_SECRET_KEY             | Stripe API secret key        |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | Stripe public key            |

## Scripts

- `pnpm start` - Start the production server using Bun
- `pnpm dev` - Start the development server with hot reloading
- `pnpm seed:all` - Seed the database with initial data
- `pnpm db:drop` - Drop all database tables

## Webhook Endpoints

### Payport Webhook

- **Endpoint**: `/api/v1/webhooks/payport`
- **Method**: POST
- **Query Parameters**: `email` (required)
- **Body**: Contains payment status and amount

### Stripe Webhook

- **Endpoint**: `/api/v1/webhooks/stripe`
- **Method**: POST
- **Headers**: `stripe-signature` (required)
- **Body**: Stripe event payload

## License

ISC
