import { Languages } from "lucide-react";
import type { ReactElement } from "react";
import type { ShowcaseItem } from "../content/types";

// Abstract, stylized previews built from design tokens — not real product
// screenshots. Purely visual (bars/blocks, no literal words) so nothing here
// leaks Portuguese copy onto the EN/ES pages. Real screenshots are a pending
// asset for this section (see Phase 03 report); swap these for
// `<SmartphoneMockup imageSrc .../>` once they exist, the surrounding layout
// does not need to change.

function ListShowcasePreview() {
  return (
    <div className="flex size-full flex-col gap-2.5 bg-background p-4">
      {[
        { accent: "bg-danger/70", progress: "78%" },
        { accent: "bg-success/70", progress: "100%" },
        { accent: "bg-foreground-subtle/50", progress: "0%" },
      ].map((row, index) => (
        <div
          className="grid grid-cols-[3rem_1fr] gap-3 rounded-card border border-border bg-surface p-2.5"
          key={index}
        >
          <div className="rounded-lg bg-surface-raised" />
          <div className="min-w-0 py-1">
            <div className="h-2 w-[70%] rounded-full bg-foreground/80" />
            <div className={`mt-2 h-1.5 w-10 rounded-full ${row.accent}`} />
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-brand" style={{ width: row.progress }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiscoveryShowcasePreview() {
  return (
    <div className="flex size-full flex-col gap-3 bg-background p-4">
      <div className="h-9 rounded-button border border-border bg-surface" />
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            className={`aspect-[2/3] rounded-lg border border-border ${
              index % 3 === 0 ? "bg-brand-soft" : "bg-surface-raised"
            }`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function DetailsShowcasePreview() {
  return (
    <div className="flex size-full flex-col bg-background">
      <div className="h-24 bg-surface-raised" />
      <div className="flex-1 p-4">
        <div className="h-2.5 w-[65%] rounded-full bg-foreground/80" />
        <div className="mt-2 h-1.5 w-[35%] rounded-full bg-foreground-subtle/50" />
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-2.5 py-1">
          <Languages aria-hidden="true" className="size-3 text-danger" />
          <span className="h-1.5 w-8 rounded-full bg-foreground-subtle/50" />
        </span>
        <div className="mt-4 grid gap-1.5">
          <div className="h-1.5 w-full rounded-full bg-border" />
          <div className="h-1.5 w-full rounded-full bg-border" />
          <div className="h-1.5 w-[80%] rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}

const SHOWCASE_PREVIEWS: Record<ShowcaseItem["id"], () => ReactElement> = {
  list: ListShowcasePreview,
  discovery: DiscoveryShowcasePreview,
  details: DetailsShowcasePreview,
};

interface ShowcasePanelProps {
  id: ShowcaseItem["id"];
  alt: string;
}

// A cropped app panel, not a repeated full phone frame — per the design
// system, showcases should read differently from the Hero mockup.
export function ShowcasePanel({ id, alt }: ShowcasePanelProps) {
  const Preview = SHOWCASE_PREVIEWS[id];

  return (
    <div
      aria-label={alt}
      className="aspect-[4/3] overflow-hidden rounded-block border border-border bg-surface shadow-[0_20px_60px_var(--device-shadow)] sm:aspect-[16/10]"
      role="img"
    >
      <Preview />
    </div>
  );
}
