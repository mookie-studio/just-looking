# Catalog

Repository: [mookie-studio/just-looking](https://github.com/mookie-studio/just-looking) (named `catalog` until 2026-11-19). Public name: **Just Looking** ([ADR 0015](./docs/adr/0015-just-looking-brand-and-design-system.md)). Design system: [DESIGN.md](./DESIGN.md) ([ADR 0016](./docs/adr/0016-design-system-in-entryhub-language.md)).

A general-purpose, multi-tenant product catalog platform: each business (tenant) manages its products from an admin area, and its visitors browse them in a public catalog. It does not sell: no prices, cart, orders or stock.

- **API**: .NET 10 with minimal APIs, organized in vertical slices, EF Core on PostgreSQL.
- **Web**: React + Vite + TypeScript SPA.

## Documentation

- [docs/functional](./docs/functional/README.md): what every feature does, with all rules and limits, for Platform Admins, Admins and Visitors; plus an API reference.
- [GLOSSARY.md](./GLOSSARY.md): the domain language. Use it in code and conversation.
- [docs/adr](./docs/adr): architecture decisions.
- [docs/local-development.md](./docs/local-development.md): running Catalog locally, with .NET Aspire (recommended, [ADR 0010](./docs/adr/0010-aspire-for-local-orchestration.md)) or docker compose.
- [docs/infra-setup.md](./docs/infra-setup.md): step-by-step production infrastructure setup, portal only, ending in a checklist to verify it.
- [docs/deployment.md](./docs/deployment.md): how CI deploys the API and the SPA.
- [docs/demo.md](./docs/demo.md): loading and resetting the demo data with the Demo seeder, and the [demo script](./docs/demo-script.md).
