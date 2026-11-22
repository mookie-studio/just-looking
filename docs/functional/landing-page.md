# Landing page

The landing page presents **Just Looking** (the public name of Catalog) to people who have never seen it, and sends them to the demo. It lives at `/`. Brand and look: [DESIGN.md](../../DESIGN.md) and [ADR 0015](../adr/0015-just-looking-brand-and-design-system.md). The page has a first screen, four sections under it and a footer, all described below.

## First screen

What a visitor sees on opening `/`, without scrolling (checked at 1366×768 and 390×844):

- **Top bar**: the Just Looking logo (the reversed wordmark: the hang-tag mark and the name), which links to `/`; the EN/ES [language switcher](#language-switcher); and a **Sign in** button ("Entrar" in Spanish) that links to `/login`.
- **Headline**: "Let them look at everything they want." ("Que miren todo lo que quieran."), with one word on a highlighter-yellow band, then a short paragraph saying what Just Looking does.
- **The name, explained**: a small "Just looking" stamp followed by "What you say in a shop when you only want to browse." (in Spanish: "«Solo mirando»: lo que dices en una tienda cuando solo quieres mirar."). The stamp keeps the English name in both languages; the line explains it.
- **Try the demo** ("Probar la demo"): the main button, shaped like a tag. It opens the demo catalog of the Demo tenant `forja-hardware` (`/forja-hardware`). Under it, a small note: "3 example shops · no sign-up" ("3 tiendas de ejemplo · sin registro").
- **Three hang tags** hanging from a rail, one Featured product from each Demo tenant, alternating highlighter yellow and pale violet. Each tag shows the shop and its trade, the product name, three of its attributes and the "Just looking" stamp, and the whole tag is a link to that shop's catalog:

| Tag | Links to |
| --- | --- |
| Forja · hardware: Cordless drill driver 18 V | `/forja-hardware` |
| Lino · apparel: Linen shirt dress | `/lino-apparel` |
| Folio · books: The Lighthouse Keeper's Daughter | `/folio-books` |

Rules and limits:

- The page ground is always the violet ink (`landing-ground`).
- The tag contents are fixed texts copied from the Demo dataset into `landing-copy.ts`; the landing page makes **no API calls**, so it works even when the API is down. The links only lead somewhere useful when the Demo tenants have been seeded (see [ADR 0014](../adr/0014-demo-data-seeded-through-the-api.md) and [deployment](../deployment.md)); otherwise the catalog pages show "Page not found".
- On wide screens the text and the tags sit side by side; under 860px wide the tags go below the button. When there is not room for three full-size tags, they shrink and overlap so none is cut off; there is no horizontal scrolling down to 360px wide.
- The tags sway gently and stop when hovered or focused; with reduced motion turned on in the system, they do not move.
- The browser tab title and the page description (used by search engines and link previews) come from the texts in the current language.

## Below the first screen

Scrolling down, the visitor finds, in this order (every text in the current language):

1. **One tag, two sides** ("Una etiqueta, dos caras"). One large pale-violet tag. Its front lists what a visitor of a catalog sees: photos of every product, its attributes side by side, search and filters, and an inquiry form. A **Turn the tag** button ("Dar la vuelta") flips it to the back, which lists what the business edits: products and their images, Categories and attributes, Featured products, import from a CSV file, and its logo and brand color. Pressing the button again turns it back. The button shows whether the tag is turned (`aria-pressed`), and screen readers and the keyboard only reach the side that is showing. The flip takes 0.4 seconds; with reduced motion turned on it changes side at once.
2. **Any business, its own attributes** ("Cualquier negocio, con sus propios atributos"). The three Demo tenants as tags on a rail, each with one line on what its catalog describes, and a **See its catalog** link ("Ver su catálogo"):

| Tag | Line | Links to |
| --- | --- | --- |
| Forja · hardware | Power, voltage and weight for every tool. | `/forja-hardware` |
| Lino · apparel | Sizes, colors and season for every garment. | `/lino-apparel` |
| Folio · books | Author, pages and formats for every book. | `/folio-books` |

3. **What it does not do** ("Lo que no hace"). A short block with the "Just looking" stamp: no prices, no cart, no payments, no stock; Just Looking shows the products and passes inquiries on to the business.
4. **See it with real products.** ("Míralo con productos de verdad."). The closing call, with the **Try the demo** button again (also to `/forja-hardware`).

Only features that exist today are listed. On phones the tags of the rail stack one under another.

## Footer

A deep-ink band at the bottom of the page:

- On the left: the Just Looking logo (links to `/`), a **Sign in** link ("Entrar") to `/login`, and the current year.
- On the right (below the rest on phones): the maker's credit, **A product by** ("Un producto de") above the mookie studio logo. The logo links to mookie studio on GitHub, https://github.com/mookie-studio, in a new tab. Its files are mookie studio's own, unchanged (see [DESIGN.md](../../DESIGN.md), mookie studio credit).

There are no social links and no legal pages.

## Language

The landing page is the only page in two languages, **English** and **Spanish**. The rest of the interface (public catalog, admin, platform, sign-in) stays in English.

How the language is chosen, in order:

1. **The visitor's own choice wins.** If the visitor picked a language with the switcher before, on this browser, the page opens in that language, whatever the browser says.
2. **Otherwise the browser decides.** The page looks at the browser's preferred languages in order and takes the first one that is English or Spanish: Spanish for `es`, `es-ES`, `es-MX` and every other Spanish variant, English for every English variant. Languages that are neither are skipped.
3. **Otherwise English.** When the browser lists no English or Spanish language (or none at all), the page is in English.

Examples:

| Browser languages | Saved choice | Page language |
| --- | --- | --- |
| `es-ES` | none | Spanish |
| `es-MX`, `en` | none | Spanish |
| `en-GB`, `es` | none | English |
| `fr-FR`, `es` | none | Spanish |
| `fr-FR` | none | English |
| none | none | English |
| `es-ES` | English | English |
| `en-US` | Spanish | Spanish |
| `es-ES` | any other value | Spanish (the value is ignored) |

## Language switcher

- Two buttons in the landing's top bar, **EN** and **ES** (screen readers announce them as "English" and "Español"). The current language is the pressed one (`aria-pressed="true"`).
- Pressing one switches every text of the page at once, without reloading, and saves the choice.
- The choice is saved in the browser's local storage under the key `jl.landingLanguage` (value `en` or `es`). It stays on that browser until the visitor clears its site data; it does not follow the visitor to other browsers or devices, and nothing is sent to the API.
- When the browser blocks storage (private windows, blocked site data), the switcher still changes the language for the current visit; the next visit follows the browser rule again.
- While the landing page is open, the page's `<html lang>` is set to the current language (`en` or `es`), so screen readers and translators read it correctly. Leaving the landing page puts the previous value back.

## Texts

All texts live in `web/src/features/landing/landing-copy.ts`, one object per language with the same keys (a missing translation fails the build). Fixed texts agreed with the product owner:

| | English | Spanish |
| --- | --- | --- |
| Primary button | Try the demo | Probar la demo |
| Stamp on the tags | Just looking | Solo mirando |
| Headline | Let them look at everything they want. | Que miren todo lo que quieran. |
| The name, explained (after a "Just looking" stamp in both languages) | What you say in a shop when you only want to browse. | «Solo mirando»: lo que dices en una tienda cuando solo quieres mirar. |

The texts state only what Catalog does today. They never mention prices, customers, figures or features that do not exist. Product names on the demo tags are the Demo dataset's own names and are not translated; their attribute labels are.
