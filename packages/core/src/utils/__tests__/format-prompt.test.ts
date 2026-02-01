import { describe, expect, it } from "vitest";

import { formatPrompt } from "../format-prompt";

describe("formatPrompt", () => {
  it("trims the user prompt", () => {
    expect(formatPrompt("  hello  ")).toBe("hello");
  });

  it("prepends context when provided", () => {
    const result = formatPrompt("question", { context: "some context" });
    expect(result).toBe("Context: some context\n\nquestion");
  });

  it("prepends system prompt when provided", () => {
    const result = formatPrompt("question", {
      systemPrompt: "You are helpful",
    });
    expect(result).toBe("You are helpful\n\nquestion");
  });

  it("combines system prompt and context", () => {
    const result = formatPrompt("question", {
      systemPrompt: "You are helpful",
      context: "some context",
    });
    expect(result).toBe("You are helpful\n\nContext: some context\n\nquestion");
  });

  it("truncates to maxLength", () => {
    const result = formatPrompt("hello world", { maxLength: 5 });
    expect(result).toBe("hello");
  });
});
