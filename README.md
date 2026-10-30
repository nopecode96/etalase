# Etalase

Etalase is a multi-tenant SaaS platform for creating branded business websites and digital storefronts for local businesses. It is designed for sectors such as automotive, property, rental, restaurant/cafe, and general services.

The platform enables each tenant to manage their own domain, showcase products or services, capture leads, and present a modern sales website with WhatsApp-based conversion flows.

## Overview

This project combines:

- Next.js 16 for the web application
- React 19 and TypeScript for the frontend
- Tailwind CSS for styling
- Prisma ORM with PostgreSQL for data persistence
- Docker support for quick local setup and deployment
- A multi-tenant architecture for multiple business clients on one platform

## Core Features

- Tenant-based storefronts with custom domains
- Business category templates for different industries
- Product and catalog management
- Gallery and testimonial sections
- Lead capture and management flow
- Admin/dashboard views for operations and team management
- WhatsApp contact CTA integration
- SEO metadata support for each tenant
- Role-based access for SaaS and client users

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Docker / Docker Compose

## Project Structure

```text
.
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── docker-entrypoint.sh
├── eslint.config.mjs
├── next.config.ts
├── nginx-vhost-etalase.conf
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── public/
│   └── assets/
├── src/
│   ├── actions/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── services/
│   └── generated/
├── tsconfig.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have installed:

- Node.js 20+
- npm
- PostgreSQL (or use Docker)
- Docker and Docker Compose (optional, but recommended for local development)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy the example environment file and adjust the values as needed:

```bash
cp .env.example .env
```

Example values:

```env
DATABASE_URL="postgresql://etalase_user:etalase_password@db:5432/etalase_db?schema=public"
PORT=3005
NODE_ENV=development
NEXTAUTH_URL="http://localhost:3005"
NEXTAUTH_SECRET="replace_with_a_secure_random_secret"
```

### 3) Generate Prisma client

```bash
npm run db:generate
```

### 4) Set up the database

If you are using Docker Compose for PostgreSQL:

```bash
docker compose up -d db
```

Then apply Prisma migrations:

```bash
npm run db:deploy
```

If you want to seed the database with initial data:

```bash
npm run db:seed
```

### 5) Run the app

Start the development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:3005
```

## Available Scripts

```bash
npm run dev       # start the development server on port 3005
npm run build     # build the project for production
npm run start     # start the production server on port 3005
npm run lint      # run ESLint
npm run db:generate
npm run db:deploy
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Docker Setup

This project includes Docker configuration for local development and deployment.

To run the full stack with PostgreSQL and the app together:

```bash
docker compose up --build
```

The app container is configured to expose port 3005 and connect to PostgreSQL using the internal Docker network.

## Database

The application uses Prisma with PostgreSQL. The schema includes models for:

- Users
- Tenants
- Categories
- Catalog items
- Galleries
- Testimonials
- Leads

You can inspect the database schema in:

```text
prisma/schema.prisma
```

## Production Notes

The app is configured with a standalone Next.js build, and the project is structured for deployment in containerized environments. For production deployment, ensure all required environment variables are set correctly and the database is available and migrated.

## License

This project does not currently include a license file. Please check with the repository owner before reuse or redistribution.

## Contributing

Contributions are welcome. If you want to improve the platform, please create a branch and submit a pull request with a clear description of the changes.

## Support

For environment or deployment issues, verify:

- the `DATABASE_URL` is correct
- PostgreSQL is running
- Prisma migrations were applied
- required env vars such as `NEXTAUTH_SECRET` are defined

