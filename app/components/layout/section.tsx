import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Container } from "./container";

interface SectionProps extends ComponentProps<"section"> {
  containerClassName?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 md:py-24 lg:py-32", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps extends ComponentProps<"div"> {
  eyebrow?: string;
  headingId?: string;
  title: string;
  description?: ReactNode;
}

export function SectionHeader({
  className,
  description,
  eyebrow,
  headingId,
  title,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)} {...props}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-danger">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl" id={headingId}>
        {title}
      </h2>
      {description ? (
        <div className="mt-5 text-base leading-7 text-foreground-muted sm:text-lg">
          {description}
        </div>
      ) : null}
    </div>
  );
}
