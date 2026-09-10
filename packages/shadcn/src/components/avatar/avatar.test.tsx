import { render, screen } from "@testing-library/react";

import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders name and persona", () => {
    render(<Avatar name="Ada Lovelace" persona="Analyst" />);
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Analyst")).toBeInTheDocument();
  });
});
