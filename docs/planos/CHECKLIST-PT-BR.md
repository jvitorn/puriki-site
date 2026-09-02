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

- [ ] Locale `pt-BR`.
- [ ] Locale `en`.
- [ ] Locale `es`.
- [ ] `/`.
- [ ] `/privacy/`.
- [ ] `/terms/`.
- [ ] `/en/`.
- [ ] `/en/privacy/`.
- [ ] `/en/terms/`.
- [ ] `/es/`.
- [ ] `/es/privacy/`.
- [ ] `/es/terms/`.
- [ ] 404 criada.
- [ ] Conteúdo tipado criado.
- [ ] PT-BR implementado como conteúdo base.
- [ ] EN completo.
- [ ] ES completo.
- [ ] EN revisado humanamente antes do lançamento.
- [ ] ES revisado humanamente antes do lançamento.
- [ ] Seletor de idioma acessível.
- [ ] Troca de idioma preserva a página equivalente.
- [ ] Sem redirecionamento automático forçado.
- [ ] Metadados por página/idioma preparados.
- [ ] Todas as rotas pré-renderizam.

## Fase 03 — Landing

- [ ] Header final.
- [ ] Hero.
- [ ] H1 “Sua lista de anime, do seu jeito.”
- [ ] CTA “Baixar para Android”.
- [ ] CTA GitHub.
- [ ] Seção AniList -> Puriki <- MyAnimeList.
- [ ] Animação de conexão discreta.
- [ ] Fallback sem movimento.
- [ ] Quatro benefícios principais.
- [ ] Showcase de lista.
- [ ] Showcase de descoberta.
- [ ] Showcase de detalhes/tradução.
- [ ] Afirmações de tradução verificadas contra o app real.
- [ ] Seção de privacidade.
- [ ] Seção Open Source.
- [ ] Roadmap 1.0/2.0/3.0.
- [ ] 2.0 marcada como futura.
- [ ] 3.0 marcada como planejada.
- [ ] Shell de Download.
- [ ] Estado “primeira versão em preparação”.
- [ ] FAQ.
- [ ] Footer.
- [ ] Screenshots finais selecionados.
- [ ] Screenshots otimizados.
- [ ] Alt texts revisados.
- [ ] Layout mobile revisado.
- [ ] Layout desktop revisado.

## Fase 04 — Releases e APK

- [ ] Script build-time de GitHub Release criado.
- [ ] Última release estável usada.
- [ ] Draft ignorado.
- [ ] Prerelease ignorada para CTA principal.
- [ ] Asset `puriki-{version}-android.apk` localizado.
- [ ] Versão capturada.
- [ ] Data capturada.
- [ ] Tamanho capturado.
- [ ] URL de download capturada.
- [ ] URL da release capturada.
- [ ] SHA-256 capturado quando disponível.
- [ ] Arquivo de metadados gerado.
- [ ] Sem release gera `available: false`.
- [ ] Falha técnica de API não é mascarada como “sem release”.
- [ ] Nenhum token vai para o bundle.
- [ ] Download aponta diretamente para GitHub Release.
- [ ] Tamanho formatado.
- [ ] Data localizada.
- [ ] SHA expansível.
- [ ] Botão copiar SHA acessível.
- [ ] Instruções de APK adicionadas.
- [ ] Testes do parser de release.
- [ ] Teste stable vs prerelease.
- [ ] Teste sem release.
- [ ] Teste asset ausente/ambíguo.
- [ ] `workflow_dispatch` disponível.
- [ ] Dispatch automático entre repositórios implementado quando o workflow do app estiver pronto.

## Fase 05 — Acessibilidade, SEO e Legal

### Acessibilidade
- [ ] WCAG 2.2 AA usada como referência.
- [ ] HTML semântico.
- [ ] Apenas um H1 por página.
- [ ] Hierarquia de headings correta.
- [ ] Navegação completa por teclado.
- [ ] Foco visível.
- [ ] Sheet acessível.
- [ ] FAQ acessível.
- [ ] Sem conteúdo dependente de hover.
- [ ] Estados não dependem só de cor.
- [ ] Touch targets adequados.
- [ ] `prefers-reduced-motion`.
- [ ] Zoom 200% testado.
- [ ] Contraste validado.
- [ ] Screen reader spot-check.

### SEO
- [ ] Title localizado.
- [ ] Description localizada.
- [ ] Canonical correto.
- [ ] hreflang pt-BR/en/es.
- [ ] x-default.
- [ ] Open Graph.
- [ ] Twitter/X card.
- [ ] Imagem social.
- [ ] JSON-LD de aplicativo.
- [ ] sitemap.xml.
- [ ] robots.txt.
- [ ] favicon.
- [ ] apple-touch-icon.
- [ ] Sem `noindex` acidental.

### Legal
- [ ] Privacy PT-BR.
- [ ] Privacy EN.
- [ ] Privacy ES.
- [ ] Terms PT-BR.
- [ ] Terms EN.
- [ ] Terms ES.
- [ ] GitHub Pages mencionado adequadamente na Privacy.
- [ ] Ausência de analytics descrita corretamente.
- [ ] Relação com AniList/MAL descrita corretamente.
- [ ] Disclaimer de projeto não oficial.
- [ ] Uso de logos de providers revisado.
- [ ] Texto legal revisado antes do lançamento.

## Fase 06 — Testes, CI e Deploy

- [ ] Testes de locale.
- [ ] Testes de rotas.
- [ ] Testes de release parser.
- [ ] Testes de Download.
- [ ] Testes do menu mobile.
- [ ] Testes de FAQ.
- [ ] Testes de canonical/hreflang.
- [ ] CI em PR.
- [ ] CI em `main`.
- [x] `pnpm install --frozen-lockfile`.
- [ ] Lint no CI.
- [ ] Typecheck no CI.
- [ ] Testes no CI.
- [x] Build no CI.
- [ ] Validação das rotas estáticas.
- [x] Workflow do GitHub Pages.
- [ ] Pages configurado para GitHub Actions.
- [x] Deploy manual disponível.
- [x] Concorrência de deploy controlada.
- [x] Base `/puriki-site/` validada.
- [x] Assets funcionam no project site.
- [x] Nenhum segredo no artefato publicado.

> Minimal GitHub Pages deployment infrastructure was intentionally implemented during Phase 01 to allow visual validation of each subsequent phase. Full CI/deployment hardening remains part of Phase 06.

O source do Pages ainda precisa ser selecionado manualmente como GitHub Actions nas configurações do repositório. Os gates completos de CI e as demais automações da Fase 06 continuam pendentes.

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
