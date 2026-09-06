# Checklist Global — Puriki Site

> Checklist executivo. Detalhes e critérios de aceite estão nos arquivos de cada fase.
>
> Estados: `[x]` concluído · `[ ]` pendente · `N/A` deixou de se aplicar.

## Fase 00 — Fundação

- [x] Projeto React + TypeScript + Vite criado.
- [x] pnpm configurado e lockfile commitado.
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
- [x] Collapsible adicionado somente quando necessário.
- [x] Header responsivo criado.
- [x] Footer estrutural criado.
- [x] Mockup genérico de smartphone criado.
- [x] Utilitário pequeno para Anime.js com reduced motion.

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
- [ ] EN revisado por um falante fluente antes do lançamento.
- [ ] ES revisado por um falante fluente antes do lançamento.
- [x] Seletor de idioma acessível.
- [x] Troca de idioma preserva a página equivalente.
- [x] Sem redirecionamento automático forçado.
- [x] Metadados por página/idioma preparados.
- [x] Todas as rotas pré-renderizam.

## Fase 03 — Landing

- [x] Header final.
- [x] Hero.
- [x] H1 "Sua lista de anime, do seu jeito."
- [x] CTA "Baixar para Android".
- [x] CTA GitHub.
- [x] Seção AniList -> Puriki <- MyAnimeList.
- [x] Animação de conexão discreta.
- [x] Fallback sem movimento.
- [x] Quatro benefícios principais.
- [x] Showcase de lista.
- [x] Showcase de descoberta.
- [x] Showcase de detalhes/tradução (copy verificada contra o app real: Google ML Kit, Android, PT-BR/ES).
- [x] Seção de privacidade.
- [x] Seção Open Source.
- [x] Roadmap 1.0/2.0/3.0.
- [x] 2.0 marcada como futura.
- [x] 3.0 marcada como planejada.
- [x] Shell de Download.
- [x] Estado "primeira versão em preparação".
- [x] FAQ.
- [x] Footer.
- [x] Screenshots finais selecionados.
  - Decisão do projeto (Fase 04): os mockups estilizados (Hero e showcases) são a solução visual definitiva da landing — screenshots reais do app não são um requisito.
- [x] Alt texts revisados — presentes e localizados para todos os mockups.
- [x] Layout mobile revisado.
- [x] Layout desktop revisado.

## Fase 04 — Releases e APK

> Modelo single-APK original, substituído pela Fase 04R após a publicação pública da `v1.0.0` multi-ABI. Ver `PHASE_04_DOWNLOAD_RELEASES.md` e `PHASE_04R_MULTI_ABI_RELEASES.md`.

- [x] Script build-time de GitHub Release criado.
- [x] Última release estável usada.
- [x] Draft ignorado.
- [x] Prerelease ignorada para o CTA principal.
- N/A — asset único `puriki-{version}-android.apk`: substituído pelo contrato multi-artifact da Fase 04R.
- [x] Versão, data, tamanho, URL de download e URL da release capturados.
- N/A — SHA-256 capturado quando disponível: removido do contrato e da UX na Fase 04R; checksums permanecem só na GitHub Release.
- [x] Arquivo de metadados gerado.
- [x] Sem release gera `available: false`.
- [x] Falha técnica de API não é mascarada como "sem release".
- [x] Nenhum token vai para o bundle.
- [x] Download aponta diretamente para a GitHub Release.
- [x] Tamanho formatado e data localizada.
- N/A — disclosure de SHA expansível/copiável: `ShaDisclosure` removido na Fase 04R, sem UI de SHA na landing.
- [x] Instruções de instalação do APK.
- [x] Testes do parser de release (reescritos na Fase 04R para multi-ABI).
- [x] Teste stable vs. prerelease, teste sem release, teste de asset ausente/ambíguo.
- [x] `workflow_dispatch` disponível.
- [ ] Dispatch automático entre repositórios, quando `jvitorn/puriki` tiver seu próprio workflow de release.
  - `puriki-site` já declara `repository_dispatch: types: [puriki-release-published]` e sempre refaz seu próprio `release:fetch`, sem confiar em payload externo. Falta o repositório do app ganhar o workflow que envia esse dispatch — fora do escopo deste repositório.

## Fase 04R — Releases Multi-ABI

- [x] Modelo multi-artifact (`ReleaseAvailable.artifacts[]`).
- [x] ARM64 (`arm64-v8a`) obrigatório.
- [x] Universal obrigatório.
- [x] ARM32 (`armeabi-v7a`), x86_64 e x86 opcionais.
- [x] Parser multi-ABI (`parseGitHubRelease` reescrito).
- [x] Download ARM64 principal (CTA + card recomendado).
- [x] Universal destacado (segundo card, CTA próprio).
- [x] Outras versões (Collapsible, só renderiza variantes presentes).
- [x] "Qual versão devo baixar?" (Collapsible não técnico).
- [x] Sem detecção de ABI (confirmado — nenhum userAgent/UA-CH/heurística).
- [x] SHA removido da UX (`ShaDisclosure` deletado).
- [x] GitHub Release mantém detalhes técnicos (link "Ver notas da versão").
- [x] JSON-LD usa ARM64 (`getReleaseArtifact(release, "arm64-v8a")`).
- [x] Testes multi-ABI (parser, Download, JSON-LD, roadmap, axe).
- [x] Release real v1.0.0 validada (`pnpm release:fetch` ao vivo — 5 artifacts encontrados e classificados corretamente).

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
- [x] Zoom 200% revisado (Fase 07 — redimensionamento de viewport para a largura efetiva equivalente, em navegador real; sem overflow, menu mobile assume corretamente).
- [x] Contraste validado — calculado numericamente (fórmula WCAG) contra os tokens reais: texto/foco entre 5,3:1 e 18,5:1. `border`/`border-strong`/`brand`-como-fill ficam abaixo de 3:1 mas são decorativos, nunca o único indicador de limite de um elemento interativo público.
- [ ] Spot-check com leitor de tela real (NVDA/VoiceOver/TalkBack) — nenhum disponível neste ambiente.

### SEO

- [x] Title e description localizados.
- [x] Canonical correto.
- [x] hreflang pt-BR/en/es + x-default.
- [x] Open Graph.
- [x] Twitter/X card.
- [x] Imagem social.
- [x] JSON-LD de aplicativo.
- [x] sitemap.xml.
- [x] robots.txt.
- [x] favicon e apple-touch-icon.
- [x] Sem `noindex` acidental nas nove rotas públicas (404 tem `noindex` deliberado).

### Legal

- [x] Privacy PT-BR/EN/ES.
- [x] Terms PT-BR/EN/ES.
- [x] GitHub Pages mencionado adequadamente na Privacy.
- [x] Ausência de analytics descrita corretamente.
- [x] Relação com AniList/MAL descrita corretamente.
- [x] Disclaimer de projeto não oficial.
- [ ] Uso de logos de providers revisado — nenhum material oficial de branding disponível ainda; a landing usa só nomes em texto, sem logos.
- [ ] Texto legal revisado antes do lançamento — conteúdo é preciso e público, mas ainda não passou por revisão jurídica formal.

## Fase 06 — Testes, CI e Deploy

- [x] Testes de locale, rotas, release parser, Download, menu mobile, FAQ (suíte já existente, auditada e reaproveitada).
- [x] Testes de canonical/hreflang (lacuna real preenchida em `tests/i18n/metadata.test.ts`).
- [x] Validação forte de `ReleaseMetadata` gerado (`app/lib/releases/validate-release-metadata.ts`).
- [x] `getRequiredReleaseArtifact` substitui o `return null` silencioso em `download-section.tsx`.
- [x] Comentário desatualizado do baseline (`get-release-metadata.test.ts`) corrigido.
- [x] Validador de output estático (`scripts/validate-static-output.ts`).
- [x] `pnpm verify` e `pnpm validate:static` adicionados ao `package.json`.
- [x] CI em PR (`.github/workflows/quality.yml`) e em `main`.
- [x] `pnpm install --frozen-lockfile`, lint, typecheck e testes no CI.
- [x] Build no CI em estilo produção (`BASE_PATH=/puriki-site/`) e validação das rotas estáticas.
- [x] CI de PR não depende de `pnpm release:fetch`/API do GitHub (usa o baseline `available: false` versionado).
- [x] Workflow do GitHub Pages.
- [x] Deploy executa quality gates (`pnpm verify`) e `pnpm validate:static` antes de publicar.
- [ ] Pages configurado como fonte "GitHub Actions" em Settings — não verificável a partir do repositório; requer confirmação manual em Settings → Pages → Build and deployment → Source. A produção real já serve a landing React com dados da release real, o que só é possível se o workflow de deploy já for a origem da publicação — forte evidência funcional de que a configuração já está correta, mas isso continua sendo uma inferência, não uma confirmação direta da tela.
- [ ] Branch protection/ruleset exigindo o check `quality` em `main` — não verificável a partir do repositório; requer configuração manual em Settings → Branches (ou Rules → Rulesets). Nome exato do check: `quality`.
- [x] Deploy manual disponível (`workflow_dispatch`).
- [x] Concorrência de deploy controlada.
- [x] Base `/puriki-site/` validada e assets funcionam no project site (via `validate:static`).
- [x] Nenhum segredo no artefato publicado (scan automatizado por padrões de secret + ausência de APK/keystore/SHA256SUMS).
- N/A — Dependabot configurado: introduzido nesta fase, removido depois (Fase 07, correções) por decisão de simplificação do projeto; atualizações de dependência voltaram a ser manuais.
- [x] Revisão de performance do build documentada (sem budgets arbitrários).

## Fase 07 — Validação final e lançamento

- [x] Features descritas comparadas com o app real (`jvitorn/puriki`, versão pública v1.0.0): AniList/MAL OAuth, guest mode, catálogo, busca, detalhes, progresso/status/nota, tradução local de sinopse, idiomas, storage, ausência de conta própria/anúncios, MIT/open source, ausência de sync entre providers na 1.0. Nenhuma correção de conteúdo foi necessária.
- [x] Versão mínima do Android confirmada (`minSdkVersion` 24 / Android 7.0) — a landing não faz afirmação sobre isso, então não há risco de divergência.
- [x] Status do roadmap conferido — 1.0/2.0/3.0 corretos, nenhuma linguagem de pressão ("em breve") em nenhuma das três línguas.
- [x] Estado sem release e estado com release testados (`pnpm release:fetch` real + build de produção confirmam versão, JSON-LD, tamanhos e nomes de arquivo; baseline restaurado depois).
- [ ] Download real testado em aparelho Android físico (ARM64 e Universal) — não disponível neste ambiente.
- N/A — conferência de SHA: item obsoleto desde a Fase 04R, sem UI de SHA/checksum na landing.
- [x] Rotas diretas testadas em produção — nove rotas + 404 testadas com navegador real contra a produção: carregamento direto, refresh, navegação interna, troca de idioma, Back/Forward.
- [x] PT-BR revisado.
- [ ] EN revisado por um falante fluente — estrutura e ausência de erros óbvios verificadas; revisão de naturalidade não foi feita.
- [ ] ES revisado por um falante fluente — mesma situação do EN.
- [x] Mobile pequeno (320/360px), mobile comum (390/640px), tablet (768/820px) e desktop (1280/1440px) revisados, sem overflow.
- [x] Teclado revisado — testado com eventos reais em navegador real: skip link, menu mobile, Accordion do FAQ, Collapsible do Download.
- [x] Reduced motion revisado — zero elementos com opacidade abaixo de 0,99 após o carregamento, em navegador real.
- [x] Lighthouse usado como diagnóstico — rodado antes e depois do deploy desta fase contra a produção real: Performance 97, Accessibility 100, Best Practices 100, SEO 100 nas duas vezes; o audit `unsized-images` passou de 0,5 para 1,0 depois do deploy, confirmando a correção do logo ao vivo.
- [x] Links quebrados verificados — todos os links externos retornam HTTP 200, nenhum placeholder `href="#"`.
- [x] Metadados SEO verificados no HTML de produção real.
- [x] Privacy/Terms verificados.
- [x] Bundle verificado contra segredos (grep no código-fonte + `pnpm validate:static`, ambos limpos).
- [x] Sem scripts de tracking inesperados — inspeção de rede real na produção confirma que só `jvitorn.github.io` é contatado.
- [x] README revisado — nenhuma informação pública incorreta encontrada.
- [x] HTTPS funcionando.

## Pós-lançamento

- [x] Smoke test em navegador limpo.
- [x] Smoke test em contexto isolado sem armazenamento persistente (equivalente funcional a uma janela privada).
- [ ] Smoke test em Android real — só aproximado via viewport mobile em navegador desktop; não é o motor/engine real do Android.
- [x] Download oficial confirmado — links ARM64/Universal na produção apontam para os assets reais da release `v1.0.0`.
- [x] Layout novo do Download confirmado em produção depois do deploy — contêiner compartilhado, ARM64 com barra de destaque e badge "Recomendado", Universal secundário e CTAs em largura total, ao vivo.
- [x] Console sem erros críticos — zero erros ao carregar a produção real.
- [x] GitHub links confirmados.
- [x] Rotas aninhadas confirmadas — carregamento direto e refresh de `/en/privacy/` em produção.

## Fase 08 — Limpeza e consolidação

- [x] Documentação interna traduzida para PT-BR (fases, decisões, design system, índice).
- [x] Arquivos cuja função principal era instrução de execução removidos (`IMPLEMENTATION_PLAN.md`, `CONTENT_SPEC.md`); conteúdo de política de produto ainda relevante foi incorporado a `DECISIONS.md`.
- [x] `CHECKLIST-EN.md` removido; `CHECKLIST-PT-BR.md` passa a ser o checklist único.
- [x] Estados de checklist padronizados (`[x]`/`[ ]`/`N/A`); linguagem de aprovação/bloqueio removida.
- [x] Identificadores `PURIKUKI_*` renomeados para `PURIKI_*` (código, imports, conteúdo).
- [x] Sandbox `/foundation/` removido (rota, componente, prerender, referências em SEO e static validator).
- [x] Comentários com linguagem operacional de agente revisados e removidos onde encontrados.
- [x] Descrições dos steps e comentários dos workflows traduzidos para PT-BR.
- [x] `pnpm verify`, `pnpm build`, `pnpm validate:static` e a release real seguem funcionando após a limpeza.

## Domínio futuro

Quando houver domínio próprio:

- [ ] Domínio adquirido/confirmado.
- [ ] GitHub Pages configurado.
- [ ] DNS configurado.
- [ ] HTTPS confirmado.
- [ ] Domínio verificado no GitHub quando aplicável.
- [ ] `SITE_URL` atualizado.
- [ ] `BASE_PATH=/`.
- [ ] Canonical, hreflang, sitemap, Open Graph e rotas diretas revisados.
