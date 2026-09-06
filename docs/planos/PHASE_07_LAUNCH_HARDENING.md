# Fase 07 — Validação Final e Preparação para Lançamento

## Objetivo

Validar o Puriki Site como uma landing pública real: página de apresentação
do Puriki e superfície oficial de download dos seus APKs. CI verde não é
suficiente por si só — esta fase combina auditoria de conteúdo, revisão
visual, validação da release real, checagem de rotas em produção,
responsividade, acessibilidade, performance, SEO, links, legal/privacidade
e segurança, terminando com um veredito objetivo de prontidão para
lançamento.

O Puriki v1.0.0 já é uma release pública estável distribuída via GitHub
Releases; esta fase valida esse estado real, não um cenário hipotético de
"antes do primeiro lançamento".

### Cronologia da validação em produção

Esta fase gerou código novo (refinamento visual do Download, correção de
`width`/`height` no logo) e também validou produção real. Como esse código
só chega ao site publicado depois que a branch é mergeada em `main` e o
workflow `Deploy to GitHub Pages` roda, existem duas rodadas distintas de
verificação, registradas separadamente abaixo para não misturar as duas:

1. **Verificações de infraestrutura, feitas contra a produção ainda
   rodando o código da Fase 06** (antes do merge desta fase) — a suspeita
   de publicação via Jekyll, rotas públicas, 404, sitemap/robots, SEO
   (canonical/hreflang/OG/JSON-LD), ausência de tracker/segredo e console
   limpo. Nenhuma dessas checagens depende do código específico desta
   fase (Download/logo), então continuam válidas mesmo tendo sido feitas
   antes do deploy — são sobre o mecanismo de publicação e sobre conteúdo
   que já existia.
2. **Verificação pós-deploy, feita depois que o commit da Fase 07 foi
   mergeado em `main` e publicado de fato** — especificamente a
   confirmação visual do novo layout do Download e a correção do logo,
   ambas comprovadas diretamente no HTML e no Lighthouse rodados contra a
   produção já atualizada (ver as seções correspondentes abaixo, cada uma
   já registrando isso explicitamente).

## Auditoria de conteúdo

Cada afirmação da landing foi comparada com a implementação real do app
(repositório `jvitorn/puriki`, versão pública auditada v1.0.0, checkout
local da branch `master` usado como fonte de verdade — `jvitorn/purikuki`
é o nome antigo do mesmo repositório antes de um rename no GitHub; a URL
antiga ainda redireciona, mas `jvitorn/puriki` é o nome atual e é o que a
landing já usa em `PURIKUKI_REPO_URL`): autenticação AniList (OAuth real),
autenticação MyAnimeList (OAuth com PKCE), modo guest (catálogo e busca funcionam sem
conta conectada), catálogo, busca, tela de detalhes, atualização de
progresso/status/nota (todas sincronizam de volta ao provedor real, não
apenas localmente), tradução local de sinopse (Google ML Kit on-device,
Android-only, limitada a PT-BR e ES — inglês não é traduzido), idiomas da
UI do app (en/pt-BR/es), versão mínima do Android, armazenamento local
(tokens em secure storage, preferências/cache em armazenamento comum),
ausência de conta própria do Puriki, ausência de anúncios, código-fonte
aberto sob licença MIT, ausência de sincronização entre AniList e
MyAnimeList na 1.0 (List Sync é 2.0, ainda não lançada), ausência de app
para iOS e ausência de distribuição pela Google Play.

Resultado: nenhuma correção de conteúdo foi necessária. Toda afirmação
pública já está alinhada com o comportamento real do app — trabalho já
consolidado nas Fases 03, 04R e 05. Merece registro específico o ponto que
motivou a checagem mais cuidadosa desta fase: a landing já descreve
corretamente a atualização de nota/pontuação como suportada, e essa
funcionalidade de fato existe e sincroniza com o provedor conectado — não
era uma lacuna, como se poderia supor antes de checar o código.

A relação entre os providers e o Puriki (`AniList → Puriki ← MyAnimeList`)
já é apresentada corretamente como "você escolhe um provedor por vez", sem
qualquer linguagem que sugira sincronização automática entre eles. O FAQ já
responde diretamente "O Puriki sincroniza minha lista entre AniList e
MyAnimeList?" com "Ainda não... esse recurso está planejado para versões
futuras" — consistente com o roadmap, que mantém List Sync inteiramente
sob 2.0.

## Roadmap

- 1.0 (Foundation): o texto estático usado como fallback (`available:
  false`) mostra "Em preparação"; assim que uma release real existe, o
  mesmo componente mostra "Disponível" — comportamento confirmado tanto em
  testes quanto na produção real publicada (ver seção de produção abaixo).
- 2.0 (List Sync + novo visual) e 3.0 (Multi-provider Sync): claramente
  descritos como futuro/planejado, sem datas, sem porcentagens, sem
  linguagem de pressão ("em breve", "coming soon"). Nenhuma dessas
  expressões foi encontrada em nenhuma das três línguas.
- Nenhuma promessa oculta de feature futura foi encontrada em Hero, FAQ ou
  outras seções.

## Refinamento visual da seção Download

A seção de Download foi reorganizada para reforçar a hierarquia "escolha a
versão certa" sem introduzir estética de pricing page:

- ARM64 e Universal agora vivem dentro de um contêiner compartilhado (borda
  arredondada externa, cabeçalho com versão/data/plataforma organizados
  uma única vez, sem repetir esses dados dentro de cada card) — os dois
  cards passam a se ler como uma única decisão guiada, não dois blocos
  soltos.
- O card ARM64 ganhou uma barra de destaque superior na cor da marca, ícone
  com o mesmo tom, e superfície elevada, além do badge textual
  "Recomendado" já existente — o destaque nunca depende só de cor.
- O card Universal manteve o texto e a funcionalidade idênticos, apenas com
  menos ênfase visual (sem soar desabilitado).
- Os dois cards agora têm a mesma altura e alinham o botão de download na
  base, então o comprimento do texto de cada idioma não desalinha os CTAs.
- Os botões de download passaram a ocupar a largura total do card — mais
  fáceis de tocar no mobile, sem competir com o botão secundário do
  GitHub Release.
- Um ajuste real encontrado durante a revisão visual: o grid de dois
  cards usava o breakpoint `sm` (640px) do Tailwind, o que deixava os
  dois cards espremidos lado a lado em larguras entre ~640–767px (um
  tablet estreito ou um "zoom" de 200% num monitor comum caem exatamente
  nessa faixa), forçando o texto do botão principal a quebrar em duas
  linhas. Corrigido trocando para o breakpoint `md` (768px) — os cards só
  passam a ficar lado a lado quando há espaço real para isso.
- "Outras versões" e "Qual versão devo baixar?" foram preservados como
  áreas secundárias (Collapsible), com espaçamento ajustado para conviver
  bem com o novo contêiner acima. A linguagem amigável já existente
  ("Android antigo", "Emuladores") foi mantida.
- Nenhuma mudança no contrato de dados: `ReleaseMetadata`,
  `parseGitHubRelease`, artifacts obrigatórios/opcionais e
  `scripts/fetch-release.ts` continuam exatamente como a Fase 04R definiu.
- Um efeito colateral de performance identificado e corrigido nesta
  revisão: o logo do header/rodapé (`PurikiLogo`) não declarava `width`/
  `height` HTML no `<img>`, o que o Lighthouse aponta como risco de layout
  shift antes do CSS carregar. Adicionadas as dimensões intrínsecas do SVG
  (`app/components/brand/puriki-logo.tsx`) sem alterar o tamanho visual
  renderizado, que continua controlado pelas classes Tailwind.

Os testes existentes de `tests/sections/download-section.test.tsx` (12
testes, cobrindo ARM64 primário, Universal secundário, URLs corretas,
tamanhos, variantes opcionais, Collapsible e ausência de SHA) continuam
passando sem nenhuma alteração de asserção — eles já testavam semântica e
comportamento (role, texto, `href`), não classes CSS específicas, então o
refinamento visual não exigiu tocar nos testes.

### Confirmação pós-deploy

Depois que o commit desta fase foi mergeado em `main` e publicado pelo
workflow `Deploy to GitHub Pages`, a produção real
(`https://jvitorn.github.io/puriki-site/`) foi inspecionada de novo e
confirma o layout novo ao vivo: contêiner compartilhado com fundo
`bg-surface/60`, card ARM64 com a barra de destaque e o badge
"Recomendado", card Universal secundário, e os dois CTAs em largura
total — com os dados reais da release `v1.0.0` (61,1 MB / 168,1 MB,
publicado em 6 de setembro de 2026). Não é mais apenas o build local
verificado em `pnpm dev`/screenshot local descrito acima — é o HTML
efetivamente servido pelo GitHub Pages.

## Validação da release real

`pnpm release:fetch` contra a API pública do GitHub encontrou `v1.0.0` com
os cinco artifacts Android (`arm64-v8a`, `universal`, `armeabi-v7a`,
`x86_64`, `x86`), todos classificados corretamente. Um build de produção
com essa release real confirmou no HTML final: versão exibida `1.0.0`,
JSON-LD `SoftwareApplication` com `downloadUrl` apontando para o artifact
`arm64-v8a`, roadmap 1.0 mostrando "Disponível", cards ARM64 e Universal
com tamanhos reais (61,1 MB e 168,1 MB) e nomes de arquivo no formato
`puriki-v1.0.0-{variant}.apk`. Nenhuma versão foi hardcoded no código —
`app/generated/release.json` foi restaurado ao baseline versionado
`{ "available": false }` após a validação, como já era a política do
projeto desde a Fase 04.

## Estado real do GitHub Pages e do workflow de publicação

Havia uma suspeita registrada antes desta fase de que o GitHub Pages
pudesse estar publicando o repositório via Jekyll (renderizando o README
como página inicial) em vez de usar o build React/Vite. Essa hipótese foi
verificada diretamente contra a produção (checagem de infraestrutura feita
antes do deploy desta fase, ver "Cronologia da validação" acima — o
mecanismo de publicação em si não é algo que o código desta fase altera):

- `https://jvitorn.github.io/puriki-site/` responde com a landing React
  real (título, hero, seções, Download com dados da release real), não com
  um README renderizado.
- O JSON-LD da home em produção já carrega `"softwareVersion":"1.0.0"` e o
  `downloadUrl` do artifact `arm64-v8a` real — esse dado só existe porque
  `.github/workflows/deploy-pages.yml` rodou `pnpm release:fetch` antes do
  build, o que prova que a publicação atual veio desse workflow, não de um
  build Jekyll automático.
- `last-modified` do HTML publicado corresponde à data de execução mais
  recente do workflow, não a um cache antigo.

Ou seja: no estado atual, a publicação **já está correta** — GitHub Pages
está servindo o artifact gerado por `deploy-pages.yml`. A configuração
`Settings → Pages → Build and deployment → Source → GitHub Actions`
continua sendo algo que só pode ser confirmado diretamente na interface do
GitHub (o código não tem acesso a essa tela), mas o comportamento
observado na produção real é a evidência funcional mais forte possível de
que essa configuração já está correta. Fica registrado como confirmação
funcional, não como verificação direta da tela de configurações.

## Rotas em produção

Testado diretamente contra `https://jvitorn.github.io/puriki-site/` (não
apenas localhost), com um navegador real (Chromium via Playwright).
Checagem de infraestrutura feita antes do deploy desta fase (roteamento,
404 e SEO já existiam e não fazem parte do refinamento do Download/logo —
ver "Cronologia da validação"):

- As nove rotas públicas (`/`, `/privacy/`, `/terms/`, `/en/`,
  `/en/privacy/`, `/en/terms/`, `/es/`, `/es/privacy/`, `/es/terms/`)
  respondem HTTP 200 com o `<title>` e `lang` corretos para cada locale.
- Uma URL inexistente (`/puriki-site/nao-existe-xyz/`) responde HTTP 404
  com a página personalizada "Página não encontrada — Puriki", `noindex`
  presente, layout e navegação normais — não é o 404 genérico do GitHub.
- Carregamento direto de rota aninhada (`/en/privacy/`) e refresh na mesma
  URL: ambos HTTP 200 com o título correto — confirma que a
  pré-renderização estática funciona sem hack de SPA fallback.
- Navegação interna (clicar em "Terms of Use" a partir da home em inglês),
  Back e Forward do navegador: todos preservam a URL e o título esperados.
- Troca de idioma a partir de uma página interna (Terms em inglês → botão
  "Português") leva para `/terms/`, não para a home — confirma que a troca
  de idioma preserva a página equivalente, não apenas a home.
- `sitemap.xml` em produção contém exatamente as nove URLs públicas
  (nenhuma referência a `/foundation/` ou `/404`); `robots.txt` permite
  indexação e referencia o sitemap absoluto.
- `/foundation/` responde 200 com `noindex` presente e não aparece no
  sitemap — nada foi removido nesta fase, conforme escopo (isso é reservado
  para a Fase 08).

## Responsividade

Revisão visual real (Chromium, não apenas cálculo de reflow) em 320px,
360px, 640px, 768px, 820px (tablet) e 1440px (desktop), com foco na seção
Download recém-refinada: nenhuma largura testada apresentou overflow
horizontal (`scrollWidth` igual a `clientWidth` em todos os casos). Em
320px o botão principal do Download quebra em duas linhas — comportamento
cosmético menor, sem quebra de layout, sem texto cortado, sem sobreposição;
registrado aqui sem tratar como bloqueador. As demais seções (Header, Hero,
Providers, Benefits, Showcases, Privacy, Open Source, Roadmap, FAQ,
Footer, páginas de Privacy/Terms, 404) foram inspecionadas visualmente sem
problema aparente nas larguras testadas.

## Acessibilidade

Além da suíte automatizada existente (`vitest-axe`, zero violações em
Home/Privacy/Terms/Download em ambos os estados de release — inalterada
desde a Fase 05/06), esta fase executou verificações em um navegador real
(Chromium headless via Playwright), preenchendo lacunas que antes
dependiam só de simulação em jsdom:

- **Teclado**: skip link é o primeiro elemento focável e move o foco para
  `#main-content` ao ser ativado; o menu mobile abre com Enter e devolve o
  foco ao botão que o acionou ao fechar com Escape; o primeiro item do
  Accordion do FAQ alterna `aria-expanded` com Enter; o Collapsible "Qual
  versão devo baixar?" alterna `data-state` com Enter — todos confirmados
  com eventos de teclado reais em um motor de navegador real, não apenas
  disparados via testing-library.
- **Reduced motion**: com `prefers-reduced-motion: reduce` emulado, zero
  elementos ficaram com opacidade abaixo de 0,99 pouco depois do
  carregamento — nenhuma animação roda, conteúdo aparece imediatamente.
- **Zoom equivalente a 200%**: a propriedade CSS `zoom` não recalcula
  media queries do jeito que o zoom nativo do navegador recalcula (isso
  gerou um falso positivo de overflow na primeira tentativa desta
  verificação, descartado depois de investigado). O teste correto —
  redimensionar a viewport para a largura efetiva que um zoom real de 200%
  produziria — não encontrou overflow horizontal em Home, Privacy nem
  Home em inglês, e confirmou que o menu mobile assume corretamente no
  lugar da navegação desktop nessa largura. Ainda assim, isso continua
  sendo uma aproximação por redimensionamento de viewport, não um teste
  com o controle nativo de zoom de um navegador real — o mesmo nível de
  confiança que a Fase 05 já registrava para este item.
- **Leitor de tela real**: não executado. Nenhum leitor de tela (NVDA,
  VoiceOver, TalkBack) está disponível neste ambiente. Pendente: validação
  manual com leitor de tela real.
- **Contraste**: nenhuma mudança nova de fundo, borda ou texto foi
  introduzida no refinamento do Download que exigisse recálculo — os
  tokens usados (`brand`, `brand-soft`, `surface-raised`, `border-strong`)
  já foram auditados na Fase 05.

## Performance

`pnpm build` de produção (`BASE_PATH=/puriki-site/`,
`SITE_URL=https://jvitorn.github.io/puriki-site/`) mantém os números já
registrados na Fase 06 (JS ~608 KB, CSS ~36 KB, fontes ~84 KB, imagens/
assets ~72 KB, sem regressão de tamanho perceptível pelo refinamento visual
do Download).

Lighthouse foi executado duas vezes contra a URL de produção real
(`https://jvitorn.github.io/puriki-site/`), não apenas localhost — uma vez
antes do deploy desta fase (quando encontrou o problema do logo) e outra
vez depois, contra a produção já publicada com a correção:

| Categoria | Antes do deploy | Depois do deploy |
|---|---|---|
| Performance | 97 | 97 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Métricas centrais na execução pós-deploy: LCP 2,0s, CLS 0, TBT 90ms —
equivalentes à execução anterior, dentro da variação normal de uma medição
de rede real. A diferença que importa está no audit `unsized-images`
("Image elements do not have explicit width and height"): pontuava 0,5
antes do deploy (o logo do header sem `width`/`height`) e pontua 1,0 na
execução pós-deploy — confirmação direta e datada de que a correção
(`app/components/brand/puriki-logo.tsx`, ver seção de refinamento visual
acima) está de fato presente na produção publicada, não só no código local.
Nenhum outro ajuste foi feito para perseguir 100 artificialmente.

## Auditoria de links

Todos os links externos (`app/lib/external-links.ts`: repositório do app,
Releases, Issues, roadmap técnico, LICENSE) foram verificados diretamente
e retornam HTTP 200. Nenhum link `href="#"` de placeholder foi encontrado
em nenhuma seção. Os links internos de Privacy/Terms e a troca de idioma já
foram confirmados na seção de rotas em produção acima.

## Auditoria de SEO em produção

Inspecionado o HTML realmente publicado (não apenas o gerado localmente,
na mesma checagem de infraestrutura pré-deploy descrita em "Cronologia da
validação" — metadados de SEO não fazem parte do que esta fase mudou):
title e description localizados por página, canonical correto e sem
duplicação de `/puriki-site/`, hreflang completo (`pt-BR`/`en`/`es`/
`x-default`), Open Graph e Twitter Card completos, JSON-LD
`SoftwareApplication` presente só na Home e com dados reais da release,
`lang` correto por locale, `sitemap.xml` com exatamente as nove URLs,
`robots.txt` correto, favicon e apple-touch-icon carregando (HTTP 200).
Nenhum `noindex` acidental nas nove páginas públicas; `/foundation/` e a
página 404 mantêm `noindex` deliberado.

## Auditoria legal/privacidade

Reconferido contra o comportamento real do app e do site: a ausência de
analytics é verdadeira (nenhum host além de `jvitorn.github.io` é
contatado ao carregar a home em produção — confirmado via inspeção de
rede real, não suposição); a hospedagem no GitHub Pages está descrita
corretamente; o disclaimer de projeto independente/não oficial está
presente; Privacy e Terms continuam refletindo a arquitetura real
(secure storage para tokens, armazenamento comum para preferências/cache,
dependência de serviços de terceiros). Nenhuma reescrita jurídica ampla
foi feita — não havia necessidade encontrada. Pendente: revisão jurídica
formal/opcional do texto de Privacy e Terms, e revisão humana fluente das
traduções EN/ES — nenhuma das duas foi realizada nesta fase nem em
fases anteriores, e isso continua registrado como pendência real, não
como item concluído.

## Segurança

- Código-fonte: nenhum token, PAT, segredo de keystore/EAS ou variável
  `VITE_*` sensível encontrado. O único uso de uma variável `VITE_*` é
  `VITE_SITE_URL`, que é configuração pública, não segredo.
- Artefato de build: `pnpm validate:static` (que já varre o output em
  busca de `.apk`/keystore/`SHA256SUMS.txt` e padrões de texto como
  `ghp_`/`github_pat_`/nomes de variáveis de token) roda limpo tanto no
  baseline offline quanto no build com a release real.
- Produção real: inspeção de rede confirmou que carregar a home contata
  apenas `jvitorn.github.io` — nenhum tracker, nenhum script remoto,
  nenhuma chamada em runtime para a API do GitHub (a release continua
  sendo dado gerado em build-time). Console do navegador sem nenhum erro
  ao carregar a produção real.
- Dependabot estava configurado desde a Fase 06 (sem auto-merge) durante
  esta fase; nenhum upgrade de dependência foi feito diretamente nesta fase
  por não haver vulnerabilidade ou quebra real identificada — os upgrades
  que chegaram a ser mergeados vieram de PRs individuais do próprio
  Dependabot, revisados um a um. A configuração foi removida depois, na
  rodada de correções da Fase 07 (`PHASE_06_TESTING_CI_DEPLOY.md` tem o
  registro atualizado).

## Testes automatizados

`pnpm verify` (format:check, lint, typecheck, test): todos os gates
passam, **159 testes em 21 arquivos**, sem nenhuma alteração de asserção
exigida pelo refinamento visual do Download (os testes já protegiam
semântica/comportamento, não classes CSS). `pnpm build` e
`pnpm validate:static` passam tanto no baseline offline
(`available: false`) quanto no build de produção com a release real
`v1.0.0` — nesse segundo caso, a validação cobre a estrutura do output sem
nenhuma versão hardcoded no validador.

## Pendências manuais reais

Itens que dependem de hardware ou ferramenta humana e não puderam ser
executados neste ambiente:

- Teste de download real em um aparelho Android físico (ARM64 e
  Universal), incluindo a instalação de fato do APK.
- Spot-check com um leitor de tela real (NVDA, VoiceOver ou TalkBack).
- Revisão jurídica formal/opcional do texto de Privacy e Terms.
- Revisão humana fluente das traduções EN e ES (a estrutura e a ausência
  de erros óbvios foram checadas; uma revisão de naturalidade por um
  falante fluente de cada idioma não foi feita).
- Confirmação direta, na interface do GitHub, de que
  `Settings → Pages → Source` está configurado como `GitHub Actions` — o
  comportamento observado na produção real é uma evidência funcional forte
  disso, mas não substitui olhar a própria tela de configuração.
- Confirmação, também na interface do GitHub, de uma regra de proteção de
  branch em `main` exigindo o check `quality` antes de merge (já
  documentado como pendência desde a Fase 06).

## Resultado

**PRONTO PARA LANÇAMENTO.**

Nenhum bloqueador P0 ou P1 foi encontrado: a landing está publicada
corretamente pelo workflow certo (não Jekyll), as nove rotas públicas e o
404 funcionam em produção, o Download real (ARM64 e Universal) aponta para
os artifacts corretos da release `v1.0.0`, o conteúdo já é fiel ao app
real, o roadmap não faz promessas indevidas, SEO e dados estruturados estão
corretos em produção, não há segredo nem tracker no site publicado, e o
console de produção está limpo. O código desta própria fase (refinamento
visual do Download e correção do logo) já foi confirmado ao vivo na
produção publicada, não apenas localmente — ver "Confirmação pós-deploy" e
a tabela de Lighthouse pós-deploy. As pendências listadas acima são reais e
devem continuar sendo acompanhadas, mas nenhuma delas é um bloqueador
técnico de lançamento — são validações complementares (dispositivo físico,
leitor de tela real, revisão jurídica/humana formal) que não impedem o uso
público atual do site como página oficial de apresentação e download do
Puriki.
