# Puriki Site — Content Specification

This file defines the intended information hierarchy and copy direction. Final translations should be editorially reviewed before launch.

## Page order

1. Header
2. Hero
3. Provider relationship / How Puriki works
4. Core benefits
5. Product showcases
6. Privacy / local-first
7. Open Source
8. Roadmap
9. Download
10. FAQ
11. Footer

## Header

Desktop navigation direction:

- Recursos
- Como funciona
- Open Source
- Roadmap
- GitHub
- Primary CTA: Baixar

Mobile:

- Puriki logo/wordmark
- menu button
- navigation inside an accessible Sheet
- language selector inside the menu
- prominent Download CTA

## Hero

### PT-BR source copy

Eyebrow/brand:
`Puriki`

H1:
`Sua lista de anime, do seu jeito.`

Supporting copy:
`Conecte AniList ou MyAnimeList e acompanhe seus animes em uma experiência simples, rápida e feita para Android.`

Primary CTA:
`Baixar para Android`

Secondary CTA:
`Ver no GitHub`

Trust/support line:
`AniList · MyAnimeList · Open Source · Sem anúncios`

### Rules

- Do not mention List Sync as if already available.
- Do not mention Google Play as a planned requirement.
- Do not crowd the Hero with version/changelog details.
- Hero Download CTA scrolls to `#download`.

## Provider relationship section

Working title:

`Sua lista continua onde sempre esteve.`

Copy direction:

`AniList e MyAnimeList continuam sendo os provedores da sua lista. O Puriki se conecta ao serviço que você já utiliza e oferece uma experiência única para consultar e administrar seus animes.`

Highlight:
`Você escolhe o provedor. O Puriki cuida da experiência.`

Visual rule:

- show AniList -> Puriki <- MyAnimeList;
- do not show AniList -> Puriki -> MyAnimeList in the current section;
- do not imply automatic cross-provider sync in 1.0.

## Core benefits

Use four compact pillars rather than a large feature catalog.

### 1. Sua lista, sempre à mão

`Acompanhe seu progresso, altere status e atualize suas notas diretamente pelo Puriki.`

Associated concepts:
- progress;
- status;
- score.

### 2. Encontre o que assistir

`Pesquise animes, explore o catálogo e consulte informações antes de adicionar um novo título à sua lista.`

Associated concepts:
- search;
- catalog/home;
- details.

### 3. AniList ou MyAnimeList

Suggested copy:
`Conecte o provedor que você já utiliza. Se os dois estiverem conectados, escolha qual lista deseja administrar no momento.`

Do not imply both lists are synchronized in 1.0.

### 4. Mais confortável no dia a dia

Possible content:
- Android-focused experience;
- multiple languages;
- local synopsis translation where verified;
- guest/catalog access where verified.

Before launch, verify each statement against the final 1.0 implementation.

## Product showcases

Do not use a generic screenshot gallery.

### Showcase 1 — List

Title direction:
`Acompanhe sem complicação`

Copy:
`Atualize episódios, status e notas usando a lista que você já mantém no seu provedor.`

Preferred visual:
- list screen;
- progress/status interaction visible where possible.

### Showcase 2 — Discovery

Title:
`Do catálogo aos detalhes`

Copy:
`Pesquise títulos, descubra novos animes e consulte as informações que precisa antes de decidir o próximo da lista.`

Preferred visual:
- home/search;
- optional secondary overlapping image.

### Showcase 3 — Details / translation

Title:
`Informações quando você precisa`

Copy direction:
- details;
- synopsis;
- on-device translation only if the production feature is confirmed.

## Privacy section

Title:
`Feito para respeitar seus dados`

Intro direction:
`O Puriki não cria uma nova conta ou um novo serviço para armazenar sua lista. Ele se conecta aos provedores que você já utiliza e mantém localmente apenas os dados necessários para oferecer a experiência do aplicativo.`

Three pillars:

### Sem conta Puriki
`Use sua conta do AniList ou MyAnimeList.`

### Local sempre que possível
`Preferências, cache e informações necessárias permanecem no dispositivo sempre que tecnicamente aplicável.`

### Seu provedor continua sendo a fonte
`Sua lista continua no AniList ou MyAnimeList.`

Support statement:
`Sem um servidor Puriki mantendo uma cópia própria da sua lista.`

CTA:
`Saiba mais sobre privacidade`

Avoid absolute claims such as:

- “100% private”
- “your data never leaves your device”
- “we store no data”
- “totally secure”

## Open Source section

Title:
`Aberto por natureza`

Copy:
`O Puriki é gratuito, sem anúncios e possui seu código aberto no GitHub. Você pode acompanhar o desenvolvimento, reportar problemas e contribuir com o projeto.`

Primary section CTA:
`Ver projeto no GitHub`

Do not add stars/forks/commit counters to the marketing page.

Do not promise “free forever”.

## Roadmap

Section title:
`O que vem depois`

Intro:
`O Puriki continuará evoluindo sem perder o foco em uma experiência simples e segura para sua lista.`

### 1.0 — Foundation

Status:
- before first public stable release: `Em preparação` or `Atual`
- after first stable release: `Disponível`

Description:
`A experiência principal do Puriki com AniList e MyAnimeList.`

### 2.0 — List Sync + novo visual

Status:
`Próximo`

Description:
`Sincronize manualmente sua lista de um provedor para outro, com análise antes de qualquer alteração.`

Optional supporting sentence:
`Você escolhe a origem e o destino. O Puriki analisa as diferenças antes de aplicar alterações.`

### 3.0 — Multi-provider Sync

Status:
`Planejado`

Description:
`Replica alterações futuras realizadas pelo Puriki entre os provedores conectados.`

Disclaimer:
`O roadmap representa a direção atual do projeto e pode evoluir durante o desenvolvimento.`

CTA:
`Ver roadmap completo no GitHub`

## Download section

Title:
`Baixe o Puriki para Android`

Support copy:
`Gratuito, open source e sem anúncios.`

When a stable release exists, show:

- version;
- Android;
- APK;
- file size;
- publication date;
- primary download button;
- GitHub Releases origin statement;
- release/changelog link;
- SHA-256 disclosure;
- installation help disclosure.

Primary download CTA:
`Baixar para Android`

Origin line:
`Download oficial através do GitHub Releases.`

### No-release state

Title remains:
`Baixe o Puriki para Android`

Status content:
`A primeira versão pública do Puriki ainda está em preparação.`

Do not show a fake version, size, hash, or disabled fake download target.

Optional CTA:
`Acompanhar no GitHub`

## APK installation help

Keep concise.

Suggested steps:

1. Baixe o arquivo oficial do Puriki.
2. Abra o APK no Android.
3. Caso solicitado, permita a instalação a partir do navegador ou gerenciador de arquivos utilizado.
4. Confirme a instalação.

Safety note:

`O Android pode exibir um aviso porque o aplicativo foi baixado fora da Google Play. Verifique sempre se o download veio deste site ou do repositório oficial do Puriki no GitHub.`

Never tell users to “ignore a security warning”.

Never instruct users to globally disable Android security protections.

## FAQ

Use an accessible Accordion.

Recommended questions:

1. `Preciso de uma conta Puriki?`
2. `Preciso conectar AniList e MyAnimeList ao mesmo tempo?`
3. `O Puriki substitui AniList ou MyAnimeList?`
4. `O Puriki sincroniza minha lista entre AniList e MyAnimeList?`
5. `O Puriki está disponível na Google Play?`
6. `Como verifico se o APK é oficial?`
7. `Como atualizo o Puriki?`
8. `Existe versão para iOS?`

Answer style:

- answer directly in the first sentence;
- avoid legalistic language;
- do not overpromise.

Key current answers:

- no Puriki account is required;
- one provider is enough;
- Puriki does not replace providers;
- 1.0 does not automatically synchronize AniList and MAL;
- no Google Play availability at launch;
- official APK comes from official GitHub Releases;
- iOS is not a current priority.

## Footer

Suggested columns:

### Product
- Recursos
- Como funciona
- Roadmap
- Baixar

### Project
- GitHub
- Releases
- Issues

### Legal
- Privacidade
- Termos de Uso

Footer disclaimer:

`Puriki é um projeto independente e não oficial. Não possui afiliação com AniList ou MyAnimeList.`

Copyright direction:
`© 2026 Puriki`

Do not automatically add “All rights reserved.”

## Legal page content boundaries

### Privacy must cover

- no Puriki account;
- provider authentication;
- tokens/secure local storage;
- local cache/preferences;
- provider API communication;
- local translation where applicable;
- deleting/local data reset behavior;
- no first-party analytics at launch;
- GitHub Pages hosting/infrastructure considerations;
- third-party services;
- policy updates;
- contact path.

### Terms must cover

- independent/unofficial project;
- dependency on third-party providers/APIs;
- no guaranteed provider availability;
- responsible use;
- open-source nature;
- software availability;
- future feature changes;
- limitations appropriate to a non-commercial open-source project.

Do not invent legal guarantees. Final legal text should be reviewed before public launch.
