import {
  PURIKUKI_ISSUES_URL,
  PURIKUKI_RELEASES_URL,
  PURIKUKI_REPO_URL,
} from "../lib/external-links";
import type { SiteContent } from "./types";

export const es = {
  common: {
    brandName: "Puriki",
    skipLink: "Saltar al contenido",
  },
  seo: {
    home: {
      title: "Puriki — Tu lista de anime, a tu manera",
      description:
        "Conecta AniList o MyAnimeList y gestiona tu lista de anime con una experiencia simple, rápida y pensada para Android.",
    },
    privacy: {
      title: "Privacidad — Puriki",
      description:
        "Cómo maneja Puriki la autenticación, la caché local y los datos al conectar tu cuenta de AniList o MyAnimeList.",
    },
    terms: {
      title: "Términos de Uso — Puriki",
      description:
        "Condiciones de uso de Puriki, un proyecto independiente y de código abierto que se conecta a proveedores externos.",
    },
  },
  navigation: {
    items: [
      { label: "Funciones", anchor: "benefits" },
      { label: "Cómo funciona", anchor: "providers" },
      { label: "Open Source", anchor: "open-source" },
      { label: "Roadmap", anchor: "roadmap" },
    ],
    primaryNavLabel: "Navegación principal",
    mobileNavLabel: "Navegación móvil",
    githubLabel: "GitHub",
    downloadLabel: "Descargar",
    menuButtonLabel: "Abrir menú",
    menuTitle: "Menú",
    menuDescription: "Explora las secciones de Puriki.",
    languageLabel: "Idioma",
  },
  hero: {
    eyebrow: "Puriki",
    headline: "Tu lista de anime, a tu manera.",
    supporting:
      "Conecta AniList o MyAnimeList y gestiona tu lista de anime con una experiencia simple, rápida y pensada para Android.",
    primaryCta: "Descargar para Android",
    secondaryCta: "Ver en GitHub",
    trustLine: "AniList · MyAnimeList · Open Source · Sin anuncios",
    mockupAlt: "Vista previa de la pantalla de lista de Puriki, con progreso de episodios",
  },
  providers: {
    eyebrow: "Cómo funciona",
    title: "Tu lista sigue donde siempre estuvo.",
    body: "AniList y MyAnimeList siguen siendo los proveedores de tu lista. Puriki se conecta al servicio que ya usas y ofrece una experiencia única para consultar y administrar tus animes.",
    highlight: "Tú eliges el proveedor. Puriki se encarga de la experiencia.",
    anilistLabel: "AniList",
    malLabel: "MyAnimeList",
    purikiLabel: "Puriki",
  },
  benefits: {
    eyebrow: "Funciones",
    title: "Lo esencial para seguir tu lista.",
    items: [
      {
        title: "Tu lista, siempre a mano",
        body: "Sigue tu progreso, cambia el estado y actualiza tus puntuaciones directamente desde Puriki.",
      },
      {
        title: "Encuentra qué ver",
        body: "Busca animes, explora el catálogo y consulta información antes de agregar un nuevo título a tu lista.",
      },
      {
        title: "AniList o MyAnimeList",
        body: "Conecta el proveedor que ya usas. Si conectas ambos, elige qué lista administrar en cada momento.",
      },
      {
        title: "Más cómodo en el día a día",
        body: "Una experiencia pensada para Android, con soporte para varios idiomas y funciones locales que hacen el uso diario más cómodo.",
      },
    ],
  },
  showcases: {
    eyebrow: "En la práctica",
    title: "Puriki en tu día a día.",
    items: [
      {
        id: "list",
        title: "Sigue tu lista sin complicaciones",
        body: "Actualiza episodios, estado y puntuaciones usando la lista que ya mantienes en tu proveedor.",
        imageAlt: "Pantalla de mi lista en Puriki, con progreso por título",
      },
      {
        id: "discovery",
        title: "Del catálogo a los detalles",
        body: "Busca títulos, descubre nuevos animes y consulta la información que necesitas antes de decidir el siguiente de tu lista.",
        imageAlt: "Pantalla de búsqueda y catálogo de Puriki",
      },
      {
        id: "details",
        title: "Información cuando la necesitas",
        body: "Consulta la sinopsis y los detalles de cada título en la pantalla de información. En Android, las sinopsis se traducen automáticamente en el dispositivo con Google ML Kit para lectores en portugués y español.",
        imageAlt: "Pantalla de detalles de un anime en Puriki, con sinopsis traducida",
      },
    ],
  },
  privacySummary: {
    eyebrow: "Privacidad",
    title: "Diseñado para respetar tus datos",
    intro:
      "Puriki no crea una nueva cuenta ni un nuevo servicio para almacenar tu lista. Se conecta a los proveedores que ya usas y mantiene localmente solo los datos necesarios para ofrecer la experiencia de la aplicación.",
    pillars: [
      {
        title: "Sin cuenta Puriki",
        body: "Usa tu cuenta de AniList o MyAnimeList.",
      },
      {
        title: "Local siempre que sea posible",
        body: "Las preferencias, la caché y la información necesaria permanecen en el dispositivo siempre que sea técnicamente posible.",
      },
      {
        title: "Tu proveedor sigue siendo la fuente",
        body: "Tu lista sigue estando en AniList o MyAnimeList.",
      },
    ],
    support: "Sin un servidor de Puriki que mantenga su propia copia de tu lista.",
    cta: "Conoce más sobre privacidad",
  },
  openSource: {
    eyebrow: "Open Source",
    title: "Abierto por naturaleza",
    body: "Puriki es gratuito, sin anuncios y tiene su código abierto en GitHub. Puedes seguir el desarrollo, reportar problemas y contribuir al proyecto.",
    cta: "Ver proyecto en GitHub",
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "Qué viene después",
    intro:
      "Puriki seguirá evolucionando sin perder el enfoque en una experiencia simple y segura para tu lista.",
    items: [
      {
        version: "1.0",
        title: "Foundation",
        status: "En preparación",
        description: "La experiencia principal de Puriki con AniList y MyAnimeList.",
      },
      {
        version: "2.0",
        title: "List Sync + nuevo visual",
        status: "Próximo",
        description:
          "Sincroniza manualmente tu lista de un proveedor a otro, con análisis antes de aplicar cualquier cambio.",
        supporting:
          "Tú eliges el origen y el destino. Puriki analiza las diferencias antes de aplicar los cambios.",
      },
      {
        version: "3.0",
        title: "Multi-provider Sync",
        status: "Planeado",
        description:
          "Replica los cambios futuros realizados en Puriki entre los proveedores conectados.",
      },
    ],
    disclaimer:
      "El roadmap representa la dirección actual del proyecto y puede evolucionar durante el desarrollo.",
    cta: "Ver el roadmap completo en GitHub",
  },
  download: {
    eyebrow: "Descarga",
    title: "Descarga Puriki para Android",
    supportCopy: "Gratuito, de código abierto y sin anuncios.",
    primaryCta: "Descargar para Android",
    originLine: "Descarga oficial a través de GitHub Releases.",
    noRelease: {
      statusLabel: "Estado del lanzamiento",
      message: "La primera versión pública de Puriki todavía está en preparación.",
      cta: "Seguir en GitHub",
    },
    installHelp: {
      title: "Cómo instalar",
      steps: [
        "Descarga el archivo oficial de Puriki.",
        "Abre el APK en tu dispositivo Android.",
        "Si se solicita, permite la instalación desde el navegador o gestor de archivos utilizado.",
        "Confirma la instalación.",
      ],
      safetyNote:
        "Android puede mostrar una advertencia porque la app se descargó fuera de Google Play. Verifica siempre que la descarga provenga de este sitio o del repositorio oficial de Puriki en GitHub.",
    },
    releaseLabels: {
      versionLabel: "Versión",
      platformLabel: "Android · APK",
      publishedLabel: "Publicado el",
      releaseLinkLabel: "Ver notas de la versión en GitHub",
      shaLabel: "SHA-256",
      copyLabel: "Copiar",
      copiedLabel: "Copiado",
    },
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Necesito una cuenta Puriki?",
        answer:
          "No. Puriki usa tu cuenta de AniList o MyAnimeList — no existe una cuenta ni un registro propio de Puriki.",
      },
      {
        question: "¿Necesito conectar AniList y MyAnimeList al mismo tiempo?",
        answer:
          "No. Con un proveedor conectado es suficiente. Si conectas ambos, eliges qué lista administrar en cada momento.",
      },
      {
        question: "¿Puriki reemplaza a AniList o MyAnimeList?",
        answer:
          "No. Puriki es una experiencia que se conecta a esos proveedores; tu lista sigue siendo administrada por ellos.",
      },
      {
        question: "¿Puriki sincroniza mi lista entre AniList y MyAnimeList?",
        answer:
          "Todavía no. En la versión 1.0 no hay sincronización automática entre proveedores; esa función está planeada para versiones futuras.",
      },
      {
        question: "¿Puriki está disponible en Google Play?",
        answer:
          "No por el momento. La descarga oficial se realiza directamente desde GitHub Releases.",
      },
      {
        question: "¿Cómo verifico que el APK es oficial?",
        answer:
          "Descárgalo siempre desde este sitio o desde el repositorio oficial de Puriki en GitHub, nunca desde fuentes de terceros.",
      },
      {
        question: "¿Cómo actualizo Puriki?",
        answer:
          "Descarga la versión más reciente disponible en las releases oficiales e instálala sobre la versión actual.",
      },
      {
        question: "¿Existe una versión para iOS?",
        answer:
          "No es una prioridad actual del proyecto. El enfoque actual es la experiencia en Android.",
      },
    ],
  },
  footer: {
    tagline:
      "Una experiencia independiente para Android para seguir tu lista de anime.",
    disclaimer:
      "Puriki es un proyecto independiente y no oficial. No tiene afiliación con AniList ni con MyAnimeList.",
    copyright: "© 2026 Puriki",
    columns: [
      {
        title: "Producto",
        links: [
          { label: "Funciones", target: { kind: "anchor", anchor: "benefits" } },
          { label: "Cómo funciona", target: { kind: "anchor", anchor: "providers" } },
          { label: "Roadmap", target: { kind: "anchor", anchor: "roadmap" } },
          { label: "Descargar", target: { kind: "anchor", anchor: "download" } },
        ],
      },
      {
        title: "Proyecto",
        links: [
          {
            label: "GitHub",
            target: { kind: "external", href: PURIKUKI_REPO_URL },
          },
          {
            label: "Releases",
            target: {
              kind: "external",
              href: PURIKUKI_RELEASES_URL,
            },
          },
          {
            label: "Issues",
            target: {
              kind: "external",
              href: PURIKUKI_ISSUES_URL,
            },
          },
        ],
      },
    ],
    legal: {
      title: "Legal",
      privacyLabel: "Privacidad",
      termsLabel: "Términos de Uso",
    },
  },
  privacyPage: {
    title: "Privacidad",
    preparationNotice:
      "Contenido estructural en preparación. La versión legal definitiva se publicará en la Fase 05.",
    intro:
      "Esta página resume cómo Puriki maneja la autenticación, la caché local y la comunicación con los proveedores. Todavía no es el texto legal final.",
    sections: [
      {
        heading: "Sin cuenta Puriki",
        body: "Puriki no crea una cuenta propia. El acceso se realiza a través de tu cuenta de AniList o MyAnimeList.",
      },
      {
        heading: "Autenticación con proveedores",
        body: "La autenticación se realiza directamente con el proveedor elegido, siguiendo el flujo oficial de autorización de cada servicio.",
      },
      {
        heading: "Almacenamiento local de tokens",
        body: "Los tokens de acceso se almacenan localmente en el dispositivo, usando mecanismos seguros disponibles en la plataforma.",
      },
      {
        heading: "Caché y preferencias locales",
        body: "Las preferencias y los datos de caché necesarios para el funcionamiento de la app permanecen en el dispositivo siempre que sea técnicamente posible.",
      },
      {
        heading: "Comunicación con las APIs de los proveedores",
        body: "Puriki se comunica directamente con las APIs de AniList y MyAnimeList para leer y actualizar tu lista.",
      },
      {
        heading: "Traducción local de sinopsis",
        body: "Cuando corresponda, la traducción de sinopsis se procesa en el dispositivo, sujeta a confirmación en la implementación final.",
      },
      {
        heading: "Eliminación y restablecimiento de datos locales",
        body: "Puedes desconectar tu cuenta y borrar los datos locales almacenados por la app en cualquier momento.",
      },
      {
        heading: "Sin analítica propia en el lanzamiento",
        body: "Puriki no utiliza herramientas de analítica propias en el lanzamiento inicial.",
      },
      {
        heading: "Alojamiento de este sitio",
        body: "Este sitio está alojado en GitHub Pages, que puede registrar datos de acceso como parte de la propia infraestructura de GitHub.",
      },
      {
        heading: "Servicios de terceros",
        body: "El funcionamiento de Puriki depende de servicios de terceros, como AniList y MyAnimeList, que tienen sus propias políticas de privacidad.",
      },
      {
        heading: "Actualizaciones de esta política",
        body: "Esta página podrá actualizarse a medida que el proyecto evolucione. La versión final y completa es responsabilidad de la Fase 05.",
      },
      {
        heading: "Contacto",
        body: "Las dudas sobre privacidad pueden reportarse como issue en el repositorio oficial de Puriki en GitHub.",
      },
    ],
  },
  termsPage: {
    title: "Términos de Uso",
    preparationNotice:
      "Contenido estructural en preparación. La versión legal definitiva se publicará en la Fase 05.",
    intro:
      "Esta página resume las condiciones de uso de Puriki. Todavía no es el texto legal final.",
    sections: [
      {
        heading: "Proyecto independiente y no oficial",
        body: "Puriki no tiene afiliación con AniList ni con MyAnimeList y no representa a esos servicios.",
      },
      {
        heading: "Dependencia de proveedores de terceros",
        body: "El funcionamiento de Puriki depende de la disponibilidad de las APIs de AniList y MyAnimeList.",
      },
      {
        heading: "Sin garantía de disponibilidad de los proveedores",
        body: "Puriki no puede garantizar el funcionamiento continuo de servicios de terceros fuera de su control.",
      },
      {
        heading: "Uso responsable",
        body: "La aplicación debe usarse de forma responsable y conforme a los términos de los proveedores conectados.",
      },
      {
        heading: "Naturaleza de código abierto",
        body: "Puriki es un proyecto de código abierto, disponible para revisión y contribución en GitHub.",
      },
      {
        heading: "Disponibilidad del software",
        body: "La aplicación se ofrece tal cual, sin garantías formales de disponibilidad continua.",
      },
      {
        heading: "Cambios futuros",
        body: "Las funciones, pantallas y funcionalidades pueden cambiar a medida que el proyecto evolucione, incluyendo lo indicado en el roadmap.",
      },
      {
        heading: "Limitaciones de un proyecto no comercial",
        body: "Al ser un proyecto de código abierto y no comercial, el soporte y las garantías ofrecidas son limitados.",
      },
    ],
  },
} satisfies SiteContent;
