import { Check, Copy, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";

interface ShaDisclosureProps {
  sha256: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
}

type CopyStatus = "idle" | "copied" | "failed";

const STATUS_RESET_DELAY_MS = 2000;

export function ShaDisclosure({
  sha256,
  label,
  copyLabel,
  copiedLabel,
  copyFailedLabel,
}: ShaDisclosureProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    clearTimeout(resetTimeoutRef.current);

    try {
      await navigator.clipboard.writeText(sha256);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    resetTimeoutRef.current = setTimeout(
      () => setStatus("idle"),
      STATUS_RESET_DELAY_MS,
    );
  }

  const statusMessage =
    status === "copied" ? copiedLabel : status === "failed" ? copyFailedLabel : "";

  return (
    <div className="mt-4 rounded-card border border-border bg-surface p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-foreground-subtle">
          {label}
        </p>
        <Button aria-label={copyLabel} onClick={handleCopy} size="icon" variant="ghost">
          {status === "copied" ? (
            <Check aria-hidden="true" className="size-4 text-success" />
          ) : status === "failed" ? (
            <TriangleAlert aria-hidden="true" className="size-4 text-warning" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
        </Button>
      </div>
      <code className="mt-2 block break-all text-xs text-foreground-muted">
        {sha256}
      </code>
      <p aria-live="polite" className="sr-only" role="status">
        {statusMessage}
      </p>
    </div>
  );
}
