# Phase 03 — Landing Page Sections and Product Story

## Goal

Build the complete landing narrative using the content model and design system.

No fake release data is allowed.

## 1. Header

- [ ] localized nav labels;
- [ ] anchor links;
- [ ] correct active/focus behavior;
- [ ] Download scroll target;
- [ ] GitHub external link;
- [ ] locale switcher;
- [ ] mobile Sheet;
- [ ] skip link before/around primary navigation as appropriate.

## 2. Hero

Implement:

- [ ] Puriki brand;
- [ ] one `h1`;
- [ ] approved headline;
- [ ] supporting copy;
- [ ] primary Download scroll CTA;
- [ ] secondary GitHub CTA;
- [ ] trust/support line;
- [ ] one strong product mockup;
- [ ] optional restrained background grid/glow.

Responsive:

Desktop:
- [ ] two-column composition.

Mobile:
- [ ] heading;
- [ ] copy;
- [ ] CTAs;
- [ ] mockup.

Do not force 100vh.

## 3. Provider relationship / How it works

- [ ] title and explanatory copy;
- [ ] AniList label;
- [ ] MyAnimeList label;
- [ ] Puriki center;
- [ ] arrows/connectors ending at Puriki;
- [ ] no AniList -> MAL implication;
- [ ] responsive desktop/mobile composition;
- [ ] Anime.js connector reveal;
- [ ] reduced-motion static fallback.

Provider logos:

- [ ] layout must work without logos;
- [ ] if logos are used, verify branding permission/guidance before launch;
- [ ] include text names regardless of logo use.

## 4. Four benefits

Implement only the four agreed pillars.

- [ ] list management;
- [ ] discovery/search;
- [ ] provider choice;
- [ ] day-to-day mobile comfort.

Requirements:

- [ ] compact;
- [ ] no engineering-internal features as marketing cards;
- [ ] icon use is restrained;
- [ ] no inaccessible hover-only detail.

## 5. Product showcases

Three sections:

### A. List
- [ ] approved title/copy;
- [ ] relevant screenshot;
- [ ] progress/status context.

### B. Discovery
- [ ] approved title/copy;
- [ ] home/search screenshot;
- [ ] optional secondary overlap if readable.

### C. Details/translation
- [ ] approved title/copy;
- [ ] details screenshot;
- [ ] translation claim only after app verification.

Desktop:
- [ ] visual alternation allowed.

Mobile DOM order:
- [ ] title;
- [ ] copy;
- [ ] image.

## 6. Privacy summary

- [ ] “Feito para respeitar seus dados” content;
- [ ] three privacy pillars;
- [ ] avoid absolute claims;
- [ ] link to localized Privacy page.

Do not say user data never leaves the device.

## 7. Open Source

- [ ] “Aberto por natureza”;
- [ ] code open on GitHub;
- [ ] free;
- [ ] no ads;
- [ ] GitHub CTA;
- [ ] no GitHub vanity metrics.

## 8. Roadmap

- [ ] 1.0 Foundation;
- [ ] 2.0 List Sync + visual refresh;
- [ ] 3.0 Multi-provider Sync;
- [ ] correct status vocabulary;
- [ ] roadmap disclaimer;
- [ ] GitHub roadmap link.

Desktop:
- [ ] compact horizontal progression.

Mobile:
- [ ] vertical progression.

Do not show progress percentages or dates.

## 9. Download shell

Before Phase 04 integration:

- [ ] implement section structure;
- [ ] implement valid no-release state;
- [ ] do not hardcode fake release;
- [ ] installation disclosure shell;
- [ ] SHA disclosure may remain hidden when unavailable;
- [ ] GitHub link available.

## 10. FAQ

Use shadcn Accordion.

- [ ] all eight questions;
- [ ] direct first-sentence answers;
- [ ] keyboard behavior;
- [ ] heading/trigger semantics appropriate;
- [ ] no excessive animation.

## 11. Footer

- [ ] Product links;
- [ ] Project links;
- [ ] Legal links;
- [ ] independent/unofficial disclaimer;
- [ ] copyright;
- [ ] localized copy.

## 12. Screenshots/assets

Use the prototype ZIP/PDF as visual reference, but the final site must not blindly reproduce prototype inconsistencies.

- [ ] select final screenshots;
- [ ] preserve original sources separately if useful;
- [ ] create optimized WebP/AVIF outputs;
- [ ] declare width/height;
- [ ] lazy-load below fold;
- [ ] prioritize Hero image;
- [ ] add useful alt text or `alt=""` when truly decorative;
- [ ] avoid text baked into site-generated marketing images when possible.

## Motion

- [ ] restrained section entry;
- [ ] provider connector motion;
- [ ] optional screenshot reveal;
- [ ] cleanup and reduced-motion behavior.

Do not animate every section just because Anime.js is installed.

## Manual responsive review

At minimum:

- [ ] 360x800 class;
- [ ] 390x844 class;
- [ ] 768x1024 class;
- [ ] 1280x800 class;
- [ ] 1440x900 class.

Check:

- [ ] no overflow;
- [ ] no unreadably tiny screenshots;
- [ ] CTAs remain obvious;
- [ ] no orphan words created by hardcoded `<br>`;
- [ ] footer remains usable;
- [ ] roadmap semantics remain clear.

## Acceptance criteria

The landing can be reviewed as a complete product story even before a public APK exists.

A visitor should understand within one scroll:

- what Puriki is;
- which providers it works with;
- that Android is the initial target;
- that Puriki does not replace the providers;
- where to download once available.
