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

- [ ] Final Header.
- [ ] Hero.
- [ ] “Sua lista de anime, do seu jeito.” source H1 implemented.
- [ ] “Download for Android” localized CTA.
- [ ] GitHub CTA.
- [ ] AniList -> Puriki <- MyAnimeList section.
- [ ] Restrained connector animation.
- [ ] Reduced-motion fallback.
- [ ] Four core benefits.
- [ ] List showcase.
- [ ] Discovery showcase.
- [ ] Details/translation showcase.
- [ ] Translation claims verified against real app.
- [ ] Privacy section.
- [ ] Open Source section.
- [ ] 1.0/2.0/3.0 Roadmap.
- [ ] 2.0 clearly future.
- [ ] 3.0 clearly planned.
- [ ] Download shell.
- [ ] “first public version in preparation” state.
- [ ] FAQ.
- [ ] Footer.
- [ ] Final screenshots selected.
- [ ] Screenshots optimized.
- [ ] Alt text reviewed.
- [ ] Mobile layout reviewed.
- [ ] Desktop layout reviewed.

## Phase 04 — Releases and APK

- [ ] Build-time GitHub Release script created.
- [ ] Latest stable release used.
- [ ] Draft ignored.
- [ ] Prerelease ignored for primary CTA.
- [ ] `puriki-{version}-android.apk` asset located.
- [ ] Version captured.
- [ ] Date captured.
- [ ] Size captured.
- [ ] Download URL captured.
- [ ] Release URL captured.
- [ ] SHA-256 captured when available.
- [ ] Generated metadata file created.
- [ ] No release produces `available: false`.
- [ ] Technical API failure is not masked as “no release”.
- [ ] No token reaches client bundle.
- [ ] Download points directly to GitHub Release.
- [ ] File size formatted.
- [ ] Date localized.
- [ ] SHA disclosure.
- [ ] Accessible copy-SHA button.
- [ ] APK install instructions.
- [ ] Release parser tests.
- [ ] Stable vs prerelease test.
- [ ] No-release test.
- [ ] Missing/ambiguous asset test.
- [ ] `workflow_dispatch` available.
- [ ] Cross-repository automatic dispatch added when app workflow is ready.

## Phase 05 — Accessibility, SEO and Legal

### Accessibility
- [ ] WCAG 2.2 AA used as reference.
- [ ] Semantic HTML.
- [ ] One H1 per page.
- [ ] Correct heading hierarchy.
- [ ] Complete keyboard navigation.
- [ ] Visible focus.
- [ ] Accessible Sheet.
- [ ] Accessible FAQ.
- [ ] No hover-dependent content.
- [ ] States do not rely on color alone.
- [ ] Adequate touch targets.
- [ ] `prefers-reduced-motion`.
- [ ] 200% zoom tested.
- [ ] Contrast validated.
- [ ] Screen-reader spot-check.

### SEO
- [ ] Localized title.
- [ ] Localized description.
- [ ] Correct canonical.
- [ ] pt-BR/en/es hreflang.
- [ ] x-default.
- [ ] Open Graph.
- [ ] Twitter/X card.
- [ ] Social image.
- [ ] Application JSON-LD.
- [ ] sitemap.xml.
- [ ] robots.txt.
- [ ] favicon.
- [ ] apple-touch-icon.
- [ ] No accidental `noindex`.

### Legal
- [ ] Privacy PT-BR.
- [ ] Privacy EN.
- [ ] Privacy ES.
- [ ] Terms PT-BR.
- [ ] Terms EN.
- [ ] Terms ES.
- [ ] GitHub Pages properly described in Privacy.
- [ ] No-analytics statement is accurate.
- [ ] AniList/MAL relationship described accurately.
- [ ] Unofficial-project disclaimer.
- [ ] Provider logo usage reviewed.
- [ ] Legal copy reviewed before launch.

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
