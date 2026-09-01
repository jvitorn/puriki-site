# Phase 05 — Accessibility, SEO, Privacy and Terms

## Goal

Make the site fit for public use, sharing, indexing, and transparent disclosure.

## A. Accessibility

Target:
WCAG 2.2 AA as practical project standard.

### Structure

- [ ] exactly one meaningful H1 per page;
- [ ] logical H2/H3 hierarchy;
- [ ] semantic `header`, `nav`, `main`, `section`, `footer`;
- [ ] links are links;
- [ ] actions are buttons;
- [ ] lists use list semantics when applicable;
- [ ] skip-to-content link.

### Keyboard

Test all:

- [ ] header navigation;
- [ ] mobile menu;
- [ ] language selector;
- [ ] download CTA;
- [ ] GitHub links;
- [ ] FAQ;
- [ ] install disclosure;
- [ ] hash disclosure;
- [ ] copy-hash button.

Requirements:

- [ ] visible focus;
- [ ] no focus trap outside intentional Sheet;
- [ ] Sheet returns focus appropriately;
- [ ] no hover-only content.

### Contrast

- [ ] run contrast checks for token combinations;
- [ ] muted text remains readable;
- [ ] brand CTA text passes;
- [ ] focus ring passes;
- [ ] roadmap status does not rely only on color.

### Images

- [ ] meaningful screenshots have concise descriptive alt;
- [ ] duplicate/decorative visuals use empty alt;
- [ ] logo/brand has accessible name;
- [ ] provider logos, if used, do not replace readable provider names.

### Motion

- [ ] respect `prefers-reduced-motion`;
- [ ] no motion required to reveal information;
- [ ] disable or shorten smooth scroll where appropriate;
- [ ] no vestibular-heavy effect.

### Zoom/reflow

Review at:

- [ ] 200% browser zoom;
- [ ] narrow 320 CSS px equivalent if practical;
- [ ] increased text scaling where browser permits.

No content should become unreachable.

## B. SEO

### Localized titles

PT-BR direction:
`Puriki — Sua lista de anime, do seu jeito`

English direction:
`Puriki — Your anime list, your way`

Create appropriate Spanish equivalent.

### Descriptions

Each Home locale gets a concise description including:

- Puriki;
- AniList/MyAnimeList;
- Android;
- free/open source/no ads where natural.

Do not keyword stuff.

Legal pages:
- `Política de Privacidade — Puriki`
- `Termos de Uso — Puriki`
- localized equivalents.

### Canonical

- [ ] canonical for every route;
- [ ] generated from `SITE_URL` + route;
- [ ] includes custom-domain compatibility;
- [ ] does not accidentally canonicalize all locales to `/`.

### hreflang

Every equivalent page group must declare:

- [ ] `pt-BR`;
- [ ] `en`;
- [ ] `es`;
- [ ] `x-default` -> default PT-BR route unless strategy changes.

Privacy maps to Privacy across locales, not Home.

### Open Graph

- [ ] localized title;
- [ ] localized description;
- [ ] canonical URL;
- [ ] site name;
- [ ] type;
- [ ] social image;
- [ ] image width/height if supported;
- [ ] locale metadata.

Initial social image should be mostly language-neutral:

- Puriki branding;
- product mockup;
- minimal/no localized text.

### Social metadata

Support common Twitter/X card metadata using the same social image.

Do not require a project X account.

### JSON-LD

Use a `SoftwareApplication` / `MobileApplication` representation where semantically valid.

Include only truthful fields, such as:

- name;
- application category;
- operating system Android;
- official site URL;
- download URL only when a stable release exists;
- software version only when available;
- free pricing only if represented correctly.

Do not invent:

- rating;
- review count;
- organization facts;
- Play Store URL.

### Sitemap

Generate:

- [ ] `/`
- [ ] `/privacy/`
- [ ] `/terms/`
- [ ] `/en/`
- [ ] `/en/privacy/`
- [ ] `/en/terms/`
- [ ] `/es/`
- [ ] `/es/privacy/`
- [ ] `/es/terms/`

Use absolute canonical URLs.

### robots.txt

- [ ] allow normal indexing;
- [ ] reference sitemap absolute URL;
- [ ] no unnecessary disallow rules.

### Favicons

- [ ] SVG/favicon where appropriate;
- [ ] common PNG/ICO fallback if needed;
- [ ] Apple touch icon;
- [ ] correct manifest/meta if a manifest is added.

Do not turn the landing into a PWA without a requirement.

## C. Privacy page

Create localized Privacy pages.

Must accurately cover:

- [ ] site/app distinction;
- [ ] no Puriki account;
- [ ] provider authentication;
- [ ] provider API communication;
- [ ] token storage approach;
- [ ] local cache/preferences;
- [ ] local translation behavior where applicable;
- [ ] data reset/deletion behavior where applicable;
- [ ] no first-party analytics at launch;
- [ ] GitHub Pages hosting;
- [ ] third-party providers/services;
- [ ] changes to policy;
- [ ] contact/report path.

Important:

Do not claim the website infrastructure stores no logs. GitHub Pages is third-party hosting.

Do not claim app data never leaves the device because provider API communication occurs.

## D. Terms page

Create localized Terms.

Cover:

- [ ] independent/unofficial status;
- [ ] no affiliation with AniList/MAL;
- [ ] provider API dependency;
- [ ] provider availability/change limitations;
- [ ] responsible use;
- [ ] open-source software context;
- [ ] absence of guaranteed uninterrupted availability;
- [ ] roadmap/features may change;
- [ ] limitation language proportionate to the project.

Final public legal text should receive human/legal review appropriate to the project's risk and jurisdiction.

## E. Provider branding review

Before public launch:

- [ ] review AniList terms/branding guidance for logo usage;
- [ ] review MyAnimeList terms/branding guidance for logo usage;
- [ ] if uncertain, use text labels rather than unapproved logos;
- [ ] maintain independent/unofficial disclaimer.

## F. Analytics

Verify:

- [ ] no GA;
- [ ] no tracking pixel;
- [ ] no advertising;
- [ ] no analytics cookie;
- [ ] no consent banner needed solely because of unused tracking.

If any service is added later, Privacy must be updated before deployment.

## Automated and manual checks

Automated where useful:

- [ ] axe or equivalent component/page smoke checks;
- [ ] metadata presence tests;
- [ ] route canonical/hreflang unit tests.

Manual:

- [ ] keyboard-only pass;
- [ ] screen reader spot-check;
- [ ] reduced-motion pass;
- [ ] contrast pass;
- [ ] 200% zoom pass.

## Acceptance criteria

No major accessibility blocker remains, all public pages have correct localized SEO metadata, and Privacy/Terms match the actual deployed architecture.
