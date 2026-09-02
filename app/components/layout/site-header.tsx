import { CodeXml, Download, Menu } from "lucide-react";
import { useState } from "react";
import { withBasePath } from "../../lib/config";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Container } from "./container";

const navigation = [
  { href: withBasePath("#tokens"), label: "Tokens" },
  { href: withBasePath("#components"), label: "Primitivos" },
  { href: withBasePath("#motion"), label: "Movimento" },
];

function Wordmark() {
  return (
    <a
      aria-label="Puriki — página inicial"
      className="inline-flex min-h-11 items-center gap-3 rounded-button no-underline"
      href={withBasePath()}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-[0.55rem] bg-brand text-sm font-black text-brand-foreground shadow-[0_6px_20px_var(--brand-shadow)]"
      >
        ピ
      </span>
      <span className="text-lg font-bold tracking-[-0.025em]">Puriki</span>
    </a>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-5">
        <Wordmark />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <a
              className="inline-flex min-h-11 items-center rounded-button px-3 text-sm font-medium text-foreground-muted no-underline transition-colors hover:bg-surface-hover hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <span
            aria-label="Idioma atual: Português do Brasil. Seletor disponível na Fase 02."
            className="inline-flex min-h-11 items-center rounded-button px-3 text-xs font-bold tracking-wide text-foreground-subtle"
          >
            PT-BR
          </span>
          <Button asChild variant="secondary">
            <a
              href="https://github.com/jvitorn/purikuki"
              rel="noreferrer"
              target="_blank"
            >
              <CodeXml aria-hidden="true" className="size-4" />
              GitHub
            </a>
          </Button>
          <Button asChild>
            <a href={withBasePath("#download")}>
              <Download aria-hidden="true" className="size-4" />
              Baixar
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetTrigger asChild>
              <Button aria-label="Abrir menu" size="icon" variant="ghost">
                <Menu aria-hidden="true" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navegue pela fundação visual do Puriki.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Navegação móvel"
                className="mt-8 flex flex-col gap-1"
              >
                {navigation.map((item) => (
                  <a
                    className="flex min-h-12 items-center rounded-button px-3 font-semibold text-foreground-muted no-underline transition-colors hover:bg-surface-hover hover:text-foreground"
                    href={item.href}
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground-subtle">
                  Idioma
                </p>
                <p className="mt-2 text-sm font-semibold">Português (Brasil)</p>
                <p className="mt-1 text-xs text-foreground-subtle">
                  Troca de idioma entra na Fase 02.
                </p>
              </div>

              <div className="mt-auto grid gap-3 pt-8">
                <Button asChild variant="secondary">
                  <a
                    href="https://github.com/jvitorn/purikuki"
                    onClick={() => setIsOpen(false)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <CodeXml aria-hidden="true" className="size-4" />
                    Ver no GitHub
                  </a>
                </Button>
                <Button asChild size="large">
                  <a
                    href={withBasePath("#download")}
                    onClick={() => setIsOpen(false)}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    Baixar para Android
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
