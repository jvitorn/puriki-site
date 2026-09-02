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
    foundationAvailableStatus: "Disponible",
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
      copyFailedLabel: "No se pudo copiar el SHA-256.",
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
    intro:
      "Esta política explica cómo el sitio de Puriki y la app para Android manejan los datos. Son dos contextos diferentes, descritos por separado a continuación.",
    sections: [
      {
        heading: "Sitio y aplicación",
        body: "Esta política cubre dos contextos diferentes: el sitio que estás leyendo ahora, que es estático y está alojado en GitHub Pages, y la app de Puriki para Android. Cada uno tiene su propio comportamiento de datos.",
      },
      {
        heading: "Sin cuenta Puriki",
        body: "Puriki no crea una cuenta propia. El acceso a la app se realiza a través de tu cuenta existente de AniList o MyAnimeList.",
      },
      {
        heading: "Autenticación con proveedores",
        body: "Al conectar un proveedor, se te redirige al flujo oficial de autorización de AniList o MyAnimeList. Puriki recibe solo las credenciales necesarias para acceder a tu lista, según los permisos otorgados en ese flujo.",
      },
      {
        heading: "Almacenamiento de credenciales",
        body: "Los tokens de acceso se almacenan localmente en el dispositivo usando el almacenamiento seguro del sistema operativo (Expo SecureStore), separado por proveedor.",
      },
      {
        heading: "Preferencias y caché locales",
        body: "Otra información, como el idioma preferido, el estado del onboarding, el proveedor principal seleccionado y la caché de traducción, puede almacenarse localmente en el dispositivo para que la app funcione correctamente.",
      },
      {
        heading: "Comunicación con las APIs de los proveedores",
        body: "Puriki se comunica directamente con las APIs de AniList y MyAnimeList para leer y actualizar tu lista. Esta comunicación es necesaria para el funcionamiento de la app; los datos de tu lista no quedan limitados solo al dispositivo.",
      },
      {
        heading: "Traducción local de sinopsis",
        body: "Cuando está disponible para tu idioma, la traducción de sinopsis se procesa en el dispositivo Android usando componentes de traducción de Google ML Kit, sin enviar el texto a un servidor de Puriki.",
      },
      {
        heading: "Desconexión de un proveedor",
        body: "Desconectar un proveedor elimina las credenciales locales asociadas a él. Otras preferencias y datos de caché pueden permanecer en el dispositivo hasta que la propia app los reemplace o el sistema los elimine.",
      },
      {
        heading: "Sin analítica propia en el lanzamiento",
        body: "La app de Puriki no utiliza herramientas de analítica, seguimiento ni reporte de fallos de terceros en el lanzamiento inicial.",
      },
      {
        heading: "Alojamiento de este sitio",
        body: "Este sitio está alojado por GitHub Pages. Puriki no utiliza analítica propia en esta landing, pero el sitio está sujeto a las prácticas técnicas y de privacidad de la infraestructura de GitHub.",
      },
      {
        heading: "Servicios de terceros",
        body: "El funcionamiento de Puriki depende de servicios de terceros — AniList, MyAnimeList y, en Android, componentes de traducción de Google ML Kit — cada uno con su propia política de privacidad.",
      },
      {
        heading: "Actualizaciones de esta política",
        body: "Esta página puede actualizarse a medida que el proyecto evolucione. La fecha de la última revisión se indica al final de esta página.",
      },
      {
        heading: "Contacto",
        body: "Las dudas sobre privacidad pueden reportarse como issue en el repositorio oficial de Puriki en GitHub. Las issues son públicas — nunca incluyas tokens de acceso, contraseñas u otra información sensible en ellas.",
      },
    ],
    lastUpdated: "2026-09-02",
    lastUpdatedLabel: "Última actualización",
  },
  termsPage: {
    title: "Términos de Uso",
    intro:
      "Estos términos establecen las condiciones de uso de Puriki, un proyecto independiente y de código abierto.",
    sections: [
      {
        heading: "Proyecto independiente y no oficial",
        body: "Puriki no tiene afiliación con AniList ni con MyAnimeList y no representa a esos servicios.",
      },
      {
        heading: "Los proveedores son servicios de terceros",
        body: "El funcionamiento de Puriki depende de las APIs de AniList y MyAnimeList. Esas APIs pertenecen a terceros y pueden cambiar sin previo aviso a Puriki.",
      },
      {
        heading: "Disponibilidad de los proveedores",
        body: "Puriki no puede garantizar el funcionamiento continuo de servicios de terceros. Una interrupción o un cambio en un proveedor puede afectar temporal o permanentemente algunas funciones de la app.",
      },
      {
        heading: "Tu cuenta y el uso responsable",
        body: "Eres responsable de mantener tus credenciales seguras y de usar Puriki conforme a los propios términos de uso de AniList y MyAnimeList.",
      },
      {
        heading: "Naturaleza de código abierto",
        body: "Puriki es un proyecto de código abierto, disponible para revisión y contribución en GitHub.",
      },
      {
        heading: "Disponibilidad del software",
        body: "La aplicación se ofrece \"tal cual\", sin garantías formales de disponibilidad continua ni de ausencia de errores.",
      },
      {
        heading: "Cambios futuros",
        body: "Las funciones, pantallas y funcionalidades pueden cambiar a medida que el proyecto evolucione. El roadmap representa una dirección, no un compromiso: los elementos planeados pueden modificarse, retrasarse o eliminarse.",
      },
      {
        heading: "Limitaciones de un proyecto no comercial",
        body: "Al ser un proyecto de código abierto, gratuito y no comercial, el soporte, el mantenimiento y las garantías ofrecidas son proporcionalmente limitados.",
      },
    ],
    lastUpdated: "2026-09-02",
    lastUpdatedLabel: "Última actualización",
  },
} satisfies SiteContent;
