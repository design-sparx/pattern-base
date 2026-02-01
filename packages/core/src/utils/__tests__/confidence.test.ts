import { describe, expect, it } from "vitest";

import {
  formatConfidence,
  getConfidenceColor,
  getConfidenceLevel,
} from "../confidence";

describe("getConfidenceLevel", () => {
  it("returns 'high' for scores >= 0.8", () => {
    expect(getConfidenceLevel(0.8)).toBe("high");
    expect(getConfidenceLevel(0.95)).toBe("high");
    expect(getConfidenceLevel(1)).toBe("high");
  });

  it("returns 'medium' for scores >= 0.5 and < 0.8", () => {
    expect(getConfidenceLevel(0.5)).toBe("medium");
    expect(getConfidenceLevel(0.7)).toBe("medium");
  });

  it("returns 'low' for scores < 0.5", () => {
    expect(getConfidenceLevel(0.4)).toBe("low");
    expect(getConfidenceLevel(0)).toBe("low");
  });
});

describe("getConfidenceColor", () => {
  it("returns green for high confidence", () => {
    expect(getConfidenceColor(0.9)).toBe("#10b981");
  });

  it("returns amber for medium confidence", () => {
    expect(getConfidenceColor(0.6)).toBe("#f59e0b");
  });

  it("returns gray for low confidence", () => {
    expect(getConfidenceColor(0.3)).toBe("#6b7280");
  });
});

describe("formatConfidence", () => {
  it("formats score as percentage", () => {
    expect(formatConfidence(0.85)).toBe("85%");
    expect(formatConfidence(0.5)).toBe("50%");
    expect(formatConfidence(1)).toBe("100%");
    expect(formatConfidence(0)).toBe("0%");
  });
});
