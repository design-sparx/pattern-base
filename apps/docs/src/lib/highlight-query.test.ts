import { describe, expect, it } from "vitest";

import { highlightQuery } from "@/lib/highlight-query";

describe("highlightQuery", () => {
  it("returns a single non-match segment for an empty query", () => {
    expect(highlightQuery("Open Input", "")).toEqual([
      { text: "Open Input", match: false },
    ]);
  });

  it("splits around a middle match, preserving original case", () => {
    expect(highlightQuery("Open Input", "in")).toEqual([
      { text: "Open ", match: false },
      { text: "In", match: true },
      { text: "put", match: false },
    ]);
  });

  it("matches at the start", () => {
    expect(highlightQuery("Open Input", "open")).toEqual([
      { text: "Open", match: true },
      { text: " Input", match: false },
    ]);
  });

  it("matches at the end", () => {
    expect(highlightQuery("Open Input", "input")).toEqual([
      { text: "Open ", match: false },
      { text: "Input", match: true },
    ]);
  });

  it("is case-insensitive", () => {
    expect(highlightQuery("Re-run generation", "GENERATION")).toEqual([
      { text: "Re-run ", match: false },
      { text: "generation", match: true },
    ]);
  });

  it("returns a single non-match segment when nothing matches", () => {
    expect(highlightQuery("Open Input", "zzz")).toEqual([
      { text: "Open Input", match: false },
    ]);
  });

  it("handles regex-special characters safely (no RegExp used)", () => {
    expect(highlightQuery("Turn on A+b mode", "a+b")).toEqual([
      { text: "Turn on ", match: false },
      { text: "A+b", match: true },
      { text: " mode", match: false },
    ]);
  });

  it("trims whitespace around the query", () => {
    expect(highlightQuery("Open Input", "  input  ")).toEqual([
      { text: "Open ", match: false },
      { text: "Input", match: true },
    ]);
  });
});
