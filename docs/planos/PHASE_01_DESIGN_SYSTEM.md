# Phase 01 — Design System and Shared Shell

## Goal

Build the small visual foundation required by the entire landing without turning the project into a general-purpose design system.

Reference:
`DESIGN_SYSTEM.md`

## 1. Global semantic tokens

Implement semantic design tokens.

- [ ] background
- [ ] surface
- [ ] raised surface
- [ ] hover surface
- [ ] border
- [ ] strong border
- [ ] foreground
- [ ] muted foreground
- [ ] subtle foreground
- [ ] brand
- [ ] brand hover
- [ ] brand soft
- [ ] brand foreground
- [ ] success
- [ ] warning
- [ ] danger

Requirements:

- [ ] Components consume semantic tokens, not raw brand hex values.
- [ ] Tokens work in dark-only mode.
- [ ] Important text/background combinations meet required contrast.
- [ ] Brand red remains an accent, not the dominant page fill.

## 2. Typography

- [ ] Add Geist.
- [ ] Self-host font files if permitted by the selected source/license.
- [ ] Add robust system fallbacks.
- [ ] Configure body, heading, label, and code text styles.
- [ ] Ensure Japanese brand glyph fallback works.
- [ ] Avoid fixed text containers that break at 200% zoom.
- [ ] Define sensible fluid Hero typography.

## 3. Global reset/base styles

- [ ] Set correct dark background.
- [ ] Set text rendering defaults.
- [ ] Preserve browser zoom.
- [ ] Configure selection color.
- [ ] Add global focus-visible style.
- [ ] Add skip-link styling.
- [ ] Add reduced-motion global behavior.
- [ ] Add anchor scroll offset for sticky header targets.

## 4. Layout primitives

Create only useful primitives:

- [ ] `Container`
- [ ] `Section`
- [ ] optional `SectionHeader`
- [ ] responsive stack/grid helpers if repeated enough
- [ ] consistent max-width strategy

Avoid:

- overly generic “Box/Flex/Stack” abstraction layer if Tailwind already solves it clearly.

## 5. shadcn/ui primitives

Install/configure only:

- [ ] Button
- [ ] Sheet
- [ ] Accordion
- [ ] Collapsible only if chosen for hash/install disclosures

Do not install full shadcn catalog.

Customize them to Puriki tokens instead of leaving template defaults.

## 6. Shared layout

### Header

- [ ] sticky-capable;
- [ ] logo/wordmark area;
- [ ] desktop navigation;
- [ ] mobile menu via Sheet;
- [ ] primary Download action;
- [ ] GitHub secondary action;
- [ ] locale selector placeholder/integration point;
- [ ] visible keyboard focus;
- [ ] mobile menu closes appropriately after navigation.

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

- [ ] generic smartphone frame;
- [ ] no Samsung/Pixel/iPhone branding;
- [ ] image alt handling is explicit;
- [ ] supports responsive sizing;
- [ ] does not impose hardcoded screenshot content.

Optionally create a reusable clipped screenshot frame for showcase sections if repeated.

## 8. Motion utility

Create a small motion layer around Anime.js.

Requirements:

- [ ] central reduced-motion detection;
- [ ] no animation is required for content visibility;
- [ ] cleanup on unmount;
- [ ] avoid multiple ad-hoc window scroll listeners;
- [ ] prefer IntersectionObserver for entry timing;
- [ ] keep public API small.

Do not build a custom animation framework.

## 9. Visual sandbox

Add a temporary development-only or route-local visual demonstration if useful for reviewing tokens/primitives.

Remove it before launch if it becomes a public orphan route.

## Testing

- [ ] Button focus/interaction.
- [ ] Sheet keyboard behavior where testing is valuable.
- [ ] Accordion base behavior.
- [ ] reduced-motion utility behavior.
- [ ] shared layout renders without locale content errors.

## Manual review

Desktop:
- [ ] 1280px class viewport
- [ ] 1440px class viewport

Mobile:
- [ ] ~360px width
- [ ] ~390px width
- [ ] ~430px width

Review:

- [ ] no horizontal overflow;
- [ ] visible focus;
- [ ] header remains usable;
- [ ] typography does not clip;
- [ ] 200% zoom remains navigable.

## Acceptance criteria

Phase complete when the final sections can be built without inventing one-off spacing/color/focus patterns in every section.
