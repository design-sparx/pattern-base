import { render, screen } from "@testing-library/react";

import { Summary } from "./summary";

describe("Summary", () => {
  it("renders content", () => {
    render(<Summary content="Long text" title="Research Summary" />);
    expect(screen.getByText("Research Summary")).toBeInTheDocument();
    expect(screen.getByText("Long text")).toBeInTheDocument();
  });
});
