# Phase 06 — Automated Quality, CI and GitHub Pages Deployment

> **Status: implemented.** This document originally described only a plan;
> it now records what Phase 06 actually built, on top of the completed
> Phase 00–05 and Phase 04R work. Two items remain manual GitHub
> repository configuration and are marked `[!]` below and in the global
> checklists — see "Manual GitHub configuration" at the end of this
> document. Phase 07 (real-device download validation, content accuracy
> audit, manual QA, launch sign-off) was **not** started here.

## Goal

Make quality checks reproducible and deployment boring.

## Coverage audit — what already existed vs. what Phase 06 added

Phase 06 started by auditing the existing suite instead of assuming the
plan's original wishlist was still accurate. Summary (requirement →
existing test → verdict):

| Requirement | Existing coverage | Verdict |
|---|---|---|
| Locale content shape/parity across pt-BR/en/es | `tests/i18n/locale-content.test.ts` | Sufficient — kept as-is |
| Locale switching (header language switcher) | `tests/i18n/language-switcher.test.tsx`, `tests/shell.test.tsx` | Sufficient — kept as-is |
| Route mapping (locale+page → URL, prerender list) | `tests/i18n/routes.test.ts` | Sufficient — kept as-is |
| Release parser (multi-ABI required/optional) | `tests/releases/parse-github-release.test.ts` + `fixtures.ts` | Sufficient — kept as-is |
| File-size / date formatters | `tests/releases/format.test.ts` | Sufficient — kept as-is |
| Canonical/hreflang **generation** (`buildPageLinks`) | none directly (Phase 05 only verified this by hand in built HTML) | **Gap — added** (`tests/i18n/metadata.test.ts`) |
| Release availability logic (Roadmap/Download reacting to `available`) | `tests/sections/roadmap-section.test.tsx`, `tests/sections/download-section.test.tsx` | Sufficient — kept as-is |
| Header / mobile navigation (Sheet open/close/Escape, language switcher) | `tests/shell.test.tsx` | Sufficient — kept as-is |
| FAQ | `tests/sections.test.tsx`, `tests/i18n/locale-content.test.ts` | Sufficient — kept as-is |
| Download (multi-ABI available/unavailable states) | `tests/sections/download-section.test.tsx` | Sufficient — kept as-is |
| JSON-LD (`arm64-v8a` downloadUrl rule) | `tests/i18n/json-ld.test.ts` | Sufficient — kept as-is |
| Accessibility smoke (axe) | `tests/a11y/axe-smoke.test.tsx` | Sufficient — kept as-is (see note on timeout below) |
| Generated `ReleaseMetadata` validation (boundary between the committed/generated file and the UI) | none — `getReleaseMetadata()` only did a shallow structural check | **Gap — hardened + added** (`app/lib/releases/validate-release-metadata.ts`, `tests/releases/validate-release-metadata.test.ts`) |
| Required-artifact boundary helper | none — `download-section.tsx` silently returned `null` | **Gap — added** (`getRequiredReleaseArtifact`, `tests/releases/get-required-release-artifact.test.ts`) |
| Static build output (routes, sitemap, robots, 404, base path, localhost, secrets, APK absence) | none | **Gap — added** (`scripts/validate-static-output.ts`, `tests/scripts/validate-static-output.test.ts`) |

No existing test was duplicated or rewritten to "pad" numbers; the table
above is the actual audit result, not a retrofit.

One unrelated reliability fix found during this audit: the axe smoke
suite's Home-page test occasionally exceeded Vitest's 5s default
`testTimeout` under full-suite parallel CPU load (it runs in ~1.3s in
isolation). `vitest.config.ts` now sets `testTimeout: 15_000` project-wide
— a flaky quality gate would undermine the entire point of this phase.

## 1. Generated `ReleaseMetadata` hardening

`parseGitHubRelease()` (Phase 04R) already validates a *fresh* GitHub API
response strictly. `getReleaseMetadata()` (`app/lib/releases/index.ts`),
which reads the already-generated `app/generated/release.json`, previously
did a much shallower structural check (right shape of keys/types, nothing
else). A hand-corrupted or partially-edited generated file could pass that
check while violating real invariants (e.g. missing `arm64-v8a`, a
duplicate variant, a zero-byte size).

`app/lib/releases/validate-release-metadata.ts` (new) exports
`validateReleaseMetadata(value: unknown): ReleaseMetadata`, throwing a
`ReleaseMetadataValidationError` with an explicit, specific message when
any of the following is violated:

- `available` is a boolean;
- `available: true` requires: non-empty `version`; `publishedAt` a
  parseable date string; non-empty `releaseUrl`; `artifacts` an array;
- each artifact: recognized `variant`, no duplicate variant, non-empty
  `fileName` matching the `puriki-v{version}-{variant}.apk` convention
  (reusing `buildArtifactFileName()` from `parse-github-release.ts` rather
  than re-deriving the naming rule), finite `sizeBytes > 0`, non-empty
  `downloadUrl`;
- `arm64-v8a` and `universal` are both present.

`getReleaseMetadata()` now calls this validator on every read and wraps a
failure in a clear, actionable error message (including the underlying
reason) rather than a generic "does not match the contract" string.

**Not** duplicated: `index.ts` did not become a second parser. The one
piece of parsing logic that both files need (the filename convention) is
imported, not re-implemented.

## 2. Required-artifact boundary — no more silent `null`

`AvailableReleaseView` in `app/sections/download-section.tsx` used to
contain:

```tsx
if (!arm64 || !universal) {
  return null;
}
```

justified by a comment saying this "should be impossible" given the
parser's guarantees. After hardening `getReleaseMetadata()`, that comment
is now actually enforced at the boundary that matters — so the silent
`null` was removed. `app/lib/releases/index.ts` gained:

```ts
export function getRequiredReleaseArtifact(
  release: ReleaseAvailable,
  variant: AndroidArtifactVariant,
): AndroidReleaseArtifact
```

which throws a specific error (naming the missing variant and the release
version) instead of returning `undefined`. `download-section.tsx` now
calls this for `arm64-v8a`/`universal` instead of the optional
`getReleaseArtifact()` lookup + null-check. The practical effect: a
corrupted generated file now fails loudly in `pnpm test`/`pnpm build`
(via `getReleaseMetadata()` first, or via this helper if that check were
ever bypassed) — it can never again reach production as a silently
incomplete or missing Download section. Nothing here throws a raw error
into a real user's browser: the failure occurs at build/test time, before
anything is published.

## 3. Stale baseline comment corrected

`tests/releases/get-release-metadata.test.ts` asserted
`{ available: false }` against the committed baseline with a comment
claiming "jvitorn/puriki has no stable release yet" — inaccurate since
Phase 04R (`v1.0.0` is public). The comment now explains the real, current
reason for the `{ available: false }` baseline: it is a deliberate,
versioned fixture that keeps `pnpm build`/`pnpm test` offline and
deterministic; production always runs `pnpm release:fetch` first (see
`.github/workflows/deploy-pages.yml`), and `available: true` behavior is
covered separately by fixtures, not by mutating this file. The assertion
itself was correct and unchanged — only the comment was stale.

## 4. Package scripts

```json
"validate:static": "tsx scripts/validate-static-output.ts",
"verify": "pnpm format:check && pnpm lint && pnpm typecheck && pnpm test"
```

`build` is intentionally left out of `verify` — it needs per-invocation
`SITE_URL`/`BASE_PATH` (dev vs. GitHub Pages vs. a future custom domain),
so folding it into a single fixed command would make that harder to
control. `validate:static` is its own script for the same reason: it runs
*after* a specific build, against whatever `SITE_URL`/`BASE_PATH` that
build used.

## 5. Static output validator

`scripts/validate-static-output.ts` (new), run via `pnpm validate:static`
after `pnpm build`. Node built-ins + the project's own existing pure
helpers only — no HTML-parser dependency was added (`cheerio`/`jsdom` for
this would be overkill for what's essentially structured regex matching
over a known, project-controlled HTML shape).

It reuses, rather than re-derives:

- `LOCALES`/`PAGES`/`getPagePath` (`app/lib/i18n/*`) for the nine public
  routes — the same source of truth `react-router.config.ts` and
  `scripts/generate-seo-files.ts` already use;
- `buildAbsoluteUrl`/`normalizeSiteUrl` (`app/lib/seo/site-url.ts`) for
  canonical/hreflang URL construction (this file is explicitly documented
  as safe for a plain Node script, unlike `app/lib/config.ts`, which
  depends on `import.meta.env` and cannot be imported outside Vite);
- `getPublicUrls`/`buildSitemapXml`/`buildRobotsTxt`
  (`scripts/generate-seo-files.ts`) — the validator compares the actual
  `sitemap.xml`/`robots.txt` byte-for-byte against what that same
  generator would produce for the configured `SITE_URL`, instead of
  re-deriving sitemap/robots rules a second time.

What it checks, per public route (derived from `getExpectedPublicFiles()`,
never a hand-written path list):

- the flattened output file exists at the path
  `prepare-static-output.mjs` actually produces (`<route>/index.html`,
  `index.html` for the root);
- `<html lang>` matches the route's locale;
- non-empty `<title>` and meta description;
- `<link rel="canonical">` equals `SITE_URL` + the page's own path (no
  `/puriki-site/puriki-site/` duplication, no locale collapsing to `/`);
- exactly the four expected `hreflang` alternates (`pt-BR`/`en`/`es`/
  `x-default`, `x-default` → the pt-BR equivalent);
- Open Graph (`og:type`/`og:site_name`/`og:title`/`og:description`/
  `og:url`/`og:image`) and Twitter Card tags present, `og:url` equal to
  the canonical;
- `SoftwareApplication` JSON-LD present on Home, and **absent** on
  Privacy/Terms;
- favicon/apple-touch-icon/stylesheet `<link>` hrefs start with the
  configured base path;
- no stray `"/assets/..."` reference rooted at `/` instead of the base
  path (the exact "forgot the project-site prefix" bug class);
- no doubled base path segment anywhere in the document;
- no `http(s)://localhost` reference anywhere in the document when
  `SITE_URL` isn't itself a localhost URL (a local dev build using the
  default `http://localhost:5173` is correctly exempt).

Whole-artifact checks:

- `build/client/404.html` exists (the flattened GitHub Pages 404, not
  just the prerendered `/404/index.html`);
- `sitemap.xml`/`robots.txt` exist and match the generator's expected
  output for the configured `SITE_URL`, and never reference `/foundation`
  or `/404`;
- `seo/og-image.png`, `favicon.png`, `apple-touch-icon.png` exist;
- **no forbidden artifact** anywhere in the tree: `*.apk`, `*.keystore`,
  `*.jks`, `SHA256SUMS.txt` (case-insensitive) — APKs and checksums are a
  GitHub Release concern only, never something this repository hosts;
- **no secret-like pattern** in any text asset (`.html`/`.js`/`.css`/
  `.xml`/`.txt`/`.json`/`.map`): `ghp_…`, `github_pat_…`,
  `RELEASE_FETCH_TOKEN`, `GITHUB_TOKEN`, `EAS_TOKEN`. This is a sanity
  check, not a full secret scanner — and correctly finds nothing today,
  since none of these identifiers has any reason to reach a static client
  bundle in this architecture.

It does **not** hardcode `1.0.0` or any other version anywhere — it was
exercised against both the committed `{ "available": false }` baseline and
the real live `v1.0.0` release (see "Local validation results" below) and
passed both without any version-specific code path.

Testable pieces are exported as pure functions
(`getExpectedPublicFiles`, `containsLocalhost`, `hasDuplicatedBasePath`,
`checkHtmlDocument`, `runValidation`) and covered by
`tests/scripts/validate-static-output.test.ts` (23 tests): route → file
mapping, localhost detection, duplicated-base-path detection, individual
HTML-invariant violations, and `runValidation` against both a fully valid
temporary fixture and several deliberately broken ones (missing route
file, stray `.apk`, missing `404.html`, missing `build/client` entirely).
The heaviest, most valuable check remains simply running `pnpm build &&
pnpm validate:static` for real, which both CI workflows do.

## 6. Quality workflow (PR gate)

`.github/workflows/quality.yml` (new). Trigger: `pull_request` and `push`
to `main`. Job name `quality` (workflow name `Quality`) — deliberately
static and matrix-free so it's a stable, predictable branch-protection
status-check name (see "Manual GitHub configuration").

Permissions: `contents: read` only, at both workflow and job level — this
workflow never publishes anything, so it never needs `pages`/`id-token`/
`pull-requests: write`.

Environment: `ubuntu-latest`, Node 22, pnpm via `packageManager` (matches
`deploy-pages.yml` — no Node/browser test matrix, per the brief: this is a
small static landing, not a library needing broad compatibility coverage).

Steps: checkout → set up pnpm → set up Node (with pnpm cache) →
`pnpm install --frozen-lockfile` → `pnpm format:check` → `pnpm lint` →
`pnpm typecheck` → `pnpm test` → production-style `pnpm build` (with
`BASE_PATH=/puriki-site/`/`SITE_URL=https://jvitorn.github.io/puriki-site/`
so the base-path/canonical/localhost checks below are meaningful) →
`pnpm validate:static`. Each is its own step (not folded into `pnpm
verify`) so a failure shows up as a specific, named red step in the GitHub
UI rather than one opaque blob.

**This workflow never runs `pnpm release:fetch`.** PR CI always builds and
validates against the committed `{ "available": false }` baseline —
deterministic, fast, and never dependent on the GitHub API or its rate
limits. `available: true` behavior is exercised by the test suite's
fixtures instead (`tests/releases/*`, `tests/sections/download-section
.test.tsx`, `tests/i18n/json-ld.test.ts`). The real, live release is only
ever validated by the deploy workflow, immediately before publishing.

No `continue-on-error`, no matrix, no E2E/Playwright.

## 7. Deploy workflow changes

`.github/workflows/deploy-pages.yml` — triggers (`push` to `main`,
`workflow_dispatch`, `repository_dispatch: puriki-release-published`),
`concurrency` (`group: pages`, `cancel-in-progress: true`), and the
`build`/`deploy` job split with their existing permission boundaries were
all preserved unchanged. What changed inside the `build` job:

```
checkout → setup pnpm/Node → install --frozen-lockfile
  → pnpm verify (NEW — quality gate)
  → pnpm release:fetch (unchanged, still real)
  → pnpm build (unchanged, still production env)
  → pnpm validate:static (NEW)
  → upload-pages-artifact
```

`pnpm verify` (rather than four separate steps, unlike `quality.yml`) is
used here deliberately to avoid duplicating the same four steps' YAML
twice across two workflow files for a project this size — see
`docs/planos/DECISIONS.md`'s general preference for simple over clever.
Any gate failing (formatting, lint, typecheck, test, the real
`release:fetch`, or `validate:static`) stops the job before
`upload-pages-artifact`/`deploy` run, so a bad `main` push, or a future
stable release missing `arm64-v8a`/`universal`, can never publish — the
previously deployed site stays live untouched. Permissions are unchanged:
`build` keeps `contents: read`; `deploy` keeps `pages: write`/
`id-token: write` only.

## 8. Dependabot

`.github/dependabot.yml` (new): `npm` (pnpm uses the npm ecosystem
identifier in Dependabot) and `github-actions`, both `weekly`,
`open-pull-requests-limit: 10`. No auto-merge — every PR (including a
major bump) still requires the Quality check to pass and a human review,
per the brief.

## 9. Security sanity checks

Source-level (manual grep, this phase): no `VITE_*` secret, no hardcoded
`GITHUB_TOKEN`/`RELEASE_FETCH_TOKEN`/`ghp_`/`github_pat_`, no EAS/keystore/
OAuth material anywhere in `puriki-site`. This matches
`docs/planos/DECISIONS.md`'s repository-boundary rule (`purikuki` owns all
Android signing/EAS/app secrets; this repository never receives them).

Build-artifact-level (automated, every `validate:static` run — see
section 5): no APK/keystore/`SHA256SUMS.txt`, no secret-like identifier
text, in `build/client`. This is a sanity check, not a formal security
audit — a full manual review remains Phase 07 scope (section 11 of
`PHASE_07_LAUNCH_HARDENING.md`).

## 10. Build performance review

From a production-style build (`BASE_PATH=/puriki-site/
SITE_URL=https://jvitorn.github.io/puriki-site/ pnpm build`) against the
real `v1.0.0` release, `build/client` roughly totals:

| Category | Size (uncompressed) |
|---|---|
| JS (`assets/*.js`, all route chunks combined) | ~608 KB |
| CSS (`assets/*.css`) | ~36 KB |
| Fonts (`assets/*.woff2`, Geist subsets) | ~84 KB |
| Images/static (favicon, apple-touch-icon, OG image, brand SVGs) | ~72 KB |
| Largest single files | `entry.client-*.js` (~184 KB), `jsx-runtime-*.js` (~128 KB), `button-*.js` (~80 KB) |

This is proportionate to a React 19 + Radix + React Router landing with
route-based code splitting; gzip (what browsers actually transfer) is
substantially smaller for all of the above. No arbitrary performance
budget was introduced, and nothing here is large enough or clearly
unused enough to justify chasing further in this phase — Lighthouse-driven
diagnostics remain Phase 07 scope. Anime.js and Geist were spot-checked
and are used/subset as already described in `docs/planos/DECISIONS.md`
and prior phase reports; neither was touched this phase.

## 11. What Phase 06 deliberately did not add

Per the brief's explicit "do not" list — all confirmed absent after this
phase:

- no Playwright/E2E suite (static routing is already covered by the
  prerender-list test plus the real `pnpm build && pnpm validate:static`
  run in both workflows);
- no Node or browser version matrix;
- no code-coverage percentage target;
- no cross-repo release-dispatch sender, PAT, or GitHub App in `puriki`;
- no Dependabot auto-merge;
- no visual/motion redesign, analytics, backend, CMS, PWA/service worker,
  or custom domain work;
- Phase 07 itself was not started (see its own document for what remains
  there).

## Local validation results (this phase)

Run in order, exactly as a maintainer or CI would:

1. `pnpm install --frozen-lockfile` — lockfile already consistent with
   `package.json`, no changes needed.
2. `pnpm verify` (`format:check` → `lint` → `typecheck` → `test`) — all
   green; **159 tests** across **21 files** (up from **109 tests across
   18 files** before this phase — see the coverage audit table for
   exactly which tests are new: `validate-release-metadata.test.ts` (18),
   `get-required-release-artifact.test.ts` (5),
   `validate-static-output.test.ts` (23), plus 4 new `buildPageLinks`
   tests folded into the existing `tests/i18n/metadata.test.ts`).
3. `pnpm build` (default `SITE_URL=http://localhost:5173`,
   `BASE_PATH=/`) then `pnpm validate:static` — pass.
4. `BASE_PATH=/puriki-site/ SITE_URL=https://jvitorn.github.io/puriki-site/
   pnpm build` then `pnpm validate:static` (same env) — pass, confirming
   project-site base path, canonical/hreflang, and localhost-absence all
   hold against the offline `{ "available": false }` baseline.
5. `pnpm release:fetch` against the real, public `jvitorn/puriki` API —
   found `v1.0.0` with all five Android artifacts
   (`arm64-v8a`/`universal`/`armeabi-v7a`/`x86_64`/`x86`), classified
   correctly.
6. Repeated step 4 with that real release data in
   `app/generated/release.json` — `pnpm build` and `pnpm validate:static`
   both pass; the built HTML's JSON-LD correctly carries
   `"softwareVersion":"1.0.0"` and the `arm64-v8a` artifact's
   `downloadUrl`, matching Phase 04R's rule.
7. `app/generated/release.json` was restored to the committed
   `{ "available": false }` baseline afterward (`git status` confirms no
   diff on that file) — this project's established policy (Phase 04/04R),
   unchanged by this phase.

A deliberate negative test was also run manually (not part of the
committed suite): a stray `.apk` dropped into `build/client/assets/` and a
required route's `index.html` deleted were both caught immediately by
`pnpm validate:static`, confirming the validator actually fails when it
should, not just when convenient.

**Important distinction:** everything above is *local* validation. Neither
`quality.yml` nor the updated `deploy-pages.yml` had actually executed on
GitHub Actions as of writing this document — that only happens once this
branch is pushed and a PR/workflow run exists. "Local validation passed"
is not the same claim as "the GitHub Actions run passed."

## Manual GitHub configuration still required

These cannot be verified or set from within the repository's code, and
are therefore **not** marked complete in the checklists ([!]):

1. **Pages Source.** `Settings → Pages → Build and deployment → Source →
   GitHub Actions`. Without this, `deploy-pages.yml` has nothing to
   publish to, regardless of how green its own run is.
2. **Branch protection / ruleset requiring the Quality check.**
   `Settings → Branches` (or `Rules → Rulesets`) → protect `main` → enable
   "Require status checks to pass before merging" → select the check
   named exactly **`quality`** (the job id inside the `Quality` workflow
   defined in `.github/workflows/quality.yml`). Until this is configured,
   a red `quality.yml` run does not actually block a merge into `main` —
   the workflow existing is necessary but not sufficient.

Both remain `[!]` in `CHECKLIST-PT-BR.md`/`CHECKLIST-EN.md` until a
maintainer confirms them in the GitHub UI.
