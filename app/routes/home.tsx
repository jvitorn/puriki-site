import { ArrowRight, CodeXml, Layers3, Sparkles, Type } from "lucide-react";
import { Container } from "../components/layout/container";
import { Section, SectionHeader } from "../components/layout/section";
import { Reveal } from "../components/motion/reveal";
import { SmartphoneMockup } from "../components/product/smartphone-mockup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";

const tokenSamples = [
  { className: "bg-background", label: "Background", value: "#0B0E14" },
  { className: "bg-surface", label: "Surface", value: "#111522" },
  {
    className: "bg-surface-raised",
    label: "Raised surface",
    value: "#1A2030",
  },
  {
    className: "bg-border-strong",
    label: "Strong border",
    value: "#39445C",
  },
  { className: "bg-brand", label: "Brand", value: "#970C10" },
  { className: "bg-danger", label: "Accent text", value: "#F07175" },
];

export default function Home() {
  return (
    <>
      <section
        aria-labelledby="phase-heading"
        className="relative overflow-hidden border-b border-border py-18 sm:py-24 lg:py-28"
        id="foundation"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-14rem] top-[-12rem] size-[34rem] rounded-full bg-brand/12 blur-[100px]"
        />
        <Container className="relative grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-foreground-muted">
              <Sparkles aria-hidden="true" className="size-3.5 text-danger" />
              Fase 01 · Fundação visual
            </p>
            <h1
              className="max-w-3xl text-[clamp(2.5rem,6vw,4rem)]"
              id="phase-heading"
            >
              Uma base visual para o Puriki.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">
              Tokens semânticos, tipografia, acessibilidade e componentes
              compartilhados — prontos para receber a landing nas próximas
              fases.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="large">
                <a href="#components">
                  Explorar componentes
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </Button>
              <Button asChild size="large" variant="secondary">
                <a
                  href="https://github.com/jvitorn/puriki-site"
                  rel="noreferrer"
                  target="_blank"
                >
                  <CodeXml aria-hidden="true" className="size-4" />
                  Ver repositório
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-foreground-subtle">
              Esta página demonstra somente o sistema compartilhado desta fase.
            </p>
          </Reveal>

          <Reveal className="relative" delay={100}>
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-[-8%] h-[28%] rounded-full bg-brand/20 blur-[70px]"
            />
            <SmartphoneMockup label="Prévia abstrata da interface do Puriki usando os tokens da Fase 01">
              <div className="flex size-full flex-col bg-background px-4 pb-5 pt-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.15em] text-foreground-subtle">
                      Biblioteca
                    </p>
                    <p className="mt-1 text-base font-bold leading-tight">
                      Minha lista
                    </p>
                  </div>
                  <span className="size-8 rounded-full border border-border bg-surface-raised" />
                </div>
                <div className="mt-5 h-9 rounded-button border border-border bg-surface" />
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.13em] text-danger">
                      Assistindo
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Continuar de onde parou
                    </p>
                  </div>
                  <p className="text-[0.58rem] text-foreground-subtle">
                    12 títulos
                  </p>
                </div>
                <div className="mt-3 grid gap-2.5">
                  {["67%", "42%", "25%"].map((progress, index) => (
                    <div
                      className="grid grid-cols-[3.25rem_1fr] gap-3 rounded-card border border-border bg-surface p-2.5"
                      key={progress}
                    >
                      <div
                        className={`rounded-lg ${
                          index === 0
                            ? "bg-brand-soft"
                            : index === 1
                              ? "bg-surface-raised"
                              : "bg-surface-hover"
                        }`}
                      />
                      <div className="min-w-0 py-1">
                        <div className="h-2 w-[72%] rounded-full bg-foreground/80" />
                        <div className="mt-2 h-1.5 w-[44%] rounded-full bg-foreground-subtle/50" />
                        <div className="mt-4 h-1 overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: progress }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-4 gap-3 border-t border-border pt-4">
                  {[true, false, false, false].map((active, index) => (
                    <span
                      className={`mx-auto size-2 rounded-full ${active ? "bg-danger" : "bg-border-strong"}`}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </SmartphoneMockup>
          </Reveal>
        </Container>
      </section>

      <Section aria-labelledby="tokens-heading" id="tokens">
        <Reveal>
          <SectionHeader
            description={
              <p>
                A identidade permanece dark-only. O vermelho da marca aparece
                como acento controlado, enquanto superfícies e texto usam papéis
                semânticos consistentes.
              </p>
            }
            eyebrow="Tokens"
            headingId="tokens-heading"
            title="Cor com função, não decoração."
          />
        </Reveal>
        <Reveal
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          delay={70}
        >
          {tokenSamples.map((token) => (
            <div
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-4"
              key={token.label}
            >
              <span
                aria-hidden="true"
                className={`size-11 shrink-0 rounded-xl border border-border-strong ${token.className}`}
              />
              <div>
                <p className="text-sm font-semibold">{token.label}</p>
                <code className="text-xs text-foreground-subtle">
                  {token.value}
                </code>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section
        aria-labelledby="components-heading"
        className="border-y border-border bg-surface"
        id="components"
      >
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18">
          <Reveal>
            <SectionHeader
              description={
                <p>
                  Um conjunto pequeno e concreto: botões, Sheet móvel, Accordion
                  e primitives de layout. Sem catálogo genérico.
                </p>
              }
              eyebrow="Primitivos"
              headingId="components-heading"
              title="O necessário para construir com consistência."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button>Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Contorno</Button>
            </div>
          </Reveal>

          <Reveal
            className="rounded-block border border-border bg-surface-raised px-5 sm:px-7"
            delay={80}
          >
            <Accordion collapsible type="single">
              <AccordionItem value="typography">
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <Type aria-hidden="true" className="size-4 text-danger" />
                    Tipografia
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Geist variável é servido pelo próprio build, com fallbacks de
                  sistema e suporte específico para glifos japoneses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="layout">
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <Layers3
                      aria-hidden="true"
                      className="size-4 text-danger"
                    />
                    Layout
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Container e Section definem largura e ritmo responsivo sem
                  esconder a composição clara do Tailwind.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="accessibility">
                <AccordionTrigger>Acessibilidade por padrão</AccordionTrigger>
                <AccordionContent>
                  Foco visível, skip link, alvos de toque confortáveis e
                  comportamento de movimento reduzido fazem parte da base.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="motion-heading" id="motion">
        <Reveal>
          <div className="grid gap-8 rounded-block border border-border bg-surface-raised p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <SectionHeader
              description={
                <p>
                  Entradas discretas usam Anime.js somente quando o elemento
                  chega à viewport. Com movimento reduzido, o conteúdo aparece
                  imediatamente e nenhuma animação é necessária para entendê-lo.
                </p>
              }
              eyebrow="Movimento"
              headingId="motion-heading"
              title="Polimento que respeita a preferência do usuário."
            />
            <div className="flex flex-wrap gap-2 lg:max-w-[15rem] lg:justify-end">
              <span className="rounded-full border border-success/45 bg-success/10 px-3 py-1 text-xs font-bold text-success">
                IntersectionObserver
              </span>
              <span className="rounded-full border border-warning/45 bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                Sem loops
              </span>
              <span className="rounded-full border border-danger/45 bg-danger/10 px-3 py-1 text-xs font-bold text-danger">
                Reduced motion
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      <section
        aria-labelledby="download-heading"
        className="border-t border-border bg-brand-soft py-18 sm:py-22"
        id="download"
      >
        <Container>
          <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-danger">
                Status do produto
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl" id="download-heading">
                O download ainda não faz parte desta fase.
              </h2>
              <p className="mt-5 text-base leading-7 text-foreground-muted">
                A integração com a release estável e o APK oficial permanece na
                Fase 04. Nenhuma versão ou link de download foi simulado aqui.
              </p>
            </div>
            <Button asChild size="large" variant="secondary">
              <a
                href="https://github.com/jvitorn/purikuki"
                rel="noreferrer"
                target="_blank"
              >
                Acompanhar no GitHub
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
