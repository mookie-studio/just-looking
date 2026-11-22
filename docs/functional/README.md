# Functional documentation

What Catalog does, feature by feature, written for the people who use, test, demo or operate it. Every rule, limit and message described here is enforced by the API and covered by its tests. Terms follow [GLOSSARY.md](../../GLOSSARY.md); read it first.

| Guide | For | Covers |
| --- | --- | --- |
| [Platform Admin](./platform-admin.md) | The person who runs the platform | Creating, deactivating and renaming Tenants, inviting the first Admin |
| [Access and team](./access-and-team.md) | Admins | Invitations, sign-in, team management, how the Tenant is decided |
| [Catalog setup](./catalog-setup.md) | Admins | Attribute Definitions, Categories, Tenant profile (Logo, Brand color) |
| [Products](./products.md) | Admins | Creating, editing, status, Images, Featured, Duplicate, Bulk actions, CSV import and export |
| [Dashboard, Inquiries and statistics](./dashboard-inquiries-and-stats.md) | Admins | The Dashboard, the Inquiry inbox, Product views |
| [Landing page](./landing-page.md) | Visitors, testers | The page at `/` that presents Just Looking, its first screen with "Try the demo", its two languages and the language switcher |
| [Public catalog](./public-catalog.md) | Visitors, testers | Browsing, search, filters, sorting, views, product page, Related products, Inquiries, Old slugs, SEO |
| [Rules and limits](./rules-and-limits.md) | Everyone | Every size, length and count limit in one place |
| [API reference](./api-reference.md) | Developers | Every endpoint, its parameters and its error codes |

Infrastructure: [local development](../local-development.md), [deployment](../deployment.md) and the step-by-step [infrastructure setup](../infra-setup.md). Demo: [loading and resetting the demo data](../demo.md) and the [demo script](../demo-script.md). Decisions and their reasons: [ADRs](../adr).

## What Catalog is

A general-purpose, multi-tenant product catalog platform. It shows products; it does not sell them: there are no prices, carts, orders or stock, and no variants or product types (differences such as size or color are Attributes of the same product).

```
Platform Admin ──creates──▶ Tenant ◀──manages── Admin(s)
                              │
                              └── public catalog at /{tenantSlug} ◀── Visitors (anonymous)
```

## The three kinds of person

| Who | Signs in? | Sees | Address |
| --- | --- | --- | --- |
| **Visitor** | No | Only the Published products of one Tenant | `/{tenantSlug}`, `/{tenantSlug}/p/{productSlug}` |
| **Admin** | Yes (invited) | Everything of exactly one Tenant | `/admin/...` |
| **Platform Admin** | Yes (configured by user id) | The list of Tenants, never a Tenant's catalog data | `/platform/...` |

## Rules that hold everywhere

- **Isolation.** A Tenant's data is never visible from another Tenant. An Admin's Tenant comes from their session, never from anything they send. A resource of another Tenant answers **404** (never 403), so its existence does not leak.
- **Nothing is deleted by accident.** Tenants are never deleted (they are deactivated). Products are archived instead of deleted. Deleting an Attribute Definition, Option or Category asks for confirmation or is refused when it would lose data.
- **Everything is paginated.** Lists take `page` (1-based) and `pageSize` (default 20, at most 50) and answer `{ items, page, pageSize, totalCount }`. The only exceptions are the Category trees and the public filters, which are returned whole because a tree cannot be split into pages.
- **Errors.** Invalid input is a 400 with a field-by-field list of problems, a missing or foreign resource is 404, a uniqueness clash is 409 (the response names the field in conflict), too many requests is 429 with a `Retry-After` header.
- **Dates** are UTC. **Ids** are GUIDs.
- **Appearance.** The interface has one (light) theme. Colours, type and components follow the design system in [DESIGN.md](../../DESIGN.md). The browser tab shows "Just Looking" and its app icon (the hang-tag mark). The sign-in and invitation pages show a violet Just Looking panel beside the form on wide screens (from 860px; on phones only the form, under the wordmark). The admin and platform headers show the Just Looking wordmark before the Tenant name (or "Platform"). Empty lists (products, Categories, Attribute Definitions, Inquiries, Tenants) show a small drawn empty shop window, what will appear there and how to add the first one. Unknown addresses show "Page not found" with a "Nothing to see here" stamp and a link to the home page.
- **Interface language.** The interface and all documentation are in English, except the [landing page](./landing-page.md), which is in English and Spanish. Public full-text search uses the Spanish dictionary ([ADR 0006](../adr/0006-attributes-in-jsonb-and-native-search.md)).
