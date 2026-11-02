# Architecture notes

## Application boundaries

Nararya Studio is a standalone creative-commerce application. It is not the Nararya Garage community platform.

## Current presentation layer

- Next.js App Router pages live in `app/`.
- Shared navigation and footer live in `components/`.
- Global design tokens and responsive styling live in `app/globals.css`.
- Public pages must not invent commerce records to fill empty states.

## Data layer

PostgreSQL is accessed through Prisma. The initial schema covers users and sessions, products and media, services and requests, quotations, orders and line items, payment events, download grants, wishlist, reviews, revisions, tickets, notifications, portfolio, case studies, blog, coupons, bundles, and audit logs.

Product categories are explicit: `KODENAME_BASE`, `ACC`, `ADDONS`, and `OTHER_DIGITAL_PRODUCTS`. Kodename products are not mods.

## Planned backend boundaries

- `lib/auth`: password hashing, sessions, OAuth, authorization.
- `lib/db.ts`: Prisma client singleton.
- `lib/commerce`: catalog, cart pricing, checkout, orders, coupons.
- `lib/payments`: manual and Midtrans provider adapters, webhook verification.
- `lib/delivery`: private object storage and expiring download grants.
- `lib/requests`: custom requests, quotations, revisions.
- `lib/notifications`: in-app and external notification providers.
- `lib/ai`: server-only OpenAI integration with scoped data tools.
- `lib/audit`: append-only operational event recording.

These are target boundaries, not claims that all modules are implemented.

## Security invariants

1. Never expose provider secrets or the OpenAI key to client bundles.
2. Derive customer identity from the server session; never trust a submitted user ID.
3. Calculate prices and discounts on the server from current database records.
4. Treat payment redirects as UX only; verify provider signatures and transaction state server-side.
5. Make payment event processing idempotent.
6. Keep product files private and authorize every download.
7. Enforce staff permissions in route handlers/server actions, not only in navigation.
8. Validate and rate-limit untrusted inputs; redact secrets and personal data from logs.
9. Use database transactions for order creation, coupon usage, and state transitions.

## Runtime endpoints

- `GET /api/health`: reports application and database connectivity without exposing connection details.

## Configuration

See `.env.example`. Add only server-side secrets to the runtime environment. Public variables should be limited to values that are safe to expose in the browser.
