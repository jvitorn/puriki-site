import type { SiteContent } from "./types";

export const ptBR = {
  common: {
    brandName: "Puriki",
    skipLink: "Pular para o conteúdo",
  },
  seo: {
    home: {
      title: "Puriki — Sua lista de anime, do seu jeito",
      description:
        "Conecte AniList ou MyAnimeList e acompanhe seus animes em uma experiência simples, rápida e feita para Android.",
    },
    privacy: {
      title: "Privacidade — Puriki",
      description:
        "Como o Puriki lida com autenticação, cache local e dados ao conectar sua conta AniList ou MyAnimeList.",
    },
    terms: {
      title: "Termos de Uso — Puriki",
      description:
        "Condições de uso do Puriki, um projeto independente e de código aberto que se conecta a provedores de terceiros.",
    },
  },
  navigation: {
    items: [
      { label: "Recursos", anchor: "benefits" },
      { label: "Como funciona", anchor: "providers" },
      { label: "Open Source", anchor: "open-source" },
      { label: "Roadmap", anchor: "roadmap" },
    ],
    primaryNavLabel: "Navegação principal",
    mobileNavLabel: "Navegação móvel",
    githubLabel: "GitHub",
    downloadLabel: "Baixar",
    menuButtonLabel: "Abrir menu",
    menuTitle: "Menu",
    menuDescription: "Navegue pelas seções do Puriki.",
    languageLabel: "Idioma",
  },
  hero: {
    eyebrow: "Puriki",
    headline: "Sua lista de anime, do seu jeito.",
    supporting:
      "Conecte AniList ou MyAnimeList e acompanhe seus animes em uma experiência simples, rápida e feita para Android.",
    primaryCta: "Baixar para Android",
    secondaryCta: "Ver no GitHub",
    trustLine: "AniList · MyAnimeList · Open Source · Sem anúncios",
  },
  providers: {
    eyebrow: "Como funciona",
    title: "Sua lista continua onde sempre esteve.",
    body: "AniList e MyAnimeList continuam sendo os provedores da sua lista. O Puriki se conecta ao serviço que você já utiliza e oferece uma experiência única para consultar e administrar seus animes.",
    highlight: "Você escolhe o provedor. O Puriki cuida da experiência.",
    anilistLabel: "AniList",
    malLabel: "MyAnimeList",
    puriklLabel: "Puriki",
  },
  benefits: {
    eyebrow: "Recursos",
    title: "O essencial para acompanhar sua lista.",
    items: [
      {
        title: "Sua lista, sempre à mão",
        body: "Acompanhe seu progresso, altere status e atualize suas notas diretamente pelo Puriki.",
      },
      {
        title: "Encontre o que assistir",
        body: "Pesquise animes, explore o catálogo e consulte informações antes de adicionar um novo título à sua lista.",
      },
      {
        title: "AniList ou MyAnimeList",
        body: "Conecte o provedor que você já utiliza. Se os dois estiverem conectados, escolha qual lista deseja administrar no momento.",
      },
      {
        title: "Mais confortável no dia a dia",
        body: "Uma experiência pensada para Android, com suporte a múltiplos idiomas e recursos locais que tornam o uso diário mais confortável.",
      },
    ],
  },
  showcases: {
    eyebrow: "Na prática",
    title: "O Puriki no seu dia a dia.",
    items: [
      {
        id: "list",
        title: "Acompanhe sem complicação",
        body: "Atualize episódios, status e notas usando a lista que você já mantém no seu provedor.",
      },
      {
        id: "discovery",
        title: "Do catálogo aos detalhes",
        body: "Pesquise títulos, descubra novos animes e consulte as informações que precisa antes de decidir o próximo da lista.",
      },
      {
        id: "details",
        title: "Informações quando você precisa",
        body: "Veja sinopse e detalhes de cada título direto na tela de informações, sem sair do fluxo da sua lista.",
      },
    ],
  },
  privacySummary: {
    eyebrow: "Privacidade",
    title: "Feito para respeitar seus dados",
    intro:
      "O Puriki não cria uma nova conta ou um novo serviço para armazenar sua lista. Ele se conecta aos provedores que você já utiliza e mantém localmente apenas os dados necessários para oferecer a experiência do aplicativo.",
    pillars: [
      {
        title: "Sem conta Puriki",
        body: "Use sua conta do AniList ou MyAnimeList.",
      },
      {
        title: "Local sempre que possível",
        body: "Preferências, cache e informações necessárias permanecem no dispositivo sempre que tecnicamente aplicável.",
      },
      {
        title: "Seu provedor continua sendo a fonte",
        body: "Sua lista continua no AniList ou MyAnimeList.",
      },
    ],
    support: "Sem um servidor Puriki mantendo uma cópia própria da sua lista.",
    cta: "Saiba mais sobre privacidade",
  },
  openSource: {
    eyebrow: "Open Source",
    title: "Aberto por natureza",
    body: "O Puriki é gratuito, sem anúncios e possui seu código aberto no GitHub. Você pode acompanhar o desenvolvimento, reportar problemas e contribuir com o projeto.",
    cta: "Ver projeto no GitHub",
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "O que vem depois",
    intro:
      "O Puriki continuará evoluindo sem perder o foco em uma experiência simples e segura para sua lista.",
    items: [
      {
        version: "1.0",
        title: "Foundation",
        status: "Em preparação",
        description: "A experiência principal do Puriki com AniList e MyAnimeList.",
      },
      {
        version: "2.0",
        title: "List Sync + novo visual",
        status: "Próximo",
        description:
          "Sincronize manualmente sua lista de um provedor para outro, com análise antes de qualquer alteração.",
        supporting:
          "Você escolhe a origem e o destino. O Puriki analisa as diferenças antes de aplicar alterações.",
      },
      {
        version: "3.0",
        title: "Multi-provider Sync",
        status: "Planejado",
        description:
          "Replica alterações futuras realizadas pelo Puriki entre os provedores conectados.",
      },
    ],
    disclaimer:
      "O roadmap representa a direção atual do projeto e pode evoluir durante o desenvolvimento.",
    cta: "Ver roadmap completo no GitHub",
  },
  download: {
    eyebrow: "Download",
    title: "Baixe o Puriki para Android",
    supportCopy: "Gratuito, open source e sem anúncios.",
    primaryCta: "Baixar para Android",
    originLine: "Download oficial através do GitHub Releases.",
    noRelease: {
      statusLabel: "Status do lançamento",
      message: "A primeira versão pública do Puriki ainda está em preparação.",
      cta: "Acompanhar no GitHub",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Perguntas frequentes",
    items: [
      {
        question: "Preciso de uma conta Puriki?",
        answer:
          "Não. O Puriki usa sua conta AniList ou MyAnimeList — não existe conta ou cadastro próprio do Puriki.",
      },
      {
        question: "Preciso conectar AniList e MyAnimeList ao mesmo tempo?",
        answer:
          "Não. Um provedor conectado já é suficiente. Se conectar os dois, você escolhe qual lista administrar no momento.",
      },
      {
        question: "O Puriki substitui AniList ou MyAnimeList?",
        answer:
          "Não. O Puriki é uma experiência que se conecta a esses provedores; sua lista continua sendo administrada por eles.",
      },
      {
        question: "O Puriki sincroniza minha lista entre AniList e MyAnimeList?",
        answer:
          "Ainda não. Na versão 1.0 não há sincronização automática entre provedores; esse recurso está planejado para versões futuras.",
      },
      {
        question: "O Puriki está disponível na Google Play?",
        answer:
          "Não no momento. O download oficial é feito diretamente pelo GitHub Releases.",
      },
      {
        question: "Como verifico se o APK é oficial?",
        answer:
          "Baixe sempre a partir deste site ou do repositório oficial do Puriki no GitHub, nunca de fontes de terceiros.",
      },
      {
        question: "Como atualizo o Puriki?",
        answer:
          "Baixe a versão mais recente disponível nas releases oficiais e instale sobre a versão atual.",
      },
      {
        question: "Existe versão para iOS?",
        answer:
          "Não é uma prioridade atual do projeto. O foco de momento é a experiência Android.",
      },
    ],
  },
  footer: {
    tagline:
      "Uma experiência Android independente para acompanhar sua lista de anime.",
    disclaimer:
      "Puriki é um projeto independente e não oficial. Não possui afiliação com AniList ou MyAnimeList.",
    copyright: "© 2026 Puriki",
    columns: [
      {
        title: "Produto",
        links: [
          { label: "Recursos", target: { kind: "anchor", anchor: "benefits" } },
          { label: "Como funciona", target: { kind: "anchor", anchor: "providers" } },
          { label: "Roadmap", target: { kind: "anchor", anchor: "roadmap" } },
          { label: "Baixar", target: { kind: "anchor", anchor: "download" } },
        ],
      },
      {
        title: "Projeto",
        links: [
          {
            label: "GitHub",
            target: { kind: "external", href: "https://github.com/jvitorn/purikuki" },
          },
          {
            label: "Releases",
            target: {
              kind: "external",
              href: "https://github.com/jvitorn/purikuki/releases",
            },
          },
          {
            label: "Issues",
            target: {
              kind: "external",
              href: "https://github.com/jvitorn/purikuki/issues",
            },
          },
        ],
      },
    ],
    legal: {
      title: "Legal",
      privacyLabel: "Privacidade",
      termsLabel: "Termos de Uso",
    },
  },
  privacyPage: {
    title: "Privacidade",
    preparationNotice:
      "Conteúdo estrutural em preparação. A versão jurídica definitiva será publicada na Fase 05.",
    intro:
      "Esta página resume como o Puriki lida com autenticação, cache local e comunicação com provedores. Ela ainda não é o texto legal final.",
    sections: [
      {
        heading: "Sem conta Puriki",
        body: "O Puriki não cria uma conta própria. O acesso é feito através da sua conta AniList ou MyAnimeList.",
      },
      {
        heading: "Autenticação com provedores",
        body: "A autenticação é feita diretamente com o provedor escolhido, seguindo o fluxo oficial de autorização de cada serviço.",
      },
      {
        heading: "Armazenamento local de tokens",
        body: "Tokens de acesso são armazenados localmente no dispositivo, usando mecanismos seguros disponíveis na plataforma.",
      },
      {
        heading: "Cache e preferências locais",
        body: "Preferências e dados de cache necessários para o funcionamento do aplicativo permanecem no dispositivo sempre que tecnicamente aplicável.",
      },
      {
        heading: "Comunicação com APIs dos provedores",
        body: "O Puriki se comunica diretamente com as APIs do AniList e do MyAnimeList para ler e atualizar sua lista.",
      },
      {
        heading: "Tradução local de sinopses",
        body: "Quando aplicável, a tradução de sinopses é processada no dispositivo, sujeita à confirmação da implementação final.",
      },
      {
        heading: "Exclusão e redefinição de dados locais",
        body: "É possível desconectar sua conta e limpar os dados locais armazenados pelo aplicativo a qualquer momento.",
      },
      {
        heading: "Nenhuma análise própria no lançamento",
        body: "O Puriki não utiliza ferramentas de analytics próprias no lançamento inicial.",
      },
      {
        heading: "Hospedagem deste site",
        body: "Este site é hospedado no GitHub Pages, que pode registrar dados de acesso conforme a infraestrutura da própria GitHub.",
      },
      {
        heading: "Serviços de terceiros",
        body: "O funcionamento do Puriki depende de serviços de terceiros, como AniList e MyAnimeList, que possuem suas próprias políticas de privacidade.",
      },
      {
        heading: "Atualizações desta política",
        body: "Esta página poderá ser atualizada conforme o projeto evolui. A versão final e completa é responsabilidade da Fase 05.",
      },
      {
        heading: "Contato",
        body: "Dúvidas sobre privacidade podem ser abertas como issue no repositório oficial do Puriki no GitHub.",
      },
    ],
  },
  termsPage: {
    title: "Termos de Uso",
    preparationNotice:
      "Conteúdo estrutural em preparação. A versão jurídica definitiva será publicada na Fase 05.",
    intro:
      "Esta página resume as condições de uso do Puriki. Ela ainda não é o texto legal final.",
    sections: [
      {
        heading: "Projeto independente e não oficial",
        body: "O Puriki não possui afiliação com AniList ou MyAnimeList e não representa esses serviços.",
      },
      {
        heading: "Dependência de provedores de terceiros",
        body: "O funcionamento do Puriki depende da disponibilidade das APIs do AniList e do MyAnimeList.",
      },
      {
        heading: "Sem garantia de disponibilidade dos provedores",
        body: "O Puriki não garante o funcionamento contínuo de serviços de terceiros que estejam fora do seu controle.",
      },
      {
        heading: "Uso responsável",
        body: "O aplicativo deve ser utilizado de forma responsável e em conformidade com os termos dos provedores conectados.",
      },
      {
        heading: "Natureza de código aberto",
        body: "O Puriki é um projeto de código aberto, disponível para consulta e contribuição no GitHub.",
      },
      {
        heading: "Disponibilidade do software",
        body: "O aplicativo é fornecido no estado em que se encontra, sem garantias formais de disponibilidade contínua.",
      },
      {
        heading: "Mudanças futuras",
        body: "Recursos, telas e funcionalidades podem mudar conforme o projeto evolui, incluindo os itens listados no roadmap.",
      },
      {
        heading: "Limitações de um projeto não comercial",
        body: "Por se tratar de um projeto de código aberto e não comercial, o suporte e as garantias oferecidas são limitados.",
      },
    ],
  },
} satisfies SiteContent;
