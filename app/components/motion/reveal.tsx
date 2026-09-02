import { animate } from "animejs";
import { useEffect, useRef, type ComponentProps } from "react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { cn } from "../../lib/utils";

interface RevealProps extends ComponentProps<"div"> {
  delay?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
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
        animation = animate(element, {
          opacity: { from: 0 },
          y: { from: 18 },
          delay,
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
  }, [delay, reducedMotion]);

  return (
    <div className={cn(className)} ref={elementRef} {...props}>
      {children}
    </div>
  );
}
