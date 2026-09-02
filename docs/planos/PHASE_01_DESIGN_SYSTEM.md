# Phase 01 — Design System and Shared Shell

## Goal

Build the small visual foundation required by the entire landing without turning the project into a general-purpose design system.

Reference:
`DESIGN_SYSTEM.md`

## 1. Global semantic tokens

Implement semantic design tokens.

- [x] background
- [x] surface
- [x] raised surface
- [x] hover surface
- [x] border
- [x] strong border
- [x] foreground
- [x] muted foreground
- [x] subtle foreground
- [x] brand
- [x] brand hover
- [x] brand soft
- [x] brand foreground
- [x] success
- [x] warning
- [x] danger

Requirements:

- [x] Components consume semantic tokens, not raw brand hex values.
- [x] Tokens work in dark-only mode.
- [x] Important text/background combinations meet required contrast.
- [x] Brand red remains an accent, not the dominant page fill.

## 2. Typography

- [x] Add Geist.
- [x] Self-host font files if permitted by the selected source/license.
- [x] Add robust system fallbacks.
- [x] Configure body, heading, label, and code text styles.
- [x] Ensure Japanese brand glyph fallback works.
- [x] Avoid fixed text containers that break at 200% zoom.
- [x] Define sensible fluid Hero typography.

## 3. Global reset/base styles

- [x] Set correct dark background.
- [x] Set text rendering defaults.
- [x] Preserve browser zoom.
- [x] Configure selection color.
- [x] Add global focus-visible style.
- [x] Add skip-link styling.
- [x] Add reduced-motion global behavior.
- [x] Add anchor scroll offset for sticky header targets.

## 4. Layout primitives

Create only useful primitives:

- [x] `Container`
- [x] `Section`
- [x] optional `SectionHeader`
- [x] responsive stack/grid helpers if repeated enough
- [x] consistent max-width strategy

Responsive compositions remain direct Tailwind classes because no repeated helper justified another abstraction.

Avoid:

- overly generic “Box/Flex/Stack” abstraction layer if Tailwind already solves it clearly.

## 5. shadcn/ui primitives

Install/configure only:

- [x] Button
- [x] Sheet
- [x] Accordion
- [x] Collapsible only if chosen for hash/install disclosures

Collapsible was intentionally not added because this phase has no concrete disclosure that needs it.

Do not install full shadcn catalog.

Customize them to Puriki tokens instead of leaving template defaults.

## 6. Shared layout

### Header

- [x] sticky-capable;
- [x] logo/wordmark area;
- [x] desktop navigation;
- [x] mobile menu via Sheet;
- [x] primary Download action;
- [x] GitHub secondary action;
- [x] locale selector placeholder/integration point;
- [x] visible keyboard focus;
- [x] mobile menu closes appropriately after navigation.

### Footer

Create structural footer ready for localized content.

Columns:

- Product
- Project
- Legal

Include space for:

- project disclaimer;
- copyright;
- GitHub links.

## 7. Product visual primitives

Create a lightweight generic device/mockup component.

Requirements:

- [x] generic smartphone frame;
- [x] no Samsung/Pixel/iPhone branding;
- [x] image alt handling is explicit;
- [x] supports responsive sizing;
- [x] does not impose hardcoded screenshot content.

Optionally create a reusable clipped screenshot frame for showcase sections if repeated.

## 8. Motion utility

Create a small motion layer around Anime.js.

Requirements:

- [x] central reduced-motion detection;
- [x] no animation is required for content visibility;
- [x] cleanup on unmount;
- [x] avoid multiple ad-hoc window scroll listeners;
- [x] prefer IntersectionObserver for entry timing;
- [x] keep public API small.

Do not build a custom animation framework.

## 9. Visual sandbox

Add a temporary development-only or route-local visual demonstration if useful for reviewing tokens/primitives.

Remove it before launch if it becomes a public orphan route.

## Testing

- [x] Button focus/interaction.
- [x] Sheet keyboard behavior where testing is valuable.
- [x] Accordion base behavior.
- [x] reduced-motion utility behavior.
- [x] shared layout renders without locale content errors.

## Manual review

Desktop:
- [x] 1280px class viewport
- [x] 1440px class viewport

Mobile:
- [x] ~360px width
- [x] ~390px width
- [x] ~430px width

Review:

- [x] no horizontal overflow;
- [x] visible focus;
- [x] header remains usable;
- [x] typography does not clip;
- [x] 200% zoom remains navigable.

## Acceptance criteria

Phase complete when the final sections can be built without inventing one-off spacing/color/focus patterns in every section.

## Implementation record

Final semantic palette:

```text
background          #0B0E14
surface             #111522
surface-raised      #1A2030
surface-hover       #20273A
border              #252C3D
border-strong       #39445C
foreground          #F8FAFC
foreground-muted    #B6C0D1
foreground-subtle   #8994A8
brand               #970C10
brand-hover         #B31318
brand-soft          #321316
brand-foreground    #F8FAFC
success             #55C28B
warning             #F0B65B
danger              #F07175
```

Representative contrast checks ranged from 5.66:1 to 18.46:1. The brand CTA combination is 8.45:1.

Geist Variable is self-hosted from the OFL-1.1 licensed `@fontsource-variable/geist` package. Japanese-compatible system fallbacks are explicit in the font stack.

The visual review covered 320px reflow (representative of the effective CSS viewport at 200% zoom), 360px, 390px, 430px, 1280px, and 1440px. Root, nested route, CSS, JavaScript, and Geist assets returned successfully under `/puriki-site/` in the production build preview.

> Minimal GitHub Pages deployment infrastructure was intentionally implemented during Phase 01 to allow visual validation of each subsequent phase. Full CI/deployment hardening remains part of Phase 06.

The deployment publishes `build/client`. React Router requires the production `basename` for correct hydration and emits prerendered HTML inside the basename directory, so `scripts/prepare-static-output.mjs` safely normalizes that HTML back to the Pages artifact root after each production build. Asset URLs and router context retain `/puriki-site/`.
