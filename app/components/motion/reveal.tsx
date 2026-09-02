import { animate, utils } from "animejs";
import { useEffect, useRef, type ComponentProps } from "react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { cn } from "../../lib/utils";

interface RevealProps extends ComponentProps<"div"> {
  delay?: number;
  /**
   * When set, animates each direct child in sequence (this many ms apart)
   * instead of animating the wrapper as a single block. Keeps one
   * IntersectionObserver per section regardless of how many items it
   * staggers.
   */
  staggerChildren?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  staggerChildren,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;

    if (
      !element ||
      reducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    let animation: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        observer.unobserve(element);

        const targets = staggerChildren
          ? Array.from(element.children)
          : element;

        animation = animate(targets, {
          opacity: { from: 0 },
          y: { from: 18 },
          delay: staggerChildren
            ? utils.stagger(staggerChildren, { start: delay })
            : delay,
          duration: 520,
          ease: "out(3)",
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      animation?.revert();
    };
  }, [delay, reducedMotion, staggerChildren]);

  return (
    <div className={cn(className)} ref={elementRef} {...props}>
      {children}
    </div>
  );
}
