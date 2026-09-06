# Phase 04R — Multi-ABI Release Integration Refinement

## Why this phase exists

Phase 04 modeled the GitHub Release integration around a single Android
APK (`puriki-v{version}.apk`). That was accurate for the state of the
`jvitorn/puriki` app repository at the time.

Puriki has since reached its first public stable release, `v1.0.0`, and
the real distribution strategy that shipped with it uses **one APK per
Android ABI** rather than a single universal binary:

- `puriki-v1.0.0-arm64-v8a.apk`
- `puriki-v1.0.0-universal.apk`
- `puriki-v1.0.0-armeabi-v7a.apk`
- `puriki-v1.0.0-x86_64.apk`
- `puriki-v1.0.0-x86.apk`
- `SHA256SUMS.txt` (a GitHub Release artifact, not part of this site's
  contract — see "SHA-256 / checksums" below)

The Phase 04 single-APK contract no longer matches reality, so this
revision replaces it with a multi-artifact model *before* Phase 06
(Testing/CI/Deploy) begins. Phase 06 is **not** implemented here — only
its plan document is updated where it still assumed a single APK.

## What changed, at a glance

| | Phase 04 (original) | Phase 04R |
|---|---|---|
| Release shape | one APK per release | N Android artifacts per release |
| Expected filename | `puriki-v{version}.apk` | `puriki-v{version}-{variant}.apk` |
| Required assets | the one APK | `arm64-v8a` **and** `universal` |
| Optional assets | none | `armeabi-v7a`, `x86_64`, `x86` |
| SHA-256 | shown + copyable in the landing | not part of the landing UX |
| Primary download CTA | the only APK | `arm64-v8a` (recommended) |
| Secondary CTA | none | `universal` (highlighted alternative) |
| ABI detection | n/a | explicitly never implemented |

## New `ReleaseMetadata` contract

`app/lib/releases/types.ts`:

```ts
export const RECOGNIZED_ARTIFACT_VARIANTS = [
  "arm64-v8a",
  "universal",
  "armeabi-v7a",
  "x86_64",
  "x86",
] as const;

export type AndroidArtifactVariant = (typeof RECOGNIZED_ARTIFACT_VARIANTS)[number];

export const REQUIRED_ARTIFACT_VARIANTS: readonly AndroidArtifactVariant[] = [
  "arm64-v8a",
  "universal",
];

export interface AndroidReleaseArtifact {
  variant: AndroidArtifactVariant;
  fileName: string;
  sizeBytes: number;
  downloadUrl: string;
}

export interface ReleaseUnavailable {
  available: false;
}

export interface ReleaseAvailable {
  available: true;
  version: string;
  publishedAt: string;
  releaseUrl: string;
  artifacts: AndroidReleaseArtifact[];
}

export type ReleaseMetadata = ReleaseUnavailable | ReleaseAvailable;
```

Design principles preserved from the brief:

1. a release owns many artifacts, not one;
2. each artifact only knows its own `variant`/`fileName`/`sizeBytes`/
   `downloadUrl` — `version`, `publishedAt`, `releaseUrl` live once on the
   release, never duplicated per artifact;
3. "recommended" is a **presentation** decision (the Download UI always
   treats `arm64-v8a` as primary), not a field GitHub metadata carries;
4. `sha256` was removed entirely — see below.

## Required vs. optional artifacts

- **Required:** `arm64-v8a`, `universal`. A stable release missing either
  one fails `parseGitHubRelease()` (and therefore `pnpm release:fetch`,
  and therefore the deploy workflow's build step) with an explicit,
  actionable `ReleaseParseError`. The landing is never silently published
  incomplete.
- **Optional:** `armeabi-v7a`, `x86_64`, `x86`. A future release is free
  to drop any of these (e.g. dropping 32-bit ARM support) without failing
  the build — the parser just omits that variant from `artifacts`, and
  the Download UI omits that option from "Other versions" instead of
  showing a placeholder or a broken link.
- **Unrecognized assets:** any other `.apk` on the release (an unexpected
  future variant, a stray build artifact) is ignored rather than treated
  as ambiguous, as long as the two required variants are present and
  correctly named. `SHA256SUMS.txt` is ignored the same way (it isn't a
  `.apk`, so it never enters the candidate set at all).
- **Near-miss filenames:** an asset named close to but not exactly
  matching a recognized `puriki-v{version}-{variant}.apk` (e.g.
  `puriki-v1.0.0-arm64.apk`, missing `-v8a`) is never confused with a
  valid artifact — matching is exact-string, not fuzzy.

## Filename contract

Centralized in one place, `buildArtifactFileName(version, variant)` in
`app/lib/releases/parse-github-release.ts`:

```
puriki-v{version}-{variant}.apk
```

Examples: `puriki-v1.0.0-arm64-v8a.apk`, `puriki-v1.0.0-universal.apk`.
No UI/component ever re-derives or re-templates this string — components
only ever consume the `fileName`/`downloadUrl` already present on a
parsed `AndroidReleaseArtifact`.

## Parser behavior (`parseGitHubRelease`)

All Phase 04 hardening is preserved unchanged:

- draft releases rejected;
- prereleases rejected for the primary/only stable CTA;
- missing/invalid `published_at` rejected (`Date.parse` validated);
- malformed JSON/payload rejected;
- missing `browser_download_url` on a matched artifact rejected;
- invalid (`<= 0`, non-finite, non-number) artifact size rejected;
- `raw === null` (404 from `GET /releases/latest`) is the only path that
  produces `{ available: false }`.

New for multi-ABI: the parser walks `RECOGNIZED_ARTIFACT_VARIANTS` in
order, looks for an exact filename match per variant, and only then
checks that every `REQUIRED_ARTIFACT_VARIANTS` entry was found. The
returned `artifacts[]` array is always ordered `arm64-v8a`, `universal`,
`armeabi-v7a`, `x86_64`, `x86` (only the ones actually present) — the
same order the Download UX presents them in, so no component needs to
re-sort.

## SHA-256 / checksums — removed from the landing UX

Maintainer decision, recorded here explicitly: `SHA256SUMS.txt` and any
per-asset digest are **not** part of the landing's UX. The GitHub Release
itself remains the correct place for a technically inclined user to
verify integrity via `SHA256SUMS.txt` or GitHub's own asset digest.

Consequently, this phase removed:

- the `sha256` field from `ReleaseMetadata`/`AndroidReleaseArtifact`;
- `normalizeSha256()` from the parser (dead code, no remaining caller);
- the `ShaDisclosure` component (`app/sections/sha-disclosure.tsx`) and
  every content field that only existed to support it (`shaLabel`,
  `copyLabel`, `copiedLabel`, `copyFailedLabel`);
- the SHA-specific tests that exercised that component (folded into the
  new Download-section test suite, which now asserts a checksum
  disclosure is **never** rendered).

This is scoped to `puriki-site` only. `purikuki` continues publishing
`SHA256SUMS.txt` on every release; nothing about the app repository's own
checksum practice changes.

## Download UX

`app/sections/download-section.tsx` was rewritten around a clear
hierarchy, so a non-technical user never has to understand a CPU ABI to
pick the right file:

1. **Android atual (ARM64)** — primary card, badge "Recomendado" (a
   textual badge, never color-only), CTA points directly at the
   `arm64-v8a` artifact's `downloadUrl`.
2. **Versão Universal** — second card, subtitle "Não sabe qual
   escolher?", CTA points directly at the `universal` artifact. Copy
   deliberately avoids "works on any Android"/"compatible with every
   device" — it only claims multi-architecture support.
3. **Outras versões** — a `Collapsible` (reusing the existing primitive,
   no new motion system) that only renders when at least one optional
   artifact (`armeabi-v7a`/`x86_64`/`x86`) exists on the release; each
   present variant gets its own row with a plain-language title, a
   secondary architecture note, size, and its own download link. A
   missing optional variant renders nothing — no placeholder, no
   "unavailable" text, no broken layout.
4. **"Qual versão devo baixar?"** — a second `Collapsible`, deliberately
   non-technical (no ABI/instruction-set/CPU-architecture jargon), always
   present once a release exists, explaining all four practical choices
   (ARM64, Universal, older ARM 32-bit Android, x86/x86_64 emulators).
5. **GitHub Release link** — unchanged role: the destination for
   changelog and technical details (including checksums).

No CPU/ABI/User-Agent detection was implemented or considered — the
brief explicitly forbids it (privacy, simplicity, predictability), so the
landing always presents the same explicit choices to every visitor and
lets the user decide.

The no-release ("in preparation") branch is functionally unchanged from
Phase 04/05: no fake version, no fake size, no disabled fake download
target, GitHub CTA preserved.

## JSON-LD

`buildSoftwareApplicationJsonLd()` (`app/lib/i18n/metadata.ts`) now reads
`getReleaseArtifact(release, "arm64-v8a")` and uses that artifact's
`downloadUrl` as `SoftwareApplication.downloadUrl` — `universal` (or any
other variant) is never used for structured data. `available: false`
still correctly omits `softwareVersion`/`downloadUrl` entirely.

## Roadmap

Unchanged architecture from Phase 05: `release.available` still flips the
1.0 item's status between "Em preparação"/"Atual" and "Disponível"
(and their EN/ES equivalents). 2.0/3.0 statuses are never derived from
release state. Verified against the real `v1.0.0` release during this
phase (see below).

## Content model additions

`DownloadContent` (`app/content/types.ts`) grew:

- `current` (title/badge/note/description for the ARM64 card);
- `universal` (title/subtitle/description/cta for the Universal card);
- `otherVersions` (title + one entry per optional variant:
  `armeabi_v7a`/`x86_64`/`x86`, each with title/note/description/cta);
- `chooser` (title + four non-technical explanations: current/universal/
  arm32/x86 — x86 and x86_64 deliberately share one explanation, per the
  brief);
- `releaseLabels` lost every SHA-related field and gained `latestLabel`
  ("Última versão estável"/"Latest stable version"/"Última versión
  estable").

PT-BR is the editorial source; EN and ES were written as natural
equivalents (not literal translations), and technical terms (ARM64, x86,
x86_64, APK) are left untranslated in all three locales, per the brief.
`tests/i18n/locale-content.test.ts`'s existing shape-equality check
(`collectShapeKeys`) enforces that all three locales stay structurally
complete — a locale missing a new field fails that test, not just the
type system.

## MIT license mention

The Open Source section's existing copy was left as-is (already accurate
and well-balanced); instead, a discreet "Licenciado sob MIT" /
"Licensed under MIT" / "Con licencia MIT" link to
`jvitorn/puriki`'s `LICENSE` file was added to the footer's copyright
row (`app/components/layout/site-footer.tsx`, new
`FooterContent.licenseLabel` field, new `PURIKUKI_LICENSE_URL` constant
in `app/lib/external-links.ts`).

## FAQ updates

Two answers were refined to match the new release-state reality without
introducing SHA/checksum explanation on the landing:

- **"Como verifico se o APK é oficial?"** now points at "this site or
  Puriki's official GitHub release" and mentions that technical integrity
  details live directly on the GitHub release, without explaining how to
  use them.
- **"Como atualizo o Puriki?"** now reflects that a real release exists:
  download the latest stable version from the landing or GitHub Releases
  and install the matching APK over the current installation.

## `release:fetch` script

`scripts/fetch-release.ts` no longer assumes a single `fileName`/
`sizeBytes` at the release level; its success log now reports the
version and the count/variant list of Android artifacts found, e.g.:

```
release:fetch — wrote v1.0.0 with 5 Android artifact(s): arm64-v8a, universal, armeabi-v7a, x86_64, x86.
```

All Phase 04 script-level guarantees are unchanged: 15s timeout, public
API fetch, no required `GITHUB_TOKEN`, optional local
`RELEASE_FETCH_TOKEN` (never a `VITE_*` name), 404 -> `{ available: false
}`, any other failure exits non-zero instead of masking a technical error
as "no release".

## Live validation against the real `v1.0.0` release

`pnpm release:fetch` was run against the actual public `jvitorn/puriki`
API during this phase. Result:

```
release:fetch — wrote v1.0.0 with 5 Android artifact(s): arm64-v8a, universal, armeabi-v7a, x86_64, x86.
```

All five recognized variants were present and correctly classified
(`arm64-v8a`/`universal` required and found; `armeabi-v7a`/`x86_64`/`x86`
optional and found). Sizes came entirely from the live GitHub API
response — nothing hardcoded. A production build
(`BASE_PATH=/puriki-site/ SITE_URL=https://jvitorn.github.io/puriki-site/
pnpm build`) was then run against this real data and the generated HTML
was inspected directly (see the Phase 04R final report for the exact
JSON-LD/version/link excerpts). After validation, `app/generated/
release.json` was restored to the committed `{ "available": false }`
baseline — the same policy Phase 04/05 already established, so
`pnpm build` keeps working fully offline and CI/local diffs stay clean
unless someone deliberately changes the baseline.

## Test strategy

`tests/releases/fixtures.ts` and `tests/releases/parse-github-release.test.ts`
were fully rewritten around multi-ABI fixtures (all five artifacts, only
the two required ones, each required artifact missing individually, each
optional artifact missing individually, an unrelated `.apk` present, a
near-miss filename, `SHA256SUMS.txt` ignored, duplicate exact-match
artifact, invalid size, missing download URL, tag with/without leading
`v`/`V`, malformed payloads). `tests/sections/download-section.test.tsx`
was fully rewritten to cover the new hierarchy (ARM64 primary, Universal
highlighted, optional rows only when present, both disclosures openable
by keyboard-equivalent click events, no SHA text ever rendered).
`tests/sections/roadmap-section.test.tsx` and `tests/a11y/axe-smoke.test.tsx`
were updated only to match the new `ReleaseAvailable` fixture shape — no
behavioral change to what they assert. A new `tests/i18n/json-ld.test.ts`
covers the `arm64-v8a`-only JSON-LD `downloadUrl` rule explicitly (no
prior test exercised this directly).

## What Phase 06/07 still own

This phase does not implement CI gates, static-output validation,
Dependabot, or any of Phase 06's automation — it only updated that plan
document where it still assumed a single APK/single download/single SHA.
It does not perform the Phase 07 real-device download validation, content
accuracy audit, or launch-gate sign-off — it only updated that plan
document's release/download validation section for the multi-artifact
reality. Both remain explicitly unmarked as complete.
