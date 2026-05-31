# Shop Server

Express + TypeScript backend for an online shop API. It uses PostgreSQL through Prisma, JWT authentication, refresh-token cookies, and role-based admin routes for catalog management.

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Prisma 7
- PostgreSQL
- JWT authentication
- Zod validation

## Features

- User registration, login, logout, and token refresh
- Access-token authentication with refresh-token cookies
- Admin-only product, category, size, and color management
- Product listing with pagination and sorting
- Product variants with size, color, stock, price, and images
- Prisma migrations and seed script

## Project Structure

```text
src/
  app.ts                 Express app, middleware, routes, error handling
  server.ts              Local server entrypoint
  controllers/           Request handlers
  routes/                API route definitions
  services/              Business logic and Prisma calls
  middlewares/           Auth, admin, validation, error handling
  validators/            Zod schemas
  lib/prisma.ts          Prisma client setup
prisma/
  schema.prisma          Database schema
  migrations/            Prisma migrations
  seed.ts                Seed script
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- PostgreSQL database
- npm

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_ACCESS_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"
```

Depending on your hosting provider, you may also use additional PostgreSQL connection variables such as `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, or pooled/unpooled database URLs. The application requires `DATABASE_URL`, `FRONTEND_URL`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`.

### Database

Apply migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Seed the database:

```bash
npm run seed
```

### Build

```bash
npm run build
```

### Run

The current start script runs the compiled server from `dist/server.js`:

```bash
npm start
```

Build the project before starting it.

## API Overview

All routes are mounted under `/api`.

### Auth

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Public | Register a user |
| `POST` | `/api/user/login` | Public | Login and receive an access token |
| `POST` | `/api/user/logout` | Authenticated | Revoke refresh token |
| `GET` | `/api/user/refresh` | Refresh cookie | Rotate refresh token and return a new access token |
| `GET` | `/api/user/all` | Admin | List users |
| `DELETE` | `/api/user/:id` | Authenticated | Reserved route |

Register and login body:

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

Passwords must be at least 8 characters and contain one uppercase letter.

### Products

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/product/:page` | Public | Get paginated products |
| `GET` | `/api/product/:idSlug` | Public | Get one product |
| `POST` | `/api/product` | Admin | Create a product |
| `DELETE` | `/api/product/:idSlug` | Admin | Delete a product |

Product listing supports optional query parameters:

```text
?orderValue=name|popularity&orderBy=asc|desc
```

Product details and deletion expect `idSlug` in this format:

```text
<uuid>-<slug>
```

Create product body:

```json
{
  "name": "Classic T-Shirt",
  "slug": "classic-t-shirt",
  "categoryId": "category-id",
  "productInfo": [
    {
      "title": "Material",
      "description": "100% cotton"
    }
  ],
  "variants": [
    {
      "isDefault": true,
      "sizeId": "size-id",
      "colorId": "color-id",
      "price": 29.99,
      "stock": 25,
      "images": [
        {
          "url": "https://example.com/image.jpg"
        }
      ]
    }
  ]
}
```

### Categories, Sizes, and Colors

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/category` | Public | List categories |
| `POST` | `/api/category` | Admin | Create category |
| `DELETE` | `/api/category/:id` | Admin | Delete category |
| `GET` | `/api/size` | Public | List sizes |
| `POST` | `/api/size` | Admin | Create size |
| `DELETE` | `/api/size/:id` | Admin | Delete size |
| `GET` | `/api/color` | Public | List colors |
| `POST` | `/api/color` | Admin | Create color |
| `DELETE` | `/api/color/:id` | Admin | Delete color |

Create body:

```json
{
  "name": "Example"
}
```

## Authentication

Protected routes require a bearer access token:

```http
Authorization: Bearer <access-token>
```

Refresh tokens are stored in an HTTP-only cookie named `refreshToken`. CORS is configured with `credentials: true`, so the frontend must send credentials with cross-origin auth requests.

## Deployment

The repository includes `vercel.json` for Vercel deployment. Configure the required environment variables in the deployment platform before deploying.

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Generate Prisma client and compile TypeScript |
| `npm start` | Run `dist/server.js` with nodemon |
| `npm run seed` | Run `prisma/seed.ts` |
