import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { StarterPrompt } from "@patternbase/core";

import { Suggestions } from "./suggestions";

const prompts: StarterPrompt[] = [
  {
    id: "1",
    title: "Summarize",
    description: "Condense this",
    prompt: "Summarize",
  },
  { id: "2", title: "Translate", prompt: "Translate" },
];

describe("Suggestions", () => {
  it("renders card variant as a grid", () => {
    render(
      <Suggestions suggestions={prompts} onSelect={vi.fn()} variant="card" />,
    );
    expect(screen.getByText("Summarize")).toBeInTheDocument();
    expect(screen.getByText("Condense this")).toBeInTheDocument();
  });

  it("renders chip variant as badges", () => {
    render(
      <Suggestions suggestions={prompts} onSelect={vi.fn()} variant="chip" />,
    );
    expect(screen.getByText("Translate")).toBeInTheDocument();
  });

  it("calls onSelect with the clicked suggestion", async () => {
    const onSelect = vi.fn();
    render(
      <Suggestions suggestions={prompts} onSelect={onSelect} variant="card" />,
    );
    await userEvent.click(screen.getByText("Translate"));
    expect(onSelect).toHaveBeenCalledWith(prompts[1]);
  });

  it("uses the requested column count", () => {
    const { container } = render(
      <Suggestions
        suggestions={prompts}
        onSelect={vi.fn()}
        variant="card"
        columns={4}
      />,
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass("grid", "grid-cols-4");
  });
});
