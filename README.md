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

The development server uses `/` by default. The project-site deployment base path can be tested with `BASE_PATH=/puriki-site/`.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The build uses React Router Framework Mode with `ssr: false` and static prerendering. The generated `build/client/index.html` and `build/client/foundation/index.html` prove the root and nested static routes are available without a server runtime.

## Public configuration

`SITE_URL` and `BASE_PATH` are public build configuration values, not secrets. Browser-exposed equivalents are `VITE_SITE_URL` and `VITE_BASE_PATH`; never place credentials or tokens in `VITE_*` variables. The default site URL is `http://localhost:5173` and the default base path is `/`.

## Repository boundaries

APK files are not hosted in this repository. Official Android binaries belong to the `jvitorn/purikuki` GitHub Releases page.

- App repository: https://github.com/jvitorn/purikuki
- Planning documents: `docs/planos/`
