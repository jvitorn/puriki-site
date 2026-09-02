import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const buttonStyles = cva(
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-button border border-transparent px-4 text-sm font-semibold leading-none no-underline transition-[background-color,border-color,color,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-foreground shadow-[0_8px_28px_var(--brand-shadow)] hover:bg-brand-hover",
        secondary:
          "border-border-strong bg-surface-raised text-foreground hover:bg-surface-hover",
        outline:
          "border-border-strong bg-transparent text-foreground hover:bg-surface-hover",
        ghost:
          "bg-transparent text-foreground-muted hover:bg-surface-hover hover:text-foreground",
      },
      size: {
        default: "h-11 px-4",
        large: "h-12 px-5 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonStyles({ size, variant }), className)}
      {...props}
    />
  );
}
