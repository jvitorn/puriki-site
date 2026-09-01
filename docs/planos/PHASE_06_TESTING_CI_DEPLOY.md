# Phase 06 — Automated Quality, CI and GitHub Pages Deployment

## Goal

Make quality checks reproducible and deployment boring.

## 1. Test strategy

Keep the suite proportionate to a static landing.

### Unit tests

Required targets:

- [ ] locale helpers;
- [ ] route mapping;
- [ ] release parser;
- [ ] file-size formatter;
- [ ] release date formatter;
- [ ] canonical/hreflang generation;
- [ ] release availability logic.

### Component tests

High-value targets:

- [ ] locale switcher;
- [ ] Header/mobile navigation;
- [ ] FAQ;
- [ ] Download available state;
- [ ] Download unavailable state;
- [ ] SHA copy status;
- [ ] reduced-motion-sensitive behavior where practical.

Do not chase 100% coverage.

Use tests to protect product-critical behavior.

### E2E

Not required initially.

Add Playwright later only if:

- direct static routing repeatedly regresses;
- download navigation requires browser-level validation;
- cross-browser interactions become complex.

## 2. CI workflow

Trigger:

- [ ] pull requests to `main`;
- [ ] pushes to `main` as appropriate.

Steps:

1. checkout;
2. setup Node;
3. setup pnpm;
4. dependency cache;
5. `pnpm install --frozen-lockfile`;
6. lint;
7. typecheck;
8. tests;
9. build;
10. static route output validation.

Ensure production release metadata fetch behavior is deterministic.

## 3. Static output validation

Create a lightweight check that required paths exist in output.

Validate at least all localized route HTML outputs.

If router output structure differs from assumed nested `index.html`, validate actual static host behavior rather than a hardcoded directory assumption.

Also verify:

- [ ] sitemap exists;
- [ ] robots exists;
- [ ] social image exists;
- [ ] 404 exists as required by Pages strategy.

## 4. GitHub Pages deployment workflow

Use the supported GitHub Pages artifact/action approach.

Requirements:

- [ ] deployment from `main`;
- [ ] Pages environment;
- [ ] least required workflow permissions;
- [ ] upload only static output;
- [ ] no source secrets in artifact;
- [ ] deployment concurrency to avoid overlapping publish races;
- [ ] manual `workflow_dispatch`.

GitHub Pages repository settings:

- [ ] Source = GitHub Actions.

## 5. Project-site base path

Initial public path:

`/puriki-site/`

Verify:

- [ ] JS/CSS asset URLs;
- [ ] image URLs;
- [ ] internal navigation;
- [ ] canonical URLs;
- [ ] social image absolute URLs;
- [ ] sitemap URLs;
- [ ] Download external GitHub URL;
- [ ] language routes.

Do not use root-absolute asset paths that break under the project base.

## 6. Environment configuration

Production build must receive:

- `SITE_URL=https://jvitorn.github.io/puriki-site`
- appropriate `BASE_PATH=/puriki-site/`

Exact formatting should be normalized in a configuration helper to prevent duplicate/missing slashes.

Future custom domain:

- `SITE_URL=https://puriki.app`
- `BASE_PATH=/`

No component should care.

## 7. Release-triggered deploy

If Phase 04 cross-repo dispatch is implemented:

Site deploy workflow trigger set may include:

- push to `main`;
- `workflow_dispatch`;
- `repository_dispatch` with an explicit event name such as `puriki-release-published`.

Validate payload/event type but fetch authoritative release metadata from GitHub during site build.

## 8. Dependabot / dependency maintenance

Optional but recommended:

- [ ] enable Dependabot for npm ecosystem and GitHub Actions;
- [ ] reasonable cadence;
- [ ] avoid automatic merge without CI;
- [ ] review major upgrades manually.

## 9. Security basics

- [ ] no secret in `VITE_*`;
- [ ] no Android/EAS secret in site repo;
- [ ] no long-lived PAT in site source;
- [ ] cross-repo dispatch token stored only as GitHub secret in app repo if used;
- [ ] workflow permissions minimized;
- [ ] Actions pinned to stable major versions or stricter if project policy prefers.

## 10. Build performance

Do not over-optimize.

Review:

- [ ] JS bundle reasonable for a static landing;
- [ ] Anime.js only used where needed;
- [ ] no unused large UI library;
- [ ] images dominate payload only where expected;
- [ ] font files subset/weight count reasonable.

## Acceptance criteria

A PR cannot merge green while failing build/tests, and a normal `main` deployment can publish a working GitHub Pages site without manual file uploads.
