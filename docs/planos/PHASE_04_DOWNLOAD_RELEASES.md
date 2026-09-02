# Phase 04 — GitHub Release Metadata and Android Download Experience

## Goal

Connect the static site to the latest stable official `jvitorn/purikuki` GitHub Release at build time.

No browser visit should need to call the GitHub API to render release metadata.

## 1. Release metadata contract

Create a generated typed structure similar to:

```ts
type ReleaseMetadata =
  | {
      available: false
    }
  | {
      available: true
      version: string
      publishedAt: string
      fileName: string
      sizeBytes: number
      downloadUrl: string
      releaseUrl: string
      sha256: string | null
    }
```

- [x] Implemented verbatim (as `ReleaseUnavailable` / `ReleaseAvailable` /
      `ReleaseMetadata`) in `app/lib/releases/types.ts`.

## 2. Build-time fetch script

Create a Node script under `scripts/`.

Responsibilities:

- [x] query the app repository latest stable release;
- [x] reject/ignore drafts;
- [x] reject/ignore prereleases for primary CTA;
- [x] normalize leading `v` in tag/version if required;
- [x] locate exactly one intended Android APK asset;
- [x] prefer the naming convention `puriki-{version}-android.apk`;
- [x] capture browser download URL;
- [x] capture release HTML URL;
- [x] capture asset size;
- [x] capture publication date;
- [x] capture GitHub-provided digest if available;
- [x] normalize `sha256:<hash>` to the display format;
- [x] write a deterministic generated data file consumed by the static build.

Implemented as `scripts/fetch-release.ts` (`pnpm release:fetch`), run via
`tsx` (added as a devDependency — the standard, minimal-footprint way to
run a typed script in Node across the project's supported Node 20–24
range, since native TS type-stripping isn't available on Node 20). The
script only does HTTP I/O and file writing; all parsing/validation is
delegated to `app/lib/releases/parse-github-release.ts`, which is pure and
fixture-tested (see section 9/`tests/releases/`).

## 3. No-release behavior

Today/initially the app repository may have no public Releases.

This must not break local/CI builds.

If the API returns no stable release:

- [x] generate `{ available: false }`;
- [x] show preparation state;
- [x] remove/hide final APK button;
- [x] preserve GitHub project CTA;
- [x] do not display fake `0.0.0`.

Confirmed against the **live** API during implementation:
`jvitorn/purikuki` has no stable release yet, and `pnpm release:fetch`
correctly wrote `{ "available": false }` — identical to the committed
baseline in `app/generated/release.json`, so the working tree stayed
clean (`git diff` empty after running the real fetch).

## 4. Error behavior

Distinguish:

A. Valid "no stable release exists" state.
B. Technical error reaching/parsing GitHub.

- [x] `GET /releases/latest` naturally gives us (A) as a 404, which the
      script maps to `{ available: false }`.
- [x] Anything else abnormal — timeout (`AbortController`, 15s), non-404
      non-2xx status, invalid JSON, or a payload the parser can't trust
      (draft, prerelease, missing/ambiguous APK, missing fields) — throws
      and the script exits with a non-zero code, which fails the
      `release:fetch` workflow step before `pnpm build` ever runs. No
      infrastructure failure can silently become "no release".
- [x] Local development: same script, same behavior; an unauthenticated
      public fetch works fine locally (subject to GitHub's lower
      unauthenticated rate limit).

## 5. Authentication

Public repository metadata can be read without exposing a browser token.

- [x] In GitHub Actions, `secrets.GITHUB_TOKEN` is passed as `GITHUB_TOKEN`
      **only** to the `release:fetch` step's `env`, not to the build step
      or the job's env, and never reaches the browser bundle (verified:
      grepped the production build output for `GITHUB_TOKEN`/`ghp_`/
      `github_pat_`, none found — see report).
- [x] `VITE_GITHUB_TOKEN` was never created.
- [x] Local development: unauthenticated fetch works; an optional
      `RELEASE_FETCH_TOKEN` (non-`VITE_*`, so Vite never inlines it) may be
      set locally and is picked up by the script. `.env`/`.env.*` are
      already gitignored (Phase 00).

## 6. Download UI

When release exists, show:

- [x] version;
- [x] Android;
- [x] APK;
- [x] human-readable size;
- [x] publication date localized to active locale;
- [x] primary Download button;
- [x] official GitHub Releases origin;
- [x] release/changelog link;
- [x] SHA-256 disclosure if present;
- [x] copy-hash action if present;
- [x] install instructions (unchanged from Phase 03).

The direct button points to `release.downloadUrl` (the GitHub-hosted
`browser_download_url`) — no proxy, no copy, no hosting in `puriki-site`.

Implemented by evolving `app/sections/download-section.tsx` in place: it
now takes `locale`, `content: DownloadContent`, and `release:
ReleaseMetadata` and branches on `release.available`. The no-release
branch is byte-for-byte the same UI Phase 03 shipped.

## 7. SHA-256

- [x] displayed, in full (not truncated/shortened — wraps via `break-all`
      instead of an ellipsis so nothing is visually cut);
- [x] normalized (`sha256:<hex>` -> lowercase `<hex>`, prefix stripped) by
      `normalizeSha256()`;
- [x] copy button (`app/sections/sha-disclosure.tsx`), using
      `navigator.clipboard.writeText`;
- [x] accessible "copied" status via `role="status"` + `aria-live="polite"`
      (`sr-only`, doesn't shift layout).

If absent: the whole disclosure block simply isn't rendered (one of the
two options this phase explicitly allows) — no invented hash, no neutral
placeholder string needed.

## 8. Install instructions

Unchanged from Phase 03 (`content.installHelp`, from `CONTENT_SPEC.md`):
no "ignore the warning" language, no "permanently disable protections"
instruction, no implication that the sideloading warning is
Puriki-specific malware detection.

## 9. Stable vs beta

- [x] Tests cover all nine required fixture scenarios plus normalization
      edge cases — see `tests/releases/fixtures.ts` and
      `tests/releases/parse-github-release.test.ts` (15 parser tests):
      stable + digest, stable without digest, tag without leading `v`,
      draft, prerelease, missing APK, wrong APK filename, two ambiguous
      non-matching APK candidates, two assets both exactly matching the
      expected filename (defensive), malformed payloads, no release
      (`null`).
- [x] Ambiguous cases (missing/duplicate/wrong-named APK) throw
      `ReleaseParseError` with an actionable message instead of guessing.

## 10. Release naming discipline

- [x] `puriki-{version}-android.apk` is enforced by the parser
      (`expectedFileName`), documented in `DECISIONS.md` (existing) and in
      code comments in `parse-github-release.ts`.
- [x] The parser logs/throws actionable errors listing what it actually
      found when the convention isn't met.

## 11. Cross-repository automatic rebuild

- [x] `workflow_dispatch` preserved as the manual fallback.
- [x] Normal `push` to `main` deployment path preserved.
- [x] `.github/workflows/deploy-pages.yml` now also declares
      `repository_dispatch: types: [puriki-release-published]` — the site
      is ready to accept this trigger and, per the recommended design,
      does **not** trust any payload from the dispatching workflow; it
      always re-fetches and re-parses release data itself in the
      `release:fetch` step.
- [ ] **External pending item, not part of this site's implementation:**
      the `purikuki` app repository does not yet have a stable-release
      workflow, so no `repository_dispatch` *sender* exists there. This is
      deliberately left unmarked — it is blocked on `purikuki`'s own
      release automation, not on unfinished work in `puriki-site`.

## 12. Tests

- [x] Release parser unit tests (15, fixture-based, no live API calls).
- [x] Formatter unit tests (`formatFileSize`, `formatReleaseDate`, 10
      tests across pt-BR/en/es).
- [x] `getReleaseMetadata()` test (reads the committed generated file,
      asserts today's real `{ available: false }` state).
- [x] `DownloadSection` tests (5): no-release state never renders a
      version/size/SHA; available state renders version/platform/size/
      localized date/direct download link/release link; SHA disclosure +
      working copy action with accessible status; SHA disclosure absent
      when digest is null; labels localized per locale.

## Acceptance criteria

A public browser receives a completely static HTML page with the current
stable release metadata (today: the honest no-release state, since
`jvitorn/purikuki` has no stable release), and clicking Download would go
directly to the official GitHub Release APK once one exists.

No GitHub credential exists in the browser bundle — confirmed by
inspecting the production build output.
