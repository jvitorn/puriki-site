import {
  PURIKI_ISSUES_URL,
  PURIKI_RELEASES_URL,
  PURIKI_REPO_URL,
} from "../lib/external-links";
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
        "Condições de uso do Puriki, um projeto independente cujo código-fonte está disponível publicamente.",
    },
  },
  navigation: {
    items: [
      { label: "Recursos", anchor: "benefits" },
      { label: "Como funciona", anchor: "providers" },
      { label: "Código-fonte", anchor: "open-source" },
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
    trustLine: "AniList · MyAnimeList · Código no GitHub · Sem anúncios",
    mockupAlt: "Prévia da tela de lista do Puriki, com progresso de episódios",
  },
  providers: {
    eyebrow: "Como funciona",
    title: "Sua lista continua onde sempre esteve.",
    body: "AniList e MyAnimeList continuam sendo os provedores da sua lista. O Puriki se conecta ao serviço que você já utiliza e oferece uma experiência única para consultar e administrar seus animes.",
    highlight: "Você escolhe o provedor. O Puriki cuida da experiência.",
    anilistLabel: "AniList",
    malLabel: "MyAnimeList",
    purikiLabel: "Puriki",
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
        imageAlt: "Tela da minha lista no Puriki, com progresso por título",
      },
      {
        id: "discovery",
        title: "Do catálogo aos detalhes",
        body: "Pesquise títulos, descubra novos animes e consulte as informações que precisa antes de decidir o próximo da lista.",
        imageAlt: "Tela de busca e catálogo do Puriki",
      },
      {
        id: "details",
        title: "Informações quando você precisa",
        body: "Veja sinopse e detalhes de cada título direto na tela de informações. No Android, leitores em PT-BR e ES podem traduzir sinopses em inglês sob demanda com Google ML Kit no dispositivo.",
        imageAlt:
          "Tela de detalhes de um anime no Puriki, com sinopse traduzida",
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
    eyebrow: "Código-fonte",
    title: "Desenvolvido em público",
    body: "O Puriki é gratuito, sem anúncios e possui código-fonte disponível no GitHub. Você pode acompanhar o desenvolvimento, reportar problemas e revisar o projeto.",
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
        description:
          "A experiência principal do Puriki com AniList e MyAnimeList.",
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
    foundationAvailableStatus: "Disponível",
    disclaimer:
      "O roadmap representa a direção atual do projeto e pode evoluir durante o desenvolvimento.",
    cta: "Ver roadmap completo no GitHub",
  },
  download: {
    eyebrow: "Download",
    title: "Baixe o Puriki para Android",
    supportCopy: "Gratuito, com código-fonte disponível e sem anúncios.",
    primaryCta: "Baixar para Android",
    originLine: "Download oficial através do GitHub Releases.",
    current: {
      title: "Android atual",
      badge: "Recomendado",
      note: "ARM64",
      description:
        "Recomendado para a maioria dos celulares e tablets Android atuais.",
    },
    universal: {
      title: "Versão Universal",
      subtitle: "Não sabe qual escolher?",
      description:
        "Compatível com múltiplas arquiteturas. O arquivo é maior, mas é a opção mais simples quando você não sabe qual versão usar.",
      cta: "Baixar Universal",
    },
    otherVersions: {
      title: "Outras versões",
      armeabi_v7a: {
        title: "Android antigo",
        note: "ARM 32-bit",
        description: "Para alguns celulares e tablets Android mais antigos.",
        cta: "Baixar ARM 32-bit",
      },
      x86_64: {
        title: "Emuladores",
        note: "x86 64-bit",
        description:
          "Principalmente para emuladores e ambientes compatíveis com x86 de 64 bits.",
        cta: "Baixar x86_64",
      },
      x86: {
        title: "Emuladores",
        note: "x86 32-bit",
        description:
          "Para emuladores e ambientes x86 de 32 bits que ainda utilizam essa arquitetura.",
        cta: "Baixar x86",
      },
    },
    chooser: {
      title: "Qual versão devo baixar?",
      current: {
        title: "Android atual (ARM64)",
        body: "Escolha esta na maioria dos celulares e tablets Android modernos.",
      },
      universal: {
        title: "Universal",
        body: "Escolha esta se você não souber qual versão usar. O arquivo é maior, mas inclui suporte a múltiplas arquiteturas.",
      },
      arm32: {
        title: "Android antigo (ARM 32-bit)",
        body: "Voltada para alguns aparelhos Android mais antigos.",
      },
      x86: {
        title: "x86 / x86_64",
        body: "Principalmente para emuladores e ambientes específicos.",
      },
    },
    noRelease: {
      statusLabel: "Status do lançamento",
      message: "A primeira versão pública do Puriki ainda está em preparação.",
      cta: "Acompanhar no GitHub",
    },
    installHelp: {
      title: "Como instalar",
      steps: [
        "Baixe o arquivo oficial do Puriki.",
        "Abra a versão do APK escolhida no Android.",
        "Caso solicitado, permita a instalação a partir do navegador ou gerenciador de arquivos utilizado.",
        "Confirme a instalação.",
      ],
      safetyNote:
        "O Android pode exibir um aviso porque o aplicativo foi baixado fora da Google Play. Verifique sempre se o download veio deste site ou do repositório oficial do Puriki no GitHub.",
    },
    releaseLabels: {
      platformLabel: "Android · APK",
      publishedLabel: "Publicado em",
      latestLabel: "Última versão estável",
      releaseLinkLabel: "Ver notas da versão no GitHub",
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
        question:
          "O Puriki sincroniza minha lista entre AniList e MyAnimeList?",
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
          "Baixe sempre através deste site ou da release oficial do Puriki no GitHub, nunca de fontes de terceiros. Detalhes técnicos de integridade dos arquivos ficam disponíveis diretamente na release do GitHub.",
      },
      {
        question: "Como atualizo o Puriki?",
        answer:
          "Baixe a versão estável mais recente pela landing ou pelo GitHub Releases e instale o APK correspondente sobre a instalação atual.",
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
    licenseLabel: "Licenciado sob MIT",
    columns: [
      {
        title: "Produto",
        links: [
          { label: "Recursos", target: { kind: "anchor", anchor: "benefits" } },
          {
            label: "Como funciona",
            target: { kind: "anchor", anchor: "providers" },
          },
          { label: "Roadmap", target: { kind: "anchor", anchor: "roadmap" } },
          { label: "Baixar", target: { kind: "anchor", anchor: "download" } },
        ],
      },
      {
        title: "Projeto",
        links: [
          {
            label: "GitHub",
            target: { kind: "external", href: PURIKI_REPO_URL },
          },
          {
            label: "Releases",
            target: {
              kind: "external",
              href: PURIKI_RELEASES_URL,
            },
          },
          {
            label: "Issues",
            target: {
              kind: "external",
              href: PURIKI_ISSUES_URL,
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
    intro:
      "Esta política explica como o site do Puriki e o aplicativo Android lidam com dados. São dois contextos diferentes, descritos separadamente abaixo.",
    sections: [
      {
        heading: "Site e aplicativo",
        body: "Esta política cobre dois contextos diferentes: o site que você está lendo agora, que é estático e hospedado no GitHub Pages, e o aplicativo Puriki para Android. Cada um tem um comportamento de dados próprio.",
      },
      {
        heading: "Sem conta Puriki",
        body: "O Puriki não cria uma conta própria. O acesso ao aplicativo é feito através da sua conta existente no AniList ou no MyAnimeList.",
      },
      {
        heading: "Autenticação com provedores",
        body: "Ao conectar um provedor, você é direcionado ao fluxo oficial de autorização do AniList ou do MyAnimeList. O Puriki recebe apenas as credenciais necessárias para acessar sua lista, conforme as permissões concedidas nesse fluxo.",
      },
      {
        heading: "Armazenamento de credenciais",
        body: "Tokens de acesso são armazenados localmente no dispositivo usando o armazenamento seguro do sistema operacional (Expo SecureStore), separado por provedor.",
      },
      {
        heading: "Preferências e cache locais",
        body: "Outras informações, como idioma preferido, estado do onboarding, provedor principal selecionado e cache de tradução, podem ficar armazenadas localmente no dispositivo para que o aplicativo funcione corretamente.",
      },
      {
        heading: "Comunicação com APIs dos provedores",
        body: "O Puriki se comunica diretamente com as APIs do AniList e do MyAnimeList para ler e atualizar sua lista. Essa comunicação é necessária ao funcionamento do aplicativo; os dados da sua lista não ficam restritos apenas ao dispositivo.",
      },
      {
        heading: "Tradução local de sinopses",
        body: "Quando disponível para o seu idioma, a tradução de sinopses é processada no dispositivo Android usando componentes de tradução do Google ML Kit, sem enviar o texto a um servidor do Puriki.",
      },
      {
        heading: "Desconexão de um provedor",
        body: "Desconectar um provedor remove as credenciais locais associadas a ele. Outras preferências e dados de cache podem permanecer no dispositivo até serem substituídos pelo próprio aplicativo ou removidos pelo sistema.",
      },
      {
        heading: "Sem análise própria no lançamento",
        body: "O aplicativo Puriki não utiliza ferramentas de analytics, rastreamento ou relatório de falhas de terceiros no lançamento inicial.",
      },
      {
        heading: "Hospedagem deste site",
        body: "Este site é hospedado pelo GitHub Pages. O Puriki não utiliza analytics próprios nesta landing, mas o site está sujeito às práticas técnicas e de privacidade da infraestrutura do GitHub.",
      },
      {
        heading: "Serviços de terceiros",
        body: "O funcionamento do Puriki depende de serviços de terceiros — AniList, MyAnimeList e, no Android, componentes de tradução do Google ML Kit — cada um com sua própria política de privacidade.",
      },
      {
        heading: "Atualizações desta política",
        body: "Esta página pode ser atualizada conforme o projeto evolui. A data da última revisão está indicada no fim desta página.",
      },
      {
        heading: "Contato",
        body: "Dúvidas sobre privacidade podem ser abertas como issue no repositório oficial do Puriki no GitHub. Issues são públicas — nunca inclua tokens de acesso, senhas ou outras informações sensíveis nelas.",
      },
    ],
    lastUpdated: "2026-09-05",
    lastUpdatedLabel: "Última atualização",
  },
  termsPage: {
    title: "Termos de Uso",
    intro:
      "Estes termos definem as condições de uso do Puriki, um projeto independente cujo código-fonte está disponível publicamente.",
    sections: [
      {
        heading: "Projeto independente e não oficial",
        body: "O Puriki não possui afiliação com AniList ou MyAnimeList e não representa esses serviços.",
      },
      {
        heading: "Provedores são serviços de terceiros",
        body: "O funcionamento do Puriki depende das APIs do AniList e do MyAnimeList. Essas APIs pertencem a terceiros e podem mudar sem aviso prévio ao Puriki.",
      },
      {
        heading: "Disponibilidade dos provedores",
        body: "O Puriki não garante o funcionamento contínuo de serviços de terceiros. Uma indisponibilidade ou mudança em um provedor pode afetar temporária ou permanentemente funcionalidades do aplicativo.",
      },
      {
        heading: "Sua conta e responsabilidade de uso",
        body: "Você é responsável por manter suas credenciais seguras e por usar o Puriki em conformidade com os termos de uso do AniList e do MyAnimeList.",
      },
      {
        heading: "Disponibilidade do código-fonte",
        body: "O código-fonte do Puriki está disponível para consulta no GitHub. O repositório ainda não declara uma licença para o projeto como um todo, portanto a disponibilidade do código não concede por si só direitos de reutilização ou redistribuição.",
      },
      {
        heading: "Disponibilidade do software",
        body: 'O aplicativo é fornecido no estado em que se encontra ("as is"), sem garantias formais de disponibilidade contínua ou de ausência de erros.',
      },
      {
        heading: "Mudanças futuras",
        body: "Recursos, telas e funcionalidades podem mudar conforme o projeto evolui. O roadmap representa uma direção, não um compromisso: itens planejados podem ser alterados, adiados ou removidos.",
      },
      {
        heading: "Limitações de um projeto não comercial",
        body: "Por se tratar de um projeto gratuito e não comercial, o suporte, a manutenção e as garantias oferecidas são proporcionalmente limitados.",
      },
    ],
    lastUpdated: "2026-09-05",
    lastUpdatedLabel: "Última atualização",
  },
} satisfies SiteContent;
