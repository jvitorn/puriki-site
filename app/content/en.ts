import {
  PURIKUKI_ISSUES_URL,
  PURIKUKI_RELEASES_URL,
  PURIKUKI_REPO_URL,
} from "../lib/external-links";
import type { SiteContent } from "./types";

export const en = {
  common: {
    brandName: "Puriki",
    skipLink: "Skip to content",
  },
  seo: {
    home: {
      title: "Puriki — Your anime list, your way",
      description:
        "Connect AniList or MyAnimeList and manage your anime list through a simple, fast experience built for Android.",
    },
    privacy: {
      title: "Privacy — Puriki",
      description:
        "How Puriki handles authentication, local cache, and data when you connect your AniList or MyAnimeList account.",
    },
    terms: {
      title: "Terms of Use — Puriki",
      description:
        "Terms for using Puriki, an independent, open-source project that connects to third-party providers.",
    },
  },
  navigation: {
    items: [
      { label: "Features", anchor: "benefits" },
      { label: "How it works", anchor: "providers" },
      { label: "Open Source", anchor: "open-source" },
      { label: "Roadmap", anchor: "roadmap" },
    ],
    primaryNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    githubLabel: "GitHub",
    downloadLabel: "Download",
    menuButtonLabel: "Open menu",
    menuTitle: "Menu",
    menuDescription: "Browse Puriki's sections.",
    languageLabel: "Language",
  },
  hero: {
    eyebrow: "Puriki",
    headline: "Your anime list, your way.",
    supporting:
      "Connect AniList or MyAnimeList and manage your anime list through a simple, fast experience built for Android.",
    primaryCta: "Download for Android",
    secondaryCta: "View on GitHub",
    trustLine: "AniList · MyAnimeList · Open Source · No ads",
    mockupAlt: "Preview of Puriki's list screen, showing episode progress",
  },
  providers: {
    eyebrow: "How it works",
    title: "Your list stays right where it's always been.",
    body: "AniList and MyAnimeList remain the providers behind your list. Puriki connects to the service you already use and gives you a single, focused experience to check and manage your anime.",
    highlight: "You choose the provider. Puriki handles the experience.",
    anilistLabel: "AniList",
    malLabel: "MyAnimeList",
    purikiLabel: "Puriki",
  },
  benefits: {
    eyebrow: "Features",
    title: "Everything you need to keep up with your list.",
    items: [
      {
        title: "Your list, always at hand",
        body: "Track your progress, change status, and update your scores directly from Puriki.",
      },
      {
        title: "Find what to watch",
        body: "Search anime, explore the catalog, and check details before adding a new title to your list.",
      },
      {
        title: "AniList or MyAnimeList",
        body: "Connect the provider you already use. If both are connected, choose which list to manage at any given moment.",
      },
      {
        title: "More comfortable, day to day",
        body: "An Android-focused experience with support for multiple languages and local conveniences that make daily use more comfortable.",
      },
    ],
  },
  showcases: {
    eyebrow: "In practice",
    title: "Puriki, in your daily routine.",
    items: [
      {
        id: "list",
        title: "Track without the hassle",
        body: "Update episodes, status, and scores using the list you already maintain on your provider.",
        imageAlt: "Puriki's list screen, showing per-title progress",
      },
      {
        id: "discovery",
        title: "From catalog to details",
        body: "Search titles, discover new anime, and check the information you need before deciding what's next on your list.",
        imageAlt: "Puriki's search and catalog screen",
      },
      {
        id: "details",
        title: "Details when you need them",
        body: "See synopsis and details for each title right on the info screen. On Android, synopses are automatically translated on-device using Google ML Kit for Portuguese and Spanish readers.",
        imageAlt: "An anime's details screen in Puriki, with translated synopsis",
      },
    ],
  },
  privacySummary: {
    eyebrow: "Privacy",
    title: "Built to respect your data",
    intro:
      "Puriki doesn't create a new account or a new service to store your list. It connects to the providers you already use and keeps only the data locally needed to power the app experience.",
    pillars: [
      {
        title: "No Puriki account",
        body: "Use your existing AniList or MyAnimeList account.",
      },
      {
        title: "Local whenever possible",
        body: "Preferences, cache, and required information stay on the device whenever technically applicable.",
      },
      {
        title: "Your provider stays the source",
        body: "Your list stays on AniList or MyAnimeList.",
      },
    ],
    support: "No Puriki server keeping its own copy of your list.",
    cta: "Learn more about privacy",
  },
  openSource: {
    eyebrow: "Open Source",
    title: "Open by nature",
    body: "Puriki is free, ad-free, and has its source code open on GitHub. You can follow development, report issues, and contribute to the project.",
    cta: "View project on GitHub",
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "What's next",
    intro:
      "Puriki will keep evolving without losing focus on a simple, safe experience for your list.",
    items: [
      {
        version: "1.0",
        title: "Foundation",
        status: "In preparation",
        description: "Puriki's core experience with AniList and MyAnimeList.",
      },
      {
        version: "2.0",
        title: "List Sync + new visual",
        status: "Next",
        description:
          "Manually sync your list from one provider to another, with analysis before any change is applied.",
        supporting:
          "You choose the source and destination. Puriki analyzes the differences before applying changes.",
      },
      {
        version: "3.0",
        title: "Multi-provider Sync",
        status: "Planned",
        description:
          "Replicates future changes made through Puriki across connected providers.",
      },
    ],
    disclaimer:
      "The roadmap represents the project's current direction and may evolve during development.",
    cta: "View the full roadmap on GitHub",
  },
  download: {
    eyebrow: "Download",
    title: "Download Puriki for Android",
    supportCopy: "Free, open source, and ad-free.",
    primaryCta: "Download for Android",
    originLine: "Official download through GitHub Releases.",
    noRelease: {
      statusLabel: "Release status",
      message: "Puriki's first public version is still in preparation.",
      cta: "Follow along on GitHub",
    },
    installHelp: {
      title: "How to install",
      steps: [
        "Download the official Puriki file.",
        "Open the APK on your Android device.",
        "If prompted, allow installs from the browser or file manager you used.",
        "Confirm the installation.",
      ],
      safetyNote:
        "Android may show a warning because the app was downloaded outside Google Play. Always make sure the download came from this site or Puriki's official GitHub repository.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "Do I need a Puriki account?",
        answer:
          "No. Puriki uses your AniList or MyAnimeList account — there is no separate Puriki account or sign-up.",
      },
      {
        question: "Do I need to connect AniList and MyAnimeList at the same time?",
        answer:
          "No. Connecting one provider is enough. If you connect both, you choose which list to manage at any given moment.",
      },
      {
        question: "Does Puriki replace AniList or MyAnimeList?",
        answer:
          "No. Puriki is an experience that connects to those providers; your list continues to be managed by them.",
      },
      {
        question: "Does Puriki sync my list between AniList and MyAnimeList?",
        answer:
          "Not yet. Version 1.0 has no automatic sync between providers; that capability is planned for future versions.",
      },
      {
        question: "Is Puriki available on Google Play?",
        answer:
          "Not at the moment. The official download is provided directly through GitHub Releases.",
      },
      {
        question: "How do I verify the APK is official?",
        answer:
          "Always download it from this site or Puriki's official GitHub repository, never from third-party sources.",
      },
      {
        question: "How do I update Puriki?",
        answer:
          "Download the latest version from the official releases and install it over your current version.",
      },
      {
        question: "Is there an iOS version?",
        answer:
          "It isn't a current priority for the project. The current focus is the Android experience.",
      },
    ],
  },
  footer: {
    tagline: "An independent Android experience for keeping up with your anime list.",
    disclaimer:
      "Puriki is an independent, unofficial project. It is not affiliated with AniList or MyAnimeList.",
    copyright: "© 2026 Puriki",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", target: { kind: "anchor", anchor: "benefits" } },
          { label: "How it works", target: { kind: "anchor", anchor: "providers" } },
          { label: "Roadmap", target: { kind: "anchor", anchor: "roadmap" } },
          { label: "Download", target: { kind: "anchor", anchor: "download" } },
        ],
      },
      {
        title: "Project",
        links: [
          {
            label: "GitHub",
            target: { kind: "external", href: PURIKUKI_REPO_URL },
          },
          {
            label: "Releases",
            target: {
              kind: "external",
              href: PURIKUKI_RELEASES_URL,
            },
          },
          {
            label: "Issues",
            target: {
              kind: "external",
              href: PURIKUKI_ISSUES_URL,
            },
          },
        ],
      },
    ],
    legal: {
      title: "Legal",
      privacyLabel: "Privacy",
      termsLabel: "Terms of Use",
    },
  },
  privacyPage: {
    title: "Privacy",
    preparationNotice:
      "Structural content in preparation. The definitive legal version will be published in Phase 05.",
    intro:
      "This page summarizes how Puriki handles authentication, local cache, and communication with providers. It is not yet the final legal text.",
    sections: [
      {
        heading: "No Puriki account",
        body: "Puriki does not create its own account. Access is done through your AniList or MyAnimeList account.",
      },
      {
        heading: "Authentication with providers",
        body: "Authentication happens directly with the provider you choose, following that service's official authorization flow.",
      },
      {
        heading: "Local storage of tokens",
        body: "Access tokens are stored locally on the device, using secure mechanisms available on the platform.",
      },
      {
        heading: "Local cache and preferences",
        body: "Preferences and cache data required for the app to work stay on the device whenever technically applicable.",
      },
      {
        heading: "Communication with provider APIs",
        body: "Puriki communicates directly with the AniList and MyAnimeList APIs to read and update your list.",
      },
      {
        heading: "Local synopsis translation",
        body: "Where applicable, synopsis translation is processed on the device, subject to confirmation in the final implementation.",
      },
      {
        heading: "Deleting and resetting local data",
        body: "You can disconnect your account and clear the local data stored by the app at any time.",
      },
      {
        heading: "No first-party analytics at launch",
        body: "Puriki does not use first-party analytics tools at the initial launch.",
      },
      {
        heading: "Hosting for this site",
        body: "This site is hosted on GitHub Pages, which may log access data as part of GitHub's own infrastructure.",
      },
      {
        heading: "Third-party services",
        body: "Puriki's operation depends on third-party services, such as AniList and MyAnimeList, which have their own privacy policies.",
      },
      {
        heading: "Updates to this policy",
        body: "This page may be updated as the project evolves. The final, complete version is Phase 05's responsibility.",
      },
      {
        heading: "Contact",
        body: "Privacy questions can be opened as an issue on Puriki's official GitHub repository.",
      },
    ],
  },
  termsPage: {
    title: "Terms of Use",
    preparationNotice:
      "Structural content in preparation. The definitive legal version will be published in Phase 05.",
    intro:
      "This page summarizes the terms for using Puriki. It is not yet the final legal text.",
    sections: [
      {
        heading: "Independent, unofficial project",
        body: "Puriki is not affiliated with AniList or MyAnimeList and does not represent those services.",
      },
      {
        heading: "Dependency on third-party providers",
        body: "Puriki's operation depends on the availability of the AniList and MyAnimeList APIs.",
      },
      {
        heading: "No guaranteed provider availability",
        body: "Puriki cannot guarantee the continuous operation of third-party services outside of its control.",
      },
      {
        heading: "Responsible use",
        body: "The app should be used responsibly and in accordance with the terms of the connected providers.",
      },
      {
        heading: "Open-source nature",
        body: "Puriki is an open-source project, available for review and contribution on GitHub.",
      },
      {
        heading: "Software availability",
        body: "The app is provided as-is, without formal guarantees of continuous availability.",
      },
      {
        heading: "Future changes",
        body: "Features, screens, and functionality may change as the project evolves, including items listed on the roadmap.",
      },
      {
        heading: "Limitations of a non-commercial project",
        body: "As an open-source, non-commercial project, the support and guarantees offered are limited.",
      },
    ],
  },
} satisfies SiteContent;
