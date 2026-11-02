# Nararya Studio

Nararya Studio is an independent digital creative studio bringing together a digital product store, creative services, custom requests, and a project portfolio.

## Current status

This repository is being built in phases. The first foundation commit establishes the Next.js App Router project, responsive visual system, public navigation, and initial public-facing pages.

**Important:** the current catalog and portfolio are intentionally empty until real records are supplied through the planned database-backed admin tools. No sample prices, fabricated sales, or invented customer reviews are presented as business data.

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- Lucide React

## Getting started

1. Install Node.js (LTS) and npm.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure services as they are implemented.
4. Start development: `npm run dev`
5. Type-check: `npm run typecheck`
6. Verify a production build: `npm run build`

## Public routes

- `/` — Studio homepage
- `/store` — Digital product catalog shell
- `/services` — Creative services
- `/request` — Custom request information
- `/portfolio` — Project archive
- `/blog` — Studio journal
- `/faq` — Frequently asked questions

## Business rules

- Kodename Base, ACC, and Addons remain distinct product categories.
- Kodename products are not to be relabeled as mods.
- Prices and availability must come from the database and be calculated/validated server-side.
- Payment success must be confirmed by a verified provider notification, not a browser redirect.
- Product delivery must use protected, expiring access.
- Customer and admin data must be scoped by authenticated identity and backend authorization.

## API foundation

- `GET /api/health` — application and database connectivity status.
- `POST /api/auth/register` — create a customer account with a scrypt password hash.
- `POST /api/auth/login` — authenticate and issue a 7-day HTTP-only session cookie.
- `POST /api/auth/logout` — revoke the current session.
- `GET /api/auth/me` — return the authenticated user's safe profile.
- `POST /api/auth/sessions/revoke-all` — revoke all sessions for the signed-in user.

Authentication mutation routes enforce same-origin requests and database-backed rate limits. Production requires a `SESSION_SECRET` of at least 32 characters. The session cookie is HTTP-only, Secure in production, SameSite=Strict, and the database stores only a hash of the random session token.

## Production integrations not yet enabled

Database and Prisma models, customer authentication, staff RBAC, checkout, Midtrans, private file storage, email/notification providers, AI assistant, CMS persistence, analytics, and end-to-end security tests remain planned work. Do not deploy this foundation as a live commerce system until those modules are implemented and verified.

See [docs/ROADMAP.md](docs/ROADMAP.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
