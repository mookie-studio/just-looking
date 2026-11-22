# Public catalog

What a **Visitor** sees. No sign-in. Everything here only ever involves **Published** products of an **active** Tenant; an unknown or deactivated Tenant, or a Draft, Archived, unknown or other-Tenant product, shows the same **not-found page** so nothing leaks.

Addresses: the catalog is `/{tenantSlug}` and a product is `/{tenantSlug}/p/{productSlug}`. The public pages never download the admin code, so they stay light and fast.

## Header and branding

The header shows the Tenant's **Logo** (if any) and **name**; with a **Brand color** the header background and buttons use it, with readable black or white text. A footer section shows the **description** and the **contact details** (email, phone, address, website) when the Admin filled them. See [Catalog setup](./catalog-setup.md).

- **Focus ring.** A dark enough Brand color (at least 3:1 contrast on white) also becomes the keyboard focus ring, so focus stays visible on branded buttons. A light Brand color (for example yellow) keeps the default petrol ring, because a light ring on a light page would not be seen.
- **Product cards.** Products in the grid, the Featured strip and Related products are cards: image in 4:3 (the placeholder when there is none), product name, and a highlighter-yellow **Featured** badge on Featured products. The card lifts slightly on hover (not under reduced motion). There is never a price.
- **Product page title.** The product name is the page's large title (Archivo extra-bold, 36px on wide screens, 28px on phones).
- **Made with Just Looking.** Every public catalog page ends with a small, centred line "Made with Just Looking" with the brand's shop-window mark. It links to the [landing page](./landing-page.md) at `/`, in the same tab. It is always shown, with or without a Tenant profile, and it is not affected by the Brand color.

## The catalog home

- **Featured strip**: on the plain home (no search, Category, filter or page), up to 8 Featured products are shown first.
- **Product list** with the **name** and **Main image** (its Thumbnail; a default image when there is none), paged (20 per page).
- **Grid view** and **List view**: a toggle chooses how the same page is shown. The choice is remembered in the browser and can be put in the address (`?view=list`).
- **Search** box: full-text search over name and description using the **Spanish** dictionary (so "taladros" finds "taladro"); results are ordered by relevance.
- **Sort by**: Relevance (only offered while searching), Featured (default when not searching: Featured first, then by name), Name, or Newest (most recently published first). Ties always break by name, then id.
- **Categories** and **filters** are a sidebar on wide screens and collapse behind **Show categories and filters** on small ones.

### Categories
The Category tree is shown with the Admin's order. A Category appears only if it has Published products in it or its subcategories. Choosing a Category lists the products of that Category **and its subcategories**.

### Filters
One filter per **Filterable attribute**, only those with something to filter by. Text, number and date filters take a value and match it **exactly** (text ignoring upper/lower case); boolean ones Yes/No; option lists show their Options. Rules ([ADR 0006](../adr/0006-attributes-in-jsonb-and-native-search.md)): several values of the **same** filter are **OR**-ed ("Red or Blue"); **different** filters are **AND**-ed. Search, Category, filters, sort, view and page are all kept in the address, so any state can be bookmarked or shared (`?q=drill&categoryId=...&attr.{definitionId}=...&sort=newest&page=2`). An unknown, non-filterable or invalid filter value is a 400 in the API.

## The product page

Shows the **name**, **description**, the **Images** in order (large view: the original; the strip below: Thumbnails; click one to enlarge it) and the **Attributes** as name/value pairs (option values as their text; booleans as Yes/No; multi-select values comma-separated). A product with no images shows the default image.

### Related products
Under the product, up to **four Related products**: other Published products of the Tenant that share at least one Category with this one. Order: the ones sharing **more Categories** first, then Featured, then name. The section is hidden when there are none (including products without Categories).

### Asking about a product (Inquiries)
When the Tenant accepts Inquiries, **Ask about this product** opens the form described in [Dashboard, Inquiries and statistics](./dashboard-inquiries-and-stats.md).

## Old links keep working

If an Admin changes a **Product slug**, or a Platform Admin changes the **Tenant slug**, the previous address is an **Old slug** and keeps working: the page loads normally and the address bar is replaced with the current one, keeping the rest of the path and the query string ([ADR 0009](../adr/0009-old-slugs-stay-reserved-and-resolve.md)). An Old slug stays reserved, so an old link never shows a different product or catalog. A Deactivated tenant or an unpublished product stays 404 through an Old slug as well.

## Search engines (SEO without server-side rendering)

Catalog is a single-page app, so it does three cheap things ([ADR 0013](../adr/0013-seo-without-server-side-rendering.md)):

1. **Page metadata.** Every public page sets its own title and description. Catalog home: title = Tenant name, description = Tenant description. Product page: title `"{product} · {Tenant}"`, description = the product's description (whitespace collapsed, cut at a word boundary to at most 160 characters, ending in "…" when cut; the Tenant's description when the product has none), Open Graph tags (`og:title`, `og:description`, `og:type=product`, `og:image` = the Main image) and a `canonical` link with the current Product slug. Text is always plain, never HTML.
2. **A Sitemap per Tenant** at `GET {API}/api/public/{tenantSlug}/sitemap.xml`: the catalog home plus every Published product (`<lastmod>` = last update date), with the SPA addresses taken from the API setting `PublicSite__BaseUrl`, current slugs only, at most 49 999 products. A **sitemap index** at `GET {API}/api/public-sitemap.xml` lists the Sitemap of every **active** Tenant. Both answer 404 until `PublicSite__BaseUrl` is configured.
3. **`robots.txt`**, generated at build time: allows everything except `/admin`, `/platform`, `/login` and `/accept-invite`, and points to the sitemap index on the API (the `Sitemap:` line is omitted when `VITE_API_URL` is empty).

Known limit: link previews in apps that do not run JavaScript (WhatsApp, Slack, X) show the generic page title instead of the product's. Search engines that run JavaScript (Google) read the metadata.
