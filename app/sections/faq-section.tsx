import type { FaqContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface FaqSectionProps {
  content: FaqContent;
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <Section aria-labelledby="faq-heading" id="faq">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="faq-heading"
        title={content.title}
      />
      <div className="mt-8 rounded-block border border-border bg-surface-raised px-5 sm:px-7">
        <Accordion collapsible type="single">
          {content.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
