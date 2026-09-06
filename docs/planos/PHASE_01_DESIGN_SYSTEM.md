# Fase 01 — Design System e Shell Compartilhado

## Objetivo

Construir a pequena fundação visual necessária para toda a landing, sem transformar o projeto em um design system genérico. Referência: `DESIGN_SYSTEM.md`.

## 1. Tokens semânticos globais

Implementados: background, surface, surface elevada, surface hover, border, border forte, foreground, foreground muted, foreground subtle, brand, brand hover, brand soft, brand foreground, success, warning, danger.

- [x] Componentes consomem tokens semânticos, nunca hex de marca cru.
- [x] Tokens funcionam em dark-only.
- [x] Combinações texto/fundo importantes atingem o contraste exigido.
- [x] O vermelho da marca permanece um acento, não o preenchimento dominante da página.

## 2. Tipografia

- [x] Geist adicionada e auto-hospedada (licença permite).
- [x] Fallbacks de sistema robustos.
- [x] Estilos de corpo, heading, label e código definidos.
- [x] Fallback de glifo japonês da marca funciona.
- [x] Sem contêineres de texto fixos que quebram a 200% de zoom.
- [x] Tipografia fluida do Hero definida com bom senso.

## 3. Reset/estilos base globais

- [x] Fundo escuro correto, defaults de text-rendering, zoom do navegador preservado, cor de seleção, `:focus-visible` global, estilo do skip-link, comportamento global de reduced-motion, offset de scroll para âncoras sob o header sticky.

## 4. Primitivas de layout

Criadas apenas as úteis: `Container`, `Section`, `SectionHeader` opcional. Composições responsivas seguem como classes Tailwind diretas — nenhum helper repetido o suficiente para justificar outra abstração. Evitada uma camada genérica de "Box/Flex/Stack" onde o Tailwind já resolve claramente.

## 5. Primitivas shadcn/ui

Instalados apenas: Button, Sheet, Accordion. Collapsible não foi adicionado nesta fase porque não havia disclosure concreta que precisasse dele ainda. Catálogo completo do shadcn não foi instalado — todos customizados para os tokens do Puriki em vez de deixar o padrão de template.

## 6. Layout compartilhado

**Header:** sticky, área de logo/wordmark, navegação desktop, menu mobile via Sheet, ação primária de Download, ação secundária GitHub, ponto de integração do seletor de idioma, foco de teclado visível, menu mobile fecha apropriadamente após navegação.

**Footer:** estrutural, pronto para conteúdo localizado, colunas Produto/Projeto/Legal, espaço para disclaimer do projeto, copyright e links do GitHub.

## 7. Primitivas visuais de produto

Componente genérico leve de dispositivo/mockup: moldura de smartphone genérica, sem marca Samsung/Pixel/iPhone, tratamento explícito de alt de imagem, dimensionamento responsivo, sem impor conteúdo fixo de screenshot.

## 8. Utilitário de motion

Camada pequena em torno do Anime.js: detecção central de reduced-motion, nenhuma animação obrigatória para visibilidade de conteúdo, cleanup no unmount, evita múltiplos listeners de scroll ad-hoc, prefere `IntersectionObserver` para o timing de entrada, API pública pequena. Nenhum framework de animação customizado foi construído.

## 9. Sandbox visual

Uma demonstração visual temporária, local a uma rota de desenvolvimento, foi adicionada para revisar tokens/primitivas (a rota `/foundation/` — removida no lançamento, ver Fase 08).

## Testes

- [x] Foco/interação do Button.
- [x] Comportamento de teclado do Sheet onde relevante.
- [x] Comportamento base do Accordion.
- [x] Comportamento do utilitário de reduced-motion.
- [x] O shell compartilhado renderiza sem erro de conteúdo de locale.

## Revisão manual

Desktop (1280px, 1440px) e mobile (~360px, ~390px, ~430px): sem overflow horizontal, foco visível, header permanece utilizável, tipografia não corta, 200% de zoom permanece navegável.

## Critérios de aceite

A fase está completa quando as seções finais podem ser construídas sem inventar padrões avulsos de espaçamento/cor/foco em cada seção.

## Registro de implementação

Paleta semântica final:

```text
background          #0B0E14
surface             #111522
surface-raised      #1A2030
surface-hover       #20273A
border              #252C3D
border-strong       #39445C
foreground          #F8FAFC
foreground-muted    #B6C0D1
foreground-subtle   #8994A8
brand               #970C10
brand-hover         #B31318
brand-soft          #321316
brand-foreground    #F8FAFC
success             #55C28B
warning             #F0B65B
danger              #F07175
```

Checagens de contraste representativas variaram de 5,66:1 a 18,46:1; a combinação do CTA de marca é 8,45:1. Geist Variable é auto-hospedada a partir do pacote `@fontsource-variable/geist` (licença OFL-1.1), com fallbacks compatíveis com japonês explícitos na pilha de fontes.

A revisão visual cobriu reflow em 320px (representativo da viewport CSS efetiva a 200% de zoom), 360px, 390px, 430px, 1280px e 1440px. Root, rota aninhada, CSS, JavaScript e assets de fonte carregaram corretamente sob `/puriki-site/` no preview de build de produção.

Uma infraestrutura mínima de deploy no GitHub Pages foi implementada intencionalmente já nesta fase, para permitir validação visual de cada fase seguinte — o hardening completo de CI/deploy ficou por conta da Fase 06.

O deploy publica `build/client`. O React Router exige o `basename` de produção para hidratação correta e emite o HTML pré-renderizado dentro do diretório do basename, então `scripts/prepare-static-output.mjs` normaliza esse HTML de volta para a raiz do artifact do Pages depois de cada build de produção. URLs de assets e o contexto do router mantêm `/puriki-site/`.
