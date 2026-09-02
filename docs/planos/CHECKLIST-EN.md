# Global Checklist — Puriki Site (EN)

> Executive checklist. Detailed requirements and acceptance criteria live in the phase files.

## Phase 00 — Foundation

- [x] React + TypeScript + Vite project created.
- [-] pnpm configured and lockfile committed.
- [x] React Router Framework Mode configured.
- [x] `ssr: false` configured.
- [x] Static prerender proven.
- [x] Tailwind configured.
- [x] shadcn/ui initialized without unnecessary components.
- [x] Lucide React installed.
- [x] Anime.js installed.
- [x] Vitest + React Testing Library working.
- [x] ESLint configured.
- [x] Typecheck configured.
- [x] `dev`, `build`, `lint`, `typecheck`, `test` scripts working.
- [x] `SITE_URL` and `BASE_PATH` configurable.
- [x] No secret exposed to Vite.
- [x] Root README updated.

## Phase 01 — Design System

- [x] Semantic tokens created.
- [x] Initial dark-only theme.
- [x] Brand red consumed through tokens, not hardcoded.
- [x] Geist configured.
- [x] Global visible focus.
- [x] Skip link prepared.
- [x] Reduced motion configured.
- [x] Container and Section primitives created.
- [x] Button configured.
- [x] Sheet configured.
- [x] Accordion configured.
- [x] Collapsible added only if necessary.
- [x] Responsive Header created.
- [x] Structural Footer created.
- [x] Generic smartphone mockup created.
- [x] Small Anime.js helper with reduced-motion support.

Note: Collapsible was not added because there is no concrete use for it yet.

## Phase 02 — Routes, i18n and Content

- [x] `pt-BR` locale.
- [x] `en` locale.
- [x] `es` locale.
- [x] `/`.
- [x] `/privacy/`.
- [x] `/terms/`.
- [x] `/en/`.
- [x] `/en/privacy/`.
- [x] `/en/terms/`.
- [x] `/es/`.
- [x] `/es/privacy/`.
- [x] `/es/terms/`.
- [x] 404 created.
- [x] Typed content model created.
- [x] PT-BR implemented as source content.
- [x] EN complete.
- [x] ES complete.
- [ ] EN human-reviewed before launch.
- [ ] ES human-reviewed before launch.
- [x] Accessible language selector.
- [x] Language switching preserves equivalent page.
- [x] No forced automatic redirect.
- [x] Metadata per page/locale prepared.
- [x] All routes prerender.

Note: this phase's Home/Privacy/Terms are a content/routing scaffold
(minimal semantic structure + anchors), not the final landing design —
that remains Phase 03 scope. Full detail in
`PHASE_02_ROUTING_I18N_CONTENT.md`.

## Phase 03 — Landing

- [x] Final Header.
- [x] Hero.
- [x] “Sua lista de anime, do seu jeito.” source H1 implemented.
- [x] “Download for Android” localized CTA.
- [x] GitHub CTA.
- [x] AniList -> Puriki <- MyAnimeList section.
- [x] Restrained connector animation.
- [x] Reduced-motion fallback.
- [x] Four core benefits.
- [x] List showcase.
- [x] Discovery showcase.
- [x] Details/translation showcase.
  - Translation copy (Google ML Kit, Android, PT-BR/ES) implemented and
    verified.
- [x] Translation claims verified against real app.
- [x] Privacy section.
- [x] Open Source section.
- [x] 1.0/2.0/3.0 Roadmap.
- [x] 2.0 clearly future.
- [x] 3.0 clearly planned.
- [x] Download shell.
- [x] "first public version in preparation" state.
- [x] FAQ.
- [x] Footer.
- [x] Final screenshots selected.
  - Maintainer decision (recorded in Phase 04): the stylized mockups
    (Hero and showcases) are the definitive visual solution for the
    landing. Real app screenshots are no longer a requirement.
- [x] Screenshots optimized.
  - N/A — no image files to optimize; the mockups render via
    markup/CSS (design-system tokens), not binary assets.
- [x] Alt text reviewed.
  - Localized alt text present for every mockup.
- [x] Mobile layout reviewed.
- [x] Desktop layout reviewed.

Note: this phase also fixed the `puriklLabel` -> `purikiLabel` naming typo
and the roadmap link (`purikuki#roadmap` -> `PURIKI_PRODUCT_ENGINEERING_ROADMAP.md`).
Full detail in `PHASE_03_LANDING_SECTIONS.md`.

## Phase 04 — Releases and APK

- [x] Build-time GitHub Release script created.
- [x] Latest stable release used.
- [x] Draft ignored.
- [x] Prerelease ignored for primary CTA.
- [x] `puriki-{version}-android.apk` asset located.
- [x] Version captured.
- [x] Date captured.
- [x] Size captured.
- [x] Download URL captured.
- [x] Release URL captured.
- [x] SHA-256 captured when available.
- [x] Generated metadata file created.
- [x] No release produces `available: false`.
- [x] Technical API failure is not masked as "no release".
- [x] No token reaches client bundle.
- [x] Download points directly to GitHub Release.
- [x] File size formatted.
- [x] Date localized.
- [x] SHA disclosure.
- [x] Accessible copy-SHA button.
- [x] APK install instructions.
- [x] Release parser tests.
- [x] Stable vs prerelease test.
- [x] No-release test.
- [x] Missing/ambiguous asset test.
- [x] `workflow_dispatch` available.
- [ ] Cross-repository automatic dispatch added when app workflow is ready.
  - Deliberate external pending item: `puriki-site` already declares
    `repository_dispatch: types: [puriki-release-published]` in the
    workflow and always redoes its own `release:fetch` (never trusts an
    external payload). What's missing is `purikuki` gaining its own
    stable-release workflow to send that dispatch — out of this
    repository's scope.

## Phase 05 — Accessibility, SEO and Legal

### Accessibility
- [x] WCAG 2.2 AA used as reference.
- [x] Semantic HTML.
- [x] One H1 per page.
- [x] Correct heading hierarchy.
- [x] Complete keyboard navigation.
- [x] Visible focus.
- [x] Accessible Sheet.
- [x] Accessible FAQ.
- [x] No hover-dependent content.
- [x] States do not rely on color alone.
- [x] Adequate touch targets.
- [x] `prefers-reduced-motion`.
- [-] 200% zoom tested.
  - Approximated via 320px-width reflow (no overflow on `/`, `/privacy/`,
    `/terms/`, `/en/`, `/es/privacy/`). Literal browser zoom at 200%
    remains a Phase 07 task.
- [x] Contrast validated.
  - Computed numerically (WCAG formula) against the real tokens.
    Text/focus: 5.3–18.5:1. `border`/`border-strong`/`brand`-as-fill
    fall under 3:1 but are decorative, never the sole boundary indicator
    for a public interactive element (the Button `outline` variant only
    exists in the `/foundation/` sandbox) — token preserved as-is.
- [!] Screen-reader spot-check.
  - Blocked: no screen reader available in this environment. Recorded as
    a pending item for maintainer manual QA.

### SEO
- [x] Localized title.
- [x] Localized description.
- [x] Correct canonical.
- [x] pt-BR/en/es hreflang.
- [x] x-default.
- [x] Open Graph.
- [x] Twitter/X card.
- [x] Social image.
- [x] Application JSON-LD.
- [x] sitemap.xml.
- [x] robots.txt.
- [x] favicon.
- [x] apple-touch-icon.
- [x] No accidental `noindex`.
  - Foundation and 404 carry deliberate `noindex`; the nine public
    routes do not.

### Legal
- [x] Privacy PT-BR.
- [x] Privacy EN.
- [x] Privacy ES.
- [x] Terms PT-BR.
- [x] Terms EN.
- [x] Terms ES.
- [x] GitHub Pages properly described in Privacy.
- [x] No-analytics statement is accurate.
- [x] AniList/MAL relationship described accurately.
- [x] Unofficial-project disclaimer.
- [!] Provider logo usage reviewed.
  - Blocked: no official branding guidance was reviewed this phase.
    Still text-only labels (no logos), as already decided in Phases 02/03.
- [ ] Legal copy reviewed before launch.
  - Content is accurate and public, but has not had formal legal/human
    review — do not mark complete until that review happens.

## Phase 06 — Tests, CI and Deploy

- [ ] Locale tests.
- [ ] Route tests.
- [ ] Release parser tests.
- [ ] Download tests.
- [ ] Mobile menu tests.
- [ ] FAQ tests.
- [ ] Canonical/hreflang tests.
- [ ] PR CI.
- [ ] `main` CI.
- [x] `pnpm install --frozen-lockfile`.
- [ ] Lint in CI.
- [ ] Typecheck in CI.
- [ ] Tests in CI.
- [x] Build in CI.
- [ ] Static route validation.
- [x] GitHub Pages workflow.
- [ ] Pages source set to GitHub Actions.
- [x] Manual deploy available.
- [x] Deploy concurrency controlled.
- [x] `/puriki-site/` base validated.
- [x] Project-site assets work.
- [x] No secret in published artifact.

> Minimal GitHub Pages deployment infrastructure was intentionally implemented during Phase 01 to allow visual validation of each subsequent phase. Full CI/deployment hardening remains part of Phase 06.

The Pages source still needs to be selected manually as GitHub Actions in the repository settings. Full CI gates and the remaining Phase 06 automations are still pending.

## Phase 07 — Launch

- [ ] Marketing features compared with real build.
- [ ] Minimum Android version confirmed before publishing.
- [ ] Roadmap status verified.
- [ ] No-release state tested.
- [ ] Stable-release state tested.
- [ ] Real Android download tested.
- [ ] SHA verified.
- [ ] Direct production routes tested.
- [ ] PT-BR reviewed.
- [ ] EN reviewed.
- [ ] ES reviewed.
- [ ] Small mobile reviewed.
- [ ] Common mobile reviewed.
- [ ] Tablet reviewed.
- [ ] Desktop reviewed.
- [ ] Keyboard reviewed.
- [ ] Reduced motion reviewed.
- [ ] 200% zoom reviewed.
- [ ] Lighthouse used diagnostically.
- [ ] Broken links checked.
- [ ] SEO metadata inspected in final HTML.
- [ ] Privacy/Terms checked.
- [ ] Bundle checked for secrets.
- [ ] No unexpected tracking scripts.
- [ ] Maintenance README updated.
- [ ] PT-BR checklist synchronized.
- [ ] HTTPS working.

## Post-launch

- [ ] Clean-browser smoke test.
- [ ] Private/incognito smoke test.
- [ ] Android smoke test.
- [ ] Official download confirmed.
- [ ] No critical console errors.
- [ ] GitHub links confirmed.
- [ ] Nested routes confirmed.

## Future Custom Domain

When a custom domain exists:

- [ ] Domain acquired/confirmed.
- [ ] GitHub Pages configured.
- [ ] DNS configured.
- [ ] HTTPS confirmed.
- [ ] Domain verified on GitHub when applicable.
- [ ] `SITE_URL` updated.
- [ ] `BASE_PATH=/`.
- [ ] Canonical reviewed.
- [ ] hreflang reviewed.
- [ ] sitemap reviewed.
- [ ] Open Graph reviewed.
- [ ] Direct routes reviewed.
