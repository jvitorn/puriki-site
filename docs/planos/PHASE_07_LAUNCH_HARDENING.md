# Phase 07 — Public Launch Hardening

## Goal

Validate the landing as a real public download surface.

Passing CI alone is not sufficient.

## 1. Content accuracy audit

Compare the landing with the actual public Puriki build.

Verify every current-feature statement:

- [ ] AniList functionality;
- [ ] MAL functionality;
- [ ] guest/no-provider behavior;
- [ ] progress update;
- [ ] status update;
- [ ] score update;
- [ ] synopsis translation;
- [ ] languages;
- [ ] Android requirement/min version;
- [ ] storage/privacy claims.

If a feature is not verified, remove or soften the claim.

## 2. Roadmap accuracy

- [ ] 1.0 status matches release reality;
- [ ] 2.0 clearly roadmap;
- [ ] 3.0 clearly planned;
- [ ] no “coming soon” pressure wording;
- [ ] no hidden roadmap promises elsewhere in Hero/FAQ.

## 3. Release/download validation

### Before first stable release

- [ ] no fake version;
- [ ] no broken Download CTA;
- [ ] preparation state is clear;
- [ ] GitHub CTA works.

### With stable release

On a real Android device:

- [ ] open site;
- [ ] Hero CTA scrolls to Download;
- [ ] displayed version matches GitHub;
- [ ] size matches asset metadata;
- [ ] date is correct;
- [ ] hash matches GitHub digest;
- [ ] final CTA downloads the intended APK;
- [ ] filename is expected;
- [ ] Android opens installation flow;
- [ ] install guidance matches actual Android behavior reasonably;
- [ ] release/changelog link opens correct release.

Do not modify signing or packaging from the site.

## 4. Route validation

For every locale:

- [ ] Home direct load;
- [ ] Privacy direct load;
- [ ] Terms direct load;
- [ ] refresh nested route;
- [ ] internal navigation;
- [ ] locale switch equivalent-page mapping;
- [ ] browser Back/Forward;
- [ ] 404.

Test production GitHub Pages URL, not only local dev.

## 5. Responsive device matrix

At minimum:

- [ ] small Android-like viewport;
- [ ] common modern Android viewport;
- [ ] tablet;
- [ ] 1366/1440 desktop;
- [ ] wider desktop.

Review:

- [ ] Hero;
- [ ] provider diagram;
- [ ] benefit cards;
- [ ] screenshots;
- [ ] roadmap;
- [ ] Download;
- [ ] FAQ;
- [ ] footer;
- [ ] legal pages.

## 6. Accessibility manual pass

- [ ] keyboard-only;
- [ ] visible focus;
- [ ] skip link;
- [ ] mobile Sheet focus;
- [ ] Accordion keyboard;
- [ ] disclosures;
- [ ] copy hash;
- [ ] reduced motion;
- [ ] 200% zoom;
- [ ] screen-reader spot check;
- [ ] contrast.

Resolve serious issues before launch.

## 7. Performance review

Run Lighthouse or equivalent on production.

Use it diagnostically.

Review:

- [ ] LCP;
- [ ] CLS;
- [ ] INP considerations;
- [ ] image sizes;
- [ ] font loading;
- [ ] unused JS;
- [ ] render-blocking assets.

Do not distort the product to chase arbitrary 100 scores.

## 8. Link audit

Verify:

- [ ] app GitHub;
- [ ] site GitHub if linked;
- [ ] Releases;
- [ ] Issues;
- [ ] roadmap destination;
- [ ] Privacy;
- [ ] Terms;
- [ ] AniList/MAL informational links if present;
- [ ] Download;
- [ ] social metadata URL.

No placeholder `#` links.

## 9. SEO production audit

Inspect rendered source/static HTML.

Verify:

- [ ] localized title;
- [ ] description;
- [ ] canonical;
- [ ] hreflang;
- [ ] OG;
- [ ] Twitter card;
- [ ] JSON-LD;
- [ ] `lang`;
- [ ] sitemap;
- [ ] robots;
- [ ] favicon;
- [ ] no accidental `noindex`.

## 10. Legal/privacy audit

- [ ] no analytics claim is true;
- [ ] GitHub Pages hosting disclosed appropriately;
- [ ] provider independence disclaimer present;
- [ ] Privacy reflects actual app/site behavior;
- [ ] Terms reflect actual distribution/provider dependency;
- [ ] provider logos/marks are used only after review;
- [ ] license/copyright presentation is consistent.

## 11. Security audit

- [ ] inspect built JS for token-like secrets;
- [ ] no EAS/keystore data;
- [ ] no GitHub PAT;
- [ ] no `.env` copied into output;
- [ ] external links are expected;
- [ ] no unnecessary remote script/CDN;
- [ ] dependencies pass reasonable security review.

## 12. Documentation handoff

Root README:

- [ ] how to run;
- [ ] how to test;
- [ ] how to deploy;
- [ ] how release metadata works;
- [ ] where content/translations live;
- [ ] how to update screenshots;
- [ ] how to update brand tokens;
- [ ] custom domain migration note.

Planning docs:

- [ ] all phases updated;
- [ ] both global checklists synchronized;
- [ ] deviations recorded.

## 13. Post-launch smoke test

After first production publish:

- [ ] clean browser visit;
- [ ] private/incognito visit;
- [ ] mobile visit;
- [ ] nested-route direct visit;
- [ ] release download;
- [ ] GitHub links;
- [ ] no console errors;
- [ ] no unexpected network trackers.

## Launch gate

Launch is approved only when:

- no P0 blocker;
- no known broken Download path;
- no materially false current-feature claim;
- no inaccessible core CTA;
- legal pages reachable;
- production static routes work;
- HTTPS works.
