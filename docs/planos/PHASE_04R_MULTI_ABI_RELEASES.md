# Fase 04R — Revisão da Integração de Releases Multi-ABI

## Por que esta fase existe

A Fase 04 modelou a integração com a GitHub Release em torno de um único APK Android (`puriki-v{version}.apk`). Isso era preciso para o estado do repositório `jvitorn/puriki` na época.

O Puriki desde então alcançou sua primeira release pública estável, `v1.0.0`, e a estratégia de distribuição real que foi lançada com ela usa **um APK por ABI Android**, em vez de um binário universal único:

- `puriki-v1.0.0-arm64-v8a.apk`
- `puriki-v1.0.0-universal.apk`
- `puriki-v1.0.0-armeabi-v7a.apk`
- `puriki-v1.0.0-x86_64.apk`
- `puriki-v1.0.0-x86.apk`
- `SHA256SUMS.txt` (um asset da GitHub Release, não parte do contrato deste site — ver "SHA-256 / checksums" abaixo)

O contrato de APK único da Fase 04 deixou de corresponder à realidade, então esta revisão o substitui por um modelo multi-artifact antes do início da Fase 06 (Testes/CI/Deploy).

## O que mudou, em resumo

| | Fase 04 (original) | Fase 04R |
|---|---|---|
| Formato da release | um APK por release | N artifacts Android por release |
| Nome de arquivo esperado | `puriki-v{version}.apk` | `puriki-v{version}-{variant}.apk` |
| Assets obrigatórios | o único APK | `arm64-v8a` **e** `universal` |
| Assets opcionais | nenhum | `armeabi-v7a`, `x86_64`, `x86` |
| SHA-256 | exibido e copiável na landing | fora da UX da landing |
| CTA primário | o único APK | `arm64-v8a` (recomendado) |
| CTA secundário | nenhum | `universal` (alternativa destacada) |
| Detecção de ABI | n/a | explicitamente nunca implementada |

## Novo contrato `ReleaseMetadata`

Em `app/lib/releases/types.ts`: uma release passou a ter uma lista `artifacts[]` (`AndroidReleaseArtifact`, com `variant`/`fileName`/`sizeBytes`/`downloadUrl`), ordenada sempre `arm64-v8a`, `universal`, `armeabi-v7a`, `x86_64`, `x86` (só os presentes) — a mesma ordem que a UX de Download usa, então nenhum componente precisa reordenar.

Princípios de design preservados: uma release tem muitos artifacts, não um; cada artifact só conhece seus próprios campos — `version`, `publishedAt`, `releaseUrl` vivem uma única vez na release, nunca duplicados por artifact; "recomendado" é uma decisão de **apresentação** (a UI de Download sempre trata `arm64-v8a` como primário), não um campo que os metadados do GitHub carregam; `sha256` foi removido inteiramente (ver abaixo).

## Artifacts obrigatórios vs. opcionais

**Obrigatórios:** `arm64-v8a`, `universal`. Uma release estável sem algum dos dois falha `parseGitHubRelease()` (e portanto `pnpm release:fetch`, e portanto o step de build do deploy) com um `ReleaseParseError` explícito e acionável. A landing nunca é publicada silenciosamente incompleta.

**Opcionais:** `armeabi-v7a`, `x86_64`, `x86`. Uma release futura pode abandonar qualquer um deles (por exemplo, parar de suportar ARM de 32 bits) sem falhar o build — o parser simplesmente omite essa variante de `artifacts`, e a UI de Download omite essa opção de "Outras versões" em vez de mostrar um placeholder ou link quebrado.

**Assets não reconhecidos:** qualquer outro `.apk` na release (uma variante futura inesperada, um artifact de build perdido) é ignorado em vez de tratado como ambíguo, desde que as duas variantes obrigatórias estejam presentes e nomeadas corretamente. `SHA256SUMS.txt` é ignorado da mesma forma (nem é um `.apk`, então nunca entra no conjunto de candidatos).

**Nomes quase corretos:** um asset com nome parecido mas não exatamente igual à convenção `puriki-v{version}-{variant}.apk` (por exemplo `puriki-v1.0.0-arm64.apk`, faltando `-v8a`) nunca é confundido com um artifact válido — o casamento é por string exata, não fuzzy.

## Contrato de nome de arquivo

Centralizado em um único lugar, `buildArtifactFileName(version, variant)` em `app/lib/releases/parse-github-release.ts`: `puriki-v{version}-{variant}.apk`. Nenhum componente de UI jamais re-deriva ou re-templatiza essa string — componentes só consomem `fileName`/`downloadUrl` já presentes em um `AndroidReleaseArtifact` já processado.

## Comportamento do parser (`parseGitHubRelease`)

Todo o hardening da Fase 04 foi preservado: releases draft rejeitadas; prereleases rejeitadas para o CTA primário; `published_at` ausente/inválido rejeitado; JSON/payload malformado rejeitado; `browser_download_url` ausente em um artifact rejeitado; tamanho de artifact inválido rejeitado; `raw === null` (404 de `GET /releases/latest`) é o único caminho que produz `{ available: false }`.

Novidade multi-ABI: o parser percorre `RECOGNIZED_ARTIFACT_VARIANTS` em ordem, procura um nome de arquivo exato por variante, e só então checa se cada `REQUIRED_ARTIFACT_VARIANTS` foi encontrado.

## SHA-256 / checksums — removidos da UX pública

Decisão registrada explicitamente aqui: `SHA256SUMS.txt` e qualquer digest por asset **não** fazem parte da UX da landing. A própria GitHub Release continua sendo o lugar correto para um usuário tecnicamente inclinado verificar a integridade via `SHA256SUMS.txt` ou o digest de asset do próprio GitHub.

Consequentemente, esta fase removeu: o campo `sha256` de `ReleaseMetadata`/`AndroidReleaseArtifact`; `normalizeSha256()` do parser; o componente `ShaDisclosure` (`app/sections/sha-disclosure.tsx`) e todo campo de conteúdo que só existia para suportá-lo; os testes específicos de SHA (dobrados na nova suíte de testes da seção Download, que agora garante que uma disclosure de checksum **nunca** é renderizada).

Isso é escopo apenas do `puriki-site`. O repositório do app continua publicando `SHA256SUMS.txt` em toda release; nada muda na própria prática de checksum do app.

## UX de Download

`app/sections/download-section.tsx` foi reescrito em torno de uma hierarquia clara, para que um usuário comum nunca precise entender uma ABI de CPU para escolher o arquivo certo:

1. **Android atual (ARM64)** — card primário, badge "Recomendado" (um badge textual, nunca só por cor), CTA aponta diretamente para o `downloadUrl` do artifact `arm64-v8a`.
2. **Versão Universal** — segundo card, subtítulo "Não sabe qual escolher?", CTA aponta diretamente para o artifact `universal`. A copy evita deliberadamente "funciona em qualquer Android"/"compatível com qualquer dispositivo" — só afirma suporte a múltiplas arquiteturas.
3. **Outras versões** — um Collapsible que só renderiza quando existe pelo menos um artifact opcional; cada variante presente ganha sua própria linha com título em linguagem simples, nota de arquitetura secundária, tamanho e link próprio de download. Uma variante opcional ausente não renderiza nada.
4. **"Qual versão devo baixar?"** — um segundo Collapsible, deliberadamente não técnico, sempre presente quando uma release existe, explicando as quatro escolhas práticas (ARM64, Universal, Android ARM 32-bit mais antigo, emuladores x86/x86_64).
5. **Link da GitHub Release** — papel inalterado: o destino para changelog e detalhes técnicos (incluindo checksums).

Nenhuma detecção de CPU/ABI/User-Agent foi implementada ou considerada — por privacidade, simplicidade e previsibilidade, a landing sempre apresenta as mesmas escolhas explícitas a todo visitante e deixa o usuário decidir.

O estado sem release ("em preparação") permanece funcionalmente inalterado desde a Fase 03/04: sem versão falsa, sem tamanho falso, sem alvo de download falso desabilitado, CTA do GitHub preservado.

## JSON-LD

`buildSoftwareApplicationJsonLd()` (`app/lib/i18n/metadata.ts`) lê `getReleaseArtifact(release, "arm64-v8a")` e usa o `downloadUrl` desse artifact como `SoftwareApplication.downloadUrl` — `universal` (ou qualquer outra variante) nunca é usado no dado estruturado. `available: false` continua omitindo `softwareVersion`/`downloadUrl` corretamente.

## Roadmap

Arquitetura inalterada desde a Fase 05: `release.available` continua alternando o status do item 1.0 entre "Em preparação"/"Atual" e "Disponível" (e equivalentes EN/ES). Os status de 2.0/3.0 nunca derivam do estado da release. Verificado contra a release real `v1.0.0` durante esta fase.

## Modelo de conteúdo

`DownloadContent` (`app/content/types.ts`) ganhou: `current` (título/badge/nota/descrição do card ARM64); `universal` (título/subtítulo/descrição/cta do card Universal); `otherVersions` (título + uma entrada por variante opcional, cada uma com título/nota/descrição/cta); `chooser` (título + quatro explicações não técnicas); `releaseLabels` perdeu todo campo relacionado a SHA e ganhou `latestLabel` ("Última versão estável" e equivalentes). PT-BR é a fonte editorial; EN e ES foram escritos como equivalentes naturais, não traduções literais, e termos técnicos (ARM64, x86, x86_64, APK) ficam sem tradução nos três locales.

## Menção à licença MIT

A copy da seção Open Source foi mantida como estava; em vez disso, um link discreto "Licenciado sob MIT" foi adicionado à linha de copyright do footer, apontando para o arquivo LICENSE do repositório do app.

## Atualizações do FAQ

Duas respostas foram refinadas para a nova realidade de estado de release sem introduzir explicação de SHA/checksum na landing: "Como verifico se o APK é oficial?" agora aponta para este site ou a GitHub Release oficial do Puriki, mencionando que os detalhes técnicos de integridade vivem diretamente na GitHub Release; "Como atualizo o Puriki?" agora reflete que uma release real existe.

## Script `release:fetch`

`scripts/fetch-release.ts` não assume mais um único `fileName`/`sizeBytes` no nível da release; seu log de sucesso agora reporta a versão e a lista de artifacts Android encontrados. Todas as garantias da Fase 04 permanecem inalteradas: timeout de 15s, fetch da API pública, sem `GITHUB_TOKEN` obrigatório, `RELEASE_FETCH_TOKEN` local opcional (nunca com nome `VITE_*`), 404 -> `{ available: false }`, qualquer outra falha sai com código não-zero em vez de mascarar um erro técnico como "sem release".

## Validação ao vivo contra a release real `v1.0.0`

`pnpm release:fetch` foi executado contra a API pública real de `jvitorn/puriki` durante esta fase. As cinco variantes reconhecidas estavam presentes e corretamente classificadas (`arm64-v8a`/`universal` obrigatórias e encontradas; `armeabi-v7a`/`x86_64`/`x86` opcionais e encontradas). Os tamanhos vieram inteiramente da resposta real da API do GitHub — nada hardcoded. Um build de produção foi então rodado contra esse dado real e o HTML gerado foi inspecionado diretamente. Depois da validação, `app/generated/release.json` foi restaurado para o baseline commitado `{ "available": false }` — a mesma política já estabelecida nas Fases 04/05, então `pnpm build` continua funcionando totalmente offline.

## Estratégia de testes

`tests/releases/fixtures.ts` e `tests/releases/parse-github-release.test.ts` foram totalmente reescritos em torno de fixtures multi-ABI (todos os cinco artifacts, só os dois obrigatórios, cada artifact obrigatório ausente individualmente, cada artifact opcional ausente individualmente, um `.apk` não relacionado presente, um nome quase correto, `SHA256SUMS.txt` ignorado, artifact duplicado com match exato, tamanho inválido, URL de download ausente, tag com/sem `v`/`V` inicial, payloads malformados). `tests/sections/download-section.test.tsx` foi totalmente reescrito para cobrir a nova hierarquia. `tests/sections/roadmap-section.test.tsx` e `tests/a11y/axe-smoke.test.tsx` foram atualizados só para a nova forma de fixture `ReleaseAvailable` — sem mudança de comportamento no que é testado. Um novo `tests/i18n/json-ld.test.ts` cobre explicitamente a regra do `downloadUrl` do JSON-LD usar só `arm64-v8a`.

## O que as Fases 06/07 ainda são responsáveis por fazer

Esta fase não implementou os gates de CI, a validação de output estático, o Dependabot, ou qualquer uma das automações da Fase 06 — só atualizou o texto do plano onde ainda assumia um único APK. Também não fez a validação de download em dispositivo real, a auditoria de precisão de conteúdo, ou o sign-off de lançamento da Fase 07.
