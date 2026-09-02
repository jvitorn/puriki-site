import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

export const Collapsible = CollapsiblePrimitive.Root;

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group flex min-h-11 w-full items-center justify-between gap-3 rounded-button px-1 text-left text-sm font-semibold text-foreground transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className="size-4 shrink-0 text-foreground-subtle transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        "overflow-hidden text-sm leading-6 text-foreground-muted data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      {...props}
    />
  );
}
