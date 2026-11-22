# Just Looking adopts EntryHub's visual language, with an electric violet ink and a hang-tag logo

ADR 0015 gave the product its name and a first design system (plum, mustard and lilac; Archivo at expanded widths plus Martian Mono; a wordmark whose two "o" are eyes; light and dark themes). It did not hold up: the owner judged the landing and the application weak next to mookie studio's other product, EntryHub, and asked for Just Looking to belong to the same visual family.

`DESIGN.md` is rewritten in EntryHub's language. One electric ink with neutrals tinted towards it (violet, Just Looking's own; the scales keep EntryHub's lightness and chroma steps, so the ink is as saturated as EntryHub's blue), EntryHub's sticker colours with one job each, and highlighter yellow for what is singled out (Featured, the tag, the logo's awning, selection). Archivo in two voices: condensed (78% width, weight 750) for titles and big numerals, normal width for everything else; Martian Mono is dropped and codes use Archivo's tabular figures. Flat ruled sheets, borders at rest and shadows only on hover or for what floats. The new logo is a highlighter-yellow hang tag on a rounded tile, a sibling of EntryHub's planner-sheet mark; the hang tag and the "Just looking" stamp stay as the brand's expressive shapes. One theme: the dark theme goes.

The name, the code name, where the brand applies (landing, app, a Tenant's public catalog) and the bilingual landing from ADR 0015 are unchanged. The semantic token names in `web/src/index.css` (`surface`, `ink`, `accent`, `highlight`…) are kept, so screens re-theme without per-screen changes.

## Considered Options

- **Keep ADR 0015's palette and only restyle the components**: rejected by the owner; plum and mustard read as a different family from EntryHub.
- **A petrol ink and a shop-window logo** (the first version of this decision, PR #202): rejected by the owner a few hours later; petrol is too muted next to EntryHub, and the logo did not work.
- **Reuse EntryHub's palette as is**: rejected; the two products would be indistinguishable. Only the ink changes; the sticker colours and the highlighter are shared on purpose.
- **Keep a dark theme**: dropped; EntryHub has one theme, and the dark values would have to be designed again for the new palette.

## Consequences

- The logo files change (`just-looking-wordmark.svg`, `just-looking-wordmark-reversed.svg`, `just-looking-mark-ink.svg`, `just-looking-mark.svg`); the eyes wordmark, the symbol and the plum app icon are removed.
- The interface no longer follows the device's dark setting.
- Fonts still load from Google Fonts at run time (Archivo only).
