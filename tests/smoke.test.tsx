import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function SmokeComponent() {
  return <h1>Test environment ready</h1>;
}

describe("test environment", () => {
  it("renders a React component", () => {
    render(<SmokeComponent />);

    expect(
      screen.getByRole("heading", { name: "Test environment ready" }),
    ).toBeInTheDocument();
  });
});
