# Puriki Site — Decisões de Produto e Técnicas

Este arquivo registra decisões que não devem ser questionadas a cada nova mudança. É a fonte mais estável do repositório: quando uma dúvida de produto ou arquitetura surgir, a resposta provavelmente já está aqui.

## Propósito do produto

O Puriki Site é a landing page oficial e a superfície de download do aplicativo Android Puriki.

Ele deve:

- explicar o que é o Puriki;
- mostrar o produto visualmente;
- explicar a relação com AniList e MyAnimeList;
- comunicar os princípios de privacidade/local-first com precisão;
- apresentar apenas os recursos atuais como atuais, sem superestimar o futuro;
- expor o download oficial do APK Android;
- direcionar desenvolvedores e contribuidores ao GitHub;
- oferecer um roadmap compacto;
- oferecer Política de Privacidade e Termos de Uso.

Ele **não** deve se tornar:

- documentação técnica;
- um sistema de contas/dashboard;
- um backend de aplicação;
- um host de artefatos de release;
- um substituto do README, Issues, Releases ou do roadmap detalhado do GitHub.

## Posicionamento

Headline principal:

> Sua lista de anime, do seu jeito.

Ideia de apoio:

> Conecte AniList ou MyAnimeList e gerencie sua lista de anime através de uma experiência mais simples, focada em Android.

Filosofia central:

- AniList e MyAnimeList continuam sendo os provedores da lista.
- O Puriki é a camada de experiência/orquestração.
- O Puriki não se apresenta como um banco de dados substituto.
- Limitações dos provedores não podem ser escondidas atrás de afirmações enganosas.

## Funcionalidade atual vs. futura

### Puriki 1.0 — Foundation

Conteúdo que pode ser apresentado como atual:

- catálogo/home;
- busca;
- detalhes de anime;
- lista do usuário;
- autenticação AniList;
- autenticação MyAnimeList;
- leitura de lista;
- atualização de progresso;
- atualização de status;
- atualização de nota;
- seleção de provedor;
- fluxos guest/sem provedor, onde verificados;
- tradução local de sinopse no Android, onde verificada;
- cache/resiliência local;
- múltiplos idiomas.

### Puriki 2.0 — List Sync + novo visual

Roadmap apenas, até ser lançado.

List Sync é:

- manual;
- unidirecional;
- origem -> destino explícita;
- com análise antes de escrever;
- consciente de conflitos;
- projetada para evitar regressões;
- não destrutiva para títulos exclusivos do destino.

Não descrever como sincronização automática contínua.

### Puriki 3.0 — Multi-provider Sync

Roadmap apenas, até ser lançado.

Conceito: replicar, entre os provedores conectados, mudanças futuras feitas através do Puriki.

Não confundir com List Sync.

## Apresentação pública do roadmap

Apenas três itens de alto nível:

1. `1.0 — Foundation` — Atual / Disponível quando a primeira release pública existir
2. `2.0 — List Sync + novo visual` — Próximo
3. `3.0 — Multi-provider Sync` — Planejado

Regras:

- sem porcentagens;
- sem datas inventadas;
- não usar "em breve"/"coming soon" para prazos incertos;
- o roadmap detalhado fica no GitHub.

## CTA principal

Ação primária:

> Baixar para Android

O CTA do Hero rola até a seção Download em vez de baixar um binário imediatamente. O CTA final da seção Download é quem executa o download real do APK.

CTA secundário:

> Ver no GitHub

## Distribuição

Fluxo oficial do binário:

`puriki -> GitHub Release estável -> asset APK -> UI de download do puriki-site`

Regras:

- APKs nunca são commitados no `puriki-site`;
- o site não espelha nem faz proxy de APKs;
- o APK é baixado diretamente do asset da GitHub Release oficial;
- releases estáveis são o download público padrão;
- drafts e prereleases nunca substituem o CTA estável;
- o site precisa suportar um estado limpo de "primeira release pública ainda em preparação".

Convenção de nome de APK (atualizada pela Fase 04R depois que a release pública `v1.0.0` substituiu a suposição de APK único pela distribuição multi-ABI — ver `PHASE_04R_MULTI_ABI_RELEASES.md`):

`puriki-v{version}-{variant}.apk`, onde `{variant}` é um de `arm64-v8a`, `universal`, `armeabi-v7a`, `x86_64`, `x86`. `arm64-v8a` e `universal` são obrigatórios em toda release estável; os outros três são opcionais.

Exemplos:

- `puriki-v1.0.0-arm64-v8a.apk`
- `puriki-v1.0.0-universal.apk`

## Stack

Stack inicial travada:

- React
- TypeScript
- Vite
- React Router Framework Mode
- `ssr: false`
- pré-renderização estática de todas as rotas públicas
- Tailwind CSS
- shadcn/ui apenas para primitivas/interações justificadas
- Lucide React
- Anime.js
- Geist como fonte principal
- pnpm
- Vitest
- React Testing Library
- GitHub Actions
- GitHub Pages

Explicitamente não escolhidos:

- Next.js
- Astro
- Vercel
- backend/runtime de servidor
- banco de dados
- CMS
- dependência runtime da API do GitHub
- analytics no lançamento
- Google Analytics
- banner de cookies no lançamento

## Modelo de renderização

O site precisa ser implantável como arquivos estáticos.

As rotas públicas precisam ser pré-renderizadas em build time para que navegação direta e refresh funcionem no GitHub Pages sem hacks de SPA 404.

Sem URLs com HashRouter. Não distribuir rotas de idioma apenas como variantes de query-string.

## Idiomas

Idiomas iniciais:

- Português (Brasil) — padrão
- Inglês
- Espanhol

Modelo de URL:

- `/` — pt-BR
- `/privacy/`
- `/terms/`
- `/en/`
- `/en/privacy/`
- `/en/terms/`
- `/es/`
- `/es/privacy/`
- `/es/terms/`

Regras:

- sem redirecionamento forçado de idioma;
- a URL escolhida permanece autoritativa;
- uma preferência de idioma opcional pode ser guardada localmente;
- traduções são estáticas/editoriais, nunca tradução automática em runtime;
- todo metadado de SEO precisa ser localizado.

## Direção visual

- dark-only inicialmente;
- estética editorial/de produto escura;
- screenshots são a principal prova visual;
- o vermelho da marca é um token de design, nunca uma cor hardcoded no componente;
- usar um conjunto pequeno e controlado de superfícies;
- gradientes mínimos;
- sem glassmorphism como padrão geral;
- sem estética cyberpunk/neon/template de anime;
- elementos de marca japoneses são usados como elementos de marca, não papel de parede decorativo;
- os provedores não dominam visualmente o Puriki.

Direção de tokens (valores finais em `app/styles/app.css`, ver Fase 01):

- `#0B0E14` fundo base
- `#111522` / `#1A2030` superfícies elevadas
- `#293043` borda/superfície forte de referência
- `#970C10` marca atual
- `#D9474C` possível destaque de marca
- primeiro plano claro próximo de `#F8FAFC`

## Motion

Anime.js é polimento, não funcionalidade.

Permitido:

- fade/translate curtos de entrada;
- stagger comedido;
- transformações sutis de screenshot;
- animação de conector provider-para-Puriki;
- pequenos realces de hover.

Evitar:

- objetos flutuantes em loop;
- sistemas de partículas de fundo;
- efeitos mouse-follow;
- cenas 3D grandes;
- animação de hero letra-por-letra;
- animação obrigatória para entender o conteúdo.

`prefers-reduced-motion` é obrigatório.

## Acessibilidade

Meta: WCAG 2.2 AA.

Regras centrais:

- HTML semântico;
- um único `h1` significativo;
- hierarquia de headings correta;
- suporte a teclado;
- foco visível;
- skip link;
- nenhuma interação depende de hover;
- nenhum estado é comunicado só por cor;
- alvo de toque mínimo de ~44px para ações-chave;
- alt text útil nas imagens;
- HTML nativo antes de ARIA;
- reduced motion;
- sem bloqueio de zoom.

## Analytics e privacidade

Lançamento sem analytics de produto.

Não adicionar:

- GA4;
- pixels de rastreamento;
- analytics comportamental;
- SDKs de publicidade;
- rastreamento via cookies.

O site continua sujeito ao comportamento de infraestrutura/logging do GitHub Pages. O texto de privacidade nunca deve afirmar "o site não coleta nada" em sentido absoluto.

## Diretrizes de copy

Regras que valem para toda a copy pública (Hero, seções, FAQ, Privacy, Terms):

- nunca usar afirmações absolutas como "100% privado", "seus dados nunca saem do dispositivo" ou "totalmente seguro";
- nunca sugerir que o Puriki está disponível na Google Play ou tem versão para iOS — hoje a distribuição é só via GitHub Releases e o foco é Android;
- nunca descrever List Sync (2.0) como sincronização automática já disponível;
- o aviso de segurança de instalação do APK nunca deve instruir o usuário a "ignorar" um alerta do Android ou desabilitar globalmente uma proteção do sistema — apenas orientar a confirmar a origem do arquivo;
- Privacy e Terms devem refletir o comportamento real do app e do site (autenticação, cache/armazenamento local, dependência de serviços de terceiros, ausência de conta própria do Puriki, hospedagem no GitHub Pages, disclaimer de projeto independente/não oficial) — nunca inventar garantia jurídica não verificada.

## Domínio e hospedagem

Hospedagem inicial:

GitHub Pages project site em:

`https://jvitorn.github.io/puriki-site/`

O projeto precisa suportar um base path configurável.

Candidato a domínio próprio futuro: `puriki.app`. Não bloquear o lançamento por causa da aquisição do domínio.

Ao adotar um domínio próprio:

- configurar através do GitHub Pages;
- forçar HTTPS;
- atualizar `SITE_URL`;
- atualizar as URLs absolutas de canonical/hreflang/sitemap/Open Graph;
- verificar o domínio no GitHub quando aplicável;
- `BASE_PATH` passa a ser `/`.

## Fronteira entre os repositórios

`puriki-site` é dono de:

- apresentação;
- copy de marketing;
- conteúdo localizado;
- screenshots;
- Privacy/Terms;
- SEO;
- renderização dos metadados da GitHub Release;
- deploy no GitHub Pages.

`jvitorn/puriki` (nome atual do repositório do app; `purikuki` foi o nome anterior do mesmo repositório antes de um rename no GitHub) é dono de:

- código do aplicativo Android;
- Expo/EAS;
- assinatura Android;
- build do APK;
- criação da GitHub Release;
- release notes/changelog;
- credenciais do app;
- segredos da aplicação.

Nunca transferir segredos de assinatura/EAS do app para o `puriki-site`.
