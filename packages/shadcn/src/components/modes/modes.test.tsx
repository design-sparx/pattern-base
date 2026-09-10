import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ModeOption } from "@patternbase/core";

import { Modes } from "./modes";

const modes: ModeOption[] = [
  { id: "fast", label: "Fast" },
  { id: "balanced", label: "Balanced" },
  { id: "creative", label: "Creative" },
];

describe("Modes", () => {
  it("renders all options", () => {
    render(
      <Modes
        modes={modes}
        selectedModeId="balanced"
        onModeChange={vi.fn()}
        variant="segmented"
      />,
    );
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Balanced")).toBeInTheDocument();
    expect(screen.getByText("Creative")).toBeInTheDocument();
  });

  it("dispatches selection", async () => {
    const onModeChange = vi.fn();
    render(
      <Modes
        modes={modes}
        selectedModeId="balanced"
        onModeChange={onModeChange}
        variant="segmented"
      />,
    );
    await userEvent.click(screen.getByText("Creative"));
    expect(onModeChange).toHaveBeenCalledWith("creative");
  });
});
