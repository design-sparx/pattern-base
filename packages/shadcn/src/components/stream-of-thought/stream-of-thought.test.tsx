import { render, screen } from "@testing-library/react";

import type { ThoughtStep } from "@patternbase/core";

import { StreamOfThought } from "./stream-of-thought";

const steps: ThoughtStep[] = [
  {
    id: "1",
    type: "thinking",
    content: "Decompose the problem",
    timestamp: new Date(),
  },
  { id: "2", type: "action", content: "Fetch data", timestamp: new Date() },
];

describe("StreamOfThought", () => {
  it("renders steps", () => {
    render(<StreamOfThought steps={steps} />);
    expect(screen.getByText("Decompose the problem")).toBeInTheDocument();
    expect(screen.getByText("Fetch data")).toBeInTheDocument();
  });
});
