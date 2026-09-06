#!/usr/bin/env node
// Ferramenta de dev manual/pontual — NÃO faz parte de `pnpm build`.
// Regenera o favicon estático, o Apple touch icon e a imagem de
// compartilhamento do Open Graph a partir dos assets de origem oficiais em
// `assets/`. Rode de novo só se esses arquivos de origem mudarem.
//
// Exige duas ferramentas de sistema (não são dependências Node, então não
// afetam o build/bundle do app): `rsvg-convert` (librsvg2-bin) e
// `magick`/`convert` (ImageMagick). Uso:
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

// Favicon + Apple touch icon: o ícone do app já pré-composto carrega
// exatamente o fundo escuro deste site, então fica legível em qualquer
// navegador (aba clara ou escura), diferente dos SVGs de marca puros.
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

// Imagem de compartilhamento Open Graph / Twitter (1200x630): um gradiente
// radial vermelho-escuro suave atrás do logo oficial empilhado. Mínima,
// focada na marca, sem texto específico de idioma, então uma única imagem
// serve pt-BR/en/es.
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
