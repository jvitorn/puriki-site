# Puriki Site

Official static website for the Puriki Android application. The site explains the product, links to its public source repository, and will provide the official release download when available.

## Prerequisites

- Node.js 20.19 or newer, below 25
- pnpm 10.15.0

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server uses `/` by default. The project-site deployment base path can be tested with `BASE_PATH=/puriki-site/`. This value configures both Vite asset URLs and the React Router basename.

## Validation

```bash
pnpm verify          # format:check + lint + typecheck + test
pnpm build           # static build (needs its own SITE_URL/BASE_PATH per invocation)
pnpm validate:static # checks build/client after a build
```

`pnpm verify` chains `format:check`, `lint`, `typecheck` and `test` — the
same four gates `.github/workflows/quality.yml` runs as separate steps on
every PR. Individual commands (`pnpm lint`, `pnpm typecheck`, `pnpm test`,
`pnpm format:check`) remain available for running just one check locally.

`pnpm build` uses React Router Framework Mode with `ssr: false` and static
prerendering. The final static artifact is always `build/client`; its
generated `index.html` and `en/index.html` prove the root and nested
static routes are available without a server runtime.

`pnpm validate:static` (`scripts/validate-static-output.ts`) runs after a
build and checks `build/client` for the nine public routes' HTML (title,
description, canonical, hreflang + x-default, Open Graph, Twitter Card,
`lang`, JSON-LD placement, base-path-correct asset references), the
GitHub Pages `404.html`, `sitemap.xml`/`robots.txt` content, required
brand assets, absence of any `.apk`/keystore/`SHA256SUMS.txt`, and absence
of secret-like text in the build output. It works against both release
states (`available: false` baseline and a real fetched release) and never
hardcodes a version.

### CI and deployment flow

- **Pull requests to `main`** (`.github/workflows/quality.yml`): install
  (frozen lockfile) → `format:check` → `lint` → `typecheck` → `test` →
  production-style `pnpm build` → `pnpm validate:static`. This workflow
  never calls the GitHub Release API — it always validates the committed
  `{ "available": false }` baseline, so PR CI stays fast, deterministic
  and independent of GitHub API rate limits/outages.
- **`main` deploy** (`.github/workflows/deploy-pages.yml`): install →
  `pnpm verify` (the same four gates) → `pnpm release:fetch` (real,
  against the live `jvitorn/puriki` release) → production `pnpm build` →
  `pnpm validate:static` → upload → deploy to GitHub Pages. Any gate
  failing — including a future stable release missing a required
  `arm64-v8a`/`universal` artifact — stops the job before anything
  publishes; the previously deployed site stays live.

See `docs/planos/PHASE_06_TESTING_CI_DEPLOY.md` for the full Phase 06
report, including the two items that require manual GitHub repository
configuration (Pages Source, branch protection) and cannot be verified
from the code.

## Release metadata

The Download section renders the latest stable `jvitorn/puriki` GitHub
Release from a build-time generated file, `app/generated/release.json` —
the browser never calls the GitHub API. The committed baseline is
`{ "available": false }`, which lets `pnpm build` run fully offline; the
production workflow always runs `pnpm release:fetch` before building, so
a real deploy renders the actual latest stable release.

A release is modeled as **multiple Android APK artifacts**, one per ABI,
not a single universal APK:

- `arm64-v8a` and `universal` are **required** — a stable release missing
  either one fails `pnpm release:fetch` loudly instead of silently
  shipping an incomplete landing;
- `armeabi-v7a`, `x86_64`, and `x86` are **optional** — a release may drop
  any of them without failing the build; the Download section simply
  omits that option.

The Download UI always treats `arm64-v8a` as the recommended primary
download and `universal` as the highlighted fallback for anyone unsure
which one to pick; the remaining, present optional variants sit behind an
"Other versions" disclosure. The browser is never asked to detect the
visitor's CPU architecture — the landing always presents the same
explicit choices. SHA-256/checksum verification is intentionally not
part of the landing UX; it remains a GitHub Release concern
(`SHA256SUMS.txt`, asset digests).

To refresh the generated file from the live GitHub API:

```bash
pnpm release:fetch
```

This queries `GET /repos/jvitorn/puriki/releases/latest`, which already
excludes drafts and prereleases and 404s when there is no stable release
(mapped to `{ "available": false }` — a valid state, not an error). Any
other failure (timeout, unexpected status, invalid JSON, a release
missing a required artifact) makes the script exit non-zero instead of
silently writing "no release". `jvitorn/puriki` is public, so the CI
workflow calls this unauthenticated — one request per deploy is well
under GitHub's unauthenticated rate limit. An optional local-only
`RELEASE_FETCH_TOKEN` environment variable can raise that limit for
local development; never use a `VITE_*`-prefixed name for it, since Vite
inlines those into the client bundle.

See `docs/planos/PHASE_04_DOWNLOAD_RELEASES.md` for the original
single-APK design and `docs/planos/PHASE_04R_MULTI_ABI_RELEASES.md` for
the current multi-ABI contract, parser rules, and test coverage.

## SEO files and brand assets

`pnpm build` also runs `scripts/generate-seo-files.ts` (after the React
Router build, before `prepare-static-output.mjs`), which writes
`sitemap.xml` (the nine public pages, absolute URLs) and `robots.txt`
directly into `build/client/` using the same `SITE_URL`/locale/page
source of truth as routing — nothing is hardcoded. `/404` is intentionally
excluded from the sitemap and carries `noindex`.

The favicon, Apple touch icon, and Open Graph share image
(`public/favicon.png`, `public/apple-touch-icon.png`,
`public/seo/og-image.png`) are static files generated once from the
official brand assets in `assets/` via
`node scripts/generate-brand-raster-assets.mjs`. That script is a manual
dev tool (requires `rsvg-convert` and ImageMagick's `magick` on the
`PATH`) — rerun it only if the source brand assets change; it is not
part of `pnpm build`.

## Public configuration

`SITE_URL` and `BASE_PATH` are public build configuration values, not secrets. Browser-exposed equivalents are `VITE_SITE_URL` and `VITE_BASE_PATH`; never place credentials or tokens in `VITE_*` variables. The default site URL is `http://localhost:5173` and the default base path is `/`.

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes only `build/client` after a push to `main`, and also supports manual execution. The production build uses:

```text
SITE_URL=https://jvitorn.github.io/puriki-site/
BASE_PATH=/puriki-site/
```

Before the first deployment, select `Settings → Pages → Build and deployment → Source → GitHub Actions` in the repository. No `gh-pages` branch or committed build output is used.

## Repository boundaries

APK files are not hosted in this repository. Official Android binaries belong to the `jvitorn/puriki` GitHub Releases page and use the `puriki-v<version>-<variant>.apk` naming convention (one APK per Android ABI: `arm64-v8a`, `universal`, `armeabi-v7a`, `x86_64`, `x86`).

- App repository: https://github.com/jvitorn/puriki
- Planning documents: `docs/planos/`
