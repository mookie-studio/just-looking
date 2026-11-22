# The product is called Just Looking, and DESIGN.md is its design system

> The look described here (palette, type, logo, dark theme) is superseded by [ADR 0016](0016-design-system-in-entryhub-language.md). The name and where the brand applies still stand.

Catalog needs a public face: a name, a logo and a landing page at `/` that presents the product and opens the demo (ADR 0014). The public name is **Just Looking**: "just looking" is what a shopper says when browsing without buying, and the product shows products without prices, cart or checkout. "Catalog" stays the code name of the .NET projects, namespaces, the API and the database, so nothing in the code is renamed. (The GitHub repository itself was later renamed from `mookie-studio/catalog` to `mookie-studio/just-looking`, on 2026-11-19; the code name is unchanged.)

The look is "the hang tag": product data on card-stock tags hanging from a string, the price covered by a stamp that says "Just looking". Plum, mustard and lilac; Archivo with its width axis and Martian Mono for data; a wordmark whose two "o" are eyes. `DESIGN.md` at the repository root is the single source of truth (every token with its light and dark value, the contrast of every text pair, the type scale, components and logo rules), and `web/public/brand/` holds the logo files. The SPA's tokens in `web/src/index.css` must match `DESIGN.md`; a change to the system changes `DESIGN.md` first.

Where it applies: the landing page carries the full brand (plum in both themes, English and Spanish by browser language, with a switcher whose choice is remembered); sign-in, admin and platform use the app theme (light and dark) with the brand in details; in a Tenant's public catalog the Tenant leads (its Logo and Brand color), and Just Looking appears only as a footer link.

## Considered Options

- **Keep the stock shadcn/ui theme**: rejected; it gives the product no identity and the demo no front door.
- **Rename the code to Just Looking**: rejected; large, risky churn for no user value.
- **A separate marketing site**: rejected; a second deployment on free-tier infrastructure (ADR 0005) for one page. The landing is a route of the SPA with no API calls.

## Consequences

- Without server-side rendering (ADR 0013) the landing page's text is rendered by the browser; its title and description are set by the page like other public pages.
- Fonts load from Google Fonts at run time; offline development falls back to system fonts.
- Only the landing page is bilingual; the rest of the interface stays English.
