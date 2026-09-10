import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OpenInput } from "./open-input";

describe("OpenInput", () => {
  it("submits trimmed input and clears the field", async () => {
    const onSubmit = vi.fn();
    render(<OpenInput onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText("Ask anything...");
    await userEvent.type(textarea, "  hello  ");
    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("hello");
    expect(textarea).toHaveValue("");
  });

  it("does not submit empty input", async () => {
    const onSubmit = vi.fn();
    render(<OpenInput onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders suggestion badges", () => {
    render(<OpenInput onSubmit={vi.fn()} suggestions={["Alpha", "Beta"]} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("inserts a newline on Shift+Enter instead of submitting", async () => {
    const onSubmit = vi.fn();
    render(<OpenInput onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText("Ask anything...");
    await userEvent.type(textarea, "line1{Shift>}{Enter}{/Shift}line2");
    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("line1\nline2");
  });
});
