import { CodeXml } from "lucide-react";
import type { OpenSourceContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Button } from "../components/ui/button";
import { PURIKUKI_REPO_URL } from "../lib/external-links";

interface OpenSourceSectionProps {
  content: OpenSourceContent;
}

// Deliberately its own section, not folded into Benefits — and no GitHub
// vanity metrics (stars/forks/commits) per DECISIONS.md.
export function OpenSourceSection({ content }: OpenSourceSectionProps) {
  return (
    <Section aria-labelledby="open-source-heading" id="open-source">
      <SectionHeader
        description={<p>{content.body}</p>}
        eyebrow={content.eyebrow}
        headingId="open-source-heading"
        title={content.title}
      />
      <div className="mt-6">
        <Button asChild variant="secondary">
          <a href={PURIKUKI_REPO_URL} rel="noreferrer" target="_blank">
            <CodeXml aria-hidden="true" className="size-4" />
            {content.cta}
          </a>
        </Button>
      </div>
    </Section>
  );
}
