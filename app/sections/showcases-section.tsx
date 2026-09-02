import type { ShowcasesContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Reveal } from "../components/motion/reveal";
import { ShowcasePanel } from "./showcase-mockups";

interface ShowcasesSectionProps {
  content: ShowcasesContent;
}

// DOM order is always title -> copy -> image (required for mobile reading
// order and for a11y). Desktop alternation between text/image sides is done
// purely with CSS `order` utilities, never by reordering the markup.
export function ShowcasesSection({ content }: ShowcasesSectionProps) {
  return (
    <Section aria-labelledby="showcases-heading" id="showcases">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="showcases-heading"
        title={content.title}
      />
      <div className="mt-12 flex flex-col gap-16 lg:gap-24">
        {content.items.map((item, index) => {
          const imageFirstOnDesktop = index % 2 === 1;

          return (
            <div
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              key={item.id}
            >
              <div
                className={imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"}
              >
                <h3 className="text-2xl font-bold sm:text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-md text-base leading-7 text-foreground-muted">
                  {item.body}
                </p>
              </div>
              <Reveal
                className={imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"}
              >
                <ShowcasePanel alt={item.imageAlt} id={item.id} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
