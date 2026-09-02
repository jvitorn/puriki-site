import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type SmartphoneMockupProps =
  | {
      className?: string;
      imageSrc: string;
      imageAlt: string;
      children?: never;
      label?: never;
    }
  | {
      className?: string;
      imageSrc?: never;
      imageAlt?: never;
      children: ReactNode;
      label: string;
    };

export function SmartphoneMockup(props: SmartphoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[19rem] rounded-[2.55rem] border border-border-strong bg-[var(--device-frame)] p-2 shadow-[0_35px_90px_var(--device-shadow)]",
        props.className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[0.72rem] z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-border-strong"
      />
      <div className="aspect-[9/19.5] overflow-hidden rounded-[2.05rem] border border-border bg-surface">
        {"imageSrc" in props ? (
          <img
            alt={props.imageAlt}
            className="size-full object-cover"
            draggable={false}
            src={props.imageSrc}
          />
        ) : (
          <div
            aria-label={props.label}
            className="size-full overflow-hidden"
            role="img"
          >
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
}
