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

- [ ] Semantic tokens created.
- [ ] Initial dark-only theme.
- [ ] Brand red consumed through tokens, not hardcoded.
- [ ] Geist configured.
- [ ] Global visible focus.
- [ ] Skip link prepared.
- [ ] Reduced motion configured.
- [ ] Container and Section primitives created.
- [ ] Button configured.
- [ ] Sheet configured.
- [ ] Accordion configured.
- [ ] Collapsible added only if necessary.
- [ ] Responsive Header created.
- [ ] Structural Footer created.
- [ ] Generic smartphone mockup created.
- [ ] Small Anime.js helper with reduced-motion support.

## Phase 02 — Routes, i18n and Content

- [ ] `pt-BR` locale.
- [ ] `en` locale.
- [ ] `es` locale.
- [ ] `/`.
- [ ] `/privacy/`.
- [ ] `/terms/`.
- [ ] `/en/`.
- [ ] `/en/privacy/`.
- [ ] `/en/terms/`.
- [ ] `/es/`.
- [ ] `/es/privacy/`.
- [ ] `/es/terms/`.
- [ ] 404 created.
- [ ] Typed content model created.
- [ ] PT-BR implemented as source content.
- [ ] EN complete.
- [ ] ES complete.
- [ ] EN human-reviewed before launch.
- [ ] ES human-reviewed before launch.
- [ ] Accessible language selector.
- [ ] Language switching preserves equivalent page.
- [ ] No forced automatic redirect.
- [ ] Metadata per page/locale prepared.
- [ ] All routes prerender.

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
- [ ] `pnpm install --frozen-lockfile`.
- [ ] Lint in CI.
- [ ] Typecheck in CI.
- [ ] Tests in CI.
- [ ] Build in CI.
- [ ] Static route validation.
- [ ] GitHub Pages workflow.
- [ ] Pages source set to GitHub Actions.
- [ ] Manual deploy available.
- [ ] Deploy concurrency controlled.
- [ ] `/puriki-site/` base validated.
- [ ] Project-site assets work.
- [ ] No secret in published artifact.

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
