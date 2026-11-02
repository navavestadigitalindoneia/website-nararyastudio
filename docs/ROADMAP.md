# Nararya Studio implementation roadmap

This roadmap follows the supplied Nararya Studio master specification. A visible page is not considered a completed business feature: each module must be connected, authorized, persisted, and tested.

## Phase 1 — Foundation (started)

- [x] Next.js App Router and TypeScript project structure
- [x] Responsive visual foundation and navigation
- [x] Public homepage, store shell, services, request information, portfolio, journal, FAQ
- [x] Reduced-motion support
- [x] No fabricated product prices, inventory, orders, reviews, or portfolio entries
- [ ] Install and verify dependencies in a runtime environment

## Phase 2 — Data and identity

- [ ] PostgreSQL and Prisma schema/migrations
- [ ] User registration, login, logout, password hashing, session rotation/revocation
- [ ] Google OAuth authorization-code flow and state validation
- [ ] Staff roles and backend RBAC
- [ ] Audit log foundation

## Phase 3 — Store and transactions

- [ ] Product/category/version/license/compatibility management
- [ ] Search, filters, pagination, bundles, wishlist, coupons
- [ ] Server-authoritative cart and checkout pricing
- [ ] Order and invoice records
- [ ] Manual payment configuration
- [ ] Midtrans adapter, signature verification, idempotent webhook processing
- [ ] Protected digital delivery and download history

## Phase 4 — Services and customer operations

- [ ] Database-backed service catalog and configurable pricing types
- [ ] Custom request intake and NS-REQ identifiers
- [ ] Quotation lifecycle and expiry
- [ ] Revision history and protected deliverables
- [ ] Customer dashboard, notifications, support tickets, reviews

## Phase 5 — Content and intelligence

- [ ] Portfolio and project case studies
- [ ] Blog/CMS
- [ ] Ten-language content coverage and Arabic RTL
- [ ] Server-side OpenAI assistant grounded in database/API data
- [ ] Admin writing assistance

## Phase 6 — Operations and release

- [ ] Analytics and finance reports
- [ ] Private object storage and validated uploads
- [ ] Email/Discord/WhatsApp/push provider integrations
- [ ] Scraper configuration, safe crawling limits, provenance and deduplication
- [ ] Unit, integration, Playwright E2E, and security regression tests
- [ ] CI workflow: schema, generation, syntax, typecheck, tests, production build
- [ ] Deployment, monitoring, backup, and incident procedures

## Acceptance rule

A module is complete only after its user flow, backend/API, database persistence, permissions, loading/error/empty states, tests, and production configuration are verified. A commit alone is not evidence of production readiness.
