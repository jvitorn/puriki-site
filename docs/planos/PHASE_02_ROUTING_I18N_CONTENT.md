# Phase 02 — Static Routing, Internationalization and Content Model

## Goal

Create the complete route and locale structure before building the full landing.

Reference:
`CONTENT_SPEC.md`

## 1. Locale model

Supported locales:

- [ ] `pt-BR`
- [ ] `en`
- [ ] `es`

Create a strict locale type and configuration map.

Each locale config should define:

- [ ] locale code;
- [ ] HTML `lang`;
- [ ] public URL prefix;
- [ ] display name;
- [ ] optional short label;
- [ ] locale-specific date formatting strategy.

Avoid scattering locale comparisons across components.

## 2. Public routes

Must prerender:

PT-BR:

- [ ] `/`
- [ ] `/privacy/`
- [ ] `/terms/`

English:

- [ ] `/en/`
- [ ] `/en/privacy/`
- [ ] `/en/terms/`

Spanish:

- [ ] `/es/`
- [ ] `/es/privacy/`
- [ ] `/es/terms/`

Also:

- [ ] branded 404 behavior/output appropriate for GitHub Pages.

## 3. Content model

Create typed content data rather than deeply embedding text in presentational components.

Suggested top-level structure:

```text
seo
navigation
hero
providers
benefits
showcases
privacySummary
openSource
roadmap
download
faq
footer
privacyPage
termsPage
```

Requirements:

- [ ] all locale objects satisfy the same schema;
- [ ] TypeScript detects missing keys;
- [ ] UI components accept content props;
- [ ] URLs/actions are configured separately from translatable copy where useful.

Do not create a runtime translation dictionary with magic string keys if typed content objects are simpler.

## 4. PT-BR source copy

Use `CONTENT_SPEC.md` as the basis.

- [ ] Implement approved PT-BR copy.
- [ ] Clearly mark statements that still require verification against final app behavior.
- [ ] Do not invent Play Store availability.
- [ ] Do not claim 1.0 List Sync.
- [ ] Do not claim iOS availability.
- [ ] Do not make absolute privacy/security claims.

## 5. English and Spanish

- [ ] Add complete English content.
- [ ] Add complete Spanish content.
- [ ] Preserve product terms such as `List Sync` where intentionally branded.
- [ ] Keep provider names unchanged.
- [ ] Ensure copy fits without layout-specific manual line breaks.
- [ ] Flag translations for human review before launch.

No runtime machine translation.

## 6. Locale switcher

Requirements:

- [ ] accessible label;
- [ ] displays human-readable language names;
- [ ] maps equivalent page routes between locales;
- [ ] switching from `/privacy/` to English goes to `/en/privacy/`, not `/en/`;
- [ ] switching from `/en/terms/` to Spanish goes to `/es/terms/`;
- [ ] no forced redirect on page load;
- [ ] optional localStorage preference must not override a directly requested URL.

## 7. Metadata model

Prepare per-locale/per-page metadata data:

- [ ] title;
- [ ] description;
- [ ] canonical path;
- [ ] Open Graph locale/title/description;
- [ ] optional social image reference.

Do not yet over-optimize every SEO detail; Phase 05 completes SEO.

## 8. Route architecture

Keep route modules small.

Recommended concept:

- common Home component receives locale content;
- common Privacy component receives locale legal copy;
- common Terms component receives locale legal copy;
- route mapping supplies locale/page context.

Avoid copying entire JSX pages three times.

## 9. Static prerender verification

Build and verify that all required routes produce static output.

Test direct file/route mapping under the GitHub Pages project base.

Do not rely on SPA fallback hacks.

## Tests

- [ ] every locale content object validates against the shared type;
- [ ] locale route mapping tests;
- [ ] locale switch equivalent-route tests;
- [ ] all required public route entries are present;
- [ ] metadata model has title/description for all pages/locales.

## Acceptance criteria

Phase complete when:

- all nine primary localized pages prerender;
- direct nested route structure is valid;
- content is centrally typed;
- locale switch logic is correct;
- no section implementation needs to know how URL prefixes are constructed manually.
