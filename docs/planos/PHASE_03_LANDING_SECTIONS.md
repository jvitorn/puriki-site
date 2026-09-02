# Phase 03 — Landing Page Sections and Product Story

## Goal

Build the complete landing narrative using the content model and design system.

No fake release data is allowed.

> **Product decision (approved by maintainer, recorded during Phase 04):**
> the stylized, purely-visual mockups used in the Hero and the three
> showcases (`app/sections/hero-section.tsx`,
> `app/sections/showcase-mockups.tsx`) are the intentional visual solution
> for this landing — not temporary placeholders waiting on real app
> screenshots. Real screenshots are no longer a requirement or a blocker
> for this phase. See section 12.

## 1. Header

- [x] localized nav labels;
- [x] anchor links;
- [x] correct active/focus behavior;
- [x] Download scroll target;
- [x] GitHub external link;
- [x] locale switcher;
- [x] mobile Sheet;
- [x] skip link before/around primary navigation as appropriate.

Preserved from Phase 02 (`SiteHeader`); only the external GitHub URL was
switched to the shared `PURIKUKI_REPO_URL` constant.

## 2. Hero

Implement:

- [x] Puriki brand;
- [x] one `h1`;
- [x] approved headline;
- [x] supporting copy;
- [x] primary Download scroll CTA;
- [x] secondary GitHub CTA;
- [x] trust/support line;
- [x] one strong product mockup;
- [x] optional restrained background grid/glow.

Implemented in `app/sections/hero-section.tsx`. Only the radial brand glow
was added (no background grid) — judged not to add enough to justify it.
The mockup is a stylized "My List" representation (bars/blocks built from
design tokens, no literal words) inside the Phase 01 `SmartphoneMockup`.
**Decision (post-Phase 03, approved by maintainer):** this stylized
representation is the intentional visual solution for the landing, not a
placeholder — see section 12.

Responsive:

Desktop:
- [x] two-column composition.

Mobile:
- [x] heading;
- [x] copy;
- [x] CTAs;
- [x] mockup.

Do not force 100vh. Confirmed — the section uses natural content height.

## 3. Provider relationship / How it works

- [x] title and explanatory copy;
- [x] AniList label;
- [x] MyAnimeList label;
- [x] Puriki center;
- [x] arrows/connectors ending at Puriki;
- [x] no AniList -> MAL implication;
- [x] responsive desktop/mobile composition;
- [x] Anime.js connector reveal;
- [x] reduced-motion static fallback.

Implemented in `app/sections/providers-section.tsx`: `AniList -> Puriki <-
MyAnimeList`, both arrows always point at Puriki. Reveal (fade/translate,
reusing the Phase 01 `Reveal` + `useReducedMotion`) rather than an SVG
path-drawing animation — the phase file allows either "draw" or "reveal";
reveal was simpler and consistent with the rest of the page. Verified with
a test that no link/element in `#providers` connects AniList to
MyAnimeList directly.

Provider logos:

- [x] layout works without logos (text pills only);
- [ ] branding permission N/A — no logos used this phase;
- [x] text names included.

## 4. Four benefits

- [x] list management;
- [x] discovery/search;
- [x] provider choice;
- [x] day-to-day mobile comfort.

Implemented in `app/sections/benefits-section.tsx` — exactly the four
pillars already in the content model, one Lucide icon per card
(`ListChecks`, `Search`, `ToggleLeft`, `Smartphone`), no engineering
concepts (cache/OAuth/rate-limiting/etc.) presented as marketing cards.

## 5. Product showcases

Three sections, all implemented in `app/sections/showcases-section.tsx` +
`app/sections/showcase-mockups.tsx`:

### A. List
- [x] approved title/copy;
- [x] relevant stylized product representation (see section 12);
- [x] progress/status context (visual, non-textual).

### B. Discovery
- [x] approved title/copy;
- [x] home/search stylized representation;
- [x] optional secondary overlap — not added, kept simple/legible.

### C. Details/translation
- [x] approved title/copy;
- [x] details stylized representation;
- [x] translation claim — now included and verified: on-device synopsis
      translation via Google ML Kit, scoped explicitly to Android and to
      PT-BR/ES readers (content model updated, see report).

Desktop:
- [x] visual alternation (`lg:order-*`, DOM order never changes).

Mobile DOM order:
- [x] title;
- [x] copy;
- [x] image.

## 6. Privacy summary

- [x] "Feito para respeitar seus dados" content;
- [x] three privacy pillars;
- [x] avoid absolute claims;
- [x] link to localized Privacy page (verified per-locale in tests).

Implemented in `app/sections/privacy-section.tsx`. No "100% private" /
"never leaves the device" / "no data collected" / "totally secure"
language present.

## 7. Open Source

- [x] "Aberto por natureza";
- [x] code open on GitHub;
- [x] free;
- [x] no ads;
- [x] GitHub CTA;
- [x] no GitHub vanity metrics.

Implemented in `app/sections/open-source-section.tsx`, its own section
(not merged into Benefits).

## 8. Roadmap

- [x] 1.0 Foundation;
- [x] 2.0 List Sync + visual refresh;
- [x] 3.0 Multi-provider Sync;
- [x] correct status vocabulary (Em preparação / Próximo / Planejado, and
      EN/ES equivalents);
- [x] roadmap disclaimer;
- [x] GitHub roadmap link — **fixed**: now points to
      `https://github.com/jvitorn/purikuki/blob/master/PURIKI_PRODUCT_ENGINEERING_ROADMAP.md`
      instead of the removed `purikuki#roadmap` anchor.

Desktop:
- [x] compact horizontal progression (three cards + connecting rule).

Mobile:
- [x] vertical progression (same cards, connecting rule rotates).

No percentages, no invented dates, no "coming soon" — confirmed.

## 9. Download shell

- [x] section structure implemented;
- [x] valid no-release state (only real content: status label, message,
      GitHub CTA, origin line);
- [x] no fake release hardcoded (test asserts no version/SHA pattern
      renders);
- [x] installation disclosure shell — implemented as a `Collapsible`
      ("Como instalar" / "How to install" / "Cómo instalar") with the four
      steps and safety note from `CONTENT_SPEC.md`;
- [x] SHA disclosure stays hidden (no field in the no-release state);
- [x] GitHub link available.

`@radix-ui/react-collapsible` was added — justified per this phase's
explicit permission, used for exactly one disclosure (install steps), not
for the FAQ (which stays an Accordion, since it's a list of Q&A).

## 10. FAQ

- [x] all eight questions;
- [x] direct first-sentence answers;
- [x] keyboard behavior (unchanged Radix Accordion);
- [x] heading/trigger semantics appropriate;
- [x] no excessive animation.

`app/sections/faq-section.tsx` — unchanged Accordion behavior from Phase 01/02.

## 11. Footer

- [x] Product links;
- [x] Project links;
- [x] Legal links;
- [x] independent/unofficial disclaimer;
- [x] copyright;
- [x] localized copy.

Preserved from Phase 02 (`SiteFooter`); only the literal GitHub URLs in
content were switched to the shared `external-links.ts` constants.

## 12. Screenshots/assets

- [x] **Decision (post-Phase 03, approved by maintainer): final.** The
  stylized, purely-visual product representations (bars/blocks built from
  design tokens, no fabricated UI text) used in the Hero and the three
  showcases are the intentional visual solution for this landing.
  Real app screenshots are **not required**; this item is no longer a
  blocker or a pending asset.
  - [x] `HeroSection` and `ShowcasePanel` take localized `alt` text
        (`hero.mockupAlt`, `showcases.items[].imageAlt`) from the content
        model, matching the accessibility bar a real screenshot would need.
  - [x] alt text — localized and present for every stylized representation.
  - Not planned for this phase: a future polish pass may refine the shapes
    by referencing `purikuki`'s real components (`My List`,
    `AnimeListItem`, `Search`, `Anime Details`) to bring the web
    representation closer to the app's actual structure — that is UI
    polish, tracked separately from release infrastructure, and does not
    block any phase.

## Motion

- [x] restrained section entry — `Reveal` used only on Hero, the provider
      diagram, and showcase images (per this phase's own priority list),
      not on every section;
- [x] provider connector motion — reveal/fade-in, reduced-motion shows the
      diagram fully assembled immediately (reuses Phase 01
      `useReducedMotion`);
- [x] optional screenshot reveal — showcase images use `Reveal`;
- [x] cleanup and reduced-motion behavior — unchanged from Phase 01
      (`Reveal` already disconnects its `IntersectionObserver` on unmount
      and skips animation entirely under `prefers-reduced-motion`).

## Manual responsive review

Verified with a Playwright-driven pass against the dev server (no
horizontal overflow detected at any breakpoint, `document.documentElement.scrollWidth`
checked against `clientWidth`):

- [x] 360x800 class;
- [x] 390x844 class;
- [x] 768x1024 class;
- [x] 1280x800 class;
- [x] 1440x900 class.

Also spot-checked 360×800 on `/en/`, `/es/`, `/privacy/`, `/en/terms/` —
no overflow on any locale/page combination.

Check:

- [x] no overflow;
- [x] no unreadably tiny screenshots (the stylized representations are
      purely abstract, no text-legibility risk);
- [x] CTAs remain obvious;
- [x] no orphan words created by hardcoded `<br>` — none used anywhere in
      the landing;
- [x] footer remains usable;
- [x] roadmap semantics remain clear.

Note: 768px (tablet) intentionally still shows the mobile Sheet nav — the
desktop nav switches in at `lg` (1024px), matching
`DESIGN_SYSTEM.md`'s "tablet as transition, not a separate redesign" rule.

## Acceptance criteria

The landing can be reviewed as a complete product story even before a
public APK exists — confirmed by walking the pt-BR page top to bottom:

- [x] what Puriki is (Hero + Providers);
- [x] which providers it works with (Providers section, explicit AniList /
      MyAnimeList labels);
- [x] that Android is the initial target (Hero copy, benefits, download
      section all say "Android" explicitly, no Play Store or iOS claims);
- [x] that Puriki does not replace the providers (Providers highlight +
      Privacy summary + FAQ);
- [x] where to download once available (Download section, honest
      no-release state with a GitHub follow-along CTA).
