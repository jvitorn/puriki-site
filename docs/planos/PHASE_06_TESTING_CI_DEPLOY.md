# Fase 06 — Qualidade Automatizada, CI e Deploy no GitHub Pages

## Objetivo

Tornar as checagens de qualidade reproduzíveis e o deploy chato (no bom sentido): todo Pull Request prova qualidade antes do merge, e um deploy normal de `main` publica um site funcionando no GitHub Pages sem upload manual de arquivo.

## Auditoria de cobertura antes de escrever testes novos

Antes de adicionar qualquer teste, a suíte existente foi auditada requisito a requisito. Locale, mapeamento de rotas, parser multi-ABI, formatters, Download, roadmap, Header/Sheet, FAQ, JSON-LD e o smoke de acessibilidade já tinham cobertura suficiente e não foram duplicados. Duas lacunas reais foram encontradas: a geração de canonical/hreflang (`buildPageLinks`) não tinha teste direto (só verificação manual em fases anteriores), e a validação do `ReleaseMetadata` já gerado era rasa.

## Hardening do `ReleaseMetadata` gerado

`parseGitHubRelease()` já validava rigorosamente uma resposta *fresca* da API do GitHub. `getReleaseMetadata()`, que lê o `app/generated/release.json` já gerado, fazia uma checagem estrutural bem mais permissiva. Um arquivo gerado corrompido ou editado manualmente poderia passar por essa checagem violando invariantes reais (por exemplo, faltando `arm64-v8a`, uma variante duplicada, um tamanho zero).

`app/lib/releases/validate-release-metadata.ts` (novo) exporta `validateReleaseMetadata()`, lançando um `ReleaseMetadataValidationError` explícito quando: `available` não é booleano; `available: true` sem `version`/`publishedAt`/`releaseUrl` válidos; algum artifact tem variante não reconhecida, variante duplicada, nome de arquivo que não bate com a convenção (reaproveitando `buildArtifactFileName()` em vez de reimplementar a regra), tamanho inválido ou `downloadUrl` vazio; `arm64-v8a` ou `universal` ausentes. `getReleaseMetadata()` chama esse validador em toda leitura.

## Fronteira de artifact obrigatório — sem `null` silencioso

`AvailableReleaseView` em `download-section.tsx` tinha `if (!arm64 || !universal) { return null; }`, justificado por um comentário dizendo que isso "deveria ser impossível". Depois do hardening acima, esse comentário passou a ser de fato garantido no lugar que importa — então o `null` silencioso foi removido. `app/lib/releases/index.ts` ganhou `getRequiredReleaseArtifact()`, que lança um erro específico em vez de retornar `undefined`. Uma falha agora acontece em build/teste, antes de qualquer publicação — nunca mais como uma seção de Download que simplesmente desaparece.

## Scripts do `package.json`

```json
"validate:static": "tsx scripts/validate-static-output.ts",
"verify": "pnpm format:check && pnpm lint && pnpm typecheck && pnpm test"
```

`build` ficou de fora do `verify` de propósito — precisa de `SITE_URL`/`BASE_PATH` por invocação (dev vs. GitHub Pages vs. um futuro domínio próprio). `validate:static` é seu próprio script pela mesma razão: roda depois de um build específico, contra o que quer que esse build tenha usado.

## Validador de output estático

`scripts/validate-static-output.ts` (novo), rodado via `pnpm validate:static` depois do build. Apenas built-ins do Node + os helpers puros que o projeto já tinha — nenhuma dependência de parser de HTML foi adicionada.

Reaproveita, em vez de rederivar: `LOCALES`/`PAGES`/`getPagePath` para as nove rotas públicas (a mesma fonte de verdade que o roteamento e o `generate-seo-files.ts` já usam); `buildAbsoluteUrl`/`normalizeSiteUrl` (`app/lib/seo/site-url.ts`, seguro para um script Node puro, diferente de `app/lib/config.ts`, que depende de `import.meta.env`); `getPublicUrls`/`buildSitemapXml`/`buildRobotsTxt` — o validador compara `sitemap.xml`/`robots.txt` byte a byte com o que o próprio gerador produziria para o `SITE_URL` configurado.

Por rota pública: existência do arquivo de output achatado correto; `<html lang>` correto; title/description não vazios; canonical igual a `SITE_URL` + o path da página; exatamente os quatro alternates de hreflang esperados; Open Graph e Twitter Card presentes com `og:url` igual ao canonical; JSON-LD `SoftwareApplication` presente só na Home; favicon/apple-touch-icon/stylesheet com href começando no base path configurado; nenhuma referência `"/assets/..."` na raiz em vez do base path; nenhum base path duplicado; nenhum `http(s)://localhost` quando `SITE_URL` não é local.

No artifact inteiro: `404.html` na raiz; `sitemap.xml`/`robots.txt` batendo com o gerador; assets obrigatórios (`seo/og-image.png`, `favicon.png`, `apple-touch-icon.png`); ausência total de `.apk`/`.keystore`/`.jks`/`SHA256SUMS.txt`; ausência de padrões de segredo (`ghp_…`, `github_pat_…`, `RELEASE_FETCH_TOKEN`, `GITHUB_TOKEN`, `EAS_TOKEN`) em qualquer asset de texto.

Nenhuma versão é hardcoded — testado contra o baseline `{ "available": false }` e contra a release real `v1.0.0`. As peças testáveis são exportadas como funções puras e cobertas por `tests/scripts/validate-static-output.test.ts`.

## Workflow de Qualidade (gate de PR)

`.github/workflows/quality.yml` (novo). Trigger: `pull_request` e `push` para `main`. Nome do job `quality` — deliberadamente estável e sem matrix, para servir como nome de status check confiável em branch protection.

Permissões: só `contents: read`, no workflow e no job — este workflow nunca publica nada.

Ambiente: `ubuntu-latest`, Node 22, pnpm via `packageManager` — sem matrix de Node/browser (é uma landing pequena, não uma lib que precise de ampla compatibilidade).

Passos: checkout → setup pnpm → setup Node (com cache pnpm) → `pnpm install --frozen-lockfile` → `pnpm format:check` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → build estilo produção → `pnpm validate:static`. Cada um em seu próprio step, para que uma falha apareça como um step vermelho nomeado, não um bloco opaco.

**Este workflow nunca roda `pnpm release:fetch`.** O CI de PR sempre builda e valida contra o baseline commitado `{ "available": false }` — determinístico, rápido, e independente da API do GitHub. O comportamento `available: true` é exercitado pelas fixtures da suíte de testes. A release real, ao vivo, só é validada pelo workflow de deploy, imediatamente antes de publicar.

## Workflow de deploy

Triggers (`push` para `main`, `workflow_dispatch`, `repository_dispatch: puriki-release-published`), concorrência e a divisão dos jobs `build`/`deploy` com seus limites de permissão foram todos preservados. O que mudou dentro do job `build`:

```
checkout → setup pnpm/Node → install --frozen-lockfile
  → pnpm verify (NOVO — gate de qualidade)
  → pnpm release:fetch (inalterado, real)
  → pnpm build (inalterado, env de produção)
  → pnpm validate:static (NOVO)
  → upload-pages-artifact
```

`pnpm verify` (em vez de quatro steps separados, diferente do `quality.yml`) é usado aqui para não duplicar o mesmo YAML duas vezes em um projeto deste tamanho. Qualquer gate falhando (formatação, lint, typecheck, teste, o `release:fetch` real, ou `validate:static`) impede o `upload-pages-artifact`/`deploy` de rodar — o site publicado anteriormente permanece no ar sem ser tocado.

## Dependabot

> **Atualização (correções da Fase 07):** o Dependabot foi removido depois desta fase — ver abaixo.

`.github/dependabot.yml` (novo, à época): `npm` (o pnpm usa o identificador `npm` no Dependabot) e `github-actions`, ambos semanais, `open-pull-requests-limit: 10`, sem auto-merge.

O Dependabot rodou por algumas semanas depois desta fase, e seus updates já mergeados (cada um revisado e mergeado individualmente, nunca com auto-merge) permanecem no `package.json`/`pnpm-lock.yaml` como histórico normal. A configuração em si foi removida depois, como uma decisão deliberada de simplificação do projeto (Fase 07, correções) — atualizações futuras de dependência passaram a ser manuais, quando o projeto realmente precisar. Isso não é uma reversão de nenhuma versão de dependência já aprovada.

## Segurança

No código-fonte: nenhum segredo em `VITE_*`, nenhum `GITHUB_TOKEN`/`RELEASE_FETCH_TOKEN`/`ghp_`/`github_pat_` hardcoded, nenhum material de EAS/keystore/OAuth em lugar nenhum do `puriki-site`. No artifact de build: `validate:static` varre automaticamente em toda execução — nenhum APK/keystore/`SHA256SUMS.txt`, nenhum texto de padrão de segredo.

## Revisão de performance do build

Um build de produção contra a release real `v1.0.0` totaliza aproximadamente: JS ~608 KB, CSS ~36 KB, fontes ~84 KB, imagens/assets estáticos ~72 KB — proporcional a uma landing React 19 + Radix + React Router com code splitting por rota. Nenhum budget arbitrário foi introduzido; nada nesse tamanho justificou otimização adicional nesta fase.

## O que esta fase deliberadamente não adicionou

Nenhuma suíte E2E/Playwright, nenhuma matrix de versão de Node/browser, nenhuma meta de porcentagem de cobertura, nenhum sender de dispatch entre repositórios/PAT/GitHub App, nenhum auto-merge do Dependabot, nenhum redesign visual/de motion/analytics/backend/CMS/PWA/domínio próprio.

## Resultado

`pnpm verify` passou (format/lint/typecheck/test), `pnpm build`/`pnpm validate:static` passaram tanto offline quanto contra a release real `v1.0.0`, e `app/generated/release.json` foi restaurado ao baseline versionado depois da validação.

## Configuração manual pendente no GitHub

Dois itens não podem ser verificados nem aplicados a partir do código:

1. **Fonte do Pages.** `Settings → Pages → Build and deployment → Source → GitHub Actions`. Sem isso, `deploy-pages.yml` não tem para onde publicar.
2. **Branch protection exigindo o check `quality`.** `Settings → Branches` (ou `Rules → Rulesets`) → proteger `main` → exigir que o check chamado exatamente `quality` passe antes do merge.
