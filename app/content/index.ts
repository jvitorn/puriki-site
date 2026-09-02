import type { Locale } from "../lib/i18n/locales";
import { en } from "./en";
import { es } from "./es";
import { ptBR } from "./pt-BR";
import type { SiteContent } from "./types";

export const content: Record<Locale, SiteContent> = {
  "pt-BR": ptBR,
  en,
  es,
};

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export type { SiteContent } from "./types";
