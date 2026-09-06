# Fase 03 — Seções da Landing e Narrativa do Produto

## Objetivo

Construir a narrativa completa da landing usando o modelo de conteúdo e o design system. Nenhum dado de release falso é permitido.

> **Decisão de produto (registrada durante a Fase 04):** os mockups estilizados, puramente visuais, usados no Hero e nos três showcases (`app/sections/hero-section.tsx`, `app/sections/showcase-mockups.tsx`) são a solução visual intencional para esta landing — não placeholders temporários à espera de screenshots reais do app. Screenshots reais deixaram de ser um requisito ou bloqueador desta fase (ver seção 12).

## 1. Header

Labels de navegação localizados, links de âncora, comportamento de foco/ativo correto, alvo de scroll do Download, link externo do GitHub, seletor de idioma, Sheet mobile, skip link antes/ao redor da navegação primária. Preservado da Fase 02 (`SiteHeader`); apenas a URL externa do GitHub foi trocada pela constante compartilhada de `external-links.ts`.

## 2. Hero

Implementado em `app/sections/hero-section.tsx`: marca Puriki, um único `h1`, headline aprovada, copy de apoio, CTA primário que rola até Download, CTA secundário GitHub, linha de confiança/apoio, um mockup forte de produto, glow radial de marca sutil (sem grid de fundo — julgado que não agregava o suficiente para justificar). O mockup é uma representação estilizada de "Minha Lista" (barras/blocos construídos a partir de tokens de design, sem texto de UI fabricado) dentro do `SmartphoneMockup` da Fase 01. Essa representação estilizada é a solução visual intencional da landing, não um placeholder.

Responsivo: desktop em duas colunas; mobile na ordem heading → copy → CTAs → mockup. Sem `100vh` forçado — a seção usa a altura natural do conteúdo.

## 3. Relação entre providers / Como funciona

Implementado em `app/sections/providers-section.tsx`: `AniList -> Puriki <- MyAnimeList`, as duas setas sempre apontam para o Puriki. Revelação por fade/translate (reaproveitando `Reveal` + `useReducedMotion` da Fase 01) em vez de uma animação de desenho de path SVG — mais simples e consistente com o resto da página. Um teste confirma que nenhum link/elemento em `#providers` conecta AniList a MyAnimeList diretamente. O layout funciona sem logos (apenas pills de texto); nomes em texto incluídos.

## 4. Quatro benefícios

Gestão de lista, descoberta/busca, escolha de provedor e conforto no dia a dia — implementados em `app/sections/benefits-section.tsx`, um ícone Lucide por card (`ListChecks`, `Search`, `ToggleLeft`, `Smartphone`), sem conceitos de engenharia (cache/OAuth/rate-limiting etc.) apresentados como cards de marketing.

## 5. Showcases do produto

Três seções em `app/sections/showcases-section.tsx` + `app/sections/showcase-mockups.tsx`:

- **Lista** — título/copy aprovados, representação estilizada relevante, contexto de progresso/status (visual, não textual).
- **Descoberta** — título/copy aprovados, representação estilizada de home/busca; sobreposição secundária opcional não foi adicionada, mantendo simplicidade/legibilidade.
- **Detalhes/tradução** — título/copy aprovados, representação estilizada de detalhes; a afirmação de tradução foi incluída e verificada: tradução de sinopse on-device via Google ML Kit, com escopo explícito para Android e leitores de PT-BR/ES.

Desktop com alternância visual (`lg:order-*`, a ordem do DOM nunca muda); mobile sempre na ordem título → copy → imagem.

## 6. Resumo de privacidade

Implementado em `app/sections/privacy-section.tsx`: "Feito para respeitar seus dados", os três pilares de privacidade, link para a página de Privacy localizada. Nenhuma linguagem do tipo "100% privado" / "nunca sai do dispositivo" / "nenhum dado coletado" / "totalmente seguro" está presente.

## 7. Open Source

Implementado em `app/sections/open-source-section.tsx`, como seção própria (não misturada com Benefits): "Aberto por natureza", código aberto no GitHub, gratuito, sem anúncios, CTA GitHub, sem métricas de vaidade do GitHub (stars/forks).

## 8. Roadmap

1.0 Foundation, 2.0 List Sync + novo visual, 3.0 Multi-provider Sync, vocabulário de status correto (Em preparação / Próximo / Planejado, e equivalentes EN/ES), disclaimer do roadmap. O link do roadmap no GitHub foi corrigido para apontar para `PURIKI_PRODUCT_ENGINEERING_ROADMAP.md` em vez da âncora `purikuki#roadmap`, que foi removida. Desktop em progressão horizontal compacta (três cards + régua conectando); mobile em progressão vertical. Sem porcentagens, sem datas inventadas, sem "em breve".

## 9. Shell de Download

Estrutura de seção implementada, estado válido de "sem release" (apenas conteúdo real: status, mensagem, CTA GitHub, linha de origem), nenhuma release falsa hardcoded (teste garante que nenhum padrão de versão/SHA é renderizado), shell de disclosure de instalação como `Collapsible` ("Como instalar" e equivalentes) com os passos e o aviso de segurança, disclosure de SHA ausente no estado sem release, link do GitHub disponível.

O `@radix-ui/react-collapsible` foi adicionado nesta fase, usado para exatamente uma disclosure (passos de instalação) — o FAQ continua um Accordion, por ser uma lista de perguntas e respostas.

## 10. FAQ

As oito perguntas, respostas diretas na primeira frase, comportamento de teclado (Accordion Radix inalterado desde a Fase 01/02), semântica de heading/trigger apropriada, sem animação excessiva.

## 11. Footer

Links de Produto/Projeto/Legal, disclaimer de independência/não oficialidade, copyright, copy localizada. Preservado da Fase 02 (`SiteFooter`); apenas as URLs literais do GitHub no conteúdo foram trocadas pelas constantes compartilhadas.

## 12. Screenshots/assets

**Decisão final:** as representações estilizadas, puramente visuais (barras/blocos a partir de tokens de design, sem texto de UI fabricado), usadas no Hero e nos três showcases são a solução visual intencional desta landing. Screenshots reais do app **não são exigidos** — este item deixou de ser um bloqueador ou um asset pendente. `HeroSection` e `ShowcasePanel` recebem `alt` localizado (`hero.mockupAlt`, `showcases.items[].imageAlt`) do modelo de conteúdo, cumprindo a barra de acessibilidade que um screenshot real exigiria.

Não planejado para esta fase: um futuro polimento visual pode refinar as formas referenciando os componentes reais do app (`My List`, `AnimeListItem`, `Search`, `Anime Details`) para aproximar a representação web da estrutura real do app — isso é polimento de UI, rastreado separadamente da infraestrutura de release, e não bloqueia nenhuma fase.

## Motion

Entrada de seção comedida — `Reveal` usado só no Hero, no diagrama de providers e nas imagens dos showcases, não em toda seção. Motion do conector de providers é fade-in por revelação; com reduced-motion o diagrama aparece montado imediatamente. Cleanup e comportamento de reduced-motion inalterados desde a Fase 01.

## Revisão responsiva manual

Verificado com uma passagem via Playwright contra o dev server (sem overflow horizontal detectado em nenhum breakpoint): classes 360×800, 390×844, 768×1024, 1280×800, 1440×900. Também verificado 360×800 em `/en/`, `/es/`, `/privacy/`, `/en/terms/` — sem overflow em nenhuma combinação de locale/página.

Sem screenshots ilegivelmente pequenos (as representações estilizadas são puramente abstratas, sem risco de legibilidade de texto), CTAs permanecem óbvios, nenhuma palavra órfã criada por `<br>` hardcoded (nenhum usado em toda a landing), footer permanece utilizável, semântica do roadmap permanece clara.

Nota: 768px (tablet) intencionalmente ainda mostra a navegação mobile (Sheet) — a navegação desktop entra em `lg` (1024px), seguindo a regra do `DESIGN_SYSTEM.md` de "tablet como transição, não um redesign separado".

## Critérios de aceite

A landing pode ser revisada como uma narrativa de produto completa mesmo antes de existir um APK público: o que é o Puriki (Hero + Providers), com quais provedores funciona (seção Providers, labels explícitos AniList/MyAnimeList), que Android é o alvo inicial (copy do Hero, benefícios e seção de download dizem "Android" explicitamente, sem afirmação de Play Store ou iOS), que o Puriki não substitui os provedores (destaque de Providers + resumo de privacidade + FAQ), e onde baixar assim que disponível (seção Download, estado honesto de "sem release" com CTA de acompanhar no GitHub).
