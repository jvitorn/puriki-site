import type { HomeAnchor } from "../lib/i18n/anchors";
import type { PageKey } from "../lib/i18n/pages";

export interface PageSeo {
  title: string;
  description: string;
}

export type SeoContent = Record<PageKey, PageSeo>;

export interface NavItem {
  label: string;
  anchor: HomeAnchor;
}

export interface NavigationContent {
  /** Desktop/mobile primary nav, in display order (Resources, How it works, Open Source, Roadmap). */
  items: [NavItem, NavItem, NavItem, NavItem];
  primaryNavLabel: string;
  mobileNavLabel: string;
  githubLabel: string;
  downloadLabel: string;
  menuButtonLabel: string;
  menuTitle: string;
  menuDescription: string;
  languageLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  supporting: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
  mockupAlt: string;
}

export interface ProvidersContent {
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
  anilistLabel: string;
  malLabel: string;
  purikiLabel: string;
}

export interface BenefitItem {
  title: string;
  body: string;
}

export interface BenefitsContent {
  eyebrow: string;
  title: string;
  items: [BenefitItem, BenefitItem, BenefitItem, BenefitItem];
}

export interface ShowcaseItem {
  id: "list" | "discovery" | "details";
  title: string;
  body: string;
  imageAlt: string;
}

export interface ShowcasesContent {
  eyebrow: string;
  title: string;
  items: [ShowcaseItem, ShowcaseItem, ShowcaseItem];
}

export interface PrivacyPillar {
  title: string;
  body: string;
}

export interface PrivacySummaryContent {
  eyebrow: string;
  title: string;
  intro: string;
  pillars: [PrivacyPillar, PrivacyPillar, PrivacyPillar];
  support: string;
  cta: string;
}

export interface OpenSourceContent {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}

export interface RoadmapItem {
  version: string;
  title: string;
  status: string;
  description: string;
  supporting?: string;
}

export interface RoadmapContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: [RoadmapItem, RoadmapItem, RoadmapItem];
  disclaimer: string;
  cta: string;
}

export interface DownloadNoReleaseContent {
  statusLabel: string;
  message: string;
  cta: string;
}

export interface DownloadInstallHelpContent {
  title: string;
  steps: [string, string, string, string];
  safetyNote: string;
}

export interface DownloadContent {
  eyebrow: string;
  title: string;
  supportCopy: string;
  primaryCta: string;
  originLine: string;
  noRelease: DownloadNoReleaseContent;
  installHelp: DownloadInstallHelpContent;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  items: [
    FaqItem,
    FaqItem,
    FaqItem,
    FaqItem,
    FaqItem,
    FaqItem,
    FaqItem,
    FaqItem,
  ];
}

export type FooterLinkTarget =
  | { kind: "anchor"; anchor: HomeAnchor }
  | { kind: "external"; href: string };

export interface FooterLink {
  label: string;
  target: FooterLinkTarget;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  tagline: string;
  disclaimer: string;
  copyright: string;
  /** Product, Project — Legal is handled separately since it links to typed pages. */
  columns: [FooterColumn, FooterColumn];
  legal: {
    title: string;
    privacyLabel: string;
    termsLabel: string;
  };
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPageContent {
  title: string;
  preparationNotice: string;
  intro: string;
  sections: LegalSection[];
}

export interface CommonContent {
  brandName: string;
  skipLink: string;
}

export interface SiteContent {
  common: CommonContent;
  seo: SeoContent;
  navigation: NavigationContent;
  hero: HeroContent;
  providers: ProvidersContent;
  benefits: BenefitsContent;
  showcases: ShowcasesContent;
  privacySummary: PrivacySummaryContent;
  openSource: OpenSourceContent;
  roadmap: RoadmapContent;
  download: DownloadContent;
  faq: FaqContent;
  footer: FooterContent;
  privacyPage: LegalPageContent;
  termsPage: LegalPageContent;
}
