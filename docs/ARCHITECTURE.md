# Architecture notes

## Application boundaries

Nararya Studio is a standalone creative-commerce application. It is not the Nararya Garage community platform.

## Current presentation layer

- Next.js App Router pages live in `app/`.
- Shared navigation and footer live in `components/`.
- Global design tokens and responsive styling live in `app/globals.css`.
- Public pages must not invent commerce records to fill empty states.

## Planned backend boundaries

- `lib/auth`: password hashing, sessions, OAuth, authorization.
- `lib/db`: Prisma client and database access.
- `lib/commerce`: catalog, cart pricing, checkout, orders, coupons.
- `lib/payments`: manual and Midtrans provider adapters, webhook verification.
- `lib/delivery`: private object storage and expiring download grants.
- `lib/requests`: custom requests, quotations, revisions.
- `lib/notifications`: in-app and external notification providers.
- `lib/ai`: server-only OpenAI integration with scoped data tools.
- `lib/audit`: append-only operational event recording.

These are target boundaries, not claims that the modules already exist.

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

## Configuration

See `.env.example`. Add only server-side secrets to the runtime environment. Public variables should be limited to values that are safe to expose in the browser.
