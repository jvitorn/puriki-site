# Fase 08 — Limpeza e Consolidação do Repositório

## Objetivo

Transformar o repositório de "projeto documentado durante a construção" para "projeto público consolidado": documentação interna em PT-BR, sem ruído de execução de agente, sem sandbox temporário, sem nomenclatura antiga incorreta, preservando o histórico técnico útil das fases anteriores. Nenhuma funcionalidade de produto foi alterada.

## Documentação

- `DECISIONS.md`, `DESIGN_SYSTEM.md`, `docs/planos/README.md` e todos os `PHASE_00` a `PHASE_07` foram traduzidos para PT-BR. Títulos passaram para o formato "Fase XX — Nome"; os nomes de arquivo (`PHASE_XX_*.md`) não mudaram, para não quebrar histórico do Git nem referências existentes.
- Relatórios muito verbosos (principalmente `PHASE_06` e `PHASE_04`/`PHASE_05`) foram condensados, removendo narração comando-a-comando e listas repetitivas, preservando decisão, implementação, validação e resultado.
- Notas históricas que registram uma decisão real (ex.: Fase 04 usava um único APK antes da `v1.0.0`; a Fase 03 registrou a decisão de usar mockups estilizados em vez de screenshots reais) foram mantidas — apenas reescritas em tom neutro, sem "aprovado pelo maintainer" ou linguagem de aprovação.
- `IMPLEMENTATION_PLAN.md` e `CONTENT_SPEC.md` foram removidos: sua função principal era ser um roteiro de execução ("Must include", "Do not implement") para as fases que já foram todas concluídas — o `docs/planos/README.md` reescrito já resume o mapa de fases, e as regras de copy com valor duradouro (nunca afirmar sincronização automática, nunca reivindicar Google Play/iOS, nunca fazer afirmação absoluta de privacidade, etc.) foram incorporadas a `DECISIONS.md`.
- `CHECKLIST-EN.md` foi removido. `CHECKLIST-PT-BR.md` passa a ser o único checklist interno.
- `CHECKLIST-PT-BR.md` foi revisado por completo: estados padronizados para `[x]`/`[ ]`/`N/A` (os antigos `[!]` e `[-]` foram eliminados), linguagem de aprovação/bloqueio removida, e itens antigos foram corrigidos objetivamente onde o código já comprovava conclusão (por exemplo, "pnpm-lock.yaml commitado" estava marcado como parcial e já era verdade há várias fases).

## Nomenclatura antiga

- Identificadores `PURIKUKI_REPO_URL`, `PURIKUKI_RELEASES_URL`, `PURIKUKI_ISSUES_URL`, `PURIKUKI_ROADMAP_DOC_URL` e `PURIKUKI_LICENSE_URL` (`app/lib/external-links.ts` e todo import/uso deles em `app/content/*.ts`, `app/components/layout/site-header.tsx`, `app/components/layout/site-footer.tsx`, `app/sections/{hero,download,open-source,roadmap}-section.tsx`) foram renomeados para `PURIKI_*`. É um rename mecânico e seguro — nenhum comportamento mudou, nenhum arquivo foi renomeado.
- Referências textuais a `purikuki` foram avaliadas uma a uma: menções que explicam o histórico real (o repositório do app se chamava `jvitorn/purikuki` antes de um rename no GitHub; a URL antiga continua funcionando como redirect) foram mantidas, com essa explicação. As duas ocorrências que descreviam a fonte da auditoria da Fase 07 como `jvitorn/purikuki` — que já era o nome errado no momento em que foram escritas — foram corrigidas para `jvitorn/puriki`.

## Sandbox `/foundation/`

Removido por completo: `app/routes/foundation.tsx`, a rota em `app/routes.ts`, a entrada de prerender em `react-router.config.ts`, e as referências que a mencionavam em `app/lib/i18n/use-route-handle.ts`, `app/lib/i18n/metadata.ts` e `scripts/generate-seo-files.ts`. O checque especial de "Foundation não deve aparecer no sitemap" em `scripts/validate-static-output.ts` foi removido — a checagem geral de que o sitemap bate byte a byte com o gerador já cobre isso sem precisar de um caso especial que não faz mais sentido depois que a rota deixou de existir. Os testes que verificavam a presença de `/foundation` no prerender foram atualizados para verificar sua ausência.

Nenhum componente/asset ficou órfão: `SmartphoneMockup` e o `Accordion` que a Foundation usava continuam em uso normal (Hero e FAQ, respectivamente); nada mais dependia exclusivamente dela.

Menções históricas à Foundation nos documentos de fase (ex.: "a revisão de contraste da Fase 05 verificou o sandbox `/foundation/`") foram preservadas como registro do que era verdade naquela época.

## Comentários de código

Nenhuma linguagem operacional de agente (`agent`, `Codex`, `Claude`, `maintainer approval`, `wait for approval`) foi encontrada em comentários de código — a base já estava limpa nesse sentido. Comentários JSDoc que documentam o comportamento público de uma função/classe (`parseGitHubRelease`, `validateReleaseMetadata`, etc.) foram mantidos em inglês, como docstrings. Comentários inline que explicam uma decisão não óbvia — por que os cards de Download compartilham layout, por que `getRequiredReleaseArtifact` lança em vez de esconder a seção, por que certas extensões de arquivo são varridas no validador estático, por que `SITE_URL` nunca pode ser combinado com `BASE_PATH` — foram traduzidos para português em `app/sections/download-section.tsx`, `scripts/validate-static-output.ts`, `app/lib/seo/site-url.ts`, `scripts/generate-seo-files.ts`, `scripts/fetch-release.ts`, `scripts/prepare-static-output.mjs` e `scripts/generate-brand-raster-assets.mjs`.

Nomes de identificadores, testes (`describe`/`it`) e suas descrições continuam em inglês.

## Workflows

`.github/workflows/quality.yml` e `.github/workflows/deploy-pages.yml` não tiveram triggers, permissions, versões de Action ou lógica de gate alterados. Os nomes de exibição dos steps (`Checkout repository` → `Fazer checkout do repositório`, `Build static site` → `Gerar site estático`, etc.) e os comentários escritos pelo projeto dentro dos YAMLs foram traduzidos para PT-BR; chaves técnicas do GitHub Actions (`permissions`, `jobs`, `steps`, `uses`, `with`, `env`, `run`) e os nomes públicos `Quality`/`Deploy to GitHub Pages` (usados como nome do workflow e, por consequência, como nome de status check) não foram tocados.

## Dependabot

Confirmado ausente (`.github/dependabot.yml` já havia sido removido na correção da Fase 07). Nenhum substituto (Renovate, Snyk bot, workflow próprio de update) foi adicionado. O histórico de que a Fase 06 o introduziu e a Fase 07 o removeu por decisão de simplificação está registrado em `PHASE_06_TESTING_CI_DEPLOY.md` e nos checklists.

## README

`README.md` continua PT-BR/EN/ES conforme a decisão já registrada. Duas referências obsoletas a `foundation/index.html` (usado como exemplo de rota aninhada estática e como item excluído do sitemap) foram corrigidas para `en/index.html` e para o texto correto sobre o que o sitemap exclui, já que a rota não existe mais.

## Dead code e imports

Depois da remoção da Foundation, o import de `getPublicUrls` em `scripts/validate-static-output.ts` ficou sem uso (só existia para o checque especial de Foundation que também foi removido) e foi retirado. Nenhum outro import morto, export morto ou componente órfão foi encontrado.

## Branches

Nenhuma branch remota foi removida. `feature/1.0`, `feature/1.0.1`, `feature/1.0.2-phase-04R`, `feature/1.0.2-phase-06` e `feature/1.0.2-phase-07` continuam existindo, representando a evolução real do projeto.

## Validação

`pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm lint`, `pnpm typecheck` e `pnpm test` passam depois de toda a limpeza (159 testes, mesma contagem de antes — nenhum teste foi adicionado ou removido nesta fase, só ajustado onde a Foundation deixou de existir). `pnpm build` e `pnpm validate:static` passam tanto offline quanto em build de produção (`BASE_PATH=/puriki-site/`), e `pnpm release:fetch` contra a release real `v1.0.0` seguido de build/validate também passa, sem nenhuma regressão em Download, Roadmap, JSON-LD ou nos artifacts. `app/generated/release.json` foi restaurado ao baseline `{ "available": false }` ao final.

## Pendências reais que continuam abertas

Nenhuma delas foi criada por esta fase — são as mesmas já registradas nas Fases 05/06/07: revisão humana fluente de EN/ES, revisão jurídica de Privacy/Terms, spot-check com leitor de tela real, teste de download em Android físico, confirmação manual de `Settings → Pages → Source = GitHub Actions` e de uma regra de branch protection em `main` exigindo o check `quality`.

## Resultado

Nenhuma mudança de comportamento de produto. `/foundation/` não existe mais em nenhum lugar do código ou do output. A documentação interna é hoje o que um desenvolvedor real leria: decisões e histórico em português, sem instrução de execução para agente. A Fase 09 não foi iniciada.
