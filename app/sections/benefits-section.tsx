import { ListChecks, Search, Smartphone, ToggleLeft } from "lucide-react";
import type { ComponentType } from "react";
import type { BenefitsContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";

interface BenefitsSectionProps {
  content: BenefitsContent;
}

// One icon per pillar, in the same order as the content model: list
// management, discovery, provider choice, day-to-day comfort. Restrained
// use — an icon supports each card, it isn't decoration on every label.
const BENEFIT_ICONS: [
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>,
] = [ListChecks, Search, ToggleLeft, Smartphone];

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <Section aria-labelledby="benefits-heading" id="benefits">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="benefits-heading"
        title={content.title}
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {content.items.map((item, index) => {
          const Icon = BENEFIT_ICONS[index];

          return (
            <li
              className="rounded-card border border-border bg-surface p-5"
              key={item.title}
            >
              <span className="grid size-10 place-items-center rounded-[0.7rem] border border-border-strong bg-surface-raised">
                <Icon aria-hidden className="size-5 text-danger" />
              </span>
              <p className="mt-4 text-base font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
