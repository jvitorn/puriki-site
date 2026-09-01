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

Exact names may vary, but semantics must remain clear.

## 2. Build-time fetch script

Create a Node script under `scripts/`.

Responsibilities:

- [ ] query the app repository latest stable release;
- [ ] reject/ignore drafts;
- [ ] reject/ignore prereleases for primary CTA;
- [ ] normalize leading `v` in tag/version if required;
- [ ] locate exactly one intended Android APK asset;
- [ ] prefer the naming convention `puriki-{version}-android.apk`;
- [ ] capture browser download URL;
- [ ] capture release HTML URL;
- [ ] capture asset size;
- [ ] capture publication date;
- [ ] capture GitHub-provided digest if available;
- [ ] normalize `sha256:<hash>` to the display format;
- [ ] write a deterministic generated data file consumed by the static build.

## 3. No-release behavior

Today/initially the app repository may have no public Releases.

This must not break local/CI builds.

If the API returns no stable release:

- [ ] generate `{ available: false }`;
- [ ] show preparation state;
- [ ] remove/hide final APK button;
- [ ] preserve GitHub project CTA;
- [ ] do not display fake `0.0.0`.

## 4. Error behavior

Distinguish:

A. Valid “no stable release exists” state.
B. Technical error reaching/parsing GitHub.

Recommended CI behavior:

- local development may allow a controlled no-release fallback;
- production deployment should not silently replace a previously valid stable release with “unavailable” because GitHub had a transient error.

Implement one of these robust strategies:

Preferred:
- generated checked-in or cached last-known-good metadata is only updated after a successful fetch; production build fails on unexpected fetch errors.

Alternative:
- release metadata job produces artifact/environment output and fails deployment on API errors.

Do not hide infrastructure failures as product state.

## 5. Authentication

Public repository metadata can be read without exposing a browser token.

In GitHub Actions:

- [ ] use the workflow's token where suitable for API reliability;
- [ ] keep it server/build-side only;
- [ ] never emit token into generated JS/JSON;
- [ ] never create `VITE_GITHUB_TOKEN`.

Local development:

- [ ] public unauthenticated fetch is acceptable;
- [ ] optional developer-only token may be supported through a non-Vite environment variable if needed;
- [ ] it must remain gitignored.

## 6. Download UI

When release exists:

Show:

- [ ] version;
- [ ] Android;
- [ ] APK;
- [ ] human-readable size;
- [ ] publication date localized to active locale;
- [ ] primary Download button;
- [ ] official GitHub Releases origin;
- [ ] release/changelog link;
- [ ] SHA-256 disclosure if present;
- [ ] copy-hash action if present;
- [ ] install instructions.

The direct button points to `downloadUrl`.

Do not proxy through the site.

## 7. SHA-256

If GitHub Release asset metadata exposes a SHA-256 digest:

- [ ] display it;
- [ ] normalize prefix for readability;
- [ ] provide copy button;
- [ ] provide accessible “copied” status.

If digest is absent:

- [ ] do not invent it;
- [ ] hide hash UI or show a neutral “not available” state if product chooses.

## 8. Install instructions

Use content from `CONTENT_SPEC.md`.

Do not:

- tell user to ignore warnings;
- tell user to permanently enable unknown sources globally;
- imply sideloading warnings are malware warnings specific to Puriki.

## 9. Stable vs beta

Tests must cover:

- stable release with stable APK;
- prerelease newer than stable;
- draft;
- missing APK;
- wrong APK filename;
- multiple matching APKs;
- asset with digest;
- asset without digest;
- no releases.

If multiple stable candidate assets are ambiguous, fail build instead of guessing.

## 10. Release naming discipline

Document in the app repository release process:

`puriki-{version}-android.apk`

The site parser should remain defensive and log actionable errors.

## 11. Cross-repository automatic rebuild

After the site's release fetch works independently, add optional automatic trigger from `purikuki`.

Desired event:

stable GitHub Release published in app repo -> dispatch site deploy.

Implementation direction:

- app workflow/action calls repository dispatch on `jvitorn/puriki-site`;
- use a fine-grained token restricted to the site repository and minimum required permission;
- secret remains in app repository;
- site workflow validates event type;
- site rebuilds/fetches release data itself;
- app repo does not send trusted release metadata as the source of truth if site can fetch it directly.

Maintain:

- [ ] `workflow_dispatch` manual fallback;
- [ ] normal `main` deployment path.

## 12. Tests

Release parser unit tests are mandatory.

Also test Download component:

- [ ] available state;
- [ ] unavailable state;
- [ ] hash disclosure;
- [ ] correct download link;
- [ ] localized date formatter;
- [ ] human-readable size formatter.

## Acceptance criteria

A public browser can receive a completely static HTML page with current stable release metadata, and clicking Download goes directly to the official GitHub Release APK.

No GitHub credential exists in the browser bundle.
