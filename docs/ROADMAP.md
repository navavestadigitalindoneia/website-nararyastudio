# Nararya Studio implementation roadmap

This roadmap follows the supplied master specification. A visible page is not considered a completed business feature: each module must be connected, authorized, persisted, and tested.

## Phase 1 — Foundation (implemented in branch; verification pending)

- [x] Next.js App Router and TypeScript project structure
- [x] Responsive visual foundation and navigation
- [x] Public homepage, store shell, services, request information, portfolio, journal, FAQ
- [x] Reduced-motion support
- [x] No fabricated catalog prices, sales, orders, reviews, or portfolio records
- [ ] Install and verify dependencies in CI

## Phase 2 — Core system (in progress)

- [x] PostgreSQL Prisma schema for the main business entities
- [x] Explicit product category and lifecycle enums
- [x] Database client singleton
- [x] Database-aware health endpoint
- [x] Initial security response headers
- [x] GitHub Actions schema/typecheck/build workflow
- [ ] Create and review initial database migration
- [x] Password hashing with scrypt and secure database-backed sessions
- [x] Registration, login, logout, current-user, and revoke-all session APIs
- [x] Database-backed rate limiting and same-origin protections on auth mutations
- [x] Staff role definitions and reusable role-check helpers
- [ ] Staff RBAC enforcement on admin endpoints and audit event service
- [ ] Automated tests for auth and authorization

## Phase 3 — Store and transactions

- [ ] Database-backed catalog, product details, versions, licenses, compatibility
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
