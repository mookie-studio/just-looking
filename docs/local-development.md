# Local development

Supabase (authentication and an email inbox) always runs locally through the Supabase CLI. The API,
the SPA, PostgreSQL for the catalog and S3-compatible image storage run in one of two ways:

- **Aspire (recommended)**: `dotnet run` of the AppHost starts everything and opens a dashboard with
  logs, traces and metrics ([ADR 0010](adr/0010-aspire-for-local-orchestration.md)).
- **docker compose**: the alternative path, also used by the end-to-end job in CI.

## Requirements

- Docker
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
- .NET 10 SDK (pinned in `api/global.json`, any 10.0 feature band) with `dotnet-ef` (`dotnet tool install --global dotnet-ef`)
- Node.js 22 (Aspire path only; compose runs Node in a container)

## Start Supabase

```sh
supabase start
supabase status
```

`supabase/config.toml` disables public sign-up and enables the email testing inbox at
http://localhost:54324, where invitation emails arrive. Supabase Studio is at http://localhost:54323.

## Create the first Platform Admin

1. In Supabase Studio, open **Authentication → Users → Add user**, and create a user with an email
   and password (tick "Auto confirm user").
2. Keep the user's id: the API reads it as `Auth:PlatformAdminUserIds` (set below for either path).

## Option A: Aspire (recommended)

The AppHost (`api/src/Catalog.AppHost`) starts PostgreSQL, image storage (S3Mock), the API and the SPA.
No Aspire workload is needed; the packages come from NuGet.

### 1. Set the AppHost parameters

Copy the values from `supabase status` into the AppHost's user secrets (once):

```sh
cd api/src/Catalog.AppHost
dotnet user-secrets set "Parameters:supabase-jwt-secret" "<JWT secret>"
dotnet user-secrets set "Parameters:supabase-service-role-key" "<service_role key>"
dotnet user-secrets set "Parameters:supabase-anon-key" "<anon key>"
dotnet user-secrets set "Parameters:platform-admin-user-id" "<your Platform Admin user id>"
# Only if Supabase is not at the CLI default http://127.0.0.1:54321:
dotnet user-secrets set "Parameters:supabase-url" "http://127.0.0.1:54321"
```

Missing parameters are also asked for in the dashboard.

### 2. Run

```sh
dotnet run --project api/src/Catalog.AppHost
```

The console prints the dashboard address (with a login token). In the dashboard:

1. Wait for `postgres`, `storage`, `api` and `web` to be running (`web` runs `npm install` first).
2. Start the **`migrate`** resource (▶). It runs `dotnet ef database update` against the AppHost's
   PostgreSQL and then stops. Migrations never run on their own; start it again after pulling new ones.
3. Open the `web` endpoint, http://localhost:5173 (sign in at `/login`, then go to `/platform`).

Logs, traces (HTTP requests and SQL) and metrics of the API are under **Structured logs**, **Traces**
and **Metrics**. The catalog data lives in the AppHost's PostgreSQL (volume `catalog-postgres-data`),
not in Supabase's database; images live in the `catalog-storage-data` volume.

## Option B: docker compose

Copy `.env.example` to `.env` and fill in `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`SUPABASE_JWT_SECRET` from `supabase status`, and `PLATFORM_ADMIN_USER_ID` with your Platform Admin's id.

### 1. Apply the migrations

Migrations are never applied at start-up. Apply them to the local Supabase database:

```sh
cd api
ConnectionStrings__Catalog="Host=localhost;Port=54322;Database=postgres;Username=postgres;Password=postgres" \
  dotnet ef database update --project src/Catalog.Api
```

### 2. Start the API, the SPA and image storage

```sh
docker compose up --build
```

- SPA: http://localhost:5173 (sign in at `/login`, then go to `/platform`)
- API: http://localhost:8080/api/health
- Images: uploaded images are stored in the local S3-compatible store and served from
  http://localhost:9090/catalog-images/...

Image uploads (product Images, Logos) need the `catalog-images` bucket. The compose file asks S3Mock to create it,
but some S3Mock versions ignore that setting. If an upload answers 500 and the API log says "The specified bucket does
not exist", create the bucket once (it is kept in the `storage-data` volume):

```sh
curl -X PUT http://localhost:9090/catalog-images
```

The SPA calls the API through the Vite dev server proxy (`/api`), so no CORS setup is needed locally.

## Running the API and the SPA without an orchestrator

- API: `dotnet run --project api/src/Catalog.Api` with the same settings as the `api` service in
  `docker-compose.yml` (as environment variables or user secrets).
- SPA: `cd web && cp .env.example .env.local && npm run dev`. Vite proxies `/api` to
  `http://localhost:5217` unless `API_PROXY_TARGET` says otherwise.

## End-to-end test

With the docker compose path running (the E2E job in CI uses it too), and a Platform Admin whose email and password you know:

```sh
cd web
npx playwright install chromium
E2E_PLATFORM_ADMIN_EMAIL=... E2E_PLATFORM_ADMIN_PASSWORD=... npm run e2e
```

There are three flows. `web/e2e/catalog.e2e.ts` creates a Tenant and invites its Admin (reading the invitation from
the email testing inbox), publishes a Product with a filterable Attribute, finds it as a Visitor, then
archives it and checks the Visitor no longer sees it. `web/e2e/branding.e2e.ts` sets the Tenant profile, enables Inquiries, sends one as a Visitor and handles it in the inbox. `web/e2e/discovery.e2e.ts` bulk-publishes two Drafts and files them under a Category, checks the Related product as a Visitor and the Product view on the Dashboard. CI runs them in `.github/workflows/e2e.yml` (by hand,
on pushes to `main`, and on pull requests that change the end-to-end setup).

## Demo data

To fill the local environment with the three Demo tenants (products, Images, Inquiries and Product views),
run the Demo seeder once the stack is up and the migrations are applied:

```sh
dotnet run --project api/tools/Catalog.DemoSeeder -- seed
```

Its settings, the first-run step that adds the demo Platform Admin, and how to reset are in
[demo data](demo.md#3-first-run-locally).

## Trying the features by hand

Once the stack runs (see above) and a Tenant with an Admin exists, the functional guides in
[docs/functional](./functional/README.md) describe what to try. Local addresses:

| What | Address |
| --- | --- |
| Public catalog | http://localhost:5173/{tenantSlug} |
| Admin area (starts on the Dashboard) | http://localhost:5173/admin |
| Platform area | http://localhost:5173/platform |
| Tenant Sitemap | http://localhost:8080/api/public/{tenantSlug}/sitemap.xml (docker compose; with Aspire use the API endpoint shown in the dashboard) |
| Sitemap index | http://localhost:8080/api/public-sitemap.xml |

`PublicSite__BaseUrl` is already set to `http://localhost:5173` by docker compose and by the Aspire
AppHost, so the Sitemaps work locally. Product views and Inquiries are rate limited per IP
(see [Rules and limits](./functional/rules-and-limits.md)); the limits are generous enough not to
get in the way while testing by hand.

## Fonts

The SPA loads its typeface, Archivo (with its width axis), from Google Fonts at run time (`web/index.html`); nothing needs to be installed. Offline, the browser falls back to system fonts and the layout still works, without the condensed titles. The interface has a single (light) theme.
