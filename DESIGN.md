# Just Looking design system

The single source of truth for how Just Looking looks: colours, type, space, shape, motion, the logo and the components. Every value here is exact; the SPA's tokens (`web/src/index.css`) must match it. Decision records: [ADR 0015](docs/adr/0015-just-looking-brand-and-design-system.md) (name and brand) and [ADR 0016](docs/adr/0016-design-system-in-entryhub-language.md) (this visual language).

## The idea

"Just looking" is what a shopper says when browsing without buying, and the product has no prices, cart or checkout. Its interface is a sibling of mookie studio's EntryHub: dense but calm, flat white sheets ruled with hairlines on a cool ground, one family in two voices, one electric ink (violet) for the shell and the action, and sticker colours that each keep one job. Highlighter yellow marks what is singled out. The brand's own shape is the **hang tag**: it is the logo, and on the landing it carries product data with the price covered by a stamp that says "Just looking" ("Solo mirando").

## Where it applies

- **Landing page** (`/`): the full brand. `landing-ground` (violet) ground, highlighter and pale-violet HangTags, the reversed wordmark, the `display-xl` headline with its highlighted word, a line that explains the pun (the "Just looking" stamp and what it means), the tag button for "Try the demo". English and Spanish.
- **Sign-in, admin and platform** (`/login`, `/accept-invite`, `/admin`, `/platform`): `surface` ground, white sheets, `ink` text, one `accent` primary action per view, StatusBadges, Fields. The wordmark sits in the white top bar; the brand shows in details (a hang tag on the sign-in panel, the empty window in empty states, yellow for Featured, the Stamp on the 404 page), never as large colour fields.
- **A Tenant's public catalog** (`/{tenantSlug}`): the Tenant leads. Its Logo replaces ours in the header; its Brand color, when set, replaces `accent` and `focus-ring` for its header and buttons, with black or white text by contrast. Our neutrals, type and components stay. Just Looking appears only as a footer link "Made with Just Looking".

## Content

- Write plainly: short sentences, active voice. Controls name their action ("Publish", "Export CSV", "Try the demo"); errors name the problem and the fix.
- Use the glossary terms (Product, Category, Attribute, Inquiry, Tenant profile). Never "item", "listing" or "customer".
- Never show or imply a price, cart, order or stock. Never invent customers, figures or testimonials.
- No emoji. Codes (SKU, slugs, ids) use `font-mono`, which is Archivo in tabular figures.

## Colour

One theme. The scales are the source (`--color-brand-*`, `--color-gray-*`, `--color-highlight-*` and the sticker scales in `index.css`); screens use the semantic tokens of the second table.

### Scales

| Scale | Values | Notes |
| --- | --- | --- |
| `brand` (electric violet) | 25 `#f9f6fe` · 50 `#f3eefc` · 100 `#e9e1fa` · 200 `#d4c5f4` · 300 `#b99eea` · 400 `#9b6fdd` · 500 `#8042cd` · 600 `#6c22b7` · 700 `#551594` · 800 `#411371` · 900 `#2e114f` · 950 `#1d0c33` | EntryHub's lightness and chroma steps at the violet hue: as saturated as EntryHub's blue. 600 is the action, 700 the shell, 950 the deep ink. |
| `gray` | 25 `#f6f5f9` · 50 `#f0eff4` · 100 `#e8e5ee` · 200 `#dad6e3` · 300 `#c3bdd0` · 400 `#978ea9` · 500 `#706584` · 600 `#564c69` · 700 `#3f3553` · 800 `#2b203e` · 900 `#1f1232` | Neutrals tinted towards the ink. 400 is darkened so field borders meet 3:1. |
| `highlight` | 200 `#fff3a3` · 400 `#ffe53d` | Highlighter yellow. |
| `success` | 50 `#ddf5e8` · 500 `#17a865` · 700 `#0a6a3f` | Sticker: Published, success. |
| `warning` | 50 `#fff0d2` · 500 `#f39a0b` · 700 `#8a4a00` | Sticker: Draft, warnings. |
| `error` | 50 `#fde6e1` · 300 `#f6a495` · 500 `#f0533b` · 600 `#cf3a23` · 700 `#a52a17` | Sticker: errors and destructive actions. |

### Semantic tokens

| Token | Value | Usage |
| --- | --- | --- |
| `surface` | `{gray-25}` | Page background of app screens (admin, platform, public catalog). |
| `surface-raised` | `#ffffff` | Panels, cards, menus, inputs and the top bar. |
| `surface-sunken` | `{gray-50}` | Table headers, wells, image cells, the code chip ground. |
| `ink` | `{gray-900}` | Body text and headings on the three surfaces. |
| `ink-muted` | `{gray-600}` | Secondary text, help text, attribute names. |
| `border` | `{gray-200}` | Hairlines between rows and around panels (decorative). |
| `border-strong` | `{gray-400}` | Input and control borders; 3:1 on white. |
| `accent` | `{brand-600}` | Primary action fill. Pair with `on-accent`. |
| `on-accent` | `#ffffff` | Text and icons on `accent`. |
| `accent-hover` | `{brand-700}` | `accent` while hovered (`brand-800` pressed). |
| `highlight` | `{highlight-400}` | Featured, hang tags (the logo's too), the stamp ground, selection, focus on ink. Pair with `on-highlight`. Never text. |
| `on-highlight` | `{brand-950}` | Text on `highlight`. |
| `link` | `{brand-600}` | Inline links on white and `surface`. |
| `focus-ring` | `{brand-600}` | Solid 2px focus ring, 2px offset, on light surfaces. On ink grounds the ring is `highlight-400`. |
| `success`, `success-soft` | `{success-700}`, `{success-50}` | Published badge text and ground; success messages. |
| `warning`, `warning-soft` | `{warning-700}`, `{warning-50}` | Draft badge, warnings. |
| `danger`, `danger-soft` | `{error-700}`, `{error-50}` | Errors, invalid inputs, error alerts. Destructive buttons fill `error-600`. |
| `neutral-soft` | `{gray-100}` | Ground of the Archived and Handled badges. |
| `landing-ground` | `{brand-700}` | The landing page and the sign-in panel ground. |
| `landing-ink`, `landing-ink-muted` | `#ffffff`, `{brand-100}` | Text on `landing-ground`. |

Rules:

- **The Sticker Job Rule.** Each sticker colour has one job: green is Published or a success, amber is Draft or a warning, coral is an error or a destructive action. Open is pale violet (`brand-50`, text `brand-800`); Archived and Handled are gray with a hollow dot; Featured is solid `highlight-400`. A state is the 500-shade dot on its tint with dark text, always with its word; never 500-shade text on white.
- **The Highlighter Rule.** Yellow means "singled out" (Featured, the tag, the logo, the landing's highlighted word) and selection. It is never a generic accent, a hover colour or text. The landing alone spends it on its primary action.
- **The White Cell Rule.** On an ink ground, the current place is a white cell with `brand-900` text, never a yellow one.
- **The Signature Rule.** The mookie studio wordmark (its red `#E0202F`) appears once per surface; its red is never an interface colour.

### Contrast (WCAG 2)

| Pair | Ratio |
| --- | --- |
| `ink` on white / on `surface` | 17.6:1 / 16.3:1 |
| `ink-muted` on white / on `surface` | 8.0:1 / 7.4:1 |
| `on-accent` on `accent` | 8.2:1 |
| `on-highlight` on `highlight` | 14.3:1 |
| `link` on white | 8.2:1 |
| `success` on `success-soft` | 5.8:1 |
| `warning` on `warning-soft` | 6.1:1 |
| `danger` on white / on `danger-soft` | 7.1:1 / 6.0:1 |
| White on `error-600` (destructive button) | 4.9:1 |
| `gray-700` on `neutral-soft` | 9.1:1 |
| `landing-ink` / `landing-ink-muted` on `landing-ground` | 10.9:1 / 8.7:1 |
| `highlight-400` on `landing-ground` (focus ring, stamp) | 8.6:1 |
| `border-strong` on white (needs 3:1) | 3.1:1 |
| `focus-ring` on white (needs 3:1) | 8.2:1 |

Text needs 4.5:1; focus rings, control borders and meaningful marks need 3:1. Every pair above passes.

## Type

One family, **Archivo** (Google Fonts, `Archivo:wdth,wght@62..125,400..900`, `display=swap`), in two voices. No second family.

- **Condensed voice** (`font-display`, and the `display-*` utilities): weight 750 at `font-stretch: 78%`, letter-spacing -0.005em. Titles, product names on hang tags, big numerals and the Stamp. Never a paragraph, a button or a label.
- **Text voice**: Archivo at normal width for everything read at length and for every control.

| Style | Size | Line height | Weight | Usage |
| --- | --- | --- | --- | --- |
| `display-xl` | `clamp(3rem, 9vw, 6rem)` | 0.95 | 750, 78% | Landing headline only. |
| `display-l` | `clamp(2.25rem, 5vw, 3rem)` | 1 | 750, 78% | Landing section titles. |
| `display-m` (headline) | 36px (30px below 640px) | 1.25 | 750, 78% | The one page title of each app screen; the product name on the product page. |
| title | 18px (20px in dialogs) | 1.55 | 750, 78% | Section headings inside a page. |
| `lede` | 18px | 1.5 | 400 | Landing paragraphs; max 46ch. |
| body | 16px | 1.5 | 400 | Default text; descriptions max 65ch. |
| small | 14px | 1.43 | 400 | Help text, metadata, table cells. |
| label | 14px | 1.43 | 600 | Buttons, field labels, navigation. |
| sticker | 12px | 1.33 | 600 | Badge text. |
| header band | 12px | 1.33 | 600, uppercase, 0.05em | The tenant line on tags, column headers, "A product by". Never a caption above a heading. |

- Every time, date, count and code uses tabular figures (`font-mono` and `tabular-nums` do this; form controls too).
- Headings use `text-wrap: balance`.

## Space, shape, depth

- Steps of 4px (Tailwind's spacing). Fields stack at 16px with 6px between label, control and hint; list rows at 12px; card grids at 16px; 32px below a page header.
- Corners: `radius-m` (0.5rem) for buttons, fields, menus and thumbnails; `radius-l` (0.625rem) for cards, panels, alerts and dialogs; `radius-s` (0.25rem) for the stamp and code chips; fully round for stickers and filter chips. Borders are 1px.
- **The Ruled Sheet Rule.** Flat by default: a surface at rest has a border, not a shadow. `shadow-raised` lifts filled buttons, and cards and rows on hover (with a `brand-300` border; cards also rise 2px). `shadow-float` is for toasts and dialogs. `shadow-tag` is for what hangs (the tag button). Never stack cards in cards.
- The **hang tag** keeps its cut top corners (`tag-cut`: `clip-path: polygon(22% 0, 78% 0, 100% 14%, 100% 100%, 0 100%, 0 14%)`), an eyelet and a 2px `brand-900` string.

## Motion

- One signature movement: hang tags sway slowly (5.5s, ease-in-out, ±2.5deg around the top of the string) and stop on hover and focus.
- Everything else: 150ms changes of colour, border or shadow (200ms for dialogs); a pressed button moves 1px down; the tag button lifts 2px and tilts -1.5deg on hover; the landing's tag flip at most 400ms.
- Under `prefers-reduced-motion: reduce` nothing sways or animates. Nothing animates in from invisible.

## Iconography

- Lucide icons (`lucide-react`), 16 or 20px, stroke 1.6, `currentColor`. Decorative: a text label carries the meaning. No emoji.
- Alerts use a 10px sticker dot in place of an icon.
- Empty states show the drawn empty window (ruled `gray-300` panes, one `highlight-400` dot), not the logo.

## Logo

The mark is a **hang tag**: a highlighter-yellow swing tag with its eyelet and a price line, tilted -12°, on a 32px rounded tile (a sibling of EntryHub's planner-sheet mark). The wordmark is the mark followed by "Just Looking" in the condensed voice, converted to outlines. Files in `web/public/brand/`:

| File | Look | Use on |
| --- | --- | --- |
| `just-looking-wordmark.svg` | `brand-600` tile, yellow tag, name `gray-900` | Light grounds: white, `surface`, the top bar |
| `just-looking-wordmark-reversed.svg` | White tile, yellow tag, white name | `landing-ground` and dark grounds |
| `just-looking-mark-ink.svg` | The violet tile alone | Favicon, app icon, social avatar, small spaces on light grounds |
| `just-looking-mark.svg` | The white tile alone | Small spaces on violet grounds |

- Always an `<img>` of these files with `alt="Just Looking"` (or `alt=""` when the text beside it already names Just Looking); never retype, recolour or redraw.
- Minimum height 20px (wordmark), 16px (mark). Clear space: a quarter of the tile on every side.

## mookie studio credit

Just Looking is a product by mookie studio. The landing footer is laid out like EntryHub's: on its `brand-950` band, the maker's credit has its own row, the label "A product by" ("Un producto de", 16px, `landing-ink-muted`) above the mookie studio wordmark, closed by a 1px white rule at 20%; below it, one row with the product line "Just Looking · product catalog" on the left and Sign in and the year on the right.

- Component `MookieStudioCredit` in `web/src/components/brand/`; files in `web/public/brand/mookie-studio/` (see its README), copied unchanged from mookie studio's logo pack.
- `wordmark-on-dark.svg` on ink and dark grounds, `wordmark-on-light.svg` (prop `onLight`) on light grounds. Never recoloured, redrawn or cropped.
- Shown large: 96px high (104px from 640px), the same size as in EntryHub's footer. The file includes its clear space; a -8px margin lines the mark up with the label.
- The wordmark links to mookie studio on GitHub (`https://github.com/mookie-studio`), in a new tab, with the accessible name "mookie studio on GitHub" and a visible focus outline.
- One credit per page, only in a footer. It never replaces the Just Looking logo.

## Components

Shared components live in `web/src/components/` (`ui/` for shadcn primitives, `brand/` for Logo, HangTag, Stamp and MookieStudioCredit). They never import admin, platform or Supabase code.

### Button

- `default` (primary): `brand-600` fill, white text, `shadow-raised`; `brand-700` on hover, `brand-800` pressed. One per view.
- `outline` (secondary): white, 1px `gray-300` border, `gray-800` text; hover `brand-400` border on `brand-25` with `brand-800` text.
- `ghost`: toolbar and row actions; hover `gray-100`. `destructive`: `error-600`, always behind a confirmation.
- Tag button (landing only, on `landing-ground`): `highlight` fill, `on-highlight` text, an eyelet dot at the left, `shadow-tag`; tilts -1.5deg and lifts 2px on hover; focus ring `highlight-400`. Used for "Try the demo".
- Label style (14px, 600), padding 10px 16px (`sm`: 6px 12px), `radius-m`, never wrapping. Focus: 2px `focus-ring`, 2px offset. Disabled: 50% opacity, `not-allowed` cursor.

### Field

- Label 14px 600 `gray-800`; control white, 1px `border-strong`, `radius-m`; hover `gray-500` border; focus border and 2px outline in `focus-ring`; placeholder `gray-500` with an example, never the label; tabular figures.
- Help text 14px `ink-muted`; error 14px 600 `danger`, linked with `aria-describedby`, and `aria-invalid="true"` turns the border `error-600`. Disabled on `gray-50`.
- SKU, slug and other codes use the mono variant (Archivo, tabular, slightly tracked).

### StatusBadge

- A sticker: fully round, padding 2px 10px 2px 8px, 12px 600, a 6px dot before the word.
- Published: `success-700` on `success-50`, `success-500` dot. Draft: `warning-700` on `warning-50`, `warning-500` dot. Archived, Handled: `gray-700` on `gray-100`, hollow dot. Open: `brand-800` on `brand-50`, `brand-500` dot. Featured: `brand-950` on `highlight-400`, `brand-950` dot.

### HangTag

- A 2px `brand-900` string of 24 to 120px, then the card: `highlight-400` or pale violet (`brand-100`), cut top corners, an eyelet in the ground colour, padding 46px 18px 18px, width 220px.
- Inside: the tenant line (header band), the product name (condensed voice, 24px), up to three attributes (14px, tabular), a 1.5px dashed rule with "Price" and the Stamp, an optional link label.
- Used on the landing (hero rail, demo picker, how it works) and the sign-in panel. Never for product lists: those use ProductCard. At most three in one rail, alternating stock.
- As a link the whole tag is one `<a>` named "Open the {tenant} demo", with a visible focus outline around the card.

### Stamp

- The condensed voice at 15px, uppercase, 0.04em, 2.5px border in `currentColor`, `radius-s`, padding 2px 8px, rotated -6deg.
- Ink `brand-700` on the highlighter and pale tags; `highlight-400` on ink grounds (`onInk`). At most one per tag or card. Never a status badge.

### ProductCard

- `surface-raised`, 1px `border`, `radius-l`; image 4:3 on `surface-sunken` ("No image" when there is none); body padding 16px: name 16px 600, SKU in `font-mono` `ink-muted`, up to two attributes 14px, the Featured badge.
- Hover: a `brand-300` border, `shadow-raised` and a 2px lift. No price, ever.

### EmptyState

- A dashed `gray-300` outline on translucent white, `radius-l`, centred: the drawn empty window, a title, one sentence on what will appear and, when there is one, the action that adds the first item.
