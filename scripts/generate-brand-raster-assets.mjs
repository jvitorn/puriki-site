#!/usr/bin/env node
// One-time/manual dev tool — NOT part of `pnpm build`. Regenerates the
// static favicon, Apple touch icon, and Open Graph share image from the
// official source assets in `assets/`. Run again only if those source
// files change.
//
// Requires two system tools (not Node dependencies, so they don't affect
// the app's build or bundle): `rsvg-convert` (librsvg2-bin) and
// `magick`/`convert` (ImageMagick). Usage:
//
//   node scripts/generate-brand-raster-assets.mjs

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...segments) => path.join(root, ...segments);

const APP_ICON_SOURCE = p("assets/app-icon/puriki-app-icon-1024.png");
const STACKED_LOGO_SOURCE = p("assets/brand/svg/puriki-stacked-dark.svg");

const publicDir = p("public");
const seoDir = p("public/seo");
mkdirSync(publicDir, { recursive: true });
mkdirSync(seoDir, { recursive: true });

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" });
}

const PNG_OUTPUT_ARGS = ["-depth", "8", "-define", "png:compression-level=9"];

// Favicon + Apple touch icon: the pre-composited app icon already carries
// this site's exact dark background, so it reads correctly in any browser
// chrome (light or dark tab bar), unlike the bare mark SVGs.
run("magick", [
  APP_ICON_SOURCE,
  "-resize",
  "64x64",
  ...PNG_OUTPUT_ARGS,
  p("public/favicon.png"),
]);
run("magick", [
  APP_ICON_SOURCE,
  "-resize",
  "180x180",
  ...PNG_OUTPUT_ARGS,
  p("public/apple-touch-icon.png"),
]);

// Open Graph / Twitter share image (1200x630): a soft dark-red radial
// gradient behind the official stacked logo. Minimal, brand-first, no
// locale-specific text so one image serves pt-BR/en/es.
const gradient = p(".tmp-og-gradient.png");
const logo = p(".tmp-og-logo.png");
try {
  run("magick", [
    "-size",
    "1200x630",
    "radial-gradient:#2a1013-#0b0e14",
    gradient,
  ]);
  run("rsvg-convert", [
    "-w",
    "467",
    "-h",
    "420",
    STACKED_LOGO_SOURCE,
    "-o",
    logo,
  ]);
  run("magick", [
    gradient,
    logo,
    "-gravity",
    "center",
    "-geometry",
    "+0-10",
    "-compose",
    "over",
    "-composite",
    ...PNG_OUTPUT_ARGS,
    p("public/seo/og-image.png"),
  ]);
} finally {
  execFileSync("rm", ["-f", gradient, logo]);
}

console.log("Brand raster assets written to public/.");
