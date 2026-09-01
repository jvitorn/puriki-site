# Puriki Site — Locked Product and Technical Decisions

This file records decisions that should not be casually re-litigated during implementation.

## Product purpose

Puriki Site is the official landing page and download surface for the Puriki Android application.

It must:

- explain what Puriki is;
- show the product visually;
- explain its relationship with AniList and MyAnimeList;
- communicate privacy/local-first principles accurately;
- present current features without overstating future functionality;
- expose the official Android APK download;
- point developers and contributors to GitHub;
- provide a compact roadmap;
- provide Privacy Policy and Terms of Use pages.

It must **not** become:

- technical documentation;
- an account/dashboard system;
- an application backend;
- a release artifact host;
- a replacement for the GitHub README, Issues, Releases, or detailed roadmap.

## Product positioning

Primary headline direction:

> Sua lista de anime, do seu jeito.

Primary supporting idea:

> Connect AniList or MyAnimeList and manage your anime list through a simpler Android-focused experience.

Core philosophy:

- AniList and MyAnimeList remain the list providers.
- Puriki is the experience/orchestration layer.
- Puriki does not present itself as a replacement database.
- Provider limitations must not be hidden behind misleading claims.

## Current vs future functionality

### Puriki 1.0 — Foundation
Current/current-public-state content may include:

- catalog/home;
- search;
- anime details;
- user list;
- AniList authentication;
- MyAnimeList authentication;
- list reading;
- progress updates;
- status updates;
- score updates;
- provider selection;
- supported guest/no-provider flows where verified;
- local synopsis translation on Android where verified;
- local cache/resilience;
- multiple languages.

### Puriki 2.0 — List Sync + visual refresh
Roadmap only until released.

List Sync is:

- manual;
- one-way;
- explicit source -> destination;
- analysis before writing;
- conflict-aware;
- designed to avoid regressions;
- non-destructive to destination-only titles.

Do not describe it as continuous automatic synchronization.

### Puriki 3.0 — Multi-provider Sync
Roadmap only until released.

Concept:

- replication of future changes made through Puriki to connected providers.

Do not confuse it with List Sync.

## Current public roadmap presentation

Only three high-level items:

1. `1.0 — Foundation` — Current / Available when the first public release exists
2. `2.0 — List Sync + new visual` — Next
3. `3.0 — Multi-provider Sync` — Planned

Rules:

- no percentages;
- no invented dates;
- do not use “coming soon” for uncertain timelines;
- detailed roadmap stays on GitHub.

## Primary CTA

Primary action:

> Baixar para Android

The Hero CTA scrolls to the Download section rather than immediately downloading a binary.

The final Download CTA performs the actual APK download.

Secondary CTA:

> Ver no GitHub

## Distribution

Official binary flow:

`purikuki -> stable GitHub Release -> APK asset -> puriki-site download UI`

Rules:

- APKs are never committed to `puriki-site`.
- The site does not mirror or proxy APKs.
- The APK is downloaded directly from the official GitHub Release asset.
- Stable releases are the default public download.
- Drafts and prereleases do not replace the stable CTA.
- The site must support a clean “first public release is still in preparation” state.

Expected APK naming convention:

`puriki-{version}-android.apk`

Examples:

- `puriki-1.0.0-android.apk`
- `puriki-1.1.0-android.apk`

## Stack

Locked initial stack:

- React
- TypeScript
- Vite
- React Router Framework Mode
- `ssr: false`
- static prerender for all public routes
- Tailwind CSS
- shadcn/ui only for justified primitives/interactions
- Lucide React
- Anime.js
- Geist as the primary font
- pnpm
- Vitest
- React Testing Library
- GitHub Actions
- GitHub Pages

Explicitly not selected:

- Next.js
- Astro
- Vercel
- backend/server runtime
- database
- CMS
- runtime GitHub API dependency
- analytics at launch
- Google Analytics
- cookie banner at launch

## Rendering model

The site must be deployable as static files.

Public routes must be pre-rendered at build time so direct navigation and refresh work on GitHub Pages without SPA 404 hacks.

No HashRouter URLs.

Do not ship language routes as query-string-only variants.

## Languages

Initial languages:

- Portuguese (Brazil) — default
- English
- Spanish

URL model:

- `/` — pt-BR
- `/privacy/`
- `/terms/`
- `/en/`
- `/en/privacy/`
- `/en/terms/`
- `/es/`
- `/es/privacy/`
- `/es/terms/`

Rules:

- no forced language redirect;
- the selected URL remains authoritative;
- optional locale preference may be stored locally;
- translations are static/editorial, not runtime machine translation;
- all SEO metadata must be localized.

## Visual direction

- dark-only initially;
- dark editorial/product aesthetic;
- screenshots are the primary visual proof;
- current brand red is a design token, not a hardcoded component color;
- use a small, controlled set of surfaces;
- minimal gradients;
- no glassmorphism as a general pattern;
- no cyberpunk/neon/anime-template styling;
- Japanese brand elements are used as brand elements, not decorative wallpaper;
- providers do not visually dominate Puriki.

Current token direction:

- `#0B0E14` base background
- `#111522` / `#1A2030` elevated surfaces
- `#293043` stronger border/surface reference
- `#970C10` current brand
- `#D9474C` possible brand highlight
- light foreground close to `#F8FAFC`

Exact tokens are finalized in Phase 01.

## Motion

Anime.js is polish, not functionality.

Allowed:

- short fade/translate entries;
- restrained stagger;
- subtle screenshot transforms;
- provider-to-Puriki connector animation;
- small hover enhancements.

Avoid:

- looping floating objects;
- background particle systems;
- mouse-follow effects;
- large 3D scenes;
- letter-by-letter hero animation;
- animation required to understand content.

`prefers-reduced-motion` is mandatory.

## Accessibility

Target: WCAG 2.2 AA.

Core rules:

- semantic HTML;
- one meaningful `h1`;
- correct heading hierarchy;
- keyboard support;
- visible focus;
- skip link;
- no interaction that depends on hover;
- no state communicated by color alone;
- approximately 44px minimum touch target for key actions;
- useful image alt text;
- native HTML before ARIA;
- reduced motion;
- no zoom blocking.

## Analytics and privacy

Launch with no product analytics.

Do not add:

- GA4;
- tracking pixels;
- behavioral analytics;
- advertising SDKs;
- cookie-based tracking.

The site may still be subject to GitHub Pages infrastructure logging/privacy behavior. Privacy copy must not claim “the site collects nothing” in an absolute sense.

## Domain and hosting

Initial hosting:

GitHub Pages project site under:

`https://jvitorn.github.io/puriki-site/`

The project must support a configurable base path.

Future custom domain candidate:

`puriki.app`

Do not block launch on acquiring a custom domain.

When a custom domain is adopted:

- configure it through GitHub Pages;
- enforce HTTPS;
- update `SITE_URL`;
- update canonical/hreflang/sitemap/Open Graph absolute URLs;
- verify the domain on GitHub when appropriate;
- `BASE_PATH` becomes `/`.

## Site/App repository boundary

`puriki-site` owns:

- presentation;
- marketing copy;
- localized content;
- screenshots;
- Privacy/Terms;
- SEO;
- GitHub Release metadata rendering;
- GitHub Pages deployment.

`purikuki` owns:

- Android application code;
- Expo/EAS;
- Android signing;
- APK build;
- GitHub Release creation;
- release notes/changelog;
- app credentials;
- application secrets.

Never transfer app signing/EAS secrets to `puriki-site`.
