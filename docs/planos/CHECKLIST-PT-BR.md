# Checklist Global — Puriki Site (PT-BR)

> Checklist executivo. Os detalhes e critérios de aceite estão nos arquivos de cada fase.

## Fase 00 — Fundação

- [x] Projeto React + TypeScript + Vite criado.
- [-] pnpm configurado e lockfile commitado.
- [x] React Router Framework Mode configurado.
- [x] `ssr: false` configurado.
- [x] Pré-renderização estática comprovada.
- [x] Tailwind configurado.
- [x] shadcn/ui inicializado sem instalar componentes desnecessários.
- [x] Lucide React instalado.
- [x] Anime.js instalado.
- [x] Vitest + React Testing Library funcionando.
- [x] ESLint configurado.
- [x] Typecheck configurado.
- [x] Scripts `dev`, `build`, `lint`, `typecheck`, `test` funcionando.
- [x] `SITE_URL` e `BASE_PATH` configuráveis.
- [x] Nenhum segredo exposto ao Vite.
- [x] README raiz atualizado.

## Fase 01 — Design System

- [x] Tokens semânticos criados.
- [x] Tema inicial dark-only.
- [x] Vermelho da marca usado por token, não hardcoded.
- [x] Fonte Geist configurada.
- [x] Foco visível global.
- [x] Skip link preparado.
- [x] Redução de movimento configurada.
- [x] Container e Section criados.
- [x] Button configurado.
- [x] Sheet configurado.
- [x] Accordion configurado.
- [x] Collapsible adicionado somente se necessário.
- [x] Header responsivo criado.
- [x] Footer estrutural criado.
- [x] Mockup genérico de smartphone criado.
- [x] Utilitário pequeno para Anime.js com reduced motion.

Observação: Collapsible não foi adicionado porque ainda não existe uso concreto para ele.

## Fase 02 — Rotas, i18n e conteúdo

- [x] Locale `pt-BR`.
- [x] Locale `en`.
- [x] Locale `es`.
- [x] `/`.
- [x] `/privacy/`.
- [x] `/terms/`.
- [x] `/en/`.
- [x] `/en/privacy/`.
- [x] `/en/terms/`.
- [x] `/es/`.
- [x] `/es/privacy/`.
- [x] `/es/terms/`.
- [x] 404 criada.
- [x] Conteúdo tipado criado.
- [x] PT-BR implementado como conteúdo base.
- [x] EN completo.
- [x] ES completo.
- [ ] EN revisado humanamente antes do lançamento.
- [ ] ES revisado humanamente antes do lançamento.
- [x] Seletor de idioma acessível.
- [x] Troca de idioma preserva a página equivalente.
- [x] Sem redirecionamento automático forçado.
- [x] Metadados por página/idioma preparados.
- [x] Todas as rotas pré-renderizam.

Observação: a Home/Privacy/Terms desta fase são um scaffold de conteúdo e
rotas (estrutura semântica mínima + âncoras), não o design final da
landing — isso continua sendo escopo da Fase 03. Detalhes completos em
`PHASE_02_ROUTING_I18N_CONTENT.md`.

## Fase 03 — Landing

- [x] Header final.
- [x] Hero.
- [x] H1 “Sua lista de anime, do seu jeito.”
- [x] CTA “Baixar para Android”.
- [x] CTA GitHub.
- [x] Seção AniList -> Puriki <- MyAnimeList.
- [x] Animação de conexão discreta.
- [x] Fallback sem movimento.
- [x] Quatro benefícios principais.
- [x] Showcase de lista.
- [x] Showcase de descoberta.
- [x] Showcase de detalhes/tradução.
  - Copy da tradução (Google ML Kit, Android, PT-BR/ES) implementada e
    verificada.
- [x] Afirmações de tradução verificadas contra o app real.
- [x] Seção de privacidade.
- [x] Seção Open Source.
- [x] Roadmap 1.0/2.0/3.0.
- [x] 2.0 marcada como futura.
- [x] 3.0 marcada como planejada.
- [x] Shell de Download.
- [x] Estado “primeira versão em preparação”.
- [x] FAQ.
- [x] Footer.
- [x] Screenshots finais selecionados.
  - Decisão do maintainer (registrada na Fase 04): os mockups estilizados
    (Hero e showcases) são a solução visual definitiva da landing.
    Screenshots reais do app não são mais um requisito.
- [x] Screenshots otimizados.
  - N/A — não há arquivos de imagem a otimizar; os mockups são
    renderizados via markup/CSS (tokens do design system), não assets
    binários.
- [x] Alt texts revisados.
  - Alt text localizado presente para todos os mockups.
- [x] Layout mobile revisado.
- [x] Layout desktop revisado.

Observação: correção de nomenclatura `puriklLabel` -> `purikiLabel` e do
link do roadmap (`purikuki#roadmap` -> `PURIKI_PRODUCT_ENGINEERING_ROADMAP.md`)
feitas na Fase 03. Detalhes completos em `PHASE_03_LANDING_SECTIONS.md`.

## Fase 04 — Releases e APK

> Modelo single-APK original, superseded pela Fase 04R após a publicação
> pública da `v1.0.0` multi-ABI. Ver `PHASE_04_DOWNLOAD_RELEASES.md` e
> `PHASE_04R_MULTI_ABI_RELEASES.md`.

- [x] Script build-time de GitHub Release criado.
- [x] Última release estável usada.
- [x] Draft ignorado.
- [x] Prerelease ignorada para CTA principal.
- [-] ~~Asset `puriki-{version}-android.apk` localizado.~~
  - Superseded pela Fase 04R: o contrato agora localiza múltiplos
    artifacts (`puriki-v{version}-{variant}.apk`) em vez de um único APK.
- [x] Versão capturada.
- [x] Data capturada.
- [x] Tamanho capturado.
- [x] URL de download capturada.
- [x] URL da release capturada.
- [-] ~~SHA-256 capturado quando disponível.~~
  - Superseded pela Fase 04R: SHA-256 removido do contrato e da UX da
    landing; checksums permanecem apenas na GitHub Release.
- [x] Arquivo de metadados gerado.
- [x] Sem release gera `available: false`.
- [x] Falha técnica de API não é mascarada como “sem release”.
- [x] Nenhum token vai para o bundle.
- [x] Download aponta diretamente para GitHub Release.
- [x] Tamanho formatado.
- [x] Data localizada.
- [-] ~~SHA expansível.~~ / ~~Botão copiar SHA acessível.~~
  - Superseded pela Fase 04R: `ShaDisclosure` removido; sem UI de SHA na
    landing.
- [x] Instruções de APK adicionadas.
- [x] Testes do parser de release (reescritos na Fase 04R para multi-ABI).
- [x] Teste stable vs prerelease.
- [x] Teste sem release.
- [x] Teste asset ausente/ambíguo (agora required vs optional por variante).
- [x] `workflow_dispatch` disponível.
- [ ] Dispatch automático entre repositórios implementado quando o workflow do app estiver pronto.
  - Pendência externa deliberada: `puriki-site` já declara
    `repository_dispatch: types: [puriki-release-published]` no workflow e
    sempre refaz seu próprio `release:fetch` (não confia em payload
    externo). Falta apenas o `purikuki` ganhar seu workflow de release
    estável para enviar o dispatch — está fora do escopo deste repositório.

## Fase 04R — Multi-ABI Releases

- [x] Modelo multi-artifact (`ReleaseAvailable.artifacts[]`).
- [x] ARM64 (`arm64-v8a`) obrigatório.
- [x] Universal obrigatório.
- [x] ARM32 (`armeabi-v7a`) opcional.
- [x] x86_64 opcional.
- [x] x86 opcional.
- [x] Parser multi-ABI (`parseGitHubRelease` reescrito).
- [x] Download ARM64 principal (CTA + card recomendado).
- [x] Universal destacado (segundo card, CTA próprio).
- [x] Outras versões (Collapsible, só renderiza variantes presentes).
- [x] "Qual versão devo baixar?" (Collapsible não técnico).
- [x] Sem ABI detection (confirmado — nenhum userAgent/UA-CH/heurística).
- [x] SHA removido da UX (`ShaDisclosure` deletado).
- [x] GitHub Release mantém detalhes técnicos (link "Ver notas da versão").
- [x] JSON-LD usa ARM64 (`getReleaseArtifact(release, "arm64-v8a")`).
- [x] Testes multi-ABI (parser, Download section, JSON-LD, roadmap, axe).
- [x] Release real v1.0.0 validada (`pnpm release:fetch` ao vivo — 5
      artifacts encontrados e classificados corretamente).

## Fase 05 — Acessibilidade, SEO e Legal

### Acessibilidade
- [x] WCAG 2.2 AA usada como referência.
- [x] HTML semântico.
- [x] Apenas um H1 por página.
- [x] Hierarquia de headings correta.
- [x] Navegação completa por teclado.
- [x] Foco visível.
- [x] Sheet acessível.
- [x] FAQ acessível.
- [x] Sem conteúdo dependente de hover.
- [x] Estados não dependem só de cor.
- [x] Touch targets adequados.
- [x] `prefers-reduced-motion`.
- [-] Zoom 200% testado.
  - Aproximado via reflow em 320px (sem overflow em `/`, `/privacy/`,
    `/terms/`, `/en/`, `/es/privacy/`). Zoom literal do navegador a
    200% fica para a Fase 07.
- [x] Contraste validado.
  - Calculado numericamente (fórmula WCAG) contra os tokens reais.
    Texto/foco: 5.3–18.5:1. `border`/`border-strong`/`brand`-como-fill
    ficam abaixo de 3:1 mas são decorativos, nunca o único indicador de
    limite de um elemento interativo público (variante `outline` do
    Button só existe no sandbox `/foundation/`) — token preservado.
- [!] Screen reader spot-check.
  - Bloqueado: nenhum leitor de tela disponível neste ambiente.
    Pendência registrada para QA manual do maintainer.

### SEO
- [x] Title localizado.
- [x] Description localizada.
- [x] Canonical correto.
- [x] hreflang pt-BR/en/es.
- [x] x-default.
- [x] Open Graph.
- [x] Twitter/X card.
- [x] Imagem social.
- [x] JSON-LD de aplicativo.
- [x] sitemap.xml.
- [x] robots.txt.
- [x] favicon.
- [x] apple-touch-icon.
- [x] Sem `noindex` acidental.
  - Foundation e 404 têm `noindex` deliberado (não são conteúdo
    público); as nove rotas públicas não têm `noindex`.

### Legal
- [x] Privacy PT-BR.
- [x] Privacy EN.
- [x] Privacy ES.
- [x] Terms PT-BR.
- [x] Terms EN.
- [x] Terms ES.
- [x] GitHub Pages mencionado adequadamente na Privacy.
- [x] Ausência de analytics descrita corretamente.
- [x] Relação com AniList/MAL descrita corretamente.
- [x] Disclaimer de projeto não oficial.
- [!] Uso de logos de providers revisado.
  - Bloqueado: sem material oficial de branding revisado nesta fase.
    Continua usando apenas nomes em texto (sem logos), conforme já
    decidido nas Fases 02/03.
- [ ] Texto legal revisado antes do lançamento.
  - Conteúdo é preciso e público, mas não passou por revisão
    jurídica/humana formal — não marcar como concluído até essa revisão
    acontecer.

## Fase 06 — Testes, CI e Deploy

- [x] Testes de locale (já existiam — `tests/i18n/locale-content.test.ts`, `language-switcher.test.tsx`).
- [x] Testes de rotas (já existiam — `tests/i18n/routes.test.ts`; canonical/hreflang eram cobertos só manualmente na Fase 05).
- [x] Testes de release parser (já existiam, Fase 04R — `tests/releases/parse-github-release.test.ts`).
- [x] Testes de Download (já existiam, Fase 04R — `tests/sections/download-section.test.tsx`).
- [x] Testes do menu mobile (já existiam — `tests/shell.test.tsx`, Sheet open/close/Escape).
- [x] Testes de FAQ (já existiam — `tests/sections.test.tsx`, `locale-content.test.ts`).
- [x] Testes de canonical/hreflang (lacuna real — adicionados em `tests/i18n/metadata.test.ts` para `buildPageLinks`).
- [x] Validação forte de `ReleaseMetadata` gerado (nova — `app/lib/releases/validate-release-metadata.ts` + `tests/releases/validate-release-metadata.test.ts`).
- [x] `getRequiredReleaseArtifact` substitui o `return null` silencioso em `download-section.tsx` (`tests/releases/get-required-release-artifact.test.ts`).
- [x] Comentário stale do baseline (`get-release-metadata.test.ts`) corrigido.
- [x] Validador de output estático (novo — `scripts/validate-static-output.ts` + `tests/scripts/validate-static-output.test.ts`).
- [x] `pnpm verify` (format:check + lint + typecheck + test) e `pnpm validate:static` adicionados ao `package.json`.
- [x] CI em PR (`.github/workflows/quality.yml`, trigger `pull_request`/`push` para `main`).
- [x] CI em `main` (mesmo workflow, mais os quality gates dentro de `deploy-pages.yml`).
- [x] `pnpm install --frozen-lockfile`.
- [x] Lint no CI.
- [x] Typecheck no CI.
- [x] Testes no CI.
- [x] Build no CI (production-style, `BASE_PATH=/puriki-site/`).
- [x] Validação das rotas estáticas (`pnpm validate:static` no CI de PR e no deploy).
- [x] CI de PR não depende de `pnpm release:fetch`/GitHub API (usa o baseline `available: false` versionado).
- [x] Workflow do GitHub Pages.
- [x] Deploy executa quality gates (`pnpm verify`) antes de `release:fetch`/build/deploy.
- [x] Deploy executa `pnpm validate:static` antes de publicar.
- [!] Pages configurado para GitHub Actions.
  - Não verificável a partir do repositório — requer confirmação manual do
    maintainer em Settings → Pages → Build and deployment → Source →
    GitHub Actions. Ver `PHASE_06_TESTING_CI_DEPLOY.md`.
- [!] Branch protection/ruleset exigindo o check `quality` em `main`.
  - Não verificável a partir do repositório — requer configuração manual
    do maintainer em Settings → Branches (ou Rules → Rulesets). Nome exato
    do check: `quality` (job dentro do workflow `Quality`).
- [x] Deploy manual disponível (`workflow_dispatch`).
- [x] Concorrência de deploy controlada.
- [x] Base `/puriki-site/` validada (agora automaticamente, via `validate:static`).
- [x] Assets funcionam no project site (validado automaticamente).
- [x] Nenhum segredo no artefato publicado (validado automaticamente — scan por padrões de secret + ausência de APK/keystore/SHA256SUMS).
- [x] Dependabot configurado (`npm` + `github-actions`, semanal, sem auto-merge).
- [x] Revisão de performance do build documentada (sem budgets arbitrários).

> Minimal GitHub Pages deployment infrastructure was intentionally implemented during Phase 01 to allow visual validation of each subsequent phase. Full CI/deployment hardening was completed in Phase 06 (see `PHASE_06_TESTING_CI_DEPLOY.md` for the full report).

Os únicos itens ainda pendentes desta fase são de configuração manual do
GitHub (Pages Source e branch protection), marcados `[!]` acima — não
podem ser verificados nem aplicados a partir do código.

## Fase 07 — Lançamento

- [ ] Features descritas comparadas com a build real.
- [ ] min Android confirmado antes de publicar.
- [ ] Status do roadmap conferido.
- [ ] Estado sem release testado.
- [ ] Estado com release testado.
- [ ] Download real testado em Android.
- [ ] SHA conferido.
- [ ] Rotas diretas testadas em produção.
- [ ] PT-BR revisado.
- [ ] EN revisado.
- [ ] ES revisado.
- [ ] Mobile pequeno revisado.
- [ ] Mobile comum revisado.
- [ ] Tablet revisado.
- [ ] Desktop revisado.
- [ ] Teclado revisado.
- [ ] Reduced motion revisado.
- [ ] Zoom 200% revisado.
- [ ] Lighthouse usado como diagnóstico.
- [ ] Links quebrados verificados.
- [ ] Metadados SEO verificados no HTML final.
- [ ] Privacy/Terms verificados.
- [ ] Bundle verificado contra segredos.
- [ ] Sem scripts de tracking inesperados.
- [ ] README de manutenção atualizado.
- [ ] Checklist EN sincronizado.
- [ ] HTTPS funcionando.

## Pós-lançamento

- [ ] Smoke test em navegador limpo.
- [ ] Smoke test em janela privada.
- [ ] Smoke test em Android.
- [ ] Download oficial confirmado.
- [ ] Console sem erros críticos.
- [ ] GitHub Links confirmados.
- [ ] Rotas aninhadas confirmadas.

## Domínio futuro

Quando houver domínio próprio:

- [ ] Domínio adquirido/confirmado.
- [ ] GitHub Pages configurado.
- [ ] DNS configurado.
- [ ] HTTPS confirmado.
- [ ] Domínio verificado no GitHub quando aplicável.
- [ ] `SITE_URL` atualizado.
- [ ] `BASE_PATH=/`.
- [ ] Canonical revisado.
- [ ] hreflang revisado.
- [ ] sitemap revisado.
- [ ] Open Graph revisado.
- [ ] Rotas diretas revisadas.
