import { render, screen } from "@testing-library/react";

import { Caveat } from "./caveat";

describe("Caveat", () => {
  it("renders the message", () => {
    render(<Caveat message="AI output may be inaccurate." variant="banner" />);
    expect(screen.getByText(/AI output may be inaccurate/)).toBeInTheDocument();
  });
});
