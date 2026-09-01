# Puriki Site — Master Implementation Plan

## Objective

Implement the official Puriki landing page as a fast, accessible, static, multilingual React site deployed to GitHub Pages and connected to the stable GitHub Releases of `jvitorn/purikuki`.

The work is intentionally divided into phases so each phase can be independently reviewed and validated.

## Phase map

| Phase | Name | Main outcome |
|---|---|---|
| 00 | Foundation | Reproducible React/Vite/Router project baseline |
| 01 | Design System | Tokens, typography, shell, responsive primitives |
| 02 | Routing, i18n & Content | Static locale routes and typed content model |
| 03 | Landing Sections | Full landing experience and responsive content |
| 04 | Download & Releases | Build-time stable release metadata and APK UX |
| 05 | Accessibility, SEO & Legal | WCAG target, metadata, Privacy/Terms, motion rules |
| 06 | Testing, CI & Deploy | Automated quality gates and GitHub Pages deployment |
| 07 | Launch Hardening | Production validation, content accuracy, handoff |

## Global non-goals

Do not implement during these phases unless scope is explicitly changed:

- user accounts;
- backend;
- database;
- CMS;
- serverless APIs;
- runtime GitHub API calls;
- analytics;
- newsletter;
- forms;
- Google Play publishing;
- iOS distribution;
- APK hosting in the site repo;
- release history UI beyond linking to GitHub Releases;
- dynamic roadmap from GitHub Issues;
- automatic machine translation;
- E2E suite unless a specific regression justifies it.

## Global quality gates

Every phase must preserve:

- `pnpm` lockfile reproducibility;
- TypeScript strictness appropriate to the project;
- lint cleanliness;
- typecheck cleanliness;
- build success;
- no client-side secrets;
- no console errors in production;
- no broken static routes;
- no copy that presents roadmap features as shipped.

## Phase 00 — Foundation

Detailed file:
`PHASE_00_FOUNDATION.md`

Target:

A clean project baseline that can be built locally and in CI.

Must include:

- pnpm;
- React + TypeScript;
- Vite;
- React Router Framework Mode;
- `ssr: false`;
- prerender-ready configuration;
- Tailwind;
- minimum shadcn setup;
- Lucide;
- Anime.js;
- Vitest/RTL;
- lint/typecheck/build scripts;
- `.editorconfig`;
- sensible `.gitignore`;
- project README basics;
- configurable `SITE_URL` and `BASE_PATH`.

Do not build landing sections yet.

## Phase 01 — Design System

Detailed file:
`PHASE_01_DESIGN_SYSTEM.md`

Target:

A reusable but small visual foundation.

Must include:

- semantic CSS tokens;
- dark-only theme;
- Geist loading;
- base typography;
- global focus;
- container;
- spacing system;
- Button;
- Sheet;
- Accordion;
- optional Collapsible only if needed;
- header/footer shell;
- generic app mockup primitive;
- responsive layout helpers;
- reduced-motion utility.

No marketing copy should be deeply hardcoded into primitives.

## Phase 02 — Routing, i18n & Content

Detailed file:
`PHASE_02_ROUTING_I18N_CONTENT.md`

Target:

All required PT-BR/EN/ES public URLs can be statically pre-rendered using the same component system.

Must include:

- locale model;
- typed content objects;
- route mapping;
- localized page metadata model;
- locale switcher;
- no forced redirects;
- Home/Privacy/Terms route skeletons;
- 404;
- route-level canonical/hreflang data model;
- test that locale content objects share the same schema.

PT-BR acts as the source content.

EN/ES copy should be reviewed; do not use runtime translation.

## Phase 03 — Landing Sections

Detailed file:
`PHASE_03_LANDING_SECTIONS.md`

Target:

Complete product landing page without release API integration.

Must include:

- Header;
- Hero;
- provider relationship;
- benefits;
- three product showcases;
- privacy summary;
- open-source section;
- roadmap;
- Download section shell/no-release state;
- FAQ;
- Footer.

This phase focuses on narrative, responsiveness, and screenshots.

Do not fake release metadata.

## Phase 04 — Download & Releases

Detailed file:
`PHASE_04_DOWNLOAD_RELEASES.md`

Target:

The download section shows trustworthy metadata for the latest stable `purikuki` release without making runtime GitHub API calls.

Must include:

- build script querying stable release metadata;
- expected APK asset matching;
- version;
- publication date;
- size;
- asset URL;
- GitHub Release URL;
- SHA-256 digest when exposed;
- generated release metadata file;
- graceful `available: false` fallback;
- tests for release parsing;
- stable vs prerelease behavior;
- installation disclosure;
- SHA disclosure/copy;
- no token exposed to browser.

Optional integration after base workflow is stable:

- `repository_dispatch` from app release workflow to site deployment workflow;
- minimal fine-grained token scope;
- manual `workflow_dispatch` fallback.

## Phase 05 — Accessibility, SEO & Legal

Detailed file:
`PHASE_05_ACCESSIBILITY_SEO_LEGAL.md`

Target:

Make the complete static site suitable for public indexing and general accessible use.

Must include:

- WCAG 2.2 AA-oriented manual review;
- skip link;
- heading hierarchy;
- focus;
- keyboard;
- reduced motion;
- alt text;
- contrast;
- semantic FAQ;
- localized Privacy;
- localized Terms;
- disclaimer;
- localized title/description;
- canonical;
- hreflang;
- Open Graph;
- JSON-LD;
- sitemap;
- robots;
- favicon/touch icon;
- no analytics.

## Phase 06 — Testing, CI & Deploy

Detailed file:
`PHASE_06_TESTING_CI_DEPLOY.md`

Target:

Every push/PR is validated and `main` deploys the static build to GitHub Pages.

Must include:

- lint;
- typecheck;
- unit/component tests;
- production build;
- route output validation;
- GitHub Actions CI;
- GitHub Pages deployment Action;
- Pages configured to GitHub Actions;
- project-site base path support;
- manual deploy trigger;
- concurrency protection;
- production artifact contains no secrets.

## Phase 07 — Launch Hardening

Detailed file:
`PHASE_07_LAUNCH_HARDENING.md`

Target:

Verify the site as a public product, not only as a passing codebase.

Must include:

- desktop/mobile review;
- Android real-device download flow;
- no-release and release states;
- language URL review;
- direct route refresh;
- GitHub links;
- provider claims;
- roadmap wording;
- legal pages;
- Lighthouse/a11y review;
- broken link scan;
- image size review;
- custom domain migration readiness;
- release handoff notes.

## Dependency chain

Recommended strict order:

`00 -> 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07`

Allowed parallel work after Phase 02:

- legal copy review can begin while Phase 03 is implemented;
- screenshot optimization can occur during Phases 03–05;
- app release workflow work can begin independently from site Phase 04.

Do not merge a phase that introduces broken public routes on the assumption a later phase will fix them.

## Suggested commit boundaries

Not mandatory, but recommended:

1. `chore: bootstrap puriki site`
2. `feat: add visual foundation`
3. `feat: add static localized routes`
4. `feat: build landing page sections`
5. `feat: integrate puriki release metadata`
6. `feat: add accessibility seo and legal pages`
7. `ci: add validation and github pages deployment`
8. `chore: harden site for public launch`

Avoid one enormous commit containing the entire landing.

## Final release criteria

Before the site is presented as public/official:

- Phase 07 passes;
- global checklists are complete;
- no known P0/P1 issue remains;
- PT-BR copy is final;
- EN and ES are reviewed;
- current-feature claims match the production app;
- Download CTA targets a stable signed APK or clearly communicates that the first release is not yet available;
- the app signing/build process remains outside the site repository;
- Privacy/Terms reflect actual services used;
- Pages HTTPS works;
- no unwanted tracking scripts are present.

## Future custom-domain migration

Not part of initial implementation unless the domain is already acquired.

When migrating:

1. add custom domain in GitHub Pages settings;
2. configure DNS;
3. verify HTTPS;
4. optionally add `CNAME` as required by the chosen Pages setup;
5. change `SITE_URL`;
6. change base path to `/`;
7. rebuild;
8. verify canonical/hreflang/Open Graph/sitemap;
9. verify direct nested routes;
10. verify old `github.io` behavior/redirect expectations;
11. verify domain through GitHub account security settings when applicable.

No component-level URL strings should need manual edits if configuration is correct.
