# Checklist Global — Puriki Site (PT-BR)

> Checklist executivo. Os detalhes e critérios de aceite estão nos arquivos de cada fase.

## Fase 00 — Fundação

- [ ] Projeto React + TypeScript + Vite criado.
- [ ] pnpm configurado e lockfile commitado.
- [ ] React Router Framework Mode configurado.
- [ ] `ssr: false` configurado.
- [ ] Pré-renderização estática comprovada.
- [ ] Tailwind configurado.
- [ ] shadcn/ui inicializado sem instalar componentes desnecessários.
- [ ] Lucide React instalado.
- [ ] Anime.js instalado.
- [ ] Vitest + React Testing Library funcionando.
- [ ] ESLint configurado.
- [ ] Typecheck configurado.
- [ ] Scripts `dev`, `build`, `lint`, `typecheck`, `test` funcionando.
- [ ] `SITE_URL` e `BASE_PATH` configuráveis.
- [ ] Nenhum segredo exposto ao Vite.
- [ ] README raiz atualizado.

## Fase 01 — Design System

- [ ] Tokens semânticos criados.
- [ ] Tema inicial dark-only.
- [ ] Vermelho da marca usado por token, não hardcoded.
- [ ] Fonte Geist configurada.
- [ ] Foco visível global.
- [ ] Skip link preparado.
- [ ] Redução de movimento configurada.
- [ ] Container e Section criados.
- [ ] Button configurado.
- [ ] Sheet configurado.
- [ ] Accordion configurado.
- [ ] Collapsible adicionado somente se necessário.
- [ ] Header responsivo criado.
- [ ] Footer estrutural criado.
- [ ] Mockup genérico de smartphone criado.
- [ ] Utilitário pequeno para Anime.js com reduced motion.

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
- [ ] `pnpm install --frozen-lockfile`.
- [ ] Lint no CI.
- [ ] Typecheck no CI.
- [ ] Testes no CI.
- [ ] Build no CI.
- [ ] Validação das rotas estáticas.
- [ ] Workflow do GitHub Pages.
- [ ] Pages configurado para GitHub Actions.
- [ ] Deploy manual disponível.
- [ ] Concorrência de deploy controlada.
- [ ] Base `/puriki-site/` validada.
- [ ] Assets funcionam no project site.
- [ ] Nenhum segredo no artefato publicado.

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
