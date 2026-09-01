# Puriki Site — Visual and Interaction System

## Direction

Design style:

**Dark editorial + product-first**

The site should act as a frame around the Puriki application screenshots rather than visually competing with them.

Avoid:

- generic “anime website” decoration;
- sakura/kanji wallpaper;
- neon cyberpunk palette;
- excessive gradients;
- global glassmorphism;
- noisy particles;
- large decorative code terminals;
- dozens of cards.

## Theme

Initial launch is dark-only.

Do not implement a light-mode toggle in the first release.

## Typography

Primary family:
`Geist`

Rules:

- self-host font assets when license/distribution permits;
- define safe system fallbacks;
- do not fetch the font from Google Fonts at runtime;
- use normal Japanese-compatible fallbacks for brand glyphs if required;
- do not use decorative Japanese fonts for body/section headings.

Headline scale direction:

- desktop Hero: roughly 56–64px equivalent;
- mobile Hero: roughly 38–44px equivalent;
- keep fluid sizing accessible;
- avoid fixed heights tied to a specific font size.

## Color tokens

Final implementation should use semantic tokens.

Suggested baseline:

```text
--background
--surface
--surface-raised
--surface-hover

--border
--border-strong

--foreground
--foreground-muted
--foreground-subtle

--brand
--brand-hover
--brand-soft
--brand-foreground

--success
--warning
--danger
```

Initial palette direction:

```text
background      #0B0E14
surface         #111522
surface-raised  #1A2030
border-strong   #293043
brand           #970C10
brand-highlight #D9474C
foreground      #F8FAFC
```

The actual WCAG contrast of every foreground/background combination must be tested.

Do not hardcode `#970C10` in individual components. Components reference `brand`.

## Brand color usage

Brand red should be relatively rare.

Use it for:

- primary CTA;
- active/accent details;
- selected/active states;
- roadmap emphasis where appropriate;
- provider connector highlight;
- small logo accents.

Avoid:

- every heading in red;
- every card border in red;
- large red backgrounds throughout the page.

## Surfaces

Cards:

- moderate radius;
- subtle 1px border;
- minimal shadow;
- no global translucent blur treatment.

Suggested radius hierarchy:

- button: ~8–10px;
- card: ~14–18px;
- major block: ~20–24px;
- pill only for badges/status where semantically appropriate.

## Layout

General max content width:
~1200–1280px.

Readable text line width:
roughly 600–700px for long body copy.

Desktop section vertical spacing:
roughly 120–140px depending on content.

Mobile:
roughly 72–96px.

Do not blindly use these as fixed numbers; preserve visual rhythm.

## Header

Desktop:

- brand left;
- compact navigation;
- GitHub secondary action;
- Download primary action;
- sticky behavior allowed;
- on scroll, add subtle opaque/blur-free or lightly translucent background and bottom border as needed for readability.

Mobile:

- brand left;
- accessible menu button right;
- shadcn Sheet for navigation;
- language selector inside;
- prominent Download action.

## Hero

Desktop:

- two-column composition;
- copy/CTA left;
- single strong app mockup right.

Mobile semantic order:

1. H1
2. support text
3. CTA group
4. product mockup

Do not use `min-height: 100vh` as a hard requirement.

The next section may subtly enter the viewport to encourage scrolling.

## App screenshots

Screenshots are the main visual evidence.

Hero:
- full generic smartphone frame is allowed.

Showcases:
- do not repeat the same full phone frame every time;
- use cropped app panels, partially clipped screenshots, or restrained overlap;
- keep actual app UI readable;
- avoid fake hardware manufacturer branding.

Optimize assets:

- source capture may remain PNG;
- web derivatives should use WebP/AVIF where appropriate;
- dimensions must be declared;
- below-the-fold images should lazy load;
- Hero visual should be prioritized.

## Provider relationship visual

Desktop conceptual layout:

`AniList -> Puriki <- MyAnimeList`

Mobile:

vertical composition that still communicates “both providers connect to Puriki”.

Important:

- do not visually imply AniList -> MAL in 1.0;
- provider identities must not dominate Puriki;
- layout should work with text labels even if logos are not approved/used.

## Motion with Anime.js

Motion duration should be restrained.

Use for:

- section reveal;
- small stagger;
- screenshot entry;
- provider connector drawing;
- subtle hover/focus polish.

Do not use for:

- looping hero motion;
- cursor following;
- particles;
- continuous floating;
- decorative text scrambling;
- transitions that delay reading.

Reduced motion:

If `prefers-reduced-motion: reduce`:

- render content immediately;
- disable parallax;
- minimize/disable non-essential transform animations;
- avoid forced smooth scrolling.

## Responsive rules

Primary breakpoints can align with common Tailwind ranges.

Behavioral intent:

- mobile-first;
- tablet as transition, not a separate redesign;
- desktop from around 1024px;
- no interaction depends on hover;
- touch targets for key actions approximately 44x44px minimum.

Showcases desktop may alternate image/text sides.

Mobile DOM reading order must stay:

1. title
2. copy
3. image

Do not reorder semantics only to preserve alternating desktop visuals.

## Background treatment

Optional:

- very subtle grid treatment in the Hero or one strategic area;
- low-opacity radial brand glow behind the Hero mockup.

Do not apply a grid or animated background across the whole page.

## Iconography

Use Lucide React.

Guidelines:

- consistent stroke weight;
- icon supports meaning;
- do not add an icon to every label/button;
- meaningful icons do not replace text;
- decorative icons are hidden from assistive tech appropriately.

## Focus states

Focus must be clearly visible against dark backgrounds.

Focus styling should:

- not depend only on color if contrast is weak;
- be consistent across links/buttons/accordion/menu;
- remain visible in both default and brand-colored surfaces.

## 404

Small branded 404 is acceptable.

Tone example:

`Página não encontrada`

Optional light product-themed line:
`Parece que esse anime não está nesta lista.`

CTA:
`Voltar para o Puriki`

Keep it accessible and simple.
