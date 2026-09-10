import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ParameterControlItem } from "@patternbase/core";

import { ParameterControl } from "./parameter-control";

const parameters: ParameterControlItem[] = [
  {
    id: "temp",
    label: "Temperature",
    type: "slider",
    value: 50,
    min: 0,
    max: 100,
  },
  { id: "stream", label: "Streaming", type: "toggle", value: true },
  {
    id: "model",
    label: "Model",
    type: "select",
    value: "gpt-4",
    options: [
      { label: "GPT-4", value: "gpt-4" },
      { label: "Claude", value: "claude" },
    ],
  },
];

describe("ParameterControl", () => {
  it("renders the title and each type", () => {
    render(
      <ParameterControl
        parameters={parameters}
        onChange={vi.fn()}
        title="Settings"
      />,
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("Streaming")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
  });

  it("dispatches slider changes", async () => {
    const onChange = vi.fn();
    render(
      <ParameterControl parameters={[parameters[0]!]} onChange={onChange} />,
    );
    const slider = screen.getByRole("slider");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalled();
  });

  it("dispatches toggle changes and select changes", async () => {
    const onChange = vi.fn();
    render(
      <ParameterControl parameters={parameters.slice(1)} onChange={onChange} />,
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith("stream", false);
    await userEvent.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: "Claude" });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith("model", "claude");
  });
});
