# Puriki Site

Official static website for the Puriki Android application. The site explains the product, links to the open-source project, and will provide the official release download when available.

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
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The build uses React Router Framework Mode with `ssr: false` and static prerendering. The final static artifact is always `build/client`; its generated `index.html` and `foundation/index.html` prove the root and nested static routes are available without a server runtime.

## Release metadata

The Download section renders the latest stable `jvitorn/purikuki` GitHub
Release from a build-time generated file, `app/generated/release.json` —
the browser never calls the GitHub API. The committed baseline is
`{ "available": false }`, which is the app repository's real current state
(no public release yet) and lets `pnpm build` run fully offline.

To refresh it from the live GitHub API:

```bash
pnpm release:fetch
```

This queries `GET /repos/jvitorn/purikuki/releases/latest`, which already
excludes drafts and prereleases and 404s when there is no stable release
(mapped to `{ "available": false }` — a valid state, not an error). Any
other failure (timeout, unexpected status, invalid JSON, a release whose
APK asset is missing/ambiguous) makes the script exit non-zero instead of
silently writing "no release". An optional local-only `GITHUB_TOKEN` or
`RELEASE_FETCH_TOKEN` environment variable raises the unauthenticated rate
limit; never use a `VITE_*`-prefixed name for it, since Vite inlines those
into the client bundle. In CI, `secrets.GITHUB_TOKEN` is passed only to
the `release:fetch` step, not to the build step.

See `docs/planos/PHASE_04_DOWNLOAD_RELEASES.md` for the full contract,
parser rules, and test coverage.

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

APK files are not hosted in this repository. Official Android binaries belong to the `jvitorn/purikuki` GitHub Releases page.

- App repository: https://github.com/jvitorn/purikuki
- Planning documents: `docs/planos/`
