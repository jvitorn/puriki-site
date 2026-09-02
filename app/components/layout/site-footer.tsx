import { withBasePath } from "../../lib/config";
import { Container } from "./container";

const columns = [
  {
    title: "Produto",
    links: [
      { href: withBasePath("#tokens"), label: "Tokens" },
      { href: withBasePath("#components"), label: "Primitivos" },
      { href: withBasePath("#download"), label: "Download" },
    ],
  },
  {
    title: "Projeto",
    links: [
      { href: "https://github.com/jvitorn/purikuki", label: "GitHub" },
      {
        href: "https://github.com/jvitorn/purikuki/releases",
        label: "Releases",
      },
      {
        href: "https://github.com/jvitorn/purikuki/issues",
        label: "Issues",
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr] lg:py-18">
        <div className="max-w-sm">
          <p className="text-lg font-bold tracking-tight">Puriki</p>
          <p className="mt-4 text-sm leading-6 text-foreground-muted">
            Uma experiência Android independente para acompanhar sua lista de
            anime.
          </p>
          <p className="mt-5 text-xs leading-5 text-foreground-subtle">
            Puriki é um projeto independente e não oficial. Não possui afiliação
            com AniList ou MyAnimeList.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-bold tracking-normal">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a
                    className="rounded-sm no-underline transition-colors hover:text-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-bold tracking-normal">Legal</h2>
          <p className="mt-4 text-sm leading-6 text-foreground-subtle">
            Privacidade e Termos serão publicados com as rotas localizadas nas
            próximas fases.
          </p>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Puriki</p>
          <p>Open source · Sem analytics nesta fase</p>
        </Container>
      </div>
    </footer>
  );
}
