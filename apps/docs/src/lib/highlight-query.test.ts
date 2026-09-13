import { describe, expect, it } from "vitest";

import { highlightQuery } from "@/lib/highlight-query";

describe("highlightQuery", () => {
  it("returns a single non-match segment for an empty query", () => {
    expect(highlightQuery("Open Input", "")).toEqual([
      { text: "Open Input", match: false, offset: 0 },
    ]);
  });

  it("splits around a middle match, preserving original case", () => {
    expect(highlightQuery("Open Input", "in")).toEqual([
      { text: "Open ", match: false, offset: 0 },
      { text: "In", match: true, offset: 5 },
      { text: "put", match: false, offset: 7 },
    ]);
  });

  it("matches at the start", () => {
    expect(highlightQuery("Open Input", "open")).toEqual([
      { text: "Open", match: true, offset: 0 },
      { text: " Input", match: false, offset: 4 },
    ]);
  });

  it("matches at the end", () => {
    expect(highlightQuery("Open Input", "input")).toEqual([
      { text: "Open ", match: false, offset: 0 },
      { text: "Input", match: true, offset: 5 },
    ]);
  });

  it("is case-insensitive", () => {
    expect(highlightQuery("Re-run generation", "GENERATION")).toEqual([
      { text: "Re-run ", match: false, offset: 0 },
      { text: "generation", match: true, offset: 7 },
    ]);
  });

  it("returns a single non-match segment when nothing matches", () => {
    expect(highlightQuery("Open Input", "zzz")).toEqual([
      { text: "Open Input", match: false, offset: 0 },
    ]);
  });

  it("handles regex-special characters safely (no RegExp used)", () => {
    expect(highlightQuery("Turn on A+b mode", "a+b")).toEqual([
      { text: "Turn on ", match: false, offset: 0 },
      { text: "A+b", match: true, offset: 8 },
      { text: " mode", match: false, offset: 11 },
    ]);
  });

  it("trims whitespace around the query", () => {
    expect(highlightQuery("Open Input", "  input  ")).toEqual([
      { text: "Open ", match: false, offset: 0 },
      { text: "Input", match: true, offset: 5 },
    ]);
  });
});
