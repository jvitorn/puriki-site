# Fase 02 — Rotas Estáticas, Internacionalização e Modelo de Conteúdo

## Objetivo

Criar a estrutura completa de rotas e locales antes de construir a landing completa.

## 1. Modelo de locale

Locales suportados: `pt-BR`, `en`, `es`, implementados em `app/lib/i18n/locales.ts` (`Locale`, `localeConfig`). Cada config define código, `lang` do HTML, prefixo de URL pública, nome de exibição, label curto opcional e estratégia de formatação de data.

O prefixo de URL deriva de um único campo `urlSegment` (via `app/lib/i18n/pages.ts`), então os prefixos `/en/`, `/es/` nunca são digitados à mão em mais de um lugar. Nenhum componente contém comparações `locale === "..."` — o único ponto que resolve "o locale atual" é `useRouteHandle()`.

## 2. Rotas públicas

As nove rotas (pt-BR, en, es × home/privacy/terms) mais o comportamento de 404 para o GitHub Pages foram confirmadas pré-renderizadas via `pnpm build` e via uma simulação com `BASE_PATH=/puriki-site/`; `build/client/404.html` é gerado por `scripts/prepare-static-output.mjs` a partir da rota `/404` pré-renderizada.

## 3. Modelo de conteúdo

Conteúdo tipado em vez de texto embutido profundamente em componentes de apresentação. Estrutura de topo: `seo`, `navigation`, `hero`, `providers`, `benefits`, `showcases`, `privacySummary`, `openSource`, `roadmap`, `download`, `faq`, `footer`, `privacyPage`, `termsPage`.

Implementado em `app/content/{types,pt-BR,en,es,index}.ts`. Cada arquivo de locale usa `satisfies SiteContent`, então o TypeScript detecta chaves faltando. Alvos de link de footer/nav são tipados como `{kind:"anchor"|"external", ...}` e resolvidos para hrefs reais pelo shell — o conteúdo nunca guarda uma string de URL, exceto URLs externas literais do GitHub. Não existe dicionário de tradução runtime com chaves mágicas (`t("...")`) — os componentes recebem objetos de conteúdo tipados.

## 4. Copy fonte em PT-BR

Copy aprovada implementada em `app/content/pt-BR.ts`. Nenhuma disponibilidade na Play Store foi inventada, nenhuma List Sync 1.0 foi afirmada, nenhuma disponibilidade em iOS foi afirmada, nenhuma afirmação absoluta de privacidade/segurança foi feita. O benefício #4 e o showcase #3 deliberadamente evitaram afirmar o recurso de tradução on-device nesta fase (mantidos genéricos) até que fosse verificado contra o app de produção — verificação que veio a acontecer na Fase 03.

## 5. Inglês e Espanhol

Conteúdo completo em `app/content/en.ts` e `app/content/es.ts` — traduções editoriais estáticas escritas para esta fase, sem serviço/API de tradução envolvido. Termos de produto como `List Sync` foram preservados onde intencionalmente uma marca; nomes de provedor mantidos sem alteração; copy cabe sem quebras de linha manuais específicas de layout.

A revisão humana das traduções antes do lançamento ficou registrada como pendência explícita no checklist (ainda pendente).

## 6. Seletor de idioma

Implementado em `app/components/layout/language-switcher.tsx`, usado no header desktop e no Sheet mobile. Renderiza links `<a>` reais (`pageHref`) para os três locales, com `aria-current="page"` no ativo. Troca de `/privacy/` para inglês vai para `/en/privacy/`, não para `/en/`; de `/en/terms/` para espanhol vai para `/es/terms/`. Sem redirecionamento forçado ao carregar a página. Nenhuma preferência de locale via `localStorage` foi implementada nesta fase (é opcional); como não existe, não há risco de sobrepor uma URL diretamente solicitada.

## 7. Modelo de metadados

`PageMetadataModel` / `getPageMetadataModel()` em `app/lib/i18n/metadata.ts`: title, description, canonical path, locale/title/description de Open Graph, referência opcional de imagem social. O caminho canônico e o locale de OG derivam da mesma fonte de verdade de locale+página usada pelo roteamento (`getPagePath`, `localeConfig`), nunca duplicados como strings de conteúdo.

Apenas title/description eram de fato renderizados no HTML nesta fase, via o `meta()` de cada rota e o `<Meta />` do React Router — confirmado no output pré-renderizado. Canonical/OG ainda não eram emitidos (isso veio na Fase 05).

## 8. Arquitetura de rotas

Módulos de rota pequenos: `app/pages/{home-page,privacy-page,terms-page}.tsx` são os três componentes compartilhados (recebem só `{ locale }`). Nove arquivos wrapper finos em `app/routes/pages/<locale>/<page>.tsx` chamam `createLocalePageRoute(locale, page)` (`app/lib/i18n/route-factory.tsx`) e reexportam `{ default, handle, meta }` — nenhum JSX é duplicado por locale.

## 9. Verificação de pré-renderização estática

- [x] `pnpm build` (basename `/`) — todas as nove páginas, `/foundation` e `/404` produziram `index.html` aninhados corretos, com `<html lang>` e `<title>` corretos por locale.
- [x] `BASE_PATH=/puriki-site/ SITE_URL=... pnpm build` — output aninha corretamente sob `build/client/puriki-site/...` durante o build do React Router, depois `scripts/prepare-static-output.mjs` achata para `build/client/...` e também copia a página `/404` pré-renderizada para `build/client/404.html`. Links/assets internos carregam corretamente o prefixo `/puriki-site/`.

## Testes

Cobertura: cada objeto de conteúdo de locale validado contra o tipo compartilhado; mapeamento de rotas por locale; troca de locale para a rota equivalente; presença de todas as entradas de rota pública exigidas; modelo de metadados com title/description para todas as páginas/locales. Ver `tests/i18n/{locale-content,routes,language-switcher,metadata,pages}.test.ts` e `tests/shell.test.tsx` — 34 testes passando ao final desta fase.

## Critérios de aceite

As nove páginas localizadas primárias pré-renderizam, a estrutura de rota aninhada direta é válida, o conteúdo é tipado centralmente, a lógica de troca de locale está correta, e nenhuma implementação de seção precisa saber como os prefixos de URL são construídos manualmente.

A Fase 02 entregou um scaffold de conteúdo/rotas — o design visual final da landing ficou por conta da Fase 03.
