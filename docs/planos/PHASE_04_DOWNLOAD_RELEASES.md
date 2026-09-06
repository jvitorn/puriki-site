# Fase 04 — Metadados de Release do GitHub e Experiência de Download Android

> **Substituída pela Fase 04R (APK único -> multi-ABI), depois da release pública `v1.0.0`:**
>
> Esta fase modelou corretamente a integração de release/download para a estratégia de distribuição conhecida na época: um único APK universal por release (`puriki-v{version}.apk`), com o SHA-256 exibido e copiável diretamente na landing. Nada abaixo foi um erro dado aquele contexto.
>
> Quando o Puriki `v1.0.0` foi de fato publicado, a estratégia real de distribuição usou **um APK Android por ABI** (`arm64-v8a`/`universal`/`armeabi-v7a`/`x86_64`/`x86`, nomeados `puriki-v{version}-{variant}.apk`) em vez de um único APK, e o SHA-256/checksum passou a viver apenas na GitHub Release, não na landing. `docs/planos/PHASE_04R_MULTI_ABI_RELEASES.md` é a revisão que atualizou `ReleaseMetadata`, o parser, a UX de Download, o JSON-LD e a suíte de testes desta fase para essa realidade. Leia este documento para o contexto histórico do design original de APK único; leia a Fase 04R para o contrato atual, implementado.
>
> **Hardening feito durante a Fase 05:** `GITHUB_TOKEN` removido do step `release:fetch` do workflow (`jvitorn/puriki` é público, uma requisição não autenticada por deploy fica bem abaixo do limite de taxa do GitHub); `published_at` passou a ser validado com `Date.parse` antes de uma release ser aceita; `ShaDisclosure` ganhou um estado real de falha ao copiar. Ver `PHASE_05_ACCESSIBILITY_SEO_LEGAL.md` para o relatório completo.

## Objetivo

Conectar o site estático à última GitHub Release estável oficial de `jvitorn/puriki` em build time, sem que nenhuma visita do navegador precise chamar a API do GitHub para renderizar os metadados de release.

## O que foi implementado

- Um contrato `ReleaseMetadata` tipado (`ReleaseUnavailable`/`ReleaseAvailable`), gerado em build time e nunca buscado pelo navegador.
- Um script Node (`scripts/fetch-release.ts`, via `tsx`) que busca a última release estável, rejeita drafts/prereleases, normaliza a tag, localiza exatamente um APK esperado (`puriki-v{version}.apk`), e escreve um arquivo de dados gerado determinístico. Toda a validação/parsing ficou isolada em `app/lib/releases/parse-github-release.ts`, pura e testada por fixtures.
- Distinção clara entre "não existe release estável" (404 real da API, mapeado para `{ available: false }`) e uma falha técnica (timeout, status inesperado, JSON inválido, payload ambíguo) — que sempre lança erro e falha o step do workflow, nunca é mascarada como "sem release".
- Nenhum token do GitHub chega ao bundle do navegador — confirmado inspecionando o output de build de produção.
- UI de Download mostrando versão, Android, APK, tamanho legível, data de publicação localizada, botão de download direto para o asset do GitHub (sem proxy, sem cópia, sem hospedagem no `puriki-site`), origem GitHub Releases, link de changelog, disclosure de SHA-256 com botão de copiar quando presente, instruções de instalação.
- Suíte de testes cobrindo parser, formatters e o componente de Download nos dois estados.
- `repository_dispatch: types: [puriki-release-published]` já declarado no workflow de deploy como gatilho aceito, sem nunca confiar no payload — a release é sempre buscada e reanalisada no próprio step `release:fetch`. O envio desse dispatch dependia do repositório do app ganhar seu próprio workflow de release, o que ficava fora do escopo deste repositório.

## Critérios de aceite

Um navegador público recebe uma página HTML completamente estática com os metadados de release estáveis atuais (a essa altura, o estado honesto de "sem release", já que `jvitorn/puriki` ainda não tinha uma release estável), e clicar em Download levaria diretamente ao APK da GitHub Release oficial assim que uma existisse. Nenhuma credencial do GitHub existe no bundle do navegador.
