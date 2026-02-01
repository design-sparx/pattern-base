import { describe, expect, it } from "vitest";
import { truncateText, truncateUrl } from "../truncate-text";

describe("truncateText", () => {
  it("returns text unchanged if shorter than maxLength", () => {
    expect(truncateText("hello", 10)).toBe("hello");
  });

  it("truncates text with ellipsis", () => {
    expect(truncateText("hello world", 8)).toBe("hello...");
  });

  it("supports custom suffix", () => {
    expect(truncateText("hello world", 9, "…")).toBe("hello wo…");
  });
});

describe("truncateUrl", () => {
  it("returns short URLs unchanged", () => {
    expect(truncateUrl("https://example.com")).toBe("https://example.com");
  });

  it("truncates long URLs", () => {
    const longUrl = "https://example.com/" + "a".repeat(60);
    expect(truncateUrl(longUrl, 30)).toBe(longUrl.substring(0, 30) + "...");
  });
});
