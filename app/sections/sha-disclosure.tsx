import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

interface ShaDisclosureProps {
  sha256: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
}

const COPIED_STATUS_DURATION_MS = 2000;

export function ShaDisclosure({
  sha256,
  label,
  copyLabel,
  copiedLabel,
}: ShaDisclosureProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sha256);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_STATUS_DURATION_MS);
    } catch {
      // Clipboard access denied/unsupported — no fake "copied" state.
    }
  }

  return (
    <div className="mt-4 rounded-card border border-border bg-surface p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-foreground-subtle">
          {label}
        </p>
        <Button aria-label={copyLabel} onClick={handleCopy} size="icon" variant="ghost">
          {copied ? (
            <Check aria-hidden="true" className="size-4 text-success" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
        </Button>
      </div>
      <code className="mt-2 block break-all text-xs text-foreground-muted">
        {sha256}
      </code>
      <p aria-live="polite" className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </p>
    </div>
  );
}
