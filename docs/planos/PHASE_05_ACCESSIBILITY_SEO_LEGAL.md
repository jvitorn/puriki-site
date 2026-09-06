# Fase 05 — Acessibilidade, SEO e Legal

> **Nota (adicionada pela Fase 04R, depois da release pública `v1.0.0`):** esta fase foi concluída enquanto `jvitorn/puriki` ainda não tinha release estável (`available: false`) e enquanto a seção Download ainda mostrava uma disclosure de SHA-256 com ação de copiar. Ambos ficaram desatualizados quando a `v1.0.0` foi publicada como release multi-ABI: a Fase 04R atualizou as suposições de estado de release e removeu a disclosure de SHA-256 da UI pública. O construtor de JSON-LD `SoftwareApplication` descrito abaixo não muda de forma — continua emitindo `softwareVersion`/`downloadUrl` só quando existe uma release estável — exceto que `downloadUrl` agora resolve através do artifact `arm64-v8a`. A derivação de estado do Roadmap (1.0 vira "Disponível") agora opera no estado real "lançado". O resto deste relatório (acessibilidade, estrutura de SEO, conteúdo de Privacy/Terms) permanece válido como registro histórico do que a Fase 05 verificou.

## Objetivo

Deixar o site pronto para uso público, compartilhamento, indexação e divulgação transparente.

## A. Acessibilidade

Meta: WCAG 2.2 AA.

### Estrutura

Um único `h1` significativo por página (verificado pela suíte axe e por testes de conteúdo/rotas em todos os locales); hierarquia H2/H3 lógica (Privacy/Terms usam `<h2>` reais por seção, cada uma dentro de `<section aria-labelledby>`); `header`/`nav`/`main`/`section`/`footer` semânticos; links são links, ações são botões; listas usam semântica de lista real (`Reveal` fica sempre dentro de cada `<li>`, nunca entre `<ul>/<ol>` e `<li>`, especificamente para não quebrar a semântica de lista); skip-to-content link verificado ponta a ponta em navegador real — é o primeiro Tab stop e move o foco para `#main-content`.

### Teclado

Testado com eventos de teclado reais em navegador Chromium: navegação do header (ordem de tab lógica, skip link primeiro); menu mobile (abre com Enter, prende o foco dentro do diálogo, fecha e devolve o foco ao botão que o acionou com Escape); seletor de idioma (links `<a>` reais); CTA de download (link/botão real); links do GitHub; FAQ (Enter no primeiro trigger do Accordion alterna `aria-expanded`); disclosure de instalação (Enter no Collapsible alterna `data-state`); disclosure de hash / botão de copiar (alcançável e ativável por teclado, status acessível anunciado via `role="status"`).

Foco visível global com contraste checado (6,7:1 / 5,7:1), sem trap de foco fora do Sheet intencional, Sheet devolve o foco apropriadamente, nenhum conteúdo depende só de hover.

### Contraste

Calculado programaticamente (fórmula de luminância relativa WCAG) contra os valores hex reais em `app/styles/app.css`: texto/foreground sobre background/surface entre 5,3:1 e 18,5:1; texto do botão de marca 6,6:1 / 8,5:1; danger/success/warning como texto 6,3:1 a 10,6:1; anel de foco 6,7:1 / 5,7:1 — todos passam.

`border`/`border-strong`/marca-como-preenchimento ficam entre 1,4:1 e 2,2:1, abaixo do limiar de 3:1 para contraste não-textual, mas isso não é uma violação prática do WCAG 1.4.11: são divisores/preenchimentos decorativos, nunca o único meio de perceber o limite de um elemento interativo público (todo CTA real tem rótulo de texto, alvo de toque adequado e o anel de foco de alto contraste; a variante `outline` do Button — o único caso onde uma borda de baixo contraste sozinha importaria — só é usada no sandbox não público `/foundation/`). Mantido como está para preservar a identidade escura/vermelha.

Status do roadmap não dependem só de cor — os textos ("Em preparação"/"Próximo"/"Planejado" e equivalentes) são a informação primária, cor é só um reforço.

### Imagens

Os mockups estilizados de Hero/showcase usam `role="img"` + `aria-label` localizado e conciso — são conteúdo, não decoração. Os SVGs de marca do header/footer usam `alt=""` + `aria-hidden="true"`, já que o link que os envolve já carrega o nome acessível "Puriki — página inicial". Nomes de provedor permanecem em texto real (`AniList`, `MyAnimeList`); nenhum logo de provedor é usado.

### Motion

`prefers-reduced-motion` respeitado — verificado em navegador real com `reducedMotion: "reduce"` emulado: zero elementos com `opacity < 0.99` logo após o carregamento (nenhuma animação roda). Nenhum movimento é necessário para revelar informação. Scroll suave reduzido/nenhum. Nenhum efeito pesado para o sistema vestibular — toda animação nova é um fade/translateY curto, opcionalmente escalonado, sem loops, sem parallax, sem bounce.

Nota técnica registrada aqui: a forma natural de escalonar os filhos `<li>` de uma lista com um único `IntersectionObserver` seria colocar o `Reveal` *ao redor* dos `<li>`s com `display:contents`. Isso foi tentado para o Roadmap e revertido — elementos `display:contents` não têm caixa, então o `IntersectionObserver` não consegue observá-los de forma confiável. `Reveal` ficou aninhado *dentro* de cada `<li>` em vez disso.

### Zoom/reflow

320px de largura CSS checado programaticamente em `/`, `/privacy/`, `/terms/`, `/en/`, `/es/privacy/`: zero overflow. Sem `user-scalable=no`/`maximum-scale=1` — o viewport meta é só `width=device-width, initial-scale=1`, pinch zoom não é afetado.

Zoom real de 200% e aumento de escala de texto foram aproximados via a checagem de reflow em 320px acima (reflow aproximadamente equivalente), não verificados como zoom literal do navegador em todo motor — revisão manual completa ficou como tarefa da Fase 07.

## B. SEO

Títulos/descrições localizados, canonical (`<link rel="canonical">` a partir de `SITE_URL` + o path da própria página, sem duplicação de `/puriki-site/puriki-site/`), hreflang completo (`pt-BR`/`en`/`es`/`x-default`, `x-default` apontando para o equivalente pt-BR; Privacy/Terms apontam para Privacy/Terms em cada locale, nunca para Home), Open Graph completo (imagem social language-neutral, mesmo fundo/logo/glow em todos os locales), Twitter/X Card (`twitter:site` omitido de propósito, sem conta oficial), JSON-LD `SoftwareApplication` (escolhido sobre `MobileApplication`, emitido só nas três Home) com apenas campos verdadeiros, sitemap (`scripts/generate-seo-files.ts`, nove URLs públicas, Foundation e 404 nunca incluídos), robots.txt (`Allow: /`, referencia o sitemap absoluto; limitação documentada: este `robots.txt` só governa o project site, não a raiz `jvitorn.github.io`), favicons (PNG 64×64 + apple touch icon 180×180 a partir do ícone oficial pré-composto).

Nenhum manifest de PWA foi adicionado — corretamente fora de escopo.

## C. Página de Privacidade

O aviso de "conteúdo em preparação" foi removido; todo conteúdo é real (PT-BR/EN/ES). Cada afirmação foi checada contra o código real do app, não assumida: distinção site/app; ausência de conta própria do Puriki; autenticação de provedor (fluxo OAuth oficial real); armazenamento de token corrigido para precisão (só tokens de auth passam por secure storage, por provedor); cache/preferências locais nomeando as categorias reais confirmadas no código; tradução local confirmada como um módulo nativo on-device (não uma chamada de rede), restrita a PT/ES; comportamento de reset/exclusão de dados corrigido para afirmar só o que existe de fato (desconectar um provedor remove as credenciais desse provedor; nenhuma ação geral de "limpar todos os dados locais" é afirmada, pois não existe no app); ausência de analytics própria confirmada por auditoria de dependências/código; hospedagem no GitHub Pages com o aviso necessário; serviços de terceiros listados sem nada hipotético; mudanças de política com data; caminho de contato via GitHub Issues com aviso de não postar tokens/senhas.

Nenhuma afirmação absoluta em lugar nenhum ("nunca sai do dispositivo", "100% privado", "não coletamos dados") — reforçado por um teste automatizado que varre o texto real das três locales por uma lista de padrões proibidos.

## D. Página de Termos

Status independente/não oficial + sem afiliação com AniList/MAL; dependência de API de provedor, enquadrada como serviços de terceiros que podem mudar sem aviso; limitações de disponibilidade de provedor; uso responsável (segurança de credenciais + conformidade com os termos do provedor); contexto de software open source; ausência de disponibilidade ininterrupta garantida ("como está"); features de roadmap podem mudar (linguagem explícita de "não é um compromisso"); linguagem de limitação proporcional a um projeto gratuito e não comercial; mesmo tratamento de data de atualização que Privacy.

**Não feito, deliberadamente:** o texto legal público final não recebeu revisão jurídica/humana — registrado como item aberto, não marcado como concluído.

## E. Revisão de branding de provedores

Não revisado, como já era na Fase 03: nenhuma orientação oficial de uso de marca da AniList/MyAnimeList foi revisada nesta fase (fora de escopo — nenhuma informação nova disponível). A landing continua usando só rótulos de texto, nunca logos, com o disclaimer de independência.

## F. Analytics

Confirmado: nenhum GA/GA4, pixel de rastreamento, SDK de publicidade ou cookie de analytics em nenhum lugar do `puriki-site`. Nenhum banner de cookie/consentimento foi adicionado — corretamente, já que o site não define nenhum cookie próprio.

## Checagens automatizadas e manuais

Automatizadas: axe (`vitest-axe`) smoke em Home (pt-BR), Privacy (en), Terms (es) e os dois estados de Download — zero violações detectadas (regra de contraste de cor desabilitada no jsdom, já que o jsdom não consegue pintar/computar estilos reais; contraste é coberto separadamente pela auditoria numérica acima); testes de presença de metadados (title/description/canonical/hreflang/OG/Twitter/JSON-LD); testes unitários de canonical/hreflang de rota.

Manuais (em navegador Chromium real, não só testes unitários): passagem só de teclado; passagem de reduced-motion; passagem de contraste (calculada, não estimada a olho).

**Screen reader — não realizado.** Nenhum leitor de tela disponível neste ambiente. Pendente: spot-check manual com um leitor de tela real; as checagens automatizadas do axe não substituem isso.

**Zoom 200% — parcial.** Aproximado via reflow em 320px; revisão literal de zoom do navegador fica para a Fase 07.

## Critérios de aceite

Nenhum bloqueador grave de acessibilidade foi encontrado (axe limpo; teclado, foco, contraste e reduced-motion todos verificados). As nove páginas públicas têm SEO localizado correto, verificado no HTML de produção real. Privacy/Terms correspondem à arquitetura real implantada, checados contra o código-fonte real do app. Revisão jurídica/humana de EN/ES e do texto legal — não feita, deixada aberta intencionalmente nos checklists.
