# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Businesses that want to show their products online without running a shop.** Small and medium businesses of any sector (hardware, apparel, books, garden...) that need a clean public catalog of what they offer, and a simple admin area to keep it current. They are the audience of the landing page.
- **Visitors** of each business's public catalog: anonymous people browsing products, searching, filtering and sending an Inquiry.
- **Platform Admin**: the person who runs the platform and creates each Tenant and its first Admin.

## Product Purpose

A general-purpose, multi-tenant product catalog: each Tenant manages its products from an admin area and its Visitors browse them in a public catalog at `/{tenantSlug}`. It shows products; it does not sell them. Success for a business is a catalog that looks good, is easy to keep up to date and brings Inquiries.

## Positioning

A catalog, not a shop: no prices, cart, checkout, orders or stock to manage. Any kind of business fits because products carry their own Attributes (no fixed product types). The pitch is "show everything you make, without the e-commerce baggage".

## Operating Context

- There is no self-service sign-up: a Platform Admin creates each Tenant and invites its first Admin.
- The Landing page lives at the site root `/`. Its primary action is **"Try the demo"** ("Probar la demo" in Spanish), which opens one of the Demo tenants created by the Demo seeder (epic #157): `forja-hardware`, `lino-apparel`, `folio-books`. The design system is `DESIGN.md` (ADR 0015).
- Admins sign in at `/login`.

## Capabilities and Constraints

Confirmed capabilities (see `docs/functional/`): Products with SKU, up to 5 Images, Attributes and Categories; Draft/Published/Archived status; Featured products; bulk actions; CSV import/export; Tenant profile with Logo and Brand color; public search, filters, sorting, list and grid views; product page with Related products; Inquiry form and inbox; Product view statistics and Dashboard; Old slugs keep links working; per-Tenant Sitemap and page metadata; team invitations.

Constraints: free-tier infrastructure (ADR 0005); React SPA without server-side rendering (ADR 0013); public pages must not import admin code.

Languages: the Landing page is in English and Spanish, following the browser language (English by default); a switcher lets the visitor change it, and that choice is remembered and prevails. The rest of the interface is English.

Open decisions:
- A way for interested businesses to ask for access (there is no sign-up). Today the Landing page only offers "Try the demo" and "Sign in".

## Brand Commitments

- **Name: Just Looking** (chosen by Mookie on 2026-11-18). The pun: "just looking" is what a shopper says when browsing without buying, which is exactly the product: a catalog with no cart. "Catalog" remains the code name in the code (projects, namespaces, API, database); the GitHub repository is `mookie-studio/just-looking`.
- Logo: a shop window (a yellow awning over a window) on a rounded tile, followed by the name (files in `web/public/brand/`). Visual language shared with EntryHub, with a petrol ink; see `DESIGN.md` and ADR 0016.

## Evidence on Hand

- Demo Tenants with ~30 products each and public-domain/CC0 photos (Demo seeder, epic #157, in progress).
- No customers, testimonials, metrics, pricing or press. Never invent them.

## Product Principles

1. Show, don't sell: every message is about presenting products well, never about transactions.
2. Any business fits: examples must span several sectors, never one vertical.
3. The demo is the proof: let people browse a real catalog instead of reading claims.
4. Free and simple to run: nothing that implies paid tiers or infrastructure that does not exist.
