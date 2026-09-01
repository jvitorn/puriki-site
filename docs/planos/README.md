# Puriki Site — Planning Hub

This directory is the implementation source of truth for the official Puriki landing page.

The purpose of these documents is to let a developer or coding agent implement the site without having to reinterpret product, UX, architecture, content, release, accessibility, SEO, and deployment decisions from scratch.

## Repository

- Site repository: `jvitorn/puriki-site`
- App repository: `jvitorn/purikuki`
- Site repository default branch: `main`
- App repository default branch: `master`
- Initial hosting: GitHub Pages
- Initial public URL: `https://jvitorn.github.io/puriki-site/`
- Future custom domain candidate: `puriki.app` if acquired and suitable

## Planning directory choice

The plans live in `docs/planos/`, not in the repository root.

Reasons:

- keeps the project root focused on source/configuration files;
- makes implementation documentation easy to find;
- allows future technical documentation to coexist under `docs/`;
- avoids mixing executable project structure with planning material.

## Read order

1. `DECISIONS.md`
2. `CONTENT_SPEC.md`
3. `DESIGN_SYSTEM.md`
4. `IMPLEMENTATION_PLAN.md`
5. Execute phases in numeric order:
   - `PHASE_00_FOUNDATION.md`
   - `PHASE_01_DESIGN_SYSTEM.md`
   - `PHASE_02_ROUTING_I18N_CONTENT.md`
   - `PHASE_03_LANDING_SECTIONS.md`
   - `PHASE_04_DOWNLOAD_RELEASES.md`
   - `PHASE_05_ACCESSIBILITY_SEO_LEGAL.md`
   - `PHASE_06_TESTING_CI_DEPLOY.md`
   - `PHASE_07_LAUNCH_HARDENING.md`
6. Keep the appropriate global checklist updated:
   - `CHECKLIST-PT-BR.md`
   - `CHECKLIST-EN.md`

## Execution rules for Codex / coding agents

- Do not skip phases unless the plan explicitly allows it.
- Do not silently change product decisions in `DECISIONS.md`.
- If a decision becomes technically impossible or clearly harmful, stop and document:
  1. the conflicting decision;
  2. the technical reason;
  3. the smallest viable alternative;
  4. the migration/maintenance impact.
- Avoid overengineering. This is a static open-source product landing page, not a SaaS platform.
- Do not add a backend, database, CMS, analytics, authentication, telemetry, or server runtime unless a later explicit decision changes the scope.
- Do not expose tokens, GitHub credentials, Android signing data, EAS credentials, or any secret to Vite client code.
- Do not host APK files inside `puriki-site`.
- Treat the `purikuki` GitHub Releases page as the official application binary source.
- Stable release data must be resolved at build time, not fetched by every browser visit.
- Keep runtime JavaScript small and purposeful.
- Prefer semantic HTML and platform behavior over custom abstractions.
- Add shadcn/ui components only when they solve a concrete interaction/accessibility need.
- Code identifiers, file names, comments, tests, and commit-ready technical text should be in English. Product copy follows the active locale.
- After completing a phase:
  - run its validation commands;
  - mark completed items in both global checklists;
  - record any deviation or follow-up;
  - do not mark an item complete if it was only partially implemented.

## Status convention

Use:

- `[ ]` not started
- `[-]` in progress / partially complete
- `[x]` complete and validated
- `[!]` blocked, with explanation immediately below the item

Do not use percentage estimates for development progress.

## Definition of done for the whole project

The first public version of the landing is complete when:

- all routes are statically pre-rendered;
- PT-BR, EN, and ES are available with correct localized metadata;
- the landing represents only currently available Puriki features as current;
- future features are clearly labeled as roadmap;
- the stable APK download flow is trustworthy and functional;
- the no-release state is also functional;
- Privacy and Terms pages exist;
- WCAG 2.2 AA is used as the accessibility target;
- reduced-motion behavior is implemented;
- SEO metadata, Open Graph, sitemap, robots, canonical, and hreflang are correct;
- CI runs lint/typecheck/tests/build;
- GitHub Pages deploy is automated from `main`;
- no analytics or unnecessary third-party scripts are present;
- the production site passes the launch checklist in Phase 07.
