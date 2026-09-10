import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Regenerate } from "./regenerate";

describe("Regenerate", () => {
  it("renders and triggers the action", async () => {
    const onRegenerate = vi.fn();
    render(<Regenerate onRegenerate={onRegenerate} variant="button" />);
    const button = screen.getByRole("button", { name: /regenerate/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onRegenerate).toHaveBeenCalled();
  });
});
