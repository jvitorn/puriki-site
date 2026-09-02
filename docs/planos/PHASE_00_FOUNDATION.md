# Phase 00 — Project Foundation

## Goal

Create a clean, reproducible base for `puriki-site` without implementing the full landing page.

At completion, another developer should be able to clone, install, test, and build the site using documented commands.

## Scope

### Package management

- [x] Use `pnpm`.
- [-] Commit `pnpm-lock.yaml`.

  Lockfile is generated and validated, but this implementation does not create Git commits.
- [x] Define a supported Node.js range in `package.json`.
- [x] Prefer an LTS-compatible Node version for GitHub Actions.
- [x] Do not include npm/yarn lockfiles.

### React/Vite/TypeScript

- [x] Initialize React + TypeScript.
- [x] Configure Vite.
- [x] Enable strict TypeScript settings appropriate for a small production project.
- [x] Configure path aliases only if they improve imports; do not build a complex alias taxonomy.
- [x] Keep source code in English.

### React Router static architecture

- [x] Configure React Router Framework Mode.
- [x] Configure `ssr: false`.
- [x] Prepare static prerender configuration.
- [x] Confirm a test route generates usable static output.
- [x] Confirm a direct nested route can be represented as an actual static file path.
- [x] Do not use HashRouter.

### Styling

- [x] Add Tailwind CSS.
- [x] Add base style entry.
- [x] Add shadcn/ui configuration.
- [x] Do not install a large component set yet.
- [x] Add Lucide React.
- [x] Add Anime.js.

### Testing

- [x] Add Vitest.
- [x] Add React Testing Library.
- [x] Add `@testing-library/jest-dom` or equivalent DOM matchers.
- [x] Add test setup file.
- [x] Add one basic smoke test proving the test environment works.

### Code quality

- [x] Configure ESLint suitable for React/TypeScript.
- [x] Add formatting conventions. Prettier is acceptable if chosen; avoid conflicting formatters.
- [x] Add `.editorconfig`.
- [x] Ensure line endings and final newlines are consistent.
- [x] Ensure generated build output is ignored.

### Scripts

Expected script intent:

- [x] `dev`
- [x] `build`
- [x] `test`
- [x] `test:watch`
- [x] `lint`
- [x] `typecheck`
- [x] optional `format` / `format:check`

All commands must work from a clean checkout.

### Environment/config model

Create a public build configuration model for:

- [x] `SITE_URL`
- [x] `BASE_PATH`

Initial development/default assumptions:

- local dev origin as appropriate;
- production project-site base: `/puriki-site/`;
- future custom domain base: `/`.

Rules:

- [x] No secrets in Vite client environment variables.
- [x] Do not create fake `.env` secret placeholders.
- [x] Document which configuration is safe/public.

### Repository documentation

Update/create root `README.md` with:

- [x] project purpose;
- [x] prerequisites;
- [x] install;
- [x] dev;
- [x] test;
- [x] build;
- [x] plan docs path;
- [x] no APK is hosted in this repo;
- [x] link to app repo.

Do not duplicate the full planning documents in the README.

## Out of scope

Do not implement yet:

- final design;
- full locale routes;
- complete landing sections;
- GitHub Release fetch;
- GitHub Pages Action;
- Privacy/Terms content;
- SEO schema.

## Suggested initial structure

```text
app/
  components/
  routes/
  content/
  lib/
  styles/
public/
scripts/
docs/planos/
```

Only create directories that are immediately useful. Empty folder forests are unnecessary.

## Validation

Run:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Confirm:

- [x] all commands pass;
- [x] output is static-deploy compatible;
- [x] no secret appears in the built client bundle;
- [x] dev server loads without console errors;
- [x] test environment works.

## Acceptance criteria

Phase 00 is complete only when:

- a clean clone can run all validation commands;
- static prerender architecture is proven, not only planned;
- the project does not depend on a server runtime;
- the base-path strategy is documented;
- no product content has been prematurely overbuilt.
