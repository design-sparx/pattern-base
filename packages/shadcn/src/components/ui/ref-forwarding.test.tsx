import { render } from "@testing-library/react";
import { createRef } from "react";

import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

describe("vendored primitives forward refs (React 18)", () => {
  it("button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Hello</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("textarea", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("button as asChild target for an arbitrary radix-style slot", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button asChild>
        <button ref={ref}>slotted</button>
      </Button>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
