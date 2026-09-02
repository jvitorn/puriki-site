# Phase 05 — Accessibility, SEO, Privacy and Terms

## Goal

Make the site fit for public use, sharing, indexing, and transparent disclosure.

## A. Accessibility

Target:
WCAG 2.2 AA as practical project standard.

### Structure

- [x] exactly one meaningful H1 per page — verified by the axe smoke suite
      and by `tests/i18n/pages.test.tsx`/`tests/sections.test.tsx` across
      all locales;
- [x] logical H2/H3 hierarchy — Privacy/Terms sections now use real
      `<h2>`s per section (`app/pages/{privacy,terms}-page.tsx`), each
      wrapped in its own `<section aria-labelledby>`;
- [x] semantic `header`, `nav`, `main`, `section`, `footer` — unchanged
      from Phase 02/03, reconfirmed by the axe suite;
- [x] links are links; actions are buttons — no new `div` click handlers
      introduced this phase;
- [x] lists use list semantics when applicable — Benefits/Roadmap use
      real `<ul>/<ol>` with `<li>` as the direct child; the `Reveal`
      motion wrapper is nested *inside* each `<li>`, never between
      `<ol>`/`<ul>` and `<li>`, specifically to avoid breaking list
      semantics (see the Motion section below for why this mattered);
- [x] skip-to-content link — verified end-to-end in a real browser: it is
      the first Tab stop and activating it moves focus to `#main-content`.

### Keyboard

Tested with real keyboard events in a Chromium browser (not just RTL):

- [x] header navigation — tab order confirmed logical (skip link first);
- [x] mobile menu — opens on Enter, traps focus inside the dialog, closes
      and **returns focus to the trigger button** on Escape;
- [x] language selector — real `<a>` links, standard keyboard behavior;
- [x] download CTA — real link/button, no custom key handling needed;
- [x] GitHub links — real links;
- [x] FAQ — Enter on the first Accordion trigger correctly flips
      `aria-expanded` to `true`;
- [x] install disclosure — Enter on the Collapsible trigger correctly
      flips `data-state` to `open`;
- [x] hash disclosure / copy-hash button — reachable and activatable by
      keyboard, accessible status announced via `role="status"`.

Requirements:

- [x] visible focus — global `:focus-visible` outline (Phase 01),
      contrast-checked this phase (6.7:1 / 5.7:1, see Contrast below);
- [x] no focus trap outside intentional Sheet;
- [x] Sheet returns focus appropriately — confirmed above;
- [x] no hover-only content — nothing added this phase depends on hover.

### Contrast

Computed programmatically (WCAG relative-luminance formula) against the
actual shipped hex values in `app/styles/app.css`, not estimated:

- [x] `foreground`/`foreground-muted`/`foreground-subtle` on
      `background`/`surface`/`surface-raised`: **5.3:1 to 18.5:1** — all
      comfortably pass the 4.5:1 text minimum;
- [x] `brand-foreground` on `brand`/`brand-hover` (primary button text):
      **6.6:1 / 8.5:1** — pass;
- [x] `danger`/`success`/`warning` as text on `background`/`surface`:
      **6.3:1 to 10.6:1** — pass;
- [x] focus ring (`focus-ring` on `background`/`surface-raised`, non-text
      3:1 requirement): **6.7:1 / 5.7:1** — pass;
- [-] `border`/`border-strong`/`brand`-as-fill against `background`:
      **1.4:1 to 2.2:1** — below the 3:1 non-text-contrast threshold, but
      **not a WCAG 1.4.11 violation in practice**: these are decorative
      dividers/fills, never the sole means of perceiving a public
      interactive element's boundary (every real CTA has a text label,
      adequate touch target, and the high-contrast focus ring; the
      `outline` Button variant — the one case where a low-contrast border
      alone *would* matter — is used only in the non-public
      `/foundation/` sandbox). Left as-is to preserve the dark/red
      identity; recorded here rather than silently marked done.
- [x] roadmap statuses do not depend on color alone — "Em preparação" /
      "Próximo" / "Planejado" (and EN/ES equivalents) are textual, color
      is a secondary cue only.

### Images

- [x] the stylized Hero/showcase representations use `role="img"` +
      concise localized `aria-label` (from `hero.mockupAlt` /
      `showcases.items[].imageAlt`) — content, not decoration;
- [x] the header/footer brand SVGs use `alt=""` + `aria-hidden="true"`
      since the enclosing link already carries the "Puriki — página
      inicial" accessible name — no duplicate announcement;
- [x] provider names remain in real text (`AniList`, `MyAnimeList`); no
      provider logos are used, so this requirement is trivially satisfied.

### Motion

- [x] `prefers-reduced-motion` respected — verified in a real browser with
      `reducedMotion: "reduce"` emulated: **zero** elements had
      `opacity < 0.99` immediately after load (no animation ever runs);
- [x] no motion required to reveal information — same evidence;
- [x] reduced/no smooth scrolling — unchanged global CSS rule from
      Phase 01 (`@media (prefers-reduced-motion: reduce)`);
- [x] no vestibular-heavy effect — every new animation is a short
      opacity/translateY fade (`Reveal`), optionally staggered via a new
      `staggerChildren` prop that animates `element.children` through
      `animejs`'s `utils.stagger`; no loops, no parallax, no bounce.

One correctness note worth recording: the natural way to stagger a list's
`<li>` children with a single `IntersectionObserver` would be to put the
`Reveal` wrapper *around* the `<li>`s with `display:contents` (to stay
invisible to the accessibility tree). That was tried for
`RoadmapSection`, then reverted — `display:contents` elements have no
box, so `IntersectionObserver` cannot reliably observe them. `Reveal` is
now nested *inside* each `<li>` instead (one observer per item for
Roadmap/Benefits; a single `staggerChildren` observer is still used
wherever the wrapper isn't sitting between a list and its items, e.g.
Providers' pill/connector row and the showcase mockup internals, which
sit inside a `role="img"` subtree that's already opaque to assistive
tech).

### Zoom/reflow

- [x] 320 CSS px width — checked programmatically
      (`document.documentElement.scrollWidth` vs `clientWidth`) on `/`,
      `/privacy/`, `/terms/`, `/en/`, `/es/privacy/`: **zero overflow**;
- [x] no `user-scalable=no` / `maximum-scale=1` — viewport meta is
      `width=device-width, initial-scale=1` only, pinch zoom unaffected;
- [-] 200% browser zoom and increased text scaling — approximated via the
      320px-width check above (roughly equivalent reflow), not verified
      as literal OS-level browser zoom in every browser engine. Recorded
      as partial; full manual zoom review remains a Phase 07 launch-time
      task per `DECISIONS.md`'s phase boundaries.

## B. SEO

### Localized titles/descriptions

- [x] unchanged from Phase 02 PT-BR/EN copy, confirmed still correct in
      the current build's prerendered HTML.

### Canonical

- [x] every one of the nine public routes has `<link rel="canonical">`,
      built from `SITE_URL` + the page's own path
      (`app/lib/i18n/metadata.ts` -> `buildPageLinks`);
- [x] verified in the actual `BASE_PATH=/puriki-site/` production build's
      HTML — no double `/puriki-site/puriki-site/`, no locale
      cross-canonicalization to `/`.

### hreflang

- [x] every page declares `pt-BR`/`en`/`es`/`x-default` alternates;
- [x] `x-default` points at the pt-BR equivalent;
- [x] Privacy/Terms hreflang alternates point at Privacy/Terms in each
      locale, never at Home — verified in the built HTML
      (`/en/privacy/`'s alternates all resolve to `.../privacy/` paths).

### Open Graph

- [x] `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`,
      `og:image` (+ width/height), `og:locale` + `og:locale:alternate`
      for the other two locales — all present, verified in built HTML.
- [x] social image is language-neutral: dark background, brand glow, the
      official stacked logo, no marketing text — same image reused across
      all three locales (see Assets below).

### Twitter/X Card

- [x] `twitter:card=summary_large_image`, `twitter:title`,
      `twitter:description`, `twitter:image` (reusing the OG image);
- [x] `twitter:site` intentionally omitted — no official account exists.

### JSON-LD

- [x] `SoftwareApplication` (chosen over `MobileApplication` — more
      consistently recognized by structured-data tooling;
      `operatingSystem: "Android"` already narrows it correctly), emitted
      only on the three Home pages (`app/lib/i18n/metadata.ts`), not on
      Privacy/Terms — verified in built HTML (`grep` count 1 vs 0);
- [x] only truthful fields: `name`, `applicationCategory`,
      `operatingSystem`, `url`, `offers` (price "0", truthfully free) —
      no rating, review, download count, or Play Store URL;
- [x] pre-release (today's real state): `softwareVersion`/`downloadUrl`
      correctly **absent** — confirmed in the built HTML;
- [x] the same JSON-LD builder reads `getReleaseMetadata()` directly, so
      the day a stable release exists, the next build automatically adds
      `softwareVersion`/`downloadUrl` with no further code change.

### Sitemap

- [x] `scripts/generate-seo-files.ts` (run as part of `pnpm build`,
      after `react-router build` and before `prepare-static-output.mjs`,
      per this phase's own suggested ordering) writes `sitemap.xml` with
      exactly the nine public URLs, absolute, via the same
      `buildAbsoluteUrl`/`getPagePath` source of truth routing uses —
      Foundation and 404 are never included;
- [x] tested with fixtures (`tests/seo/generate-seo-files.test.ts`) and
      verified in the actual production build output.

### robots.txt

- [x] `Allow: /`, no unnecessary `Disallow` (Foundation/404 already
      `noindex` via meta — the modern-practice choice over blocking them
      from being crawled at all, which would hide the `noindex` tag from
      crawlers that already discovered the URL some other way);
- [x] references the absolute sitemap URL;
- [x] **documented limitation**: this repository is a GitHub Pages
      *project site*; this `robots.txt` only governs
      `https://jvitorn.github.io/puriki-site/robots.txt` and has no
      authority over `https://jvitorn.github.io/robots.txt` (the
      user/org site root), which this repository doesn't control. Noted
      in the script's own comment; becomes moot once a custom domain is
      adopted.

### Favicons

- [x] PNG favicon (64×64) + Apple touch icon (180×180), generated from
      the official pre-composited app icon (already carries this site's
      exact dark background, so it reads correctly regardless of the
      browser's own tab-bar theme) — see Assets below;
- [x] both linked via `withBasePath()` in `app/root.tsx`'s `links()`
      export, verified to resolve correctly under `/puriki-site/` in the
      production build;
- [-] no manifest added — correctly out of scope (`§`"Do not turn the
      landing into a PWA without a requirement").

## C. Privacy page — now real public content (PT-BR/EN/ES)

The "content in preparation" notice is gone; `preparationNotice` was
removed from the content type entirely. Every claim below was checked
against the actual `purikuki` app source, not assumed:

- [x] site/app distinction — an explicit first section separates the
      static site (GitHub Pages, no analytics) from the Android app;
- [x] no Puriki account — unchanged, accurate;
- [x] provider authentication — accurate (official AniList/MyAnimeList
      authorization flow);
- [x] token storage approach — **corrected to be precise**: only
      auth tokens go through `expo-secure-store`
      (`src/infrastructure/auth/expo-secure-auth-token-store.ts`,
      confirmed in the app repo, keyed per provider); the copy no longer
      claims "everything is in secure storage";
- [x] local cache/preferences — now names the real categories confirmed
      in `src/infrastructure/storage/` and `src/localization/`: language
      preference, onboarding state, primary provider, translation cache;
- [x] local translation behavior — confirmed the app uses a native
      on-device module (`ml-kit-synopsis-translator.ts`, calling a native
      `PurikukiTranslationModule`, not a network request) restricted to
      `pt`/`es` targets only (`synopsis-language.ts`); copy matches this
      exactly and stays Android-only, PT/ES-only;
- [x] data reset/deletion behavior — **corrected to only claim what's
      implemented**: disconnecting a provider removes that provider's
      stored credentials (confirmed: `ExpoSecureAuthTokenStore.remove()`
      deletes exactly one key); the copy explicitly does **not** claim a
      general "clear all local data" action, since no such feature exists
      in the app;
- [x] no first-party analytics at launch — confirmed by dependency/code
      audit (no Sentry/Firebase/analytics/crash-reporting package or
      import anywhere in `purikuki`);
- [x] GitHub Pages hosting — stated for the *site*, with the required
      caveat (GitHub's own infrastructure practices apply);
- [x] third-party services — AniList, MyAnimeList, GitHub Pages, and
      (Android-only) Google ML Kit translation components — nothing
      hypothetical;
- [x] changes to policy — present, points at the dated last-updated line;
- [x] contact/report path — GitHub Issues, with an explicit warning not
      to post tokens/passwords/sensitive data in a public issue.

No absolute claims anywhere ("never leaves the device", "100% private",
"we collect no data") — enforced by an automated test
(`tests/i18n/locale-content.test.ts`) that scans the actual body text of
all three locales for a list of forbidden patterns.

- [x] `lastUpdated: "2026-09-02"` (ISO, fixed — not `new Date()`),
      rendered via `<time dateTime>` + a locale-aware formatter
      (`app/lib/i18n/format.ts`).

## D. Terms page — now real public content (PT-BR/EN/ES)

- [x] independent/unofficial status + no AniList/MAL affiliation;
- [x] provider API dependency, explicitly framed as third-party services
      that can change without notice to Puriki;
- [x] provider availability/change limitations;
- [x] responsible use — reframed as "your account and responsible use"
      (credential security + compliance with provider terms);
- [x] open-source software context;
- [x] absence of guaranteed uninterrupted availability ("as is" wording);
- [x] roadmap/features may change — explicit "not a commitment" language,
      consistent with `DECISIONS.md`'s roadmap rules;
- [x] limitation language proportionate to a free, non-commercial project;
- [x] same dated `lastUpdated` treatment as Privacy.

**Not done, deliberately:** final public legal text has **not** received
human/legal review. This is recorded as an open item in both checklists,
not marked complete — the phase's job was accuracy against the real
system and structural completeness, not a legal sign-off.

## E. Provider branding review

- [!] **Blocked, as it was in Phase 03**: no official AniList/MyAnimeList
      brand-usage guidance was reviewed this phase (out of scope — no new
      information became available). Per the phase's own instruction,
      this does not block the phase: the landing continues to use text
      labels only (`AniList`, `MyAnimeList`), never logos, and keeps the
      independent/unofficial disclaimer.

## F. Analytics

- [x] confirmed no GA/GA4, tracking pixel, advertising SDK, or analytics
      cookie anywhere in `puriki-site` — nothing was added this phase
      either;
- [x] no consent/cookie banner added — correct, since the site sets no
      cookies of its own (`localStorage`/`sessionStorage` aren't used by
      this codebase either).

## Automated and manual checks

Automated:

- [x] axe (`vitest-axe`) smoke checks — Home (pt-BR), Privacy (en), Terms
      (es), and both Download states (available/unavailable) —
      **zero violations** detected (color-contrast rule disabled in
      jsdom, since jsdom cannot paint/compute real styles; contrast is
      covered separately by the numeric audit above);
- [x] metadata presence tests — title/description/canonical/hreflang/OG/
      Twitter/JSON-LD, all covered by `tests/i18n/metadata.test.ts` and
      the new `tests/seo/` suite;
- [x] route canonical/hreflang unit tests — `tests/seo/site-url.test.ts`
      covers the exact GitHub-Pages-project-site and future-custom-domain
      scenarios called out in this phase's brief.

Manual (in a real Chromium browser, not just unit tests):

- [x] keyboard-only pass — see Accessibility > Keyboard above;
- [ ] **screen reader spot-check — not performed.** No screen reader is
      available in this environment. Recorded as pending for
      maintainer/manual QA, not marked done. axe's automated checks are
      not a substitute for this.
- [x] reduced-motion pass — see Motion above;
- [x] contrast pass — see Contrast above (computed, not eyeballed);
- [-] 200% zoom pass — approximated via 320px-width reflow; literal
      browser-zoom review remains a Phase 07 task.

## Acceptance criteria

- [x] No major accessibility blocker found (axe clean; keyboard, focus,
      contrast, and reduced-motion all verified).
- [x] All nine public pages have correct localized SEO metadata
      (verified in the actual production-build HTML, not just component
      output).
- [x] Privacy/Terms match the actual deployed architecture — checked
      against the real `purikuki` source, not assumed or copied from the
      Phase 03 placeholder.
- [ ] Human/legal review of EN/ES translations and of the legal text —
      **not done**, intentionally left open in the checklists.
