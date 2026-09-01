# Phase 00 — Project Foundation

## Goal

Create a clean, reproducible base for `puriki-site` without implementing the full landing page.

At completion, another developer should be able to clone, install, test, and build the site using documented commands.

## Scope

### Package management

- [ ] Use `pnpm`.
- [ ] Commit `pnpm-lock.yaml`.
- [ ] Define a supported Node.js range in `package.json`.
- [ ] Prefer an LTS-compatible Node version for GitHub Actions.
- [ ] Do not include npm/yarn lockfiles.

### React/Vite/TypeScript

- [ ] Initialize React + TypeScript.
- [ ] Configure Vite.
- [ ] Enable strict TypeScript settings appropriate for a small production project.
- [ ] Configure path aliases only if they improve imports; do not build a complex alias taxonomy.
- [ ] Keep source code in English.

### React Router static architecture

- [ ] Configure React Router Framework Mode.
- [ ] Configure `ssr: false`.
- [ ] Prepare static prerender configuration.
- [ ] Confirm a test route generates usable static output.
- [ ] Confirm a direct nested route can be represented as an actual static file path.
- [ ] Do not use HashRouter.

### Styling

- [ ] Add Tailwind CSS.
- [ ] Add base style entry.
- [ ] Add shadcn/ui configuration.
- [ ] Do not install a large component set yet.
- [ ] Add Lucide React.
- [ ] Add Anime.js.

### Testing

- [ ] Add Vitest.
- [ ] Add React Testing Library.
- [ ] Add `@testing-library/jest-dom` or equivalent DOM matchers.
- [ ] Add test setup file.
- [ ] Add one basic smoke test proving the test environment works.

### Code quality

- [ ] Configure ESLint suitable for React/TypeScript.
- [ ] Add formatting conventions. Prettier is acceptable if chosen; avoid conflicting formatters.
- [ ] Add `.editorconfig`.
- [ ] Ensure line endings and final newlines are consistent.
- [ ] Ensure generated build output is ignored.

### Scripts

Expected script intent:

- [ ] `dev`
- [ ] `build`
- [ ] `test`
- [ ] `test:watch`
- [ ] `lint`
- [ ] `typecheck`
- [ ] optional `format` / `format:check`

All commands must work from a clean checkout.

### Environment/config model

Create a public build configuration model for:

- [ ] `SITE_URL`
- [ ] `BASE_PATH`

Initial development/default assumptions:

- local dev origin as appropriate;
- production project-site base: `/puriki-site/`;
- future custom domain base: `/`.

Rules:

- [ ] No secrets in Vite client environment variables.
- [ ] Do not create fake `.env` secret placeholders.
- [ ] Document which configuration is safe/public.

### Repository documentation

Update/create root `README.md` with:

- [ ] project purpose;
- [ ] prerequisites;
- [ ] install;
- [ ] dev;
- [ ] test;
- [ ] build;
- [ ] plan docs path;
- [ ] no APK is hosted in this repo;
- [ ] link to app repo.

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

- [ ] all commands pass;
- [ ] output is static-deploy compatible;
- [ ] no secret appears in the built client bundle;
- [ ] dev server loads without console errors;
- [ ] test environment works.

## Acceptance criteria

Phase 00 is complete only when:

- a clean clone can run all validation commands;
- static prerender architecture is proven, not only planned;
- the project does not depend on a server runtime;
- the base-path strategy is documented;
- no product content has been prematurely overbuilt.
