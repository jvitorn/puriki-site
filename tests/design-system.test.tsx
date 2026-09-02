import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Reveal } from "../app/components/motion/reveal";
import { SmartphoneMockup } from "../app/components/product/smartphone-mockup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../app/components/ui/accordion";
import { Button } from "../app/components/ui/button";
import {
  getReducedMotionPreference,
  REDUCED_MOTION_QUERY,
} from "../app/hooks/use-reduced-motion";

describe("design system primitives", () => {
  it("supports focus and button interaction", () => {
    function Example() {
      const [count, setCount] = useState(0);

      return <Button onClick={() => setCount(count + 1)}>Count {count}</Button>;
    }

    render(<Example />);
    const button = screen.getByRole("button", { name: "Count 0" });

    button.focus();
    expect(button).toHaveFocus();

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "Count 1" })).toBeInTheDocument();
  });

  it("exposes Accordion state and content accessibly", () => {
    render(
      <Accordion collapsible type="single">
        <AccordionItem value="base">
          <AccordionTrigger>Visual foundation</AccordionTrigger>
          <AccordionContent>
            Semantic tokens and shared components.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "Visual foundation" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Semantic tokens and shared components."),
    ).toBeVisible();
  });

  it("requires explicit alternative text for a screenshot", () => {
    render(
      <SmartphoneMockup imageAlt="Puriki list screen" imageSrc="/screen.png" />,
    );

    expect(screen.getByAltText("Puriki list screen")).toBeInTheDocument();
  });
});

describe("motion preference", () => {
  it("reads the reduced-motion media preference centrally", () => {
    const matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === REDUCED_MOTION_QUERY,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal("matchMedia", matchMedia);

    expect(getReducedMotionPreference()).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith(REDUCED_MOTION_QUERY);

    vi.unstubAllGlobals();
  });

  it("keeps reveal content visible without observing when motion is reduced", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query === REDUCED_MOTION_QUERY,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
    const intersectionObserver = vi.fn();
    vi.stubGlobal("IntersectionObserver", intersectionObserver);

    render(
      <Reveal>
        <p>Visible immediately</p>
      </Reveal>,
    );

    expect(screen.getByText("Visible immediately")).toBeVisible();
    expect(intersectionObserver).not.toHaveBeenCalled();
  });
});
